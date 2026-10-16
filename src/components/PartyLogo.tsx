import React from 'react';

interface PartyLogoProps {
  partyId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PartyLogo: React.FC<PartyLogoProps> = ({ partyId, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-6 h-6 text-[8px]',
    md: 'w-9 h-9 text-[10px]',
    lg: 'w-12 h-12 text-xs',
    xl: 'w-16 h-16 text-sm',
  };

  const containerClass = `relative shrink-0 rounded-full overflow-hidden shadow-xs border border-slate-200/80 bg-white flex items-center justify-center ${sizeMap[size]} ${className}`;

  switch (partyId) {
    case 'fdi':
      return (
        <div className={containerClass} title="Fratelli d'Italia">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#0b2447" />
            <circle cx="50" cy="50" r="43" fill="#003366" />
            {/* Trapezoid base of flame */}
            <path d="M34 76 L66 76 L60 67 L40 67 Z" fill="#d1d5db" />
            {/* Tricolore flame */}
            <path d="M42 67 C40 54 44 46 47 30 C49 42 46 58 46 67 Z" fill="#009246" />
            <path d="M48 67 C48 50 51 38 52 24 C55 36 54 52 53 67 Z" fill="#ffffff" />
            <path d="M54 67 C55 52 61 44 63 32 C60 46 57 58 57 67 Z" fill="#ce2b37" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'pd':
      return (
        <div className={containerClass} title="Partito Democratico">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            {/* Olive branch */}
            <path d="M22 68 C35 55 45 40 68 22" stroke="#2e7d32" strokeWidth="3" fill="none" />
            <path d="M35 55 C32 48 38 45 42 50 C40 56 36 57 35 55 Z" fill="#388e3c" />
            <path d="M48 42 C45 35 51 32 55 37 C53 43 49 44 48 42 Z" fill="#388e3c" />
            {/* Stylized P in green, D in red */}
            <text x="32" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="38" fill="#2e7d32">P</text>
            <text x="54" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="38" fill="#d32f2f">D</text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'm5s':
      return (
        <div className={containerClass} title="Movimento 5 Stelle">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            {/* Yellow 5 stars */}
            {[
              { x: 22, y: 46 },
              { x: 35, y: 34 },
              { x: 50, y: 28 },
              { x: 65, y: 34 },
              { x: 78, y: 46 },
            ].map((star, i) => (
              <polygon
                key={i}
                points="0,-8 2.4,-2.5 8.3,-2.5 3.5,1 5.3,6.8 0,3.3 -5.3,6.8 -3.5,1 -8.3,-2.5 -2.4,-2.5"
                fill="#f59e0b"
                transform={`translate(${star.x}, ${star.y}) scale(1.1)`}
              />
            ))}
            <text x="50" y="66" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="13" fill="#1e293b" textAnchor="middle">
              MOVIMENTO
            </text>
            <rect x="34" y="72" width="32" height="12" rx="3" fill="#dc2626" />
            <text x="50" y="82" fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="9.5" fill="#ffffff" textAnchor="middle">
              2050
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'fn':
      return (
        <div className={containerClass} title="Futuro Nazionale">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#0f172a" />
            {/* Tricolore band across bottom */}
            <path d="M15 64 L85 64 L80 78 L20 78 Z" fill="#009246" />
            <path d="M26 64 L74 64 L70 78 L30 78 Z" fill="#ffffff" />
            <path d="M48 64 L74 64 L70 78 L48 78 Z" fill="#ce2b37" />
            {/* Star with eagle wings silhouette */}
            <polygon
              points="0,-12 3.5,-3.7 12.4,-3.7 5.2,1.5 7.9,10.2 0,4.9 -7.9,10.2 -5.2,1.5 -12.4,-3.7 -3.5,-3.7"
              fill="#fbbf24"
              transform="translate(50, 36) scale(1.15)"
            />
            <text x="50" y="58" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="11" fill="#f8fafc" textAnchor="middle">
              FUTURO
            </text>
            <text x="50" y="90" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="8" fill="#94a3b8" textAnchor="middle">
              VANNACCI
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#fbbf24" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'fi':
      return (
        <div className={containerClass} title="Forza Italia">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#0284c7" />
            <circle cx="50" cy="50" r="43" fill="#ffffff" />
            {/* Italian flag band */}
            <g transform="rotate(-18 50 50)">
              <rect x="20" y="32" width="20" height="26" fill="#009246" />
              <rect x="40" y="32" width="20" height="26" fill="#ffffff" />
              <rect x="60" y="32" width="20" height="26" fill="#ce2b37" />
              <text x="50" y="44" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="8" fill="#002b7f" textAnchor="middle">
                FORZA
              </text>
              <text x="50" y="52" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="8" fill="#002b7f" textAnchor="middle">
                ITALIA
              </text>
            </g>
            <text x="50" y="78" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="7" fill="#0284c7" textAnchor="middle">
              BERLUSCONI
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#0284c7" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'avs':
      return (
        <div className={containerClass} title="Alleanza Verdi e Sinistra">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            {/* Left green half, right red half split */}
            <path d="M 50 2 A 48 48 0 0 0 50 98 Z" fill="#16a34a" />
            <path d="M 50 2 A 48 48 0 0 1 50 98 Z" fill="#dc2626" />
            {/* Sunflower center */}
            <circle cx="36" cy="48" r="9" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            {/* Text labels */}
            <text x="50" y="42" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="20" fill="#ffffff" textAnchor="middle">
              AVS
            </text>
            <text x="50" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="8" fill="#ffffff" textAnchor="middle">
              VERDI SINISTRA
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'lega':
      return (
        <div className={containerClass} title="Lega">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#047857" />
            <circle cx="50" cy="50" r="43" fill="#ffffff" />
            {/* Alberto da Giussano warrior silhouette */}
            <g transform="translate(50, 42) scale(0.7)">
              <circle cx="0" cy="-28" r="7" fill="#047857" />
              <path d="M -4 -20 L 4 -20 L 8 4 L -8 4 Z" fill="#047857" />
              <path d="M -8 4 L -14 26 L -7 26 L -2 6 L 2 6 L 7 26 L 14 26 L 8 4 Z" fill="#047857" />
              {/* Raised arm with sword */}
              <path d="M 4 -16 L 20 -28 L 16 -32 L 0 -20 Z" fill="#047857" />
              <line x1="18" y1="-30" x2="32" y2="-44" stroke="#047857" strokeWidth="3" />
              <line x1="16" y1="-32" x2="22" y2="-28" stroke="#047857" strokeWidth="4" />
              {/* Shield */}
              <ellipse cx="-12" cy="-6" rx="6" ry="12" fill="#047857" />
            </g>
            <text x="50" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="14" fill="#047857" textAnchor="middle">
              LEGA
            </text>
            <text x="50" y="85" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="7" fill="#1e293b" textAnchor="middle">
              SALVINI PREMIER
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#047857" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'azione':
      return (
        <div className={containerClass} title="Azione">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#0f172a" />
            {/* Geometric A / Arrow symbol */}
            <path d="M 50 18 L 74 66 L 60 66 L 50 44 L 40 66 L 26 66 Z" fill="#ffffff" />
            <polygon points="50,28 62,54 38,54" fill="#f97316" />
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="12" fill="#ffffff" textAnchor="middle">
              AZIONE
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#f97316" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'iv':
      return (
        <div className={containerClass} title="Italia Viva">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            <defs>
              <linearGradient id="ivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            {/* Soaring seagull in fuchsia-orange */}
            <path
              d="M 18 48 C 30 32 46 36 50 48 C 54 36 70 32 82 48 C 66 40 54 44 50 56 C 46 44 34 40 18 48 Z"
              fill="url(#ivGrad)"
            />
            <text x="50" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="12" fill="#be185d" textAnchor="middle">
              ITALIA VIVA
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ec4899" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'piueu':
      return (
        <div className={containerClass} title="+Europa">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#fbbf24" />
            <text x="32" y="56" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="30" fill="#003366">+</text>
            <text x="56" y="56" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="16" fill="#003366">EU</text>
            <text x="50" y="76" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="10" fill="#003366" textAnchor="middle">
              EUROPA
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#003366" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'nm':
      return (
        <div className={containerClass} title="Noi Moderati">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#1d4ed8" />
            {/* Compass rose symbol */}
            <polygon points="50,22 54,42 74,46 54,50 50,70 46,50 26,46 46,42" fill="#fbbf24" />
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="8.5" fill="#ffffff" textAnchor="middle">
              NOI MODERATI
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'scn':
      return (
        <div className={containerClass} title="Sud chiama Nord">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#ea580c" />
            <circle cx="50" cy="50" r="44" fill="#fbbf24" />
            {/* Sun / compass rays and stylized Italian boot / Sicily */}
            <circle cx="50" cy="38" r="14" fill="#f97316" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="38"
                x2={50 + 19 * Math.cos((deg * Math.PI) / 180)}
                y2={38 + 19 * Math.sin((deg * Math.PI) / 180)}
                stroke="#dc2626"
                strokeWidth="2.5"
              />
            ))}
            <text x="50" y="66" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8" fill="#1e293b" textAnchor="middle">
              SUD CHIAMA NORD
            </text>
            <rect x="25" y="72" width="50" height="13" rx="2" fill="#1e293b" />
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="8" fill="#fbbf24" textAnchor="middle">
              DE LUCA
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ea580c" strokeWidth="2" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass} title="Altri partiti">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="49" fill="#f1f5f9" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6,4" />
            <text x="50" y="55" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="12" fill="#64748b" textAnchor="middle">
              ALTRI
            </text>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>
      );
  }
};
