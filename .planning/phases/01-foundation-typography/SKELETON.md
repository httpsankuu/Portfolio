# Walking Skeleton: Portfolio UI Overhaul

## Definition
A walking skeleton is a tiny, end-to-end implementation of the system that performs a minimal viable function, allowing the team to verify the build, deployment, and core architecture before filling out details.

## Skeleton for Phase 1
The walking skeleton for Phase 1 is the successful loading of the `index.html` file rendering a primary text element (e.g. a heading or body text) using the injected Google Fonts (Kalam/Patrick Hand) against a background displaying the off-white paper texture radial gradient.

## Verification
- Run `npm run dev`.
- Inspect the element in the browser to ensure `font-family` resolves to "Patrick Hand" (or "Kalam" for headings).
- Verify the `--color-bg` custom property and the `background-image` radial gradient apply to the `body` tag without being overridden by legacy tailwind utility classes.
