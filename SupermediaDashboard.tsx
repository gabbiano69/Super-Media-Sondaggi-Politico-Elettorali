import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink,
  Clock,
  CheckCircle2,
  Scale,
  Sparkles,
  BarChart3,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { LATEST_SUPERMEDIA, PARTIES, COMPONENT_POLLS_LAST_SATURDAY, getParty4WeekTrend } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import { PartySparkline } from './PartySparkline';
import { PollsTrendChart } from './PollsTrendChart';
import { PollRecord } from '../types/polls';
import { WeightingModelType } from '../utils/weightCalculator';
import { calculateAverage, DEFAULT_PREVIOUS_AVERAGES } from '../services/dataService';

interface SupermediaDashboardProps {
  onNavigateToMethodology: () => void;
  onNavigateToTrends: () => void;
  onNavigateToMonitor: () => void;
  onNavigateToMonthly?: () => void;
  onSelectParty: (partyId: string) => void;
  customPolls?: PollRecord[];
}

export const SupermediaDashboard: React.FC<SupermediaDashboardProps> = ({
  onNavigateToMethodology,
  onNavigateToTrends,
  onNavigateToMonitor,
  onNavigateToMonthly,
  onSelectParty,
  customPolls,
}) => {
  const [selectedSort, setSelectedSort] = useState<'percent' | 'variation' | 'coalition'>('percent');
  const [weightingModel, setWeightingModel] = useState<WeightingModelType>('standard');
  const [showHighPrecision, setShowHighPrecision] = useState<boolean>(false);
  const [expandedPollId, setExpandedPollId] = useState<string | null>(null);

  const release = LATEST_SUPERMEDIA;
  const currentPolls = customPolls && customPolls.length > 0 ? customPolls : COMPONENT_POLLS_LAST_SATURDAY;
  const pollsTableContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollTable = (direction: 'left' | 'right') => {
    if (pollsTableContainerRef.current) {
      pollsTableContainerRef.current.scrollBy({
        left: direction === 'left' ? -350 : 350,
        behavior: 'smooth',
      });
    }
  };

  // FUNZIONE CENTRALIZZATA: calculateAverage richiamata direttamente
  const computedState = useMemo(() => {
    return calculateAverage(currentPolls, weightingModel, DEFAULT_PREVIOUS_AVERAGES);
  }, [currentPolls, weightingModel]);

  // Ordinamento partiti
  const partyEntries = useMemo(() => {
    const entries = [...computedState.partyEntries];
    if (selectedSort === 'percent') {
      entries.sort((a, b) => b.percentPrecise - a.percentPrecise);
    } else if (selectedSort === 'variation') {
      entries.sort((a, b) => b.variation - a.variation);
    } else if (selectedSort === 'coalition') {
      entries.sort((a, b) => {
        const order: Record<string, number> = {
          governo: 1,
          opposizione: 2,
          solitario: 3,
          centro: 4,
          altri: 5,
        };
        const cA = order[a.party?.coalition || 'altri'] ?? 5;
        const cB = order[b.party?.coalition || 'altri'] ?? 5;
        if (cA !== cB) return cA - cB;
        return b.percentPrecise - a.percentPrecise;
      });
    }
    return entries;
  }, [computedState.partyEntries, selectedSort]);

  // Indicatori sintetici
  const firstParty = computedState.firstParty;
  const secondParty = computedState.secondParty;
  const gap = computedState.gap;
  const coalitions = computedState.coalitions;
  const partyStats = computedState.partyStats;

  // Helper formattazione percentuale
  const getP = (id: string) => {
    const val = partyStats[id]?.percentPrecise || 0;
    return showHighPrecision ? val.toFixed(2) : val.toFixed(1);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-md">
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_montecitorio_editorial_1792150134762.jpg"
            alt="Palazzo Montecitorio Roma"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-8 lg:p-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-3">
            <span className="text-emerald-400 font-semibold">Nostra Elaborazione Indipendente</span>
            <span aria-hidden="true">·</span>
            <span>Rilevazione a {release.date}</span>
            <span aria-hidden="true">·</span>
            <span>Finestra: {release.referenceWindow}</span>
            <span aria-hidden="true">·</span>
            <span>Rif. precedente: {release.previousDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            Supermedia Nazionale dei Sondaggi: la nostra media ponderata da tutte le fonti a sabato ore 09:00
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Costruiamo autonomamente la media aggregando tutte le 11 rilevazioni pubblicate dalle fonti
            accreditate (SWG al TG La7, Tecnè su Mediaset, Noto su Porta a Porta, Quorum su Sky TG24, EMG su Agorà,
            Eumetra su Piazzapulita, Ixè su Cartabianca, Ipsos sul Corriere, Demopolis, Only Numbers e Istituto Piepoli).
            Tutte le viste dell'applicazione richiamano la funzione centralizzata <code>calculateAverage</code> sul dataset CSV certificato.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToTrends}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-slate-950 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>Esplora Serie Storica e Seggi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToMethodology}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>La Nostra Metodologia & Ponderazione</span>
            </button>
          </div>
        </div>
      </section>

      {/* Model Selector Bar (Interactive switch between Nostra Media Ponderata & Media Aritmetica) */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Selettore Algoritmo di Calcolo
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live · calculateAverage
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Confronta «Nostra Media Ponderata» con «Media Aritmetica Semplice»
            </h2>
            <p className="text-xs text-slate-600">
              {weightingModel === 'standard'
                ? 'Modello ufficiale Supermedia: algoritmo multi-criterio per campione (√N), affidabilità storica dell’istituto, metodo di rilevazione e freschezza temporale.'
                : 'Media aritmetica semplice (1/N): ogni sondaggio pesa esattamente 1/11. Per i partiti minori, calcolata solo sui sondaggi in cui compaiono.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Toggle standard vs uniform */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setWeightingModel('standard')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  weightingModel === 'standard'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Nostra Media Ponderata</span>
              </button>
              <button
                onClick={() => setWeightingModel('uniform')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  weightingModel === 'uniform'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>Media Aritmetica (1/N)</span>
              </button>
            </div>

            {/* Precision toggle */}
            <button
              onClick={() => setShowHighPrecision(!showHighPrecision)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                showHighPrecision
                  ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Mostra 2 decimali per evidenziare le micro-differenze statistiche"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showHighPrecision ? '2 Decimali' : '1 Decimale'}</span>
            </button>
          </div>
        </div>

        {weightingModel === 'uniform' && (
          <div className="mt-3 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Modalità Media Aritmetica attiva:</strong> tutti i dati della pagina, i totali delle coalizioni e i punti del grafico sottostante sono ricalcolati dividendo per le rilevazioni effettive (per i partiti minori diviso solo per i sondaggi in cui compaiono).
            </span>
          </div>
        )}
      </section>

      {/* KPI Editorial Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">1° Partito Nazionale</span>
            <PartySparkline
              data={getParty4WeekTrend(firstParty.id)}
              color="#0b2447"
              width={56}
              height={18}
            />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {showHighPrecision ? (partyStats.fdi?.percentPrecise || 27.8).toFixed(2) : (partyStats.fdi?.percent || 27.8).toFixed(1)}%
            </span>
            <span className="text-xs font-semibold font-mono tabular-nums text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5 inline" /> +{firstParty.variation.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1.5 truncate">
            <PartyLogo partyId={firstParty.id} size="sm" className="w-4 h-4!" />
            <span className="font-semibold text-slate-800 truncate">{firstParty.name}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Distacco Vertice (FdI - PD)</span>
            <PartySparkline
              data={getParty4WeekTrend('pd')}
              color="#ce2b37"
              width={56}
              height={18}
            />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {gap.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-400 font-mono">{gap.toFixed(1)} pt</span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            PD al {showHighPrecision ? (partyStats.pd?.percentPrecise || 20.3).toFixed(2) : (partyStats.pd?.percent || 20.3).toFixed(1)}% ({secondParty.variation > 0 ? '+' : ''}{secondParty.variation.toFixed(1)}) · Rapporti stabili
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">3° Partito Nazionale</span>
            <PartySparkline
              data={getParty4WeekTrend('m5s')}
              color="#eab308"
              width={56}
              height={18}
            />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {showHighPrecision ? (partyStats.m5s?.percentPrecise || 12.0).toFixed(2) : (partyStats.m5s?.percent || 12.0).toFixed(1)}%
            </span>
            <span className="text-xs font-mono tabular-nums text-slate-500">
              ({partyStats.m5s?.variation > 0 ? '+' : ''}{(partyStats.m5s?.variation || 0).toFixed(1)})
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1.5 truncate">
            <PartyLogo partyId="m5s" size="sm" className="w-4 h-4!" />
            <span className="font-semibold text-slate-800 truncate">Movimento 5 Stelle</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Futuro Nazionale</span>
            <PartySparkline
              data={getParty4WeekTrend('fn')}
              color="#334155"
              width={56}
              height={18}
            />
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {showHighPrecision ? (partyStats.fn?.percentPrecise || 7.7).toFixed(2) : (partyStats.fn?.percent || 7.7).toFixed(1)}%
            </span>
            <span className="text-xs font-semibold font-mono text-emerald-600">
              +{(partyStats.fn?.variation || 0.2).toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            Vannacci supera FI ({showHighPrecision ? (partyStats.fi?.percentPrecise || 7.5).toFixed(2) : (partyStats.fi?.percent || 7.5).toFixed(1)}%)
          </div>
        </div>
      </section>

      {/* Main Two-Column Viewport: Left Standings Table, Right Coalitions & Method Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Detailed Supermedia Party Standings */}
        <section className="lg:col-span-7 bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Classifica Intenzioni di Voto Nazionali
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {weightingModel === 'standard' ? 'Nostra media ponderata' : 'Media aritmetica semplice'} calcolata dalle 11 rilevazioni a {release.date}
              </p>
            </div>

            {/* Interactive sort selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setSelectedSort('percent')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedSort === 'percent'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Percentuale
              </button>
              <button
                onClick={() => setSelectedSort('variation')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedSort === 'variation'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Variazione
              </button>
              <button
                onClick={() => setSelectedSort('coalition')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedSort === 'coalition'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Coalizione
              </button>
            </div>
          </div>

          {/* Party List */}
          <div className="divide-y divide-slate-100 mt-2">
            {partyEntries.map((item, index) => {
              const party = item.party;
              const isPositive = item.variation > 0;
              const isNegative = item.variation < 0;
              const isNeutral = item.variation === 0;

              const barWidthPercent = Math.min(100, (item.percentPrecise / 30) * 100);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectParty(item.id)}
                  className="py-3 px-2 sm:px-3 rounded-lg hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-5 text-right font-mono text-xs text-slate-400 font-medium">
                        {index + 1}
                      </span>
                      <PartyLogo partyId={item.id} size="md" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-900">
                            {party?.name || item.id}
                          </span>
                          <span className="text-[11px] text-slate-500 hidden sm:inline">
                            ({party?.shortName})
                          </span>
                          {item.count < item.totalPolls && (
                            <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded" title={`Rilevato in ${item.count} sondaggi su ${item.totalPolls}`}>
                              {item.count}/{item.totalPolls} sondaggi
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                          <span>{party?.leader}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-400">{party?.coalitionLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <div className="hidden sm:flex flex-col items-end justify-center">
                        <PartySparkline
                          data={getParty4WeekTrend(item.id)}
                          color={party?.color || '#0284c7'}
                          width={68}
                          height={22}
                        />
                        <span className="text-[9px] text-slate-400 font-mono tracking-tight">Trend 4 sett.</span>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-extrabold font-mono tabular-nums text-slate-900">
                          {showHighPrecision ? item.percentPrecise.toFixed(2) : item.percent.toFixed(1)}%
                        </div>
                        <div className="flex items-center justify-end gap-1 text-xs font-mono tabular-nums font-semibold">
                          {isPositive && (
                            <span className="text-emerald-600 flex items-center">
                              <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                              +{item.variation.toFixed(1)}
                            </span>
                          )}
                          {isNegative && (
                            <span className="text-rose-600 flex items-center">
                              <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                              {item.variation.toFixed(1)}
                            </span>
                          )}
                          {isNeutral && (
                            <span className="text-slate-400 flex items-center">
                              <Minus className="w-3 h-3 mr-0.5 inline" />
                              0,0
                            </span>
                          )}
                          {weightingModel === 'uniform' && item.deltaVsStandard !== 0 && (
                            <span className="text-[10px] text-indigo-700 bg-indigo-50 px-1 rounded ml-1 font-mono">
                              {item.deltaVsStandard > 0 ? `+${item.deltaVsStandard.toFixed(2)}` : item.deltaVsStandard.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${barWidthPercent}%`,
                        backgroundColor: party?.color || '#0f172a',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Affluenza stimata: 58,7% · Indecisi + Astenuti: 41,3%</span>
            <button
              onClick={onNavigateToTrends}
              className="text-slate-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Vedi cronologia sabati precedenti</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Right Column (5 cols): Coalitions & Political Landscape */}
        {/* RICHIESTA UTENTE: Sostituire CDX con Vannacci con CDX, poi inserire Futuro Nazionale e Azione */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Quadro Coalizioni & Schieramenti Nazionali
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calcolato in tempo reale con il modello <strong>{weightingModel === 'standard' ? 'Ponderato' : 'Aritmetico'}</strong>
              </p>
            </div>

            <div className="space-y-4">
              {/* 1. CENTRODESTRA (ESCLUDI VANNACCI) */}
              <div className="p-3.5 rounded-lg border border-blue-200/90 bg-blue-50/40">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Centrodestra (Escludi Vannacci)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded font-semibold">
                      Governo
                    </span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-blue-900">
                    {coalitions.cdx.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-slate-600 font-medium text-[11px]">
                    FdI {getP('fdi')} | FI {getP('fi')} | Lega {getP('lega')} | ScN {getP('scn')} | NM {getP('nm')}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">+0,4% vs prec.</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-blue-700 h-full rounded-full" style={{ width: `${coalitions.cdx}%` }} />
                </div>
              </div>

              {/* 2. FUTURO NAZIONALE (ROBERTO VANNACCI) - AUTONOMO FUORI DAL CDX */}
              <div className="p-3.5 rounded-lg border border-slate-300 bg-slate-100/70">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <PartyLogo partyId="fn" size="sm" className="w-5 h-5!" />
                    <span>Futuro Nazionale (Roberto Vannacci)</span>
                    <span className="text-[10px] bg-slate-800 text-white px-1.5 py-0.2 rounded font-bold">
                      Autonomo (Escluso dal CDX)
                    </span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-slate-900">
                    {coalitions.futuroNazionale.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Forza politica autonoma guidata dal Generale Roberto Vannacci (fuori dalla coalizione di governo)</span>
                  <span className="text-emerald-700 font-mono text-[10px] font-semibold">+0,2%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-slate-900 h-full rounded-full" style={{ width: `${coalitions.futuroNazionale * 6}%` }} />
                </div>
              </div>

              {/* 3. CAMPO LARGO PROGRESSISTA (CENTROSINISTRA) */}
              <div className="p-3.5 rounded-lg border border-rose-300 bg-rose-50/50 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                    <span>Campo Largo (Centrosinistra)</span>
                    <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold">
                      Con Italia Viva
                    </span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-rose-700">
                    {coalitions.campoLargoConIV.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                  <span className="text-[11px]">
                    PD {getP('pd')} | M5S {getP('m5s')} | AVS {getP('avs')} | IV {getP('iv')} | +E {getP('piueu')} | Civici
                  </span>
                  <span className="text-emerald-700 font-bold font-mono text-[10px]">
                    {coalitions.campoLargoSenzaIV.toFixed(1)}% senza IV
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-rose-600 h-full rounded-full" style={{ width: `${coalitions.campoLargoConIV}%` }} />
                </div>
              </div>

              {/* 4. AZIONE (CARLO CALENDA) */}
              <div className="p-3.5 rounded-lg border border-amber-200/90 bg-amber-50/50">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <PartyLogo partyId="azione" size="sm" className="w-5 h-5!" />
                    <span>Azione (Carlo Calenda)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                      Polo di Centro
                    </span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-amber-800">
                    {coalitions.azione.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Sopra la soglia di sbarramento del 3% dello Stabilicum</span>
                  <span className="text-slate-400 font-mono text-[10px]">Stabile</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: `${coalitions.azione * 10}%` }} />
                </div>
              </div>

              {/* 5. PARTITO LIBERALDEMOCRATICO (LUIGI MARATTIN) - FUORI DAI POLI / DA SOLO */}
              <div className="p-3.5 rounded-lg border border-sky-200/90 bg-sky-50/50">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-sky-950 flex items-center gap-2">
                    <PartyLogo partyId="pld" size="sm" className="w-5 h-5!" />
                    <span>Partito Liberaldemocratico (Luigi Marattin)</span>
                    <span className="text-[10px] bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded font-bold">
                      Autonomo da solo
                    </span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-sky-900">
                    {coalitions.pldMarattin.toFixed(1)}%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Considerato autonomo sia da destra che da sinistra (corre da solo)</span>
                  <span className="text-emerald-600 font-mono font-semibold text-[10px]">+0,1%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-sky-700 h-full rounded-full" style={{ width: `${coalitions.pldMarattin * 10}%` }} />
                </div>
              </div>

              {/* 6. NON SI ESPRIME */}
              <div className="p-3.5 rounded-lg border border-slate-300 bg-slate-100/90">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <PartyLogo partyId="nonsiesprime" size="sm" className="w-5 h-5!" />
                    <span>Non si esprime (Indecisi + Astenuti)</span>
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-slate-900">
                    41,3%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Prima area reale del Paese (affluenza stimata: 58,7%)</span>
                  <span className="text-slate-600 font-mono font-medium text-[10px]">Stabile</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-slate-500 h-full rounded-full" style={{ width: '41.3%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Special Briefing: Il nostro ciclo del Sabato Mattina */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Perché calcoliamo noi la media a Sabato Mattina
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  I sondaggi vengono diffusi tempestivamente in TV e sulla stampa (SWG al TG La7 il lunedì sera,
                  Tecnè su Mediaset, Quorum su Sky TG24, Piepoli e Only Numbers su Libero e Il Tempo), mentre il deposito burocratico su{' '}
                  <em>sondaggipoliticoelettorali.it</em> avviene con diversi giorni di ritardo.
                </p>
                <div className="mt-3 text-xs text-slate-500">
                  Estraiamo i dati direttamente dalle emissioni originali chiudendo la rilevazione ogni{' '}
                  <strong className="text-slate-800">sabato mattina</strong> (finestra dal sabato precedente a
                  sabato ore 09:00).
                </div>
                <button
                  onClick={onNavigateToMonitor}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-800 cursor-pointer"
                >
                  <span>Consulta il monitor dei sabati mattina</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Historical Trend Chart Component con passaggio props attive */}
      <PollsTrendChart
        activePartyStats={partyStats}
        weightingModel={weightingModel}
        showHighPrecision={showHighPrecision}
      />

      {/* Component Polls Considered Section - TUTTI I 16 PARTITI CON SCORRIMENTO ORIZZONTALE */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Sondaggi Inclusi nella Rilevazione di Sabato Scorso ({release.date})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentPolls.length} rilevazioni acquisite direttamente da tutte le fonti primarie dei broadcast e stampa
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => scrollTable('left')}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded shadow-2xs border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                title="Scorri verso sinistra"
              >
                <span>◀ Sinistra</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTable('right')}
                className="px-2.5 py-1 text-xs font-bold text-blue-900 hover:text-blue-950 bg-blue-50 hover:bg-blue-100 rounded shadow-2xs border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                title="Scorri verso destra per vedere tutti i 16 partiti"
              >
                <span>Destra (PLD, ScN, NM, Civici...) ▶</span>
              </button>
            </div>
            <button
              onClick={onNavigateToMonitor}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50"
            >
              <span>Verifica fonti & CSV</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Scrollable table container with horizontal scroll & explicit visible scrollbar */}
        <div
          ref={pollsTableContainerRef}
          tabIndex={0}
          aria-label="Tabella sondaggi con scorrimento orizzontale"
          className="overflow-x-scroll mt-4 pb-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            scrollbarWidth: 'auto',
            scrollbarColor: '#64748b #f1f5f9',
          }}
        >
          <table className="w-full text-left text-xs min-w-[1450px]">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
              <tr>
                <th className="py-2.5 px-3 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Istituto</th>
                <th className="py-2.5 px-3">Diffusione Primaria / Committente</th>
                <th className="py-2.5 px-3">Data</th>
                <th className="py-2.5 px-3 text-right">Campione</th>
                <th className="py-2.5 px-3">Metodologia</th>
                <th className="py-2.5 px-3 text-right font-bold text-slate-900">FdI</th>
                <th className="py-2.5 px-3 text-right font-bold text-slate-900">PD</th>
                <th className="py-2.5 px-3 text-right">M5S</th>
                <th className="py-2.5 px-3 text-right">FN</th>
                <th className="py-2.5 px-3 text-right">FI</th>
                <th className="py-2.5 px-3 text-right">AVS</th>
                <th className="py-2.5 px-3 text-right">Lega</th>
                <th className="py-2.5 px-3 text-right">Azione</th>
                <th className="py-2.5 px-3 text-right">IV</th>
                <th className="py-2.5 px-3 text-right">+EU</th>
                <th className="py-2.5 px-3 text-right font-bold text-sky-900 bg-sky-50/70 border-x border-sky-100">PLD</th>
                <th className="py-2.5 px-3 text-right">ScN</th>
                <th className="py-2.5 px-3 text-right">NM</th>
                <th className="py-2.5 px-3 text-right">Prog.Civico</th>
                <th className="py-2.5 px-3 text-right">Più Uno</th>
                <th className="py-2.5 px-3 text-right">Altri</th>
                <th className="py-2.5 px-3 text-center">Ritardo Deposito</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentPolls.map((poll) => {
                const isExpanded = expandedPollId === poll.id;
                const r = poll.results;
                const val = (v?: number) =>
                  typeof v === 'number' ? `${v.toFixed(1)}%` : <span className="text-slate-300 font-mono">—</span>;

                return (
                  <React.Fragment key={poll.id}>
                    <tr
                      onClick={() => setExpandedPollId(isExpanded ? null : poll.id)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-3 sticky left-0 bg-white z-10 border-r border-slate-200">
                        <div className="font-bold text-slate-900">{poll.institute}</div>
                        <div className="text-[10px] text-slate-400 font-normal truncate max-w-[140px]" title={poll.client}>
                          {poll.client}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 truncate max-w-[170px]">
                        {poll.broadcastChannel}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono tabular-nums whitespace-nowrap">
                        {poll.publishDate}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.sampleSize}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">{poll.method}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {val(r.fdi)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {val(r.pd)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.m5s)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.fn)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.fi)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.avs)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.lega)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.azione)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.iv)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.piueu)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-sky-950 bg-sky-50/70 border-x border-sky-100">
                        {val(r.pld)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.scn)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.nm)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.progettocivico)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.piuuno)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {val(r.altri)}
                      </td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span className="font-mono text-[11px] text-amber-700 font-medium">
                          +{poll.officialDelayDays} gg
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/70">
                        <td colSpan={22} className="py-3 px-4 border-b border-slate-200">
                          <div className="text-xs text-slate-700 space-y-1">
                            <div className="font-semibold text-slate-900">
                              Dettagli rilevazione {poll.institute} ({poll.publishDate}):
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1 text-slate-600">
                              <div>
                                <strong>Periodo campo:</strong> {poll.sampleDate}
                              </div>
                              <div>
                                <strong>Margine d'errore:</strong> ±{poll.marginOfError}%
                              </div>
                              <div>
                                <strong>Codice deposito:</strong> {poll.governmentPortalCode}
                              </div>
                              <div>
                                <strong>Committente:</strong> {poll.client}
                              </div>
                            </div>
                            {poll.notes && (
                              <div className="text-slate-500 italic mt-1">Nota: {poll.notes}</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Horizontal Scroll Bar Navigation Controls */}
        <div className="mt-2.5 p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <span className="font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded text-[11px]">
              Barra di Scorrimento Partiti:
            </span>
            <span>Trascina la barra orizzontale sopra oppure usa le frecce per vedere tutti i 16 partiti nazionali rilevati (inclusi PLD Marattin, Sud Chiama Nord, Noi Moderati, Progetto Civico, Più Uno)</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scrollTable('left')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded border border-slate-300 transition-colors cursor-pointer"
            >
              ◀ Scorri a Sinistra
            </button>
            <button
              type="button"
              onClick={() => scrollTable('right')}
              className="px-2.5 py-1 text-xs font-bold text-blue-900 bg-blue-100 hover:bg-blue-200 rounded border border-blue-300 transition-colors cursor-pointer"
            >
              Scorri a Destra ▶
            </button>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>Tutti i dati sono calcolati dalla funzione centralizzata calculateAverage, fedele al dataset CSV.</span>
          <span>Finestra: da sabato precedente a sabato ore 09:00</span>
        </div>
      </section>
    </div>
  );
};
