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

  // Active preset state for instant 1-click simulation
  const [activePreset, setActivePreset] = useState<'campoLargoWin' | 'cdxVannacciWin' | 'cdxNoIVWin' | 'custom'>('campoLargoWin');

  // Option to include or exclude Vannacci from government coalition
  const [includeVannacciInGov, setIncludeVannacciInGov] = useState<boolean>(false);

  // Active Italia Viva hypothesis ('con_csx' vs 'fuori_csx')
  const [ivHypothesis, setIvHypothesis] = useState<'con_csx' | 'fuori_csx'>('con_csx');

  // Dynamic coalition configuration state for custom tweaking (Default: Campo Largo con IV vince!)
  const [coalitionConfig, setCoalitionConfig] = useState<Record<string, string>>({
    fdi: 'governo',
    fi: 'governo',
    lega: 'governo',
    nm: 'governo',
    scn: 'governo', // Sud Chiama Nord nel Centrodestra
    fn: 'solitario', // Futuro Nazionale (Vannacci) corre autonomo per default nel test
    pd: 'campoLargo',
    m5s: 'campoLargo',
    avs: 'campoLargo',
    piueu: 'campoLargo',
    progettocivico: 'campoLargo', // Progetto Civico (Campo Largo)
    piuuno: 'campoLargo', // Più Uno (Campo Largo)
    iv: 'campoLargo', // Italia Viva con il Centrosinistra / Campo Largo -> Sorpasso al 44.5%!
    pld: 'solitario', // Partito Liberaldemocratico (Marattin): Fuori dai poli, da solo
    azione: 'centro',
    altri: 'solitario',
  });

  const activatePreset = (preset: 'campoLargoWin' | 'cdxVannacciWin' | 'cdxNoIVWin') => {
    setActivePreset(preset);
    if (preset === 'campoLargoWin') {
      // Sorpasso: Campo Largo con IV (44.5%) vs CDX senza Vannacci (43.2%) -> VITTORIA CAMPO LARGO!
      setIncludeVannacciInGov(false);
      setIvHypothesis('con_csx');
      setCoalitionConfig({
        fdi: 'governo',
        fi: 'governo',
        lega: 'governo',
        nm: 'governo',
        scn: 'governo',
        fn: 'solitario',
        pd: 'campoLargo',
        m5s: 'campoLargo',
        avs: 'campoLargo',
        piueu: 'campoLargo',
        progettocivico: 'campoLargo',
        piuuno: 'campoLargo',
        iv: 'campoLargo',
        pld: 'solitario',
        azione: 'centro',
        altri: 'solitario',
      });
    } else if (preset === 'cdxVannacciWin') {
      // CDX con Futuro Nazionale unito (50.9%) vs Campo Largo con IV (44.5%) -> VITTORIA CENTRODESTRA!
      setIncludeVannacciInGov(true);
      setIvHypothesis('con_csx');
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
        progettocivico: 'campoLargo',
        piuuno: 'campoLargo',
        iv: 'campoLargo',
        pld: 'solitario',
        azione: 'centro',
        altri: 'solitario',
      });
    } else if (preset === 'cdxNoIVWin') {
      // Campo Largo senza IV (42.1%) vs CDX (43.2%) -> VITTORIA CENTRODESTRA PER MANCATA INTESA!
      setIncludeVannacciInGov(false);
      setIvHypothesis('fuori_csx');
      setCoalitionConfig({
        fdi: 'governo',
        fi: 'governo',
        lega: 'governo',
        nm: 'governo',
        scn: 'governo',
        fn: 'solitario',
        pd: 'campoLargo',
        m5s: 'campoLargo',
        avs: 'campoLargo',
        piueu: 'campoLargo',
        progettocivico: 'campoLargo',
        piuuno: 'campoLargo',
        iv: 'centro',
        pld: 'solitario',
        azione: 'centro',
        altri: 'solitario',
      });
    }
  };

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
    setActivePreset('custom');
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
              <span className="text-xs font-mono font-bold text-slate-300">
                {selectedRelease.coalitions?.opposizioneCampoLargo?.total.toFixed(1) || '42.1'}%
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Composizione alleanza:</span>
                <span className="font-semibold text-slate-200">
                  PD {selectedRelease.partyAverages.pd?.percent.toFixed(1)} | M5S {selectedRelease.partyAverages.m5s?.percent.toFixed(1)} | AVS {selectedRelease.partyAverages.avs?.percent.toFixed(1)} | +E {selectedRelease.partyAverages.piueu?.percent.toFixed(1)} | Civici {selectedRelease.partyAverages.progettocivico?.percent.toFixed(1)}+{selectedRelease.partyAverages.piuuno?.percent.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Confronto con Centrodestra ({selectedRelease.coalitions?.governo?.total.toFixed(1) || '43.2'}%):</span>
                <span className="font-bold text-rose-400">
                  Centrodestra avanti (+{((selectedRelease.coalitions?.governo?.total || 43.2) - (selectedRelease.coalitions?.opposizioneCampoLargo?.total || 42.1)).toFixed(1)}%)
                </span>
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
                <span className="text-slate-400">Destino Italia Viva ({selectedRelease.partyAverages.iv?.percent.toFixed(1)}% isolata):</span>
                <span className="font-bold text-rose-400">0 Seggi (Sotto sbarramento 3%)</span>
              </div>
              <p className="text-slate-300 text-[11px] pt-2 border-t border-slate-800 leading-relaxed">
                Senza Italia Viva, il Centrosinistra si ferma al {selectedRelease.coalitions?.opposizioneCampoLargo?.total.toFixed(1) || '42.1'}% cedendo la vittoria al Centrodestra ({selectedRelease.coalitions?.governo?.total.toFixed(1) || '43.2'}%).
                Inoltre, correndo isolata, Italia Viva non supera la soglia del 3% dello Stabilicum e non accede al riparto proporzionale.
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
              <span className="text-xs font-mono font-bold text-rose-400">
                {selectedRelease.coalitions?.centrosinistraConIV?.total.toFixed(1) || '44.5'}%
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Composizione alleanza:</span>
                <span className="font-semibold text-rose-200">
                  PD {selectedRelease.partyAverages.pd?.percent.toFixed(1)} | M5S {selectedRelease.partyAverages.m5s?.percent.toFixed(1)} | AVS {selectedRelease.partyAverages.avs?.percent.toFixed(1)} | IV {selectedRelease.partyAverages.iv?.percent.toFixed(1)} | +E {selectedRelease.partyAverages.piueu?.percent.toFixed(1)} | Civici
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400">Confronto con Centrodestra ({selectedRelease.coalitions?.governo?.total.toFixed(1) || '43.2'}%):</span>
                <span className="font-bold text-emerald-400">
                  Centrosinistra in Vantaggio (+{((selectedRelease.coalitions?.centrosinistraConIV?.total || 44.5) - (selectedRelease.coalitions?.governo?.total || 43.2)).toFixed(1)}%)
                </span>
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
                ({selectedRelease.coalitions?.centrosinistraConIV?.total.toFixed(1) || '44.5'}% vs {selectedRelease.coalitions?.governo?.total.toFixed(1) || '43.2'}%) e si aggiudica la guida del governo col premio del 55%.
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
                <th className="py-2.5 px-3 text-right">Only Numbers</th>
                <th className="py-2.5 px-3 text-right">Istituto Piepoli</th>
                <th className="py-2.5 px-3 text-right">Tecnè (Mediaset)</th>
                <th className="py-2.5 px-3 text-right">SWG (La7)</th>
                <th className="py-2.5 px-3 text-right">Ipsos (Corriere)</th>
                <th className="py-2.5 px-3 text-right">Noto (Rai 1)</th>
                <th className="py-2.5 px-3 text-right">Quorum (Sky)</th>
                <th className="py-2.5 px-3 text-right">Eumetra (La7)</th>
                <th className="py-2.5 px-3 text-right">EMG (Rai 3)</th>
                <th className="py-2.5 px-3 text-right">Ixè (Rete 4)</th>
                <th className="py-2.5 px-3 text-right">Demopolis</th>
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
                  const on = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Only Numbers')?.results[partyId];
                  const piepoli = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Istituto Piepoli')?.results[partyId];
                  const tecne = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Tecnè')?.results[partyId];
                  const swg = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'SWG')?.results[partyId];
                  const ipsos = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Ipsos Italia')?.results[partyId];
                  const noto = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Noto Sondaggi')?.results[partyId];
                  const quorum = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Quorum')?.results[partyId];
                  const eumetra = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Eumetra')?.results[partyId];
                  const emg = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'EMG Different')?.results[partyId];
                  const ixe = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Istituto Ixè')?.results[partyId];
                  const demopolis = COMPONENT_POLLS_LAST_SATURDAY.find((p) => p.institute === 'Istituto Demopolis')?.results[partyId];

                  const instituteValues = [on, piepoli, tecne, swg, ipsos, noto, quorum, eumetra, emg, ixe, demopolis];
                  const validValues = instituteValues.filter((v): v is number => typeof v === 'number');
                  const min = validValues.length > 0 ? Math.min(...validValues) : 0;
                  const max = validValues.length > 0 ? Math.max(...validValues) : 0;
                  const spread = Number((max - min).toFixed(1));

                  const renderVal = (v: number | undefined) => {
                    if (typeof v === 'number') {
                      return <span className="font-mono tabular-nums text-slate-700">{v.toFixed(1)}%</span>;
                    }
                    return <span className="text-slate-300 font-mono text-[11px]">—</span>;
                  };

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
                      <td className="py-2 px-3 text-right">{renderVal(on)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(piepoli)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(tecne)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(swg)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(ipsos)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(noto)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(quorum)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(eumetra)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(emg)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(ixe)}</td>
                      <td className="py-2 px-3 text-right">{renderVal(demopolis)}</td>
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
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Simulatore di Seggi Parlamentari
              </h2>
              <span className="text-[11px] font-bold bg-emerald-700 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Legge dello Stato: Stabilicum (Premio 55%)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Lo Stabilicum è legge dello Stato: assegna il 55% dei seggi (220 alla Camera e 110 al Senato) alla coalizione più votata.
            </p>
          </div>

          {/* Reset Coalitions Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => activatePreset('campoLargoWin')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
              title="Ripristina assetto con vittoria Campo Largo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset assetto</span>
            </button>
          </div>
        </div>

        {/* 3 Prominent Scenario Presets as requested by the user */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-slate-600" />
            <span>Seleziona Scenario Politico da Simulare:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Scenario 1: Vittoria Campo Largo con IV */}
            <button
              type="button"
              onClick={() => activatePreset('campoLargoWin')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activePreset === 'campoLargoWin'
                  ? 'border-rose-500 bg-rose-50/90 shadow-sm ring-2 ring-rose-400/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-950 flex items-center gap-1">
                    <span>🏆 1. Vittoria Campo Largo + IV</span>
                  </span>
                  {activePreset === 'campoLargoWin' && <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-rose-800">
                  Campo Largo 44,5% &gt; CDX 43,2%
                </div>
                <p className="mt-1.5 text-[10.5px] text-slate-600 leading-snug">
                  Sorpasso: con Italia Viva federata e Vannacci autonomo, il Centrosinistra vince il premio del 55% (220 Camera, 110 Senato).
                </p>
              </div>
            </button>

            {/* Scenario 2: Vittoria Centrodestra con Vannacci */}
            <button
              type="button"
              onClick={() => activatePreset('cdxVannacciWin')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activePreset === 'cdxVannacciWin'
                  ? 'border-blue-600 bg-blue-50/90 shadow-sm ring-2 ring-blue-500/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 flex items-center gap-1">
                    <span>2. Vittoria CDX + Vannacci</span>
                  </span>
                  {activePreset === 'cdxVannacciWin' && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-blue-800">
                  CDX con FN 50,9% &gt; Campo Largo 44,5%
                </div>
                <p className="mt-1.5 text-[10.5px] text-slate-600 leading-snug">
                  Maggioranza assoluta di destra: includendo Futuro Nazionale, il Centrodestra supera il 50% e conquista il premio.
                </p>
              </div>
            </button>

            {/* Scenario 3: Vittoria Centrodestra per rottura con IV */}
            <button
              type="button"
              onClick={() => activatePreset('cdxNoIVWin')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activePreset === 'cdxNoIVWin'
                  ? 'border-slate-600 bg-slate-100 shadow-sm ring-2 ring-slate-400/30'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>3. Vittoria CDX (Senza IV)</span>
                  </span>
                  {activePreset === 'cdxNoIVWin' && <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-slate-700">
                  CDX 43,2% &gt; Campo Largo 42,1%
                </div>
                <p className="mt-1.5 text-[10.5px] text-slate-600 leading-snug">
                  Mancata intesa: senza Italia Viva (2,4%), il Campo Largo si ferma al 42,1% e il Centrodestra vince per 1,1 punti.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Winner Outcome Alert Banner */}
        {simulation.winningCoalition === 'campoLargo' ? (
          <div className="p-4 rounded-xl border border-rose-300 bg-rose-50/90 text-rose-950 flex items-start gap-3 shadow-xs">
            <Award className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-extrabold text-sm text-rose-950 flex items-center gap-2">
                <span>🏆 ESITO SIMULAZIONE: MAGGIORANZA PARLAMENTARE AL CAMPO LARGO CON ITALIA VIVA</span>
                <span className="bg-rose-200 text-rose-900 font-mono text-[11px] px-2 py-0.5 rounded font-bold">
                  220 Seggi Camera · 110 Seggi Senato
                </span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                Con l'inclusione di Italia Viva (2,4%), il Campo Largo raggiunge il <strong>44,5%</strong> dei consensi, superando il Centrodestra tradizionale (<strong>43,2%</strong>). In base alla legge <em>Stabilicum</em>, la coalizione progressista ottiene il <strong>premio di maggioranza del 55%</strong> ed esprime il Presidente del Consiglio.
              </p>
            </div>
          </div>
        ) : simulation.winningCoalition === 'governo' ? (
          <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/90 text-blue-950 flex items-start gap-3 shadow-xs">
            <Award className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-extrabold text-sm text-blue-950 flex items-center gap-2">
                <span>🏆 ESITO SIMULAZIONE: MAGGIORANZA PARLAMENTARE AL CENTRODESTRA</span>
                <span className="bg-blue-200 text-blue-900 font-mono text-[11px] px-2 py-0.5 rounded font-bold">
                  220 Seggi Camera · 110 Seggi Senato
                </span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                Il Centrodestra si attesta al primo posto nella competizione elettorale e ottiene il <strong>premio di maggioranza del 55%</strong>, assicurandosi 220 deputati e 110 senatori per formare il governo.
              </p>
            </div>
          </div>
        ) : null}

        {/* Chambers KPI Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera dei Deputati (400 seggi - Quorum 201) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Camera dei Deputati</h3>
                <span className="text-xs text-slate-500">
                  400 seggi totali · Quorum: 201 · Premio di maggioranza 55%: 220 seggi
                </span>
              </div>
              <div
                className={`text-xs font-bold px-2.5 py-1 rounded ${
                  simulation.winningCoalition === 'campoLargo'
                    ? 'bg-rose-100 text-rose-900 font-mono'
                    : 'bg-blue-100 text-blue-900 font-mono'
                }`}
              >
                {simulation.winningCoalition === 'campoLargo' ? 'Maggioranza Campo Largo (220)' : 'Maggioranza Centrodestra (220)'}
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
                  200 seggi elettivi · Quorum: 101 · Premio di maggioranza 55%: 110 seggi
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

      {/* Official Datasets Archive Card (Answering: "esiste un csv storico? Sì!") */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Archivio Ufficiale Dataset CSV (Settimanale & Storico)
            </h3>
            <p className="text-xs text-slate-500">
              Tutti i dati storici e settimanali sono archiviati in formato aperto CSV per garantire la massima trasparenza e riproducibilità.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">1. CSV Serie Storica 2026</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                  Archivio Storico
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                File: <code className="bg-slate-200/80 px-1 py-0.5 rounded text-[11px]">sondaggi_serie_storica_2026.csv</code>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Contiene la serie cronologica di tutte le Supermedie settimanali del 2026, con le medie dei partiti, il numero di istituti e i totali delle coalizioni ad ogni sabato.
              </p>
            </div>
            <a
              href="/data/sondaggi_serie_storica_2026.csv"
              download="sondaggi_serie_storica_2026.csv"
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Scarica CSV Serie Storica</span>
            </a>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">2. CSV Sabato 17 Ottobre 2026</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                  Rilevazione Attiva
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600">
                File: <code className="bg-slate-200/80 px-1 py-0.5 rounded text-[11px]">sondaggi_settimana_17_ottobre_2026.csv</code>
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Dataset completo delle 11 rilevazioni accreditate a sabato 17 ottobre (SWG, Tecnè, Noto, Quorum, EMG, Eumetra, Ixè, Ipsos, Demopolis, Only Numbers, Piepoli) con tutti i 16 partiti.
              </p>
            </div>
            <a
              href="/data/sondaggi_settimana_17_ottobre_2026.csv"
              download="sondaggi_settimana_17_ottobre_2026.csv"
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Scarica CSV Sabato 17 Ottobre</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
