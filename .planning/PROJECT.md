# Project Context

## What This Is
A UI overhaul and design system integration for a static frontend developer portfolio. The project transforms the existing standard UI into a playful, highly textured "Hand-Drawn" aesthetic.

## Core Value
To create a memorable, uniquely styled portfolio that stands out through authentic texture, playful rotation, intentional messiness, and engaging interactive states (like buttons pressing flat).

## Requirements

### Validated
- ✓ Modern SPA architecture with React and TypeScript — existing
- ✓ Styling established with Tailwind CSS v4 and Framer Motion — existing
- ✓ GitHub API integration for dynamic repo stats — existing
- ✓ Standard portfolio sections (Hero, About, Arsenal, etc.) — existing

### Active
- [ ] Integrate "Hand-Drawn" design system globally across all components.
- [ ] Implement wobbly borders (`border-radius: 255px 15px 225px 15px/15px 225px 15px 255px`) on containers, inputs, and cards.
- [ ] Implement hard offset shadows (`4px 4px 0px 0px #2d2d2d`) that disappear on active/pressed states.
- [ ] Integrate handwritten typography (Kalam for headings, Patrick Hand for body text).
- [ ] Apply the target color palette (Background: `#fdfbf7`, Text: `#2d2d2d`, Accent: `#ff4d4d`).
- [ ] Add paper textures via radial gradients to the global background.
- [ ] Apply slight rotations (`rotate-1`, `-rotate-1`) to card elements for organic feel.

### Out of Scope
- [Backend Development] — The portfolio will remain a static frontend site.
- [New Content Sections] — The focus is on restyling existing content, not adding new portfolio data.

## Key Decisions
| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Adopt "Hand-Drawn" UI | Creates a unique personal brand and demonstrates advanced CSS/Tailwind skills | — Pending |
| Preserve existing React/Vite stack | Ensures fast builds and easy component-level restyling | — Pending |

## Evolution
This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-08 after initialization*
