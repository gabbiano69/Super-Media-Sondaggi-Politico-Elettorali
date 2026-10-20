import { PollRecord } from '../types/polls';

export type WeightingModelType =
  | 'standard'
  | 'uniform'
  | 'historical'
  | 'sample_only'
  | 'recency_heavy';

export interface CalculatedPollWeight {
  pollId: string;
  institute: string;
  publishDate: string;
  sampleSize: number;
  sampleWeight: number;
  recencyWeight: number;
  methodWeight: number;
  reliabilityWeight?: number;
  rawWeight: number;
  normalizedPercentageWeight: number;
  daysAgo: number;
  isSameWeek: boolean; // Entro i 7 giorni: massima freschezza (100%)
  isBiweekly: boolean; // Tra 8 e 14 giorni: finestra bisettimanale
}

export interface WeightingParameters {
  referenceDateIso: string; // e.g. "2026-10-17"
  decayRateLambda: number; // e.g. 0.045
  baseSampleSize: number; // e.g. 1000
  model?: WeightingModelType;
}

export const DEFAULT_WEIGHT_PARAMS: WeightingParameters = {
  referenceDateIso: '2026-10-17',
  decayRateLambda: 0.045,
  baseSampleSize: 1000,
  model: 'standard',
};

// Historical reliability score by institute based on past electoral accuracy
export const INSTITUTE_HISTORICAL_WEIGHT: Record<string, number> = {
  'SWG': 1.30, // A+
  'Ipsos Italia': 1.30, // A+
  'Ipsos': 1.30,
  'Quorum': 1.25, // A+
  'Istituto Piepoli': 1.18, // A
  'Piepoli': 1.18,
  'Noto Sondaggi': 1.15, // A
  'Tecnè': 1.15, // A
  'Istituto Demopolis': 1.15, // A
  'Demopolis': 1.15,
  'Istituto Ixè': 1.15, // A
  'Ixè': 1.15,
  'Eumetra': 1.12, // A
  'EMG Different': 1.05, // A-
  'Only Numbers': 1.05, // B+
  'Index Research': 1.00, // B+
};

export function calculatePollWeights(
  polls: PollRecord[],
  params: Partial<WeightingParameters> = DEFAULT_WEIGHT_PARAMS
): CalculatedPollWeight[] {
  const fullParams: WeightingParameters = {
    ...DEFAULT_WEIGHT_PARAMS,
    ...params,
  };
  const refTime = new Date(fullParams.referenceDateIso).getTime();
  const model = fullParams.model ?? 'standard';

  const rawCalculations = polls.map((poll) => {
    const pollTime = new Date(poll.publishDate).getTime();
    const daysAgo = Math.max(0, (refTime - pollTime) / (1000 * 60 * 60 * 24));
    
    // 1. Recency & Freshness Weight:
    // - Tutti i sondaggi della stessa settimana sono freschi, ma quelli a ridosso del sabato (24-48h)
    //   ricevono un leggero bonus di freschezza, mentre quelli di inizio settimana (4-6 giorni) un lieve fattore 0.90.
    // - Per i sondaggi bisettimanali (8-14 gg) o oltre 14 gg, il peso NON è zero ma decade esponenzialmente.
    const isSameWeek = daysAgo <= 7;
    const isBiweekly = daysAgo > 7 && daysAgo <= 14;

    let recencyWeight = 1.0;
    if (isSameWeek) {
      if (model === 'recency_heavy') {
        recencyWeight = daysAgo <= 1 ? 1.6 : (daysAgo <= 3 ? 1.1 : 0.7);
      } else {
        recencyWeight = daysAgo <= 1 ? 1.15 : (daysAgo <= 3 ? 1.0 : 0.90);
      }
    } else {
      const lambda = model === 'recency_heavy' ? 0.08 : fullParams.decayRateLambda;
      recencyWeight = Math.exp(-lambda * (daysAgo - 7));
    }

    // 2. Sample Size Weight: proporzionale a N (concavo per standard)
    const sizeRatio = poll.sampleSize / fullParams.baseSampleSize;
    const sampleWeight =
      model === 'sample_only'
        ? sizeRatio
        : Math.min(1.4, Math.max(0.7, Math.pow(sizeRatio, 0.75)));

    // 3. Method Weight: premiazione CATI-CAMI probabilistico
    let methodWeight = 1.0;
    if (poll.method === 'CATI-CAMI-CAWI') {
      methodWeight = 1.08;
    } else if (poll.method === 'CATI-CAWI' || poll.method === 'Misto') {
      methodWeight = 1.0;
    } else if (poll.method === 'CAWI') {
      methodWeight = 0.92;
    }

    // 4. Historical Reliability Factor
    const instName = poll.institute.trim();
    const reliabilityWeight = INSTITUTE_HISTORICAL_WEIGHT[instName] ?? 1.10;

    let rawWeight = 0;
    if (model === 'uniform') {
      // Peso Uniforme: peso uguale per tutti i sondaggi (media aritmetica semplice)
      rawWeight = 1.0;
    } else if (model === 'historical') {
      // Basato prioritariamente sul rating storico
      rawWeight = reliabilityWeight * sampleWeight;
    } else if (model === 'sample_only') {
      // Solo ampiezza campionaria
      rawWeight = poll.sampleSize;
    } else if (model === 'recency_heavy') {
      // Freschezza prioritaria
      rawWeight = recencyWeight * sampleWeight;
    } else {
      // Standard multi-criterio Supermedia
      rawWeight = sampleWeight * reliabilityWeight * methodWeight * recencyWeight;
    }

    return {
      pollId: poll.id,
      institute: poll.institute,
      publishDate: poll.publishDate,
      sampleSize: poll.sampleSize,
      sampleWeight: Number(sampleWeight.toFixed(3)),
      recencyWeight: Number(recencyWeight.toFixed(3)),
      methodWeight: Number(methodWeight.toFixed(3)),
      reliabilityWeight: Number(reliabilityWeight.toFixed(2)),
      rawWeight,
      normalizedPercentageWeight: 0,
      daysAgo: Number(daysAgo.toFixed(1)),
      isSameWeek,
      isBiweekly,
    };
  });

  const sumRaw = rawCalculations.reduce((acc, curr) => acc + curr.rawWeight, 0) || 1;

  return rawCalculations.map((calc) => ({
    ...calc,
    normalizedPercentageWeight: Number(((calc.rawWeight / sumRaw) * 100).toFixed(2)),
  }));
}

