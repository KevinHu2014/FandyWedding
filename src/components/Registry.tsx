import React from 'react';
import type { WeddingContent } from '@/types/content';

interface RegistryProps {
  registry: WeddingContent['registry'];
}

export function Registry({ registry }: RegistryProps) {
  return (
    <section id="registry" className="registry container" aria-labelledby="registry-title">
      <div className="registry__card postcard">
        <h2 id="registry-title" className="section-heading">{registry.title}</h2>
        <p>{registry.intro}</p>
        {registry.options.length > 0 && (
          <ul className="registry__list">
            {registry.options.map((option) => (
              <li key={option.label}>
                <span className="registry__label">{option.label}</span>
                <span className="registry__detail">{option.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Registry;
