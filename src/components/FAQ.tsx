import React from 'react';
import type { WeddingContent } from '@/types/content';

interface FAQProps {
  faq: WeddingContent['faq'];
}

export function FAQ({ faq }: FAQProps) {
  return (
    <section id="faq" className="faq container" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-heading">{faq.title}</h2>
      <div className="faq__items">
        {faq.items.map((item, index) => (
          <details key={item.question} className="faq__item" open={index === 0}>
            <summary>
              <span className="faq__question">{item.question}</span>
            </summary>
            <p className="faq__answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
