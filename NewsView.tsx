import React, { useState, useMemo } from 'react';
import { POLLS_NEWS_FEED, getNewsBySimulatedHour } from '../data/newsData';
import { PollNewsItem } from '../types/polls';
import { PARTIES } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import {
  Newspaper,
  Share2,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Download,
  Search,
  Filter,
  Tv,
  Radio,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  TrendingUp,
  Sliders,
  Eye,
  X,
  MessageCircle,
  Send,
  Linkedin,
  Play,
  RotateCcw,
} from 'lucide-react';

interface NewsViewProps {
  onNavigateToSupermedia: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigateToSupermedia }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simulatedHour, setSimulatedHour] = useState<number>(24); // default: full 24h cycle
  const [simulatedMinute, setSimulatedMinute] = useState<0 | 30>(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewCardItem, setPreviewCardItem] = useState<PollNewsItem | null>(null);

  // Hourly release schedule: 2 releases every hour from 08:00 to 00:00 (midnight)
  const availableNews = useMemo(() => {
    return getNewsBySimulatedHour(simulatedHour, simulatedMinute);
  }, [simulatedHour, simulatedMinute]);

  const filteredNews = useMemo(() => {
    return availableNews.filter((item) => {
      if (selectedCategory === 'supermedia' && !item.isSupermediaWeeklyRelease) {
        return false;
      }
      if (
        selectedCategory === 'onlynumbers' &&
        !item.institute.toLowerCase().includes('only numbers') &&
        !item.title.toLowerCase().includes('only numbers')
      ) {
        return false;
      }
      if (
        selectedCategory === 'porta_a_porta' &&
        item.category !== 'porta_a_porta' &&
        !item.title.toLowerCase().includes('porta a porta') &&
        !item.client.toLowerCase().includes('porta a porta')
      ) {
        return false;
      }
      if (
        selectedCategory === 'il_tempo_libero' &&
        item.category !== 'il_tempo_libero' &&
        !item.broadcastChannel.toLowerCase().includes('tempo') &&
        !item.broadcastChannel.toLowerCase().includes('libero') &&
        !item.title.toLowerCase().includes('il tempo') &&
        !item.title.toLowerCase().includes('libero')
      ) {
        return false;
      }
      if (selectedCategory === 'talkshow_tv' && item.category !== 'talkshow_tv') {
        return false;
      }
      if (selectedCategory === 'istituto_nazionale' && item.category !== 'istituto_nazionale') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSub = item.subtitle.toLowerCase().includes(q);
        const matchesInst = item.institute.toLowerCase().includes(q);
        const matchesClient = item.client.toLowerCase().includes(q);
        const matchesText = item.summaryText.toLowerCase().includes(q);
        const matchesChannel = item.broadcastChannel.toLowerCase().includes(q);
        const matchesHashtags = item.hashtags?.some((h) => h.toLowerCase().includes(q));
        const matchesSources = item.sourceLinks?.some(
          (s) => s.label.toLowerCase().includes(q) || s.outlet.toLowerCase().includes(q)
        );
        if (
          !matchesTitle &&
          !matchesSub &&
          !matchesInst &&
          !matchesClient &&
          !matchesText &&
          !matchesChannel &&
          !matchesHashtags &&
          !matchesSources
        ) {
          return false;
        }
      }
      return true;
    });
  }, [availableNews, selectedCategory, searchQuery]);

  // Social Share Handlers
  const handleShareTwitter = (item: PollNewsItem) => {
    const text = encodeURIComponent(`${item.title}\n\n${item.socialText}\n\n${item.hashtags.join(' ')}`);
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = (item: PollNewsItem) => {
    const text = encodeURIComponent(`*${item.title}*\n\n${item.socialText}\n\nFonte: Supermedia Sondaggi Politico-Elettorali`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTelegram = (item: PollNewsItem) => {
    const text = encodeURIComponent(`*${item.title}*\n\n${item.socialText}`);
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = (item: PollNewsItem) => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = (item: PollNewsItem) => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyClipboard = async (item: PollNewsItem) => {
    try {
      const fullText = `${item.title}\n\n${item.subtitle}\n\n${item.socialText}\n\n${item.hashtags.join(' ')}\n\nFonte: Supermedia Sondaggi Politico-Elettorali (Sabato ore 09:00 e aggiornamento continuo 2/ora)`;
      await navigator.clipboard.writeText(fullText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (err) {
      console.warn('Clipboard copy error:', err);
    }
  };

  // Generate and download image card (SVG / Canvas broadcast-grade)
  const handleDownloadCardImage = (item: PollNewsItem) => {
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0b192c" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)" />
        <rect x="0" y="0" width="1200" height="8" fill="#009246" />
        <rect x="400" y="0" width="400" height="8" fill="#ffffff" />
        <rect x="800" y="0" width="400" height="8" fill="#ce2b37" />

        <text x="60" y="60" fill="#38bdf8" font-size="14" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">
          ${item.badgeLabel.toUpperCase()} · ${item.timeSlot.toUpperCase()}
        </text>
        <text x="60" y="105" fill="#ffffff" font-size="28" font-weight="900" font-family="sans-serif">
          ${item.institute.toUpperCase()} · ${item.client}
        </text>

        <rect x="60" y="140" width="520" height="180" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="80" y="180" fill="#94a3b8" font-size="13" font-weight="bold" font-family="sans-serif">
          CENTRODESTRA (ESCLUDI VANNACCI)
        </text>
        <text x="80" y="235" fill="#38bdf8" font-size="44" font-weight="900" font-family="monospace">
          ${item.cdxEsclusoVannacci.toFixed(1)}%
        </text>
        <text x="80" y="280" fill="#64748b" font-size="13" font-family="sans-serif">
          FdI + FI + Lega + NM + ScN (Governo)
        </text>

        <rect x="620" y="140" width="520" height="180" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="640" y="180" fill="#f43f5e" font-size="13" font-weight="bold" font-family="sans-serif">
          CAMPO LARGO (CON ITALIA VIVA)
        </text>
        <text x="640" y="235" fill="#fb7185" font-size="44" font-weight="900" font-family="monospace">
          ${item.campoLargoConIV.toFixed(1)}%
        </text>
        <text x="640" y="280" fill="#64748b" font-size="13" font-family="sans-serif">
          PD + M5S + AVS + IV + +E + Civici (Premio 55%)
        </text>

        <text x="60" y="370" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">
          FdI ${item.results.fdi || 27.8}%  |  PD ${item.results.pd || 20.3}%  |  M5S ${item.results.m5s || 12.0}%  |  FN (Vannacci) ${item.results.fn || 7.7}%  |  FI ${item.results.fi || 7.5}%
        </text>
        <text x="60" y="415" fill="#cbd5e1" font-size="18" font-family="sans-serif">
          Lega ${item.results.lega || 5.7}%  |  AVS ${item.results.avs || 6.5}%  |  Azione ${item.results.azione || 3.4}%  |  IV ${item.results.iv || 2.4}%  |  PLD (Marattin) ${item.results.pld || 1.4}%
        </text>

        <rect x="60" y="460" width="1080" height="90" rx="10" fill="#0f172a" stroke="#1e293b" />
        <text x="80" y="500" fill="#f8fafc" font-size="14" font-weight="600" font-family="sans-serif">
          Fonti & Canali: ${item.broadcastChannel}
        </text>
        <text x="80" y="530" fill="#64748b" font-size="12" font-family="sans-serif">
          Campione: N=${item.sampleSize} casi · Errore ±${item.marginOfError}% · Codice Agcom: ${item.governmentPortalCode || 'SP-2026/Agcom'}
        </text>

        <text x="60" y="600" fill="#64748b" font-size="12" font-family="sans-serif">
          Supermedia Sondaggi Politico-Elettorali · Rilascio Sabato ore 09:00 e aggiornamento 2 per ora (08:00 - 00:00)
        </text>
      </svg>
    `;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `card_social_${item.id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 mb-1">
              <Newspaper className="w-4 h-4 text-blue-700" />
              <span>Newsroom Demoscopica & Notiziario Sondaggi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Ultime Notizie, Cartelli Grafici & Flash Sondaggi
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Tutti i sondaggi politici diffusi dai programmi TV e dai quotidiani (Porta a Porta su Rai 1 con Bruno Vespa, Realpolitik su Rete 4, quotidiano Il Tempo, Libero Quotidiano, TG La7 con Mentana, Mediaset, Sky TG24). 
              <strong> Aggiornamento continuo: 2 sondaggi ogni ora a partire dalle 08:00 del mattino fino alle 00:00 di sera</strong>. La pubblicazione ufficiale della <strong>Supermedia settimanale esce ogni sabato alle ore 09:00</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateToSupermedia}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <span>Vedi Supermedia Completa</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Cadence Banner with Hourly Simulation Control */}
        <div className="mt-5 p-4 rounded-xl border border-blue-200/90 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/70 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Clock className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Protocollo Flusso Demoscopico: 2 Sondaggi per Ora (08:00 – 00:00)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  La <strong>Supermedia ufficiale settimanale esce ogni sabato alle 09:00</strong>. Per il flusso news e per i dati mensili il sistema recepisce <strong>2 rilevazioni ogni ora</strong> tra le 08:00 e le 00:00 con cartelli grafici, testo di analisi e condivisione social.
                </p>
              </div>
            </div>

            {/* Time Slot Simulator */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 text-xs self-start lg:self-auto shadow-2xs">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-semibold text-slate-600">Simula Orario Flusso:</span>
              <select
                value={simulatedHour}
                onChange={(e) => setSimulatedHour(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option value={8}>Ore 08:00 (Apertura Edicole Il Tempo & Libero)</option>
                <option value={9}>Ore 09:00 (Uscita Ufficiale Supermedia Sabato)</option>
                <option value={10}>Ore 10:00</option>
                <option value={12}>Ore 12:00 (TG Mezzogiorno Mediaset)</option>
                <option value={14}>Ore 14:00 (Rai & Noto Sondaggi)</option>
                <option value={16}>Ore 16:00 (BiDiMedia & Ripartizione Seggi)</option>
                <option value={18}>Ore 18:00 (Pre-Serale Notiziari)</option>
                <option value={20}>Ore 20:00 (TG La7 Enrico Mentana)</option>
                <option value={22}>Ore 22:00 (Quarta Repubblica / Talk Prime Time)</option>
                <option value={23}>Ore 23:30 (Only Numbers per Porta a Porta · Rai 1)</option>
                <option value={24}>Tutte le ore (Flusso Completo 08:00 - 00:00, 34 Rilasci)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Tutti i Rilasci ({availableNews.length})
            </button>
            <button
              onClick={() => setSelectedCategory('supermedia')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'supermedia'
                  ? 'bg-blue-900 text-white shadow-xs font-bold'
                  : 'bg-white text-blue-900 border border-blue-200 hover:bg-blue-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Supermedia Sabato 09:00</span>
            </button>
            <button
              onClick={() => setSelectedCategory('onlynumbers')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'onlynumbers'
                  ? 'bg-amber-800 text-white shadow-xs font-bold'
                  : 'bg-amber-50 text-amber-950 border border-amber-200 hover:bg-amber-100 font-bold'
              }`}
            >
              <span>Only Numbers (2 Rilevazioni)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('porta_a_porta')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'porta_a_porta'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Tv className="w-3.5 h-3.5 text-blue-600" />
              <span>Porta a Porta (Rai 1)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('il_tempo_libero')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'il_tempo_libero'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
              <span>Il Tempo & Libero</span>
            </button>
            <button
              onClick={() => setSelectedCategory('talkshow_tv')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'talkshow_tv'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Talk Show TV
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca Only Numbers, Porta a Porta, Il Tempo..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Search Helper Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <span className="font-semibold">Scorciatoie di ricerca fonti:</span>
          {[
            'Only Numbers',
            'Porta a Porta',
            'Il Tempo',
            'Libero Quotidiano',
            'Rai 1',
            'Realpolitik',
            'Vannacci',
            'Supermedia',
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-600 underline font-semibold ml-1 cursor-pointer"
            >
              Azzera filtro
            </button>
          )}
        </div>
      </div>

      {/* News Feed List */}
      <div className="space-y-6">
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
            Nessun sondaggio corrisponde alla ricerca corrente "{searchQuery}". Prova con "Only Numbers" o "Porta a Porta".
          </div>
        ) : (
          filteredNews.map((item) => {
            const isSupermedia = item.isSupermediaWeeklyRelease;

            return (
              <article
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isSupermedia
                    ? 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border-blue-300 shadow-md ring-2 ring-blue-500/10 p-6 sm:p-7'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300 p-5 sm:p-6'
                }`}
              >
                {/* Header Badges & Timestamps */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded text-[11px] ${
                        isSupermedia
                          ? 'bg-blue-900 text-white'
                          : item.category === 'porta_a_porta'
                          ? 'bg-indigo-100 text-indigo-900 font-bold'
                          : item.category === 'il_tempo_libero'
                          ? 'bg-emerald-100 text-emerald-950 font-bold'
                          : 'bg-slate-100 text-slate-800 font-bold'
                      }`}
                    >
                      {item.badgeLabel}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.timeSlot}</span>
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 font-medium">{item.broadcastChannel}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <span>Campione: <strong>N={item.sampleSize}</strong></span>
                    <span>·</span>
                    <span>Margine: <strong>±{item.marginOfError}%</strong></span>
                    {item.governmentPortalCode && (
                      <>
                        <span>·</span>
                        <span className="font-mono text-slate-400">{item.governmentPortalCode}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-3">
                  <h2
                    className={`font-black tracking-tight text-slate-900 ${
                      isSupermedia ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>

                {/* Polling Graphic Card (Infographic representation) */}
                <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Grafica Rilevazione: {item.institute} ({item.client})
                      </span>
                    </div>

                    {/* Two Main Coalitions Snapshot */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5 bg-blue-50 text-blue-950 px-2.5 py-1 rounded border border-blue-200 font-bold">
                        <span>Centrodestra (Escludi Vannacci):</span>
                        <span className="font-mono tabular-nums text-sm">{item.cdxEsclusoVannacci.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-rose-50 text-rose-950 px-2.5 py-1 rounded border border-rose-200 font-bold">
                        <span>Campo Largo (con IV):</span>
                        <span className="font-mono tabular-nums text-sm text-rose-700">{item.campoLargoConIV.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Party Bar Chart Preview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
                    {[
                      { id: 'fdi', name: 'FdI', color: '#0b2447', val: item.results.fdi || 27.8 },
                      { id: 'pd', name: 'PD', color: '#ce2b37', val: item.results.pd || 20.3 },
                      { id: 'm5s', name: 'M5S', color: '#f59e0b', val: item.results.m5s || 12.0 },
                      { id: 'fn', name: 'Vannacci (FN)', color: '#1e293b', val: item.results.fn || 7.7 },
                      { id: 'fi', name: 'Forza Italia', color: '#0284c7', val: item.results.fi || 7.5 },
                      { id: 'lega', name: 'Lega', color: '#16a34a', val: item.results.lega || 5.7 },
                      { id: 'avs', name: 'AVS', color: '#059669', val: item.results.avs || 6.5 },
                      { id: 'azione', name: 'Azione', color: '#d97706', val: item.results.azione || 3.4 },
                      { id: 'iv', name: 'Italia Viva', color: '#e11d48', val: item.results.iv || 2.4 },
                      { id: 'pld', name: 'PLD (Marattin)', color: '#0284c7', val: item.results.pld || 1.4 },
                      { id: 'nm', name: 'NM', color: '#2563eb', val: item.results.nm || 1.1 },
                      { id: 'scn', name: 'ScN', color: '#ea580c', val: item.results.scn || 1.1 },
                    ]
                      .filter((p) => p.val !== undefined && p.val > 0)
                      .map((party) => (
                        <div
                          key={party.id}
                          className="bg-white p-2.5 rounded-lg border border-slate-200/90 shadow-2xs flex flex-col justify-between"
                        >
                          <div className="flex items-center gap-1.5">
                            <PartyLogo partyId={party.id} size="sm" className="w-4 h-4!" />
                            <span className="text-[11px] font-bold text-slate-800 truncate">{party.name}</span>
                          </div>
                          <div className="mt-2 flex items-baseline justify-between">
                            <span className="text-base font-extrabold font-mono tabular-nums text-slate-900">
                              {party.val.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1 mt-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(party.val * 3.3, 100)}%`,
                                backgroundColor: party.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Journalistic Body Text & Analysis */}
                <div className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5">
                  <p>{item.summaryText}</p>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
                      <span>Punti Chiave & Rilevanza Politica:</span>
                    </div>
                    <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                      {item.editorialAnalysis.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Accredited Sources Links Bar (Il Tempo, Libero, Rai, Sondaggi Politico Elettorali) */}
                {item.sourceLinks && item.sourceLinks.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
                      <Newspaper className="w-3.5 h-3.5 text-blue-800" />
                      <span>Fonti Dirette & Testate (Verifica Sondaggio):</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.sourceLinks.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors shadow-2xs ${
                            source.outlet === 'tempo'
                              ? 'bg-amber-100/80 text-amber-950 border-amber-300 hover:bg-amber-200'
                              : source.outlet === 'libero'
                              ? 'bg-emerald-100/80 text-emerald-950 border-emerald-300 hover:bg-emerald-200'
                              : source.outlet === 'rai'
                              ? 'bg-blue-100/80 text-blue-950 border-blue-300 hover:bg-blue-200'
                              : source.outlet === 'governo'
                              ? 'bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300'
                              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                          }`}
                          title={`Cerca su ${source.label}`}
                        >
                          <span>{source.label}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Sharing & Action Suite */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  {/* Social Share Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1 text-[11px]">
                      <Share2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>Condividi News:</span>
                    </span>

                    {/* X / Twitter */}
                    <button
                      type="button"
                      onClick={() => handleShareTwitter(item)}
                      className="px-2.5 py-1 rounded-md bg-black text-white hover:bg-slate-800 font-bold transition-colors cursor-pointer flex items-center gap-1 text-[11px] shadow-2xs"
                      title="Condividi su X (Twitter)"
                    >
                      <span>𝕏 Post</span>
                    </button>

                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(item)}
                      className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors cursor-pointer flex items-center gap-1 text-[11px] shadow-2xs"
                      title="Invia su WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>

                    {/* Telegram */}
                    <button
                      type="button"
                      onClick={() => handleShareTelegram(item)}
                      className="px-2.5 py-1 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-bold transition-colors cursor-pointer flex items-center gap-1 text-[11px] shadow-2xs"
                      title="Condividi su Telegram"
                    >
                      <Send className="w-3 h-3" />
                      <span>Telegram</span>
                    </button>

                    {/* Facebook */}
                    <button
                      type="button"
                      onClick={() => handleShareFacebook(item)}
                      className="px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors cursor-pointer text-[11px] shadow-2xs"
                      title="Condividi su Facebook"
                    >
                      <span>Facebook</span>
                    </button>

                    {/* LinkedIn */}
                    <button
                      type="button"
                      onClick={() => handleShareLinkedIn(item)}
                      className="px-2.5 py-1 rounded-md bg-[#0077b5] hover:bg-[#005f93] text-white font-bold transition-colors cursor-pointer text-[11px] shadow-2xs flex items-center gap-1"
                      title="Condividi su LinkedIn"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </button>

                    {/* Copy formatted text to clipboard */}
                    <button
                      type="button"
                      onClick={() => handleCopyClipboard(item)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold transition-colors cursor-pointer flex items-center gap-1 text-[11px] shadow-2xs"
                      title="Copia testo con statistiche e hashtag per social"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copiato!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copia Testo Social</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right: Graphic Card Download & Source Link */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewCardItem(item)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Visualizza anteprima grafica social (1200x630)"
                    >
                      <Eye className="w-3 h-3 text-slate-600" />
                      <span>Anteprima Grafica</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadCardImage(item)}
                      className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                      title="Scarica card grafica da allegare al post social"
                    >
                      <Download className="w-3 h-3 text-blue-700" />
                      <span>Scarica Grafica</span>
                    </button>

                    {item.directArticleUrl && (
                      <a
                        href={item.directArticleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-medium transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <span>Fonte Originale</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Social Card Preview Modal */}
      {previewCardItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl max-w-3xl w-full border border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">Anteprima Card Grafica per Social Network (1200x630)</span>
              </div>
              <button
                onClick={() => setPreviewCardItem(null)}
                className="text-slate-400 hover:text-white cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rendered Visual Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-slate-700/80 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                  {previewCardItem.badgeLabel} · {previewCardItem.timeSlot}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Campione: N={previewCardItem.sampleSize}</span>
                  <span>·</span>
                  <span>±{previewCardItem.marginOfError}%</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {previewCardItem.institute}: {previewCardItem.client}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{previewCardItem.broadcastChannel}</p>
              </div>

              {/* Big Coalitions Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-xs font-bold text-slate-300">CENTRODESTRA (ESCLUDI VANNACCI)</div>
                  <div className="text-3xl font-mono font-black text-sky-400 mt-1">
                    {previewCardItem.cdxEsclusoVannacci.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">FdI + FI + Lega + NM + ScN (Governo)</div>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700">
                  <div className="text-xs font-bold text-rose-300">CAMPO LARGO (CON ITALIA VIVA)</div>
                  <div className="text-3xl font-mono font-black text-rose-400 mt-1">
                    {previewCardItem.campoLargoConIV.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">PD + M5S + AVS + IV + +E + Civici (Premio 55%)</div>
                </div>
              </div>

              {/* Main Party Numbers */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-4 text-sm font-bold font-mono">
                <span className="text-white">FdI: {previewCardItem.results.fdi || 27.8}%</span>
                <span className="text-red-400">PD: {previewCardItem.results.pd || 20.3}%</span>
                <span className="text-amber-400">M5S: {previewCardItem.results.m5s || 12.0}%</span>
                <span className="text-slate-300">FN Vannacci: {previewCardItem.results.fn || 7.7}% (Autonomo)</span>
                <span className="text-sky-300">FI: {previewCardItem.results.fi || 7.5}%</span>
                <span className="text-emerald-400">Lega: {previewCardItem.results.lega || 5.7}%</span>
                <span className="text-green-300">AVS: {previewCardItem.results.avs || 6.5}%</span>
                <span className="text-yellow-400">Azione: {previewCardItem.results.azione || 3.4}%</span>
                <span className="text-pink-400">IV: {previewCardItem.results.iv || 2.4}%</span>
                <span className="text-cyan-400">PLD: {previewCardItem.results.pld || 1.4}%</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleDownloadCardImage(previewCardItem)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Scarica File Grafico (SVG)</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewCardItem(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold text-xs cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
