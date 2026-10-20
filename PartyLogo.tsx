import React, { useState } from 'react';

interface PartyLogoProps {
  partyId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const OFFICIAL_LOGOS: Record<string, string> = {
  fdi: '/logos/fdi.png',
  pd: '/logos/pd.png',
  m5s: '/logos/m5s.png',
  fi: '/logos/fi.png',
  lega: '/logos/lega.png',
  fn: '/logos/fn.svg',
  avs: '/logos/avs.svg',
  azione: '/logos/azione.svg',
  iv: '/logos/iv.png',
  piueu: '/logos/piueu.png',
  nm: '/logos/nm.svg',
  scn: '/logos/scn.png',
  pld: '/logos/pld.svg',
  progettocivico: '/logos/progettocivico.svg',
  piuuno: '/logos/piuuno.svg',
};

const PARTY_NAMES: Record<string, string> = {
  fdi: "Fratelli d'Italia",
  pd: 'Partito Democratico',
  m5s: 'Movimento 5 Stelle',
  fn: 'Futuro Nazionale (Roberto Vannacci)',
  fi: 'Forza Italia',
  avs: 'Alleanza Verdi e Sinistra',
  lega: 'Lega per Salvini Premier',
  azione: 'Azione (Carlo Calenda)',
  iv: 'Italia Viva (Matteo Renzi)',
  piueu: '+Europa (Emma Bonino)',
  nm: 'Noi Moderati',
  scn: 'Sud Chiama Nord (Cateno De Luca)',
  pld: 'Partito Liberaldemocratico (Luigi Marattin)',
  progettocivico: 'Progetto Civico',
  piuuno: 'Più Uno',
  nonsiesprime: 'Non si esprime',
};

export const PartyLogo: React.FC<PartyLogoProps> = ({ partyId, size = 'md', className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const officialSrc = OFFICIAL_LOGOS[partyId];
  const partyName = PARTY_NAMES[partyId] || partyId;

  const sizeMap = {
    sm: 'w-6 h-6 text-[8px]',
    md: 'w-9 h-9 text-[10px]',
    lg: 'w-12 h-12 text-xs',
    xl: 'w-16 h-16 text-sm',
  };

  const containerClass = `relative shrink-0 rounded-full overflow-hidden shadow-xs border border-slate-200/90 bg-white flex items-center justify-center select-none ${sizeMap[size]} ${className}`;

  if (officialSrc && !imgError) {
    return (
      <div className={containerClass} title={`${partyName} (Logo Ufficiale Originale)`}>
        <img
          src={officialSrc}
          alt={partyName}
          className="w-full h-full object-contain rounded-full p-0.5 select-none pointer-events-none"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  switch (partyId) {
    case 'fdi':
      return (
        <div className={containerClass} title="Fratelli d'Italia - Giorgia Meloni">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Deep Navy Disc */}
            <circle cx="50" cy="50" r="49" fill="#0b2447" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#eab308" strokeWidth="1.5" />
            
            {/* Arc Title Text */}
            <text x="50" y="21" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="7" fill="#ffffff" textAnchor="middle" letterSpacing="0.4">
              FRATELLI d'ITALIA
            </text>

            {/* Silver trapezoidal base */}
            <polygon points="34,74 66,74 61,66 39,66" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="41" y1="70" x2="59" y2="70" stroke="#64748b" strokeWidth="0.6" />

            {/* Tricolore Flame (Fiamma Tricolore) */}
            {/* Green leaf (left) */}
            <path d="M 42 66 C 39 53 43 45 47 30 C 50 43 46 56 46 66 Z" fill="#009246" />
            {/* White central flame */}
            <path d="M 47.5 66 C 47.5 50 51 36 52 23 C 55 36 53.5 52 52.5 66 Z" fill="#ffffff" />
            {/* Red leaf (right) */}
            <path d="M 53.5 66 C 55 52 61 44 63 32 C 59 45 56.5 57 56.5 66 Z" fill="#ce2b37" />

            {/* Bottom Leader Text */}
            <text x="50" y="87" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="7.5" fill="#facc15" textAnchor="middle" letterSpacing="0.5">
              MELONI
            </text>
          </svg>
        </div>
      );

    case 'pd':
      return (
        <div className={containerClass} title="Partito Democratico">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* White Disc with Green Rim */}
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#009246" strokeWidth="2.5" />

            {/* Top Text */}
            <text x="50" y="19" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="6.5" fill="#009246" textAnchor="middle" letterSpacing="0.3">
              PARTITO DEMOCRATICO
            </text>

            {/* Olive branch stem */}
            <path d="M 24 66 C 34 54 44 42 66 26" stroke="#2e7d32" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <ellipse cx="38" cy="50" rx="4" ry="2.2" transform="rotate(-30 38 50)" fill="#388e3c" />
            <ellipse cx="49" cy="38" rx="4" ry="2.2" transform="rotate(-25 49 38)" fill="#388e3c" />

            {/* Bold Green P and Red D */}
            <text x="31" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="38" fill="#009246">
              P
            </text>
            <text x="54" y="74" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="38" fill="#d32f2f">
              D
            </text>

            {/* Subtle bottom tricolore bar */}
            <rect x="36" y="81" width="9" height="2.5" fill="#009246" />
            <rect x="45" y="81" width="10" height="2.5" fill="#ffffff" />
            <rect x="55" y="81" width="9" height="2.5" fill="#ce2b37" />
          </svg>
        </div>
      );

    case 'm5s':
      return (
        <div className={containerClass} title="Movimento 5 Stelle 2050">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

            {/* 5 Golden Yellow Stars in Arc */}
            {[
              { x: 20, y: 44, s: 0.95 },
              { x: 33, y: 32, s: 1.1 },
              { x: 50, y: 26, s: 1.25 },
              { x: 67, y: 32, s: 1.1 },
              { x: 80, y: 44, s: 0.95 },
            ].map((star, i) => (
              <polygon
                key={i}
                points="0,-7 2.2,-2.2 7.4,-2.2 3.1,1 4.7,6 0,2.9 -4.7,6 -3.1,1 -7.4,-2.2 -2.2,-2.2"
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="0.4"
                transform={`translate(${star.x}, ${star.y}) scale(${star.s})`}
              />
            ))}

            {/* MOVIMENTO in bold black */}
            <text x="50" y="65" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="11" fill="#1e293b" textAnchor="middle" letterSpacing="0.4">
              MOVIMENTO
            </text>

            {/* Red Badge 2050 */}
            <rect x="33" y="70" width="34" height="13" rx="3" fill="#dc2626" />
            <text x="50" y="80.5" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="9.5" fill="#ffffff" textAnchor="middle">
              2050
            </text>
          </svg>
        </div>
      );

    case 'fi':
      return (
        <div className={containerClass} title="Forza Italia - Berlusconi Presidente">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Deep Sky Blue Disc */}
            <circle cx="50" cy="50" r="49" fill="#0284c7" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#ffffff" strokeWidth="2" />

            {/* Slanted Italian Tricolore Flag Banner */}
            <g transform="translate(17, 21)">
              <rect x="0" y="0" width="22" height="30" fill="#009246" />
              <rect x="22" y="0" width="22" height="30" fill="#ffffff" />
              <rect x="44" y="0" width="22" height="30" fill="#ce2b37" />
              <rect x="0" y="0" width="66" height="30" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <text x="33" y="13" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8" fill="#002b7f" textAnchor="middle">
                FORZA
              </text>
              <text x="33" y="24" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8" fill="#002b7f" textAnchor="middle">
                ITALIA
              </text>
            </g>

            {/* Bottom Text: BERLUSCONI PRESIDENTE */}
            <text x="50" y="69" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="6.8" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
              BERLUSCONI
            </text>
            <text x="50" y="79" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="5.5" fill="#bae6fd" textAnchor="middle" letterSpacing="0.5">
              PRESIDENTE
            </text>
          </svg>
        </div>
      );

    case 'lega':
      return (
        <div className={containerClass} title="Lega - Salvini Premier">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Emerald Green Ring */}
            <circle cx="50" cy="50" r="49" fill="#047857" />
            <circle cx="50" cy="50" r="46.5" fill="#ffffff" />
            <circle cx="50" cy="50" r="43.5" fill="none" stroke="#047857" strokeWidth="1.5" />

            {/* Alberto da Giussano Warrior Silhouette */}
            <g transform="translate(50, 41) scale(0.72)">
              <circle cx="0" cy="-26" r="6" fill="#047857" />
              <path d="M -4 -19 L 4 -19 L 7 4 L -7 4 Z" fill="#047857" />
              <path d="M -7 4 L -13 24 L -6 24 L -2 6 L 2 6 L 6 24 L 13 24 L 7 4 Z" fill="#047857" />
              {/* Arm & Raised Sword */}
              <path d="M 4 -15 L 19 -27 L 15 -31 L 0 -19 Z" fill="#047857" />
              <line x1="17" y1="-29" x2="31" y2="-43" stroke="#047857" strokeWidth="3.2" strokeLinecap="round" />
              {/* Shield */}
              <ellipse cx="-11" cy="-5" rx="6.5" ry="11" fill="#047857" />
            </g>

            {/* LEGA */}
            <text x="50" y="72" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="13.5" fill="#047857" textAnchor="middle">
              LEGA
            </text>
            {/* SALVINI PREMIER */}
            <text x="50" y="83" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="6.5" fill="#1e293b" textAnchor="middle" letterSpacing="0.4">
              SALVINI PREMIER
            </text>
          </svg>
        </div>
      );

    case 'fn':
      return (
        <div className={containerClass} title="Futuro Nazionale - Vannacci">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Midnight Black Disc */}
            <circle cx="50" cy="50" r="49" fill="#0a0f1d" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#eab308" strokeWidth="2" />

            {/* Golden Star with Eagle Wings */}
            <polygon
              points="0,-12 3.5,-3.7 12.4,-3.7 5.2,1.5 7.9,10.2 0,4.9 -7.9,10.2 -5.2,1.5 -12.4,-3.7 -3.5,-3.7"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="0.5"
              transform="translate(50, 31) scale(1.15)"
            />

            {/* Horizontal Tricolore Ribbon */}
            <rect x="22" y="47" width="18" height="6.5" fill="#009246" />
            <rect x="40" y="47" width="20" height="6.5" fill="#ffffff" />
            <rect x="60" y="47" width="18" height="6.5" fill="#ce2b37" />

            {/* FUTURO NAZIONALE */}
            <text x="50" y="67" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8.5" fill="#f8fafc" textAnchor="middle" letterSpacing="0.4">
              FUTURO NAZIONALE
            </text>
            {/* VANNACCI */}
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="10.5" fill="#fbbf24" textAnchor="middle" letterSpacing="0.6">
              VANNACCI
            </text>
          </svg>
        </div>
      );

