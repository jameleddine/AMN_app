export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  bulletPoints: string[];
  equipment: string[];
  idealFor: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'sols' | 'vitrerie' | 'aprestravaux' | 'remise-en-etat' | 'chalets-exterieur';
  categoryLabel: string;
  location: string;
  description: string;
  techniques: string[];
  hasBeforeAfter: boolean;
  beforeImg: string;
  afterImg: string;
  beforeDesc?: string;
  afterDesc?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  service: string;
  date: string;
}

export interface QuoteFormState {
  serviceId: string;
  surface: number;
  location: string;
  timeframe: string;
  clientType: 'particulier' | 'professionnel' | 'syndic';
  name: string;
  phone: string;
  email: string;
  details: string;
}
