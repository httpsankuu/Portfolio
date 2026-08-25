# Portfolio Project — Build Context

> This file documents every step taken to build the portfolio so the next session can pick up exactly where we left off.

---

## Tech Stack

- **Framework:** React 19 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
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
│   ├── App.tsx                 # Layout — Navbar + all sections wrapped in SectionReveal
│   ├── index.css               # Tailwind v4 @theme tokens + custom animations
│   ├── hooks/
│   │   └── useScrollReveal.ts  # IntersectionObserver hook for scroll animations
│   └── components/
│       ├── Navbar.tsx           # Sticky nav, transparent→solid on scroll, mobile hamburger
│       ├── Hero.tsx             # Greeting, headline, CTAs, location pill, polaroid collage
│       ├── About.tsx            # Real bio content
│       ├── Arsenal.tsx          # 4 skill categories, real skills, proficiency tags, "Currently Learning"
│       ├── GitHubStats.tsx      # Embedded github-readme-stats widgets (username: httpsankuu)
│       ├── Education.tsx        # B.Tech CSE - AI/ML, Lovely Professional University
│       ├── Experience.tsx       # Vertical timeline with ML Research Assistant entry
│       ├── Projects.tsx         # 2-card grid, gradient banners, live demo + GitHub links
│       ├── Achievements.tsx     # "Coming Soon" placeholder (no real achievements yet)
│       ├── Certifications.tsx   # Crash Course on Python — Coursera with verify URL
│       ├── Contact.tsx          # Real social links (Email, LinkedIn, GitHub, LeetCode, X)
│       ├── Footer.tsx           # Minimal copyright + tagline
│       └── SectionReveal.tsx    # Scroll-reveal wrapper component
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
- Two CTA buttons: "Get in Touch" (primary filled), "View Experience" (outlined)
- Location pill with animated green dot: "📍 Varanasi, Uttar Pradesh, India"
- Polaroid photo collage (5 cards) with:
  - Rotated square placeholders with gradient backgrounds
  - Tape effect overlay
  - Caption text in cursive font
  - **Float/sway animation** via CSS `@keyframes polaroid-sway` (alternating between two variants, 6-7s duration)
  - `--rot` CSS custom property for base rotation
  - Hover: pause animation, reset rotation, scale up
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
- Embedded two `github-readme-stats.vercel.app` images:
  - Main stats: `?username=httpsankuu&show_icons=true&theme=default&hide_border=true&bg_color=transparent`
  - Top langs: `?username=httpsankuu&layout=compact&hide_border=true&bg_color=transparent&title_color=6C63FF`
- Desktop: side-by-side | Mobile: stacked
- Light card container with subtle border
- GitHub profile link at bottom with external link icon

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
- **Two link buttons per card**: "Live Demo" (solid primary) + "GitHub" (outlined)
- 2 real projects:
  1. **MrCompress.com** — Web App, Astro v6.4/React v19/Tailwind v4/i18next/Cloudflare Pages
     - Live: `https://mrcompress.pages.dev/`
     - GitHub: `https://github.com/httpsankuu/MrCompress.com`
     - Metric: "100% Browser-based"
  2. **resume-analyzer-ai** — AI Project, spaCy/FastAPI/Next.js 16/sentence-transformers
     - Live: `https://resumeanalyzer-10.vercel.app/`
     - GitHub: `https://github.com/httpsankuu/resume-analyzer-ai`
- Hover: `-translate-y-2`, `shadow-2xl`, border color change

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
- Each with custom SVG icon and unique hover color
- Green pulsing "Open to new opportunities" pill at bottom

### Step 13 — Footer
- Minimal: copyright line + "Built with ♥ using React + Tailwind CSS" tagline
- `py-8` padding, white/50 background, top border

### Step 14 — Scroll-Reveal Animations
- Created `src/hooks/useScrollReveal.ts`:
  - Uses `IntersectionObserver` with threshold 0.1
  - Adds `.revealed` class when section enters viewport, then unobserves
- Created `SectionReveal.tsx` wrapper component
- Wrapped all sections (except Hero) in `<SectionReveal>` in App.tsx
- CSS in `index.css`:
  - `.scroll-reveal`: `opacity: 0; translateY(32px)` → `opacity: 1; translateY(0)` on `.revealed`
  - Transition: 0.7s cubic-bezier(0.16, 1, 0.3, 1) — spring-like easing
  - Staggered children animation (80ms delay between siblings)

### Step 15 — Polaroid Float Animation
- `@keyframes polaroid-sway`: translateY(0) → translateY(-8px) + rotate(+2deg), 6s infinite
- `@keyframes polaroid-sway-alt`: translateY(0) → translateY(-6px) + rotate(-2deg), 7s infinite
- Each polaroid assigned `polaroid-float` or `polaroid-float-alt`
- `--rot` CSS custom property used as base rotation in keyframes
- Hover pauses animation (`animation-play-state: paused`), resets rotation

### Step 16 — Consistent Spacing
- Normalized all section `<section>` padding to `py-28 px-6`
- Sections with white bg: Experience (`bg-white`), Certifications (`bg-white`)
- Alternating bg pattern for visual rhythm

### Step 17 — Favicon & SEO
- Created `public/favicon.svg`: purple rounded rect with white "A" letter
- Updated `index.html` with real name + role in title, meta description, keywords, OG & Twitter tags
- `theme-color: #6C63FF`

### Step 18 — Content Population (All Sections)
- Updated all sections with Ankit Kumar Singh's real content:
  - Hero: tagline, location (Varanasi), bio
  - About: real bio text
  - Arsenal: real skills (Python, HTML, CSS, JS, C, Flask, Streamlit, etc.)
  - Education: B.Tech CSE - AI/ML, Lovely Professional University, 2025–2029
  - Experience: simplified to single ML Research Assistant entry
  - Projects: MrCompress.com + resume-analyzer-ai with live demo + GitHub links
  - Achievements: "Coming Soon" placeholder
  - Certifications: Crash Course on Python — Coursera with verify URL
  - Contact: all 5 real social links
  - GitHubStats: username `httpsankuu`
  - index.html: updated title, meta, OG tags

### Step 19 — Projects Live Demo Links
- Added `liveUrl` field to Project type
- Each project card now shows two buttons: "Live Demo" (solid primary) + "GitHub" (outlined)
- MrCompress: `https://mrcompress.pages.dev/`
- resume-analyzer-ai: `https://resumeanalyzer-10.vercel.app/`

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
