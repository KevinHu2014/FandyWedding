import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.resolve(__dirname, '../public/wedding-info.pdf');
const outputPath = path.resolve(__dirname, '../src/content/data.json');

interface ExtractedSections {
  overview: string[];
  schedule: string[];
  venue: string[];
  travel: string[];
  stay: string[];
  registry: string[];
  faq: string[];
  contact: string[];
  story: string[];
}

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

const sectionMatchers: Array<{ key: keyof ExtractedSections; patterns: RegExp[]; label: string }> = [
  { key: 'overview', patterns: [/^overview$/i, /^welcome/i, /^introduction/i], label: 'Overview' },
  { key: 'schedule', patterns: [/schedule/i, /timeline/i, /itinerary/i], label: 'Schedule' },
  { key: 'venue', patterns: [/^venue$/i, /^ceremony/i, /location/i, /bandstand/i], label: 'Venue' },
  { key: 'travel', patterns: [/^travel/i, /^getting there/i, /^transport/i], label: 'Travel' },
  { key: 'stay', patterns: [/^stay$/i, /accommodation/i, /where to stay/i], label: 'Stay' },
  { key: 'registry', patterns: [/registry/i, /gifts?/i], label: 'Registry' },
  { key: 'faq', patterns: [/faq/i, /questions/i], label: 'FAQ' },
  { key: 'contact', patterns: [/contact/i, /get in touch/i], label: 'Contact' },
  { key: 'story', patterns: [/our story/i, /about us/i], label: 'Our Story' }
];

const defaultSections: ExtractedSections = {
  overview: [],
  schedule: [],
  venue: [],
  travel: [],
  stay: [],
  registry: [],
  faq: [],
  contact: [],
  story: []
};

const monthRegex = /(January|February|March|April|May|June|July|August|September|October|November|December)/i;

const cleanup = (value: string) => value.replace(/\s+/g, ' ').trim();

async function readPdfLines(): Promise<string[]> {
  const data = await fs.readFile(pdfPath);
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - pdfjs-dist expects workerSrc but Node does not use it
  pdfjs.GlobalWorkerOptions.workerSrc = path.join('node_modules', 'pdfjs-dist', 'build', 'pdf.worker.js');

  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(data),
    useWorkerFetch: false,
    isEvalSupported: false,
    disableFontFace: true
  });

  const pdf = await loadingTask.promise;
  const lines: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent({ normalizeWhitespace: true });
    const pageLines: string[] = [];

    let currentLine = '';
    content.items.forEach((item) => {
      if ('str' in item) {
        const text = cleanup(item.str);
        if (!text) {
          return;
        }
        const needsBreak = /[.!?]$/.test(text) || text.length > 40;
        currentLine = currentLine ? `${currentLine} ${text}`.trim() : text;
        if (needsBreak) {
          pageLines.push(currentLine);
          currentLine = '';
        }
      }
    });
    if (currentLine) {
      pageLines.push(currentLine);
    }

    lines.push(...pageLines);
  }

  return lines.map(cleanup).filter(Boolean);
}

function detectSections(lines: string[]): ExtractedSections {
  const sections: ExtractedSections = { ...defaultSections };
  let currentKey: keyof ExtractedSections = 'overview';

  lines.forEach((line) => {
    const match = sectionMatchers.find((matcher) => matcher.patterns.some((pattern) => pattern.test(line)));
    if (match) {
      currentKey = match.key;
      return;
    }
    sections[currentKey].push(line);
  });

  return sections;
}

function pickLine(lines: string[], matcher: RegExp): string | undefined {
  return lines.find((line) => matcher.test(line));
}

function buildSchedule(items: string[]): { parsed: ScheduleItem[]; remainder: string[] } {
  const parsed: ScheduleItem[] = [];
  const remainder: string[] = [];

  items.forEach((line) => {
    const match = line.match(/^(?<time>\d{1,2}[:\.]\d{2}(?:\s?(?:am|pm|AM|PM))?)(?:\s*[\-–—]\s*)?(?<rest>.+)$/);
    if (match?.groups) {
      const titleSplit = match.groups.rest.split(/\s+-\s+|:\s+/);
      parsed.push({
        time: match.groups.time.replace('.', ':'),
        title: cleanup(titleSplit[0] ?? match.groups.rest),
        description: cleanup(titleSplit.slice(1).join(' - '))
      });
      return;
    }
    remainder.push(line);
  });

  return { parsed, remainder };
}

