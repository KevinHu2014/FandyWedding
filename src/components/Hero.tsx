import React from 'react';
import type { WeddingContent } from '@/types/content';

interface HeroProps {
  hero: WeddingContent['hero'];
  onDownloadIcs: () => void;
}

export function Hero({ hero, onDownloadIcs }: HeroProps) {
  const handleSecondary = () => {
    if (hero.ctaSecondary.action === 'ics') {
      onDownloadIcs();
    } else if (hero.ctaSecondary.action === 'scroll') {
      document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero container" aria-labelledby="hero-title">
      <p className="hero__overline">{hero.overline}</p>
      <h1 id="hero-title" className="hero__title">{hero.names}</h1>
      <p className="hero__kicker">{hero.date}</p>
      {hero.description ? <p className="hero__lead">{hero.description}</p> : null}
      <div className="hero__cta">
        <a className="btn btn-primary" href={hero.ctaPrimary.href}>
          {hero.ctaPrimary.label}
        </a>
        <button className="btn btn-secondary" type="button" onClick={handleSecondary}>
          {hero.ctaSecondary.label}
        </button>
      </div>
      <div className="wave" aria-hidden="true" />
    </section>
  );
}

export default Hero;
