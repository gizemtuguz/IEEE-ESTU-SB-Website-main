
# IEEE ESTU Student Branch Website

Modern, responsive redesign of the IEEE ESTU Student Branch website.

## Features
- Bilingual content with a context-based language switcher that remembers the last choice.
- Dark / light theme toggle with localStorage persistence.
- One-page landing layout for hero, about, teams, committees, sub-teams, events CTA, sponsors, contact, blog, and IEEE Xtreme.
- Dedicated event application and membership application screens with rich forms, modal dialogs, and validation.
- Fully responsive layout built on Tailwind CSS layers, Radix primitives, and shadcn/ui components.
- Reusable UI kit (buttons, forms, accordions, carousel, charts, etc.) for future IEEE initiatives.

## Tech Stack
- React 18 + TypeScript
- Vite 6
- Tailwind CSS utilities
- Radix UI + shadcn/ui wrappers
- Lucide Icons, Embla Carousel, Sonner toasts

## Getting Started
### Prerequisites
- Node.js 18+
- npm (bundled with Node)

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```
The site is served at `http://localhost:5173`. Append `-- --host` to expose it on your LAN.

### Create a production build
```bash
npm run build
```
Bundles are emitted to `dist/`. Deploy the directory to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

## Project Structure
```
├── src
│   ├── App.tsx                # Entry point with routing & theme toggle
│   ├── EventApplicationPage.tsx
│   ├── MembershipPage.tsx
│   ├── EventsPage.tsx
│   ├── components             # Landing sections and UI kit
│   │   └── ui                 # shadcn/ui wrappers
│   ├── contexts               # Language provider
│   ├── styles                 # Global CSS variables and utilities
│   ├── assets                 # Images & icons
│   └── translations.ts        # TR / EN copy
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Key Customizations
- **Translations**: Edit `src/translations.ts` to update labels in both Turkish and English. Changes propagate automatically through the language context.
- **Theme colors**: Global tokens live in `src/index.css` and `src/styles/globals.css`. Adjust to match refreshed branding or seasonal palettes.
- **Navigation & sections**: Hero, About, Team, Committees, SubTeams, Sponsors, Blog, Contact, and Xtreme sections sit inside `src/components/`. Update the content or swap imagery there.
- **Event application flow**: `src/EventApplicationPage.tsx` controls form fields, KVKK modal, and contact details. Replace the simulated submission block with a real API / Google Form integration.
- **Membership onboarding**: `src/MembershipPage.tsx` renders membership benefits and the Google Form embed link. Update the form URL, FAQ copy, and social links in the same file.
- **Events listing**: `src/EventsPage.tsx` holds quick cards and filtering scaffolding for upcoming events. Wire it up to a CMS or add static entries as needed.

## Routing & Deployment Notes
- Client-side routes:  
  - `/` renders the landing page.  
  - `/events` (or `/etkinlikler`) opens the event application experience.  
  - `/events/apply` (`/etkinlikler/basvuru`) and `/membership` (`/uyelik`) are also detected in `App.tsx`.  
- Configure your production host to fall back to `index.html` for unknown routes so Vite’s SPA routing works.
- To host only a sub-page (e.g., the event form) on a subdomain, build the project and serve the compiled `dist/` content with correct rewrites.

## Contributing
1. Fork and clone the repository.
2. Create a feature branch.
3. Run `npm run dev` and make your changes.
4. Open a pull request with screenshots for UI tweaks and explain how localization/theme were considered.

## License & Credits
- UI components leverage [shadcn/ui](https://ui.shadcn.com/) (MIT) and [Radix UI](https://www.radix-ui.com/).
- Icons are provided by [Lucide](https://lucide.dev/).
- Images and illustrations should comply with their respective licenses (current placeholders come from project assets).
