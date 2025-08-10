# DOT & CROSS

A single-page React + Vite site with animated transitions, custom Bebas Neue font, and Tailwind CSS.

## Features

- **React Router navigation** (ABOUT, PHILOSOPHY, CAPABILITIES, CONTACT, PRIVACY POLICY)
- **Framer Motion** page transitions (all pages use `AnimatePresence`)
- **Floating interactive circles** on the homepage
- **Custom fonts** (Bebas Neue, Clash Grotesk, Inter)
- **Tailwind CSS** styling
- **SEO meta tags** via `react-helmet-async`
- **Responsive scaling** for mobile/tablet
- **Accordion UI** for Capabilities
- **Social/contact links** and animated CTA buttons

## Getting Started

```sh
npm install
npm run dev
```

## Folder Structure

- `src/App.jsx` — Main app, routes, transitions, homepage, floating circles
- `src/BrandCapabilities.jsx` — Capabilities accordion page
- `src/AboutUs.jsx` — About page
- `src/Philosophy.jsx` — Philosophy page
- `src/Contact.jsx` — Contact page
- `src/PrivacyPolicy.jsx` — Privacy Policy page
- `src/NotFound.jsx` — 404 page
- `src/main.jsx` — Entry point
- `src/index.css` — Global styles, font imports, scaling
- `public/` — Static assets, favicon, sitemap, robots.txt

## Customization

- **All pages use Framer Motion’s `AnimatePresence` for transitions.**
- **Navigation is handled via React Router.**
- **Tailwind CSS** is used for all styling.
- **SEO** handled with `react-helmet-async`.

## Development

- ESLint config for React and hooks
- Vite for fast HMR and builds

## License

© DOT & CROSS. All rights reserved.

