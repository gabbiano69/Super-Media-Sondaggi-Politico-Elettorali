export type ElectoralLaw = 'stabilicum';

export interface SeatProjection {
  cameraSeats: number;
  senatoSeats: number;
  percentage: number;
  passedThreshold: boolean;
  status: 'Maggioranza' | 'Opposizione' | 'Centro' | 'Fuori';
  electoralBonus?: boolean;
}

export interface SimulationSummary {
  law: ElectoralLaw;
  winningCoalition: 'governo' | 'campoLargo' | 'centro' | 'parita';
  winningCoalitionLabel: string;
  majorityAwarded: boolean;
  cameraMajoritySeats: number;
  senatoMajoritySeats: number;
  cameraOppositionSeats: number;
  senatoOppositionSeats: number;
  coalitionTotals: {
    governo: number;
    campoLargo: number;
    centro: number;
    altri: number;
  };
  parties: Record<string, SeatProjection>;
}

/**
 * Simula i seggi parlamentari secondo la legge dello Stato «Stabilicum» (Premierato):
 * - Premio di maggioranza del 55% alla coalizione collegata al candidato Premier più votato (220 seggi Camera, 110 seggi Senato)
 * - Quota del 45% ripartita proporzionalmente tra le opposizioni che superano la soglia del 3% (180 seggi Camera, 90 seggi Senato)
 */
export function simulateParliamentSeats(
  partyPercentages: Record<string, number>,
  coalitionMap: Record<string, string>, // partyId -> 'governo' | 'campoLargo' | 'centro' | 'solitario'
  law: ElectoralLaw = 'stabilicum'
): SimulationSummary {
  const CAMERA_TOTAL = 400;
  const SENATO_TOTAL = 200;
  const THRESHOLD = 3.0;

  // 1. Calcolo somme voti per coalizione
  const coalitionVoteSums: Record<string, number> = {
    governo: 0,
    campoLargo: 0,
    centro: 0,
    solitario: 0,
  };

  Object.entries(partyPercentages).forEach(([pId, pct]) => {
    const cKey = coalitionMap[pId] || 'solitario';
    coalitionVoteSums[cKey] = (coalitionVoteSums[cKey] || 0) + pct;
  });

  const results: Record<string, SeatProjection> = {};

  // --- STABILICUM (Legge dello Stato per l'elezione diretta del Premier) ---
  const CAMERA_PREMIO = 220;
  const CAMERA_OPPOSIZIONE = 180;
  const SENATO_PREMIO = 110;
  const SENATO_OPPOSIZIONE = 90;

  // Determina la coalizione vincente che ottiene il premio del 55%
  let winningCoalition: 'governo' | 'campoLargo' | 'centro' | 'parita' = 'governo';
  if (coalitionVoteSums.campoLargo > coalitionVoteSums.governo && coalitionVoteSums.campoLargo > coalitionVoteSums.centro) {
    winningCoalition = 'campoLargo';
  } else if (coalitionVoteSums.centro > coalitionVoteSums.governo && coalitionVoteSums.centro > coalitionVoteSums.campoLargo) {
    winningCoalition = 'centro';
  } else if (coalitionVoteSums.governo === coalitionVoteSums.campoLargo) {
    winningCoalition = 'parita';
  }

  const winningCoalitionLabel =
    winningCoalition === 'governo'
      ? 'Centrodestra di Governo (Meloni)'
      : winningCoalition === 'campoLargo'
      ? 'Campo Largo Progressista'
      : 'Polo di Centro';

  // Ripartizione interna alla coalizione vincente con premio del 55%
  const winningParties = Object.entries(partyPercentages).filter(
    ([pId]) => coalitionMap[pId] === winningCoalition
  );
  const winningSum = winningParties.reduce((acc, [, pct]) => acc + pct, 0) || 1;

  winningParties.forEach(([pId, pct]) => {
    const share = pct / winningSum;
    const camSeats = Math.round(CAMERA_PREMIO * share);
    const senSeats = Math.round(SENATO_PREMIO * share);

    results[pId] = {
      cameraSeats: camSeats,
      senatoSeats: senSeats,
      percentage: pct,
      passedThreshold: pct >= THRESHOLD || share >= 0.04, // In coalizione vincente concorrono anche liste alleate
      status: 'Maggioranza',
      electoralBonus: true,
    };
  });

  // Ripartizione proporzionale del 45% (180 Camera / 90 Senato) per i partiti di opposizione
  const oppositionParties = Object.entries(partyPercentages).filter(
    ([pId]) => coalitionMap[pId] !== winningCoalition
  );

  // Solo i partiti che superano la soglia del 3% partecipano al riparto proporzionale di minoranza
  const validOpposition = oppositionParties.filter(([, pct]) => pct >= THRESHOLD);
  const validOppSum = validOpposition.reduce((acc, [, pct]) => acc + pct, 0) || 1;

  validOpposition.forEach(([pId, pct]) => {
    const share = pct / validOppSum;
    const camSeats = Math.round(CAMERA_OPPOSIZIONE * share);
    const senSeats = Math.round(SENATO_OPPOSIZIONE * share);
    const cKey = coalitionMap[pId];

    results[pId] = {
      cameraSeats: camSeats,
      senatoSeats: senSeats,
      percentage: pct,
      passedThreshold: true,
      status: cKey === 'centro' ? 'Centro' : 'Opposizione',
      electoralBonus: false,
    };
  });

  // Partiti sotto soglia nelle opposizioni (0 seggi - esclusi dalla rappresentanza)
  oppositionParties
    .filter(([, pct]) => pct < THRESHOLD)
    .forEach(([pId, pct]) => {
      results[pId] = {
        cameraSeats: 0,
        senatoSeats: 0,
        percentage: pct,
        passedThreshold: false,
        status: 'Fuori',
        electoralBonus: false,
      };
    });

  // Conteggi finali
  const cameraMajoritySeats = Object.entries(results)
    .filter(([id]) => coalitionMap[id] === winningCoalition)
    .reduce((acc, [, r]) => acc + r.cameraSeats, 0);

  const senatoMajoritySeats = Object.entries(results)
    .filter(([id]) => coalitionMap[id] === winningCoalition)
    .reduce((acc, [, r]) => acc + r.senatoSeats, 0);

  const cameraOppositionSeats = CAMERA_TOTAL - cameraMajoritySeats;
  const senatoOppositionSeats = SENATO_TOTAL - senatoMajoritySeats;

  return {
    law: 'stabilicum',
    winningCoalition,
    winningCoalitionLabel,
    majorityAwarded: true,
    cameraMajoritySeats,
    senatoMajoritySeats,
    cameraOppositionSeats,
    senatoOppositionSeats,
    coalitionTotals: {
      governo: Number(coalitionVoteSums.governo.toFixed(1)),
      campoLargo: Number(coalitionVoteSums.campoLargo.toFixed(1)),
      centro: Number(coalitionVoteSums.centro.toFixed(1)),
      altri: Number(coalitionVoteSums.solitario.toFixed(1)),
    },
    parties: results,
  };
}

