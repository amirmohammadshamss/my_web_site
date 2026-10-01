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

Text lives in two files, split by what it is:

- [`data/resume.json`](data/resume.json) — **the person's content**: profile,
  contact links, facts, education, skills, experience, portfolio items. The
  pages render from it, so a change there updates the site, the page metadata
  and the JSON-LD `Person` schema together.
- [`i18n/en.json`](i18n/en.json) — **interface text**: nav labels, section
  headings, button labels, `aria-label`s, alt-text templates, the footer and
  the metadata title patterns.

Nothing is hardcoded in the components. Messages with `{placeholders}` are
filled by `format()` from [`i18n/index.ts`](i18n/index.ts):

```ts
format(t.a11y.portrait, { name: resume.name }); // "Portrait of ..."
```

An unknown placeholder is left as-is rather than rendered as `undefined`, so a
missing value shows up in review instead of shipping quietly.

### Adding a language

`i18n/en.json` covers the chrome, but the resume content in `data/resume.json`
is English prose too, so a second locale needs both: another messages file and
a translated copy of the resume data. The routes are static (`output: 'export'`),
so locales would be separate prefixed routes — `app/[locale]/` with
`generateStaticParams` — rather than runtime negotiation.

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
  styles/app.css        Tailwind entry: design tokens, base layer, keyframes
  ui.ts                 class strings shared by more than one page
  components/           SiteHeader, PortfolioGrid, TextRotation, Icon, HashRedirect
data/resume.json        the person's content
i18n/en.json            interface text
i18n/index.ts           messages, locale, format()
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
- Styling is Tailwind 4, configured CSS-first in `app/styles/app.css`. The
  template stylesheet is gone; design tokens (brand colours, the two fonts,
  shadows, the 1032px container) live in the `@theme` block.
- **The breakpoints are not Tailwind's defaults.** The original stylesheet was
  written with `max-width` queries at 480 / 769 / 991 / 1032, so `@theme`
  clears the defaults and sets `sm: 481px`, `md: 770px`, `lg: 992px`,
  `xl: 1033px` to match those boundaries mobile-first. `lg:` is the
  desktop-header breakpoint, not a large desktop.
- Fonts load from Google Fonts over HTTPS. `next/font` would self-host them and
  drop the third-party request; the font names are now behind `--font-sans` and
  `--font-display`, so that swap is a two-line change in `@theme`.
