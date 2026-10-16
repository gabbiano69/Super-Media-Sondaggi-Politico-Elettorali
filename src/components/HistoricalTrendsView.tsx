import React, { useState } from 'react';
import {
  HISTORICAL_SUPERMEDIAS,
  PARTIES,
  COMPONENT_POLLS_LAST_SATURDAY,
} from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import {
  ElectoralLaw,
  simulateParliamentSeats,
  compareItaliaVivaScenarios,
} from '../utils/seatSimulator';
import {
  Layers,
  Sliders,
  Check,
  RotateCcw,
  Scale,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
} from 'lucide-react';

export const HistoricalTrendsView: React.FC = () => {
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>(HISTORICAL_SUPERMEDIAS[0].id);

  // Electoral Law: Default is 'stabilicum' as requested!
  const [electoralLaw, setElectoralLaw] = useState<ElectoralLaw>('stabilicum');

  // Option to include or exclude Vannacci from government coalition
  const [includeVannacciInGov, setIncludeVannacciInGov] = useState<boolean>(true);

  // Active Italia Viva hypothesis ('con_csx' vs 'fuori_csx')
  const [ivHypothesis, setIvHypothesis] = useState<'con_csx' | 'fuori_csx'>('con_csx');

  // Dynamic coalition configuration state for custom tweaking
  const [coalitionConfig, setCoalitionConfig] = useState<Record<string, string>>({
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo', // Sud Chiama Nord nel Centrodestra
    fn: 'governo', // Futuro Nazionale (Vannacci)
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    iv: 'campoLargo', // Default: Italia Viva con il Centrosinistra
    azione: 'centro',
    altri: 'solitario',
  });

  const selectedRelease =
    HISTORICAL_SUPERMEDIAS.find((r) => r.id === selectedReleaseId) || HISTORICAL_SUPERMEDIAS[0];

  // Percentages map
  const partyPcts: Record<string, number> = {};
  Object.entries(selectedRelease.partyAverages).forEach(([k, v]) => {
    partyPcts[k] = v.percent;
  });

  // Handle IV Scenario switch
  const handleSelectIvHypothesis = (hypothesis: 'con_csx' | 'fuori_csx') => {
    setIvHypothesis(hypothesis);
    setCoalitionConfig((prev) => ({
      ...prev,
      iv: hypothesis === 'con_csx' ? 'campoLargo' : 'centro',
    }));
  };

  // Run full simulation
  const simulation = simulateParliamentSeats(partyPcts, coalitionConfig, electoralLaw);
  const seatProjections = simulation.parties;

  // Run comparative analysis for the two IV scenarios
  const ivComparison = compareItaliaVivaScenarios(partyPcts, electoralLaw, includeVannacciInGov);

  // Totals for Camera
  const cameraGovSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'governo')
    .reduce((acc, [, p]) => acc + p.cameraSeats, 0);

  const cameraOppSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'campoLargo')
    .reduce((acc, [, p]) => acc + p.cameraSeats, 0);

  const cameraCenterSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'centro')
    .reduce((acc, [, p]) => acc + p.cameraSeats, 0);

  // Totals for Senato
  const senatoGovSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'governo')
    .reduce((acc, [, p]) => acc + p.senatoSeats, 0);

  const senatoOppSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'campoLargo')
    .reduce((acc, [, p]) => acc + p.senatoSeats, 0);

  const senatoCenterSeats = Object.entries(seatProjections)
    .filter(([id]) => coalitionConfig[id] === 'centro')
    .reduce((acc, [, p]) => acc + p.senatoSeats, 0);

  const toggleCoalition = (partyId: string, coalition: 'governo' | 'campoLargo' | 'centro' | 'solitario') => {
    setCoalitionConfig((prev) => ({
      ...prev,
      [partyId]: coalition,
    }));
    if (partyId === 'iv') {
      setIvHypothesis(coalition === 'campoLargo' ? 'con_csx' : 'fuori_csx');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Serie Storica & Simulatore Parlamentare «Stabilicum»
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Esplora l'evoluzione dei consensi delle rilevazioni del sabato e simula l'impatto della legge elettorale del
          Premierato (<strong>Stabilicum</strong>) confrontando le due ipotesi politiche su <strong>Italia Viva</strong>.
        </p>
      </div>

      {/* Release Selector Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="text-xs font-semibold text-slate-500 mb-2">Seleziona data della rilevazione:</div>
        <div className="flex flex-wrap gap-2">
          {HISTORICAL_SUPERMEDIAS.map((rel) => {
            const isSelected = rel.id === selectedReleaseId;
            return (
              <button
                key={rel.id}
                onClick={() => setSelectedReleaseId(rel.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {rel.date}
              </button>
            );
          })}
        </div>
      </div>

      {/* FOCUS CENTRALE: LE DUE IPOTESI SU ITALIA VIVA CON LO STABILICUM */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg space-y-6">
        <div className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Analisi di Scenario Elettorale</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Lo Stabilicum: Due Ipotesi su Centrosinistra (con o senza Italia Viva)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Con la legge elettorale del Premierato (<strong>Stabilicum</strong>), chi vince o arriva primo al ballottaggio
            conquista il <strong>premio di maggioranza del 55%</strong> (220 seggi alla Camera e 110 al Senato).
            Esattamente come per il Centrodestra (con o senza Vannacci), analizziamo in parallelo le due ipotesi per il
            Centrosinistra: con o senza Italia Viva di Matteo Renzi (2,4%).
          </p>
        </div>

        {/* Side-by-Side Scenario Cards (Both always displayed natively) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Centrosinistra SENZA Italia Viva */}
          <div className="rounded-xl p-5 border bg-slate-900/90 border-slate-700 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <h3 className="font-bold text-sm text-white">Centrosinistra SENZA Italia Viva</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">40,9%</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Composizione alleanza:</span>
                <span className="font-semibold text-slate-200">PD 21,1 | M5S 11,9 | AVS 6,5 | +E 1,4</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Confronto con Centrodestra (42,1%):</span>
                <span className="font-bold text-rose-400">Centrodestra avanti (+1,2%)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Premio Maggioranza 55% Stabilicum:</span>
                <span className="font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  Assegnato al Centrodestra (220 Seggi)
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Seggi Centrosinistra (45% Opposizione):</span>
                <span className="font-mono text-slate-300">180 Camera · 90 Senato</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Destino Italia Viva (2,4% isolata):</span>
                <span className="font-bold text-rose-400">0 Seggi (Sotto sbarramento 3%)</span>
              </div>
              <p className="text-slate-300 text-[11px] pt-2 border-t border-slate-800 leading-relaxed">
                Senza Italia Viva, il Centrosinistra si ferma al 40,9% cedendo la vittoria al Centrodestra (42,1%).
                Inoltre, correndo isolata, Italia Viva non supera la soglia del 3% dello Stabilicum e viene completamente azzerata.
              </p>
            </div>
          </div>

          {/* Card B: Centrosinistra CON Italia Viva */}
          <div className="rounded-xl p-5 border bg-slate-900/90 border-rose-500/80 shadow-md ring-1 ring-rose-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <h3 className="font-bold text-sm text-white">Centrosinistra CON Italia Viva</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">43,3%</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Composizione alleanza:</span>
                <span className="font-semibold text-rose-200">PD 21,1 | M5S 11,9 | AVS 6,5 | IV 2,4 | +E 1,4</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Confronto con Centrodestra (42,1%):</span>
                <span className="font-bold text-emerald-400">Centrosinistra in Vantaggio (+1,2%)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Premio Maggioranza 55% Stabilicum:</span>
                <span className="font-bold text-white bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                  Vince Centrosinistra: 220 Seggi alla Camera
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Rappresentanza per Italia Viva:</span>
                <span className="font-semibold text-emerald-300">12–14 Deputati · 6–7 Senatori</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Impatto Politico:</span>
                <span className="font-bold text-emerald-300">Ribaltamento della contesa</span>
              </div>
              <p className="text-slate-300 text-[11px] pt-2 border-t border-slate-800 leading-relaxed">
                Con Matteo Renzi federato nel Campo Largo, il Centrosinistra sorpassa il Centrodestra di governo
                (43,3% vs 42,1%) e si aggiudica la guida del governo col premio del 55%, blindando la pattuglia di IV.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Explainer of Stabilicum Rules */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-white flex items-center gap-1.5 text-xs">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Come Funziona il Meccanismo di Assegnazione dello Stabilicum:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-400">
            <div>
              <strong className="text-slate-200">1. Premio del 55% Blindato:</strong> La coalizione o lista collegata al candidato Premier che vince ottiene automaticamente 220 deputati (su 400) e 110 senatori (su 200).
            </div>
            <div>
              <strong className="text-slate-200">2. Quota Opposizioni al 45%:</strong> I rimanenti 180 deputati e 90 senatori vengono ripartiti proporzionalmente tra le opposizioni che superano la soglia del 3%.
            </div>
            <div>
              <strong className="text-slate-200">3. Sud Chiama Nord (1,1%):</strong> Essendo parte della coalizione di Centrodestra, beneficia del premio di maggioranza senza subire la ghigliottina del 3%.
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Matrix: Media Ponderata vs Singoli Istituti */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Matrice Comparativa Istituti vs Nostra Supermedia ({selectedRelease.date})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confronto diretto tra le stime dei singoli istituti e la nostra media ponderata aggregata
            </p>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Partito</th>
                <th className="py-2.5 px-3 text-right bg-slate-50 font-bold text-slate-900 border-x border-slate-200">
                  Nostra Supermedia
                </th>
                <th className="py-2.5 px-3 text-right">SWG (La7)</th>
                <th className="py-2.5 px-3 text-right">Eumetra (Piazzapulita)</th>
                <th className="py-2.5 px-3 text-right">Ixè (Cartabianca)</th>
                <th className="py-2.5 px-3 text-right">Tecnè (Mediaset)</th>
                <th className="py-2.5 px-3 text-right">Quorum (Sky)</th>
                <th className="py-2.5 px-3 text-right">Noto (Rai 1)</th>
                <th className="py-2.5 px-3 text-right">EMG (Rai 3)</th>
                <th className="py-2.5 px-3 text-right">Only Numbers</th>
                <th className="py-2.5 px-3 text-center">Dispersione (Max - Min)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(PARTIES)
                .filter((p) => p !== 'altri')
                .map((partyId) => {
                  const party = PARTIES[partyId];
                  const smVal = selectedRelease.partyAverages[partyId]?.percent || 0;

                  // Find latest poll per institute
                  const swg = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'SWG')?.results[partyId] || smVal;
                  const eumetra = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Eumetra')?.results[partyId] || smVal;
                  const ixe = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Istituto Ixè')?.results[partyId] || smVal;
                  const tecne = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Tecnè')?.results[partyId] || smVal;
                  const quorum = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Quorum')?.results[partyId] || smVal;
                  const noto = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Noto Sondaggi')?.results[partyId] || smVal;
                  const emg = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'EMG Different')?.results[partyId] || smVal;
                  const on = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Only Numbers')?.results[partyId] || smVal;

                  const values = [swg, eumetra, ixe, tecne, quorum, noto, emg, on];
                  const min = Math.min(...values);
                  const max = Math.max(...values);
                  const spread = Number((max - min).toFixed(1));

                  return (
                    <tr key={partyId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <PartyLogo partyId={partyId} size="sm" />
                        <span>{party.name}</span>
                        <span className="text-slate-400 font-normal">({party.shortName})</span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums font-extrabold text-slate-900 bg-slate-50 border-x border-slate-200">
                        {smVal.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {swg.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {eumetra.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {ixe.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {tecne.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {quorum.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {noto.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {emg.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                        {on.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-center font-mono tabular-nums text-slate-500">
                        ±{spread.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Seat Simulator Component with Law Switcher */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Simulatore di Seggi Parlamentari
              </h2>
              <span className="text-[11px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                {electoralLaw === 'stabilicum' ? 'Stabilicum (55% Premio)' : 'Rosatellum (Misto)'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configura liberamente le coalizioni o seleziona la legge elettorale per calcolare i seggi a Montecitorio e Palazzo Madama
            </p>
          </div>

          {/* Law Selector Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setElectoralLaw('stabilicum')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  electoralLaw === 'stabilicum'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Stabilicum (Premierato)
              </button>
              <button
                onClick={() => setElectoralLaw('rosatellum')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                  electoralLaw === 'rosatellum'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rosatellum (Misto)
              </button>
            </div>

            <button
              onClick={() =>
                setCoalitionConfig({
                  fdi: 'governo',
                  fi: 'governo',
                  lega: 'governo',
                  nm: 'governo',
                  scn: 'governo',
                  fn: 'governo',
                  pd: 'campoLargo',
                  m5s: 'campoLargo',
                  avs: 'campoLargo',
                  piueu: 'campoLargo',
                  iv: ivHypothesis === 'con_csx' ? 'campoLargo' : 'centro',
                  azione: 'centro',
                  altri: 'solitario',
                })
              }
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer p-1.5 rounded-lg border border-slate-200"
              title="Ripristina coalizioni standard"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chambers KPI Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Camera dei Deputati (400 seggi - Quorum 201) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Camera dei Deputati</h3>
                <span className="text-xs text-slate-500">
                  400 seggi totali · Quorum: 201 · {electoralLaw === 'stabilicum' ? 'Premio 55%: 220' : 'Misto'}
                </span>
              </div>
              <div
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  cameraGovSeats >= 201 ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'
                }`}
              >
                {cameraGovSeats >= 201 ? 'Maggioranza Centrodestra' : 'Maggioranza Centrosinistra'}
              </div>
            </div>

            {/* Segmented bar for Camera */}
            <div className="mt-4 relative h-6 rounded-md overflow-hidden bg-slate-200 flex">
              <div
                style={{ width: `${(cameraGovSeats / 400) * 100}%` }}
                className="bg-blue-800 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Centrodestra: ${cameraGovSeats} seggi`}
              >
                {cameraGovSeats > 20 && `${cameraGovSeats}`}
              </div>
              <div
                style={{ width: `${(cameraCenterSeats / 400) * 100}%` }}
                className="bg-amber-600 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Centro: ${cameraCenterSeats} seggi`}
              >
                {cameraCenterSeats > 10 && `${cameraCenterSeats}`}
              </div>
              <div
                style={{ width: `${(cameraOppSeats / 400) * 100}%` }}
                className="bg-rose-700 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Campo Largo: ${cameraOppSeats} seggi`}
              >
                {cameraOppSeats > 20 && `${cameraOppSeats}`}
              </div>

              {/* Threshold line 201 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow"
                style={{ left: `${(201 / 400) * 100}%` }}
                title="Quorum 201 seggi"
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs font-medium">
              <span className="text-blue-900 font-bold">CDX: {cameraGovSeats}</span>
              <span className="text-amber-800">Centro: {cameraCenterSeats}</span>
              <span className="text-rose-700 font-bold">CSX & M5S: {cameraOppSeats}</span>
            </div>
          </div>

          {/* Senato della Repubblica (200 seggi - Quorum 101) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Senato della Repubblica</h3>
                <span className="text-xs text-slate-500">
                  200 seggi elettivi · Quorum: 101 · {electoralLaw === 'stabilicum' ? 'Premio 55%: 110' : 'Misto'}
                </span>
              </div>
              <div
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  senatoGovSeats >= 101 ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'
                }`}
              >
                {senatoGovSeats >= 101 ? 'Maggioranza Centrodestra' : 'Maggioranza Centrosinistra'}
              </div>
            </div>

            {/* Segmented bar for Senato */}
            <div className="mt-4 relative h-6 rounded-md overflow-hidden bg-slate-200 flex">
              <div
                style={{ width: `${(senatoGovSeats / 200) * 100}%` }}
                className="bg-blue-800 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Centrodestra: ${senatoGovSeats} seggi`}
              >
                {senatoGovSeats > 10 && `${senatoGovSeats}`}
              </div>
              <div
                style={{ width: `${(senatoCenterSeats / 200) * 100}%` }}
                className="bg-amber-600 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Centro: ${senatoCenterSeats} seggi`}
              >
                {senatoCenterSeats > 5 && `${senatoCenterSeats}`}
              </div>
              <div
                style={{ width: `${(senatoOppSeats / 200) * 100}%` }}
                className="bg-rose-700 h-full flex items-center justify-center text-white text-[10px] font-mono font-bold"
                title={`Campo Largo: ${senatoOppSeats} seggi`}
              >
                {senatoOppSeats > 10 && `${senatoOppSeats}`}
              </div>

              {/* Threshold line 101 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10 shadow"
                style={{ left: `${(101 / 200) * 100}%` }}
                title="Quorum 101 seggi"
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs font-medium">
              <span className="text-blue-900 font-bold">CDX: {senatoGovSeats}</span>
              <span className="text-amber-800">Centro: {senatoCenterSeats}</span>
              <span className="text-rose-700 font-bold">CSX & M5S: {senatoOppSeats}</span>
            </div>
          </div>
        </div>

        {/* Interactive Party Coalition Switcher & Projection Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Partito</th>
                <th className="py-2.5 px-3 text-right">Percentuale</th>
                <th className="py-2.5 px-3">Soglia (3%)</th>
                <th className="py-2.5 px-3">Alleanza Assegnata</th>
                <th className="py-2.5 px-3 text-right font-bold text-slate-900">Seggi Camera</th>
                <th className="py-2.5 px-3 text-right font-bold text-slate-900">Seggi Senato</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(PARTIES)
                .filter((p) => p !== 'altri')
                .map((partyId) => {
                  const party = PARTIES[partyId];
                  const proj = seatProjections[partyId] || { cameraSeats: 0, senatoSeats: 0, passedThreshold: false };
                  const currentCoalition = coalitionConfig[partyId];

                  return (
                    <tr
                      key={partyId}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        partyId === 'iv' ? 'bg-amber-50/40 font-medium' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <PartyLogo partyId={partyId} size="sm" />
                        <span>{party.name}</span>
                        {partyId === 'iv' && (
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-1 rounded font-bold">
                            Oggetto di Ipotesi
                          </span>
                        )}
                        {partyId === 'scn' && (
                          <span className="text-[10px] bg-blue-100 text-blue-900 px-1 rounded font-semibold">
                            CDX
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {partyPcts[partyId]?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3">
                        {proj.passedThreshold ? (
                          <span className="text-emerald-700 font-medium">Superata (≥3%)</span>
                        ) : (
                          <span className="text-rose-600 font-medium">Sotto soglia (&lt;3%)</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleCoalition(partyId, 'governo')}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                              currentCoalition === 'governo'
                                ? 'bg-blue-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Gov
                          </button>
                          <button
                            onClick={() => toggleCoalition(partyId, 'campoLargo')}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                              currentCoalition === 'campoLargo'
                                ? 'bg-rose-700 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Opp
                          </button>
                          <button
                            onClick={() => toggleCoalition(partyId, 'centro')}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                              currentCoalition === 'centro'
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Centro
                          </button>
                          <button
                            onClick={() => toggleCoalition(partyId, 'solitario')}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                              currentCoalition === 'solitario'
                                ? 'bg-slate-800 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Solo
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {proj.cameraSeats}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {proj.senatoSeats}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
