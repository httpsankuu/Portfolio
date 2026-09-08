# Codebase Architecture

**Analysis Date:** 2026-09-08

## Architectural Pattern
Single-Page Application (SPA) using React.

## Core Layers
1. **Presentation**: React components, styled with Tailwind CSS, animated with Framer Motion.
2. **Logic & State**: Local component state, custom hooks (e.g. useTheme).
3. **Data**: Hardcoded constants in config.ts and client-side fetching.

## Key Abstractions
- **SectionReveal**: Framer motion wrapper for scroll reveals.
- **ErrorBoundary**: Top-level error catcher.

---
*Generated codebase analysis: 2026-09-08*
<!-- refreshed: 2026-09-08 -->
