import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  MapPin,
  CheckCircle2,
  Maximize2,
  X,
  Layers,
  Eye,
  Home,
  HardHat,
} from 'lucide-react';
import { GALLERY_PROJECTS } from '../data/servicesData';
import { GalleryProject } from '../types';

export const BeforeAfterGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({
    'metal-lino-ecole': 50,
    'four-degraissage': 50,
    'vitrerie-grande-hauteur': 50,
    'moquette-injection': 50,
    'jardin-tonte': 50,
    'sol-parquet-carrelage': 50,
  });
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const handleSliderChange = (id: string, value: number) => {
    setSliderPositions((prev) => ({ ...prev, [id]: value }));
  };

  const filteredProjects = activeFilter === 'all'
    ? GALLERY_PROJECTS
    : GALLERY_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="realisations" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Témoins de notre savoir-faire
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Nos Réalisations sur le Terrain à Isère et Savoie
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            Découvrez en images la rigueur et l'efficacité des interventions menées par AMN : glissez le curseur pour comparer l'état initial et le résultat final.
          </p>

          {/* Filter tabs - Touch friendly wrapping */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              Tous les chantiers ({GALLERY_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('sols')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'sols'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              Traitement de Sol
            </button>
            <button
              onClick={() => setActiveFilter('vitrerie')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'vitrerie'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              Vitrerie Grande Hauteur
            </button>
            <button
              onClick={() => setActiveFilter('remise-en-etat')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'remise-en-etat'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              Remise en État
            </button>
            <button
              onClick={() => setActiveFilter('chalets-exterieur')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'chalets-exterieur'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
            >
              Jardins & Abords
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const pos = sliderPositions[project.id] ?? 50;

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Interactive Before/After visual container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900 select-none group">
                    {/* "After" Image (Base layer) */}
                    <img
                      src={project.afterImg}
                      alt={`${project.title} - Après`}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* "Before" Image (Clipped overlay) */}
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none"
                      style={{ width: `${pos}%` }}
                    >
                      <img
                        src={project.beforeImg}
                        alt={`${project.title} - Avant`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: '100%', minWidth: '100%', height: '100%' }}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-lg pointer-events-none z-10"
                      style={{ left: `${pos}%` }}
                    >
                      {/* Drag Handle Button */}
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl border-2 border-amber-400 flex items-center justify-center font-bold text-xs pointer-events-none">
                        <Sliders className="w-3.5 h-3.5 rotate-90 text-amber-600" />
                      </div>
                    </div>

                    {/* Labels: Avant vs Après */}
                    <div className="absolute top-3 left-3 z-20 pointer-events-none">
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-slate-950/85 text-white px-2 sm:px-2.5 py-0.5 rounded shadow">
                        Avant
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-20 pointer-events-none">
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-emerald-600/90 text-white px-2 sm:px-2.5 py-0.5 rounded shadow">
                        Après AMN
                      </span>
                    </div>

                    {/* Expand icon button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-3 right-3 z-20 bg-slate-950/80 hover:bg-slate-950 text-white p-2 sm:p-1.5 rounded-lg opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
                      title="Voir en grand"
                    >
                      <Maximize2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  {/* Interactive Slider Bar beneath image - does not block vertical touch scrolling */}
                  <div className="px-4 pt-3 pb-1 bg-slate-50 border-b border-slate-100 flex items-center gap-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
                      Avant
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pos}
                      onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-ew-resize accent-amber-500 touch-pan-x"
                      aria-label={`Glissière avant après pour ${project.title}`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 shrink-0">
                      Après
                    </span>
                  </div>

                  {/* Project Details */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                        {project.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {project.location}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Techniques badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techniques.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                        >
                          • {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer instruction */}
                <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Glissez la barre pour comparer</span>
                  <span className="font-semibold text-amber-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Résultat 100% garanti
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real photo gallery callout mentioning Aymen's real tools */}
        {/* <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Technique & Rigueur AMN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Des interventions réalisées avec le matériel adéquat
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Monobrosse Wirbel 154 pour le décapage de carrelages et thermoplastiques, aspirateur à eau haute puissance, perches télescopiques en fibre de carbone pour vitres jusqu'à 15 mètres et travail certifié sur nacelle élévatrice avec harnais antichute.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold px-5 py-3 rounded-xl transition-all shadow-md text-sm flex items-center gap-2 active:scale-95"
          >
            <span>Confier votre projet à AMN</span>
          </a>
        </div>*/}
      </div> 

      {/* Lightbox Modal - Mobile Responsive */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3.5 sm:p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              {selectedProject.categoryLabel}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
              {selectedProject.title}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              {selectedProject.location}
            </p>

            {/* Side by side preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Avant intervention :
                </span>
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={selectedProject.beforeImg}
                    alt="Avant"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1 italic">
                  {selectedProject.beforeDesc}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Après travail AMN :
                </span>
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-emerald-500/30">
                  <img
                    src={selectedProject.afterImg}
                    alt="Après"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-xs text-emerald-700 mt-1 font-medium">
                  {selectedProject.afterDesc}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              {selectedProject.techniques.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                >
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
