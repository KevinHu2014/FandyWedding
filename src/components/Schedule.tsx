import React from 'react';
import type { WeddingContent } from '@/types/content';

interface ScheduleProps {
  schedule: WeddingContent['schedule'];
}

export function Schedule({ schedule }: ScheduleProps) {
  return (
    <section id="schedule" className="schedule container" aria-labelledby="schedule-title">
      <h2 id="schedule-title" className="section-heading">{schedule.title}</h2>
      {schedule.subtitle ? <p className="schedule__subtitle">{schedule.subtitle}</p> : null}
      <div className="schedule__grid">
        {schedule.items.map((item) => (
          <article key={`${item.time}-${item.title}`} className="schedule__item postcard">
            <span className="schedule__time" aria-label={`Starts at ${item.time}`}>
              {item.time}
            </span>
            <h3 className="schedule__heading">{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      {schedule.note ? <p className="schedule__note">{schedule.note}</p> : null}
    </section>
  );
}

export default Schedule;
