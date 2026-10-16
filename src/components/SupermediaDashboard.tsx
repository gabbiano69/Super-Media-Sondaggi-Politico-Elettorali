import React, { useState } from 'react';
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
  Radio,
  Scale,
  Sparkles,
} from 'lucide-react';
import { LATEST_SUPERMEDIA, PARTIES, COMPONENT_POLLS_LAST_SATURDAY } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import { PollsTrendChart } from './PollsTrendChart';
import { PollRecord } from '../types/polls';

interface SupermediaDashboardProps {
  onNavigateToMethodology: () => void;
  onNavigateToTrends: () => void;
  onNavigateToMonitor: () => void;
  onSelectParty: (partyId: string) => void;
  customPolls?: PollRecord[];
}

export const SupermediaDashboard: React.FC<SupermediaDashboardProps> = ({
  onNavigateToMethodology,
  onNavigateToTrends,
  onNavigateToMonitor,
  onSelectParty,
  customPolls,
}) => {
  const [selectedSort, setSelectedSort] = useState<'percent' | 'variation' | 'coalition'>('percent');
  const [expandedPollId, setExpandedPollId] = useState<string | null>(null);

  const release = LATEST_SUPERMEDIA;
  const currentPolls = customPolls && customPolls.length > 0 ? customPolls : COMPONENT_POLLS_LAST_SATURDAY;

  // Sorted parties list
  const partyEntries = Object.entries(release.partyAverages).map(([id, stats]) => ({
    id,
    party: PARTIES[id],
    percent: stats.percent,
    variation: stats.variation,
  }));

  if (selectedSort === 'percent') {
    partyEntries.sort((a, b) => b.percent - a.percent);
  } else if (selectedSort === 'variation') {
    partyEntries.sort((a, b) => b.variation - a.variation);
  } else if (selectedSort === 'coalition') {
    partyEntries.sort((a, b) => {
      const order = { governo: 1, opposizione: 2, centro: 3, altri: 4 };
      const cA = order[a.party?.coalition || 'altri'] || 5;
      const cB = order[b.party?.coalition || 'altri'] || 5;
      if (cA !== cB) return cA - cB;
      return b.percent - a.percent;
    });
  }

  // Key takeaways calculations
  const firstParty = partyEntries[0];
  const secondParty = partyEntries[1];
  const gap = Number((firstParty.percent - secondParty.percent).toFixed(1));

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
          {/* Metadata line */}
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
            Costruiamo autonomamente la media ponderata aggregando tutte le rilevazioni pubblicate dalle fonti
            accreditate (SWG al TG La7, Tecnè su Mediaset, Noto su Porta a Porta, Quorum su Sky TG24, EMG su Agorà,
            Eumetra su Piazzapulita, Ixè su Cartabianca, Ipsos sul Corriere, Demopolis e Only Numbers). La rilevazione
            consolidata alle ore 09:00 registra Fratelli d’Italia al 27,2%, con il PD in crescita al 21,1%. Futuro
            Nazionale di Roberto Vannacci consolida il sorpasso su Forza Italia (7,9% vs 7,4%), mentre il M5S si
            attesta all'11,9%.
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

      {/* KPI Editorial Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">1° Partito Nazionale</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {firstParty.percent.toFixed(1)}%
            </span>
            <span className="text-xs font-semibold font-mono tabular-nums text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5 inline" /> +{firstParty.variation.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1.5 truncate">
            <PartyLogo partyId={firstParty.id} size="sm" className="w-4 h-4!" />
            <span className="font-semibold text-slate-800 truncate">{firstParty.party?.name}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Distacco Vertice (FdI - PD)</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {gap.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-400 font-mono">{gap.toFixed(1)} pt</span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            PD al {secondParty.percent.toFixed(1)}% ({secondParty.variation > 0 ? '+' : ''}{secondParty.variation.toFixed(1)}) · Rapporti stabili
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">3° Partito Nazionale</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {release.partyAverages.m5s?.percent.toFixed(1)}%
            </span>
            <span className="text-xs font-mono tabular-nums text-slate-500">
              ({release.partyAverages.m5s?.variation > 0 ? '+' : ''}{release.partyAverages.m5s?.variation.toFixed(1)})
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1.5 truncate">
            <PartyLogo partyId="m5s" size="sm" className="w-4 h-4!" />
            <span className="font-semibold text-slate-800 truncate">Movimento 5 Stelle</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Sorpasso al 4° Posto</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
              {release.partyAverages.fn?.percent.toFixed(1)}%
            </span>
            <span className="text-xs font-semibold font-mono text-emerald-600">
              +{release.partyAverages.fn?.variation.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            Futuro Naz. supera FI ({release.partyAverages.fi?.percent.toFixed(1)}%)
          </div>
        </div>
      </section>

      {/* Breaking Political & Technical Updates Banner Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: Sud Chiama Nord nella coalizione di Centrodestra */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <PartyLogo partyId="scn" size="sm" className="w-5 h-5!" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-900 uppercase tracking-wider text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded">
                Aggiornamento Coalizioni
              </span>
              <span className="text-amber-800 font-semibold">Ufficiale</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Sud Chiama Nord è ufficialmente nella coalizione di Centrodestra
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Il movimento guidato da <strong>Cateno De Luca</strong> e presieduto da Laura Castelli entra formalmente
              nell'alleanza di Centrodestra con FdI, FI, Lega e Noi Moderati. Il suo <strong>1,1%</strong> consolida la maggioranza
              di governo al <strong>42,2%</strong> (che raggiunge il <strong>50,0%</strong> con Futuro Nazionale).
            </p>
          </div>
        </div>

        {/* Banner 2: Automazione Sabato ore 09:00 da TV & Fonti Dirette */}
        <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px] bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Aggiornamento Sabato ore 09:00
              </span>
              <span className="text-slate-400">Scansione Diretta TV & Web</span>
            </div>
            <h3 className="font-bold text-white text-sm">
              Acquisizione automatica da Talk Show e Fonti Primarie
            </h3>
            <p className="text-slate-300 leading-relaxed">
              La piattaforma si aggiorna ogni <strong>sabato mattina alle 09:00</strong> prendendo le emissioni tra sabato precedente e sabato corrente direttamente da <em>TG La7 (SWG), È sempre Cartabianca (Ixè), Piazzapulita (Eumetra), Quarta Repubblica (Tecnè), Porta a Porta (Noto)</em> senza attendere il ritardo burocratico del portale Agcom.
            </p>
            <div className="pt-1">
              <button
                onClick={onNavigateToMonitor}
                className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Accedi alla dashboard monitoraggio fonti e verifica</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
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
                Nostra media ponderata calcolata dalle rilevazioni a sabato scorso ({release.date})
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

              // Proportional bar width based on 30% scale max
              const barWidthPercent = Math.min(100, (item.percent / 30) * 100);

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectParty(item.id)}
                  className="py-3 px-2 sm:px-3 rounded-lg hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Index & Party Identity */}
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
                        </div>
                        <div className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                          <span>{party?.leader}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-400">{party?.coalitionLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Numeric Value & Variation */}
                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-extrabold font-mono tabular-nums text-slate-900">
                        {item.percent.toFixed(1)}%
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
                        <span className="text-[10px] text-slate-400 font-normal">vs sabato prec.</span>
                      </div>
                    </div>
                  </div>

                  {/* Proportional visual bar */}
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

        {/* Right Column (5 cols): Coalitions & Method Context */}
        <section className="lg:col-span-5 space-y-6">
          {/* Coalitions Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-5">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Equilibrio Coalizioni & Scenari «Stabilicum»
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Confronto strutturale: Centrodestra con o senza Vannacci · Centrosinistra con o senza Italia Viva
              </p>
            </div>

            <div className="space-y-4">
              {/* AREA CENTRODESTRA */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900 flex items-center justify-between">
                  <span>Area Centrodestra (con Sud Chiama Nord)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Senza vs Con Vannacci</span>
                </div>

                {/* 1. Centrodestra senza Vannacci (con ScN) */}
                <div className="p-3.5 rounded-lg border border-blue-200/90 bg-blue-50/40">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900">
                      Centrodestra senza Vannacci (con ScN)
                    </div>
                    <div className="text-base font-mono tabular-nums font-extrabold text-blue-900">
                      42,1%
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-emerald-700 font-medium">FdI 27,2 | FI 7,4 | Lega 5,4 | ScN 1,1 | NM 1,0</span>
                    <span className="text-slate-400 font-mono">-0,1% vs sab. prec.</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-blue-700 h-full rounded-full" style={{ width: '42.1%' }} />
                  </div>
                </div>

                {/* 2. Centrodestra con Vannacci (FN + ScN) */}
                <div className="p-3.5 rounded-lg border border-slate-300 bg-slate-100/70">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Centrodestra con Vannacci (con Futuro Naz. e ScN)</span>
                      <span className="text-[10px] bg-slate-800 text-white px-1.5 py-0.2 rounded font-bold">
                        Maggioranza Assoluta
                      </span>
                    </div>
                    <div className="text-base font-mono tabular-nums font-extrabold text-slate-900">
                      50,0%
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <span>Include Futuro Nazionale (7,9%) federato con la maggioranza</span>
                    <span className="text-slate-500 font-mono">50,0% netto</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: '50.0%' }} />
                  </div>
                </div>
              </div>

              {/* AREA CENTROSINISTRA */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center justify-between">
                  <span>Area Centrosinistra & Campo Alternativo</span>
                  <span className="text-[10px] text-slate-400 font-normal">Senza vs Con Italia Viva</span>
                </div>

                {/* 3. Centrosinistra senza Italia Viva */}
                <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>Centrosinistra senza Italia Viva</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                        PD + M5S + AVS + +E
                      </span>
                    </div>
                    <div className="text-base font-mono tabular-nums font-extrabold text-slate-800">
                      40,9%
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <span>PD 21,1 | M5S 11,9 | AVS 6,5 | +E 1,4</span>
                    <span className="text-rose-600 font-semibold font-mono">
                      -1,2% vs CDX (42,1%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-slate-500 h-full rounded-full" style={{ width: '40.9%' }} />
                  </div>
                </div>

                {/* 4. Centrosinistra con Italia Viva */}
                <div className="p-3.5 rounded-lg border border-rose-300 bg-rose-50/50 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                      <span>Centrosinistra con Italia Viva</span>
                      <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold">
                        Sorpasso Politico
                      </span>
                    </div>
                    <div className="text-base font-mono tabular-nums font-extrabold text-rose-700">
                      43,3%
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                    <span>PD 21,1 | M5S 11,9 | AVS 6,5 | IV 2,4 | +E 1,4</span>
                    <span className="text-emerald-700 font-bold font-mono">
                      +1,2% vs CDX (42,1%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-rose-600 h-full rounded-full" style={{ width: '43.3%' }} />
                  </div>
                </div>
              </div>

              {/* POLO DI CENTRO */}
              <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-900">
                    Polo di Centro (Azione isolata / con IV autonoma)
                  </div>
                  <div className="text-base font-mono tabular-nums font-extrabold text-amber-700">
                    3,8% – 6,2%
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>Azione 3,8% (sopra soglia 3%) · Italia Viva 2,4%</span>
                  <span className="text-slate-400 font-mono">Stabile</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '38%' }} />
                </div>
              </div>

              {/* Stabilicum Detailed Dual-Hypothesis Matrix */}
              <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                    <Scale className="w-4 h-4" />
                    Simulazione Legge Elettorale «Stabilicum» (55% Premio)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">220 Camera / 110 Senato</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>• Ipotesi Centrosinistra SENZA Italia Viva (40,9%):</span>
                      <span className="text-blue-400 font-mono">Vince Centrodestra (42,1%)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Il Centrodestra supera il Campo Largo (+1,2%) e ottiene il <strong>premio del 55% (220 deputati alla Camera)</strong>. Il Centrosinistra si ferma a 180 seggi di opposizione. Italia Viva isolata al 2,4% non supera la soglia di sbarramento del 3% e ottiene <strong>0 seggi (azzerata)</strong>.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/80 space-y-1">
                    <div className="flex items-center justify-between font-bold text-rose-200">
                      <span>• Ipotesi Centrosinistra CON Italia Viva (43,3%):</span>
                      <span className="text-emerald-400 font-mono">Vince Centrosinistra (+1,2%)</span>
                    </div>
                    <p className="text-rose-100/90 text-[11px] leading-relaxed">
                      Con l'apporto di Matteo Renzi, il Centrosinistra sorpassa il Centrodestra di governo (43,3% vs 42,1%) e <strong>strappa il premio del 55% (220 seggi alla Camera)</strong>! Italia Viva elegge una delegazione determinante di <strong>12–14 deputati e 6–7 senatori</strong>.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800/40 text-[11px] text-slate-400">
                    <strong className="text-slate-300">• Con Vannacci nel Centrodestra (50,0%):</strong> la coalizione di destra conquista comunque la maggioranza assoluta indipendentemente dal posizionamento di Italia Viva.
                  </div>
                </div>

                <button
                  onClick={onNavigateToTrends}
                  className="mt-2 text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <span>Apri simulatore parlamentare interattivo per collegi e circoscrizioni</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                  Tecnè su Mediaset, Quorum su Sky TG24), mentre il deposito burocratico su{' '}
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

      {/* Historical Trend Chart Component */}
      <PollsTrendChart />

      {/* Component Polls Considered Section */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Sondaggi Inclusi nella Rilevazione di Sabato Scorso ({release.date})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentPolls.length} rilevazioni acquisite direttamente da tutte le fonti primarie dei broadcast
            </p>
          </div>
          <button
            onClick={onNavigateToMonitor}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 self-start sm:self-auto flex items-center gap-1 cursor-pointer"
          >
            <span>Verifica fonti dirette</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Istituto</th>
                <th className="py-2.5 px-3">Diffusione Primaria / Committente</th>
                <th className="py-2.5 px-3">Data Pubbl.</th>
                <th className="py-2.5 px-3 text-right">Campione</th>
                <th className="py-2.5 px-3">Metodologia</th>
                <th className="py-2.5 px-3 text-right">FdI</th>
                <th className="py-2.5 px-3 text-right">PD</th>
                <th className="py-2.5 px-3 text-right">M5S</th>
                <th className="py-2.5 px-3 text-right">FN</th>
                <th className="py-2.5 px-3 text-right">FI</th>
                <th className="py-2.5 px-3 text-right">Lega</th>
                <th className="py-2.5 px-3 text-center">Ritardo Deposito</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentPolls.map((poll) => {
                const isExpanded = expandedPollId === poll.id;
                return (
                  <React.Fragment key={poll.id}>
                    <tr
                      onClick={() => setExpandedPollId(isExpanded ? null : poll.id)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-3 font-bold text-slate-900">
                        {poll.institute}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 truncate max-w-[180px]">
                        {poll.broadcastChannel}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono tabular-nums whitespace-nowrap">
                        {poll.publishDate}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.sampleSize} casi
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{poll.method}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {poll.results.fdi?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                        {poll.results.pd?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.results.m5s?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.results.fn?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.results.fi?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {poll.results.lega?.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="font-mono text-[11px] text-amber-700 font-medium">
                          +{poll.officialDelayDays} giorni
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/70">
                        <td colSpan={12} className="py-3 px-4 border-b border-slate-200">
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

        <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
          <span>Tutti i dati sono calcolati dalla nostra formula di ponderazione statistica indipendente.</span>
          <span>Finestra: da sabato precedente a sabato ore 09:00</span>
        </div>
      </section>
    </div>
  );
};
