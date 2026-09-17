import React, { useState } from 'react';
import {
  Sparkles,
  HardHat,
  Layers,
  Eye,
  Home,
  Warehouse,
  TreePine,
  CheckCircle,
  ArrowRight,
  Wrench,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenQuote: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_LIST[0]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'HardHat':
        return <HardHat className="w-6 h-6 text-orange-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-amber-600" />;
      case 'Eye':
        return <Eye className="w-6 h-6 text-yellow-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-orange-600" />;
      case 'Warehouse':
        return <Warehouse className="w-6 h-6 text-slate-700" />;
      case 'TreePine':
        return <TreePine className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="services" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Nos Prestations Spécialisées
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Des Solutions de Propreté Complètes à Isère et Savoie
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            AMN mobilise un parc de matériel industriel de pointe pour répondre à toutes vos exigences de remise à neuf, d'entretien régulier ou de fin de chantier.
          </p>
        </div>

        {/* Services Grid (All 6 core services + espaces verts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {SERVICES_LIST.map((service) => {
            const isSelected = selectedService.id === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-lg ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md transform -translate-y-1'
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div>
                  {/* Top line with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Short Desc */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Key bullet points */}
                  <ul className="space-y-2 mb-5 sm:mb-6">
                    {service.bulletPoints.slice(0, 3).map((bp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-amber-700 flex items-center gap-1 group-hover:underline">
                    Détails techniques
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote(service.id);
                    }}
                    className="text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
                  >
                    Devis gratuit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detailed Focus Box */}
        
          
      </div>
    </section>
  );
};
