import React from 'react';
import { Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'supermedia' | 'trends' | 'monthly' | 'methodology' | 'monitor' | 'parties';
  setActiveTab: (tab: 'supermedia' | 'trends' | 'monthly' | 'methodology' | 'monitor' | 'parties') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand Wordmark (Single Text Element) */}
        <button
          onClick={() => setActiveTab('supermedia')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-xs group-hover:bg-blue-900 transition-colors">
            SM
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
            Supermedia Sondaggi Politico Elettorali
          </span>
        </button>

        {/* Zone 2: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
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
            onClick={() => setActiveTab('monthly')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
              activeTab === 'monthly'
                ? 'text-slate-900 font-semibold border-slate-900'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Dati Mensili
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

        {/* Zone 3: Status Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sabato 17 Ottobre (09:00): 11 Sondaggi</span>
          </div>
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
          onClick={() => setActiveTab('monthly')}
          className={`whitespace-nowrap shrink-0 px-2 py-1 rounded-md ${
            activeTab === 'monthly' ? 'bg-slate-100 text-slate-900 font-bold' : ''
          }`}
        >
          Dati Mensili
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
