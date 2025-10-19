import React from 'react';
import type { WeddingContent } from '@/types/content';

interface TravelStayProps {
  travelStay: WeddingContent['travelStay'];
}

export function TravelStay({ travelStay }: TravelStayProps) {
  return (
    <section id="travel" className="travel container" aria-labelledby="travel-title">
      <div className="travel__wrapper postcard">
        <div className="travel__intro">
          <h2 id="travel-title" className="section-heading">{travelStay.title}</h2>
          <p>{travelStay.intro}</p>
        </div>
        <div className="travel__grid">
          <div>
            <h3 className="travel__subheading">Getting there</h3>
            <ul className="travel__list">
              {travelStay.travel.map((item) => (
                <li key={`${item.mode}-${item.detail}`}>
                  <span className="travel__label">{item.mode}</span>
                  {item.link ? (
                    <a href={item.link} className="travel__detail">
                      {item.detail}
                    </a>
                  ) : (
                    <span className="travel__detail">{item.detail}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="travel__subheading">Places to stay</h3>
            <ul className="travel__list">
              {travelStay.stay.map((item) => (
                <li key={item.name}>
                  <span className="travel__label">{item.name}</span>
                  <span className="travel__detail">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelStay;
