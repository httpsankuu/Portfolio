# Portfolio Project — Build Context

> This file documents every step taken to build the portfolio so the next session can pick up exactly where we left off.

---

## Tech Stack

- **Framework:** React 19 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation:** Framer Motion (`framer-motion`)
- **Fonts:** Inter (sans), JetBrains Mono (mono) — loaded via Google Fonts
- **Build:** `npm run build` (TypeScript check + Vite production build)

---

## Project Structure

```
portfolio/
├── index.html                  # SEO, OG tags, font imports, favicon
├── public/favicon.svg          # Custom SVG favicon (purple "A")
├── src/
│   ├── main.tsx                # React root mount
│   ├── App.tsx                 # Layout — Navbar + all sections wrapped in SectionReveal + ScrollProgress
│   ├── index.css               # Tailwind v4 @theme tokens, prefers-reduced-motion support
│   ├── hooks/
│   │   ├── useScrollReveal.ts  # IntersectionObserver hook (legacy, kept for reference)
│   │   ├── useReducedMotion.ts # Detects prefers-reduced-motion setting
│   │   └── useScrollSpy.ts     # Tracks active section for navbar highlighting
│   └── components/
│       ├── Navbar.tsx           # Sticky nav, scroll-spy, transparent→solid, animated mobile menu
│       ├── Hero.tsx             # Stagger-animated polaroids, parallax, word-by-word headline reveal
│       ├── About.tsx            # Real bio content
│       ├── Arsenal.tsx          # 4 skill categories, hover lift/scale, skill badge pop
│       ├── GitHubStats.tsx      # Embedded github-readme-stats widgets (username: httpsankuu)
│       ├── Education.tsx        # B.Tech CSE - AI/ML, Lovely Professional University
│       ├── Experience.tsx       # Vertical timeline with ML Research Assistant entry
│       ├── Projects.tsx         # 2-card grid, gradient glow border, arrow slide, live demo links
│       ├── Achievements.tsx     # "Coming Soon" placeholder (no real achievements yet)
│       ├── Certifications.tsx   # Crash Course on Python — Coursera with verify URL
│       ├── Contact.tsx          # Real social links, staggered entrance
│       ├── Footer.tsx           # Minimal copyright + tagline
│       ├── SectionReveal.tsx    # Framer Motion whileInView wrapper (fade + slide-up)
│       ├── ScrollProgress.tsx   # Thin gradient progress bar at page top
│       └── MagneticButton.tsx   # CTA button that subtly follows cursor on hover
```

---

## Step-by-Step Build Log

### Step 1 — Scaffold & Tailwind Setup
1. Ran `npm create vite@latest portfolio -- --template react-ts`
2. Installed deps: `npm install`
3. Installed Tailwind: `npm install -D tailwindcss @tailwindcss/vite`
4. Configured `vite.config.ts` with `tailwindcss()` plugin
5. Replaced `src/index.css` with Tailwind v4 `@import "tailwindcss"` + `@theme` tokens
6. Defined custom theme colors: `primary (#6C63FF)`, `accent (#FF6B6B)`, `accent-warm (#FFB347)`, `bg (#FAFAFA)`, `text (#2D3436)`, `text-muted (#636E72)`, `border (#E8E8E8)`
7. Set `html { scroll-behavior: smooth }` and `::selection` styles
8. Updated `index.html` with Google Fonts (Inter + JetBrains Mono)
9. Deleted `src/App.css`

### Step 2 — Navbar
- Created `Navbar.tsx` with:
  - Links: About, Arsenal, Education, Experience, Projects, Achievements, Certifications, Contact
  - Scroll listener: transparent → `bg-white/90 backdrop-blur-md shadow-lg` after 20px
  - Mobile hamburger menu (toggles under `md:` breakpoint)
  - `<Ankit />` logo link

