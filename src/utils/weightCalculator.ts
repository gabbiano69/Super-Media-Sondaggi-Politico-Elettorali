import { PollRecord } from '../types/polls';

export interface CalculatedPollWeight {
  pollId: string;
  institute: string;
  publishDate: string;
  sampleSize: number;
  sampleWeight: number;
  recencyWeight: number;
  methodWeight: number;
  rawWeight: number;
  normalizedPercentageWeight: number;
}

export interface WeightingParameters {
  referenceDateIso: string; // e.g. "2026-09-10"
  decayRateLambda: number; // e.g. 0.045
  baseSampleSize: number; // e.g. 1000
}

export const DEFAULT_WEIGHT_PARAMS: WeightingParameters = {
  referenceDateIso: '2026-09-10',
  decayRateLambda: 0.045,
  baseSampleSize: 1000,
};

export function calculatePollWeights(
  polls: PollRecord[],
  params: WeightingParameters = DEFAULT_WEIGHT_PARAMS
): CalculatedPollWeight[] {
  const refTime = new Date(params.referenceDateIso).getTime();

  const rawCalculations = polls.map((poll) => {
    // 1. Sample Size Weight: sqrt(N / base) capped between 0.75 and 1.35
    const sizeRatio = poll.sampleSize / params.baseSampleSize;
    const sampleWeight = Math.min(1.35, Math.max(0.75, Math.sqrt(sizeRatio)));

    // 2. Recency Weight: exponential decay based on days passed
    const pollTime = new Date(poll.publishDate).getTime();
    const daysAgo = Math.max(0, (refTime - pollTime) / (1000 * 60 * 60 * 24));
    const recencyWeight = Math.exp(-params.decayRateLambda * daysAgo);

    // 3. Method Weight
    let methodWeight = 1.0;
    if (poll.method === 'CATI-CAMI-CAWI') {
      methodWeight = 1.08; // Triple mixed methodology (fixed, mobile, online)
    } else if (poll.method === 'CATI-CAWI' || poll.method === 'Misto') {
      methodWeight = 1.0;
    } else if (poll.method === 'CAWI') {
      methodWeight = 0.94; // Online-only opt-in panel
    }

    const rawWeight = sampleWeight * recencyWeight * methodWeight;

    return {
      pollId: poll.id,
      institute: poll.institute,
      publishDate: poll.publishDate,
      sampleSize: poll.sampleSize,
      sampleWeight: Number(sampleWeight.toFixed(3)),
      recencyWeight: Number(recencyWeight.toFixed(3)),
      methodWeight: Number(methodWeight.toFixed(3)),
      rawWeight,
      normalizedPercentageWeight: 0,
    };
  });

  const sumRaw = rawCalculations.reduce((acc, curr) => acc + curr.rawWeight, 0) || 1;

  return rawCalculations.map((calc) => ({
    ...calc,
    normalizedPercentageWeight: Number(((calc.rawWeight / sumRaw) * 100).toFixed(2)),
  }));
}

export function computeWeightedSupermedia(
  polls: PollRecord[],
  partyKeys: string[],
  previousAverages: Record<string, number>,
  params: WeightingParameters = DEFAULT_WEIGHT_PARAMS
): Record<string, { percent: number; variation: number }> {
  if (polls.length === 0) {
    const empty: Record<string, { percent: number; variation: number }> = {};
    partyKeys.forEach((k) => {
      empty[k] = { percent: 0, variation: 0 };
    });
    return empty;
  }

  const weights = calculatePollWeights(polls, params);
  const result: Record<string, { percent: number; variation: number }> = {};

  partyKeys.forEach((key) => {
    let weightedSum = 0;
    weights.forEach((w) => {
      const poll = polls.find((p) => p.id === w.pollId);
      if (poll && typeof poll.results[key] === 'number') {
        const normFactor = w.normalizedPercentageWeight / 100;
        weightedSum += poll.results[key] * normFactor;
      }
    });

    const percent = Number(weightedSum.toFixed(1));
    const prev = previousAverages[key] ?? percent;
    const variation = Number((percent - prev).toFixed(1));

    result[key] = { percent, variation };
  });

  return result;
}

export function exportPollsToCSV(polls: PollRecord[], parties: { id: string; shortName: string }[]): string {
  const headers = [
    'ID',
    'Istituto',
    'Committente',
    'Data Pubblicazione',
    'Campione',
    'Metodologia',
    'Margine Errore %',
    ...parties.map((p) => p.shortName),
  ];

  const rows = polls.map((p) => [
    p.id,
    `"${p.institute}"`,
    `"${p.client}"`,
    p.publishDate,
    p.sampleSize,
    `"${p.method}"`,
    p.marginOfError,
    ...parties.map((party) => p.results[party.id] ?? 0),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
