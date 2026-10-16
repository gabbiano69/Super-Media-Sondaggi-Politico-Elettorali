export type ElectoralLaw = 'stabilicum' | 'rosatellum';

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
 * Simulates Parliament Seats according to the chosen Electoral Law:
 * - 'stabilicum': Legge del Premierato con premio di maggioranza al 55% alla coalizione collegata al Premier più votato (220 seggi Camera, 110 seggi Senato), e il 45% proporzionale alle opposizioni (180 Camera, 90 Senato) con soglia 3%.
 * - 'rosatellum': Legge elettorale mista (37% uninominale maggioritario secco, 61% proporzionale, 2% circoscrizione estero).
 */
export function simulateParliamentSeats(
  partyPercentages: Record<string, number>,
  coalitionMap: Record<string, string>, // partyId -> 'governo' | 'campoLargo' | 'centro' | 'solitario'
  law: ElectoralLaw = 'stabilicum'
): SimulationSummary {
  const CAMERA_TOTAL = 400;
  const SENATO_TOTAL = 200;
  const THRESHOLD = 3.0;

  // 1. Calculate coalition vote totals
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

  if (law === 'stabilicum') {
    // --- STABILICUM (Legge elettorale per l'elezione diretta del Premier) ---
    // Premio di maggioranza del 55%:
    // Camera: 220 seggi (55% di 400)
    // Senato: 110 seggi (55% di 200)
    // Quota opposizioni del 45%:
    // Camera: 180 seggi (45% di 400)
    // Senato: 90 seggi (45% di 200)
    const CAMERA_PREMIO = 220;
    const CAMERA_OPPOSIZIONE = 180;
    const SENATO_PREMIO = 110;
    const SENATO_OPPOSIZIONE = 90;

    // Determina la coalizione vincente al primo turno o al ballottaggio
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
        ? 'Centrosinistra & M5S (Campo Largo)'
        : 'Polo di Centro';

    // Ripartizione interna alla coalizione vincente che riceve il premio del 55%
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
        passedThreshold: pct >= THRESHOLD || share >= 0.05, // In coalizione vincente, anche alleati minori concorrono
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

    // Partiti sotto soglia nelle opposizioni (0 seggi)
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

    // Conteggi finali maggioranza e opposizione
    const cameraMajoritySeats = Object.entries(results)
      .filter(([id]) => coalitionMap[id] === winningCoalition)
      .reduce((acc, [, r]) => acc + r.cameraSeats, 0);

    const senatoMajoritySeats = Object.entries(results)
      .filter(([id]) => coalitionMap[id] === winningCoalition)
      .reduce((acc, [, r]) => acc + r.senatoSeats, 0);

    const cameraOppositionSeats = CAMERA_TOTAL - cameraMajoritySeats;
    const senatoOppositionSeats = SENATO_TOTAL - senatoMajoritySeats;

    return {
      law,
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
  } else {
    // --- ROSATELLUM (Sistema misto maggioritario-proporzionale) ---
    const UNINOMINAL_CAMERA = 147;
    const PROPORTIONAL_CAMERA = 245;
    const UNINOMINAL_SENATO = 74;
    const PROPORTIONAL_SENATO = 122;

    const totalVotes =
      coalitionVoteSums.governo + coalitionVoteSums.campoLargo + coalitionVoteSums.centro + coalitionVoteSums.solitario || 1;

    const govShare = coalitionVoteSums.governo / totalVotes;
    const oppShare = coalitionVoteSums.campoLargo / totalVotes;
    const centerShare = coalitionVoteSums.centro / totalVotes;

    let govUniCam = Math.round(UNINOMINAL_CAMERA * Math.pow(govShare * 1.35, 1.3));
    let oppUniCam = Math.round(UNINOMINAL_CAMERA * Math.pow(oppShare * 1.25, 1.3));
    let centerUniCam = Math.max(0, UNINOMINAL_CAMERA - (govUniCam + oppUniCam));

    if (govUniCam + oppUniCam + centerUniCam !== UNINOMINAL_CAMERA) {
      govUniCam += UNINOMINAL_CAMERA - (govUniCam + oppUniCam + centerUniCam);
    }

    const validParties: { id: string; pct: number }[] = [];
    let validSum = 0;
    Object.entries(partyPercentages).forEach(([id, pct]) => {
      if (pct >= THRESHOLD) {
        validParties.push({ id, pct });
        validSum += pct;
      }
    });

    validParties.forEach(({ id, pct }) => {
      const relativePropShare = pct / (validSum || 1);
      const propCamera = Math.round(PROPORTIONAL_CAMERA * relativePropShare);
      const propSenato = Math.round(PROPORTIONAL_SENATO * relativePropShare);

      const cKey = coalitionMap[id] || 'solitario';
      const cTotal = coalitionVoteSums[cKey] || 1;
      const shareInCoalition = pct / cTotal;

      let uninominalCam = 0;
      let uninominalSen = 0;
      if (cKey === 'governo') {
        uninominalCam = Math.round(govUniCam * shareInCoalition);
        uninominalSen = Math.round((UNINOMINAL_SENATO * (govUniCam / UNINOMINAL_CAMERA)) * shareInCoalition);
      } else if (cKey === 'campoLargo') {
        uninominalCam = Math.round(oppUniCam * shareInCoalition);
        uninominalSen = Math.round((UNINOMINAL_SENATO * (oppUniCam / UNINOMINAL_CAMERA)) * shareInCoalition);
      }

      results[id] = {
        cameraSeats: propCamera + uninominalCam,
        senatoSeats: propSenato + uninominalSen,
        percentage: pct,
        passedThreshold: true,
        status: cKey === 'governo' ? 'Maggioranza' : cKey === 'centro' ? 'Centro' : 'Opposizione',
      };
    });

    Object.entries(partyPercentages).forEach(([id, pct]) => {
      if (!results[id]) {
        results[id] = {
          cameraSeats: 0,
          senatoSeats: 0,
          percentage: pct,
          passedThreshold: false,
          status: 'Fuori',
        };
      }
    });

    const cameraGovSeats = Object.entries(results)
      .filter(([id]) => coalitionMap[id] === 'governo')
      .reduce((acc, [, r]) => acc + r.cameraSeats, 0);
    const senatoGovSeats = Object.entries(results)
      .filter(([id]) => coalitionMap[id] === 'governo')
      .reduce((acc, [, r]) => acc + r.senatoSeats, 0);

    return {
      law,
      winningCoalition: govShare >= oppShare ? 'governo' : 'campoLargo',
      winningCoalitionLabel: govShare >= oppShare ? 'Centrodestra' : 'Centrosinistra',
      majorityAwarded: false,
      cameraMajoritySeats: cameraGovSeats,
      senatoMajoritySeats: senatoGovSeats,
      cameraOppositionSeats: CAMERA_TOTAL - cameraGovSeats,
      senatoOppositionSeats: SENATO_TOTAL - senatoGovSeats,
      coalitionTotals: {
        governo: Number(coalitionVoteSums.governo.toFixed(1)),
        campoLargo: Number(coalitionVoteSums.campoLargo.toFixed(1)),
        centro: Number(coalitionVoteSums.centro.toFixed(1)),
        altri: Number(coalitionVoteSums.solitario.toFixed(1)),
      },
      parties: results,
    };
  }
}

/**
 * Confronto dedicato tra le due ipotesi politiche su Italia Viva (Matteo Renzi):
 * Ipotesi A: Italia Viva NEL Centrosinistra / Campo Largo
 * Ipotesi B: Italia Viva FUORI dal Centrosinistra (polo autonomo o terzo polo)
 */
export function compareItaliaVivaScenarios(
  partyPercentages: Record<string, number>,
  law: ElectoralLaw = 'stabilicum',
  includeVannacciInGov: boolean = false
) {
  // Scenario A: Italia Viva con il Centrosinistra
  const coalitionMapWithIv: Record<string, string> = {
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo',
    fn: includeVannacciInGov ? 'governo' : 'solitario',
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    iv: 'campoLargo', // Italia Viva nel Campo Largo
    azione: 'centro',
    altri: 'solitario',
  };

  // Scenario B: Italia Viva fuori dal Centrosinistra (autonoma / centro)
  const coalitionMapWithoutIv: Record<string, string> = {
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo',
    fn: includeVannacciInGov ? 'governo' : 'solitario',
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    iv: 'centro', // Italia Viva autonoma / centro
    azione: 'centro',
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
