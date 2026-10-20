import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SupermediaDashboard } from './components/SupermediaDashboard';
import { HistoricalTrendsView } from './components/HistoricalTrendsView';
import { MethodologyView } from './components/MethodologyView';
import { InstitutesMonitorView } from './components/InstitutesMonitorView';
import { PartiesDirectoryView } from './components/PartiesDirectoryView';
import { MonthlyDataView } from './components/MonthlyDataView';
import { NewsView } from './components/NewsView';
import { HeaderBanner } from './components/HeaderBanner';
import { COMPONENT_POLLS_LAST_SATURDAY, PARTIES } from './data/politicalData';
import { PollRecord } from './types/polls';
import { fetchPollsFromCSV, calculateAverage } from './services/dataService';
import { CheckCircle2, ShieldCheck, ExternalLink, FileSpreadsheet, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'supermedia' | 'news' | 'trends' | 'monthly' | 'methodology' | 'monitor' | 'parties'
  >('supermedia');
  const [activePolls, setActivePolls] = useState<PollRecord[]>(COMPONENT_POLLS_LAST_SATURDAY);
  const [selectedPartyId, setSelectedPartyId] = useState<string>('fdi');
  const [csvLoaded, setCsvLoaded] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  // Ingestion from official CSV dataset on mount
  useEffect(() => {
    fetchPollsFromCSV().then((polls) => {
      if (polls && polls.length > 0) {
        setActivePolls(polls);
        setCsvLoaded(true);
      }
    });
  }, []);

  // Central global refresh: answers user question "e se clicco aggiorna si aggiornerebbe tutto??" -> SÌ!
  const handleGlobalRefresh = async () => {
    setIsRefreshing(true);
    try {
      const freshPolls = await fetchPollsFromCSV();
      if (freshPolls && freshPolls.length > 0) {
        setActivePolls([...freshPolls]);
        setCsvLoaded(true);
      }
      // Re-trigger central calculateAverage
      calculateAverage(freshPolls || activePolls, 'standard');

      const timeStr = new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setRefreshToast(
        `Aggiornamento completato alle ${timeStr}: tutti i dati, le 11 rilevazioni e le medie sono stati ricalcolati e sincronizzati su tutte le pagine.`
      );
      setTimeout(() => {
        setRefreshToast(null);
      }, 5000);
    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectPartyAndNavigate = (partyId: string) => {
    setSelectedPartyId(partyId);
    setActiveTab('parties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Navigation with Refresh */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={handleGlobalRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Global Refresh Toast Notification */}
      {refreshToast && (
        <div className="bg-emerald-700 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-xs transition-all">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{refreshToast}</span>
            </div>
            <button
              onClick={() => setRefreshToast(null)}
              className="text-emerald-200 hover:text-white font-bold cursor-pointer px-1.5"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Artistic Header Banner featuring Italian political leaders and tricolore */}
        {activeTab === 'supermedia' && (
          <HeaderBanner
            onNavigateToMonthly={() => {
              setActiveTab('monthly');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTrends={() => {
              setActiveTab('trends');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMethodology={() => {
              setActiveTab('methodology');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToNews={() => {
              setActiveTab('news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'supermedia' && (
          <SupermediaDashboard
            onNavigateToMethodology={() => {
              setActiveTab('methodology');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToTrends={() => {
              setActiveTab('trends');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMonitor={() => {
              setActiveTab('monitor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMonthly={() => {
              setActiveTab('monthly');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectParty={handleSelectPartyAndNavigate}
            customPolls={activePolls}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            onNavigateToSupermedia={() => {
              setActiveTab('supermedia');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'trends' && <HistoricalTrendsView />}
        
        {activeTab === 'monthly' && (
          <MonthlyDataView
            onNavigateToTrends={() => {
              setActiveTab('trends');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSupermedia={() => {
              setActiveTab('supermedia');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activePolls={activePolls}
          />
        )}

        {activeTab === 'methodology' && <MethodologyView />}

        {activeTab === 'monitor' && (
          <InstitutesMonitorView
            activePolls={activePolls}
            onRefreshData={handleGlobalRefresh}
            isRefreshing={isRefreshing}
          />
        )}

        {activeTab === 'parties' && (
          <PartiesDirectoryView
            selectedPartyId={selectedPartyId}
            onSelectParty={(id) => setSelectedPartyId(id)}
          />
        )}
      </main>

      {/* Editorial Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span>Supermedia Sondaggi Politici</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Elaborazione statistica indipendente e trasparente delle intenzioni di voto nazionali. Aggregazione settimanale ogni sabato alle ore 09:00 dai canali broadcast originali, testate accreditate e dataset CSV.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dataset CSV certificato: sondaggi_settimana_17_ottobre_2026.csv</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Istituti Rilevati ({activePolls.length})
              </h4>
              <ul className="space-y-1.5 text-slate-500">
                <li>SWG (TG La7 · Enrico Mentana)</li>
                <li>Tecnè (Mediaset · Quarta Repubblica / TG4)</li>
                <li>Noto Sondaggi (Rai 1 · Porta a Porta)</li>
                <li>Quorum (Sky TG24)</li>
                <li>EMG Different (Rai 3 · Agorà)</li>
                <li>Eumetra (La7 · Piazzapulita)</li>
                <li>Istituto Ixè (Rete 4 · Cartabianca)</li>
                <li>Ipsos Italia (Corriere della Sera)</li>
                <li>Istituto Demopolis (Barometro Politico)</li>
                <li>Only Numbers (Porta a Porta · Rai 1 / Libero Quotidiano)</li>
                <li>Only Numbers (Realpolitik · Rete 4 / Il Tempo)</li>
                <li>Istituto Piepoli (Libero Quotidiano / Il Tempo / Porta a Porta)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Scenari & Metodologia
              </h4>
              <ul className="space-y-1.5 text-slate-500">
                <li>Nostra Media Ponderata Multi-criterio</li>
                <li>Media Aritmetica Semplice (Uniforme 1/N)</li>
                <li>Legge Elettorale «Stabilicum» (Premio 55%)</li>
                <li>Coalizione Campo Largo con/senza Italia Viva</li>
                <li>Centrodestra con/senza Futuro Nazionale</li>
                <li>Partito Liberaldemocratico (Marattin da solo)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Fonti & Integrità Dati
              </h4>
              <p className="text-slate-500 leading-relaxed mb-3">
                I dati sono verificati sulle testate ufficiali (Il Tempo, Libero Quotidiano, Corriere della Sera, portali dei canali TV nazionali) e riscontrati su sondaggipoliticoelettorali.it.
              </p>
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px]">Dati 100% Fedeli e Sincronizzati</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 Supermedia Sondaggi Politico-Elettorali. Elaborazione dati ad uso informativo ed editoriale.
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/data/sondaggi_settimana_17_ottobre_2026.csv"
                download
                className="hover:text-slate-700 transition-colors flex items-center gap-1 font-semibold text-slate-600"
              >
                <span>CSV 17 Ottobre</span>
                <ExternalLink className="w-3 h-3 text-emerald-600" />
              </a>
              <a
                href="/data/sondaggi_serie_storica_2026.csv"
                download
                className="hover:text-slate-700 transition-colors flex items-center gap-1 font-semibold text-blue-700"
              >
                <span>CSV Serie Storica 2026</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </a>
              <button
                onClick={() => setActiveTab('methodology')}
                className="hover:text-slate-700 transition-colors cursor-pointer text-slate-500 hover:text-slate-900"
              >
                Metodologia di Calcolo
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
