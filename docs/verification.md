# Portfolio verification

## Resume and screenshot update — 2026-10-15

Source: `portfolio-project-brief.md`, the supplied `public/resume.pdf`, and owner-supplied images. See `project-content-sources.md` for content decisions.

ECC workflow: coding-standards, frontend-patterns, tdd-workflow and verification-loop from installed ECC 2.2.3. These skills were read and used during implementation.

### Test evidence

- RED: `npm test -- src/components/ProjectCard.test.tsx --reporter=dot` executed the new case-study screenshot test; 1 failed and 2 passed because the modal did not yet render its screenshot.
- GREEN: `npm test -- --reporter=dot` passed all 26 tests after adding the screenshot gallery and updating the résumé-derived content.
- Coverage: `npm run test:coverage -- --reporter=dot` passed. Statements 95.12%, branches 94.04%, functions 92.72%, lines 95.61%.
- Production build: `npm run build` passed, including TypeScript checking and checks that configured résumé, preview and gallery paths exist.
- Lint: `npm run lint` passed without warnings.
- Asset review: four projects have real previews. Two screenshots with customer details were preserved in ignored `reference-assets/private/` and confirmed absent from `dist/projects/`.
- Browser checks initially passed 8/12 and exposed uncentered dialogs and low contrast in the remaining Heldyn illustration. Both issues were corrected. The final `npm run test:e2e -- --workers=2` rerun passed all 12 tests (desktop and mobile), including native dialog behavior, navigation, image loading, overflow, reduced motion and axe accessibility checks.

### Scope and limitations

- Résumé metrics and project links are owner-supplied claims, not independently audited results.
- Heldyn is absent from the résumé; its contribution details remain pending. A home-care homepage screenshot was subsequently supplied and connected.
- Wild Food's stated migration version/date needs confirmation; the target Angular version is omitted from public copy.
- No Git repository or remote is configured in this workspace, so no Git diff, commits, push or deployment occurred.
- No Lighthouse score is claimed. A fresh repository-subpath check and actual GitHub Pages deployment remain separate release checks.

## Heldyn screenshot update

Replaced the final illustrative preview with the supplied 2814 × 1958 PNG. The existing screenshot renderer displays it in both the card and the case study. Updated the browser assertion to expect five real project screenshots. Earlier browser results above describe the preceding revision.

## Landing / technical page split — 2026-10-15

Journeys derived from the owner's request: landing visitors see hero, services and an enlargable image gallery; technical visitors open projects.html for projects, About and skills. The experience timeline is absent from both pages. Existing contact links and project overview dialogs remain available.

- RED: `npm test -- src/App.test.tsx`: 3 failed, 10 passed before implementation (landing sections, enlarged image viewer, technical sections).
- GREEN: same command: 13 passed after implementation.
- `npm run test:coverage`: all 28 tests passed, 88.43% statements, 88.34% branches, 86.76% functions, 88.32% lines.
- `npm run build` and `npm run lint`: passed.
- `npm run test:e2e -- --workers=2`: all 14 tests passed. Desktop/mobile coverage includes both pages, native focus containment/restoration, gallery arrows, Escape, image loading, no horizontal overflow, direct-page refresh, and axe scans on both pages and both dialog types.
- Sitemap RED: 1 failed / 7 passed before adding the technical URL; GREEN: all 8 metadata tests passed afterward.
- Subpath production build succeeded with `VITE_BASE_PATH=/my-portfolio/` and a configured HTTPS site URL. Both HTML outputs and sitemap were emitted.
- Reviewed the generated desktop landing screenshot. Secret/debug pattern scan in source/scripts returned no matches.
- No Git diff is available because this workspace is not a Git repository. This change has not been published.

## Clean project URL and initial release — 2026-10-16

- Changed the technical page from projects.html to projects/index.html, served at /projects/. Updated links, canonical metadata, sitemap, and tests.
- RED: updated route tests failed (8 failed, 13 passed); GREEN: all 28 unit tests passed after implementing the route.
- Production build and lint passed. All 14 desktop/mobile browser tests passed with the clean URL.
- Added the actual social-card.png hero screenshot referenced by publication metadata.
- Git initialized on main; private source screenshots remain ignored.
- Production dependency audit: npm audit --omit=dev reported 0 vulnerabilities.
