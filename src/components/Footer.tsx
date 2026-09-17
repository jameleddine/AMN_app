import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/servicesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-md">
                AMN
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  AMN Nettoyage
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  Grenoble & Isère (38000)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Entreprise spécialisée dans la remise en état, le nettoyage après travaux, le traitement des sols à la monobrosse, la vitrerie grande hauteur, l'entretien des chalets alpins et le débarras de parkings.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-white block">
                Gérant & Intervenant :
              </span>
              <span className="text-xs text-slate-300">
                {COMPANY_INFO.founder}
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Nos Prestations
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-amber-400 transition-colors">
                    • {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Intervention Zone */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Zone d'Intervention (38)
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Déplacements rapides 7j/7 avec véhicule et matériel embarqué :
            </p>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• Grenoble Centre & Agglomération (38000)</li>
              <li>• Saint-Martin-d'Hères, Échirolles, Meylan</li>
              <li>• Fontaine, Sassenage, Saint-Égrève</li>
              <li>• Crolles & Vallée du Grésivaudan</li>
              <li>• Voironnais & Bièvre</li>
              <li>• Stations : Chamrousse, Alpe d'Huez, 2 Alpes</li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Coordonnées Directes
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="font-bold text-white hover:text-amber-300 transition-colors"
                >
                  {COMPANY_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-300 hover:text-amber-300 transition-colors break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-medium"
                >
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AMN Nettoyage & Remise en État. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Grenoble (38000) • France</span>
            <span>•</span>
            <span className="text-slate-400">Artisan Propreté & Rénovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
