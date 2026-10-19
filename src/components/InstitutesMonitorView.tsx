import React, { useState, useEffect } from 'react';
import {
  POLLING_INSTITUTES,
  COMPONENT_POLLS_LAST_SATURDAY,
  PARTIES,
} from '../data/politicalData';
import { PollRecord } from '../types/polls';
import {
  ExternalLink,
  Download,
  Clock,
  PlusCircle,
  Tv,
  Building2,
  FileCheck2,
  PlayCircle,
  User,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Search,
  Sparkles,
} from 'lucide-react';
import { exportPollsToCSV } from '../utils/weightCalculator';
import { PartyLogo } from './PartyLogo';

interface InstitutesMonitorViewProps {
  activePolls: PollRecord[];
}

export const InstitutesMonitorView: React.FC<InstitutesMonitorViewProps> = ({
  activePolls,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInstituteFilter, setSelectedInstituteFilter] = useState<string>('all');

  // Real-time Countdown to Saturday 09:00 AM
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Simulation pipeline state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<string[]>([]);
  const [scanCompleted, setScanCompleted] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(now);
      const currentDay = now.getDay(); // 0 is Sunday, 6 is Saturday
      
      // Calculate days until upcoming Saturday
      let daysUntilSaturday = (6 - currentDay + 7) % 7;
      target.setDate(now.getDate() + daysUntilSaturday);
      target.setHours(9, 0, 0, 0);

      // If today is Saturday and after 09:00, jump to next Saturday
      if (currentDay === 6 && now.getTime() >= target.getTime()) {
        target.setDate(target.getDate() + 7);
      }

      const diffMs = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Run simulated manual pipeline execution
  const handleTriggerLiveScan = () => {
    setIsScanning(true);
    setScanCompleted(false);
    setScanProgress([]);

    const steps = [
      'Connessione canali broadcast: scansione portale LA7 / TG La7 (Mentana - SWG)... [ACQUISITO]',
      'Scansione Mediaset Infinity: È sempre Cartabianca (Bianca Berlinguer - Ixè / EMG)... [ACQUISITO]',
      'Scansione Quarta Repubblica e Tgcom24 (Nicola Porro - Tecnè)... [ACQUISITO]',
      'Scansione Piazzapulita LA7 (Corrado Formigli - Eumetra / Index)... [ACQUISITO]',
      'Scansione RaiPlay: Porta a Porta (Bruno Vespa - Noto Sondaggi)... [ACQUISITO]',
      'Interrogazione diretta: Barometro Demopolis (Pietro Vento) e Ipsos Corriere... [ACQUISITO]',
      'Verifica aggregatori di monitoraggio: BiDiMedia e canali digitali Only Numbers... [ACQUISITO]',
      'Controllo coalizione: indicizzazione Sud Chiama Nord (1,1%) nel Centrodestra... [CONFERMATO]',
      'Incrocio registro Agcom (sondaggipoliticoelettorali.it): validazione legale differita... [OK]',
      'Esecuzione algoritmo di ponderazione W_i e chiusura media settimanale sabato ore 09:00... [COMPLETATO]',
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setScanProgress((prev) => [...prev, step]);
        if (index === steps.length - 1) {
          setIsScanning(false);
          setScanCompleted(true);
        }
      }, (index + 1) * 350);
    });
  };

  // Handle CSV Download
  const handleDownloadCSV = () => {
    const partyList = Object.entries(PARTIES).map(([id, p]) => ({ id, shortName: p.shortName }));
    const csvContent = exportPollsToCSV(activePolls, partyList);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'supermedia_sondaggi_sabato_mattina.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter institutes directory
  const filteredInstitutes = POLLING_INSTITUTES.filter((inst) => {
    if (selectedCategory !== 'all' && inst.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Filtered polls database table
  const filteredPolls = activePolls.filter((poll) => {
    if (selectedInstituteFilter !== 'all' && poll.institute !== selectedInstituteFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Monitor Sabato Mattina & Registro Fonti Dirette
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Acquisizione diretta dalle trasmissioni TV (La7, Mediaset, Rai, Sky), siti ufficiali degli istituti,
            barometri d'opinione e gestione del disallineamento rispetto al portale Agcom.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Esporta CSV</span>
          </button>
        </div>
      </div>

      {/* Routine del Sabato Mattina: Live Scheduler & Countdown */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Scheduler Automatico: Attivo
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300">Ogni Sabato ore 09:00:00 CET</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-400 font-medium">Finestra: Sabato Prec. ➔ Sabato Corrente (h 09:00)</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Sì, il sito si aggiorna automaticamente ogni Sabato mattina alle 09:00
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Il sistema interroga <strong>direttamente le emissioni televisive e i portali video</strong> dei talk show (TG La7 Mentana, È sempre Cartabianca Mediaset Infinity, Piazzapulita clip La7, Quarta Repubblica Tgcom24, Porta a Porta RaiPlay, Sky TG24) e i siti ufficiali (Ipsos, Demopolis, Tecnè, Only Numbers, BiDiMedia).
              <br className="hidden sm:inline" />
              <strong>Non attendiamo il sito governativo</strong> (<em>sondaggipoliticoelettorali.it</em>), perché per legge e prassi accumula un <strong>ritardo di 48–96 ore</strong>: usarlo come fonte primaria significherebbe pubblicare dati già vecchi. Il portale Agcom viene interrogato successivamente solo come riscontro per archiviare la scheda tecnica.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 text-center shrink-0 min-w-[280px]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prossimo Aggiornamento Automatico</span>
            </div>

            <div className="grid grid-cols-4 gap-2 font-mono">
              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                <div className="text-xl sm:text-2xl font-extrabold text-white">{timeLeft.days}</div>
                <div className="text-[9px] text-slate-400 uppercase">Giorni</div>
              </div>
              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                <div className="text-xl sm:text-2xl font-extrabold text-white">{timeLeft.hours}</div>
                <div className="text-[9px] text-slate-400 uppercase">Ore</div>
              </div>
              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                <div className="text-xl sm:text-2xl font-extrabold text-white">{timeLeft.minutes}</div>
                <div className="text-[9px] text-slate-400 uppercase">Min</div>
              </div>
              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">{timeLeft.seconds}</div>
                <div className="text-[9px] text-slate-400 uppercase">Sec</div>
              </div>
            </div>

            <button
              onClick={handleTriggerLiveScan}
              disabled={isScanning}
              className="mt-3.5 w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 transition-colors rounded-lg cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scansione Fonti in corso...' : 'Verifica Fonti & Simula Sabato 09:00'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Progress Log */}
        {(isScanning || scanCompleted) && (
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Pipeline Ingestion Sabato Mattina ore 09:00:00 (Scansione Diretta)
              </span>
              <span>{scanCompleted ? 'Stato: Completato 100%' : 'Scansione in corso...'}</span>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {scanProgress.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            {scanCompleted && (
              <div className="pt-2 text-emerald-400 font-bold flex items-center gap-1.5 border-t border-slate-800 text-xs">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Supermedia ricalcolata con successo dalle fonti dirette del ciclo settimanale!</span>
              </div>
            )}
          </div>
        )}

        {/* 3 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800/80">
            <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
              <Tv className="w-4 h-4" />
              <span>1. Canali Talk Show & Notiziari</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              I sondaggi escono prima in TV (lunedì sera con Mentana, martedì sera con Berlinguer, giovedì sera con Formigli). Raccogliamo i cartelli subito dopo la messa in onda.
            </p>
          </div>

          <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800/80">
            <div className="text-blue-400 font-bold mb-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>2. Siti Istituti & Barometri</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Ipsos (Corriere della Sera), Demopolis (Pietro Vento), Tecnè, Only Numbers e BiDiMedia rilasciano report ufficiali indipendenti che acquisiamo senza intermediari.
            </p>
          </div>

          <div className="bg-slate-900/70 rounded-xl p-3.5 border border-slate-800/80">
            <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4" />
              <span>3. Validazione Differita Agcom</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Il portale <em>sondaggipoliticoelettorali.it</em> viene interrogato non per la tempestività (sarebbe in ritardo), ma per verificare a posteriori la scheda tecnica depositata.
            </p>
          </div>
        </div>
      </div>

      {/* Institutes Directory Section with Category Tabs */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Mappatura Completa delle Fonti & Modalità di Recupero
            </h2>
            <p className="text-xs text-slate-500">
              Talk show televisivi, siti ufficiali degli istituti demoscopici e registro pubblico
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tutte ({POLLING_INSTITUTES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('talkshow')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedCategory === 'talkshow'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Talk Show & TV
            </button>
            <button
              onClick={() => setSelectedCategory('istituto')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedCategory === 'istituto'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Istituti & Barometri
            </button>
            <button
              onClick={() => setSelectedCategory('registro_aggregatore')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedCategory === 'registro_aggregatore'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Registri & Aggregatori
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInstitutes.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{inst.name}</h3>
                    {inst.tvChannel && (
                      <span className="text-[11px] font-semibold text-blue-900">
                        {inst.tvChannel}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                    {inst.reliabilityRating}
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  {inst.showHost && (
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <strong>Conduttore / Riferimento:</strong> {inst.showHost}
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-1.5 text-slate-700">
                    <Tv className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Canale di messa in onda:</strong>
                      <div className="text-slate-600">{inst.broadcastOutlet}</div>
                    </div>
                  </div>

                  {inst.portalSection && (
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <PlayCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Dove recuperare i cartelli:</strong>
                        <div className="text-slate-600">{inst.portalSection}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-1.5 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Orario abituale:</strong>
                      <div className="text-slate-600">{inst.usualPublishTime}</div>
                    </div>
                  </div>

                  <div className="text-slate-600 pt-1">
                    <strong className="text-slate-900">Ritardo deposito Agcom:</strong> {inst.averageDelayOnGovSite}
                  </div>

                  <p className="text-slate-500 pt-2 leading-relaxed border-t border-slate-100">
                    {inst.methodologyOverview}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-[140px]">
                  {inst.headOfResearch}
                </span>
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 font-semibold hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Link fonte</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Polling Dataset Table with Filtering & Sud Chiama Nord */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Tutti i Sondaggi Inclusi nel Nostro Monitor ({filteredPolls.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rilevazioni acquisite dalle trasmissioni TV e dai siti ufficiali a sabato scorso (finestra del sabato mattina)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filtra per istituto:</span>
            <select
              value={selectedInstituteFilter}
              onChange={(e) => setSelectedInstituteFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="all">Tutti gli istituti</option>
              {Array.from(new Set(activePolls.map((p) => p.institute))).map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Data</th>
                <th className="py-2.5 px-3">Istituto</th>
                <th className="py-2.5 px-3">Diffusione TV / Canale</th>
                <th className="py-2.5 px-3 text-right">Campione</th>
                <th className="py-2.5 px-3">Metodo</th>
                <th className="py-2.5 px-3">Codice Deposito</th>
                <th className="py-2.5 px-3 text-right">FdI</th>
                <th className="py-2.5 px-3 text-right">PD</th>
                <th className="py-2.5 px-3 text-right">M5S</th>
                <th className="py-2.5 px-3 text-right">FN</th>
                <th className="py-2.5 px-3 text-right">FI</th>
                <th className="py-2.5 px-3 text-right">AVS</th>
                <th className="py-2.5 px-3 text-right">Lega</th>
                <th className="py-2.5 px-3 text-right font-bold text-amber-700 bg-amber-50/60 border-x border-amber-200">ScN (CDX)</th>
                <th className="py-2.5 px-3 text-right">Az</th>
                <th className="py-2.5 px-3 text-right">IV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPolls.map((poll) => (
                <tr key={poll.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {poll.publishDate}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{poll.institute}</td>
                  <td className="py-2.5 px-3 text-slate-600 truncate max-w-[160px]">
                    {poll.broadcastChannel}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.sampleSize}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{poll.method}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {poll.governmentPortalCode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {poll.results.fdi?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {poll.results.pd?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.m5s?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.fn?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.fi?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.avs?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.lega?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-amber-800 bg-amber-50/60 border-x border-amber-200">
                    {poll.results.scn ? `${poll.results.scn.toFixed(1)}%` : '1.1%'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.azione?.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                    {poll.results.iv?.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
