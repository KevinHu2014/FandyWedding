export type Language = 'en' | 'zh-Hant';

export interface TimelineEntry {
  year: string;
  headline: string;
  description: string;
}

export interface ScheduleEntry {
  time: string;
  title: string;
  description: string;
}

export interface TravelEntry {
  mode: string;
  detail: string;
  link?: string;
}

export interface StayEntry {
  name: string;
  detail: string;
  link?: string;
}

export interface RegistryOption {
  label: string;
  description: string;
  url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WeddingContent {
  site: {
    title: string;
    description: string;
    meta: {
      eventDate: string;
      timezone: string;
      location: string;
      ogImage: string;
    };
  };
  hero: {
    overline: string;
    names: string;
    date: string;
    description?: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; action: 'ics' | 'scroll' };
  };
  countdown: {
    title: string;
    eventDate: string;
    timezone: string;
  };
  ourStory: {
    title: string;
    intro: string;
    timeline: TimelineEntry[];
  };
  schedule: {
    title: string;
    subtitle?: string;
    items: ScheduleEntry[];
    note?: string;
  };
  venue: {
    title: string;
    name: string;
    description: string;
    addressLines: string[];
    travelTips: TravelEntry[];
    map: {
      iframeTitle: string;
      embedUrl: string;
    };
  };
  travelStay: {
    title: string;
    intro: string;
    travel: TravelEntry[];
    stay: StayEntry[];
  };
  registry: {
    title: string;
    intro: string;
    options: RegistryOption[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  rsvp: {
    title: string;
    intro: string;
    buttonLabel: string;
    formUrl: string;
    deadline: string;
  };
  gallery: {
    title: string;
    intro: string;
    images: GalleryImage[];
  };
  contact: {
    title: string;
    note: string;
    people: ContactPerson[];
  };
  footer: {
    tagline: string;
    rights: string;
  };
  misc: {
    eventDate: string;
    ics: {
      start: string;
      end: string;
      title: string;
      description: string;
      location: string;
    };
  };
}