### Step 3 — Hero Section
- Greeting: "👋 Hi, I'm"
- Name: "Ankit Kumar Singh" (Singh in primary color)
- Headline: "Building AI that solves real problems, not just demos."
- Subtext: Bio about building fast, clean, useful things + DSA/CP grinding
- Two CTA buttons: "Get in Touch" (primary filled, magnetic), "View Experience" (outlined)
- Location pill with animated green dot: "📍 Varanasi, Uttar Pradesh, India"
- Polaroid photo collage (5 cards) with stagger entrance + float animation
- Scroll indicator at bottom with bounce animation
- Decorative background blobs (blur-3xl)

### Step 4 — About Section
- Real bio content: "Passionate about building things that are fast, clean, and useful..."

### Step 5 — Arsenal (Skills) Section
- Header: "⚔️ What I Work With" / "Technical Arsenal"
- 4 category cards in 2-column grid:
  1. **Languages** — Python (Advanced), HTML (Intermediate), CSS (Intermediate), JavaScript (Intermediate), C (Beginner)
  2. **ML/DL Frameworks** — Flask (Intermediate), Streamlit (Intermediate)
  3. **Data & Analysis** — Data Wrangling (Intermediate), EDA (Intermediate), Feature Engineering (Intermediate)
  4. **MLOps & Infra** — Git & GitHub (Intermediate), Vite/Astro (Intermediate), Tailwind CSS (Intermediate)
- Each skill card: name, one-line description, colored proficiency badge
- **"Currently Learning" callout** at bottom:
  - Red pulsing dot + "LIVE" badge
  - Pill chips: C++ ⚡, DSA 🧩, Competitive Programming 🏆

### Step 6 — GitHub Stats Section
- Self-contained component fetching from `api.github.com` (replaced broken `github-readme-stats.vercel.app`)
- **Profile summary card**: avatar, username, repo count
- **Stat boxes**: Repos, Stars, Followers (live from GitHub API)
- **Language breakdown**: colored bar + percentage list (calculated from repos)
- **Top repos grid**: 6 most-starred repos with language, stars, description
- Loading spinner while fetching
- GitHub profile link at bottom with external link icon
- Stats update automatically when GitHub profile changes

### Step 7 — Education Section
- Single card layout with:
  - Degree: "B.Tech. CSE — AI/ML"
  - Institution: "Lovely Professional University"
  - Years: "2025 – 2029" (in primary pill)
  - Focus: "Building a strong foundation in machine learning, deep learning, and applied AI..."
  - Green highlight badges: ML Engineer, Relevant Coursework
  - Coursework tags: Machine Learning, Deep Learning, Data Structures, Algorithms, AI, Python

### Step 8 — Experience Section (Vertical Timeline)
- Vertical line (gradient from primary/20 → border → primary/20)
- Timeline dots (border-primary, hover fills)
- 1 entry:
  1. **Research Assistant — Machine Learning** (In Progress) — Research, Machine Learning, Python
- Each entry: icon, role, org, date pill, highlight badge, description, colored tag chips

### Step 9 — Projects Section (Featured Projects)
- 2-column responsive grid (1 mobile, 2 tablet+)
- Each card: gradient banner (h-44), icon, metric badge, project type label
- **Two link buttons per card**: "Live Demo" (solid primary) + "GitHub" (outlined with arrow slide)
- **Gradient glow border** on hover (CSS mask-composite technique)
- 2 real projects:
  1. **MrCompress.com** — Web App, Astro v6.4/React v19/Tailwind v4/i18next/Cloudflare Pages
     - Live: `https://mrcompress.pages.dev/`
     - GitHub: `https://github.com/httpsankuu/MrCompress.com`
     - Metric: "100% Browser-based"
  2. **resume-analyzer-ai** — AI Project, spaCy/FastAPI/Next.js 16/sentence-transformers
     - Live: `https://resumeanalyzer-10.vercel.app/`
     - GitHub: `https://github.com/httpsankuu/resume-analyzer-ai`

### Step 10 — Achievements Section
- 1 card: "Coming Soon" placeholder (no real achievements yet)
- In Progress, DSA, Competitive Programming tags

