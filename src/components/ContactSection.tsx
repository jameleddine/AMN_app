import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  QrCode,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/servicesData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Remise en état');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Nouveau contact AMN - ${service} - ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nService souhaité: ${service}\nMessage:\n${message}`
    );
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 border border-amber-200 px-3 py-1 rounded-full">
            Contact Direct & Devis
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Contactez AMN Nettoyage à Grenoble
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mt-2 sm:mt-3">
            Vous avez un projet de remise en état, un sol à traiter ou une fin de chantier ? Aymen Mejri vous répond personnellement dans la journée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left: Contact Info & QR Code Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-xl border border-slate-800">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-black text-xl text-slate-950 shadow-md">
                  AMN
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {COMPANY_INFO.fullName}
                  </h3>
                  <p className="text-xs text-amber-300">
                    Gérant : {COMPANY_INFO.founder}
                  </p>
                </div>
              </div>

              {/* Direct Info list */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Téléphone direct :</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-base font-bold text-white hover:text-amber-300 transition-colors"
                    >
                      {COMPANY_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Adresse email :</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-semibold text-white hover:text-amber-300 transition-colors break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Siège & Localisation :</span>
                    <span className="font-semibold text-white">
                      {COMPANY_INFO.location}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Interventions sur toute la métropole de Grenoble et le département de l'Isère (38).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Horaires de disponibilité :</span>
                    <span className="font-semibold text-white">
                      {COMPANY_INFO.hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Scannable WhatsApp Box */}
              <div className="mt-7 sm:mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shrink-0 shadow">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="28" height="28" fill="black" />
                    <rect x="14" y="14" width="20" height="20" fill="white" />
                    <rect x="18" y="18" width="12" height="12" fill="black" />
                    <rect x="62" y="10" width="28" height="28" fill="black" />
                    <rect x="66" y="14" width="20" height="20" fill="white" />
                    <rect x="70" y="18" width="12" height="12" fill="black" />
                    <rect x="10" y="62" width="28" height="28" fill="black" />
                    <rect x="14" y="66" width="20" height="20" fill="white" />
                    <rect x="18" y="70" width="12" height="12" fill="black" />
                    <rect x="42" y="14" width="6" height="6" fill="black" />
                    <rect x="52" y="14" width="6" height="6" fill="black" />
                    <rect x="42" y="24" width="6" height="6" fill="black" />
                    <rect x="52" y="32" width="6" height="6" fill="black" />
                    <rect x="10" y="44" width="6" height="6" fill="black" />
                    <rect x="22" y="44" width="6" height="6" fill="black" />
                    <rect x="34" y="44" width="6" height="6" fill="black" />
                    <rect x="44" y="44" width="12" height="12" fill="#25D366" />
                    <rect x="62" y="44" width="6" height="6" fill="black" />
                    <rect x="74" y="44" width="6" height="6" fill="black" />
                    <rect x="84" y="44" width="6" height="6" fill="black" />
                    <rect x="44" y="62" width="6" height="6" fill="black" />
                    <rect x="54" y="70" width="6" height="6" fill="black" />
                    <rect x="64" y="62" width="6" height="6" fill="black" />
                    <rect x="74" y="72" width="6" height="6" fill="black" />
                    <rect x="84" y="82" width="6" height="6" fill="black" />
                    <rect x="50" y="82" width="6" height="6" fill="black" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    WhatsApp Direct
                  </span>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Scannez ou cliquez pour démarrer une conversation immédiate.
                  </p>
                  <a
                    href={COMPANY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1 rounded-lg mt-2 transition-colors active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Ouvrir le chat
                  </a>
                </div>
              </div>
            </div>

            {/* Quick area list */}
            <div className="mt-7 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Villes et secteurs d'intervention fréquents :
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                {SERVICE_AREAS.slice(0, 8).map((area, idx) => (
                  <span key={idx} className="bg-white/10 px-2 py-0.5 rounded">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Direct Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Envoyer un message à Aymen Mejri
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Réponse assurée sous 2 à 24 heures maximum
                  </p>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Devis 100% gratuit
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Sophie Martin"
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 XX XX XX XX"
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.com"
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service concerné
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm font-medium"
                    >
                      <option value="Remise en état">Remise en état complète</option>
                      <option value="Nettoyage après travaux">Nettoyage après travaux / Fin de chantier</option>
                      <option value="Traitement de sol">Traitement de sol & Monobrosse</option>
                      <option value="Vitrerie grande hauteur">Vitrerie grande hauteur & Verrières</option>
                      <option value="Chalets de montagne">Nettoyage & Remise en état de Chalets</option>
                      <option value="Débarras garages et parkings">Débarras & Nettoyage Garages / Parkings</option>
                      <option value="Espaces verts">Entretien extérieur & Espaces verts</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Votre message & description de la situation *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Indiquez l'adresse ou la ville, la surface approximative, les contraintes d'accès ou vos délais..."
                    className="w-full text-sm bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Envoyer mon message à Aymen Mejri</span>
                </button>
              </form>
            </div>

            {sent && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-medium text-center">
                ✓ Votre message a été préparé pour transmission à {COMPANY_INFO.email}.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
