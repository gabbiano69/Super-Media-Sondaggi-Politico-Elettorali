import React, { useState, useMemo } from 'react';
import { PARTIES } from '../data/politicalData';
import { SupermediaInfographicCard, InfographicItem } from './SupermediaInfographicCard';
import { PartyLogo } from './PartyLogo';
import {
  Calendar,
  Download,
  Info,
  Scale,
  ArrowRight,
  Sparkles,
  Users,
} from 'lucide-react';
import { PollRecord } from '../types/polls';
import { getHarmonizedMonthlyReports } from '../services/dataService';

interface MonthlyDataViewProps {
  onNavigateToTrends: () => void;
  onNavigateToSupermedia: () => void;
  activePolls?: PollRecord[];
}

export const MonthlyDataView: React.FC<MonthlyDataViewProps> = ({
  onNavigateToTrends,
  onNavigateToSupermedia,
  activePolls,
}) => {
  const [selectedMonthId, setSelectedMonthId] = useState<string>('month-2026-10');
  const [viewMode, setViewMode] = useState<'infographic' | 'comparison' | 'detailed'>('infographic');

  // Derive reports dynamically to guarantee 100% harmonization with Home and the CSV source of truth
  const reports = useMemo(() => getHarmonizedMonthlyReports(activePolls), [activePolls]);
  const currentReport = reports.find((r) => r.id === selectedMonthId) || reports[0];
  const previousReport = reports.find((r) => r.id !== selectedMonthId) || reports[1];

  // Map monthly data to infographic format ordered by percentage descending
  const infographicItems: InfographicItem[] = Object.entries(currentReport.partyAverages)
    .filter(([id]) => id !== 'altri')
    .sort((a, b) => b[1].percent - a[1].percent)
    .map(([id, data]) => ({
      partyId: id,
      name: PARTIES[id]?.name || id,
      percent: data.percent,
      variation: data.variationFromPreviousMonth,
      isNa: false,
    }));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Rapporti & Trend Mensili Consolidati</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Dati Mensili dei Sondaggi Politici
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Riepilogo e confronto consolidato delle intenzioni di voto su base mensile (1-30 Settembre e 1-31 Ottobre).
            Tutti i dati sono fedelmente sincronizzati al decimo di punto con la Supermedia della Home page e il dataset CSV.
          </p>
        </div>

        {/* Month Selector Tabs */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {reports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedMonthId(rep.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedMonthId === rep.id
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {rep.monthName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mode View Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <span className="text-slate-400">Visualizzazione:</span>
          <button
            onClick={() => setViewMode('infographic')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'infographic'
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Infografica La Supermedia
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'comparison'
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Confronto Mese su Mese (Ottobre vs Settembre)
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'detailed'
                ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Coalizioni & Stabilicum
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Rilevazione: {currentReport.period} ({currentReport.totalPollsSampled} sondaggi aggregati)
        </div>
      </div>

      {/* KPI Headline Cards for Selected Month */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">1° Partito ({currentReport.monthName})</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-slate-900">
              {currentReport.partyAverages.fdi?.percent.toFixed(1)}%
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">
              +{currentReport.partyAverages.fdi?.variationFromPreviousMonth.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate flex items-center gap-1.5">
            <PartyLogo partyId="fdi" size="sm" className="w-4 h-4!" />
            <span>Fratelli d’Italia</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Partito Liberaldemocratico</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-sky-900">
              {currentReport.partyAverages.pld?.percent.toFixed(1)}%
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">
              +{currentReport.partyAverages.pld?.variationFromPreviousMonth.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 text-xs text-sky-800 font-medium truncate flex items-center gap-1.5">
            <PartyLogo partyId="pld" size="sm" className="w-4 h-4!" />
            <span>Marattin · Da solo</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Campo Largo Progressista</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-rose-700">
              {currentReport.coalitions.campoLargoConIV.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Con IV</span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            {currentReport.coalitions.campoLargoSenzaIV.toFixed(1)}% senza IV
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500">Centrodestra di Governo</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-blue-900">
              {currentReport.coalitions.governo.toFixed(1)}%
            </span>
            <span className="text-xs font-mono text-slate-400">
              ({currentReport.coalitions.governoConVannacci.toFixed(1)}% con FN)
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 truncate">
            Include Sud Chiama Nord (1,1%)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-2xs col-span-2 lg:col-span-1">
          <div className="text-[11px] font-semibold text-slate-300">Non si esprime</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold font-mono text-amber-400">
              {currentReport.nonSiEsprime.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-300 font-mono">
              {currentReport.nonSiEsprimeVariation > 0 ? `+${currentReport.nonSiEsprimeVariation}` : currentReport.nonSiEsprimeVariation}%
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-400 truncate">
            Indecisi + Astenuti totali
          </div>
        </div>
      </div>

      {/* Main View Mode Render */}
      {viewMode === 'infographic' && (
        <div className="space-y-6">
          <SupermediaInfographicCard
            title="La Supermedia"
            subtitle={`Media delle intenzioni di voto ai partiti nel mese di ${currentReport.monthName} (${currentReport.period})`}
            comparisonLabel={`Var. rispetto a ${currentReport.previousMonthName}`}
            items={infographicItems}
            nonSiEsprime={currentReport.nonSiEsprime}
            nonSiEsprimeVar={currentReport.nonSiEsprimeVariation}
          />
        </div>
      )}

      {viewMode === 'comparison' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Confronto Mese su Mese: Ottobre 2026 vs Settembre 2026
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tabella comparativa completa delle variazioni percentuali nette registrate tra i due mesi
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                  <th className="py-3 px-3">Partito / Formazione</th>
                  <th className="py-3 px-3">Collocazione</th>
                  <th className="py-3 px-3 text-right">Settembre 2026</th>
                  <th className="py-3 px-3 text-right font-bold text-slate-900">Ottobre 2026</th>
                  <th className="py-3 px-3 text-right">Variazione Netta</th>
                  <th className="py-3 px-3 text-center">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.keys(currentReport.partyAverages)
                  .filter((p) => p !== 'altri')
                  .map((pId) => {
                    const party = PARTIES[pId];
                    const octData = currentReport.partyAverages[pId];
                    const septData = previousReport.partyAverages[pId] || { percent: octData.percent };
                    const diff = Number((octData.percent - septData.percent).toFixed(1));

                    return (
                      <tr key={pId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 flex items-center gap-2.5 font-bold text-slate-900">
                          <PartyLogo partyId={pId} size="sm" className="w-6 h-6!" />
                          <span>{party?.name || pId}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">
                          {pId === 'pld' ? (
                            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-bold text-[10px]">
                              Fuori dai poli (Da solo)
                            </span>
                          ) : pId === 'progettocivico' || pId === 'piuuno' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold text-[10px]">
                              Campo Largo
                            </span>
                          ) : pId === 'scn' ? (
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold text-[10px]">
                              Centrodestra
                            </span>
                          ) : (
                            party?.coalitionLabel
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                          {septData.percent.toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-950">
                          {octData.percent.toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold">
                          {diff > 0 ? (
                            <span className="text-emerald-600">+{diff.toFixed(1)}%</span>
                          ) : diff < 0 ? (
                            <span className="text-rose-600">{diff.toFixed(1)}%</span>
                          ) : (
                            <span className="text-slate-400">0,0%</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {diff > 0 ? (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              In crescita
                            </span>
                          ) : diff < 0 ? (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px] font-bold">
                              In calo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                              Stabile
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                {/* Non si esprime row */}
                <tr className="bg-slate-50/90 font-semibold">
                  <td className="py-2.5 px-3 flex items-center gap-2.5 font-bold text-slate-800">
                    <PartyLogo partyId="nonsiesprime" size="sm" className="w-6 h-6!" />
                    <span>Non si esprime (Indecisi + Astenuti)</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">Area dell'astensione e non risposta</td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                    {previousReport.nonSiEsprime.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {currentReport.nonSiEsprime.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-600">
                    {(currentReport.nonSiEsprime - previousReport.nonSiEsprime).toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[10px]">
                    Stabile (&gt;41%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'detailed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box Coalizioni */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              Assetto Coalizioni a {currentReport.monthName}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/40">
                <div className="flex justify-between items-center font-bold">
                  <span>Centrodestra di Governo (con ScN e NM)</span>
                  <span className="text-base font-mono text-blue-900">
                    {currentReport.coalitions.governo.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1 text-slate-500">
                  Con Vannacci (Futuro Nazionale): <strong>{currentReport.coalitions.governoConVannacci.toFixed(1)}%</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/40">
                <div className="flex justify-between items-center font-bold">
                  <span>Campo Largo Progressista (con Progetto Civico e +1)</span>
                  <span className="text-base font-mono text-rose-800">
                    {currentReport.coalitions.campoLargoConIV.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1 text-slate-500">
                  Senza Italia Viva: <strong>{currentReport.coalitions.campoLargoSenzaIV.toFixed(1)}%</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-sky-200 bg-sky-50/50">
                <div className="flex justify-between items-center font-bold text-sky-950">
                  <span>Partito Liberaldemocratico (Luigi Marattin)</span>
                  <span className="text-base font-mono text-sky-900">
                    {currentReport.coalitions.pldMarattin.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1 text-slate-500">
                  Considerato fuori dalle coalizioni di destra e di sinistra, corre da solo.
                </div>
              </div>

              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/40">
                <div className="flex justify-between items-center font-bold text-amber-950">
                  <span>Polo di Centro (Azione)</span>
                  <span className="text-base font-mono text-amber-800">
                    {currentReport.coalitions.centroRiformista.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Box Effetto Stabilicum */}
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
              <Scale className="w-4 h-4" />
              <span>Legge dello Stato: «Stabilicum»</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              Effetto del Premio di Maggioranza al 55% (220 Camera / 110 Senato)
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Lo <strong>Stabilicum</strong> assegna il 55% dei seggi alla prima coalizione. I dati consolidati di {currentReport.monthName} mostrano che:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-rose-300">• Con Italia Viva nel Campo Largo ({currentReport.coalitions.campoLargoConIV.toFixed(1)}%):</strong> il Campo Largo supera il Centrodestra ({currentReport.coalitions.governo.toFixed(1)}%) e si aggiudica il <strong>premio di 220 deputati</strong>.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-blue-300">• Senza Italia Viva ({currentReport.coalitions.campoLargoSenzaIV.toFixed(1)}% vs {currentReport.coalitions.governo.toFixed(1)}%):</strong> il Centrodestra vince il premio di maggioranza dello Stabilicum.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-sky-300">• Partito Liberaldemocratico di Marattin ({currentReport.coalitions.pldMarattin.toFixed(1)}%):</strong> correndo da solo è attualmente sotto la soglia del 3% necessaria per accedere al riparto del 45% delle opposizioni.
              </div>
            </div>

            <button
              onClick={onNavigateToTrends}
              className="mt-3 text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Vai al simulatore dei seggi parlamentari dello Stabilicum</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Editorial Key Takeaways Section */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-4 h-4 text-blue-900" />
          <h3 className="font-bold text-base text-slate-900">
            Analisi & Punti Chiave del Mese di {currentReport.monthName}
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          {currentReport.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0 mt-1.5" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
