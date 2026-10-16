import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SupermediaDashboard } from './components/SupermediaDashboard';
import { HistoricalTrendsView } from './components/HistoricalTrendsView';
import { MethodologyView } from './components/MethodologyView';
import { InstitutesMonitorView } from './components/InstitutesMonitorView';
import { PartiesDirectoryView } from './components/PartiesDirectoryView';
import { NewPollModal } from './components/NewPollModal';
import { COMPONENT_POLLS_LAST_SATURDAY, PARTIES, LATEST_SUPERMEDIA } from './data/politicalData';
import { PollRecord } from './types/polls';
import { computeWeightedSupermedia } from './utils/weightCalculator';
import { CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'supermedia' | 'trends' | 'methodology' | 'monitor' | 'parties'
  >('supermedia');
  const [isNewPollModalOpen, setIsNewPollModalOpen] = useState(false);
  const [activePolls, setActivePolls] = useState<PollRecord[]>(COMPONENT_POLLS_LAST_SATURDAY);
  const [selectedPartyId, setSelectedPartyId] = useState<string>('fdi');
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddPoll = (newPoll: PollRecord) => {
    const updated = [newPoll, ...activePolls];
    setActivePolls(updated);

    // Provide user feedback
    setNotification(
      `Sondaggio ${newPoll.institute} (${newPoll.publishDate}) inserito. Supermedia ricalcolata!`
    );
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleSelectPartyAndNavigate = (partyId: string) => {
    setSelectedPartyId(partyId);
    setActiveTab('parties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewPollModal={() => setIsNewPollModalOpen(true)}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            onSelectParty={handleSelectPartyAndNavigate}
            customPolls={activePolls}
          />
        )}

        {activeTab === 'trends' && <HistoricalTrendsView />}

        {activeTab === 'methodology' && <MethodologyView />}

        {activeTab === 'monitor' && (
          <InstitutesMonitorView
            onOpenNewPollModal={() => setIsNewPollModalOpen(true)}
            activePolls={activePolls}
          />
        )}

        {activeTab === 'parties' && (
          <PartiesDirectoryView
            selectedPartyId={selectedPartyId}
            onSelectParty={(id) => setSelectedPartyId(id)}
          />
        )}
      </main>

      {/* Modal for adding a poll */}
      <NewPollModal
        isOpen={isNewPollModalOpen}
        onClose={() => setIsNewPollModalOpen(false)}
        onAddPoll={handleAddPoll}
      />

      {/* Editorial Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span>Supermedia Sondaggi Politici</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Elaborazione statistica indipendente e media ponderata dei sondaggi sulle intenzioni di voto condotti
                dagli istituti demoscopici nazionali italiani.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-slate-900">Sezioni della Piattaforma</div>
              <div>
                <button
                  onClick={() => setActiveTab('supermedia')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Supermedia & Coalizioni
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('trends')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Serie Storiche & Seggi
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('methodology')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Formula di Ponderazione
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('monitor')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Monitor Sabato Mattina
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('parties')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  Partiti & Simboli Elettorali
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-slate-900">Fonti Talk Show & Istituti Monitorati</div>
              <div>SWG (TG La7 - Enrico Mentana)</div>
              <div>Eumetra / Index (Piazzapulita - Corrado Formigli)</div>
              <div>Istituto Ixè (È sempre Cartabianca - Bianca Berlinguer)</div>
              <div>Tecnè (Mediaset - Quarta Repubblica)</div>
              <div>Noto Sondaggi (Porta a Porta - Bruno Vespa)</div>
              <div>Quorum (Sky TG24) · EMG (Rai 3 Agorà)</div>
              <div>Istituto Demopolis (Barometro Politico)</div>
              <div>Ipsos Italia (Corriere della Sera)</div>
              <div>Only Numbers · BiDiMedia Network</div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-slate-900">Trasparenza Istituzionale</div>
              <p className="text-slate-500 leading-relaxed">
                Tutte le schede metodologiche complete sono consultabili sul portale governativo ufficiale:{' '}
                <a
                  href="https://www.sondaggipoliticoelettorali.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>sondaggipoliticoelettorali.it</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <div className="text-[11px] text-slate-400">
                In ottemperanza alla Legge 22 febbraio 2000, n. 28 e delibere Agcom.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div>© 2026 Supermedia Sondaggi Politici Italiani · Tutti i diritti riservati</div>
            <div className="flex items-center gap-3">
              <span>Aggiornamento settimanale del sabato</span>
              <span aria-hidden="true">·</span>
              <span>Dati conformi Agcom</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
