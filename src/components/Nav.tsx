import React from 'react';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';
import type { Language } from '@/types/content';

interface NavItem {
  href: string;
  label: string;
}

interface NavProps {
  items: NavItem[];
  brand: string;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Nav({ items, brand, language, onLanguageChange }: NavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const navId = React.useId();

  const toggleMenu = () => setIsOpen((state) => !state);
  const closeMenu = () => setIsOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="nav">
        <div className="nav__brand" aria-label="Home">
          <span className="nav__mark" aria-hidden="true">⚓︎</span>
          <span className="nav__name">{brand}</span>
        </div>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls={navId}
          onClick={toggleMenu}
        >
          <span className="hidden-visually">Toggle navigation</span>
          <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
        </button>
        <div id={navId} className={clsx('nav__menu', isOpen && 'nav__menu--open')}>
          <ul className="nav__list">
            {items.map((item) => (
              <li key={item.href} className="nav__item">
                <a className="nav__link" href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher language={language} onChange={onLanguageChange} />
        </div>
      </nav>
    </header>
  );
}

export default Nav;
