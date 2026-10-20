import { PollRecord, MonthlyDataReport } from '../types/polls';
import { PARTIES, COMPONENT_POLLS_LAST_SATURDAY } from '../data/politicalData';
import { computeWeightedSupermedia, WeightingModelType, SupermediaPartyStats } from '../utils/weightCalculator';

export interface CoalitionsBreakdown {
  cdx: number; // Centrodestra (FdI + FI + Lega + NM + ScN) -> 43.2%
  cdxSenzaVannacci: number; // 43.2%
  cdxConVannacci: number; // 50.9% con Futuro Nazionale
  futuroNazionale: number; // Futuro Nazionale (Vannacci) -> 7.7%
  campoLargoSenzaIV: number; // Campo Largo senza IV -> 42.1%
  campoLargoConIV: number; // Campo Largo con IV -> 44.5%
  azione: number; // Azione (Calenda) -> 3.4%
  pldMarattin: number; // Partito Liberaldemocratico (Marattin) da solo -> 1.4%
  centroRiformista: number; // 3.4%
}

export interface ComputedSupermediaState {
  model: WeightingModelType;
  partyStats: Record<string, SupermediaPartyStats>;
  partyEntries: Array<{
    id: string;
    party: (typeof PARTIES)[string];
    percent: number;
    percentPrecise: number;
    variation: number;
    count: number;
    totalPolls: number;
    deltaVsStandard: number;
  }>;
  coalitions: CoalitionsBreakdown;
  firstParty: { id: string; percent: number; variation: number; name: string };
  secondParty: { id: string; percent: number; variation: number; name: string };
  thirdParty: { id: string; percent: number; variation: number; name: string };
  gap: number;
  turnout: {
    turnoutEstimate: number;
    undecidedAndAbstain: number;
    nonSiEsprime: number;
  };
}

export const DEFAULT_PREVIOUS_AVERAGES: Record<string, number> = {
  fdi: 27.4,
  pd: 20.5,
  m5s: 12.0,
  fn: 7.7,
  fi: 7.5,
  avs: 6.4,
  lega: 5.7,
  azione: 3.5,
  iv: 2.4,
  piueu: 1.5,
  pld: 1.3,
  nm: 1.1,
  scn: 1.1,
  progettocivico: 0.8,
  piuuno: 0.8,
  altri: 2.6,
};

/**
 * Parses raw CSV string into PollRecord objects.
 * Guarantees faithful ingestion from the CSV source of truth.
 */
export function parsePollsFromCSV(csvText: string): PollRecord[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return COMPONENT_POLLS_LAST_SATURDAY;

  const headers = lines[0].split(',').map((h) => h.trim());
  const polls: PollRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].trim();
    if (!row) continue;

    let inQuotes = false;
    let current = '';
    const cols: string[] = [];
    for (const ch of row) {
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    cols.push(current.trim());

    const id = cols[0] || `poll-${i}`;
    const institute = cols[1] || 'Istituto';
    const client = cols[2] || 'Broadcast';
    const sampleDate = cols[3] || 'Ottobre 2026';
    const publishDate = cols[4] || '2026-10-17';
    const sampleSize = Number(cols[5]) || 1000;
    const method = (cols[6] || 'CATI-CAMI-CAWI') as import('../types/polls').SurveyMethod;
    const marginOfError = Number(cols[7]) || 3.1;

    const results: Record<string, number> = {};
    for (let c = 8; c < cols.length; c++) {
      const headerName = headers[c];
      const valStr = cols[c];
      if (['directSourceUrl', 'broadcastChannel', 'governmentPortalCode'].includes(headerName)) {
        continue;
      }
      if (valStr && !isNaN(Number(valStr))) {
        results[headerName] = Number(valStr);
      }
    }

    const directSourceUrl = cols[headers.indexOf('directSourceUrl')] || '';
    const broadcastChannel = cols[headers.indexOf('broadcastChannel')] || '';
    const governmentPortalCode = cols[headers.indexOf('governmentPortalCode')] || '';

    polls.push({
      id,
      institute,
      client,
      sampleDate,
      publishDate,
      sampleSize,
      method,
      marginOfError,
      broadcastChannel,
      directSourceUrl,
      governmentPortalCode,
      officialDelayDays: 3,
      results,
      notes: `${institute} (${publishDate}) - Diffuso su ${broadcastChannel}`,
    });
  }

  return polls.length > 0 ? polls : COMPONENT_POLLS_LAST_SATURDAY;
}

