import React, { useState, useMemo } from 'react';
import { HISTORICAL_SUPERMEDIAS, PARTIES } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import { Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

interface PollsTrendChartProps {
  activeParties?: string[];
  activePartyStats?: Record<string, { percent: number; percentPrecise: number }>;
  weightingModel?: 'standard' | 'uniform' | string;
  showHighPrecision?: boolean;
}

export const PollsTrendChart: React.FC<PollsTrendChartProps> = ({
  activePartyStats,
  weightingModel = 'standard',
  showHighPrecision = false,
}) => {
  // Parties enabled by default (top 7)
  const [selectedParties, setSelectedParties] = useState<string[]>([
    'fdi',
    'pd',
    'm5s',
    'fn',
    'fi',
    'avs',
    'lega',
  ]);
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    partyId: string;
    percent: number;
    percentPrecise: number;
    x: number;
    y: number;
  } | null>(null);

  // Chronological order (oldest to newest) with dynamic injection of active model for the latest release
  const series = useMemo(() => {
    const raw = [...HISTORICAL_SUPERMEDIAS].reverse();
    if (activePartyStats && raw.length > 0) {
      const lastIdx = raw.length - 1;
      const latest = { ...raw[lastIdx] };
      const updatedPartyAverages: Record<string, { percent: number; variation: number; percentPrecise: number }> = {};

      Object.entries(activePartyStats).forEach(([id, stats]) => {
        // When uniform is selected or high precision is enabled, use precise value to guarantee visible numbers change
        const val = weightingModel === 'uniform' || showHighPrecision ? stats.percentPrecise : stats.percent;
        updatedPartyAverages[id] = {
          percent: val,
          percentPrecise: stats.percentPrecise,
          variation: updatedPartyAverages[id]?.variation ?? 0,
        };
      });

      latest.partyAverages = updatedPartyAverages as any;
      raw[lastIdx] = latest;
    }
    return raw;
  }, [activePartyStats, weightingModel, showHighPrecision]);

  const toggleParty = (partyId: string) => {
    setSelectedParties((prev) =>
      prev.includes(partyId) ? prev.filter((id) => id !== partyId) : [...prev, partyId]
    );
  };

  // Dimensions
  const width = 860;
  const height = 340;
  const padding = { top: 32, right: 45, bottom: 44, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Y-axis bounds (min 0%, max 32%)
  const minY = 0;
  const maxY = 32;

  const getX = (index: number) => padding.left + (index / (series.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;

  const yTicks = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Evoluzione Storica delle Intenzioni di Voto (2026)
            </h3>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors ${
                weightingModel === 'uniform'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
              }`}
            >
              {weightingModel === 'uniform' ? (
                <>
                  <Scale className="w-3 h-3 text-emerald-600" />
                  <span>Media Aritmetica (1/N) Attiva</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>Nostra Media Ponderata Attiva</span>
                </>
              )}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {weightingModel === 'uniform'
              ? 'I valori del punto finale (Sabato 17 Ottobre) visualizzano la media aritmetica semplice (1/N) calcolata a 2 decimali.'
              : 'Dati ufficiali della Supermedia multi-criterio per campione, affidabilità storica e freschezza.'}
          </p>
        </div>

        {/* Party filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.keys(PARTIES)
            .filter((p) => p !== 'altri')
            .map((partyId) => {
              const party = PARTIES[partyId];
              const isSelected = selectedParties.includes(partyId);
              return (
                <button
                  key={partyId}
                  onClick={() => toggleParty(partyId)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  style={{
                    borderLeftColor: isSelected ? party.color : undefined,
                    borderLeftWidth: isSelected ? '4px' : undefined,
                  }}
                >
                  <PartyLogo partyId={partyId} size="sm" className="w-3.5 h-3.5!" />
                  <span>{party.shortName}</span>
                </button>
              );
            })}
        </div>
      </div>

      {/* Model-specific alert banner in chart */}
      {weightingModel === 'uniform' && (
        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Numeri ricalcolati in Media Aritmetica:</strong> i valori visualizzati sui punti finali riflettono la media aritmetica semplice (1/11 per istituto). Nei decimali: Lega 5,75% (+0,01%), Altri 2,85% (+0,01%), +Europa 1,57% (-0,01%).
          </span>
        </div>
      )}

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[620px] select-none"
        >
          {/* Background grid lines */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="end"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* X-axis tick labels (dates) */}
          {series.map((rel, index) => {
            const x = getX(index);
            const isLatest = index === series.length - 1;
            return (
              <g key={rel.id}>
                <line
                  x1={x}
                  y1={height - padding.bottom}
                  x2={x}
                  y2={height - padding.bottom + 5}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 18}
                  fill={isLatest ? '#0f172a' : '#64748b'}
                  fontSize={isLatest ? '11' : '10'}
                  fontWeight={isLatest ? 'bold' : 'normal'}
                  fontFamily="sans-serif"
                  textAnchor="middle"
                >
                  {rel.date.replace('Sabato ', '')}
                </text>
              </g>
            );
          })}

          {/* Render Trend Lines for Selected Parties */}
          {selectedParties.map((partyId) => {
            const party = PARTIES[partyId];
            if (!party) return null;

            const points = series.map((rel, index) => {
              const item = rel.partyAverages[partyId];
              const isLatest = index === series.length - 1;
              const val = typeof item === 'object' && item !== null ? item.percent : 0;
              const valPrecise = (item as any)?.percentPrecise ?? val;
              return {
                x: getX(index),
                y: getY(val),
                val,
                valPrecise,
                date: rel.date,
                isLatest,
              };
            });

            const pathD = points.reduce((acc, curr, idx) => {
              return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
            }, '');

            const latestPoint = points[points.length - 1];

            return (
              <g key={partyId}>
                {/* Main line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={party.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((pt, idx) => {
                  const isLatest = idx === points.length - 1;
                  return (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r={isLatest ? 5 : 3}
                      fill={isLatest ? party.color : '#ffffff'}
                      stroke={party.color}
                      strokeWidth={isLatest ? '2.5' : '2'}
                      className="cursor-pointer transition-transform hover:scale-150"
                      onMouseEnter={() =>
                        setHoveredPoint({
                          date: pt.date,
                          partyId,
                          percent: pt.val,
                          percentPrecise: pt.valPrecise,
                          x: pt.x,
                          y: pt.y,
                        })
                      }
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}

                {/* Value Label on Latest Point */}
                {latestPoint && (
                  <text
                    x={latestPoint.x + 6}
                    y={latestPoint.y + 4}
                    fill={party.color}
                    fontSize={weightingModel === 'uniform' ? '10.5' : '11'}
                    fontWeight="bold"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {weightingModel === 'uniform'
                      ? `${latestPoint.valPrecise.toFixed(2)}%`
                      : showHighPrecision
                      ? `${latestPoint.val.toFixed(2)}%`
                      : `${latestPoint.val.toFixed(1)}%`}
                  </text>
                )}
              </g>
            );
          })}

          {/* Hover Tooltip Box */}
          {hoveredPoint && (
            <g>
              <rect
                x={Math.min(hoveredPoint.x - 60, width - 170)}
                y={Math.max(hoveredPoint.y - 48, 10)}
                width="160"
                height="44"
                rx="6"
                fill="#0f172a"
                opacity="0.95"
              />
              <text
                x={Math.min(hoveredPoint.x + 20, width - 90)}
                y={Math.max(hoveredPoint.y - 30, 27)}
                fill="#94a3b8"
                fontSize="9"
                textAnchor="middle"
              >
                {hoveredPoint.date} · {weightingModel === 'uniform' ? 'Aritmetica' : 'Ponderata'}
              </text>
              <text
                x={Math.min(hoveredPoint.x + 20, width - 90)}
                y={Math.max(hoveredPoint.y - 14, 43)}
                fill="#ffffff"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                {PARTIES[hoveredPoint.partyId]?.shortName}: {hoveredPoint.percentPrecise.toFixed(2)}% ({hoveredPoint.percent.toFixed(1)}%)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Synchronized Legend Footer */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span>
          Algoritmo attivo nel grafico:{' '}
          <strong className="text-slate-800">
            {weightingModel === 'uniform' ? 'Media Aritmetica Semplice (1/N = 9,09%)' : 'Nostra Media Ponderata Multi-criterio'}
          </strong>
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Valori centesimali visibili al passaggio del mouse
        </span>
      </div>
    </div>
  );
};