### Step 11 — Certifications Section
- 1-card layout (single cert)
- **Crash Course on Python** — Coursera
  - Verify: `https://www.coursera.org/account/accomplishments/verify/WCE37QAX8LRX`
- "Verify Credential" button with shield icon + external link arrow

### Step 12 — Contact Section
- Header: "🤝 Let's Work Together" / "Let's Connect"
- Subtext about open to ML internships/collaborations
- 5 social icon buttons in a flex row with real URLs:
  - Email: `mailto:ankitkumar143563@gmail.com`
  - LinkedIn: `https://www.linkedin.com/in/ankit-kumar-singh03/`
  - GitHub: `https://github.com/httpsankuu`
  - LeetCode: `https://leetcode.com/u/who_ankuu/`
  - X/Twitter: `https://x.com/who_ankith`
- Staggered entrance animation for social links
- Green pulsing "Open to new opportunities" pill at bottom

### Step 13 — Footer
- Minimal: copyright line + "Built with ♥ using React + Tailwind CSS" tagline
- `py-8` padding, white/50 background, top border

### Step 14 — Scroll-Reveal Animations (Original CSS-based)
- Created `src/hooks/useScrollReveal.ts`:
  - Uses `IntersectionObserver` with threshold 0.1
  - Adds `.revealed` class when section enters viewport, then unobserves
- Created `SectionReveal.tsx` wrapper component
- Wrapped all sections (except Hero) in `<SectionReveal>` in App.tsx

### Step 15 — Polaroid Float Animation (Original CSS-based)
- `@keyframes polaroid-sway`: translateY(0) → translateY(-8px) + rotate(+2deg), 6s infinite
- `@keyframes polaroid-sway-alt`: translateY(0) → translateY(-6px) + rotate(-2deg), 7s infinite
- Each polaroid assigned `polaroid-float` or `polaroid-float-alt`
- `--rot` CSS custom property used as base rotation in keyframes

### Step 16 — Consistent Spacing
- Normalized all section `<section>` padding to `py-28 px-6`
- Sections with white bg: Experience (`bg-white`), Certifications (`bg-white`)

### Step 17 — Favicon & SEO
- Created `public/favicon.svg`: purple rounded rect with white "A" letter
- Updated `index.html` with real name + role in title, meta description, keywords, OG & Twitter tags
- `theme-color: #6C63FF`

### Step 18 — Content Population (All Sections)
- Updated all sections with Ankit Kumar Singh's real content across all sections

### Step 19 — Projects Live Demo Links
- Added `liveUrl` field to Project type
- Each project card shows: "Live Demo" (solid primary) + "GitHub" (outlined)

### Step 20 — Framer Motion Animation Upgrade
- Installed `framer-motion`
- Created `src/hooks/useReducedMotion.ts` — detects `prefers-reduced-motion: reduce`
- Created `src/hooks/useScrollSpy.ts` — tracks active section for navbar highlighting
- Created `src/components/ScrollProgress.tsx` — thin gradient progress bar at page top (spring-animated scaleX)
- Created `src/components/MagneticButton.tsx` — CTA button follows cursor within small radius on hover
- **Removed CustomCursor** (was laggy, not worth the performance cost)

#### Hero Animations
- **Stagger-animated polaroids**: each fades in, drops from 40px, bounces into rotated position (100ms offset per card, bounce easing `[0.34, 1.56, 0.64, 1]`)
- **Continuous float**: each polaroid drifts up/down on different timings (5.5–7.5s), amounts (5–8px)
- **Mouse parallax**: polaroids shift 2-6px based on cursor position via `useTransform`
- **Hover effect**: polaroid lifts (-8px), straightens (rotation * 0.3), scales up (1.08)
- **Headline word reveal**: staggered blur-to-clear animation, 60ms per word
- **CTA magnetic button**: "Get in Touch" subtly follows cursor on hover

#### Navbar Animations
- **Scroll-spy**: active section highlighted with animated underline indicator (`layoutId` spring animation)
- **Smooth transition**: transparent → `bg-white/80 backdrop-blur-xl` with 500ms ease-out
- **Slide-in**: navbar enters from top on page load (600ms delay)
- **Mobile menu**: AnimatePresence with height/opacity animation, staggered link entrance