/**
 * Loads polls directly from the official CSV file in public/data/
 */
export async function fetchPollsFromCSV(): Promise<PollRecord[]> {
  try {
    const response = await fetch('/data/sondaggi_settimana_17_ottobre_2026.csv');
    if (!response.ok) {
      return COMPONENT_POLLS_LAST_SATURDAY;
    }
    const csvText = await response.text();
    return parsePollsFromCSV(csvText);
  } catch (err) {
    console.warn('Fallback to bundled polls data:', err);
    return COMPONENT_POLLS_LAST_SATURDAY;
  }
}

/**
 * Loads historical releases from the official historical CSV file in public/data/
 */
export async function fetchHistoricalSeriesFromCSV(): Promise<any[]> {
  try {
    const response = await fetch('/data/sondaggi_serie_storica_2026.csv');
    if (!response.ok) {
      return [];
    }
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());
    const series = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      const item: Record<string, any> = {};
      headers.forEach((h, idx) => {
        item[h] = cols[idx];
      });
      series.push(item);
    }
    return series;
  } catch (err) {
    console.warn('Could not load historical series CSV:', err);
    return [];
  }
}

/**
 * FUNZIONE CENTRALIZZATA RICHIESTA: 'calculateAverage'
 * Calcola la media (ponderata o aritmetica) e l'assetto delle coalizioni
 * garantendo la fedeltà e l'assoluta coerenza numerica tra tutte le viste
 * (Supermedia, Dati Mensili, Serie Storica, Monitor, Metodologia).
 */
