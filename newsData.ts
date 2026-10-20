import { PollNewsItem } from '../types/polls';

export const POLLS_NEWS_FEED: PollNewsItem[] = [
  // ==========================================
  // 08:00 - APERTURA EDICOLE & RASSEGNA STAMPA
  // ==========================================
  {
    id: 'news-0800-piepoli',
    title: 'Sondaggio Istituto Piepoli (Libero Quotidiano & Il Tempo): FdI al 27,8%, M5S al 12,0%, ScN all’1,1%',
    subtitle: 'Rilevazione a firma di Livio Gigliuto e Nicola Piepoli per le edicole del mattino. Centrodestra (escludi Vannacci) a quota 43,2%. Il 41,3% degli italiani si astiene o è indeciso.',
    publishDateTime: '2026-10-17T08:00:00',
    timeSlot: 'Ore 08:00 (Apertura Edicole · Libero Quotidiano & Il Tempo)',
    hourSlot: 8,
    minuteSlot: 0,
    category: 'il_tempo_libero',
    badgeLabel: 'Libero Quotidiano & Il Tempo · Piepoli',
    institute: 'Istituto Piepoli',
    client: 'Libero Quotidiano / Il Tempo / TV Rai',
    broadcastChannel: 'Libero Quotidiano, Il Tempo e Rai',
    directArticleUrl: 'https://www.liberoquotidiano.it/news/politica/sondaggio-piepoli-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0941',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.2,
    results: {
      fdi: 27.8,
      pd: 20.1,
      m5s: 12.0,
      fn: 7.5,
      fi: 7.6,
      avs: 6.6,
      lega: 5.7,
      azione: 3.3,
      iv: 2.3,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 1.9,
    },
    summaryText:
      'L’indagine condotta da Nicola Piepoli e Livio Gigliuto apre le edicole di sabato mattina confermando la fedeltà del corpo elettorale a Giorgia Meloni (27,8%) e la forte incertezza su chi formerà la maggioranza alla luce della legge Stabilicum.',
    editorialAnalysis: [
      'Livio Gigliuto sottolinea su Libero la tenuta del baricentro moderato di Forza Italia (7,6%) che bilancia la contrazione leghista.',
      'Sud Chiama Nord di Cateno De Luca è accreditato all’1,1% nel perimetro della coalizione di Centrodestra.',
      'Il Movimento 5 Stelle presidia il 12,0% netto, costituendo la componente fondamentale per il Campo Largo.',
    ],
    socialText:
      '🗞️ SONDAGGIO PIEPOLI SU LIBERO QUOTIDIANO E IL TEMPO (Ore 08:00)\n\n' +
      '• FdI: 27,8% | PD: 20,1% | M5S: 12,0%\n' +
      '• Futuro Nazionale (Vannacci): 7,5% (Autonomo)\n' +
      '• FI: 7,6% | AVS: 6,6% | Lega: 5,7%\n' +
      '• PLD Marattin: 1,4% | ScN: 1,1%\n\n' +
      'Centrodestra (Escludi Vannacci): 43,2%\n' +
      'Campo Largo con IV: 44,2%\n\n' +
      '#IstitutoPiepoli #LiberoQuotidiano #IlTempo #Sondaggi',
    hashtags: ['#IstitutoPiepoli', '#LiberoQuotidiano', '#IlTempo', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Libero Quotidiano', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero', searchQuery: 'Sondaggio Piepoli Libero' },
      { label: 'Il Tempo', url: 'https://www.iltempo.it/politica/sondaggi/', outlet: 'tempo', searchQuery: 'Sondaggio Piepoli Il Tempo' },
      { label: 'Sito Ufficiale Piepoli', url: 'https://www.istitutopiepoli.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 08:30 - ONLY NUMBERS PER REALPOLITIK & IL TEMPO
  // ==========================================
  {
    id: 'news-on-realpolitik',
    title: 'Sondaggio Only Numbers per Realpolitik (Rete 4 & Il Tempo): Vannacci sale al 7,8%, FdI al 27,8%, PLD Marattin all’1,4%',
    subtitle: 'Dalla rubrica di Rete 4 e dal quotidiano Il Tempo, focus sulla galassia di destra: Futuro Nazionale tocca il record del 7,8% mentre la Lega segna il 5,6%. Centrodestra (escludi Vannacci) al 43,2%.',
    publishDateTime: '2026-10-17T08:30:00',
    timeSlot: 'Ore 08:30 (Rete 4 - Realpolitik & Quotidiano Il Tempo)',
    hourSlot: 8,
    minuteSlot: 30,
    category: 'il_tempo_libero',
    badgeLabel: 'Realpolitik (Rete 4) · Il Tempo',
    institute: 'Only Numbers',
    client: 'Realpolitik (Rete 4) / Quotidiano Il Tempo',
    broadcastChannel: 'Rete 4 (Realpolitik), portale Il Tempo e Only Numbers',
    directArticleUrl: 'https://www.iltempo.it/politica/sondaggi/only-numbers-realpolitik-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0940',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.4,
    results: {
      fdi: 27.8,
      pd: 20.2,
      m5s: 11.9,
      fn: 7.8,
      fi: 7.5,
      avs: 6.5,
      lega: 5.6,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      progettocivico: 0.9,
      piuuno: 0.8,
      altri: 2.0,
    },
    summaryText:
      'Rilasciato su Rete 4 nella rubrica Realpolitik e pubblicato su Il Tempo, il secondo rilevamento Only Numbers focalizza l’attenzione sull’elettorato di destra: Roberto Vannacci catalizza il 7,8% di consensi autonomi drenando voti leghisti (5,6%). Centrodestra (escludi Vannacci) fermo a 43,2%.',
    editorialAnalysis: [
      'Il quotidiano romano Il Tempo analizza lo spostamento di consensi nel Nord-Est e Centro Italia verso Futuro Nazionale (7,8%).',
      'Centrodestra di governo (escludi Vannacci): 43,2%, con Fratelli d’Italia al 27,8% pilastro insostituibile.',
      'Nel centrosinistra debuttano ufficialmente Progetto Civico (0,9%) e Più Uno (0,8%) a supporto del Campo Largo.',
      'Luigi Marattin col Partito Liberaldemocratico conferma l’1,4% in piena indipendenza fuori da ogni coalizione.',
    ],
    socialText:
      '📰 SONDAGGIO ONLY NUMBERS PER REALPOLITIK & IL TEMPO (Ore 08:30)\n\n' +
      '• Vannacci (Futuro Nazionale): 7,8% (Autonomo)\n' +
      '• FdI: 27,8% | PD: 20,2% | M5S: 11,9%\n' +
      '• FI: 7,5% | AVS: 6,5% | Lega: 5,6%\n' +
      '• PLD Marattin: 1,4% | Azione: 3,4%\n\n' +
      'Centrodestra (Escludi Vannacci): 43,2%\n' +
      'Campo Largo con IV: 44,4%\n\n' +
      '#IlTempo #Realpolitik #OnlyNumbers #Vannacci #Sondaggi',
    hashtags: ['#IlTempo', '#Realpolitik', '#Rete4', '#OnlyNumbers', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Il Tempo (Articolo & Cartelli)', url: 'https://www.iltempo.it/politica/sondaggi/only-numbers-realpolitik-ottobre-2026', outlet: 'tempo', searchQuery: 'Only Numbers Realpolitik Il Tempo' },
      { label: 'Libero Quotidiano', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero', searchQuery: 'Only Numbers Realpolitik' },
      { label: 'Rete 4 · Mediaset Infinity', url: 'https://mediasetinfinity.mediaset.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 09:00 - FLAGSHIP: SUPERMEDIA NAZIONALE SETTIMANALE
  // ==========================================
  {
    id: 'news-sm-sabato-0900',
    title: 'Supermedia Nazionale di Sabato 17 Ottobre ore 09:00: FdI al 27,8%, Sorpasso Campo Largo con IV al 44,5%, Vannacci Autonomo al 7,7%',
    subtitle: 'La nostra aggregazione ufficiale su 12 rilevazioni indipendenti (inclusi 2 sondaggi Only Numbers per Porta a Porta e Realpolitik). Centrodestra (escludi Vannacci) al 43,2%. Con lo Stabilicum la coalizione progressista conquista il premio di maggioranza del 55%.',
    publishDateTime: '2026-10-17T09:00:00',
    timeSlot: 'Sabato ore 09:00 (Uscita Ufficiale Supermedia Settimanale)',
    hourSlot: 9,
    minuteSlot: 0,
    category: 'supermedia_settimanale',
    badgeLabel: 'Supermedia Ufficiale Sabato 09:00',
    institute: 'Supermedia Nazionale Demoscopica',
    client: 'Pubblicazione Istituzionale & Broadcast Nazionale',
    broadcastChannel: 'Tutti i Canali TV & Stampa Accreditata',
    directArticleUrl: '/data/sondaggi_settimana_17_ottobre_2026.csv',
    governmentPortalCode: 'SUPERMEDIA-2026-W42',
    isSupermediaWeeklyRelease: true,
    sampleSize: 13902,
    marginOfError: 1.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      progettocivico: 0.9,
      piuuno: 0.8,
      altri: 1.8,
    },
    summaryText:
      'La Supermedia settimanale delle ore 09:00 certifica il primato di Fratelli d’Italia al 27,8% (+0,4%). Il Centrodestra (escludi Vannacci) si posiziona al 43,2%. Nel centrosinistra l’inclusione di Italia Viva spinge il Campo Largo al 44,5%, superando la maggioranza di governo e attivando il premio di maggioranza dello Stabilicum.',
    editorialAnalysis: [
      'Fratelli d’Italia di Giorgia Meloni guida con fermezza le intenzioni di voto al 27,8%, staccando il Partito Democratico (20,3%) di 7,5 punti percentuali.',
      'Centrodestra (Escludi Vannacci): la coalizione di governo (FdI + Forza Italia 7,5% + Lega 5,7% + Noi Moderati 1,1% + Sud Chiama Nord 1,1%) somma il 43,2%.',
      'Futuro Nazionale di Roberto Vannacci si conferma forza politica autonoma al 7,7%, fuori dalla coalizione di governo.',
      'Campo Largo con Italia Viva: l’alleanza PD (20,3%) + M5S (12,0%) + AVS (6,5%) + IV (2,4%) + +Europa (1,6%) + Progetto Civico (0,9%) + Più Uno (0,8%) raggiunge il 44,5%, realizzando il sorpasso politico-numerico.',
      'Il Partito Liberaldemocratico di Luigi Marattin consolida l’1,4% in corsa rigorosamente solitaria fuori dai poli.',
      'Area del "Non si esprime" (indecisi e astensione potenziale) al 41,3%: primo partito reale del Paese.',
    ],
    socialText:
      '📊 SUPERMEDIA UFFICIALE SABATO ORE 09:00 (17 Ottobre 2026)\n\n' +
      '🇮🇹 FdI: 27,8% (+0,4)\n' +
      '🔴 PD: 20,3% (-0,2)\n' +
      '🟡 M5S: 12,0% (=)\n' +
      '⚔️ Futuro Nazionale (Vannacci): 7,7% (Autonomo)\n' +
      '🔵 Forza Italia: 7,5%\n' +
      '🟢 AVS: 6,5%\n' +
      '🦅 Lega: 5,7%\n' +
      '🟧 Azione: 3,4%\n' +
      '🌸 Italia Viva: 2,4%\n' +
      '🇪🇺 +Europa: 1,6%\n' +
      '🔷 PLD (Marattin da solo): 1,4%\n\n' +
      '⚖️ COALIZIONI:\n' +
      '• Centrodestra (Escludi Vannacci): 43,2%\n' +
      '• Campo Largo con IV: 44,5% (Sorpasso)\n\n' +
      '🏛️ Effetto Stabilicum: 220 seggi Camera e 110 Senato al Campo Largo con IV!',
    hashtags: [
      '#Supermedia',
      '#SondaggiPolitici',
      '#Meloni',
      '#Schlein',
      '#Conte',
      '#Vannacci',
      '#Stabilicum',
      '#PoliticaItaliana',
    ],
    sourceLinks: [
      { label: 'Scarica Dataset CSV Settimanale', url: '/data/sondaggi_settimana_17_ottobre_2026.csv', outlet: 'web' },
      { label: 'Il Tempo (Rassegna)', url: 'https://www.iltempo.it/politica/sondaggi/', outlet: 'tempo' },
      { label: 'Libero Quotidiano (Rassegna)', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero' },
      { label: 'Rai (Canali Broadcast)', url: 'https://www.rai.it', outlet: 'rai' },
      { label: 'Sondaggi Politico Elettorali (Presidenza del Consiglio)', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 09:30 - FOCUS DATI MENSILI OTTOBRE
  // ==========================================
  {
    id: 'news-0930-monthly-focus',
    title: 'Focus Dati Mensili Ottobre: Astensione al 41,3%, FdI consolida il +0,4%, PLD Marattin stabile all’1,4%',
    subtitle: 'Consolidamento della serie mensile 1° Ottobre - 31 Ottobre: aggregazione di 28 rilevazioni complessive. L’aggiornamento continuo prevede 2 sondaggi ogni ora fino alle 00:00.',
    publishDateTime: '2026-10-17T09:30:00',
    timeSlot: 'Ore 09:30 (Dati Mensili · Serie Consolidata)',
    hourSlot: 9,
    minuteSlot: 30,
    category: 'supermedia_settimanale',
    badgeLabel: 'Dati Mensili · Aggregato 28 Sondaggi',
    institute: 'Osservatorio Demoscopico Mensile',
    client: 'Dati Mensili Sincronizzati',
    broadcastChannel: 'Tutti i portali associati e serie storica CSV',
    directArticleUrl: '/data/sondaggi_serie_storica_2026.csv',
    governmentPortalCode: 'MONTHLY-2026-10',
    isSupermediaWeeklyRelease: false,
    sampleSize: 28400,
    marginOfError: 0.9,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      progettocivico: 0.9,
      piuuno: 0.8,
      altri: 2.8,
    },
    summaryText:
      'Il confronto mensile con Settembre evidenzia la crescita strutturale di FdI (+0,4%) e l’emergere di Futuro Nazionale di Vannacci (+0,2%), mentre l’area del Non si esprime rimane granitica al 41,3%.',
    editorialAnalysis: [
      'Stabilità eccezionale tra le rilevazioni: 12 istituti registrano scarti inferiori a 3 decimi di punto.',
      'Centrodestra (escludi Vannacci) inchiodato al 43,2% su base mensile.',
      'Campo Largo con IV stabilmente al 44,5%.',
    ],
    socialText:
      '📈 DATI MENSILI OTTOBRE (Aggregato 28 Sondaggi):\n\n' +
      '• FdI 27,8% (+0,4%) | PD 20,3% (-0,2%)\n' +
      '• M5S 12,0% | FN Vannacci 7,7% (+0,2%)\n' +
      '• FI 7,5% | Lega 5,7% | AVS 6,5%\n' +
      '• PLD Marattin: 1,4% (da solo)\n\n' +
      'Centrodestra (Escludi Vannacci): 43,2%\n' +
      'Non si esprime: 41,3%\n\n' +
      '#DatiMensili #Supermedia #Sondaggi',
    hashtags: ['#DatiMensili', '#Supermedia', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Serie Storica CSV', url: '/data/sondaggi_serie_storica_2026.csv', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 10:00 - QUOTIDIANI DEL MATTINO
  // ==========================================
  {
    id: 'news-1000-quotidiani',
    title: 'Analisi Il Tempo & Libero: Il sorpasso di misura del Campo Largo con IV (44,5% vs 43,2%)',
    subtitle: 'La rassegna dei quotidiani nazionali accende il dibattito: l’ago della bilancia resta Matteo Renzi, mentre Vannacci blinda il 7,7% autonomo.',
    publishDateTime: '2026-10-17T10:00:00',
    timeSlot: 'Ore 10:00 (Rassegna Quotidiani Il Tempo & Libero)',
    hourSlot: 10,
    minuteSlot: 0,
    category: 'il_tempo_libero',
    badgeLabel: 'Il Tempo & Libero Quotidiano',
    institute: 'Rassegna Carta Stampata',
    client: 'Il Tempo & Libero Quotidiano',
    broadcastChannel: 'Edicole Nazionali & Web',
    directArticleUrl: 'https://www.iltempo.it/politica/sondaggi/',
    governmentPortalCode: 'PRESS-2026/10-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.6,
    },
    summaryText:
      'I due principali quotidiani romani e milanesi commentano i dati Only Numbers e Piepoli: l’inclusione di Italia Viva ribalta gli equilibri parlamentari.',
    editorialAnalysis: [
      'Il Tempo insiste sul bacino d’opinione di Roberto Vannacci, capace di raccogliere consensi trasversali.',
      'Libero Quotidiano avverte la maggioranza sulla necessità di ricompattare l’area moderata.',
    ],
    socialText:
      '📰 IL TEMPO & LIBERO QUOTIDIANO: Sorpasso del Campo Largo con IV (44,5% vs 43,2% CDX escludi Vannacci).\n\n#IlTempo #LiberoQuotidiano #Sondaggi',
    hashtags: ['#IlTempo', '#LiberoQuotidiano', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Il Tempo Politica', url: 'https://www.iltempo.it/politica/sondaggi/', outlet: 'tempo', searchQuery: 'Sondaggi Il Tempo' },
      { label: 'Libero Politica', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero', searchQuery: 'Sondaggi Libero' },
    ],
  },

  // ==========================================
  // 10:30 - EMG DIFFERENT AGORÀ MORNING (RAI 3)
  // ==========================================
  {
    id: 'news-1030-emg-agora',
    title: 'Sondaggio EMG Different per Agorà Weekend (Rai 3): FdI 27,8%, AVS al 6,6%, Vannacci 7,7%',
    subtitle: 'Fabrizio Masia presenta il quadro per la trasmissione di Rai 3: Centrodestra (escludi Vannacci) a 43,1%, Campo Largo con IV a 44,5%.',
    publishDateTime: '2026-10-17T10:30:00',
    timeSlot: 'Ore 10:30 (Rai 3 - Agorà Weekend)',
    hourSlot: 10,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Rai 3 · EMG Different Agorà',
    institute: 'EMG Different',
    client: 'Rai 3 / Agorà Weekend',
    broadcastChannel: 'Rai 3 / RaiPlay',
    directArticleUrl: 'https://emgdifferent.it/sondaggi/agora-15102026',
    governmentPortalCode: 'SP-2026/10-0931',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.1,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.4,
      avs: 6.6,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.5,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.6,
    },
    summaryText:
      'Il sondaggio EMG per Rai 3 mette a fuoco il buon momento di Alleanza Verdi-Sinistra (6,6%) e la tenuta di Fratelli d’Italia al 27,8%.',
    editorialAnalysis: ['AVS si conferma la formazione più dinamica dell’area progressista.'],
    socialText:
      '📺 SONDAGGIO EMG DIFFERENT PER AGORÀ (Rai 3):\n• FdI: 27,8% | PD: 20,3% | AVS: 6,6% | Vannacci: 7,7%\nCentrodestra (Escludi Vannacci): 43,1%\n\n#AgoraRai3 #EMG #Sondaggi',
    hashtags: ['#AgoraRai3', '#Rai3', '#EMG', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'RaiPlay Agorà', url: 'https://www.raiplay.it/programmi/agora', outlet: 'rai' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 11:00 - FOCUS COALIZIONI & STABILICUM
  // ==========================================
  {
    id: 'news-1100-stabilicum',
    title: 'Focus Legge Elettorale Stabilicum: Con IV il Campo Largo supera la soglia e vince 220 deputati',
    subtitle: 'Simulazione dettagliata del premio di maggioranza del 55%: il sorpasso progressista (44,5% vs 43,2%) assegna 220 seggi alla Camera e 110 al Senato.',
    publishDateTime: '2026-10-17T11:00:00',
    timeSlot: 'Ore 11:00 (Focus Istituzionale Stabilicum)',
    hourSlot: 11,
    minuteSlot: 0,
    category: 'supermedia_settimanale',
    badgeLabel: 'Stabilicum · Premio 55%',
    institute: 'Centro Studi Istituzionali',
    client: 'Simulatore Parlamentare',
    broadcastChannel: 'Approfondimento Demoscopico',
    directArticleUrl: '/data/sondaggi_settimana_17_ottobre_2026.csv',
    governmentPortalCode: 'LEGIS-2026/STAB',
    isSupermediaWeeklyRelease: false,
    sampleSize: 10000,
    marginOfError: 1.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'La legge Stabilicum prevede l’assegnazione del 55% dei seggi alla prima coalizione che superi la soglia o si classifichi prima. Con Italia Viva (2,4%), il Campo Largo raggiunge il 44,5%, superando il Centrodestra (escludi Vannacci, 43,2%).',
    editorialAnalysis: [
      'Senza IV il Campo Largo si ferma al 42,1% e soccombe al Centrodestra (43,2%).',
      'Roberto Vannacci con Futuro Nazionale elegge 22 deputati e 11 senatori autonomi.',
    ],
    socialText:
      '🏛️ EFFETTO STABILICUM: Con il 44,5% il Campo Largo con IV ottiene 220 seggi alla Camera!\nCentrodestra (Escludi Vannacci): 43,2% (150 seggi).\n\n#Stabilicum #LeggeElettorale #Camera #Senato',
    hashtags: ['#Stabilicum', '#CameraDeiDeputati', '#SenatoDellaRepubblica'],
    sourceLinks: [
      { label: 'Simulatore Seggi Stabilicum', url: '#trends', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 11:30 - SWG FLASH DEMOSCOPICO MACRO-AREE
  // ==========================================
  {
    id: 'news-1130-swg-macroaree',
    title: 'Flash SWG Macro-Aree: Centrodestra solido al Nord-Est, Campo Largo avanti al Centro e al Sud',
    subtitle: 'Ripartizione geografica del voto: al Nord Fratelli d’Italia e Lega tengono testa a Vannacci, mentre nelle regioni rosse e al Meridione Schlein e Conte allungano.',
    publishDateTime: '2026-10-17T11:30:00',
    timeSlot: 'Ore 11:30 (SWG Flash Territoriale)',
    hourSlot: 11,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'SWG · Flash Territoriale',
    institute: 'SWG',
    client: 'Osservatorio Territoriale SWG',
    broadcastChannel: 'TG La7 Web & Canali SWG',
    directArticleUrl: 'https://swg.it/politicomilano/',
    governmentPortalCode: 'SP-2026/10-0925',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1200,
    marginOfError: 2.8,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.3,
    results: {
      fdi: 27.7,
      pd: 20.4,
      m5s: 12.1,
      fn: 7.6,
      fi: 7.4,
      avs: 6.6,
      lega: 5.9,
      azione: 3.3,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      altri: 2.9,
    },
    summaryText:
      'L’analisi SWG evidenzia come la tenuta del Centrodestra (escludi Vannacci, 43,2%) si concentri nei collegi del Nord, mentre il Campo Largo con IV prevale nelle aree urbane e al Sud.',
    editorialAnalysis: ['M5S prima forza in Campania e Sicilia sopra il 18%.'],
    socialText:
      '🗺️ SWG FLASH TERRITORIALE: Al Nord tiene il Centrodestra (escludi Vannacci), al Sud volano PD e M5S. #SWG #Territorio #Sondaggi',
    hashtags: ['#SWG', '#TGLa7', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'SWG Ricerche', url: 'https://swg.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 12:00 - TECNÈ FLASH MEZZOGIORNO (TG4 / MEDIASET)
  // ==========================================
  {
    id: 'news-1200-tecne-tg4',
    title: 'Flash Tecnè (Mediaset · TG4 Mezzogiorno): FdI al 27,9%, Forza Italia sale al 7,8%',
    subtitle: 'Dalla redazione del TG4 il consueto cartello demoscopico meridiano: traino azzurro per la coalizione di governo (escludi Vannacci) a 43,7%.',
    publishDateTime: '2026-10-17T12:00:00',
    timeSlot: 'Ore 12:00 (Mediaset · TG4 Mezzogiorno)',
    hourSlot: 12,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'Mediaset · Tecnè TG4',
    institute: 'Tecnè',
    client: 'Mediaset / TG4',
    broadcastChannel: 'Rete 4 (TG4 ore 12:00) / TGcom24',
    directArticleUrl: 'https://tecne-italia.it/sondaggi/politico-15102026',
    governmentPortalCode: 'SP-2026/10-0935',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.7,
    campoLargoConIV: 44.0,
    results: {
      fdi: 27.9,
      pd: 20.3,
      m5s: 11.8,
      fn: 7.7,
      fi: 7.8,
      avs: 6.4,
      lega: 5.8,
      azione: 3.5,
      iv: 2.3,
      piueu: 1.5,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il rilevamento Tecnè di mezzogiorno certifica l’ottimo stato di salute di Forza Italia (7,8%) guidata da Antonio Tajani, che supera la Lega di due punti netti.',
    editorialAnalysis: ['Forza Italia attrae elettorato moderato centrista in uscita dal Terzo Polo.'],
    socialText:
      '📺 FLASH TECNÈ TG4 (Ore 12:00): FdI 27,9% | FI 7,8% | PD 20,3% | Vannacci 7,7% | Lega 5,8%\nCentrodestra (Escludi Vannacci): 43,7%\n\n#TG4 #Tecne #Mediaset #Sondaggi',
    hashtags: ['#TG4', '#Tecne', '#Mediaset', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'TGcom24 Sondaggi', url: 'https://www.tgcom24.mediaset.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 12:30 - QUORUM & YOUTREND SKY TG24
  // ==========================================
  {
    id: 'news-1230-quorum-sky',
    title: 'Sondaggio Quorum & YouTrend per Sky TG24: FdI al 27,7%, Campo Largo con IV al 44,5%, Vannacci al 7,6%',
    subtitle: 'Il barometro d’inizio weekend di Sky TG24: rilevazione su panel CAWI di 1.002 casi. Centrodestra (escludi Vannacci) al 43,2%.',
    publishDateTime: '2026-10-17T12:30:00',
    timeSlot: 'Ore 12:30 (Sky TG24 · Barometro Politico)',
    hourSlot: 12,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Sky TG24 · Quorum / YouTrend',
    institute: 'Quorum',
    client: 'Sky TG24 / Lorenzo Pregliasco',
    broadcastChannel: 'Sky TG24 ore 12:30 & Live Digitale',
    directArticleUrl: 'https://quorumresearch.it/sondaggio-skytg24-15102026',
    governmentPortalCode: 'SP-2026/10-0928',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1002,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.7,
      pd: 20.4,
      m5s: 12.0,
      fn: 7.6,
      fi: 7.5,
      avs: 6.5,
      lega: 5.8,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.9,
    },
    summaryText:
      'Lorenzo Pregliasco commenta il perfetto bilanciamento: con Italia Viva al 2,4%, il Campo Largo stacca la coalizione di governo (escludi Vannacci) di 1,3 punti percentuali.',
    editorialAnalysis: ['Convergenza millimetrica con i dati della Supermedia del sabato mattina.'],
    socialText:
      '📊 SKY TG24 QUORUM: FdI 27,7% | PD 20,4% | M5S 12,0% | Vannacci 7,6%\nCampo Largo con IV: 44,5% vs CDX (Escludi Vannacci) 43,2%.\n\n#SkyTG24 #YouTrend #Quorum #Sondaggi',
    hashtags: ['#SkyTG24', '#YouTrend', '#Quorum', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Sky TG24 Sondaggi', url: 'https://tg24.sky.it/politica', outlet: 'tv' },
      { label: 'Quorum Research', url: 'https://quorumresearch.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 13:00 - DEMOPOLIS PER RAINEWS24 (EDIZIONE POMERIGGIO)
  // ==========================================
  {
    id: 'news-1300-demopolis-rainews',
    title: 'Sondaggio Demopolis per RaiNews24: FdI al 27,9%, PD al 20,2%, Astensione al 41,3%',
    subtitle: 'Pietro Vento presenta a RaiNews24 il barometro politico aggiornato: Centrodestra (escludi Vannacci) a quota 43,3%. 41,3% tra indecisi e astensione.',
    publishDateTime: '2026-10-17T13:00:00',
    timeSlot: 'Ore 13:00 (RaiNews24 · Edizione Pomeriggio)',
    hourSlot: 13,
    minuteSlot: 0,
    category: 'istituto_nazionale',
    badgeLabel: 'RaiNews24 · Demopolis Pietro Vento',
    institute: 'Istituto Demopolis',
    client: 'RaiNews24 / Demopolis',
    broadcastChannel: 'RaiNews24 Canale 48 & RaiPlay',
    directArticleUrl: 'https://demopolis.it/barometro-politico-16102026',
    governmentPortalCode: 'SP-2026/10-0937',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1200,
    marginOfError: 2.8,
    cdxEsclusoVannacci: 43.3,
    campoLargoConIV: 44.2,
    results: {
      fdi: 27.9,
      pd: 20.2,
      m5s: 11.9,
      fn: 7.8,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Pietro Vento illustra la propensione al voto degli italiani: la mobilitazione degli indecisi sarà decisiva per l’assegnazione dei seggi uninominali.',
    editorialAnalysis: ['Solo il 58,7% degli aventi diritto dichiara voto certo.'],
    socialText:
      '📺 DEMOPOLIS A RAINEWS24: FdI 27,9% | PD 20,2% | Vannacci 7,8% | FI 7,5% | Lega 5,7%\nCentrodestra (Escludi Vannacci): 43,3%\n\n#RaiNews24 #Demopolis #PietroVento #Sondaggi',
    hashtags: ['#RaiNews24', '#Demopolis', '#PietroVento', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'RaiNews24 Diretta', url: 'https://www.rainews.it', outlet: 'rai' },
      { label: 'Istituto Demopolis', url: 'https://demopolis.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 13:30 - FOCUS PARTITO LIBERALDEMOCRATICO (MARATTIN)
  // ==========================================
  {
    id: 'news-1330-pld-marattin',
    title: 'Focus Partito Liberaldemocratico: Luigi Marattin consolida l’1,4% in corsa solitaria fuori dai poli',
    subtitle: 'Nessun accordo né col centrodestra né col campo largo: il PLD si attesta stabilmente sopra l’1% con un elettorato d’opinione fedele e radicato nei capoluoghi.',
    publishDateTime: '2026-10-17T13:30:00',
    timeSlot: 'Ore 13:30 (Focus Terzo Polo & Liberaldemocratici)',
    hourSlot: 13,
    minuteSlot: 30,
    category: 'supermedia_settimanale',
    badgeLabel: 'PLD · Marattin da Solo 1,4%',
    institute: 'Osservatorio Forze Minori',
    client: 'Dossier Politico',
    broadcastChannel: 'Canali Web e Rassegna Parlamentare',
    directArticleUrl: '/data/sondaggi_settimana_17_ottobre_2026.csv',
    governmentPortalCode: 'PLD-2026/10',
    isSupermediaWeeklyRelease: false,
    sampleSize: 2000,
    marginOfError: 2.2,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      pld: 1.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.6,
    },
    summaryText:
      'Il Partito Liberaldemocratico guidato da Luigi Marattin taglia il traguardo dell’1,4% confermando la decisione strategica di non federarsi con Azione o Italia Viva e rifiutando logiche bipolari.',
    editorialAnalysis: ['Voti concentrati nel ceto professionale e produttivo del Centro-Nord.'],
    socialText:
      '🔷 PLD (Marattin): Consolidato l’1,4% in piena indipendenza dai poli. #PLD #Marattin #Liberaldemocratici',
    hashtags: ['#PLD', '#Marattin', '#Liberali', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Dati Supermedia', url: '/data/sondaggi_settimana_17_ottobre_2026.csv', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 14:00 - NOTO SONDAGGI POMERIGGIO (SIMULAZIONE COLLEGI)
  // ==========================================
  {
    id: 'news-1400-noto-collegi',
    title: 'Sondaggio Noto Sondaggi (Pomeriggio): FdI 27,8%, Campo Largo con IV avanti nei seggi proporzionali',
    subtitle: 'La simulazione di Antonio Noto per Rai: Centrodestra (escludi Vannacci) a 43,3%, Campo Largo con IV a 44,5%. Il peso delle coalizioni supera i singoli partiti.',
    publishDateTime: '2026-10-17T14:00:00',
    timeSlot: 'Ore 14:00 (Rai Notizie & Noto Sondaggi)',
    hourSlot: 14,
    minuteSlot: 0,
    category: 'porta_a_porta',
    badgeLabel: 'Rai · Noto Sondaggi Pomeriggio',
    institute: 'Noto Sondaggi',
    client: 'Rai / Notizie & Approfondimenti',
    broadcastChannel: 'Rai 1 & canali informativi Rai',
    directArticleUrl: 'https://notosondaggi.it/report/rai-ottobre-17-2026',
    governmentPortalCode: 'SP-2026/10-0933',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.3,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.2,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.8,
      azione: 3.3,
      iv: 2.5,
      piueu: 1.5,
      nm: 1.1,
      scn: 1.1,
      altri: 3.0,
    },
    summaryText:
      'Antonio Noto evidenzia come Fratelli d’Italia garantisca la stabilità al 27,8%, ma l’assenza di Futuro Nazionale (7,7%) impedisca al Centrodestra di raggiungere la maggioranza assoluta.',
    editorialAnalysis: ['La compattezza del Campo Largo con IV sposta 15 collegi in bilico.'],
    socialText:
      '📺 NOTO SONDAGGI: FdI 27,8% | PD 20,2% | M5S 12,0% | Vannacci 7,7%\nCentrodestra (Escludi Vannacci): 43,3%\n\n#NotoSondaggi #Rai1 #Sondaggi',
    hashtags: ['#NotoSondaggi', '#Rai1', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Rai 1 Politica', url: 'https://www.rai.it', outlet: 'rai' },
      { label: 'Noto Sondaggi', url: 'https://notosondaggi.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 14:30 - EUMETRA FLASH CENTRO RIFORMISTA & AZIONE
  // ==========================================
  {
    id: 'news-1430-eumetra-azione',
    title: 'Flash Eumetra: Azione di Calenda al 3,4%, +Europa all’1,6%, Terzo Polo diviso',
    subtitle: 'Renato Mannheimer fotografa l’elettorato liberale e riformista: Azione difende la soglia di sbarramento ma resta autonoma dai due poli principali.',
    publishDateTime: '2026-10-17T14:30:00',
    timeSlot: 'Ore 14:30 (Eumetra Flash Centro Riformista)',
    hourSlot: 14,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Eumetra · Focus Centro Riformista',
    institute: 'Eumetra',
    client: 'La7 / Piazzapulita',
    broadcastChannel: 'La7 & Portale Eumetra',
    directArticleUrl: 'https://la7.it/piazzapulita/video/sondaggi-eumetra-15-10-2026',
    governmentPortalCode: 'SP-2026/10-0938',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.1,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.1,
      m5s: 11.9,
      fn: 7.8,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il sondaggio Eumetra sottolinea che Carlo Calenda con Azione (3,4%) mantiene una base fedele di elettori pragmatisti, mentre +Europa (1,6%) si federa al Campo Largo.',
    editorialAnalysis: ['La frammentazione centrista riduce il peso complessivo del Terzo Polo.'],
    socialText:
      '📊 EUMETRA FLASH: Azione al 3,4%, +Europa 1,6%, PLD Marattin 1,4%.\n\n#Eumetra #Calenda #Azione #Sondaggi',
    hashtags: ['#Eumetra', '#Azione', '#Calenda', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Piazzapulita La7', url: 'https://la7.it/piazzapulita', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 15:00 - IPSOS PAGNONCELLI (CORRIERE DELLA SERA)
  // ==========================================
  {
    id: 'news-1500-ipsos-corriere',
    title: 'Sondaggio Ipsos (Corriere della Sera): Pagnoncelli analizza i flussi verso Vannacci (7,5%) e la tenuta di FdI (27,6%)',
    subtitle: 'Sul Corriere della Sera l’approfondimento demoscopico: astensione potenziale al 41,5%. Centrodestra (escludi Vannacci) a 43,0%.',
    publishDateTime: '2026-10-17T15:00:00',
    timeSlot: 'Ore 15:00 (Corriere della Sera & Ipsos)',
    hourSlot: 15,
    minuteSlot: 0,
    category: 'istituto_nazionale',
    badgeLabel: 'Corriere della Sera · Ipsos Pagnoncelli',
    institute: 'Ipsos Italia',
    client: 'Corriere della Sera / Nando Pagnoncelli',
    broadcastChannel: 'Corriere della Sera edicola e sito web',
    directArticleUrl: 'https://ipsos.com/it-it/sondaggio-corriere-16102026',
    governmentPortalCode: 'SP-2026/10-0939',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.0,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.6,
      pd: 20.5,
      m5s: 12.2,
      fn: 7.5,
      fi: 7.5,
      avs: 6.4,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 3.0,
    },
    summaryText:
      'Nando Pagnoncelli illustra la provenienza dei consensi di Roberto Vannacci: il 60% proviene da ex elettori leghisti, il 20% da FdI e il 20% dall’area dell’astensione.',
    editorialAnalysis: [
      'Il Centrodestra (escludi Vannacci) si attesta al 43,0%.',
      'Il Campo Largo con IV al 44,5% beneficia della convergenza di centrosinistra.',
    ],
    socialText:
      '📰 IPSOS CORRIERE DELLA SERA: Flussi elettorali di Futuro Nazionale (7,5%).\nCentrodestra (Escludi Vannacci): 43,0% | Campo Largo con IV: 44,5%.\n\n#Ipsos #Corriere #Pagnoncelli #Sondaggi',
    hashtags: ['#Ipsos', '#CorriereDellaSera', '#Pagnoncelli', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Corriere della Sera Politica', url: 'https://www.corriere.it/politica/', outlet: 'web' },
      { label: 'Ipsos Italia', url: 'https://www.ipsos.com/it-it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 15:30 - CARTELLO ONLY NUMBERS: FORZA ITALIA SUPERA LEGA
  // ==========================================
  {
    id: 'news-1530-onlynumbers-filega',
    title: 'Cartello Only Numbers: Sorpasso Forza Italia (7,6%) su Lega (5,6%) nella coalizione di governo',
    subtitle: 'Approfondimento Only Numbers ripreso da Libero Quotidiano e Il Tempo: il polo moderato guidato da Tajani consolida il ruolo di seconda gamba del governo.',
    publishDateTime: '2026-10-17T15:30:00',
    timeSlot: 'Ore 15:30 (Only Numbers · Focus Centrodestra)',
    hourSlot: 15,
    minuteSlot: 30,
    category: 'il_tempo_libero',
    badgeLabel: 'Only Numbers · Focus FI vs Lega',
    institute: 'Only Numbers',
    client: 'Il Tempo / Libero Quotidiano',
    broadcastChannel: 'Il Tempo & Libero Quotidiano',
    directArticleUrl: 'https://www.iltempo.it/politica/sondaggi/only-numbers-realpolitik-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0940',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 11.9,
      fn: 7.8,
      fi: 7.6,
      avs: 6.5,
      lega: 5.6,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.0,
    },
    summaryText:
      'Il dualismo interno al centrodestra vede Forza Italia al 7,6% allungare sulla Lega di Matteo Salvini (5,6%), condizionata dall’uscita elettorale di Vannacci al 7,8%.',
    editorialAnalysis: ['Forza Italia raccoglie consensi tra i ceti produttivi moderati del Nord.'],
    socialText:
      '📊 ONLY NUMBERS: Forza Italia (7,6%) stacca la Lega (5,6%) di 2 punti!\nCentrodestra (Escludi Vannacci): 43,2%.\n\n#OnlyNumbers #ForzaItalia #Lega #IlTempo #LiberoQuotidiano',
    hashtags: ['#OnlyNumbers', '#ForzaItalia', '#Lega', '#IlTempo', '#LiberoQuotidiano'],
    sourceLinks: [
      { label: 'Il Tempo', url: 'https://www.iltempo.it/politica/sondaggi/', outlet: 'tempo', searchQuery: 'Only Numbers Forza Italia Lega' },
      { label: 'Libero Quotidiano', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 16:00 - BIDIMEDIA ANALISI DI CONVERGENZA
  // ==========================================
  {
    id: 'news-1600-bidimedia',
    title: 'Monitor BiDiMedia: Analisi di convergenza statistica e dispersione tra i 12 istituti',
    subtitle: 'BiDiMedia elabora il coefficiente di variazione: la deviazione standard per Fratelli d’Italia è di appena 0,14 punti, indicando una concordanza eccezionale.',
    publishDateTime: '2026-10-17T16:00:00',
    timeSlot: 'Ore 16:00 (BiDiMedia · Analisi Comparata)',
    hourSlot: 16,
    minuteSlot: 0,
    category: 'istituto_nazionale',
    badgeLabel: 'BiDiMedia · Statistica Comparata',
    institute: 'BiDiMedia',
    client: 'Network BiDiMedia',
    broadcastChannel: 'Portale BiDiMedia & canali aggregati',
    directArticleUrl: 'https://sondaggibidimedia.com',
    governmentPortalCode: 'BM-2026/10-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 13902,
    marginOfError: 1.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'L’analisi comparata BiDiMedia dimostra scientificamente come la Supermedia ponderata e la media aritmetica convergano: tutti i 12 istituti rilevano FdI tra il 27,6% e il 27,9%.',
    editorialAnalysis: ['Basso livello di dispersione campionaria tra le metodologie CATI e CAWI.'],
    socialText:
      '📉 BIDIMEDIA: Concordanza record tra i 12 sondaggi della settimana. FdI stabile al 27,8%. #BiDiMedia #Statistica #Sondaggi',
    hashtags: ['#BiDiMedia', '#SondaggiPolitici', '#Statistica'],
    sourceLinks: [
      { label: 'Sondaggi BiDiMedia', url: 'https://sondaggibidimedia.com', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 16:30 - FLASH RIPARTIZIONE SEGGHI STABILICUM
  // ==========================================
  {
    id: 'news-1630-seggi-camera',
    title: 'Proiezione Seggi Stabilicum: Camera 220 seggi al Campo Largo con IV, 150 al CDX (escludi Vannacci), 22 a FN',
    subtitle: 'Ripartizione dei 400 seggi di Montecitorio: il premio al 55% scatta al Campo Largo che conquista la maggioranza assoluta senza dover scendere a patti con Vannacci.',
    publishDateTime: '2026-10-17T16:30:00',
    timeSlot: 'Ore 16:30 (Proiezione Seggi Montecitorio)',
    hourSlot: 16,
    minuteSlot: 30,
    category: 'supermedia_settimanale',
    badgeLabel: 'Camera dei Deputati · 400 Seggi',
    institute: 'Ufficio Studi Elettorali',
    client: 'Proiezione Istituzionale',
    broadcastChannel: 'Dati Supermedia & Simulatore',
    directArticleUrl: '/data/sondaggi_settimana_17_ottobre_2026.csv',
    governmentPortalCode: 'CAMERA-2026-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 10000,
    marginOfError: 1.2,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il simulatore applica la soglia di sbarramento del 3% per le liste e assegna il premio di maggioranza di 220 seggi (55%) al Campo Largo con Italia Viva (44,5%). Centrodestra (escludi Vannacci) a 150 seggi.',
    editorialAnalysis: ['Futuro Nazionale elegge 22 deputati e il Terzo Polo (Azione) 8 deputati.'],
    socialText:
      '🏛️ CAMERA DEI DEPUTATI (400 Seggi):\n• Campo Largo con IV: 220 Seggi (55% Premio)\n• Centrodestra (Escludi Vannacci): 150 Seggi\n• Futuro Nazionale (Vannacci): 22 Seggi\n• Azione: 8 Seggi\n\n#Camera #Stabilicum #Seggi',
    hashtags: ['#Camera', '#Stabilicum', '#Montecitorio', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Simulatore Seggi', url: '#trends', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 17:00 - QUORUM SKY TG24 (FIDUCIA NEL GOVERNO)
  // ==========================================
  {
    id: 'news-1700-quorum-fiducia',
    title: 'Sondaggio Quorum Sky TG24: Fiducia in Giorgia Meloni al 42%, Fiducia nel Governo al 39%',
    subtitle: 'Il cartello pomeridiano di Sky TG24: la premier mantiene un gradimento superiore di 3 punti rispetto all’esecutivo. Centrodestra (escludi Vannacci) a 43,2%.',
    publishDateTime: '2026-10-17T17:00:00',
    timeSlot: 'Ore 17:00 (Sky TG24 Pomeriggio)',
    hourSlot: 17,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'Sky TG24 · Gradimento Premier',
    institute: 'Quorum',
    client: 'Sky TG24',
    broadcastChannel: 'Sky TG24 ore 17:00',
    directArticleUrl: 'https://quorumresearch.it',
    governmentPortalCode: 'SP-2026/10-0929',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.4,
    results: {
      fdi: 27.7,
      pd: 20.4,
      m5s: 12.0,
      fn: 7.6,
      fi: 7.5,
      avs: 6.5,
      lega: 5.8,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 3.0,
    },
    summaryText:
      'Sky TG24 approfondisce l’indice di fiducia dei leader: Giorgia Meloni guida la classifica con il 42%, seguita da Antonio Tajani (34%), Elly Schlein (32%) e Giuseppe Conte (31%).',
    editorialAnalysis: ['Vannacci raccoglie il 26% di fiducia personale a livello nazionale.'],
    socialText:
      '📊 SKY TG24: Fiducia in Meloni al 42%, FdI al 27,7%. Centrodestra (Escludi Vannacci): 43,2%.\n\n#SkyTG24 #Fiducia #Meloni #Sondaggi',
    hashtags: ['#SkyTG24', '#Fiducia', '#Meloni', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Sky TG24 Live', url: 'https://tg24.sky.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 17:30 - ISTITUTO IXÈ (STUDIO SULL'ASTENSIONE)
  // ==========================================
  {
    id: 'news-1730-ixe-astensione',
    title: 'Studio Istituto Ixè: Chi sono gli italiani del 41,3% di "Non si esprime"',
    subtitle: 'Dalla rubrica di Roberto Baldassari l’identikit del non-voto: giovani tra 18 e 34 anni e residenti nel Mezzogiorno costituiscono il 55% degli indecisi.',
    publishDateTime: '2026-10-17T17:30:00',
    timeSlot: 'Ore 17:30 (Istituto Ixè · Focus Astensione)',
    hourSlot: 17,
    minuteSlot: 30,
    category: 'istituto_nazionale',
    badgeLabel: 'Istituto Ixè · Focus Astensione 41,3%',
    institute: 'Istituto Ixè',
    client: 'Studio Ixè / Rete 4',
    broadcastChannel: 'Rete 4 & Portale Ixè',
    directArticleUrl: 'https://istitutoixe.it/sondaggi/ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0934',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.1,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.1,
      fn: 7.8,
      fi: 7.4,
      avs: 6.6,
      lega: 5.7,
      azione: 3.3,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'L’indagine Ixè conferma che l’area del non-voto è il vero campo di battaglia elettorale: 4 italiani su 10 non hanno ancora deciso per chi votare.',
    editorialAnalysis: ['M5S e Futuro Nazionale hanno il più alto potenziale di recupero tra gli astenuti.'],
    socialText:
      '📊 ISTITUTO IXÈ: Il 41,3% degli italiani non si esprime. Chi conquisterà gli indecisi?\n\n#Ixe #Astensione #Sondaggi',
    hashtags: ['#Ixe', '#Astensione', '#Indecisi', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Istituto Ixè', url: 'https://istitutoixe.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 18:00 - TECNÈ PRE-SERALE (MEDIASET)
  // ==========================================
  {
    id: 'news-1800-tecne-preserale',
    title: 'Sondaggio Tecnè Pre-Serale: FdI stabile al 27,9%, PD al 20,3%, AVS al 6,4%',
    subtitle: 'Aggiornamento Tecnè per i notiziari Mediaset: Centrodestra (escludi Vannacci) a 43,6%, Campo Largo con IV al 44,1%.',
    publishDateTime: '2026-10-17T18:00:00',
    timeSlot: 'Ore 18:00 (Mediaset · TGcom24 Pre-Serale)',
    hourSlot: 18,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'Mediaset · Tecnè Pre-Serale',
    institute: 'Tecnè',
    client: 'Mediaset / TGcom24',
    broadcastChannel: 'TGcom24 Canale 51',
    directArticleUrl: 'https://tecne-italia.it',
    governmentPortalCode: 'SP-2026/10-0936',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.6,
    campoLargoConIV: 44.1,
    results: {
      fdi: 27.9,
      pd: 20.3,
      m5s: 11.9,
      fn: 7.7,
      fi: 7.7,
      avs: 6.4,
      lega: 5.8,
      azione: 3.4,
      iv: 2.3,
      piueu: 1.5,
      nm: 1.1,
      scn: 1.1,
      altri: 2.9,
    },
    summaryText:
      'Il pre-serale Mediaset ribadisce l’equilibrio: Fratelli d’Italia conduce, Forza Italia solida al 7,7%, Lega al 5,8%.',
    editorialAnalysis: ['Stabilità nei trend prima dei talk show del prime-time.'],
    socialText:
      '📺 TECNÈ MEDIASET (Ore 18:00): FdI 27,9% | PD 20,3% | FI 7,7% | FN 7,7% | Lega 5,8%\nCentrodestra (Escludi Vannacci): 43,6%\n\n#Tecne #Mediaset #Sondaggi',
    hashtags: ['#Tecne', '#Mediaset', '#TGcom24', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'TGcom24 Notizie', url: 'https://www.tgcom24.mediaset.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 18:30 - EMG DIFFERENT FOCUS NORD-EST & ISOLE
  // ==========================================
  {
    id: 'news-1830-emg-isole',
    title: 'Focus EMG Different: Sud Chiama Nord (1,1%) traina il centrodestra in Sicilia, Noi Moderati (1,1%) al Nord',
    subtitle: 'Analisi sui partiti della coalizione di governo: il contributo delle formazioni territoriali porta il Centrodestra (escludi Vannacci) al 43,2%.',
    publishDateTime: '2026-10-17T18:30:00',
    timeSlot: 'Ore 18:30 (EMG Different · Focus Liste Minori)',
    hourSlot: 18,
    minuteSlot: 30,
    category: 'istituto_nazionale',
    badgeLabel: 'EMG Different · Focus Liste Alleate',
    institute: 'EMG Different',
    client: 'Rai / EMG Different',
    broadcastChannel: 'Rai 3 & Portale EMG',
    directArticleUrl: 'https://emgdifferent.it',
    governmentPortalCode: 'SP-2026/10-0932',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.4,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.7,
    },
    summaryText:
      'Sud Chiama Nord di Cateno De Luca e Noi Moderati di Maurizio Lupi raggiungono entrambi l’1,1%, garantendo 2,2 punti percentuali alla maggioranza.',
    editorialAnalysis: ['Fondamentali per la vittoria nei collegi uninominali siciliani e lombardi.'],
    socialText:
      '🗳️ EMG FOCUS: ScN all’1,1% e Noi Moderati all’1,1% portano il Centrodestra (escludi Vannacci) al 43,2%. #EMG #ScN #NoiModerati',
    hashtags: ['#EMG', '#NoiModerati', '#SudChiamaNord', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'EMG Different', url: 'https://emgdifferent.it', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 19:00 - SWG SONDAGGIO FLASH DI CHIUSURA POMERIGGIO
  // ==========================================
  {
    id: 'news-1900-swg-chiusura',
    title: 'Sondaggio SWG Chiusura Pomeriggio: FdI 27,8%, PD 20,3%, Campo Largo con IV a 44,5%',
    subtitle: 'Verso il telegiornale delle 20:00: Enrico Mentana e SWG consolidano il dato settimanale con Fratelli d’Italia prima forza politica d’Italia.',
    publishDateTime: '2026-10-17T19:00:00',
    timeSlot: 'Ore 19:00 (SWG Flash Pre-TG La7)',
    hourSlot: 19,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'La7 · SWG Pre-TG',
    institute: 'SWG',
    client: 'TG La7 / Enrico Mentana',
    broadcastChannel: 'TG La7 ore 20:00 Preview',
    directArticleUrl: 'https://swg.it/politicomilano/tgla7-12-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0920',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1200,
    marginOfError: 2.8,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.6,
      fi: 7.5,
      avs: 6.5,
      lega: 5.8,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il dato di sintesi SWG prima del notiziario delle 20:00 fotografa un elettorato solido e perfettamente rispecchiato dalla Supermedia delle 09:00.',
    editorialAnalysis: ['Nessuna alterazione nei flussi settimanali.'],
    socialText:
      '📺 SWG PRE-TG LA7: FdI 27,8% | PD 20,3% | M5S 12,0% | FN 7,6%\nCentrodestra (Escludi Vannacci): 43,2% | Campo Largo con IV: 44,5%.\n\n#TGLa7 #SWG #Mentana #Sondaggi',
    hashtags: ['#TGLa7', '#Mentana', '#SWG', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'TG La7', url: 'https://tg.la7.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 19:30 - SKY TG24 SPECIALE PROIEZIONI ELETTORALI
  // ==========================================
  {
    id: 'news-1930-sky-proiezioni',
    title: 'Speciale Sky TG24: Il Senato con lo Stabilicum (110 seggi Campo Largo con IV, 75 CDX escludi Vannacci)',
    subtitle: 'A Palazzo Madama la maggioranza assoluta è di 101 senatori: il Campo Largo con Renzi tocca quota 110 senatori, garantendo stabilità istituzionale.',
    publishDateTime: '2026-10-17T19:30:00',
    timeSlot: 'Ore 19:30 (Sky TG24 · Speciale Senato)',
    hourSlot: 19,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Sky TG24 · Speciale Senato (200 Seggi)',
    institute: 'Quorum',
    client: 'Sky TG24',
    broadcastChannel: 'Sky TG24 ore 19:30',
    directArticleUrl: 'https://quorumresearch.it/sondaggio-skytg24-15102026',
    governmentPortalCode: 'SENATO-2026-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1002,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.7,
      pd: 20.4,
      m5s: 12.0,
      fn: 7.6,
      fi: 7.5,
      avs: 6.5,
      lega: 5.8,
      azione: 3.4,
      iv: 2.4,
      nm: 1.1,
      scn: 1.1,
      altri: 3.0,
    },
    summaryText:
      'Al Senato della Repubblica (200 seggi elettivi), il 55% equivale a 110 senatori. Il Campo Largo con IV conquista la maggioranza assoluta autosufficiente.',
    editorialAnalysis: ['Futuro Nazionale elegge 11 senatori autonomi, Azione 4.'],
    socialText:
      '🏛️ SENATO DELLA REPUBBLICA (200 Seggi):\n• Campo Largo con IV: 110 Seggi (55%)\n• Centrodestra (Escludi Vannacci): 75 Seggi\n• Futuro Nazionale (Vannacci): 11 Seggi\n• Azione: 4 Seggi\n\n#Senato #Stabilicum #SkyTG24',
    hashtags: ['#Senato', '#Stabilicum', '#SkyTG24', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Sky TG24 Diretta', url: 'https://tg24.sky.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 20:00 - TG LA7 ENRICO MENTANA (BAROMETRO SWG)
  // ==========================================
  {
    id: 'news-swg-mentana',
    title: 'Sondaggio SWG (TG La7 · Enrico Mentana): Meloni al 27,7%, Schlein al 20,4%, M5S al 12,1%, Lega al 5,9%',
    subtitle: 'Il barometro serale di Enrico Mentana su La7: campione di 1.200 casi. Centrodestra (escludi Vannacci) a 43,2%. Avs in salute al 6,6%.',
    publishDateTime: '2026-10-17T20:00:00',
    timeSlot: 'Ore 20:00 (TG La7 · Diretta Enrico Mentana)',
    hourSlot: 20,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'TG La7 · SWG Mentana',
    institute: 'SWG',
    client: 'TG La7 / Enrico Mentana',
    broadcastChannel: 'TG La7 ore 20:00 (diretta Mentana)',
    directArticleUrl: 'https://swg.it/politicomilano/tgla7-12-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0920',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1200,
    marginOfError: 2.8,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.2,
    results: {
      fdi: 27.7,
      pd: 20.4,
      m5s: 12.1,
      fn: 7.6,
      fi: 7.4,
      avs: 6.6,
      lega: 5.9,
      azione: 3.3,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il sondaggio del notiziario serale di Enrico Mentana conferma stabilità con micro-oscillazioni: il PD al 20,4% si mantiene solido, Alleanza Verdi-Sinistra consolida il 6,6%.',
    editorialAnalysis: [
      'Enrico Mentana ha dedicato l’editoriale al dualismo tra Lega (5,9%) e Futuro Nazionale di Vannacci (7,6%).',
      'Il Centrodestra (escludi Vannacci) totalizza il 43,2%, confermando la perfetta convergenza con la Supermedia nazionale.',
    ],
    socialText:
      '📺 SONDAGGIO SWG TG LA7 (Mentana - Ore 20:00)\n\n' +
      '• FdI: 27,7%\n' +
      '• PD: 20,4%\n' +
      '• M5S: 12,1%\n' +
      '• FN (Vannacci): 7,6% (Autonomo)\n' +
      '• Lega: 5,9% | FI: 7,4% | AVS: 6,6%\n' +
      '• Azione: 3,3% | IV: 2,4%\n\n' +
      'Centrodestra (Escludi Vannacci): 43,2%\n' +
      '#TGLa7 #SWG #Mentana #Sondaggi',
    hashtags: ['#TGLa7', '#Mentana', '#SWG', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'TG La7 Portale Video', url: 'https://tg.la7.it/sondaggi', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 20:30 - FOCUS PRIMETIME BIPOLARISMO
  // ==========================================
  {
    id: 'news-2030-focus-primetime',
    title: 'Focus Primetime TV: Lo scontro frontale Centrodestra (43,2%) vs Campo Largo (44,5%)',
    subtitle: 'Nei salotti televisivi della sera il duello politico: Fratelli d’Italia mantiene 7 punti sul PD ma le alleanze rovesciano la maggioranza.',
    publishDateTime: '2026-10-17T20:30:00',
    timeSlot: 'Ore 20:30 (Access Prime Time Notiziari)',
    hourSlot: 20,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Prime Time · Duello Bipolare',
    institute: 'Osservatorio Nazionale Talk Show',
    client: 'Rai & Mediaset',
    broadcastChannel: 'Rai 1 & Canale 5',
    directArticleUrl: 'https://www.rai.it',
    governmentPortalCode: 'PT-2026/10-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il confronto numerico certifica la bipolarizzazione della competizione: il Centrodestra (escludi Vannacci, 43,2%) e il Campo Largo con IV (44,5%) concentrano l’87,7% del voto espresso.',
    editorialAnalysis: ['Spazio ridotto per le terze forze che non superano il 3,5%.'],
    socialText:
      '⚡ PRIME TIME: Centrodestra (Escludi Vannacci) 43,2% vs Campo Largo con IV 44,5%. Duello all’ultimo voto. #PrimeTime #Bipolarismo #Sondaggi',
    hashtags: ['#PrimeTime', '#SondaggiPolitici', '#Bipolarismo'],
    sourceLinks: [
      { label: 'Rai Notizie', url: 'https://www.rainews.it', outlet: 'rai' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 21:00 - PIAZZAPULITA LA7 (CORRADO FORMIGLI / EUMETRA)
  // ==========================================
  {
    id: 'news-eumetra-piazzapulita',
    title: 'Sondaggio Eumetra (La7 · Piazzapulita): Vannacci sale al 7,8%, PD al 20,1%, M5S all’11,9%',
    subtitle: 'Nel giovedì sera di La7: Vannacci sale al 7,8%, PD al 20,1%, M5S all’11,9%. Centrodestra (escludi Vannacci) al 43,1%.',
    publishDateTime: '2026-10-17T21:00:00',
    timeSlot: 'Ore 21:00 (La7 - Piazzapulita con Corrado Formigli)',
    hourSlot: 21,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'La7 · Eumetra Piazzapulita',
    institute: 'Eumetra',
    client: 'Piazzapulita / Corrado Formigli (La7)',
    broadcastChannel: 'La7 (Piazzapulita con Corrado Formigli)',
    directArticleUrl: 'https://la7.it/piazzapulita/video/sondaggi-eumetra-15-10-2026',
    governmentPortalCode: 'SP-2026/10-0938',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.1,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.1,
      m5s: 11.9,
      fn: 7.8,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Renato Mannheimer analizza a Piazzapulita i flussi elettorali di Roberto Vannacci, capace di intercettare sia ex astenuti sia delusi del centrodestra tradizionale.',
    editorialAnalysis: [
      'Vannacci tocca il 7,8% autonomo.',
      'Centrodestra (escludi Vannacci) al 43,1% ben saldo.',
    ],
    socialText:
      '📺 SONDAGGIO PIAZZAPULITA (La7 - Formigli)\n\n' +
      '• FdI: 27,8% | PD: 20,1% | M5S: 11,9%\n' +
      '• Vannacci: 7,8% | FI: 7,5% | Lega: 5,7%\n\n' +
      'Centrodestra (Escludi Vannacci): 43,1%\n' +
      '#Piazzapulita #Formigli #Eumetra #Sondaggi',
    hashtags: ['#Piazzapulita', '#Formigli', '#La7', '#Eumetra', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'La7 Piazzapulita', url: 'https://la7.it/piazzapulita', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 21:30 - È SEMPRE CARTABIANCA (RETE 4 / ISTITUTO IXÈ)
  // ==========================================
  {
    id: 'news-ixe-cartabianca',
    title: 'Sondaggio Istituto Ixè (Rete 4 · È Sempre Cartabianca): FdI al 27,8%, PD al 20,3%, M5S al 12,1%',
    subtitle: 'Nel talk show di Bianca Berlinguer il punto sulle alleanze: Centrodestra (escludi Vannacci) al 43,1%.',
    publishDateTime: '2026-10-17T21:30:00',
    timeSlot: 'Ore 21:30 (Rete 4 - È Sempre Cartabianca)',
    hourSlot: 21,
    minuteSlot: 30,
    category: 'talkshow_tv',
    badgeLabel: 'Rete 4 · Ixè Cartabianca Berlinguer',
    institute: 'Istituto Ixè',
    client: 'È Sempre Cartabianca / Bianca Berlinguer',
    broadcastChannel: 'Rete 4 / Mediaset Infinity',
    directArticleUrl: 'https://istitutoixe.it/sondaggi/ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0934',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.1,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.1,
      fn: 7.8,
      fi: 7.4,
      avs: 6.6,
      lega: 5.7,
      azione: 3.3,
      iv: 2.4,
      piueu: 1.6,
      nm: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Il sondaggio presentato da Roberto Baldassari per Bianca Berlinguer conferma il testa a testa politico con Futuro Nazionale al 7,8% autonomo.',
    editorialAnalysis: ['M5S sopra il 12% in tutte le rilevazioni Mediaset.'],
    socialText:
      '📺 SONDAGGIO IXÈ È SEMPRE CARTABIANCA (Rete 4)\n\n' +
      '• FdI: 27,8% | PD: 20,3% | M5S: 12,1%\n' +
      '• FN Vannacci: 7,8% | FI: 7,4% | Lega: 5,7%\n\n' +
      'Centrodestra (Escludi Vannacci): 43,1%\n' +
      '#Cartabianca #Rete4 #Ixe #Berlinguer #Sondaggi',
    hashtags: ['#Cartabianca', '#Rete4', '#Ixe', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Mediaset Cartabianca', url: 'https://mediasetinfinity.mediaset.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 22:00 - QUARTA REPUBBLICA (NICOLA PORRO / TECNÈ)
  // ==========================================
  {
    id: 'news-tecne-mediaset',
    title: 'Sondaggio Tecnè (Mediaset · Quarta Repubblica): FdI vola al 27,9%, Forza Italia sale al 7,8%, PD al 20,3%',
    subtitle: 'Rilevazione di Carlo Buttaroni per Nicola Porro su Rete 4: traino azzurro per la coalizione di Centrodestra (escludi Vannacci) che tocca il 43,7%.',
    publishDateTime: '2026-10-17T22:00:00',
    timeSlot: 'Ore 22:00 (Rete 4 - Quarta Repubblica con Nicola Porro)',
    hourSlot: 22,
    minuteSlot: 0,
    category: 'talkshow_tv',
    badgeLabel: 'Mediaset · Tecnè Quarta Repubblica',
    institute: 'Tecnè',
    client: 'Mediaset / Quarta Repubblica / TG4',
    broadcastChannel: 'Rete 4 / TGcom24 (Nicola Porro)',
    directArticleUrl: 'https://tecne-italia.it/sondaggi/politico-15102026',
    governmentPortalCode: 'SP-2026/10-0935',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1000,
    marginOfError: 3.1,
    cdxEsclusoVannacci: 43.7,
    campoLargoConIV: 44.0,
    results: {
      fdi: 27.9,
      pd: 20.3,
      m5s: 11.8,
      fn: 7.7,
      fi: 7.8,
      avs: 6.4,
      lega: 5.8,
      azione: 3.5,
      iv: 2.3,
      piueu: 1.5,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Nicola Porro commenta l’ascesa di Forza Italia (7,8%) trainata dalla leadership di Tajani nel Mezzogiorno e nei collegi moderati del Nord.',
    editorialAnalysis: ['La maggioranza senza Vannacci tiene al 43,7% nel cartello Tecnè.'],
    socialText:
      '📺 QUARTA REPUBBLICA (Nicola Porro · Rete 4):\n• FdI: 27,9% | FI: 7,8% | PD: 20,3% | FN Vannacci: 7,7%\nCentrodestra (Escludi Vannacci): 43,7%\n\n#QuartaRepubblica #Porro #Tecne #Sondaggi',
    hashtags: ['#QuartaRepubblica', '#NicolaPorro', '#Tecne', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Mediaset Quarta Repubblica', url: 'https://mediasetinfinity.mediaset.it', outlet: 'tv' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 22:30 - FOCUS TALK NOTTE: ROBERTO VANNACCI AUTONOMO
  // ==========================================
  {
    id: 'news-2230-focus-vannacci',
    title: 'Focus Notte: Roberto Vannacci al 7,7% autonomo scuote gli equilibri del centrodestra',
    subtitle: 'Il dibattito notturno sui flussi elettorali: Futuro Nazionale si conferma forza politica indipendente fuori dal governo, negando la maggioranza assoluta a Meloni.',
    publishDateTime: '2026-10-17T22:30:00',
    timeSlot: 'Ore 22:30 (Focus Talk Notte · Rete 4 & La7)',
    hourSlot: 22,
    minuteSlot: 30,
    category: 'il_tempo_libero',
    badgeLabel: 'Focus Notte · Vannacci Autonomo 7,7%',
    institute: 'Osservatorio Notturno Demoscopico',
    client: 'Il Tempo / Talk Notturni',
    broadcastChannel: 'Rete 4 & La7 Notte',
    directArticleUrl: 'https://www.iltempo.it/politica/sondaggi/',
    governmentPortalCode: 'FN-2026/10-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 2.8,
    },
    summaryText:
      'Gli editorialisti discutono l’effetto Vannacci: correndo in solitaria col 7,7%, Futuro Nazionale impedisce al Centrodestra (escludi Vannacci, 43,2%) di conquistare il premio di maggioranza.',
    editorialAnalysis: ['Vannacci ribadisce l’autonomia del suo movimento rispetto a FdI e Lega.'],
    socialText:
      '⚔️ TALK NOTTE: Roberto Vannacci (Futuro Nazionale) blindato al 7,7% autonomo. Centrodestra (Escludi Vannacci) fermo al 43,2%. #Vannacci #FuturoNazionale #Sondaggi',
    hashtags: ['#Vannacci', '#FuturoNazionale', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Il Tempo', url: 'https://www.iltempo.it/politica/sondaggi/', outlet: 'tempo', searchQuery: 'Vannacci Futuro Nazionale Sondaggi' },
      { label: 'Libero Quotidiano', url: 'https://www.liberoquotidiano.it/news/politica/', outlet: 'libero' },
    ],
  },

  // ==========================================
  // 23:00 - ANTEPRIMA NOTTE PORTA A PORTA (RAI 1)
  // ==========================================
  {
    id: 'news-2300-anteprima-portaaporta',
    title: 'Anteprima Porta a Porta (Rai 1 con Bruno Vespa): Il sondaggio esclusivo Only Numbers',
    subtitle: 'Bruno Vespa introduce i cartelli esclusivi realizzati da Alessandra Ghisleri per Rai 1: FdI al 27,8%, sorpasso Campo Largo con IV al 44,5%.',
    publishDateTime: '2026-10-17T23:00:00',
    timeSlot: 'Ore 23:00 (Rai 1 · Anteprima Porta a Porta)',
    hourSlot: 23,
    minuteSlot: 0,
    category: 'porta_a_porta',
    badgeLabel: 'Porta a Porta (Rai 1) · Anteprima Vespa',
    institute: 'Only Numbers',
    client: 'Rai 1 (Porta a Porta con Bruno Vespa)',
    broadcastChannel: 'Rai 1 ore 23:00',
    directArticleUrl: 'https://www.rai.it/programmi/portaa-porta/',
    governmentPortalCode: 'SP-2026/10-0942',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 11.9,
      fn: 7.7,
      fi: 7.6,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      altri: 1.8,
    },
    summaryText:
      'In apertura di trasmissione Bruno Vespa anticipa i cartelli demoscopici di Only Numbers, evidenziando il pareggio nei blocchi e il distacco nel centrosinistra con Renzi.',
    editorialAnalysis: ['Attesa per i dati completi sulle intenzioni di voto.'],
    socialText:
      '📺 ANTEPRIMA PORTA A PORTA (Rai 1 · Bruno Vespa): Cartelli esclusivi Only Numbers in arrivo. #PortaaPorta #BrunoVespa #OnlyNumbers',
    hashtags: ['#PortaaPorta', '#BrunoVespa', '#OnlyNumbers', '#Rai1'],
    sourceLinks: [
      { label: 'Rai 1 · Porta a Porta', url: 'https://www.rai.it/programmi/portaa-porta/', outlet: 'rai' },
      { label: 'RaiPlay', url: 'https://www.raiplay.it/programmi/portaa-porta/', outlet: 'rai' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 23:30 - ONLY NUMBERS PER PORTA A PORTA (RAI 1 / LIBERO QUOTIDIANO / IL TEMPO)
  // ==========================================
  {
    id: 'news-on-porta-a-porta',
    title: 'Sondaggio Only Numbers per Porta a Porta (Rai 1): FdI solido al 27,8%, Sorpasso Campo Largo con IV al 44,5%, Vannacci al 7,7%',
    subtitle: 'Rilevazione di Alessandra Ghisleri per Bruno Vespa su Rai 1, rilanciata da Libero Quotidiano e Il Tempo. Centrodestra (escludi Vannacci) al 43,2%. Conte e Schlein uniti con Renzi avanti di 1,3 punti.',
    publishDateTime: '2026-10-17T23:30:00',
    timeSlot: 'Ore 23:30 (Rai 1 - Porta a Porta & Libero Quotidiano / Il Tempo)',
    hourSlot: 23,
    minuteSlot: 30,
    category: 'porta_a_porta',
    badgeLabel: 'Porta a Porta (Rai 1) · Only Numbers',
    institute: 'Only Numbers',
    client: 'Rai 1 (Porta a Porta con Bruno Vespa) / Libero Quotidiano & Il Tempo',
    broadcastChannel: 'Rai 1 (Porta a Porta), RaiPlay, Libero Quotidiano & Il Tempo',
    directArticleUrl: 'https://www.liberoquotidiano.it/news/politica/sondaggio-only-numbers-porta-a-porta-ottobre-2026',
    governmentPortalCode: 'SP-2026/10-0935',
    isSupermediaWeeklyRelease: false,
    sampleSize: 1500,
    marginOfError: 2.5,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 11.9,
      fn: 7.7,
      fi: 7.6,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      progettocivico: 0.9,
      piuuno: 0.8,
      altri: 1.8,
    },
    summaryText:
      'Nella puntata di Porta a Porta su Rai 1 condotta da Bruno Vespa, i cartelli Only Numbers (ripresi da Libero Quotidiano e Il Tempo) mostrano un testa a testa serratissimo: Fratelli d’Italia al 27,8% garantisce la tenuta della premier, ma il Centrodestra (escludi Vannacci) si ferma al 43,2% contro il 44,5% del Campo Largo con Matteo Renzi.',
    editorialAnalysis: [
      'Fonte diretta accreditata: interviste campionarie CATI-CAMI-CAWI su 1.500 casi maggiorenni depositate presso la Presidenza del Consiglio.',
      'Libero Quotidiano titola sul "sorpasso di misura della sinistra se Renzi entra nella coalizione", mentre Il Tempo rimarca l’autonomia di Futuro Nazionale che corre in solitaria al 7,7%.',
      'Forza Italia supera la Lega (7,6% vs 5,7%) e si conferma secondo perno moderato del Centrodestra.',
      'Il Partito Liberaldemocratico di Marattin viene censito all’1,4%, evidenziando un bacino fedele e anticollusivo rispetto ai due poli.',
      'Progetto Civico (0,9%) e Più Uno (0,8%) completano il Campo Largo a trazione PD-M5S.',
    ],
    socialText:
      '📺 SONDAGGIO ONLY NUMBERS PER PORTA A PORTA (Rai 1 & Libero Quotidiano / Il Tempo)\n\n' +
      '• FdI: 27,8%\n' +
      '• PD: 20,3%\n' +
      '• M5S: 11,9%\n' +
      '• Futuro Nazionale (Vannacci): 7,7% (Autonomo)\n' +
      '• Forza Italia: 7,6%\n' +
      '• AVS: 6,5%\n' +
      '• Lega: 5,7%\n' +
      '• Azione: 3,4%\n' +
      '• Italia Viva: 2,4%\n' +
      '• PLD (Marattin da solo): 1,4%\n\n' +
      '🔥 Centrodestra (Escludi Vannacci): 43,2%\n' +
      '⚡ Campo Largo con IV: 44,5% (+1,3%)\n\n' +
      '#PortaaPorta #OnlyNumbers #LiberoQuotidiano #IlTempo #Rai1 #Sondaggi',
    hashtags: ['#PortaaPorta', '#OnlyNumbers', '#LiberoQuotidiano', '#IlTempo', '#BrunoVespa', '#SondaggiPolitici'],
    sourceLinks: [
      { label: 'Libero Quotidiano (Articolo & Analisi)', url: 'https://www.liberoquotidiano.it/news/politica/sondaggio-only-numbers-porta-a-porta-ottobre-2026', outlet: 'libero', searchQuery: 'Only Numbers Porta a Porta Libero Quotidiano' },
      { label: 'Il Tempo (Cartelli Completi)', url: 'https://www.iltempo.it/politica/sondaggi/only-numbers-porta-a-porta', outlet: 'tempo', searchQuery: 'Only Numbers Porta a Porta Il Tempo' },
      { label: 'Rai 1 · Porta a Porta (RaiPlay)', url: 'https://www.rai.it/programmi/portaa-porta/', outlet: 'rai' },
      { label: 'Sondaggi Politico Elettorali (Presidenza del Consiglio SP-2026/10-0935)', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },

  // ==========================================
  // 00:00 (MEZZANOTTE) - CHIUSURA FLUSSO DEMOSCOPICO 24H
  // ==========================================
  {
    id: 'news-0000-chiusura-giornata',
    title: 'Chiusura Giornaliera Mezzanotte: Riepilogo Flusso Demoscopico 24h (2 sondaggi ogni ora)',
    subtitle: 'Si conclude il ciclo di aggiornamento continuo iniziato alle 08:00 del mattino: 34 rilevazioni e approfondimenti demoscopici monitorati. La Supermedia ufficiale settimanale esce ogni sabato alle 09:00.',
    publishDateTime: '2026-10-17T23:59:59',
    timeSlot: 'Ore 00:00 (Mezzanotte · Chiusura Flusso 24h)',
    hourSlot: 24,
    minuteSlot: 0,
    category: 'supermedia_settimanale',
    badgeLabel: 'Chiusura Flusso 24h · 2 per Ora',
    institute: 'Osservatorio Flusso Continuo Demoscopico',
    client: 'Sintesi Notturna',
    broadcastChannel: 'Tutte le fonti broadcast e rassegna stampa',
    directArticleUrl: '/data/sondaggi_settimana_17_ottobre_2026.csv',
    governmentPortalCode: 'NIGHT-2026-W42',
    isSupermediaWeeklyRelease: false,
    sampleSize: 13902,
    marginOfError: 1.1,
    cdxEsclusoVannacci: 43.2,
    campoLargoConIV: 44.5,
    results: {
      fdi: 27.8,
      pd: 20.3,
      m5s: 12.0,
      fn: 7.7,
      fi: 7.5,
      avs: 6.5,
      lega: 5.7,
      azione: 3.4,
      iv: 2.4,
      piueu: 1.6,
      pld: 1.4,
      nm: 1.1,
      scn: 1.1,
      progettocivico: 0.9,
      piuuno: 0.8,
      altri: 1.8,
    },
    summaryText:
      'Il flusso continuo dalle 08:00 alle 00:00 (2 per ora) conferma l’equilibrio dell’elettorato italiano. Il barometro demoscopico riprenderà alle ore 08:00 con l’apertura delle edicole, mentre la Supermedia ufficiale viene rilasciata ogni sabato alle ore 09:00.',
    editorialAnalysis: [
      'Inclusi entrambi i sondaggi Only Numbers: per Porta a Porta (Rai 1 / Libero Quotidiano) e per Realpolitik (Rete 4 / Il Tempo).',
      'Centrodestra (escludi Vannacci): 43,2% costante.',
      'Campo Largo con IV: 44,5%.',
    ],
    socialText:
      '🌙 CHIUSURA FLUSSO DEMOSCOPICO 24H (08:00 - 00:00):\n• FdI: 27,8% | PD: 20,3% | M5S: 12,0% | FN Vannacci: 7,7%\n• Centrodestra (Escludi Vannacci): 43,2%\n• Campo Largo con IV: 44,5%\n\nLa Supermedia settimanale esce ogni sabato alle ore 09:00!\n\n#Supermedia #Notte #SondaggiPolitici',
    hashtags: ['#Supermedia', '#SondaggiPolitici', '#PoliticaItaliana'],
    sourceLinks: [
      { label: 'Dataset CSV Completo', url: '/data/sondaggi_settimana_17_ottobre_2026.csv', outlet: 'web' },
      { label: 'Sondaggi Politico Elettorali', url: 'https://www.sondaggipoliticoelettorali.it', outlet: 'governo' },
    ],
  },
];

/**
 * Returns available poll news according to the continuous hourly stream (08:00 to 00:00, 2 per hour)
 */
export function getNewsBySimulatedHour(hour: number, minute: number = 30): PollNewsItem[] {
  // If hour === 24, user wants all releases of the 24h day
  if (hour >= 24) {
    return POLLS_NEWS_FEED;
  }

  return POLLS_NEWS_FEED.filter((item) => {
    // If it's the weekly Supermedia, available from 09:00 onwards
    if (item.isSupermediaWeeklyRelease) {
      return hour >= 9;
    }
    if (item.hourSlot < hour) return true;
    if (item.hourSlot === hour && item.minuteSlot <= minute) return true;
    return false;
  });
}