#### Section Entrance Animations
- **SectionReveal**: now uses Framer Motion `whileInView` with fade+slide-up (opacity 0→1, y 40→0)
- **Viewport**: `once: true` — triggers once, not on every scroll pass
- **Easing**: `[0.16, 1, 0.3, 1]` (spring-like, used everywhere for consistency)
- All section headers use the same whileInView entrance

#### Card Hover Effects
- **Arsenal**: cards lift (y: -4) + scale 1.02; skill badges pop with spring (scale 1.03, stiffness 400)
- **Projects**: gradient glow border on hover (CSS mask-composite), arrow slides right on GitHub link
- **Certifications**: lift (y: -6) + scale 1.03
- **Achievements**: lift (y: -6) + scale 1.02
- **Education**: coursework tags pop on hover (scale 1.05, primary color border)
- **Experience**: cards slide in from left, hover shadow glow

#### Reduced Motion Support
- `prefers-reduced-motion: reduce` media query in CSS disables all animations
- `useReducedMotion` hook used in all animated components to skip Framer Motion animations
- Transitions fall back to instant (0.01ms) for users who prefer reduced motion

#### CSS Cleanup
- Removed old CSS-based `.scroll-reveal` / `.revealed` / `.stagger-child` system
- Removed old `@keyframes polaroid-sway` / `polaroid-sway-alt` (now Framer Motion)
- Added `prefers-reduced-motion: reduce` media query
- Removed cursor-hiding CSS (CustomCursor was removed)

### Step 21 — GitHub Stats Fix & README
- Replaced broken `github-readme-stats.vercel.app` (Vercel ended sponsorship) with self-contained GitHub API fetch
- GitHubStats.tsx now fetches from `api.github.com`: profile, repos, languages
- Shows profile card (avatar, repos, stars, followers), language breakdown bar, top repos grid
- Stats update live whenever GitHub profile changes
- README.md modernized with shields.io badges, project tables, tech stack, social links
- README GitHub stats section uses shields.io badges (repos, followers, stars) instead of broken images

---

## What Still Needs Work

| Section | Status | What to Add |
|---------|--------|-------------|
| **Polaroid photos** | Gradient placeholders | Replace with actual images |
| **Achievements** | "Coming Soon" | Add real hackathon/competition results |
| **Experience** | 1 generic entry | Add real work history |
| **OG image** | Missing | Create and add `/og-image.png` to `public/` |
| **Certifications** | 1 cert | Add more certifications as earned |

---

## Commands

```bash
cd portfolio
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # TypeScript check + production build
npm run preview  # Preview production build locally
```

---

## Theme Colors (Quick Reference)

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#6C63FF` | Buttons, links, accents, navbar |
| `primary-light` | `#8B85FF` | Hover states |
| `accent` | `#FF6B6B` | Secondary highlights |
| `accent-warm` | `#FFB347` | Warm accents |
| `bg` | `#FAFAFA` | Page background |
| `bg-card` | `#FFFFFF` | Card backgrounds |
| `text` | `#2D3436` | Body text |
| `text-muted` | `#636E72` | Secondary text |
| `border` | `#E8E8E8` | Borders, dividers |

---

## Animation Quick Reference

| Interaction | Duration | Easing | Trigger |
|-------------|----------|--------|---------|
| Card hover lift/scale | 250ms | easeOut | mouseenter |
| Skill badge pop | 200ms | spring (400 stiffness) | mouseenter |
| Section entrance | 700ms | `[0.16, 1, 0.3, 1]` | whileInView (once) |
| Polaroid stagger | 700ms | bounce `[0.34, 1.56, 0.64, 1]` | page load |
| Headline word reveal | 400ms per word | `[0.16, 1, 0.3, 1]` | page load |
| Navbar transition | 500ms | ease-out | scroll past 20px |
| Scroll progress bar | spring (100 stiffness) | spring | scroll |
