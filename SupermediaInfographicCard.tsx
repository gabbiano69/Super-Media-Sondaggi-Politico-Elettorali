import React from 'react';
import { PARTIES } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import { ArrowUpRight, ArrowDownRight, Equal, HelpCircle, Download } from 'lucide-react';

export interface InfographicItem {
  partyId: string;
  name: string;
  percent: number;
  variation: number;
  isNa?: boolean;
}

interface SupermediaInfographicCardProps {
  title?: string;
  subtitle?: string;
  comparisonLabel?: string;
  items: InfographicItem[];
  nonSiEsprime?: number;
  nonSiEsprimeVar?: number;
  maxPercent?: number;
}

export const SupermediaInfographicCard: React.FC<SupermediaInfographicCardProps> = ({
  title = 'La Supermedia',
  subtitle = 'Media ponderata dei sondaggi nazionali sulle intenzioni di voto ai partiti al 15 ottobre 2026',
  comparisonLabel = 'Var. rispetto al 1° ottobre 2026',
  items,
  nonSiEsprime = 41.3,
  nonSiEsprimeVar = -0.2,
  maxPercent = 30,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden text-slate-900">
      {/* Editorial Header mimicking the broadcast visual format */}
      <div className="p-5 sm:p-7 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Osservatorio Elettorale Nazionale
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
              {subtitle}
            </p>
          </div>

          <div className="self-start sm:self-center">
            <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
              <span>{comparisonLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Graphic Rows Table */}
      <div className="p-4 sm:p-6 space-y-2.5">
        {items.map((item) => {
          const party = PARTIES[item.partyId];
          const isUp = item.variation > 0.15;
          const isDown = item.variation < -0.15;
          const isZero = !isUp && !isDown;

          // Bar width percentage relative to max scale (default 30% for visual balance)
          const barWidth = Math.min(100, Math.max(3, (item.percent / maxPercent) * 100));

          return (
            <div
              key={item.partyId}
              className="flex items-center gap-2 sm:gap-3 py-1.5 px-2 rounded-lg hover:bg-slate-50/80 transition-colors"
            >
              {/* Party Round Emblem */}
              <div className="shrink-0">
                <PartyLogo partyId={item.partyId} size="md" className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              {/* Party Name Label (flexible width) */}
              <div className="w-36 sm:w-48 shrink-0 truncate">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {party?.name || item.name}
                </div>
                {item.partyId === 'pld' && (
                  <span className="text-[10px] text-sky-700 font-semibold block leading-none">
                    Marattin · Fuori dai poli
                  </span>
                )}
                {item.partyId === 'scn' && (
                  <span className="text-[10px] text-amber-700 font-semibold block leading-none">
                    Centrodestra
                  </span>
                )}
                {(item.partyId === 'progettocivico' || item.partyId === 'piuuno') && (
                  <span className="text-[10px] text-emerald-700 font-semibold block leading-none">
                    Campo Largo
                  </span>
                )}
              </div>

              {/* Horizontal Bar Graphic */}
              <div className="flex-1 h-6 sm:h-7 bg-slate-100/70 rounded-sm relative overflow-hidden flex items-center">
                <div
                  className="h-full rounded-sm transition-all duration-700"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: party?.color || '#334155',
                  }}
                />
              </div>

              {/* Numeric Percentage Value */}
              <div className="w-14 sm:w-16 text-right font-mono font-extrabold text-sm sm:text-base tabular-nums text-slate-950 shrink-0">
                {item.percent.toFixed(1)}%
              </div>

              {/* Variation Pill */}
              <div className="w-16 sm:w-20 shrink-0 flex justify-end">
                {item.isNa ? (
                  <div className="flex items-center justify-center px-2 py-1 rounded bg-slate-100 text-slate-500 font-mono text-[11px] font-bold">
                    N.A.
                  </div>
                ) : isUp ? (
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-emerald-500 text-white font-mono text-xs font-bold shadow-2xs">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+{Math.abs(item.variation).toFixed(1)}</span>
                  </div>
                ) : isDown ? (
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-slate-950 text-white font-mono text-xs font-bold shadow-2xs">
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                    <span>-{Math.abs(item.variation).toFixed(1)}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-slate-200 text-slate-700 font-mono text-xs font-semibold">
                    <Equal className="w-3 h-3" />
                    <span>{item.variation !== 0 ? `${item.variation > 0 ? '+' : ''}${item.variation.toFixed(1)}` : '='}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Separator for Non si esprime */}
        <div className="pt-3 mt-2 border-t border-slate-200">
          <div className="flex items-center gap-2 sm:gap-3 py-2 px-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="shrink-0">
              <PartyLogo partyId="nonsiesprime" size="md" className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <div className="w-36 sm:w-48 shrink-0 truncate">
              <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                Non si esprime
              </div>
              <span className="text-[10px] text-slate-500 block leading-none">
                Indecisi, non rispondenti e astenuti
              </span>
            </div>

            <div className="flex-1 h-6 sm:h-7 bg-slate-200/60 rounded-sm relative overflow-hidden flex items-center">
              <div
                className="h-full rounded-sm bg-slate-500 transition-all duration-700"
                style={{ width: `${Math.min(100, (nonSiEsprime / 50) * 100)}%` }}
              />
            </div>

            <div className="w-14 sm:w-16 text-right font-mono font-extrabold text-sm sm:text-base tabular-nums text-slate-900 shrink-0">
              {nonSiEsprime.toFixed(1)}%
            </div>

            <div className="w-16 sm:w-20 shrink-0 flex justify-end">
              <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-slate-200 text-slate-700 font-mono text-xs font-semibold">
                <Equal className="w-3 h-3" />
                <span>{nonSiEsprimeVar > 0 ? `+${nonSiEsprimeVar.toFixed(1)}` : `${nonSiEsprimeVar.toFixed(1)}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Fonte: Elaborazione Supermedia Sondaggi Politico Elettorali · Modello Stabilicum 55%</span>
        <span className="text-[11px] font-semibold text-slate-700">Partito Liberaldemocratico (Marattin) rilevato da solo</span>
      </div>
    </div>
  );
};
