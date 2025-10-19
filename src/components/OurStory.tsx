import React from 'react';
import type { WeddingContent } from '@/types/content';

interface OurStoryProps {
  ourStory: WeddingContent['ourStory'];
}

export function OurStory({ ourStory }: OurStoryProps) {
  return (
    <section id="our-story" className="story container" aria-labelledby="story-title">
      <div className="story__inner postcard">
        <h2 id="story-title" className="section-heading">{ourStory.title}</h2>
        <p>{ourStory.intro}</p>
        {ourStory.timeline.length > 0 && (
          <ol className="story__timeline">
            {ourStory.timeline.map((entry) => (
              <li key={`${entry.year}-${entry.headline}`} className="story__milestone">
                <span className="story__year">{entry.year}</span>
                <h3 className="story__headline">{entry.headline}</h3>
                <p className="story__description">{entry.description}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default OurStory;
