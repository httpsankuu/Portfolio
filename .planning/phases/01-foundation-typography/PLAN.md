# Phase 1: Foundation & Typography

## 1. User Story
**As a** visitor to the portfolio,
**I want to** see a unique, hand-drawn aesthetic starting with the typography and colors,
**So that** I get an immediate sense of the developer's playful and creative brand.

## 2. Approach
This phase establishes the foundational global styles for the "Hand-Drawn" theme.
1. **Typography:** Import `Kalam` and `Patrick Hand` from Google Fonts and configure them in Tailwind's `@theme` directive.
2. **Colors:** Update the core CSS custom properties to match the new color palette.
3. **Texture:** Apply a radial gradient to the global `body` background to simulate paper.

## 3. Tasks

### [tracer] Implement core theme variables and typography
**Description:** Set up the Google Fonts in `index.html`, define the new colors and fonts in `src/index.css`, and apply the paper texture to the body. This end-to-end slice establishes the visual foundation.
**Requirements:** STYLE-03, TYPO-01, TYPO-02
**Files:**
- `index.html`: Add `<link>` tags for Kalam (700) and Patrick Hand (400).
- `src/index.css`: 
  - Update `@theme` with `--color-bg: #fdfbf7`, `--color-text: #2d2d2d`, `--color-accent: #ff4d4d`.
  - Update `--font-sans` to use `Patrick Hand`.
  - Add `--font-heading` for `Kalam`.
  - Update `body` to include `background-image: radial-gradient(circle, #ffffff, var(--color-bg))` for the paper texture effect.
  - Update headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`) to use `var(--font-heading)` and `font-weight: 700`.
**Verification:** The application loads with the new off-white background, red accents, and handwritten fonts.

### 4. Expansion: Clean up legacy styles
**Description:** Remove any unused fonts or conflicting legacy color variables in `index.css` that might override the new theme.
**Files:**
- `src/index.css`: Remove unused light mode overrides if they conflict with the hand-drawn theme, and strip out self-hosted fonts (`Inter`, `JetBrains Mono`) if they are fully replaced.

## 5. Risks & Mitigations
- **Risk:** Existing components explicitly setting fonts (e.g. `font-mono`) or colors might bypass global styles.
- **Mitigation:** We are updating the base `--font-sans` and base colors. We will sweep existing UI in later phases, but updating global defaults provides immediate coverage.
