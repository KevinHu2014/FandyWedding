import React from 'react';

interface VenueMapProps {
  embedUrl: string;
  title: string;
}

export default function VenueMap({ embedUrl, title }: VenueMapProps) {
  return (
    <div className="venue__map-frame">
      <iframe
        title={title}
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