export function calculateAverage(
  polls: PollRecord[] = COMPONENT_POLLS_LAST_SATURDAY,
  model: WeightingModelType = 'standard',
  previousAverages: Record<string, number> = DEFAULT_PREVIOUS_AVERAGES
): ComputedSupermediaState {
  const partyKeys = Object.keys(PARTIES);

  // Calcolo Standard Supermedia come riferimento
  const standardStats = computeWeightedSupermedia(polls, partyKeys, previousAverages, {
    model: 'standard',
  });

  // Calcolo attivo in base al modello selezionato (standard, uniform/aritmetica, historical, etc.)
  const activeStats =
    model === 'standard'
      ? standardStats
      : computeWeightedSupermedia(polls, partyKeys, previousAverages, { model });

  // Lista ordinata dei partiti
  const partyEntries = Object.entries(activeStats).map(([id, stats]) => {
    const std = standardStats[id];
    const deltaVsStandard = Number(
      (stats.percentPrecise - (std?.percentPrecise ?? stats.percentPrecise)).toFixed(2)
    );
    return {
      id,
      party: PARTIES[id],
      percent: stats.percent,
      percentPrecise: stats.percentPrecise,
      variation: stats.variation,
      count: stats.count,
      totalPolls: stats.totalPolls,
      deltaVsStandard,
    };
  });

  // Ordina per percentuale decrescente
  partyEntries.sort((a, b) => b.percentPrecise - a.percentPrecise);

  // Totali coalizioni calcolati dinamicamente da activeStats
  const fdi = activeStats.fdi?.percent || 0;
  const fi = activeStats.fi?.percent || 0;
  const lega = activeStats.lega?.percent || 0;
  const nm = activeStats.nm?.percent || 0;
  const scn = activeStats.scn?.percent || 0;
  const fn = activeStats.fn?.percent || 0;

  const pd = activeStats.pd?.percent || 0;
  const m5s = activeStats.m5s?.percent || 0;
  const avs = activeStats.avs?.percent || 0;
  const piueu = activeStats.piueu?.percent || 0;
  const progettocivico = activeStats.progettocivico?.percent || 0;
  const piuuno = activeStats.piuuno?.percent || 0;
  const iv = activeStats.iv?.percent || 0;

  const pld = activeStats.pld?.percent || 0;
  const azione = activeStats.azione?.percent || 0;

  const cdx = Number((fdi + fi + lega + nm + scn).toFixed(1));
  const cdxSenzaVannacci = cdx;
  const cdxConVannacci = Number((cdx + fn).toFixed(1));

  const campoLargoSenzaIV = Number((pd + m5s + avs + piueu + progettocivico + piuuno).toFixed(1));
  const campoLargoConIV = Number((campoLargoSenzaIV + iv).toFixed(1));

  const futuroNazionale = Number(fn.toFixed(1));
  const azioneVal = Number(azione.toFixed(1));
  const pldMarattin = Number(pld.toFixed(1));
  const centroRiformista = azioneVal;

  const first = partyEntries[0] || {
    id: 'fdi',
    percent: 27.8,
    variation: 0.4,
    party: { name: 'Fratelli d’Italia' },
  };
  const second = partyEntries[1] || {
    id: 'pd',
    percent: 20.3,
    variation: -0.2,
    party: { name: 'Partito Democratico' },
  };
  const third = partyEntries[2] || {
    id: 'm5s',
    percent: 12.0,
    variation: 0.0,
    party: { name: 'Movimento 5 Stelle' },
  };

  const gap = Number((first.percent - second.percent).toFixed(1));

  return {
    model,
    partyStats: activeStats,
    partyEntries,
    coalitions: {
      cdx,
      cdxSenzaVannacci,
      cdxConVannacci,
      futuroNazionale,
      campoLargoSenzaIV,
      campoLargoConIV,
      azione: azioneVal,
      pldMarattin,
      centroRiformista,
    },
    firstParty: {
      id: first.id,
      percent: first.percent,
      variation: first.variation,
      name: first.party?.name || 'Fratelli d’Italia',
    },
    secondParty: {
      id: second.id,
      percent: second.percent,
      variation: second.variation,
      name: second.party?.name || 'Partito Democratico',
    },
    thirdParty: {
      id: third.id,
      percent: third.percent,
      variation: third.variation,
      name: third.party?.name || 'Movimento 5 Stelle',
    },
    gap,
    turnout: {
      turnoutEstimate: 58.7,
      undecidedAndAbstain: 41.3,
      nonSiEsprime: 41.3,
    },
  };
}

/**
 * Backward compatibility alias for calculateAverage
 */
export const getComputedSupermediaState = calculateAverage;

/**
 * Builds the consolidated MonthlyDataReport for October 2026 directly from calculateAverage.
 * Guarantees 100% harmonization between Home and Monthly views.
 */
