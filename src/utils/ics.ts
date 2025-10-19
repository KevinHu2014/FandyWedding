interface IcsDetails {
  start: string;
  end: string;
  title: string;
  description: string;
  location: string;
}

function toUtc(date: string): string {
  const iso = new Date(date).toISOString();
  return iso.replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function buildIcs(details: IcsDetails) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FandyRob//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTAMP:${toUtc(new Date().toISOString())}`,
    `DTSTART:${toUtc(details.start)}`,
    `DTEND:${toUtc(details.end)}`,
    `SUMMARY:${details.title}`,
    `DESCRIPTION:${details.description.replace(/\r?\n/g, '\\n')}`,
    `LOCATION:${details.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return lines.join('\r\n');
}

export function downloadIcs(details: IcsDetails, filename = 'wedding-invite.ics') {
  const blob = new Blob([buildIcs(details)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
