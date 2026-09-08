# Portfolio Polish Plan

> Living checklist of remaining improvements after the security & a11y sweep.
> Items are ordered **lowest cost → highest value**, and grouped so you can stop
> after any phase and ship. All file references and line numbers are accurate
> against the working tree on **2026-09-03**.

---

## Status legend

- [x] = done in the prior pass
- [ ] = not done yet
- [~] = partially done / in flight

## What's already done (don't re-do)

| Area | Result |
| --- | --- |
| GitHub PAT in `.env` | Token revoked on GitHub side; `.env` now contains only a warning comment; `.env` is in `.gitignore`; no `VITE_GITHUB_TOKEN` references in `src/`. |
| OG image | `public/og-image.svg` (1200×630) created; `index.html` references it and declares `og:image:type=image/svg+xml`. |
| `@font-face` duplicates | Single Inter 400/600/700 + JetBrains Mono 400/500 in `src/index.css:4-38`. |
| Hero a11y | `MotionValue<number>` typing on `PolaroidCard`, no more `as any`, scroll indicator respects `prefers-reduced-motion`, decorative `aria-label` removed. |
| `useScrollSpy` | Throttle now exposes `.cancel()` and cleans up the timer on unmount (`src/hooks/useScrollSpy.ts`). |
| Navbar | Mobile-menu `setTimeout` tracked in `scrollTimerRef`; active links get `aria-current="page"`. |
| ErrorBoundary | Three-button recovery (Try Again / Copy Error / Reload); logs gated to `import.meta.env.DEV`; outer div has `role="alert" aria-live="assertive"`. |
| ConstellationCanvas | `mouseleave` listener moved to `document` (window doesn't bubble). |
| GitHubStats | Real byte-count aggregation via `/repos/{owner}/{repo}/languages` with fallback to per-repo `language`. No token sent from the client. |
| Experience | 4 entries with stable `id` keys. |
| Skip-to-content | Hero `<section>` has `tabIndex={-1}` and `focus:outline-none` so the skip link actually moves keyboard focus. |
| Footer year | `COPYRIGHT_YEAR = 2026` constant (no more `new Date().getFullYear()`). |
| README claims | "3D" → 2D, added rate-limit fallback note, softened the a11y wording. |
| Certifications | 5 live PDF iframes replaced with lazy-mount on hover/focus (`useLazyIframe` hook in `src/components/Certifications.tsx`). |
| Build | `npx tsc -b` and `npx vite build` both clean (399.88 kB JS / 67.10 kB CSS). |

---

## Phase 1 — Quick polish (≤ 1 hour, zero risk)

### 1.1 Add a real handwritten font for the polaroid captions
**Why:** The Hero polaroids used to render `font-[cursive]`; that's been removed to avoid the random per-OS cursive face (Comic Sans on Windows, Snell Roundhand on macOS, neither matches the polaroid aesthetic).
**Where:** `src/components/Hero.tsx`, the two polaroid caption `<p>` elements; `src/index.css` `@font-face` block.
**How:**
- Drop `Caveat-Regular.woff2` and `Caveat-Bold.woff2` into `public/fonts/`.
- Add two `@font-face` rules (weight 400 and 700) using the same self-hosted pattern as Inter/JetBrains.
- Add `--font-hand: "Caveat", cursive;` in the `@theme` block in `src/index.css:40-52`.
- Replace `font-[cursive]` (now back) with `font-hand` on the polaroid captions.

### 1.2 Stop `*` from being a transition sink
**Why:** `src/index.css:85-92` sets `transition-property` on `*, *::before, *::after`. That's a global animation hit on every style change for every element, and it interacts badly with framer-motion (causes 0.25 s lag on every transform).
**How:** Drop the universal selector. Move transitions onto the specific Tailwind utility classes that actually need a color fade (`bg-bg-card`, `border-border`, `text-text`, etc.) — or remove it entirely; the visible theme switch already animates `body`.

### 1.3 Tighten the certifications "PDF · hover to preview" hint
**Why:** Mobile users don't hover; the placeholder should also react to focus.
**Where:** `src/components/Certifications.tsx` — the `useLazyIframe` hook already fires on focus, so just make sure the placeholder copy reflects that ("hover or focus to preview"), and add `aria-describedby` so SR users get the same hint.

### 1.4 Add `defer`/preload hints for the Inter weight that the LCP element uses
**Why:** The hero h1 uses Inter 700; if the browser only knows about the regular file, it will repaint.
**How:** Add a `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `index.html:47` for `/fonts/inter-bold.woff2` and `/fonts/inter-regular.woff2`. Preload the bold one only — the rest can be lazy.

---

## Phase 2 — Real features (½ day, low risk)

### 2.1 Add a `JSON-LD` Person schema to `index.html`
**Why:** A `schema.org/Person` block (with `name`, `jobTitle`, `sameAs` links to LinkedIn/GitHub/Google Scholar if any) makes the page eligible for Google rich results.
**Where:** `index.html:13-46` (after the meta tags, before `<body>`).
**Effort:** ~30 lines, all static.

### 2.2 OG image: ship a PNG fallback alongside the SVG
**Why:** Slack, WhatsApp, and most LinkedIn scrapers still reject SVG previews. Twitter and Discord handle SVG fine, but you only get one `og:image` URL.
**How:**
- Export `public/og-image.svg` to a 1200×630 PNG with the same layout (`public/og-image.png`).
- Update `index.html:33,45` to point `og:image` / `twitter:image` at the PNG.
- Keep the SVG for browsers that prefer it via a `<link rel="preload" as="image" type="image/svg+xml" href="/og-image.svg" media="(prefers-color-scheme: dark)">` (optional).

### 2.3 Add a "Now" / "What I'm doing" section
**Why:** ML-portfolio best practice; signals that the site is maintained, not a one-time export.
**Where:** New component `src/components/Now.tsx`; mount in `src/App.tsx` between `Experience` and `Projects`.
**Content (suggested):** current focus area, the most recent tool/framework you're learning, a one-line "open to" statement that mirrors the contact pill.
**Data:** store the body in `src/config.ts` so it can be updated without touching JSX.

### 2.4 Replace the floating "Open to opportunities" pill with a real ARIA-live region
**Why:** `src/components/Contact.tsx:129-143` has a `motion.span` with `animate-ping` that conveys nothing to screen readers.
**How:** Wrap it in `<span aria-live="polite">` and add a visually-hidden text node that says "Status: open to new opportunities." Optional: pull the status string from `config.ts` and add a small API endpoint `/api/status.json` (Vercel Edge Function) so the site can flip to "closed" without a redeploy.

---

## Phase 3 — Performance (½ day, measurable wins)

### 3.1 Defer the ConstellationCanvas until the hero is visible
**Why:** `src/components/Hero.tsx:81` always mounts `ConstellationCanvas` on first paint, even on mobile. It runs an `requestAnimationFrame` loop that costs ~3-5% CPU.
**How:** Wrap the canvas in `IntersectionObserver`; only run the RAF loop when `entry.isIntersecting`. Pause when the user scrolls away (resume on `mouseenter` / `focus`).

### 3.2 Inline critical CSS, async-load the rest
**Why:** Tailwind v4 emits a 67 kB stylesheet; ~90% of it is for hover/focus states that aren't needed on first paint.
**How:** Vite's `vite-plugin-css-injected-by-js` or a small Vite plugin that inlines the CSS imported by the LCP route and lazy-loads the rest. Verify with a Lighthouse run before/after.

### 3.3 Switch the `picture`/`<img>` sources to `decoding="async"` and `fetchpriority="high"` for the LCP image
**Why:** `public/profile.webp` is referenced from `src/components/About.tsx`; depending on viewport, it can become the LCP element.
**Where:** `src/components/About.tsx` — find the `<img src="/profile.webp">` and add `fetchpriority="high" decoding="async"`. Verify the resulting Largest Contentful Paint drops below 1.5 s on a Lighthouse mobile run.

### 3.4 Code-split the project section
**Why:** `Projects.tsx` is ~9 kB; if the user never scrolls to it, it's wasted bytes on the critical path.
**How:** Convert to `React.lazy(() => import("../components/Projects"))` and wrap in `<Suspense fallback={null}>` inside `App.tsx`. Apply the same pattern to `Achievements`, `Education`, `Arsenal` if any of them are heavy.

---

## Phase 4 — Robustness (1 day, structural)

### 4.1 Add Vitest + a few real tests
**Why:** The codebase has zero `*.test.*` files. The few components with non-trivial logic (GitHubStats reducer, useScrollSpy, ErrorBoundary, Certifications lazy mount) are exactly the ones that regress silently.
**How:**
- Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` to `devDependencies`.
- Add `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"` to `package.json:6-11`.
- First tests to write:
  - `useScrollSpy` returns the active section id; throttle is cancellable.
  - `GitHubStats` falls back to the per-repo `language` when `/languages` 404s.
  - `Certifications` `useLazyIframe` mounts the iframe after 150 ms of hover, cancels on early leave.
  - `ErrorBoundary` renders the Try Again / Copy Error buttons; clicking Try Again resets state without reloading.
  - `Footer` renders the year as a literal (no `Date.now` on the client).

### 4.2 Add a minimal CI workflow
**Why:** Without CI, regressions ship.
**Where:** `.github/workflows/ci.yml`.
**Steps:** `actions/setup-node@v4` with Node 22 → `npm ci` → `npm run lint` (oxlint) → `npm test` → `npm run build`. Cache `node_modules` keyed on `package-lock.json`. Add a status badge to `README.md` once green.

### 4.3 Add a Vercel serverless route for authenticated GitHub stats
**Why:** Without a token, the public API caps you at 60 req/h per IP. With a token, 5 000 req/h. Putting the token in `VITE_GITHUB_TOKEN` is unsafe; the right shape is a Vercel Function that proxies `/api/github-stats` and reads the token from a non-`VITE_` env var.
**Where:** New `api/github-stats.ts` (Vercel Edge Function), update `src/components/GitHubStats.tsx` to call `/api/github-stats` first, fall back to the current direct path on failure.
**Token:** add a non-prefixed env var `GITHUB_TOKEN` in Vercel project settings.

### 4.4 Type-safe env access
**Why:** `import.meta.env.GITHUB_TOKEN` etc. are typed as `string | undefined` by Vite. Without a runtime guard, you can ship a `TypeError: Cannot read properties of undefined (reading 'X')` to production.
**How:** Add `src/env.ts` that exports a validated `env` object; throws at module load if a required var is missing. Currently the app has zero required env vars, but this becomes important once 4.3 is in.

### 4.5 Replace `key={idx}` and `key={cert.title}` with stable ids
**Why:** The polaroid captions in `Hero.tsx` and the cert cards in `Certifications.tsx` use index/title as keys. Two cards with the same title (or a future "add new project" action) will cause React to keep stale DOM around.
**Where:** Hero polaroid list (`src/components/Hero.tsx`), Certifications grid (already keyed by `cert.title` — add an `id` field to the `Certification` type to be safe).
**How:** Add explicit `id` to each data row.

---

## Phase 5 — Polish & delight (optional, design taste)

### 5.1 Replace the emoji icons in section headers with inline SVGs
**Why:** Emojis render as different glyphs per OS (📜 is a scroll on macOS, a memo on Windows). Inline SVG is brand-consistent.
**Where:** `Certifications.tsx:91`, `Projects.tsx:95`, `Contact.tsx:91`, `Hero.tsx` (the small "👋" near the h1).

### 5.2 Add a `not-found` route
**Why:** Vercel serves the SPA for every path; a 404 currently shows a blank page.
**How:** Add a wildcard route in `vercel.json` (or a catch-all rewrite) → `index.html`, plus a tiny `NotFound.tsx` rendered by `App.tsx` when `location.pathname !== "/"`.

### 5.3 Print stylesheet
**Why:** Recruiters print portfolios; the current output is dark-mode with clickable-looking links.
**How:** `@media print` block in `src/index.css` that forces light theme, hides the canvas / nav, expands the about + experience sections.

### 5.4 Blog or writing section
**Why:** ML engineers are expected to have a writing footprint. Even a single "Notes" page that links to two Medium / Hashnode posts would move the needle.
**How:** Out of scope for this repo; mention as a follow-up.

---

## Decision log

- **Why SVG-first OG image** — SVG is sharp at any size, no extra PNG build step, Twitter handles it, and `og:image:type=image/svg+xml` is now declared. LinkedIn support is the only weak point; Phase 2.2 adds the PNG fallback.
- **Why no token in `VITE_GITHUB_TOKEN`** — every `VITE_*` env var is inlined into the browser bundle. We have no real `server`, so the only safe shape is a serverless function (Phase 4.3) once rate limits become a problem.
- **Why lazy iframes instead of removing them** — the inline preview is the value-add of the section. Lazy mounting preserves the UX without paying the cost on first paint.

---

## How to work through this with Claude

When you come back to this, open the file, tell me which phase you want, and I'll execute it. Suggested prompt:

> "Let's do Phase 1.1 — add Caveat font for the polaroid captions. Walk me through it."

I'll re-verify the current state of the touched files, write the change, and report exactly which files were modified and what the build looks like.