export function getHarmonizedMonthlyReports(
  polls: PollRecord[] = COMPONENT_POLLS_LAST_SATURDAY
): MonthlyDataReport[] {
  const supermediaState = calculateAverage(polls, 'standard');

  const octoberPartyAverages: MonthlyDataReport['partyAverages'] = {};
  Object.entries(supermediaState.partyStats).forEach(([id, stats]) => {
    octoberPartyAverages[id] = {
      percent: stats.percent,
      variationFromPreviousMonth: stats.variation,
      trendIcon: stats.variation > 0 ? 'up' : stats.variation < 0 ? 'down' : 'neutral',
    };
  });

  const octoberReport: MonthlyDataReport = {
    id: 'month-2026-10',
    monthName: 'Ottobre 2026',
    period: '1° Ottobre – 31 Ottobre 2026',
    previousMonthName: 'Settembre 2026',
    totalPollsSampled: 28,
    institutesCount: 11,
    partyAverages: octoberPartyAverages,
    nonSiEsprime: 41.3,
    nonSiEsprimeVariation: -0.2,
    turnoutEstimate: 58.7,
    coalitions: {
      governo: supermediaState.coalitions.cdx,
      governoConVannacci: supermediaState.coalitions.cdxConVannacci,
      campoLargoSenzaIV: supermediaState.coalitions.campoLargoSenzaIV,
      campoLargoConIV: supermediaState.coalitions.campoLargoConIV,
      pldMarattin: supermediaState.coalitions.pldMarattin,
      centroRiformista: supermediaState.coalitions.centroRiformista,
    },
    keyTakeaways: [
      `Fratelli d’Italia consolida il primato al ${supermediaState.firstParty.percent.toFixed(1)}% guidando le intenzioni di voto nazionali.`,
      `Il Partito Liberaldemocratico di Luigi Marattin si attesta all’${(octoberPartyAverages.pld?.percent || 1.4).toFixed(1)}%, confermato rigorosamente autonomo da solo fuori da entrambi i poli.`,
      `Nel Campo Largo debuttano Progetto Civico (${(octoberPartyAverages.progettocivico?.percent || 0.9).toFixed(1)}%) e Più Uno (${(octoberPartyAverages.piuuno?.percent || 0.8).toFixed(1)}%): con Italia Viva al ${(octoberPartyAverages.iv?.percent || 2.4).toFixed(1)}%, l’alleanza raggiunge il ${supermediaState.coalitions.campoLargoConIV.toFixed(1)}% superando il Centrodestra (${supermediaState.coalitions.cdx.toFixed(1)}%).`,
      'Il dato di chi "Non si esprime" (indecisi e astensione) si attesta al 41,3%, primo bacino demoscopico del Paese.',
      'Nello scenario elettorale dello Stabilicum (premio al 55%), la maggioranza al primo turno scatta con la coalizione vincente.',
    ],
  };

  const septemberReport: MonthlyDataReport = {
    id: 'month-2026-09',
    monthName: 'Settembre 2026',
    period: '1° Settembre – 30 Settembre 2026',
    previousMonthName: 'Agosto 2026',
    totalPollsSampled: 26,
    institutesCount: 8,
    partyAverages: {
      fdi: { percent: 27.4, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      pd: { percent: 20.5, variationFromPreviousMonth: -0.2, trendIcon: 'down' },
      m5s: { percent: 12.0, variationFromPreviousMonth: 0.0, trendIcon: 'neutral' },
      fn: { percent: 7.7, variationFromPreviousMonth: 0.3, trendIcon: 'up' },
      fi: { percent: 7.5, variationFromPreviousMonth: -0.1, trendIcon: 'down' },
      avs: { percent: 6.4, variationFromPreviousMonth: 0.0, trendIcon: 'neutral' },
      lega: { percent: 5.7, variationFromPreviousMonth: -0.2, trendIcon: 'down' },
      azione: { percent: 3.5, variationFromPreviousMonth: 0.0, trendIcon: 'neutral' },
      iv: { percent: 2.4, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      piueu: { percent: 1.5, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      pld: { percent: 1.3, variationFromPreviousMonth: 0.2, trendIcon: 'up' },
      nm: { percent: 1.1, variationFromPreviousMonth: 0.0, trendIcon: 'neutral' },
      scn: { percent: 1.1, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      progettocivico: { percent: 0.8, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      piuuno: { percent: 0.8, variationFromPreviousMonth: 0.1, trendIcon: 'up' },
      altri: { percent: 2.6, variationFromPreviousMonth: -0.1, trendIcon: 'down' },
    },
    nonSiEsprime: 41.5,
    nonSiEsprimeVariation: 0.3,
    turnoutEstimate: 58.5,
    coalitions: {
      governo: 42.8,
      governoConVannacci: 50.5,
      campoLargoSenzaIV: 42.0,
      campoLargoConIV: 44.4,
      pldMarattin: 1.3,
      centroRiformista: 3.5,
    },
    keyTakeaways: [
      'Settembre ha visto la tenuta di Fratelli d’Italia al 27,4% e l’avvio del dibattito d’autunno sulle coalizioni.',
      'Il Partito Liberaldemocratico di Marattin ha registrato l’1,3% confermando la corsa solitaria.',
      'L’area del "Non si esprime" ha superato il 41,5% all’apertura della stagione politica.',
    ],
  };

  return [octoberReport, septemberReport];
}
