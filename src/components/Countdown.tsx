import React from 'react';
import type { WeddingContent } from '@/types/content';

interface CountdownProps {
  countdown: WeddingContent['countdown'];
}

interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getRemainingTime(target: Date): RemainingTime {
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function Countdown({ countdown }: CountdownProps) {
  const targetDate = React.useMemo(() => new Date(countdown.eventDate), [countdown.eventDate]);
  const [timeLeft, setTimeLeft] = React.useState<RemainingTime>(() => getRemainingTime(targetDate));

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getRemainingTime(targetDate));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [targetDate]);

  const eventHasPassed = targetDate.getTime() <= Date.now();

  return (
    <section className="countdown container" aria-labelledby="countdown-title">
      <div className="countdown__card postcard" role="group" aria-live="polite">
        <h2 id="countdown-title" className="section-heading">
          {countdown.title}
        </h2>
        {eventHasPassed ? (
          <p className="countdown__message">The big day has sailed by — thank you for celebrating with us!</p>
        ) : (
          <div className="countdown__grid">
            {(
              [
                { label: countdown.labels.days, value: timeLeft.days },
                { label: countdown.labels.hours, value: timeLeft.hours },
                { label: countdown.labels.minutes, value: timeLeft.minutes },
                { label: countdown.labels.seconds, value: timeLeft.seconds }
              ] as const
            ).map((item) => (
              <div key={item.label} className="countdown__item">
                <span className="countdown__value" aria-label={`${item.value} ${item.label}`}>
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="countdown__label">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Countdown;
