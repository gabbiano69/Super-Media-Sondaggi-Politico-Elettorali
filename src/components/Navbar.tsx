import React from 'react';
import { PlusCircle, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'supermedia' | 'trends' | 'methodology' | 'monitor' | 'parties';
  setActiveTab: (tab: 'supermedia' | 'trends' | 'methodology' | 'monitor' | 'parties') => void;
  onOpenNewPollModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenNewPollModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <button
          onClick={() => setActiveTab('supermedia')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:bg-blue-900 transition-colors">
            SM
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            Supermedia Sondaggi
          </span>
        </button>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('supermedia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'supermedia'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Supermedia
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'trends'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Serie Storica
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'methodology'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Metodologia
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'monitor'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Monitor Sabato
          </button>
          <button
            onClick={() => setActiveTab('parties')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'parties'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Partiti & Simboli
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sabato 17 Ottobre (09:00): Aggiornato</span>
          </div>
          <button
            onClick={onOpenNewPollModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Nuovo Sondaggio</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer / scrollable tabs for small screens */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-100 px-4 py-2 gap-3 text-xs font-medium text-slate-600 no-scrollbar">
        <button
          onClick={() => setActiveTab('supermedia')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'supermedia' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Supermedia
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'trends' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Serie Storica
        </button>
        <button
          onClick={() => setActiveTab('methodology')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'methodology' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Metodologia
        </button>
        <button
          onClick={() => setActiveTab('monitor')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'monitor' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Monitor Sabato
        </button>
        <button
          onClick={() => setActiveTab('parties')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'parties' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Partiti & Simboli
        </button>
      </div>
    </header>
  );
};
