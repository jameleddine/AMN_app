import React, { useState } from 'react';
import {
  Sparkles,
  Calculator,
  Send,
  MessageCircle,
  Phone,
  CheckCircle,
  HelpCircle,
  Clock,
  MapPin,
  Mail,
  User,
  Building,
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_LIST } from '../data/servicesData';

interface QuoteCalculatorProps {
  initialServiceId?: string;
  onSuccess?: () => void;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ initialServiceId }) => {
  const [serviceId, setServiceId] = useState<string>(initialServiceId || 'remise-en-etat');
  const [surface, setSurface] = useState<number>(65);
  const [clientType, setClientType] = useState<'particulier' | 'pro' | 'syndic'>('particulier');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [needWindows, setNeedWindows] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [locationCity, setLocationCity] = useState<string>('Isère et Savoie');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Approximate cost estimation algorithm for guidance
  const calculateEstimate = () => {
    let baseRatePerM2 = 4.5;
    let baseFixed = 90;

    switch (serviceId) {
      case 'remise-en-etat':
        baseRatePerM2 = 4.2;
        baseFixed = 110;
        break;
      case 'apres-travaux':
        baseRatePerM2 = 5.2;
        baseFixed = 140;
        break;
      case 'traitement-de-sol':
        baseRatePerM2 = 6.0;
        baseFixed = 120;
        break;
      case 'vitrerie':
        baseRatePerM2 = 3.8;
        baseFixed = 80;
        break;
      case 'chalets':
        baseRatePerM2 = 4.8;
        baseFixed = 150;
        break;
      case 'debarras-garages':
        baseRatePerM2 = 3.5;
        baseFixed = 100;
        break;
      case 'espaces-verts':
        baseRatePerM2 = 2.8;
        baseFixed = 90;
        break;
      default:
        baseRatePerM2 = 4.0;
        baseFixed = 100;
    }

    let estimatedTotal = baseFixed + surface * baseRatePerM2;
    if (urgency === 'urgent') estimatedTotal *= 1.2;
    if (needWindows && serviceId !== 'vitrerie') estimatedTotal += 45;

    const minEst = Math.round(estimatedTotal * 0.9);
    const maxEst = Math.round(estimatedTotal * 1.15);

    return { minEst, maxEst };
  };

  const { minEst, maxEst } = calculateEstimate();

  const currentServiceObj = SERVICES_LIST.find((s) => s.id === serviceId) || SERVICES_LIST[0];

  const buildMessageContent = () => {
    return `Bonjour Aymen (AMN Nettoyage),
Je souhaite recevoir un devis pour mes locaux :
- Service demandé : ${currentServiceObj.title}
- Surface approximative : ${surface} m²
- Profil client : ${clientType === 'particulier' ? 'Particulier' : clientType === 'pro' ? 'Entreprise / Commerce' : 'Copropriété / Syndic'}
- Délai d'intervention : ${urgency === 'urgent' ? 'Urgent (sous 24h-48h)' : 'Standard (planifié)'}
- Nettoyage vitres inclus : ${needWindows ? 'Oui' : 'Non'}
- Ville / Secteur : ${locationCity} (38)
- Estimation indicative : entre ${minEst} € et ${maxEst} €

Mes coordonnées :
- Nom : ${name || 'Non précisé'}
- Téléphone : ${phone || 'Non précisé'}
- Email : ${email || 'Non précisé'}
- Précisions : ${notes || 'Aucune'}

Merci d'avance pour votre retour rapide.`;
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande de Devis AMN : ${currentServiceObj.title} (${surface} m²) - ${locationCity}`);
    const body = encodeURIComponent(buildMessageContent());
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(buildMessageContent());
    window.open(`https://wa.me/33630725779?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="simulateur" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Transparence & Réactivité
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Simulateur de Devis Gratuit en Ligne
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            Estimez instantanément le budget de votre nettoyage à Isère et Savoie, personnalisez vos options et transmettez votre demande en 1 clic directement à AMN.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Configuration Form (7 cols) */}
            <div className="lg:col-span-7 p-5 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-5 sm:mb-6">
                <Calculator className="w-5 h-5 text-amber-500" />
                1. Paramétrez votre besoin
              </h3>

              <form onSubmit={handleSendEmail} className="space-y-5 sm:space-y-6">
                {/* Prestation selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Type de prestation
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Surface range slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Surface à traiter
                    </label>
                    <span className="text-sm sm:text-base font-extrabold text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                      {surface} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="350"
                    step="5"
                    value={surface}
                    onChange={(e) => setSurface(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>Studio (15 m²)</span>
                    <span>Appartement / Villa (100 m²)</span>
                    <span>Locaux / Bâtiment (350+ m²)</span>
                  </div>
                </div>

                {/* Profile and Urgency toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Vous êtes :
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setClientType('particulier')}
                        className={`py-2 rounded-lg transition-all cursor-pointer ${
                          clientType === 'particulier' ? 'bg-white text-amber-900 font-bold shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Particulier
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientType('pro')}
                        className={`py-2 rounded-lg transition-all cursor-pointer ${
                          clientType === 'pro' ? 'bg-white text-amber-900 font-bold shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Entreprise
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientType('syndic')}
                        className={`py-2 rounded-lg transition-all cursor-pointer ${
                          clientType === 'syndic' ? 'bg-white text-amber-900 font-bold shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Syndic
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Délai souhaité :
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setUrgency('normal')}
                        className={`py-2 rounded-lg transition-all cursor-pointer ${
                          urgency === 'normal' ? 'bg-white text-amber-900 font-bold shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        type="button"
                        onClick={() => setUrgency('urgent')}
                        className={`py-2 rounded-lg transition-all cursor-pointer ${
                          urgency === 'urgent' ? 'bg-white text-red-600 font-bold shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        Urgent 24-48h
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional option checkbox */}
                <div className="flex items-start gap-3 bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="needWindows"
                    checked={needWindows}
                    onChange={(e) => setNeedWindows(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-amber-600 rounded focus:ring-amber-500 border-slate-300"
                  />
                  <label htmlFor="needWindows" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer leading-relaxed">
                    Inclure le lavage intégral de la vitrerie et des encadrements (+ vitres int/ext)
                  </label>
                </div>

                {/* User Info Inputs */}
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    2. Vos coordonnées pour réponse sous 24h
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Votre nom complet *"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Numéro de téléphone *"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Votre email *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Ville (ex: Isère et Savoie 38000)"
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <textarea
                      placeholder="Détails du chantier (facultatif : état des lieux, présence d'un ascenseur, salissures particulières...)"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit button via Email */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
                >
                  <Mail className="w-4 h-4" />
                  <span>Envoyer ma demande de devis à AMN</span>
                </button>
              </form>
            </div>

            {/* Right: Instant Estimation Summary (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 sm:p-8 text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Estimation Immédiate
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Fourchette Indicative
                </h3>

                {/* Price Display */}
                <div className="my-5 sm:my-6 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                      {minEst} € – {maxEst} €
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Fourchette estimée pour {surface} m² de surface traitée avec matériel professionnel inclus.
                  </p>
                </div>

                {/* Summary details */}
                <div className="space-y-2.5 sm:space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Prestation sélectionnée :</span>
                    <span className="font-semibold text-white text-right">{currentServiceObj.title}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Surface totale :</span>
                    <span className="font-semibold text-white">{surface} m²</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Secteur géographique :</span>
                    <span className="font-semibold text-white">{locationCity} (38)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-400">Délai :</span>
                    <span className={`font-semibold ${urgency === 'urgent' ? 'text-amber-300' : 'text-white'}`}>
                      {urgency === 'urgent' ? 'Urgent sous 24-48h' : 'Standard'}
                    </span>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-[11px] text-amber-200">
                  ℹ️ Cette estimation est sans engagement. Le tarif final est validé suite à un échange téléphonique ou visite sur site.
                </div>
              </div>

              {/* Fast Direct Channels */}
              <div className="pt-5 sm:pt-6 border-t border-white/10 space-y-2.5 sm:space-y-3 mt-6">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Transmettre sur WhatsApp (+33630725779)</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Appeler directement : {COMPANY_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation banner if submitted */}
        {submitted && (
          <div className="mt-6 max-w-xl mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center animate-fadeIn">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-emerald-900">
              Demande pré-remplie avec succès !
            </h4>
            <p className="text-xs text-emerald-800 mt-1">
              Votre message a été transmis à AMN ({COMPANY_INFO.email}). Vous recevrez une réponse sous 24h ouvrées.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
