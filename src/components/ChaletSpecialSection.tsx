import React from 'react';
import { Home, Mountain, Sparkles, CheckCircle2, Shield, Calendar, ArrowRight, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface ChaletSpecialSectionProps {
  onOpenQuote: (serviceId?: string) => void;
}

export const ChaletSpecialSection: React.FC<ChaletSpecialSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="chalets" className="py-14 sm:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Presentation */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Savoir-Faire Alpin • Isère & Stations
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Nettoyage & Remise en État des <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">Chalets de Montagne</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Basé à Isère et Savoie, AMN intervient au cœur des stations alpines et des massifs isérois (Chamrousse, Alpe d'Huez, Les 2 Alpes, Vercors, Belledonne). Les résidences de montagne exigent un soin méticuleux pour préserver l'authenticité de leurs matériaux nobles tout en offrant un standing irréprochable aux résidents et vacanciers.
            </p>

            {/* Chalet specific features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  Soin des Boiseries & Parquets
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dépoussiérage des charpentes apparentes en hauteur, traitement et cire nourrissante pour les bois et parquets massifs.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  Baies Panoramiques Vue Sommets
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Nettoyage haute précision des grandes surfaces vitrées et garde-corps vitrés pour admirer les sommets sans aucune trace.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  Turn-Over Avant / Après Saison
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Remise à blanc complète avant l'ouverture de l'hiver ou après l'été, désinfection de la literie, des saunas et spas.
                </p>
              </div>

              <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  Service Conciergerie & Particuliers
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Partenaire de confiance pour propriétaires de résidences secondaires, conciergeries Airbnb et agences de location en station.
                </p>
              </div>
            </div>

            {/* Action buttons - full width on small mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={() => onOpenQuote('chalets')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
              >
                <span>Devis pour votre chalet</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3 rounded-xl border border-slate-700 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Contact Direct : {COMPANY_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6">
              <div className="aspect-4/3 rounded-xl overflow-hidden mb-4 sm:mb-5 relative group">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
                  alt="Chalet alpin dans les Alpes grenobloises"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <span className="text-xs font-bold text-slate-950 bg-amber-400 backdrop-blur-sm px-3 py-1 rounded-md">
                    Isère & Stations Alpines
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Stations et secteurs desservis régulièrement :
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Chamrousse</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Alpe d'Huez</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Les Deux Alpes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Villard-de-Lans (Vercors)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Autrans-Méaudre</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Massif de Belledonne</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Saint-Pierre-de-Chartreuse</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Pays de l'Oisans</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-800 text-center">
                <span className="text-xs text-slate-400">
                  Déplacement possible avec équipement de montagne adapté (pneus neige & matériel embarqué).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
