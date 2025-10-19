import React from 'react';
import type { Language } from '@/types/content';

interface LanguageSwitcherProps {
  language: Language;
  onChange: (language: Language) => void;
}

const LABELS: Record<Language, string> = {
  en: 'English',
  'zh-Hant': '繁體中文'
};

export function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  return (
    <div className="language-switcher" role="group" aria-label="Language selector">
      {(Object.keys(LABELS) as Language[]).map((lang) => {
        const isActive = language === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => onChange(lang)}
            className={isActive ? 'language-switcher__btn language-switcher__btn--active' : 'language-switcher__btn'}
            aria-pressed={isActive}
          >
            {LABELS[lang]}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
