import React, { useState } from 'react';
import { PARTIES, LATEST_SUPERMEDIA } from '../data/politicalData';
import { PartyLogo } from './PartyLogo';
import { TrendingUp, TrendingDown, Minus, Building, Globe, Users } from 'lucide-react';

interface PartiesDirectoryViewProps {
  selectedPartyId?: string;
  onSelectParty: (id: string) => void;
}

export const PartiesDirectoryView: React.FC<PartiesDirectoryViewProps> = ({
  selectedPartyId,
  onSelectParty,
}) => {
  const [filterCoalition, setFilterCoalition] = useState<string>('all');

  const release = LATEST_SUPERMEDIA;

  const partyList = Object.keys(PARTIES).map((id) => {
    const party = PARTIES[id];
    const avg = release.partyAverages[id] || { percent: 0, variation: 0 };
    return {
      ...party,
      percent: avg.percent,
      variation: avg.variation,
    };
  });

  const filteredParties = partyList.filter((p) => {
    if (filterCoalition !== 'all' && p.coalition !== filterCoalition) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          I Partiti Politici Italiani & Simboli Ufficiali
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Repertorio grafico vettoriale degli emblemi elettorali depositati al Ministero dell'Interno, collocazione
          parlamentare e consensi aggiornati.
        </p>
      </div>

      {/* Coalition Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-fit">
        {[
          { id: 'all', label: 'Tutti i Partiti' },
          { id: 'governo', label: 'Maggioranza di Governo' },
          { id: 'opposizione', label: 'Opposizioni / Campo Largo' },
          { id: 'centro', label: 'Polo di Centro' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCoalition(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterCoalition === tab.id
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Parties Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParties.map((party) => {
          const isSelected = selectedPartyId === party.id;
          const isPositive = party.variation > 0;
          const isNegative = party.variation < 0;

          return (
            <div
              key={party.id}
              onClick={() => onSelectParty(party.id)}
              className={`bg-white rounded-xl border transition-all p-5 shadow-xs flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'ring-2 ring-slate-900 border-slate-900 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header: Logo & Identity */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <PartyLogo partyId={party.id} size="xl" className="shadow-xs" />
                    <div>
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {party.name}
                      </h2>
                      <div className="text-xs text-slate-500 font-medium">{party.shortName}</div>
                    </div>
                  </div>

                  {/* Percentage in Supermedia */}
                  <div className="text-right">
                    <div className="text-2xl font-extrabold font-mono tabular-nums text-slate-900">
                      {party.percent.toFixed(1)}%
                    </div>
                    <div className="flex items-center justify-end text-xs font-mono tabular-nums font-semibold">
                      {isPositive && (
                        <span className="text-emerald-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5 inline" />+{party.variation.toFixed(1)}
                        </span>
                      )}
                      {isNegative && (
                        <span className="text-rose-600 flex items-center">
                          <TrendingDown className="w-3 h-3 mr-0.5 inline" />{party.variation.toFixed(1)}
                        </span>
                      )}
                      {!isPositive && !isNegative && (
                        <span className="text-slate-400 flex items-center">
                          <Minus className="w-3 h-3 mr-0.5 inline" />0,0
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Party Details */}
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Leader / Segretario:</span>
                    <span className="font-semibold text-slate-900">{party.leader}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Coalizione:</span>
                    <span className="font-medium text-slate-800">{party.coalitionLabel}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Gruppo Europeo:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[170px]" title={party.eurogroup}>
                      {party.eurogroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400 font-medium">Anno di fondazione:</span>
                    <span className="font-mono text-slate-800">{party.founded}</span>
                  </div>

                  <p className="pt-2 text-slate-600 leading-relaxed text-xs line-clamp-3">
                    {party.description}
                  </p>
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{party.headquarters}</span>
                <span className="font-semibold text-slate-700">Scheda completa</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
