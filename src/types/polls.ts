export interface Party {
  id: string;
  name: string;
  shortName: string;
  leader: string;
  coalition: 'governo' | 'opposizione' | 'centro' | 'altri';
  coalitionLabel: string;
  color: string;
  accentBg: string;
  borderStroke: string;
  eurogroup: string;
  founded: string;
  headquarters: string;
  description: string;
  parliamentaryGroup: string;
}

export type SurveyMethod = 'CATI-CAMI-CAWI' | 'CAWI' | 'CATI-CAWI' | 'Misto';

export interface PollRecord {
  id: string;
  institute: string;
  client: string;
  sampleDate: string;
  publishDate: string; // ISO format: YYYY-MM-DD
  sampleSize: number;
  method: SurveyMethod;
  marginOfError: number;
  results: Record<string, number>;
  directSourceUrl: string;
  broadcastChannel: string;
  officialDelayDays: number;
  governmentPortalCode: string;
  notes?: string;
}

export interface SupermediaRelease {
  id: string;
  date: string;
  isoDate: string;
  referenceWindow: string;
  previousDate: string;
  description: string;
  institutesCount: number;
  pollsIncludedIds: string[];
  partyAverages: Record<string, { percent: number; variation: number }>;
  coalitions: {
    governo: { total: number; variation: number; label: string };
    governoConVannacci: { total: number; variation: number; label: string };
    opposizioneCampoLargo: { total: number; variation: number; label: string };
    centrosinistraConIV?: { total: number; variation: number; label: string };
    centroRiformista: { total: number; variation: number; label: string };
  };
  turnout: {
    turnoutEstimate: number;
    undecidedAndAbstain: number;
  };
}

export interface InstituteInfo {
  id: string;
  name: string;
  headOfResearch: string;
  category: 'talkshow' | 'istituto' | 'registro_aggregatore';
  broadcastOutlet: string;
  tvChannel?: string;
  showHost?: string;
  portalSection?: string;
  usualPublishTime: string;
  averageDelayOnGovSite: string;
  methodologyOverview: string;
  reliabilityRating: string;
  website: string;
}
