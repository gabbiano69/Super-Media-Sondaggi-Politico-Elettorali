import React from 'react';

interface PartySparklineProps {
  data: number[]; // 4 weekly points e.g. [26.8, 26.9, 27.1, 27.2]
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const PartySparkline: React.FC<PartySparklineProps> = ({
  data,
  color = '#0284c7',
  width = 68,
  height = 24,
  className = '',
}) => {
  if (!data || data.length < 2) return null;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 0.1; // avoid divide by zero

  const paddingX = 4;
  const paddingY = 4;
  const usableWidth = width - paddingX * 2;
  const usableHeight = height - paddingY * 2;

  // Map each data point to an SVG coordinate
  const points = data.map((val, idx) => {
    const x = paddingX + (idx / (data.length - 1)) * usableWidth;
    // higher percentage -> lower Y coordinate in SVG
    const y = height - paddingY - ((val - minVal) / range) * usableHeight;
    return { x, y, val };
  });

  const polylinePoints = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // SVG Area Path for subtle gradient fill
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  const areaPath = `M ${firstPoint.x.toFixed(1)},${height} L ${polylinePoints} L ${lastPoint.x.toFixed(1)},${height} Z`;

  const isGrowing = lastPoint.val >= firstPoint.val;
  const delta = (lastPoint.val - firstPoint.val).toFixed(1);
  const deltaFormatted = Number(delta) > 0 ? `+${delta}%` : `${delta}%`;

  // Unique gradient ID per color
  const gradientId = `spark-grad-${Math.abs(color.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0))}`;

  return (
    <div
      className={`inline-flex items-center group relative cursor-pointer ${className}`}
      title={`Trend 4 settimane: ${data.join('% → ')}% (${deltaFormatted})`}
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible"
        aria-label={`Grafico trend 4 settimane: da ${firstPoint.val}% a ${lastPoint.val}%`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Shaded Area */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Main Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylinePoints}
        />

        {/* Starting subtle dot */}
        <circle cx={firstPoint.x} cy={firstPoint.y} r="1.5" fill={color} opacity="0.6" />

        {/* Ending prominent dot (latest value) */}
        <circle cx={lastPoint.x} cy={lastPoint.y} r="2.25" fill={color} stroke="#ffffff" strokeWidth="1" />
      </svg>
    </div>
  );
};
