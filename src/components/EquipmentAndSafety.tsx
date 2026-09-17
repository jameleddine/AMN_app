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
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200"></section>
  );
};
