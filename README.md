
# IEEE ESTU Student Branch Website

Modern, responsive redesign of the IEEE ESTU Student Branch website. The project mirrors the Figma concept at https://www.figma.com/design/EqoxI3b5Nbzn2Uf9bSHfRJ/Redesign-IEEE-ESTU-Website--Copy- and packages it as a Vite + React application with Turkish and English content.

## Highlights
- Multi-language experience powered by a context provider (`tr` and `en`) with persistent selection.
- Dark and light themes with automatic persistence and a quick toggle in the header.
- Landing page sections for hero, committees, sub-teams, events, sponsors, blog, and IEEE Xtreme.
- Event Application and Membership Application pages that embed Google Forms with loading and error states.
- Responsive layout from mobile to desktop, built with Tailwind CSS Layer utilities, Radix UI primitives, and shadcn/ui components.
- Reusable UI kit (buttons, cards, accordions, command palette, forms, etc.) ready for future feature work.

## Tech Stack
- React 18 + TypeScript
- Vite 6 build tooling
- Tailwind CSS (layered output) for styling foundations
- Radix UI primitives and shadcn/ui component wrappers
- Lucide Icons, Embla Carousel, Sonner toasts

## Getting Started
### Prerequisites
- Node.js 18 or newer
- npm (comes with Node)

### Installation
```bash
npm install
```

### Development server
```bash
npm run dev
```
The app runs at `http://localhost:5173` by default. Append `-- --host` to expose it on your network.

### Production build
```bash
npm run build
```
The optimized assets are emitted to `dist/`.

## Project Structure
```
├── src
│   ├── App.tsx                # Routing, theme toggle, landing page assembly
│   ├── EventApplicationPage.tsx
│   ├── MembershipPage.tsx
│   ├── components             # Landing page sections and reusable UI pieces
│   ├── contexts               # Language provider
│   ├── styles                 # Global theme tokens
│   ├── translations.ts        # Turkish and English copy
│   └── guidelines / docs      # Setup notes for forms and membership
├── index.html
├── package.json
└── vite.config.ts
```

## Content & Customization
### Language strings
Edit `src/translations.ts` to update copy for both Turkish and English. The `LanguageProvider` in `src/contexts/LanguageContext.tsx` drives the entire localization experience.

### Event application form
1. Create your Google Form.
2. Replace `GOOGLE_FORM_URL` inside `src/EventApplicationPage.tsx` with the embed URL that ends with `embedded=true`.
3. Adjust the quick info cards, contact section, or styling as needed.
Detailed instructions live in `src/EVENT_FORM_SETUP.md`.

### Membership form
1. Set `GOOGLE_FORM_BASE_URL` at the top of `src/MembershipPage.tsx`.
2. Update benefit cards, contact information, and social links in the same file.
3. The page honors light/dark theme and language preferences automatically.
Configuration notes are captured in `src/MEMBERSHIP_SETUP.md`.

### Landing page links
Event CTA buttons currently navigate to the internal `/events` route. Update the `<a href>` inside `src/components/Events.tsx` if you need a Turkish slug like `/etkinlikler` or an external destination.

### Branding
Primary brand colors (`#00629B` and `#004f7c` for hover) are defined within component classes. Broader design tokens are inside `src/index.css` and `src/styles/globals.css`.

## Deployment Notes
- Build with `npm run build` and serve `dist/` via any static host (Vercel, Netlify, Cloudflare Pages, static Nginx, etc.).
- `/events` or `/etkinlikler` routes render the event application page; `/membership` or `/uyelik` render the membership page. Configure your host to fallback to `index.html` for client-side routing.
- For a dedicated subdomain such as `events.ieeeestu.org`, point DNS records to your host and deploy only `EventApplicationPage.tsx` if necessary (see `src/EVENT_FORM_SETUP.md` for both deployment models).

## Attributions
- UI components adapted from [shadcn/ui](https://ui.shadcn.com/) under the MIT license.
- Imagery sourced from [Unsplash](https://unsplash.com) under the Unsplash License.

## Contributing
Issues and pull requests are welcome. Please open a discussion before large changes so the design system and bilingual experience remain consistent.
  
