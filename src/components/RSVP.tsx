import React from 'react';
import type { WeddingContent } from '@/types/content';
import { track } from '@/utils/analytics';

interface RSVPProps {
  rsvp: WeddingContent['rsvp'];
}

export function RSVP({ rsvp }: RSVPProps) {
  const handleClick = () => {
    track('rsvp_click');
  };

  return (
    <section id="rsvp" className="rsvp container" aria-labelledby="rsvp-title">
      <div className="rsvp__card postcard">
        <h2 id="rsvp-title" className="section-heading">{rsvp.title}</h2>
        <p>{rsvp.intro}</p>
        <p className="rsvp__deadline">{rsvp.deadline}</p>
        <a className="btn btn-primary" href={rsvp.formUrl} target="_blank" rel="noreferrer" onClick={handleClick}>
          {rsvp.buttonLabel}
        </a>
      </div>
    </section>
  );
}

export default RSVP;
