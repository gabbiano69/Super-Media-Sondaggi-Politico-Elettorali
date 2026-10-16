import React, { useState } from 'react';
import { HISTORICAL_SUPERMEDIAS, PARTIES } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';

interface PollsTrendChartProps {
  activeParties?: string[];
}

export const PollsTrendChart: React.FC<PollsTrendChartProps> = () => {
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
    x: number;
    y: number;
  } | null>(null);

  // Chronological order (oldest to newest)
  const series = [...HISTORICAL_SUPERMEDIAS].reverse();

  const toggleParty = (partyId: string) => {
    setSelectedParties((prev) =>
      prev.includes(partyId) ? prev.filter((id) => id !== partyId) : [...prev, partyId]
    );
  };

  // Dimensions
  const width = 860;
  const height = 340;
  const padding = { top: 28, right: 30, bottom: 44, left: 45 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Y-axis bounds (min 0%, max 32%)
  const minY = 0;
  const maxY = 32;

  const getX = (index: number) => padding.left + (index / (series.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;

  const yTicks = [0, 5, 10, 15, 20, 25, 30];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Evoluzione Storica delle Intenzioni di Voto (2026)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Media mobile ponderata per data di rilevazione settimanale
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

          {/* X axis dates */}
          {series.map((item, idx) => {
            const x = getX(idx);
            return (
              <g key={item.id}>
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
                  fill="#64748b"
                  fontSize="11"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {item.date.replace(' 2026', '')}
                </text>
              </g>
            );
          })}

          {/* Party Lines */}
          {selectedParties.map((partyId) => {
            const party = PARTIES[partyId];
            if (!party) return null;

            const points = series.map((rel, idx) => {
              const val = rel.partyAverages[partyId]?.percent || 0;
              return { x: getX(idx), y: getY(val), val, date: rel.date };
            });

            // Smooth cubic path
            const pathData = points.reduce((acc, curr, idx, arr) => {
              if (idx === 0) return `M ${curr.x} ${curr.y}`;
              const prev = arr[idx - 1];
              const cx1 = prev.x + (curr.x - prev.x) / 2;
              const cy1 = prev.y;
              const cx2 = prev.x + (curr.x - prev.x) / 2;
              const cy2 = curr.y;
              return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
            }, '');

            return (
              <g key={partyId}>
                {/* Glow / shadow line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={party.color}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />

                {/* Point markers */}
                {points.map((p, pIdx) => (
                  <circle
                    key={pIdx}
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint?.partyId === partyId && hoveredPoint.date === p.date ? 6 : 4}
                    fill={party.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() =>
                      setHoveredPoint({
                        date: p.date,
                        partyId,
                        percent: p.val,
                        x: p.x,
                        y: p.y,
                      })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900 text-white rounded-lg px-3 py-1.5 shadow-lg text-xs"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
              transform: 'translate(-50%, -125%)',
            }}
          >
            <div className="font-semibold text-slate-200">{PARTIES[hoveredPoint.partyId]?.name}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono tabular-nums text-sm font-bold text-emerald-400">
                {hoveredPoint.percent.toFixed(1)}%
              </span>
              <span className="text-slate-400 text-[10px]">({hoveredPoint.date})</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 mt-2">
        <span>Fonte: Nostra Serie Storica Ponderata dai Sondaggi Nazionali Accreditati a Sabato Scorso</span>
        <span>Passa il mouse sui nodi per visualizzare il valore puntuale</span>
      </div>
    </div>
  );
};
