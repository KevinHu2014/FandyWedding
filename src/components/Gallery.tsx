import React from 'react';
import type { WeddingContent } from '@/types/content';

interface GalleryProps {
  gallery: WeddingContent['gallery'];
}

export default function Gallery({ gallery }: GalleryProps) {
  return (
    <section id="gallery" className="gallery container" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="section-heading">{gallery.title}</h2>
      <p className="gallery__intro">{gallery.intro}</p>
      {gallery.images.length > 0 ? (
        <div className="gallery__grid">
          {gallery.images.map((image) => (
            <figure key={image.src} className="gallery__item">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      ) : (
        <p className="gallery__placeholder">Photos coming soon — check back after the celebration!</p>
      )}
    </section>
  );
}
