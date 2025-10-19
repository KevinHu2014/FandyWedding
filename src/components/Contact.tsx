import React from 'react';
import type { WeddingContent } from '@/types/content';

interface ContactProps {
  contact: WeddingContent['contact'];
}

export function Contact({ contact }: ContactProps) {
  return (
    <section id="contact" className="contact container" aria-labelledby="contact-title">
      <div className="contact__card postcard">
        <h2 id="contact-title" className="section-heading">{contact.title}</h2>
        <p>{contact.note}</p>
        <ul className="contact__list">
          {contact.people.map((person) => (
            <li key={person.name} className="contact__person">
              <h3 className="contact__name">{person.name}</h3>
              <p className="contact__role">{person.role}</p>
              <ul className="contact__methods">
                {person.email ? (
                  <li>
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                  </li>
                ) : null}
                {person.phone ? (
                  <li>
                    <a href={`tel:${person.phone.replace(/\s+/g, '')}`}>{person.phone}</a>
                  </li>
                ) : null}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
