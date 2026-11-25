# RiddleEdits

Portfolio site for RiddleEdits, a video editor for GTA and Roblox YouTube creators.
React 19, Vite and Tailwind CSS 4. There's no backend.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm run lint     # type check
```

## Editing content

Everything the site says lives in **`src/data/content.ts`**:

- `SITE`: email, Calendly link, socials
- `CREATORS`: channels, subscriber counts, avatars (files in `public/creators/`)
- `VIDEOS`: every video on the site with its views, length and likes. The homepage stats are calculated from these numbers.
- `NICHES`: copy and FAQs for the GTA and Roblox pages
- `TESTIMONIALS`, `CASE_STUDIES`

The month-by-month numbers in the Doodle Arkey Plays case study are in `src/components/GtaCaseStudy.tsx`.

## Pages

| Path | Component |
| --- | --- |
| `/` | `App.tsx` → `Home` |
| `/work/gta`, `/work/roblox` | `NichePage` |
| `/case-studies` (with `#doodle-arkey-plays`, `#miloblox`, `#kwil`) | `CaseStudiesPage` |
| `/contact` | `ContactPage` |

## Deploying

Every push to `main` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`):
https://riddleedits.github.io/riddleedits-site/

The workflow builds with `BASE_PATH=/riddleedits-site/` because Pages serves the site from that folder, and copies `index.html` to `404.html` so links like `/work/gta` load the app.

To use a custom domain such as riddleedits.xyz:
1. Add it under Settings → Pages.
2. Change `BASE_PATH` in the workflow to `/`.

The contact form opens the visitor's email app with the message filled in. Bookings go through Calendly.
