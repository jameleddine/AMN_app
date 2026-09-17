import React from 'react';
import { ShieldCheck, HardHat, Wrench, Droplets, Zap, Sparkles } from 'lucide-react';

export const EquipmentAndSafety: React.FC = () => {
  const equipments = [
    {
      title: 'Nacelle Élévatrice & Sécurité Hauteur',
      desc: 'Habilitation certifiée pour l\'opération de plateformes élévatrices de personnes. Port du harnais de sécurité antichute complet et respect strict des normes de sécurité pour les façades et verrières complexes.',
      icon: HardHat,
      badge: 'Sécurité Maximale',
      highlight: 'Intervention sécurisée jusqu\'à plus de 20 mètres',
    },
    {
      title: 'Perches Télescopiques Carbone (15m)',
      desc: 'Système d\'alimentation en eau pure déminéralisée par perches ultra-légères en fibre de carbone. Nettoyage écologique sans produit corrosif, séchage sans aucune trace de calcaire, même en plein soleil.',
      icon: Droplets,
      badge: 'Eau Pure & Zéro Trace',
      highlight: 'Idéal verrières, atriums et baies inaccessibles',
    },
    {
      title: 'Monobrosse Industrielle Wirbel 154',
      desc: 'Machine professionnelle à entraînement par engrenages pour le décapage intensif de carrelages, dégraissage de sols thermoplastiques, lustrage et cristallisation. Utilisation de disques abrasifs adaptés.',
      icon: Wrench,
      badge: 'Rénovation Sols',
      highlight: 'Décapage et lustrage ultra-haute vitesse',
    },
    {
      title: 'Injecteur-Extracteur Haute Pression',
      desc: 'Technologie de pulvérisation-aspiration pour le traitement en profondeur des fibres de moquettes, tapis, canapés et sièges de bureau. Élimination des acariens, bactéries et odeurs tenaces.',
      icon: Zap,
      badge: 'Textiles & Moquettes',
      highlight: 'Séchage rapide et assainissement complet',
    },
  ];

  return (
    <section id="expertise" className="py-14 sm:py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Parc Matériel & Engagements
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            La Précision Technique au Service de la Propreté
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            Le résultat exceptionnel d'un nettoyage dépend autant de l'expérience humaine que de la qualité du matériel mobilisé. Chez AMN, chaque chantier bénéficie d'outils industriels certifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {equipments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance banner */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-around gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="text-left">
              <span className="text-sm font-bold text-slate-900 block">Assurance Responsabilité Civile Pro</span>
              <span className="text-xs text-slate-500">Tous vos biens et locaux sont protégés et couverts</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Wrench className="w-8 h-8 text-orange-500 shrink-0" />
            <div className="text-left">
              <span className="text-sm font-bold text-slate-900 block">Autonomie Totale d'Intervention</span>
              <span className="text-xs text-slate-500">Véhicule utilitaire équipé pour toute la région grenobloise</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-500 shrink-0" />
            <div className="text-left">
              <span className="text-sm font-bold text-slate-900 block">Produits Certifiés & Éco-Conçus</span>
              <span className="text-xs text-slate-500">Efficacité radicale sans odeurs toxiques persistantes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