export interface SupermediaPartyStats {
  percent: number;
  percentPrecise: number;
  variation: number;
  count: number;
  totalPolls: number;
}

export function computeWeightedSupermedia(
  polls: PollRecord[],
  partyKeys: string[],
  previousAverages: Record<string, number>,
  params: Partial<WeightingParameters> = DEFAULT_WEIGHT_PARAMS
): Record<string, SupermediaPartyStats> {
  if (polls.length === 0) {
    const empty: Record<string, SupermediaPartyStats> = {};
    partyKeys.forEach((k) => {
      empty[k] = { percent: 0, percentPrecise: 0, variation: 0, count: 0, totalPolls: 0 };
    });
    return empty;
  }

  const model = params.model ?? 'standard';
  const weights = calculatePollWeights(polls, params);
  const result: Record<string, SupermediaPartyStats> = {};

  // Regola fondamentale richiesta dall'utente:
  // "Quando per un partito minore non lo trovi in tutti i sondaggi nella media aritmetica calcola solo quelli dove li trovi."
  // Questa regola si applica sia alla media aritmetica pura (uniform) sia alle medie ponderate:
  // il divisore è ESCLUSIVAMENTE la somma dei pesi / il numero dei sondaggi in cui il partito è effettivamente rilevato e positivo (> 0).
  partyKeys.forEach((key) => {
    let weightedSum = 0;
    let totalWeightForParty = 0;
    let count = 0;

    weights.forEach((w) => {
      const poll = polls.find((p) => p.id === w.pollId);
      const val = poll?.results[key];
      if (typeof val === 'number' && val > 0) {
        if (model === 'uniform') {
          // Media Aritmetica Semplice: ogni sondaggio valido vale esattamente 1.0
          weightedSum += val;
          totalWeightForParty += 1.0;
        } else {
          const pWeight = w.normalizedPercentageWeight;
          weightedSum += val * pWeight;
          totalWeightForParty += pWeight;
        }
        count++;
      }
    });

    const percentPrecise =
      totalWeightForParty > 0 ? Number((weightedSum / totalWeightForParty).toFixed(2)) : 0;
    const percent = Number(percentPrecise.toFixed(1));
    const prev = previousAverages[key] ?? percent;
    const variation = Number((percent - prev).toFixed(1));

    result[key] = {
      percent,
      percentPrecise,
      variation,
      count,
      totalPolls: polls.length,
    };
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
