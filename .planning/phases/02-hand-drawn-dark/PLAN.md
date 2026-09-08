# Phase 2: Hand-Drawn Dark Mode

## 1. User Story
**As a** visitor to the portfolio in a low-light environment,
**I want to** be able to switch to a dark version of the hand-drawn theme,
**So that** I can read the content comfortably without losing the playful, sketchbook aesthetic.

## 2. Approach
The existing `useTheme` hook sets `.light` on the HTML root element. We will:
1. Update `src/index.css` to define the default CSS variables (in `@theme`) as the **Dark Mode** palette (since default is dark).
2. Create an `html.light` scope block in `index.css` to override those variables with the **Light Mode** palette from Phase 1.
3. Update the global `body` background texture to use a new variable `--color-bg-highlight` so the radial gradient works correctly in both light and dark modes.

## 3. Tasks

### [tracer] Implement CSS Variable Overrides and Background Texture
**Description:** Update `src/index.css` to fully support both light and dark palettes through CSS custom properties.
**Requirements:** DARK-01
**Files:**
- `src/index.css`:
  - Default `@theme` variables: `--color-bg: #1a1a1a`, `--color-bg-highlight: #2a2a2a`, `--color-text: #e5e5e5`, etc.
  - Add `html.light` block overrides: `--color-bg: #fdfbf7`, `--color-bg-highlight: #ffffff`, `--color-text: #2d2d2d`, etc.
  - Update `body` background-image: `radial-gradient(circle at center, var(--color-bg-highlight) 0%, var(--color-bg) 100%)`.
**Verification:** Running the app and clicking the ThemeToggle component switches smoothly between the dark chalkboard aesthetic and the light sketchbook aesthetic.

### 4. Expansion: Ensure Theme Toggle Visibility
**Description:** Verify that the `ThemeToggle` component inherits the correct text/icon colors so it's visible in both modes.
**Files:**
- `src/components/ThemeToggle.tsx`: Review and ensure it uses semantic colors (`text-text-muted`, `hover:text-primary`) rather than hardcoded grays.
**Verification:** The sun/moon icon is easily visible against both backgrounds.

## 5. Risks & Mitigations
- **Risk:** Flash of unstyled content (FOUC) or wrong theme on initial load.
- **Mitigation:** The `useTheme` hook already handles `localStorage` and initial state immediately, which prevents most React-level flashing.
- **Risk:** Existing hardcoded Tailwind colors (e.g. `bg-white`, `text-black`) inside components.
- **Mitigation:** We will update the underlying global theme tokens. Component refactoring (wobbly borders) is planned for Phase 3, but the global tokens should apply to most inherited text automatically.
