# The Upward Scale

Premium agency marketing site built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

## Stack

- App Router (RSC pages + client interactive sections)
- Framer Motion + Lenis (respects `prefers-reduced-motion`)
- Three.js / React Three Fiber (hero canvas only)
- Cal.com embed for booking (Web3Forms fallback)
- MDX content layer for blogs & case studies (`content/`)

## Getting started

```bash
npm install
cp .env.example .env.local
# fill in WEB3FORMS_ACCESS_KEY and optional Cal link
npm run content:sync
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Public? | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (sitemap, OG, robots) |
| `WEB3FORMS_ACCESS_KEY` | **No (server only)** | Contact, booking fallback, newsletter |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Legacy | Optional fallback if server key unset — prefer server key |
| `NEXT_PUBLIC_CAL_LINK` | Yes | Cal.com slug (`username/event-type`). Empty → booking form |
| `NEXT_PUBLIC_CALCOM_LINK` | Yes | Legacy alias for Cal link |
| `NEXT_PUBLIC_CONTACT_PHONE` | Yes | Optional footer/contact phone display |
| `NEXT_PUBLIC_CONTACT_PHONE_HREF` | Yes | `tel:` href |
| `NEXT_PUBLIC_STUDIO_TAGLINE` | Yes | Studio tagline override |

Forms POST to `/api/contact` and `/api/newsletter`. Keys never ship to the browser when `WEB3FORMS_ACCESS_KEY` is set.

Get a Web3Forms key at [web3forms.com](https://web3forms.com).

### Cal.com

1. Create an event type in Cal.com  
2. Set `NEXT_PUBLIC_CAL_LINK=your-username/discovery`  
3. If unset or the embed times out (~8s), the in-drawer booking form is used

## Content (MDX)

Editable source of truth:

```
content/blogs/*.mdx
content/case-studies/*.mdx
```

After editing MDX:

```bash
npm run content:sync
```

This regenerates `src/data/generated/*.json` used by the app (including Edge OG routes).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (webpack) |
| `npm run build` | Production build (runs content sync first) |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm test` | Smoke tests (Vitest) |
| `npm run content:sync` | MDX → JSON snapshots |
| `npm run docker:build` | Build Docker image |
| `npm run docker:run` | Run container on port 3000 |

## Docker

```bash
npm run docker:build
docker run --rm -p 3000:3000 \
  -e WEB3FORMS_ACCESS_KEY=your_key \
  -e NEXT_PUBLIC_SITE_URL=https://theupwardscale.com \
  -e NEXT_PUBLIC_CAL_LINK=your-username/discovery \
  the-upward-scale
```

Pass server secrets at runtime (`WEB3FORMS_ACCESS_KEY`). Do not bake keys into the image.

## Project layout

```
app/                  # Routes, layouts, API handlers, OG images
content/              # MDX blogs & case studies (source of truth)
src/components/       # UI, sections, booking, navigation, 3D
src/data/             # Generated catalogs + static config
src/lib/content/      # MDX loaders (Node)
src/lib/og/           # Open Graph helpers
tests/                # Smoke tests
```

## Accessibility / motion

Site-wide `MotionConfig reducedMotion="user"` and Lenis gated by `prefers-reduced-motion`. CSS also disables non-essential transitions when reduced motion is requested.
