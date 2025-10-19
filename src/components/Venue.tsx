import React from 'react';
import type { WeddingContent } from '@/types/content';

const VenueMap = React.lazy(() => import('./VenueMap'));

interface VenueProps {
  venue: WeddingContent['venue'];
}

export function Venue({ venue }: VenueProps) {
  return (
    <section id="venue" className="venue container" aria-labelledby="venue-title">
      <div className="venue__card postcard">
        <div className="venue__content">
          <h2 id="venue-title" className="section-heading">{venue.title}</h2>
          <h3 className="venue__name">{venue.name}</h3>
          <p>{venue.description}</p>
          <address className="venue__address">
            {venue.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <ul className="venue__travel">
            {venue.travelTips.map((tip) => (
              <li key={`${tip.mode}-${tip.detail}`}>
                <span className="venue__travel-mode">{tip.mode}</span>
                <span className="venue__travel-detail">{tip.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <React.Suspense fallback={<div className="venue__map-skeleton" aria-hidden="true" /> }>
          <VenueMap embedUrl={venue.map.embedUrl} title={venue.map.iframeTitle} />
        </React.Suspense>
      </div>
    </section>
  );
}

export default Venue;
