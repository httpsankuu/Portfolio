# Project Roadmap

## Current Status
**Active Phase:** None (Project Initialized)
**Completion:** 0/3 Phases

---

## Phase 1: Foundation & Typography
**Goal:** Set up the core color palette, background paper texture, and handwritten typography globally.
**Mode:** mvp
**Requirements:** STYLE-03, TYPO-01, TYPO-02
**Success Criteria:**
1. Background renders with `#fdfbf7` and a radial gradient paper texture.
2. Headings use Kalam font and body text uses Patrick Hand font.
3. Text color is `#2d2d2d` and primary accent elements use `#ff4d4d`.
**UI hint:** yes

## Phase 2: Hand-Drawn Dark Mode
**Goal:** Implement a dark mode color palette for the Hand-Drawn theme that retains the paper texture and aesthetic but flips colors for low-light viewing.
**Mode:** mvp
**Requirements:** DARK-01
**Success Criteria:**
1. CSS variables configured to support both `.light` and `.dark` (or via media query).
2. Background texture adapted for a dark paper look (e.g., `#1a1a1a` or dark slate).
3. Text colors and accents adjust for sufficient contrast in dark mode.
4. A ThemeToggle component allows switching between light and dark modes.
**UI hint:** yes
## Phase 3: Interactive States & Organic Rotation
**Goal:** Make interactive elements playful with flat-press clicks and organic rotations.
**Mode:** mvp
**Requirements:** INT-01, INT-02, INT-03
**Success Criteria:**
1. Buttons translate down and right on `:active` with the offset shadow disappearing.
2. Cards and specific inputs apply slight rotations (`rotate-1` or `-rotate-1`).
3. Inputs display wobbly borders and styled focus states.
**UI hint:** yes