(async () => {
  try {
    const lines = await readPdfLines();
    const sections = detectSections(lines);

    const namesLine = pickLine(lines, /\s&\s/) ?? 'Our Seaside Wedding';
    const dateLine = pickLine(lines, monthRegex) ?? 'Saturday, 18 July 2026';
    const locationLine = pickLine(lines, /(Brighton|UK|United Kingdom|England|Bandstand)/i) ?? 'Brighton, UK';

    const { parsed: scheduleItems, remainder: scheduleRemainder } = buildSchedule(sections.schedule);

    const baseContent = {
      extractedAt: new Date().toISOString(),
      site: {
        title: `${namesLine} — Wedding Weekend`,
        description: sections.overview.join(' '),
        meta: {
          eventDate: dateLine,
          timezone: 'Europe/London',
          location: locationLine,
          ogImage: '/social-card.png'
        }
      },
      hero: {
        overline: locationLine,
        names: namesLine,
        date: dateLine,
        description: sections.overview.slice(0, 2).join(' '),
        ctaPrimary: { label: 'RSVP', href: '#rsvp' },
        ctaSecondary: { label: 'Add to Calendar', action: 'ics' }
      },
      countdown: {
        title: 'Countdown to the Ceremony',
        eventDate: '2026-07-18T13:00:00+01:00',
        timezone: 'Europe/London'
      },
      ourStory: {
        title: 'Our Story',
        intro: sections.story.join(' '),
        timeline: sections.story.map((entry, index) => ({
          year: `${index + 1}`,
          headline: entry,
          description: entry
        }))
      },
      schedule: {
        title: 'Wedding Day Schedule',
        subtitle: '',
        items: scheduleItems,
        note: scheduleRemainder.join(' ')
      },
      venue: {
        title: 'Venue',
        name: sections.venue[0] ?? locationLine,
        description: sections.venue.slice(1).join(' '),
        addressLines: [locationLine],
        travelTips: sections.travel.map((line) => ({ mode: line, tips: line })),
        map: {
          iframeTitle: 'Venue map',
          embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2536.1245877327706!2d-0.15488!3d50.819526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875850d8bfddad9%3A0xa6f76235f41eb119!2sBrighton%20Bandstand!5e0!3m2!1sen!2suk!4v1700000000000'
        }
      },
      travelStay: {
        title: 'Travel & Stay',
        intro: sections.travel.concat(sections.stay).join(' '),
        travel: sections.travel.map((line) => ({ mode: line, detail: line })),
        stay: sections.stay.map((line) => ({ name: line, detail: line }))
      },
      registry: {
        title: 'Registry',
        intro: sections.registry.join(' '),
        options: sections.registry.map((line) => ({ label: line, description: line }))
      },
      faq: {
        title: 'FAQ',
        items: sections.faq.map((line) => ({ question: line, answer: line }))
      },
      rsvp: {
        title: 'RSVP',
        intro: sections.overview.slice(-2).join(' '),
        buttonLabel: 'Open RSVP Form',
        formUrl: '#',
        deadline: dateLine
      },
      gallery: {
        title: 'Gallery',
        intro: 'Memories from the seaside.',
        images: []
      },
      contact: {
        title: 'Contact',
        note: sections.contact.join(' '),
        people: sections.contact.map((line) => ({ name: line, role: '' }))
      },
      footer: {
        tagline: 'Sea breeze, sunshine, and celebration.',
        rights: `© ${new Date().getFullYear()} ${namesLine}`
      },
      misc: {
        eventDate: '2026-07-18T13:00:00+01:00',
        ics: {
          start: '2026-07-18T13:00:00+01:00',
          end: '2026-07-18T23:00:00+01:00',
          title: 'Kevin & Lynn — Seaside Ceremony',
          description: 'Ceremony by the sea, reception to follow on the promenade.',
          location: 'Brighton Bandstand, Kings Rd, Brighton BN1 2FN, UK'
        }
      }
    };

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, `${JSON.stringify(baseContent, null, 2)}\n`, 'utf8');

    console.log(`Extracted PDF content to ${path.relative(process.cwd(), outputPath)}`);
  } catch (error) {
    console.error('Failed to extract PDF content:', error);
    process.exitCode = 1;
  }
})();
