import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVideoSection } from './components/HeroVideoSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { ChaletSpecialSection } from './components/ChaletSpecialSection';
import { EquipmentAndSafety } from './components/EquipmentAndSafety';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Phone, MessageCircle, Sparkles, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from './data/servicesData';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleOpenQuote = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForQuote(serviceId);
    }
    const element = document.getElementById('simulateur');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Content Sections - with mobile-safe bottom padding so sticky mobile bar does not overlap content */}
      <main className="flex-1 pb-20 md:pb-0">
        {/* 1. Hero Section with Video at the top */}
        <HeroVideoSection onOpenQuote={handleOpenQuote} />

        {/* 2. Services Section (6 core services + espaces verts) */}
        <ServicesSection onOpenQuote={handleOpenQuote} />

        {/* 3. Before & After Photo Gallery with interactive comparison sliders */}
        <BeforeAfterGallery />

        {/* 4. Alpine Mountain Chalets Special Feature */}
        <ChaletSpecialSection onOpenQuote={handleOpenQuote} />

        {/* 5. Industrial Equipment & Safety Credentials */}
        {/* <EquipmentAndSafety /> */}

        {/* 6. Testimonials from Isère et Savoie & Isère */}
        <TestimonialsSection />

        {/* 7. Instant Interactive Quote Calculator */}
        <QuoteCalculator initialServiceId={selectedServiceForQuote} />

        {/* 8. Contact Section with Email, Phone, Location & WhatsApp QR Code */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile Sticky Action Bar - optimized for smartphone touch & safe areas */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl safe-area-pb">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-2.5 px-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          <span>Appel Direct</span>
        </a>

        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => handleOpenQuote()}
          className="bg-slate-900 hover:bg-slate-800 text-amber-400 p-2.5 rounded-xl text-xs flex items-center justify-center shrink-0 active:scale-95 transition-all"
          title="Devis instantané"
          aria-label="Ouvrir le simulateur de devis"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        </button>
      </div>

      {/* Back to top button on desktop */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-110"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <SpeedInsights />
    </div>
    
  );
}
