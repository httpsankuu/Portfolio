# UI Design Contract — Phase 2: Hand-Drawn Dark Mode

## 1. Design System & Brand
**Core Motif:** Hand-Drawn, organic, and playful.
Phase 2 introduces a Dark Mode equivalent for the hand-drawn theme, ensuring the portfolio is comfortable to view in low-light environments while retaining its playful, textured "sketchbook" or "chalkboard" aesthetic.

## 2. Typography Contract (No changes)
- Headings: Kalam, Bold
- Body: Patrick Hand, Regular

## 3. Color Contract

| Token | Light Mode (Phase 1) | Dark Mode (Phase 2) | Usage |
|-------|----------------------|---------------------|-------|
| `--color-bg` | `#fdfbf7` | `#1a1a1a` | Base background |
| `--color-bg-highlight` | `#ffffff` | `#2a2a2a` | Center highlight for radial paper texture |
| `--color-bg-card` | `#fdfbf7` | `#242424` | Card backgrounds |
| `--color-text` | `#2d2d2d` | `#e5e5e5` | Primary text |
| `--color-text-muted` | `#4a4a4a` | `#a3a3a3` | Secondary text |
| `--color-border` | `#2d2d2d` | `#e5e5e5` | Structural borders |
| `--color-primary` | `#ff4d4d` | `#ff6b6b` | Main accent / selection |
| `--color-accent` | `#ff4d4d` | `#ff6b6b` | Highlight details |

## 4. Texture System
- The background `radial-gradient` remains to simulate paper texture, but uses `--color-bg-highlight` fading into `--color-bg` to provide depth in dark mode without blinding the user.

## 5. Interaction
- The `ThemeToggle` component (already utilizing `useTheme`) will switch between `.light` (class on HTML) and the default dark mode.
