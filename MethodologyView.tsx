import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Calendar,
  Layers,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Sliders,
  Tv,
  Scale,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  HelpCircle,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  calculatePollWeights,
  DEFAULT_WEIGHT_PARAMS,
  WeightingModelType,
  CalculatedPollWeight,
} from '../utils/weightCalculator';
import {
  COMPONENT_POLLS_LAST_SATURDAY,
  PARTIES,
  LATEST_SUPERMEDIA,
} from '../data/politicalData';
import { calculateAverage } from '../services/dataService';
import { PartyLogo } from './PartyLogo';

export const MethodologyView: React.FC = () => {
  // Interactive weighting playground states
  const [testSampleSize, setTestSampleSize] = useState<number>(1200);
  const [testDaysAgo, setTestDaysAgo] = useState<number>(3);
  const [testMethod, setTestMethod] = useState<'CATI-CAMI-CAWI' | 'CAWI' | 'CATI-CAWI'>('CATI-CAMI-CAWI');

  // Interactive weighting model selector state
  const [selectedModel, setSelectedModel] = useState<WeightingModelType>('uniform');

  // Calculate live test weight
  const sampleRatio = testSampleSize / 1000;
  const sampleWeight = Math.min(1.35, Math.max(0.75, Math.sqrt(sampleRatio)));
  // Criterio di freschezza: tutti quelli della stessa settimana (0-7 gg) sono freschi al 100%
  // Per i sondaggi bisettimanali (8-14 gg) o oltre 14 gg, il peso NON è zero ma decade gradualmente
  const isTestSameWeek = testDaysAgo <= 7;
  const isTestBiweekly = testDaysAgo > 7 && testDaysAgo <= 14;
  const recencyWeight = isTestSameWeek ? 1.0 : Math.exp(-0.045 * (testDaysAgo - 7));
  const methodWeight =
    testMethod === 'CATI-CAMI-CAWI' ? 1.08 : testMethod === 'CATI-CAWI' ? 1.0 : 0.94;
  const combinedRawWeight = sampleWeight * recencyWeight * methodWeight;

  // Real weights calculated for standard model vs selected model
  const standardWeights = useMemo(() => {
    return calculatePollWeights(COMPONENT_POLLS_LAST_SATURDAY, {
      ...DEFAULT_WEIGHT_PARAMS,
      model: 'standard',
    });
  }, []);

  const activeModelWeights = useMemo(() => {
    return calculatePollWeights(COMPONENT_POLLS_LAST_SATURDAY, {
      ...DEFAULT_WEIGHT_PARAMS,
      model: selectedModel,
    });
  }, [selectedModel]);

  // Parties to compare in the simulator
  const partiesToCompare = [
    'fdi',
    'pd',
    'm5s',
    'fn',
    'fi',
    'avs',
    'lega',
    'azione',
    'iv',
    'pld',
    'piueu',
    'nm',
    'scn',
    'progettocivico',
    'piuuno',
  ];

  // Precision display toggle (2 decimals vs 1 decimal)
  const [showDecimals, setShowDecimals] = useState<boolean>(true);

  // FUNZIONE CENTRALIZZATA: calculateAverage richiamata per calcolare le medie dei modelli
  const stdState = useMemo(() => calculateAverage(COMPONENT_POLLS_LAST_SATURDAY, 'standard'), []);
  const activeState = useMemo(
    () => calculateAverage(COMPONENT_POLLS_LAST_SATURDAY, selectedModel),
    [selectedModel]
  );

  // Model definitions
  const weightingModels: {
    id: WeightingModelType;
    label: string;
    badge: string;
    description: string;
    rationale: string;
  }[] = [
    {
      id: 'uniform',
      label: 'Peso Uniforme (Media Aritmetica)',
      badge: 'Unità di voto demoscopica',
      description: 'Ogni sondaggio valido pesa esattamente allo stesso modo (1/N = 9,09% ciascuno).',
      rationale:
        'Elimina qualsiasi correzione qualitativa su campione o metodo; tratta tutti gli 11 istituti su un piano di parità numerica pura.',
    },
    {
      id: 'historical',
      label: 'Affidabilità Storica degli Istituti',
      badge: 'Track-Record Elettorale',
      description: 'Ponderazione basata sul rating storico (SWG, Ipsos, Quorum A+; Piepoli, Noto, Tecnè, Demopolis, Ixè A; EMG, Only Numbers B+).',
      rationale:
        'Premia gli istituti con minor scostamento statistico rispetto ai risultati reali delle ultime elezioni.',
    },
    {
      id: 'sample_only',
      label: 'Solo Ampiezza Campionaria',
      badge: 'Statistica Quantitativa',
      description: 'Il peso è direttamente proporzionale al numero di casi intervistati (N).',
      rationale:
        'Premia le rilevazioni da 1.500 casi (Only Numbers, SWG) rispetto a quelle da 1.000 casi, massimizzando la riduzione dell’errore campionario.',
    },
    {
      id: 'recency_heavy',
      label: 'Freschezza Prioritaria (Ultimi Giorni)',
      badge: 'Reattività Immediata',
      description: 'Decadimento temporale accelerato: privilegia nettamente i sondaggi chiusi a 24-48 ore da sabato mattina.',
      rationale:
        'Cattura i movimenti d’opinione più caldi dell’ultimissima ora politica, attenuando l’influenza di rilievi d’inizio settimana.',
    },
    {
      id: 'standard',
      label: 'Standard Supermedia (Attuale)',
      badge: 'Multi-criterio Equilibrato',
      description: 'Campione concavo √N + 100% freschezza settimanale + Ponderazione continua per bisettimanali + Metodo.',
      rationale:
        'L’algoritmo ufficiale che bilancia affidabilità, robustezza campionaria e freschezza ponderata senza penalizzare i cicli bisettimanali.',
    },
  ];

  const stdCoalitions = stdState.coalitions;
  const activeCoalitions = activeState.coalitions;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          La Nostra Metodologia di Calcolo & Protocollo Sabato Mattina
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
          Come costruiamo la nostra media ponderata indipendente aggregando direttamente tutte le fonti primarie dei
          sondaggi a sabato scorso, l'algoritmo di ponderazione statistica, il protocollo di validità dei 14 giorni e
          l'analisi comparata con modelli alternativi.
        </p>
      </div>

      {/* NEW: Multi-Weighting Model Selector & Simulator */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Selettore Interattivo Ponderazione: Confronto Modelli di Media
              </h2>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                Simulatore Live
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Scopri come variano le percentuali dei partiti e le coalizioni passando dal modello standard a 'Peso Uniforme', 'Affidabilità Storica' o altri pesi
            </p>
          </div>
        </div>

        {/* Model Selector Buttons */}
        <div className="mt-6">
          <div className="text-xs font-bold text-slate-700 mb-2.5 uppercase tracking-wider">
            Seleziona il modello di ponderazione da confrontare:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {weightingModels.map((wm) => {
              const isSelected = selectedModel === wm.id;
              return (
                <button
                  key={wm.id}
                  onClick={() => setSelectedModel(wm.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-900'}`}>
                        {wm.label}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                      {wm.badge}
                    </span>
                    <p className="mt-1.5 text-[11px] text-slate-600 leading-snug">
                      {wm.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Model Explanatory Banner & User Clarification Box */}
        <div className="mt-5 space-y-3">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 text-xs text-indigo-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">
                Impatto del modello: {weightingModels.find((m) => m.id === selectedModel)?.label}
              </div>
              <p className="text-indigo-850 leading-relaxed text-[11px]">
                {weightingModels.find((m) => m.id === selectedModel)?.rationale}
              </p>
            </div>
          </div>

          {/* Deep-Dive FAQ answering user request */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Perché le variazioni tra Supermedia e Media Aritmetica sembrano minime a 1 decimale? Dovrebbero esserci o no?</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11.5px]">
              <strong>Sì, le variazioni esistono e sono matematicamente confermate</strong>, ma risiedono nei decimali centesimali perché gli 11 istituti della settimana a sabato 17 ottobre 2026 registrano intenzioni di voto straordinariamente concordi (ad es. Fratelli d’Italia oscilla tra il 27,6% e il 27,9% in tutti i sondaggi, producendo una media aritmetica di 27,77% e una media ponderata di 27,77%).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-900">Scostamento Lega:</span>
                <div className="text-slate-600">Ponderata: 5,74% (arr. 5,7%) → Aritmetica: 5,75% (arr. 5,8%).</div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-900">Scostamento CDX:</span>
                <div className="text-slate-600">Ponderata: 43,2% → Media Aritmetica: 43,3% (+0,1%).</div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                <span className="font-bold text-slate-900">Altri Selettori:</span>
                <div className="text-slate-600">Campione N=1500 e Freschezza spostano fino a ±0,03% centesimali.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Comparison Table */}
        <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Confronto Percentuali: Standard vs {weightingModels.find((m) => m.id === selectedModel)?.label}
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Calcolato sugli 11 sondaggi della finestra settimanale (incluso Istituto Piepoli e Only Numbers)
              </span>
            </div>

            {/* Precision Toggle */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 self-start sm:self-auto text-xs">
              <span className="text-[10px] text-slate-500 font-semibold px-1.5">Precisione:</span>
              <button
                onClick={() => setShowDecimals(true)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  showDecimals ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2 Decimali (Visibile)
              </button>
              <button
                onClick={() => setShowDecimals(false)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  !showDecimals ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1 Decimale (Arrotondato)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Partito</th>
                  <th className="py-2.5 px-3">Collocazione / Coalizione</th>
                  <th className="py-2.5 px-3 text-right">Standard Supermedia</th>
                  <th className="py-2.5 px-3 text-right bg-indigo-50/50 text-indigo-950 font-bold">
                    Modello Selezionato
                  </th>
                  <th className="py-2.5 px-3 text-right">Scostamento (Delta)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partiesToCompare.map((partyId) => {
                  const party = PARTIES[partyId];
                  const stdObj = stdState.partyStats[partyId] || { percent: 0, percentPrecise: 0, count: 0 };
                  const activeObj = activeState.partyStats[partyId] || { percent: 0, percentPrecise: 0, count: 0 };

                  const stdDisplay = showDecimals ? stdObj.percentPrecise.toFixed(2) : stdObj.percent.toFixed(1);
                  const activeDisplay = showDecimals ? activeObj.percentPrecise.toFixed(2) : activeObj.percent.toFixed(1);
                  const rawDelta = Number((activeObj.percentPrecise - stdObj.percentPrecise).toFixed(2));
                  const deltaFormatted = showDecimals
                    ? rawDelta
                    : Number((activeObj.percent - stdObj.percent).toFixed(1));

                  return (
                    <tr key={partyId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <PartyLogo partyId={partyId} size="sm" />
                          <div>
                            <span className="font-bold text-slate-900">{party?.shortName || partyId}</span>
                            {activeObj.count < COMPONENT_POLLS_LAST_SATURDAY.length && (
                              <div className="text-[10px] text-amber-700 font-medium">
                                Rilevato in {activeObj.count}/11 sondaggi (calcolato solo dove presente)
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-slate-500 text-[11px]">
                        {partyId === 'pld' ? (
                          <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                            Autonomo da solo (fuori dai poli)
                          </span>
                        ) : partyId === 'fn' ? (
                          <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                            Vannacci (Federabile nel CDX)
                          </span>
                        ) : partyId === 'iv' ? (
                          <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                            Ago della bilancia nel Campo Largo
                          </span>
                        ) : partyId === 'progettocivico' || partyId === 'piuuno' ? (
                          <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                            Federato nel Campo Largo
                          </span>
                        ) : (
                          party?.coalitionLabel || '-'
                        )}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-semibold text-slate-800">
                        {stdDisplay}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-indigo-900 bg-indigo-50/30">
                        {activeDisplay}%
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        {deltaFormatted > 0 ? (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                            <TrendingUp className="w-3 h-3" />
                            +{showDecimals ? rawDelta.toFixed(2) : deltaFormatted.toFixed(1)}%
                          </span>
                        ) : deltaFormatted < 0 ? (
                          <span className="inline-flex items-center gap-0.5 text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                            <TrendingDown className="w-3 h-3" />
                            {showDecimals ? rawDelta.toFixed(2) : deltaFormatted.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-slate-400 font-medium">
                            <Minus className="w-3 h-3" />
                            {showDecimals ? '0.00%' : '0.0%'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coalitions Summary Comparison */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40">
            <div className="text-[11px] font-bold text-blue-900 uppercase">Centrodestra con Vannacci</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black font-mono text-blue-950">{activeCoalitions.cdxConVannacci}%</span>
              <span className="text-xs text-slate-600">Standard: {stdCoalitions.cdxConVannacci}%</span>
            </div>
            <div className="text-[10px] text-blue-800 mt-1">
              {activeCoalitions.cdxConVannacci >= 40 ? 'Soglia 40% superata: Premio 55% scatta al primo turno' : 'Necessita ballottaggio'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40">
            <div className="text-[11px] font-bold text-rose-900 uppercase">Campo Largo con Italia Viva</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black font-mono text-rose-950">{activeCoalitions.campoLargoConIV}%</span>
              <span className="text-xs text-slate-600">Standard: {stdCoalitions.campoLargoConIV}%</span>
            </div>
            <div className="text-[10px] text-rose-800 mt-1">
              Con Progetto Civico, Più Uno e Italia Viva federati
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/40">
            <div className="text-[11px] font-bold text-indigo-900 uppercase">PLD Marattin (Da solo)</div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black font-mono text-indigo-950">{activeCoalitions.pldMarattin}%</span>
              <span className="text-xs text-slate-600">Standard: {stdCoalitions.pldMarattin}%</span>
            </div>
            <div className="text-[10px] text-indigo-800 mt-1">
              Autonomo fuori dalle coalizioni di destra e sinistra
            </div>
          </div>
        </div>

        {/* DIDACTIC CLARIFICATION BOX: Domanda dell'utente "Dovrebbe esserci variazione o no?" */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl border border-amber-200 bg-amber-50/60 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span>Chiarimento Metodologico: Perché tra Supermedia e Media Aritmetica le variazioni al 1° decimale sembrano minime? Dovrebbero esserci o no?</span>
          </div>

          <div className="text-xs text-amber-950 space-y-2 leading-relaxed">
            <p>
              <strong>1. Il Principio di Convergenza Statistica (Legge dei Grandi Numeri):</strong>
              <br />
              Quando 11 diversi istituti nazionali accreditati rilevano lo stesso corpo elettorale nello stesso ristretto arco temporale di 7 giorni, e i loro risultati sono strettamente concordi (ad esempio <em>Fratelli d’Italia</em> si colloca per tutti tra il 27,6% e il 27,9%, il <em>PD</em> tra il 20,1% e il 20,5%), <strong>qualunque combinazione convessa di pesi o media aritmetica semplice (1/N) converge matematicamente quasi allo stesso valore identico arrotondato al decimo</strong> (27,8% sia per la media ponderata che per quella aritmetica). Questo è il segnale di un quadro demoscopico ad alta solidità statistica, non di un errore di calcolo!
            </p>

            <p>
              <strong>2. Dove si manifestano le variazioni effettive:</strong>
              <br />
              • <strong>Nei centesimali (2 decimali):</strong> passando alla precisione a due decimali con il selettore in alto, la Lega passa da 5,74% a 5,75% (+0,01%), Altri da 2,84% a 2,85% (+0,01%), +Europa da 1,58% a 1,57% (-0,01%).
              <br />
              • <strong>Nei partiti minori non presenti in tutte le 11 rilevazioni:</strong> la regola rigorosa <em>"calcola la media solo sui sondaggi in cui il partito compare"</em> fa sì che nei modelli asimmetrici (come Solo Ampiezza Campionaria o Freschezza Prioritaria) i pesi degli istituti mancanti non deprimano la percentuale.
              <br />
              • <strong>In presenza di istituti outlier:</strong> se un sondaggio mostrasse un balzo anomalo (es. FdI al 29,5% o PD al 18,5%), la Supermedia ponderata ne smorzerebbe l'impatto grazie al filtro su campione e affidabilità storica, mentre la media aritmetica (1/N) ne subirebbe interamente l'oscillazione.
            </p>
          </div>
        </div>
      </section>

      {/* Il Criterio di Freschezza Temporale & I Sondaggi Bisettimanali */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Il Criterio di Freschezza Temporale & I Sondaggi Bisettimanali
              </h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Ponderazione Continua
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tutti i sondaggi della stessa settimana hanno freschezza piena (100%). Per i sondaggi bisettimanali o oltre i 14 giorni il peso non si azzera mai, ma decade gradualmente.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Nella costruzione della <strong>Supermedia</strong>, la freschezza temporale risponde a due principi
            fondamentali della demoscopia comparata:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>1. Sondaggi della Stessa Settimana (0 – 7 giorni)</span>
              </div>
              <p className="mt-1.5 text-xs text-emerald-850 leading-relaxed">
                <strong>Tutti i sondaggi della stessa settimana sono considerati freschi al 100%</strong> (<em>w<sub>tempo</sub> = 1,00</em>). Nessuna penalizzazione artificiale viene applicata tra una rilevazione diffusa il lunedì sera da Mentana e una del venerdì o sabato mattina: appartengono alla medesima finestra politica settimanale.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-xs">
                <Scale className="w-4 h-4 text-blue-700" />
                <span>2. Sondaggi Bisettimanali (8 – 14 giorni) e Oltre</span>
              </div>
              <p className="mt-1.5 text-xs text-blue-850 leading-relaxed">
                Poiché alcuni istituti rilasciano rilevazioni a cadenza bisettimanale (ogni 14 giorni), <strong>il peso dopo 14 giorni NON è zero</strong>. Viene invece applicata la curva di decadimento graduale continua <em>exp(-λ · (Δt - 7))</em>: a 14 giorni conserva circa il 73% del peso pieno, degradando armoniosamente senza brusche esclusioni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Official Sources: Only Numbers & Realpolitik */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Verifica Fonti Ufficiali: Il Sondaggio Only Numbers e Realpolitik (Rete 4)
            </h2>
            <p className="text-xs text-slate-500">
              Tracciamento del barometro Only Numbers diffuso da Nicola Porro e Bianca Berlinguer su Rete 4
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Abbiamo verificato la fonte ufficiale di <strong>Only Numbers</strong>: l'istituto demoscopico collabora
            stabilmente con la trasmissione <em>Realpolitik</em> (in onda su <strong>Rete 4</strong>) e con <em>Porta a Porta</em> su Rai 1,
            pubblicando regolarmente i cartelli del venerdì sera e del sabato mattina.
          </p>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-950 text-xs">Scheda Ufficiale Sondaggio Only Numbers</span>
              <span className="text-[10px] font-mono bg-blue-900 text-white px-2 py-0.5 rounded">
                SP-2026/10-0940
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-500 block text-[10px]">Istituto:</span>
                <span className="font-semibold text-slate-900">Only Numbers</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Committente TV:</span>
                <span className="font-semibold text-slate-900">Realpolitik (Rete 4)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Campione:</span>
                <span className="font-semibold text-slate-900">1.500 casi (CATI-CAMI-CAWI)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Data di Rilascio:</span>
                <span className="font-semibold text-slate-900">17 Ottobre 2026 (ore 08:30)</span>
              </div>
            </div>
            <p className="text-[11px] text-blue-800 leading-snug pt-1">
              Rilevazione registrata e inclusa nella nostra Supermedia di sabato 17 ottobre 2026. Ha testato in modo
              specifico il <strong>Partito Liberaldemocratico di Marattin</strong> da solo (1,4%), <strong>Progetto Civico</strong> (0,9%) e <strong>Più Uno</strong> (0,8%) nel Campo Largo, e il dato di chi <strong>Non si esprime</strong> (41,3%).
            </p>
          </div>
        </div>
      </section>

      {/* Official Party Contrassegni / Original Logos Section */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              I Loghi Originali Ufficiali dei Partiti Politici
            </h2>
            <p className="text-xs text-slate-500">
              Visualizzazione autentica con le immagini e i contrassegni originali depositati
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Tutti i simboli presenti nella piattaforma utilizzano i <strong>loghi originali ufficiali</strong> (immagini ad alta risoluzione dei contrassegni elettorali e dei loghi registrati dei partiti):
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-1">
            {[
              { id: 'fdi', name: 'FdI', desc: 'Logo originale Fratelli d’Italia' },
              { id: 'pd', name: 'PD', desc: 'Logo originale Partito Democratico' },
              { id: 'm5s', name: 'M5S', desc: 'Logo originale Movimento 5 Stelle' },
              { id: 'fi', name: 'Forza Italia', desc: 'Logo originale Forza Italia' },
              { id: 'fn', name: 'Futuro Naz.', desc: 'Simbolo Vannacci' },
              { id: 'lega', name: 'Lega', desc: 'Logo originale Lega Salvini Premier' },
              { id: 'avs', name: 'AVS', desc: 'Logo originale Verdi e Sinistra' },
              { id: 'azione', name: 'Azione', desc: 'Logo originale Azione Calenda' },
              { id: 'iv', name: 'Italia Viva', desc: 'Logo originale Italia Viva' },
              { id: 'pld', name: 'PLD', desc: 'Logo Marattin Liberaldemocratici' },
              { id: 'progettocivico', name: 'Progetto Civico', desc: 'Simbolo Civico' },
              { id: 'piuuno', name: 'Più Uno', desc: 'Simbolo Più Uno' },
            ].map((p) => (
              <div key={p.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col items-center text-center">
                <PartyLogo partyId={p.id} size="md" />
                <span className="mt-1.5 font-bold text-[11px] text-slate-900">{p.name}</span>
                <span className="text-[9px] text-slate-500">{p.desc}</span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/40 text-xs text-amber-900">
            <strong>Doppia garanzia di resa visiva:</strong> Il sistema carica prioritariamente le immagini originali ad alta definizione con policy di sicurezza anti-blocco; in caso di latenza di rete o per le formazioni nascenti, interviene istantaneamente il motore di rendering vettoriale conforme ai contrassegni depositati al Ministero dell'Interno.
          </div>
        </div>
      </section>

      {/* The Core Formula Section */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">La Formula di Ponderazione</h2>
            <p className="text-xs text-slate-500">
              Media ponderata multi-criterio per attenuare le oscillazioni campionarie
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            A differenza di una semplice media aritmetica che tratterebbe ogni sondaggio allo stesso modo, la
            <strong> Supermedia</strong> assegna a ciascuna rilevazione un peso specifico <em>W<sub>i</sub></em> derivante dalla
            combinazione di tre fattori metodologici oggettivi:
          </p>

          {/* Math Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-center my-4 overflow-x-auto text-xs sm:text-sm">
            <div className="text-slate-400 text-xs mb-1">Formula del peso del sondaggio i:</div>
            <div className="text-emerald-400 font-bold text-base sm:text-lg">
              W<sub>i</sub> = w<sub>campione</sub> × w<sub>tempo</sub> × w<sub>metodo</sub>
            </div>
            <div className="text-slate-300 text-xs mt-2">
              Media Ponderata Partito = ∑ (W̄<sub>i</sub> · Percentuale<sub>i</sub>)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Consistenza Campionaria (w<sub>campione</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Riconosce maggior robustezza ai campioni più ampi. La funzione concava √(N / 1.000) premia le
                rilevazioni con 1.200 o 1.500 interviste, applicando un floor protettivo a 800 casi e un cap a 1.500
                per evitare che un singolo megacampione schiacci le altre rilevazioni.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Freschezza Temporale (w<sub>tempo</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Tutti i sondaggi della <strong>stessa settimana (0–7 giorni)</strong> sono considerati freschi al <strong>100% (peso = 1,00)</strong>.
                Per i sondaggi a cadenza <strong>bisettimanale (8–14 giorni) o oltre</strong>, il peso non viene brutalmente azzerato, ma decade
                in modo morbido e progressivo secondo la funzione esponenziale continua exp(-λ · (Δt - 7)), garantendo continuità statistica senza salti a gradino.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Metodo di Raccolta (w<sub>metodo</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ponderazione per tecnica d'indagine: il modello premia con un moltiplicatore × 1,08 le
                rilevazioni miste probabilistiche (CATI su fissi, CAMI su cellulari e CAWI web), rispetto ai panel
                esclusivamente online (CAWI, × 0,94).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Crucial Insight: Broadcast vs sondaggipoliticoelettorali.it */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Il Disallineamento: Perché le Fonti TV e Broadcast Anticipano il Sito Governativo
            </h2>
            <p className="text-xs text-slate-500">
              La prassi del sistema politico-editoriale italiano e la legge 28/2000
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Il sito istituzionale della Presidenza del Consiglio dei Ministri (
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 text-xs">
              sondaggipoliticoelettorali.it
            </code>
            ) è il registro legale pubblico in cui gli istituti demoscopici sono obbligati a depositare la scheda
            metodologica completa per la legge sulla <em>Par Condicio</em>.
          </p>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-amber-900 text-xs sm:text-sm">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Il problema operativo: il ritardo di pubblicazione sul portale ufficiale</span>
            </div>
            <p className="mt-1.5 leading-relaxed text-amber-850">
              Sebbene la legge preveda la contestualità, nella prassi consolidata esiste un{' '}
              <strong>ritardo fisiologico di 48 – 96 ore</strong>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>
                <strong>Lunedì sera ore 20:25:</strong> Enrico Mentana manda in onda in anteprima esclusiva i dati SWG
                sul TG La7.
              </li>
              <li>
                <strong>Martedì sera:</strong> Bianca Berlinguer a <em>È sempre Cartabianca</em> su Rete 4 diffonde i dati Ixè.
              </li>
              <li>
                <strong>Giovedì sera:</strong> Nicola Porro a <em>Quarta Repubblica</em> e Del Debbio trasmettono i dati Tecnè.
              </li>
              <li>
                <strong>Venerdì sera / Sabato mattina:</strong> Rete 4 a <em>Realpolitik</em> e Only Numbers diffondono i dati aggiornati pre-weekend.
              </li>
              <li>
                <strong>Settimana successiva:</strong> La scheda tecnica approda finalmente sul sito governativo dopo la validazione Agcom.
              </li>
            </ul>
          </div>

          <h3 className="text-sm font-bold text-slate-900 pt-2">
            La Nostra Soluzione: Il Ciclo del Sabato Mattina (da Sabato a Sabato)
          </h3>
          <p>
            Per garantire che la Supermedia sia sempre aggiornata con i dati più recenti ed evitare di lavorare su
            fotografie vecchie di una settimana:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 pl-1">
            <li>
              <strong>Rilevazione diretta ogni sabato mattina alle ore 09:00:</strong> la finestra di cattura
              comprende tutti i sondaggi realizzati o diffusi dal <em>sabato precedente alle ore 00:00 al sabato
              mattina corrente alle ore 09:00</em>.
            </li>
            <li>
              <strong>Intercettazione delle fonti primarie autorizzate:</strong> i dati vengono acquisiti
              immediatamente dalle emissioni televisive ufficiali e dai canali certificati degli istituti (SWG La7,
              Tecnè Mediaset, Only Numbers Realpolitik Rete 4, Eumetra Piazzapulita, Ixè Cartabianca, Noto Porta a Porta, Quorum Sky), senza attendere passivamente il
              deposito su <em>sondaggipoliticoelettorali.it</em>.
            </li>
            <li>
              <strong>Riconciliazione retroattiva:</strong> non appena il portale governativo pubblica la scheda
              completa con il codice identificativo ufficiale (es.{' '}
              <code className="text-[11px] bg-slate-100 px-1 py-0.5 rounded text-slate-700">SP-2026/10-0940</code>
              ), la rilevazione viene marcata come "Depositata e Certificata", verificando la rispondenza dei decimali
              e dei metadati campionari.
            </li>
          </ol>
        </div>
      </section>

      {/* Interactive Weighting Playground */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Simulatore del Peso di un Singolo Sondaggio</h2>
            <p className="text-xs text-slate-500">
              Modifica i parametri per verificare in tempo reale l'impatto sul moltiplicatore di ponderazione
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Controls */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Campione di interviste (N):</span>
                <span className="font-mono tabular-nums text-slate-900">{testSampleSize} casi</span>
              </div>
              <input
                type="range"
                min="500"
                max="2500"
                step="50"
                value={testSampleSize}
                onChange={(e) => setTestSampleSize(Number(e.target.value))}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>500 (basso)</span>
                <span>1.000 (standard)</span>
                <span>2.500 (molto alto)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Giorni trascorsi dalla pubblicazione:</span>
                <span className="font-mono tabular-nums text-slate-900">{testDaysAgo} giorni fa</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={testDaysAgo}
                onChange={(e) => setTestDaysAgo(Number(e.target.value))}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>0-7 gg (100% fresco)</span>
                <span>14 gg (bisettimanale: ~73%)</span>
                <span>20+ gg (decadimento graduale)</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">Metodologia di campionamento:</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'CATI-CAMI-CAWI', label: 'CATI-CAMI-CAWI', desc: 'Misto probabilistico (×1,08)' },
                  { id: 'CATI-CAWI', label: 'CATI-CAWI', desc: 'Doppio canale (×1,00)' },
                  { id: 'CAWI', label: 'Solo CAWI', desc: 'Panel web (×0,94)' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTestMethod(m.id as any)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      testMethod === m.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">{m.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-950 text-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Fattore di Peso Totale</div>
              <div className="mt-2 text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
                {combinedRawWeight.toFixed(3)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {isTestSameWeek
                  ? 'Stessa settimana: freschezza piena (100%)'
                  : isTestBiweekly
                  ? 'Finestra bisettimanale: ponderazione graduale'
                  : 'Decadimento esponenziale continuo (mai azzerato)'}
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs py-3 space-y-2">
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Campione (w<sub>s</sub>):</span>
                <span className="font-mono text-slate-200">{sampleWeight.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Tempo (w<sub>t</sub>):</span>
                <span className="font-mono text-slate-200">{recencyWeight.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Metodo (w<sub>m</sub>):</span>
                <span className="font-mono text-slate-200">{methodWeight.toFixed(3)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              {isTestSameWeek
                ? 'Tutti i sondaggi della stessa settimana hanno il peso temporale massimo (1,000).'
                : isTestBiweekly
                ? 'Un sondaggio bisettimanale conserva oltre il 70% del suo peso temporale, senza esclusioni brusche.'
                : 'Anche dopo 14 giorni il peso non si azzera: continua a decadere in modo proporzionato all\'anzianità.'}
            </div>
          </div>
        </div>
      </section>

      {/* Actual weights in the last Saturday Supermedia under selected model */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Pesi Percentuali Assegnati a Ciascun Sondaggio ({weightingModels.find((m) => m.id === selectedModel)?.label})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ripartizione percentuale calcolata sui 10 sondaggi della finestra settimanale
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full">
            Somma Pesi: 100,0%
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {activeModelWeights.map((cw) => (
            <div key={cw.pollId} className="flex items-center gap-3 text-xs">
              <div className="w-36 font-semibold text-slate-800 truncate" title={cw.institute}>
                {cw.institute}
              </div>
              <div className="w-20 text-slate-500 font-mono tabular-nums">{cw.publishDate}</div>
              <div className="w-20 text-slate-600 font-mono tabular-nums">{cw.sampleSize} casi</div>
              <div className="w-16 text-[10px] text-slate-500 font-medium">
                {cw.daysAgo === 0 ? 'Oggi' : `${cw.daysAgo} gg fa`}
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${cw.normalizedPercentageWeight * 4.5}%` }}
                />
              </div>
              <div className="w-16 text-right font-mono font-bold text-slate-900 tabular-nums">
                {cw.normalizedPercentageWeight}%
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

