import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  Layers,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Sliders,
  Tv,
} from 'lucide-react';
import { calculatePollWeights, DEFAULT_WEIGHT_PARAMS } from '../utils/weightCalculator';
import { COMPONENT_POLLS_LAST_SATURDAY } from '../data/politicalData';

export const MethodologyView: React.FC = () => {
  // Interactive weighting playground states
  const [testSampleSize, setTestSampleSize] = useState<number>(1200);
  const [testDaysAgo, setTestDaysAgo] = useState<number>(3);
  const [testMethod, setTestMethod] = useState<'CATI-CAMI-CAWI' | 'CAWI' | 'CATI-CAWI'>('CATI-CAMI-CAWI');

  // Calculate live test weight
  const sampleRatio = testSampleSize / 1000;
  const sampleWeight = Math.min(1.35, Math.max(0.75, Math.sqrt(sampleRatio)));
  const recencyWeight = Math.exp(-0.045 * testDaysAgo);
  const methodWeight =
    testMethod === 'CATI-CAMI-CAWI' ? 1.08 : testMethod === 'CATI-CAWI' ? 1.0 : 0.94;
  const combinedRawWeight = sampleWeight * recencyWeight * methodWeight;

  // Real weights calculated for the actual polls in the last Saturday window
  const calculatedWeights = calculatePollWeights(COMPONENT_POLLS_LAST_SATURDAY);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          La Nostra Metodologia di Calcolo & Protocollo Sabato Mattina
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
          Come costruiamo la nostra media ponderata indipendente aggregando direttamente tutte le fonti primarie dei
          sondaggi a sabato scorso, l'algoritmo di ponderazione statistica e la gestione del disallineamento temporale
          rispetto al portale governativo.
        </p>
      </div>

      {/* The Core Formula Section */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">La Formula di Ponderazione</h2>
            <p className="text-xs text-slate-500">
              Media ponderata multi-criterio per attenuare le oscillazioni campionarie
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            A differenza di una semplice media aritmetica che tratterebbe ogni sondaggio allo stesso modo, la
            <strong> Supermedia</strong> assegna a ciascuna rilevazione un peso specifico <em>W<sub>i</sub></em> derivante dalla
            combinazione di tre fattori metodologici oggettivi:
          </p>

          {/* Math Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-center my-4 overflow-x-auto text-xs sm:text-sm">
            <div className="text-slate-400 text-xs mb-1">Formula del peso del sondaggio i:</div>
            <div className="text-emerald-400 font-bold text-base sm:text-lg">
              W<sub>i</sub> = w<sub>campione</sub> × w<sub>tempo</sub> × w<sub>metodo</sub>
            </div>
            <div className="text-slate-300 text-xs mt-2">
              Media Ponderata Partito = ∑ (W̄<sub>i</sub> · Percentuale<sub>i</sub>)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Consistenza Campionaria (w<sub>campione</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Riconosce maggior robustezza ai campioni più ampi. La funzione concava √(N / 1.000) premia le
                rilevazioni con 1.200 o 1.500 interviste, applicando un floor protettivo a 800 casi e un cap a 1.500
                per evitare che un singolo megacampione schiacci le altre rilevazioni.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Freschezza Temporale (w<sub>tempo</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                La vicinanza al momento del calcolo è cruciale. Si applica un fattore di decadimento esponenziale
                exp(-λ · Δt), dove Δt sono i giorni trascorsi dalla rilevazione. I sondaggi della settimana corrente
                pesano significativamente più di quelli di 10-14 giorni prima.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/70">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Metodo di Raccolta (w<sub>metodo</sub>)
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ponderazione per tecnica d'indagine: il modello premia con un moltiplicatore × 1,08 le
                rilevazioni miste probabilistiche (CATI su fissi, CAMI su cellulari e CAWI web), rispetto ai panel
                esclusivamente online (CAWI, × 0,94), che richiedono maggiore ricalibrazione socio-demografica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Crucial Insight: Broadcast vs sondaggipoliticoelettorali.it */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Il Disallineamento: Perché le Fonti TV e Broadcast Anticipano il Sito Governativo
            </h2>
            <p className="text-xs text-slate-500">
              La prassi del sistema politico-editoriale italiano e la legge 28/2000
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            Il sito istituzionale della Presidenza del Consiglio dei Ministri (
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 text-xs">
              sondaggipoliticoelettorali.it
            </code>
            ) è il registro legale pubblico in cui gli istituti demoscopici sono obbligati a depositare la scheda
            metodologica completa per la legge sulla <em>Par Condicio</em>.
          </p>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-amber-900 text-xs sm:text-sm">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Il problema operativo: il ritardo di pubblicazione sul portale ufficiale</span>
            </div>
            <p className="mt-1.5 leading-relaxed text-amber-850">
              Sebbene la legge preveda la contestualità, nella prassi consolidata esiste un{' '}
              <strong>ritardo fisiologico di 48 – 96 ore</strong>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>
                <strong>Lunedì sera ore 20:25:</strong> Enrico Mentana manda in onda in anteprima esclusiva i dati SWG
                sul TG La7.
              </li>
              <li>
                <strong>Mercoledì/Giovedì sera:</strong> Nicola Porro a Quarta Repubblica o Mario Giordano trasmettono
                i dati Tecnè su Rete 4.
              </li>
              <li>
                <strong>Venerdì mattina / Sabato mattina:</strong> La scheda tecnica approda finalmente sul sito governativo
                dopo la validazione dell'Agcom.
              </li>
            </ul>
          </div>

          <h3 className="text-sm font-bold text-slate-900 pt-2">
            La Nostra Soluzione: Il Ciclo del Sabato Mattina (da Sabato a Sabato)
          </h3>
          <p>
            Per garantire che la Supermedia sia sempre aggiornata con i dati più recenti ed evitare di lavorare su
            fotografie vecchie di una settimana:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 pl-1">
            <li>
              <strong>Rilevazione diretta ogni sabato mattina alle ore 09:00:</strong> la finestra di cattura
              comprende tutti i sondaggi realizzati o diffusi dal <em>sabato precedente alle ore 00:00 al sabato
              mattina corrente alle ore 09:00</em>.
            </li>
            <li>
              <strong>Intercettazione delle fonti primarie autorizzate:</strong> i dati vengono acquisiti
              immediatamente dalle emissioni televisive ufficiali e dai canali certificati degli istituti (SWG su La7,
              Tecnè su Mediaset, Quorum su Sky TG24, Ixè su Rete 4, Noto su Porta a Porta), senza attendere passivamente il
              deposito su <em>sondaggipoliticoelettorali.it</em>.
            </li>
            <li>
              <strong>Riconciliazione retroattiva:</strong> non appena il portale governativo pubblica la scheda
              completa con il codice identificativo ufficiale (es.{' '}
              <code className="text-[11px] bg-slate-100 px-1 py-0.5 rounded text-slate-700">SP-2026/09-0802</code>
              ), la rilevazione viene marcata come "Depositata e Certificata", verificando la rispondenza dei decimali
              e dei metadati campionari.
            </li>
          </ol>
        </div>
      </section>

      {/* Interactive Weighting Playground */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Simulatore Interattivo del Peso di un Sondaggio</h2>
            <p className="text-xs text-slate-500">
              Modifica i parametri per verificare in tempo reale l'impatto sul moltiplicatore di ponderazione
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Controls */}
          <div className="space-y-4 md:col-span-2">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Campione di interviste (N):</span>
                <span className="font-mono tabular-nums text-slate-900">{testSampleSize} casi</span>
              </div>
              <input
                type="range"
                min="500"
                max="2500"
                step="50"
                value={testSampleSize}
                onChange={(e) => setTestSampleSize(Number(e.target.value))}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>500 (basso)</span>
                <span>1.000 (standard)</span>
                <span>2.500 (molto alto)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Giorni trascorsi dalla pubblicazione:</span>
                <span className="font-mono tabular-nums text-slate-900">{testDaysAgo} giorni fa</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="1"
                value={testDaysAgo}
                onChange={(e) => setTestDaysAgo(Number(e.target.value))}
                className="w-full mt-2 accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Oggi (0 gg, peso max)</span>
                <span>7 giorni fa</span>
                <span>14 giorni fa (decadimento)</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">Metodologia di campionamento:</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'CATI-CAMI-CAWI', label: 'CATI-CAMI-CAWI', desc: 'Misto probabilistico (×1,08)' },
                  { id: 'CATI-CAWI', label: 'CATI-CAWI', desc: 'Doppio canale (×1,00)' },
                  { id: 'CAWI', label: 'Solo CAWI', desc: 'Panel web (×0,94)' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setTestMethod(m.id as any)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      testMethod === m.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold">{m.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-950 text-white rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Fattore di Peso Totale</div>
              <div className="mt-2 text-3xl font-extrabold font-mono text-emerald-400 tabular-nums">
                {combinedRawWeight.toFixed(3)}
              </div>
              <div className="text-xs text-slate-400 mt-1">Valore ponderale normalizzato</div>
            </div>

            <div className="divide-y divide-slate-800 text-xs py-3 space-y-2">
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Campione (w<sub>s</sub>):</span>
                <span className="font-mono text-slate-200">{sampleWeight.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Tempo (w<sub>t</sub>):</span>
                <span className="font-mono text-slate-200">{recencyWeight.toFixed(3)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Peso Metodo (w<sub>m</sub>):</span>
                <span className="font-mono text-slate-200">{methodWeight.toFixed(3)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              Un sondaggio fresco con 1.500 casi e metodo misto pesa circa il 60% in più di un sondaggio di 10 giorni
              prima su 800 casi solo web.
            </div>
          </div>
        </div>
      </section>

      {/* Actual weights in the last Saturday Supermedia */}
      <section className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 md:p-8">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Pesi Percentuali Effettivi nella Nostra Rilevazione di Sabato Scorso
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 mb-4">
          Distribuzione percentuale dei pesi calcolata sui sondaggi inclusi nella nostra media settimanale
        </p>

        <div className="space-y-3">
          {calculatedWeights.map((cw) => (
            <div key={cw.pollId} className="flex items-center gap-3 text-xs">
              <div className="w-28 font-semibold text-slate-800 truncate">{cw.institute}</div>
              <div className="w-20 text-slate-500 font-mono tabular-nums">{cw.publishDate}</div>
              <div className="w-20 text-slate-600 font-mono tabular-nums">{cw.sampleSize} casi</div>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-slate-900 h-full rounded-full transition-all"
                  style={{ width: `${cw.normalizedPercentageWeight * 3.5}%` }}
                />
              </div>
              <div className="w-16 text-right font-mono font-bold text-slate-900 tabular-nums">
                {cw.normalizedPercentageWeight}%
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
