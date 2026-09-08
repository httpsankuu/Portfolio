# Codebase Concerns

**Analysis Date:** 2026-09-08

## Tech Debt
- html2canvas and liquid-glass.js scripts are used in glass-preview.html which can be a heavy performance bottleneck.
- Missing automated testing suite.

## Security
- No major concerns. `GITHUB_USERNAME` is hardcoded but it's a public portfolio. `.env` is empty of sensitive tokens.

---
*Generated codebase analysis: 2026-09-08*
<!-- refreshed: 2026-09-08 -->
