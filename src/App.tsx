import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import OurStory from '@/components/OurStory';
import Schedule from '@/components/Schedule';
import Venue from '@/components/Venue';
import TravelStay from '@/components/TravelStay';
import Registry from '@/components/Registry';
import FAQ from '@/components/FAQ';
import RSVP from '@/components/RSVP';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { loadContent } from '@/utils/mergeContent';
import { downloadIcs } from '@/utils/ics';
import type { Language, WeddingContent } from '@/types/content';

const GallerySection = React.lazy(() => import('@/components/Gallery'));

const STORAGE_KEY = 'fandy-rob-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'zh-Hant') {
    return stored;
  }
  const browser = window.navigator.language.toLowerCase();
  if (browser.includes('zh')) {
    return 'zh-Hant';
  }
  return 'en';
}

function useLanguage(): [Language, (lang: Language) => void] {
  const [language, setLanguage] = React.useState<Language>(() => getInitialLanguage());

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant';
  }, [language]);

  return [language, setLanguage];
}

function updateMetaTags(content: WeddingContent, language: Language) {
  if (typeof document === 'undefined') return;
  const { title, description, meta } = content.site;
  document.title = title;

  const ensureTag = (selector: string, attribute: 'content', value: string) => {
    const tag = document.head.querySelector(selector);
    if (tag) {
      tag.setAttribute(attribute, value);
    }
  };

  ensureTag('meta[name="description"]', 'content', description);
  ensureTag('meta[property="og:title"]', 'content', title);
  ensureTag('meta[property="og:description"]', 'content', description);
  ensureTag('meta[property="og:image"]', 'content', meta.ogImage);
  ensureTag('meta[property="og:locale"]', 'content', language === 'en' ? 'en_GB' : 'zh_TW');
  ensureTag('meta[name="twitter:title"]', 'content', title);
  ensureTag('meta[name="twitter:description"]', 'content', description);
}

export default function App() {
  const [language, setLanguage] = useLanguage();
  const content = React.useMemo(() => loadContent(language), [language]);

  React.useEffect(() => {
    updateMetaTags(content, language);
  }, [content, language]);

  const navItems = React.useMemo(
    () => [
      { href: '#our-story', label: content.ourStory.title },
      { href: '#schedule', label: content.schedule.title },
      { href: '#venue', label: content.venue.title },
      { href: '#travel', label: content.travelStay.title },
      { href: '#registry', label: content.registry.title },
      { href: '#faq', label: content.faq.title },
      { href: '#rsvp', label: content.rsvp.title }
    ],
    [content]
  );

  const handleDownloadIcs = React.useCallback(() => {
    downloadIcs(content.misc.ics, 'fandy-rob-wedding.ics');
  }, [content.misc.ics]);

  return (
    <div className="app">
      <Nav
        brand={content.hero.names}
        items={navItems}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main id="main">
        <Hero hero={content.hero} onDownloadIcs={handleDownloadIcs} />
        <Countdown countdown={content.countdown} />
        <OurStory ourStory={content.ourStory} />
        <Schedule schedule={content.schedule} />
        <Venue venue={content.venue} />
        <TravelStay travelStay={content.travelStay} />
        <Registry registry={content.registry} />
        <FAQ faq={content.faq} />
        <React.Suspense fallback={<div className="gallery-skeleton" aria-hidden="true" />}>
          <GallerySection gallery={content.gallery} />
        </React.Suspense>
        <RSVP rsvp={content.rsvp} />
        <Contact contact={content.contact} />
      </main>
      <Footer footer={content.footer} />
    </div>
  );
}
