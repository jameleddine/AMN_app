import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/servicesData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Avis & Confiance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Ce que disent nos clients à Grenoble & en Isère
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            Syndics, gestionnaires immobiliers, artisans du BTP et propriétaires de chalets font confiance à la rigueur d'Aymen Mejri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    5.0 / 5
                  </span>
                </div>

                <Quote className="w-8 h-8 text-amber-200 mb-2" />

                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.role}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded whitespace-nowrap">
                    {item.service}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
