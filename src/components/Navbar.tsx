import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Menu, X, Sparkles, Clock, ShieldCheck, MailCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

interface NavbarProps {
  onOpenQuote: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-bar for quick contact info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Disponible 7j/7 • Isère et Savoie & Agglo (38000)
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Isère et Savoie (38000), Isère & Stations Alpines
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              7h00 - 20h00
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              title="SIRET"
            >
              <MailCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.siret}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              title="Envoyer un email à AMN"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              title="Discuter sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp Direct</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 font-bold text-slate-950 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-3 py-1 rounded-full transition-all shadow-sm"
            >
              <Phone className="w-3 h-3 fill-slate-950" />
              <span>{COMPANY_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`px-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3 border-b border-slate-200'
            : 'bg-white/90 backdrop-blur-sm py-3 sm:py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg sm:text-xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              AMN
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight">
                  AMN
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 px-1.5 sm:px-2 py-0.5 rounded-md">
                  Isère et Savoie 38
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden xs:block">
                Nettoyage Pro • Remise en État • Sols & Vitres
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-700">
            <a href="#video-presentation" className="hover:text-amber-600 transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Présentation Vidéo
            </a>
            <a href="#services" className="hover:text-amber-600 transition-colors">
              Nos Services
            </a>
            <a href="#realisations" className="hover:text-amber-600 transition-colors">
              Réalisations Avant / Après
            </a>
            <a href="#chalets" className="hover:text-amber-600 transition-colors">
              Chalets Alpins
            </a>
            <a href="#expertise" className="hover:text-amber-600 transition-colors">
              Équipement Pro
            </a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenQuote()}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              Devis Gratuit (24h)
            </button>
          </div>

          {/* Mobile hamburger button - comfortable 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center"
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-3 space-y-2 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="flex flex-col space-y-1 text-sm font-medium text-slate-800">
              <a
                href="#video-presentation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between min-h-[44px]"
              >
                <span>Vidéo de Présentation</span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">En haut</span>
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Nos 6 Services Experts & Jardin
              </a>
              <a
                href="#realisations"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Photos Avant / Après Interactives
              </a>
              <a
                href="#chalets"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Spécial Chalets de Montagne (Isère)
              </a>
              <a
                href="#expertise"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Matériel Pro (Monobrosse, Nacelle)
              </a>
              <a
                href="#simulateur"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Simulateur de Devis Gratuit
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 min-h-[44px] flex items-center"
              >
                Coordonnées & QR Code WhatsApp
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3 rounded-xl text-center shadow-md flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                Demander un devis immédiat
              </button>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 text-sm min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Appeler : {COMPANY_INFO.phoneFormatted}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