    case 'avs':
      return (
        <div className={containerClass} title="Alleanza Verdi e Sinistra">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Rich Red Disc */}
            <circle cx="50" cy="50" r="49" fill="#be123c" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#ffffff" strokeWidth="1.5" />

            {/* Header Text */}
            <text x="50" y="22" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="5.5" fill="#ffffff" textAnchor="middle" letterSpacing="0.4">
              ALLEANZA VERDI E SINISTRA
            </text>

            {/* Stylized Leaf: Green Left, Red/Pink Right */}
            <path d="M 50 30 C 35 38 35 58 50 66 Z" fill="#15803d" />
            <path d="M 50 30 C 65 38 65 58 50 66 Z" fill="#f43f5e" />
            <path d="M 50 30 L 50 66" stroke="#ffffff" strokeWidth="1" />

            {/* AVS */}
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="13.5" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
              AVS
            </text>
          </svg>
        </div>
      );

    case 'azione':
      return (
        <div className={containerClass} title="Azione - Carlo Calenda">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#0f172a" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#f97316" strokeWidth="2" />

            {/* Forward-facing stylized Arrow/Chevron */}
            <path d="M 50 17 L 75 52 L 61 52 L 50 36 L 39 52 L 25 52 Z" fill="#ffffff" />
            <polygon points="50,25 61,43 39,43" fill="#f97316" />

            {/* AZIONE */}
            <text x="50" y="69" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="12.5" fill="#ffffff" textAnchor="middle" letterSpacing="0.4">
              AZIONE
            </text>
            {/* CALENDA */}
            <text x="50" y="83" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="7.5" fill="#fb923c" textAnchor="middle" letterSpacing="0.5">
              CALENDA
            </text>
          </svg>
        </div>
      );

    case 'iv':
      return (
        <div className={containerClass} title="Italia Viva - Matteo Renzi">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#ffffff" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#db2777" strokeWidth="2.5" />

            {/* Iconic stylized soaring wing in pink-orange gradient */}
            <defs>
              <linearGradient id="ivWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>

            <path
              d="M 17 40 C 30 26 46 30 50 42 C 54 30 70 26 83 40 C 66 33 54 37 50 48 C 46 37 34 33 17 40 Z"
              fill="url(#ivWingGrad)"
            />

            {/* ITALIA VIVA */}
            <text x="50" y="66" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="11" fill="#0f172a" textAnchor="middle">
              ITALIA VIVA
            </text>
            {/* CON MATTEO RENZI */}
            <text x="50" y="80" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="6.5" fill="#db2777" textAnchor="middle" letterSpacing="0.3">
              CON MATTEO RENZI
            </text>
          </svg>
        </div>
      );

    case 'pld':
      return (
        <div className={containerClass} title="Partito Liberaldemocratico - Luigi Marattin">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Royal Deep Blue Disc */}
            <circle cx="50" cy="50" r="49" fill="#024177" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#facc15" strokeWidth="2.5" />

            {/* Rising Sun Arc & Rays */}
            <path d="M 18 55 C 22 33 42 21 72 25 C 60 29 35 39 32 65 Z" fill="#fbbf24" />
            <circle cx="50" cy="39" r="10" fill="#facc15" />

            {/* PLD */}
            <text x="50" y="65" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="12" fill="#ffffff" textAnchor="middle">
              PLD
            </text>
            {/* LIBERALDEMOCRATICO */}
            <text x="50" y="76" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="5.5" fill="#93c5fd" textAnchor="middle" letterSpacing="0.3">
              LIBERALDEMOCRATICO
            </text>
            {/* MARATTIN */}
            <text x="50" y="87" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="7" fill="#fde047" textAnchor="middle" letterSpacing="0.4">
              MARATTIN
            </text>
          </svg>
        </div>
      );

    case 'piueu':
      return (
        <div className={containerClass} title="+Europa - Emma Bonino">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            {/* Bright Yellow Disc with Navy Border */}
            <circle cx="50" cy="50" r="49" fill="#facc15" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#1e3a8a" strokeWidth="2.5" />

            {/* +EU in Purple */}
            <text x="50" y="53" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="26" fill="#3b0764" textAnchor="middle" letterSpacing="-0.5">
              +EU
            </text>
            {/* +EUROPA */}
            <text x="50" y="69" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8.5" fill="#1e3a8a" textAnchor="middle">
              +EUROPA
            </text>
            {/* CON EMMA BONINO */}
            <text x="50" y="81" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="6.2" fill="#1e3a8a" textAnchor="middle">
              CON EMMA BONINO
            </text>
          </svg>
        </div>
      );

    case 'nm':
      return (
        <div className={containerClass} title="Noi Moderati - Lupi">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#1e3a8a" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#facc15" strokeWidth="2" />

            {/* Golden 8-pointed star */}
            <polygon points="50,17 54,33 70,37 54,41 50,57 46,41 30,37 46,33" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />

            {/* NOI MODERATI */}
            <text x="50" y="70" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="9" fill="#ffffff" textAnchor="middle">
              NOI MODERATI
            </text>
            {/* LUPI */}
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="7.5" fill="#facc15" textAnchor="middle">
              LUPI
            </text>
          </svg>
        </div>
      );

    case 'scn':
      return (
        <div className={containerClass} title="Sud Chiama Nord - Cateno De Luca">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#ea580c" />
            <circle cx="50" cy="50" r="46.5" fill="#fbbf24" />
            <circle cx="50" cy="38" r="13" fill="#f97316" />

            {/* Sunburst Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1="50"
                y1="38"
                x2={50 + 17 * Math.cos((deg * Math.PI) / 180)}
                y2={38 + 17 * Math.sin((deg * Math.PI) / 180)}
                stroke="#dc2626"
                strokeWidth="2.5"
              />
            ))}

            {/* SUD CHIAMA NORD */}
            <text x="50" y="66" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8" fill="#1e293b" textAnchor="middle">
              SUD CHIAMA NORD
            </text>
            {/* DE LUCA */}
            <rect x="24" y="72" width="52" height="13" rx="2" fill="#1e293b" />
            <text x="50" y="82" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8" fill="#fbbf24" textAnchor="middle">
              DE LUCA
            </text>
          </svg>
        </div>
      );

    case 'progettocivico':
      return (
        <div className={containerClass} title="Progetto Civico (Campo Largo)">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#0f766e" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#2dd4bf" strokeWidth="2.5" />

            <path d="M 24 56 C 34 36 66 36 76 56" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="36" r="7" fill="#fbbf24" />

            <text x="50" y="72" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="8.5" fill="#ffffff" textAnchor="middle">
              PROGETTO
            </text>
            <text x="50" y="83" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="7.5" fill="#ccfbf1" textAnchor="middle">
              CIVICO
            </text>
          </svg>
        </div>
      );

    case 'piuuno':
      return (
        <div className={containerClass} title="Più Uno (+1, Campo Largo)">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#3730a3" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#818cf8" strokeWidth="2.5" />

            <text x="50" y="54" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="30" fill="#ffffff" textAnchor="middle">
              +1
            </text>
            <text x="50" y="73" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="900" fontSize="9" fill="#a5f3fc" textAnchor="middle">
              PIÙ UNO
            </text>
            <text x="50" y="84" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" fontSize="6.5" fill="#e0e7ff" textAnchor="middle">
              CAMPO LARGO
            </text>
          </svg>
        </div>
      );

    case 'nonsiesprime':
      return (
        <div className={containerClass} title="Non si esprime (Indecisi & Non Rispondenti)">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#334155" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,3" />
            <text x="50" y="55" fontFamily="JetBrains Mono, monospace" fontWeight="900" fontSize="28" fill="#cbd5e1" textAnchor="middle">
              ?
            </text>
            <text x="50" y="76" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="7" fill="#f1f5f9" textAnchor="middle">
              NON SI ESPRIME
            </text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={containerClass} title="Altri partiti">
          <svg viewBox="0 0 100 100" className="w-full h-full block">
            <circle cx="50" cy="50" r="49" fill="#f1f5f9" />
            <circle cx="50" cy="50" r="46.5" fill="none" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="5,3" />
            <text x="50" y="55" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="12" fill="#64748b" textAnchor="middle">
              ALTRI
            </text>
          </svg>
        </div>
      );
  }
};
