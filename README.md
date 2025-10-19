# Fandy & Rob — Seaside Wedding SPA

A bilingual (English & Traditional Chinese) one-page wedding site built with React, Vite, and TypeScript. Content is sourced from the PDF in `public/wedding-info.pdf`, merged with manual overrides, and themed around a bright UK summer seaside celebration. The project is ready for static deployment on GitHub Pages.

## ✨ Features

- **Data pipeline**: `npm run extract` uses `pdfjs-dist` to parse the PDF and regenerates `src/content/data.json`.
- **i18n**: Language toggle with localStorage persistence (`en` / `zh-Hant`).
- **Accessibility & performance**: semantic HTML, visible focus states, reduced-motion support, lazy-loaded map & gallery, responsive layout.
- **Design system**: Coastal palette tokens, global styles, wave/bunting decorations.
- **Utilities**: Client-side ICS download, placeholder analytics hook, countdown timer.
- **Deployment**: GitHub Actions workflow builds and deploys to `gh-pages` using the Vite `base` path.

## 📁 Project Structure

```
public/
  wedding-info.pdf
  images/
  favicon.svg
  social-card.png
scripts/
  extract-pdf.ts
src/
  components/
  content/
  styles/
  types/
  utils/
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Extract PDF content** (regenerates `src/content/data.json`)
   ```bash
   npm run extract
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/`.
4. **Build for production**
   ```bash
   npm run build
   ```
   Output is emitted to `dist/`.

## 🌐 Deployment

- Push to `main` to trigger `.github/workflows/deploy.yml`.
- The workflow installs dependencies, re-extracts PDF content, builds the site, and deploys to GitHub Pages.
- Vite `base` is set to `/FandyWedding/`, so the site works under `https://<username>.github.io/FandyWedding/`.

## 📝 Notes

- `src/content/en.json` and `src/content/zh-Hant.json` override the auto-extracted data.
- If you change the repository name, update the `repoName` constant in `vite.config.ts` and the social image URLs in `index.html`.
- `src/utils/analytics.ts` is a stub; wire in a privacy-friendly provider as needed.

Enjoy the celebration! 🌊

<!-- Trigger deployment after Pages setup -->
