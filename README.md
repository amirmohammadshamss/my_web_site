# amirshams.me

Personal resume site. Next.js App Router, statically exported, served by GitHub
Pages at [amirshams.me](https://amirshams.me).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm start          # serve the built out/ directory
npm run typecheck
```

## Editing content

All of the resume content lives in [`data/resume.json`](data/resume.json) —
profile, contact links, facts, education, skills, experience and the portfolio
items. The pages render from it, so a change there updates the site, the page
metadata and the JSON-LD `Person` schema together. Nothing is hardcoded in the
components.

## Structure

```
app/
  layout.tsx            shell, metadata, JSON-LD, footer
  page.tsx              /
  resume/page.tsx       /resume/
  portfolio/page.tsx    /portfolio/
  not-found.tsx         -> 404.html
  robots.ts             -> robots.txt
  sitemap.ts            -> sitemap.xml
  styles/               base.css (grid + resets), main.css (theme)
  components/           SiteHeader, PortfolioGrid, TextRotation, Icon, HashRedirect
data/resume.json        the single source of content
public/                 images, CNAME, .nojekyll, .well-known
```

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`out/` with `actions/deploy-pages`.

Two settings this depends on:

- **Settings → Pages → Source must be "GitHub Actions"**, not "Deploy from a
  branch". The repo has no committed `index.html` any more, so a branch deploy
  would serve nothing.
- **Settings → Pages → Custom domain stays `amirshams.me`.** `public/CNAME`
  keeps it in the build output; removing that file detaches the domain.

Three things are load-bearing in `next.config.mjs` and `public/`:

- `output: 'export'` — emits plain files, no Node server.
- `trailingSlash: true` — so `/resume/` resolves to `/resume/index.html`.
- `images: { unoptimized: true }` — the `next/image` optimizer needs a server.
- `public/.nojekyll` — without it Pages runs Jekyll, which ignores
  `_`-prefixed paths and would drop all of `_next/`.

No `basePath` is set, because the custom domain serves this repo from the
domain root. If the domain is ever removed the site moves to
`amirmohammadshamss.github.io/my_web_site/` and `basePath` plus `assetPrefix`
would both need to be set to `/my_web_site`.

## Notes

- The old single-page site used `#home` / `#resume` / `#portfolio` hashes.
  `app/components/HashRedirect.tsx` forwards those to the real routes so
  previously shared links keep working.
- Fonts load from Google Fonts over HTTPS. Switching to `next/font` would
  self-host them and drop the third-party request, but `styles/main.css` names
  `'Roboto'` and `'Montserrat'` directly, so that change means rewriting those
  declarations to use the font variables.
- `styles/main.css` is the original template stylesheet and still carries rules
  for a blog, testimonials, a contact form, pricing tables and skill bars that
  this site does not use. Purging it would roughly halve the CSS.
