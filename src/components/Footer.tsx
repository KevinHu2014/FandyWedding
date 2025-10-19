import React from 'react';
import type { WeddingContent } from '@/types/content';

interface FooterProps {
  footer: WeddingContent['footer'];
}

export function Footer({ footer }: FooterProps) {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="bunting-divider" aria-hidden="true" />
      <div className="footer__inner container">
        <p className="footer__tagline">{footer.tagline}</p>
        <p className="footer__rights">{footer.rights}</p>
      </div>
    </footer>
  );
}

export default Footer;
