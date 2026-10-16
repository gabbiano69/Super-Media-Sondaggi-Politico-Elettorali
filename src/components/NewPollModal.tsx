import React, { useState } from 'react';
import { X, Plus, Calculator, AlertCircle, Check } from 'lucide-react';
import { PARTIES } from '../data/politicalData';
import { PollRecord, SurveyMethod } from '../types/polls';
import { PartyLogo } from './PartyLogo';

interface NewPollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPoll: (poll: PollRecord) => void;
}

export const NewPollModal: React.FC<NewPollModalProps> = ({ isOpen, onClose, onAddPoll }) => {
  if (!isOpen) return null;

  const [institute, setInstitute] = useState('SWG');
  const [client, setClient] = useState('TG La7 / Enrico Mentana');
  const [broadcastChannel, setBroadcastChannel] = useState('TG La7 ore 20:00');
  const [publishDate, setPublishDate] = useState('2026-09-12');
  const [sampleDate, setSampleDate] = useState('8-11 Settembre 2026');
  const [sampleSize, setSampleSize] = useState(1200);
  const [method, setMethod] = useState<SurveyMethod>('CATI-CAMI-CAWI');
  const [marginOfError, setMarginOfError] = useState(2.8);
  const [officialDelayDays, setOfficialDelayDays] = useState(3);

  // Initial party percentages based on current average
  const [partyResults, setPartyResults] = useState<Record<string, number>>({
    fdi: 27.1,
    pd: 20.9,
    m5s: 12.0,
    fn: 7.8,
    fi: 7.5,
    avs: 6.4,
    lega: 5.5,
    azione: 3.8,
    iv: 2.4,
    piueu: 1.4,
    scn: 1.1,
    nm: 1.0,
    altri: 3.1,
  });

  const handlePercentageChange = (partyId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setPartyResults((prev) => ({
      ...prev,
      [partyId]: num,
    }));
  };

  const totalSum = Object.values(partyResults).reduce((acc, curr) => acc + curr, 0);
  const isSumValid = Math.abs(totalSum - 100) < 1.0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPoll: PollRecord = {
      id: `poll-${Date.now()}`,
      institute,
      client,
      broadcastChannel,
      publishDate,
      sampleDate,
      sampleSize: Number(sampleSize),
      method,
      marginOfError: Number(marginOfError),
      officialDelayDays: Number(officialDelayDays),
      governmentPortalCode: `SP-2026/${publishDate.split('-')[1]}-${Math.floor(1000 + Math.random() * 9000)}`,
      results: partyResults,
      directSourceUrl: '#',
      notes: 'Inserimento manuale monitor sabato mattina.',
    };

    onAddPoll(newPoll);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Inserisci Rilevazione Sondaggio
            </h2>
            <p className="text-xs text-slate-500">
              Aggiungi un sondaggio rilevato nella finestra del sabato mattina per ricalcolare la Supermedia
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Istituto Demoscopico
              </label>
              <select
                value={institute}
                onChange={(e) => {
                  const inst = e.target.value;
                  setInstitute(inst);
                  if (inst === 'SWG') {
                    setClient('TG La7 / Enrico Mentana');
                    setBroadcastChannel('TG La7 ore 20:00');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'Eumetra') {
                    setClient('Piazzapulita / Corrado Formigli (La7)');
                    setBroadcastChannel('La7 (Piazzapulita)');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'Istituto Ixè') {
                    setClient('È sempre Cartabianca / Bianca Berlinguer (Rete 4)');
                    setBroadcastChannel('Rete 4 (È sempre Cartabianca)');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'Istituto Demopolis') {
                    setClient('Barometro Politico Demopolis / Pietro Vento');
                    setBroadcastChannel('Rai News 24 / Portale Demopolis');
                    setMethod('CATI-CAWI');
                  } else if (inst === 'Tecnè') {
                    setClient('Mediaset / Quarta Repubblica');
                    setBroadcastChannel('Rete 4');
                    setMethod('CATI-CAWI');
                  } else if (inst === 'Quorum') {
                    setClient('Sky TG24');
                    setBroadcastChannel('Sky TG24 ore 19:30');
                    setMethod('CAWI');
                  } else if (inst === 'Noto Sondaggi') {
                    setClient('Rai 1 / Porta a Porta');
                    setBroadcastChannel('Rai 1 (Porta a Porta)');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'EMG Different') {
                    setClient('Rai 3 / Agorà');
                    setBroadcastChannel('Rai 3 (Agorà)');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'Ipsos') {
                    setClient('Corriere della Sera');
                    setBroadcastChannel('Corriere della Sera (Sabato)');
                    setMethod('CATI-CAMI-CAWI');
                  } else if (inst === 'Index Research') {
                    setClient('Piazzapulita / Partner Stampa');
                    setBroadcastChannel('La7 / Quotidiani');
                    setMethod('CATI-CAMI-CAWI');
                  }
                }}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="SWG">SWG (TG La7 - Mentana)</option>
                <option value="Eumetra">Eumetra (Piazzapulita - Formigli)</option>
                <option value="Istituto Ixè">Istituto Ixè (È sempre Cartabianca - Berlinguer)</option>
                <option value="Istituto Demopolis">Istituto Demopolis (Barometro Politico - Vento)</option>
                <option value="Tecnè">Tecnè (Quarta Repubblica / TGcom24)</option>
                <option value="Quorum">Quorum (Sky TG24)</option>
                <option value="Noto Sondaggi">Noto Sondaggi (Porta a Porta - Vespa)</option>
                <option value="EMG Different">EMG Different (Agorà - Inciocchi)</option>
                <option value="Ipsos">Ipsos Italia (Corriere della Sera)</option>
                <option value="Index Research">Index Research (La7 / Talk)</option>
                <option value="Only Numbers">Only Numbers (Digital Media)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Data di Pubblicazione Broadcast
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Canale / Trasmissione Diretta
              </label>
              <input
                type="text"
                value={broadcastChannel}
                onChange={(e) => setBroadcastChannel(e.target.value)}
                placeholder="es. TG La7 ore 20:00"
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Campione Interviste (N)
              </label>
              <input
                type="number"
                min="400"
                max="5000"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Metodologia di Raccolta
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as SurveyMethod)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="CATI-CAMI-CAWI">CATI-CAMI-CAWI (Misto triplo, peso max)</option>
                <option value="CATI-CAWI">CATI-CAWI (Doppio canale)</option>
                <option value="CAWI">CAWI (Panel web)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Margine d'Errore Dichiarato (±%)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="5.0"
                value={marginOfError}
                onChange={(e) => setMarginOfError(Number(e.target.value))}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                required
              />
            </div>
          </div>

          {/* Party percentage inputs grid */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Intenzioni di Voto dei Partiti (%)
              </label>
              <div
                className={`text-xs font-mono font-bold ${
                  isSumValid ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                Totale: {totalSum.toFixed(1)}% {isSumValid ? '✓' : '(consigliato ~100%)'}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.keys(PARTIES).map((partyId) => {
                const party = PARTIES[partyId];
                return (
                  <div
                    key={partyId}
                    className="flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50/50"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <PartyLogo partyId={partyId} size="sm" />
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {party.shortName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={partyResults[partyId] ?? 0}
                        onChange={(e) => handlePercentageChange(partyId, e.target.value)}
                        className="w-16 text-right text-xs font-mono font-bold border border-slate-200 rounded px-1.5 py-1 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <span className="text-xs text-slate-400">%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Aggiungi e Ricalcola Supermedia</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