/**
 * Confronto dedicato tra le due ipotesi politiche su Italia Viva (Matteo Renzi) nello Stabilicum:
 * Ipotesi A: Italia Viva NEL Campo Largo
 * Ipotesi B: Italia Viva FUORI dal Campo Largo (polo autonomo o terzo polo)
 * Nota: Partito Liberaldemocratico (Marattin) è sempre da solo/solitario.
 */
export function compareItaliaVivaScenarios(
  partyPercentages: Record<string, number>,
  law: ElectoralLaw = 'stabilicum',
  includeVannacciInGov: boolean = false
) {
  // Scenario A: Italia Viva nel Campo Largo
  const coalitionMapWithIv: Record<string, string> = {
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo', // Sud Chiama Nord nel Centrodestra
    fn: includeVannacciInGov ? 'governo' : 'solitario',
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    progettocivico: 'campoLargo', // Progetto Civico nel Campo Largo
    piuuno: 'campoLargo', // Più Uno nel Campo Largo
    iv: 'campoLargo', // Italia Viva nel Campo Largo
    azione: 'centro',
    pld: 'solitario', // Partito Liberaldemocratico (Marattin) da solo
    altri: 'solitario',
  };

  // Scenario B: Italia Viva fuori dal Campo Largo (autonoma / centro)
  const coalitionMapWithoutIv: Record<string, string> = {
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo', // Sud Chiama Nord nel Centrodestra
    fn: includeVannacciInGov ? 'governo' : 'solitario',
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    progettocivico: 'campoLargo',
    piuuno: 'campoLargo',
    iv: 'centro', // Italia Viva autonoma / centro
    azione: 'centro',
    pld: 'solitario', // Partito Liberaldemocratico (Marattin) da solo
    altri: 'solitario',
  };

  const simWithIv = simulateParliamentSeats(partyPercentages, coalitionMapWithIv, law);
  const simWithoutIv = simulateParliamentSeats(partyPercentages, coalitionMapWithoutIv, law);

  return {
    withIv: simWithIv,
    withoutIv: simWithoutIv,
    ivPercentage: partyPercentages.iv || 2.4,
    deltaCsxPercentage: Number((simWithIv.coalitionTotals.campoLargo - simWithoutIv.coalitionTotals.campoLargo).toFixed(1)),
    deltaCameraSeatsCsx:
      Object.entries(simWithIv.parties)
        .filter(([id]) => coalitionMapWithIv[id] === 'campoLargo')
        .reduce((a, [, p]) => a + p.cameraSeats, 0) -
      Object.entries(simWithoutIv.parties)
        .filter(([id]) => coalitionMapWithoutIv[id] === 'campoLargo')
        .reduce((a, [, p]) => a + p.cameraSeats, 0),
    ivSeatsWhenInCsx: {
      camera: simWithIv.parties.iv?.cameraSeats || 0,
      senato: simWithIv.parties.iv?.senatoSeats || 0,
    },
    ivSeatsWhenOut: {
      camera: simWithoutIv.parties.iv?.cameraSeats || 0,
      senato: simWithoutIv.parties.iv?.senatoSeats || 0,
    },
  };
}
