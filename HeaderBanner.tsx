import React from 'react';
import { Calendar, Award, TrendingUp, ChevronRight, ShieldCheck, Flag } from 'lucide-react';
import leadersBannerImg from '../assets/images/italian_leaders_banner_1792226607082.jpg';

interface HeaderBannerProps {
  onNavigateToMonthly?: () => void;
  onNavigateToTrends?: () => void;
  onNavigateToMethodology?: () => void;
  onNavigateToNews?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onNavigateToMonthly,
  onNavigateToTrends,
  onNavigateToMethodology,
  onNavigateToNews,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-md bg-slate-950 text-white mb-8">
      {/* Italian Tricolore Top Accent Stripe */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#009246]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#ce2b37]" />
      </div>

      <div className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex items-center">
        {/* Generated Image Background with Cinematic Treatment */}
        <div className="absolute inset-0 z-0">
          <img
            src={leadersBannerImg}
            alt="I leader dei partiti politici italiani e il dibattito democratico"
            className="w-full h-full object-cover object-center scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layer gradient overlays for text readability & broadcast atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />
        </div>

        {/* Content Overlays */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-2xl space-y-3.5">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Rilevazione Sabato ore 09:00
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Legge dello Stato: Stabilicum (Premio 55%)
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Supermedia Sondaggi <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-white to-rose-400 bg-clip-text text-transparent">
              Politico Elettorali
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Il barometro indipendente del consenso parlamentare in Italia: aggregazione scientifica multi-fonte,
            serie storiche e proiezione dei seggi secondo la legge elettorale in vigore.
          </p>

          {/* Quick Metrics & Actions Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            {onNavigateToNews && (
              <button
                onClick={onNavigateToNews}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Newsroom Sondaggi (2 / ora)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {onNavigateToMonthly && (
              <button
                onClick={onNavigateToMonthly}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Dati Mensili</span>
              </button>
            )}

            {onNavigateToTrends && (
              <button
                onClick={onNavigateToTrends}
                className="px-3.5 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold transition-all border border-white/20 backdrop-blur-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Simulatore Seggi Stabilicum</span>
              </button>
            )}

            {onNavigateToMethodology && (
              <button
                onClick={onNavigateToMethodology}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer text-xs underline-offset-4 hover:underline"
              >
                Metodologia di Calcolo
              </button>
            )}
          </div>
        </div>

        {/* Floating Right Pillar (visible on large screens) */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col gap-2.5 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700/60 shadow-lg text-xs w-68">
          <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-700/60 pb-1.5 flex items-center justify-between">
            <span>Quadro Coalizioni</span>
            <span className="text-emerald-400">Sabato 17 Ott</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium text-[11.5px]">Centrodestra (Escludi Vannacci):</span>
              <span className="font-mono font-bold text-blue-400 text-sm">43,2%</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Futuro Nazionale (Vannacci autonomo):</span>
              <span className="font-mono font-semibold text-slate-200">7,7%</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-800">
              <span className="text-slate-300 font-medium text-[11.5px]">Campo Largo (con IV):</span>
              <span className="font-mono font-bold text-rose-400 text-sm">44,5%</span>
            </div>
            <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-800">
              <span className="text-slate-400">PLD (Marattin da solo):</span>
              <span className="font-mono font-semibold text-amber-300">1,4%</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Non si esprime:</span>
              <span className="font-mono font-semibold text-slate-300">41,3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
