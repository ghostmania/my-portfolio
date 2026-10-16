# Contact discovery implementation

The plan came from the user's visitor feedback and approved contact-button proposal.

## Delivered behavior

- Direct email is the primary hero/header action; Telegram is available beside the hero email action.
- Both the gallery and technical project list end with email and Telegram actions.
- Email and Telegram appear above the résumé in the contact section.
- A persistent bottom-right contact button opens a non-modal contact panel on both pages.
- The panel supports keyboard focus, Escape, an explicit close button, outside-click dismissal, and focus restoration.
- English and Russian labels share the existing language preference. Mobile header contact uses a labeled email icon to leave room for the language switch and navigation.

## TDD evidence

| Guarantee | Test | Evidence |
| --- | --- | --- |
| Direct contact at the start, after work, and before the résumé | `src/ContactJourneys.test.tsx` | RED: required Contact me link missing; GREEN: passes |
| Floating panel exposes email/Telegram and supports dismissal | `src/ContactJourneys.test.tsx` | RED: Contact me button missing; GREEN: passes |
| Russian contact actions work on the technical page | `src/ContactJourneys.test.tsx` | RED: translated post-project prompt missing; GREEN: passes |
| Floating control stays at the viewport bottom, links point to the owner's destinations, and focus works | `e2e/contact.spec.ts` | Four English/Russian desktop/mobile cases passed |
| Contact controls fit a 320px viewport and the panel passes accessibility scans | `e2e/contact.spec.ts` | Narrow viewport assertions and axe scans passed |

RED command: `volta run --node 24.0.0 npm test -- src/ContactJourneys.test.tsx` — 3 tests failed for the expected missing features.

GREEN command: the same command — 3 tests passed.

Local checkpoint commits: `01cb03e` (RED tests), `5eb42be` (implementation and GREEN).

## Validation

- `npm run build`: passed, including TypeScript checking.
- `npm run lint`: passed.
- `volta run --node 24.0.0 npm run test:coverage`: 39 tests passed. Statements 95.63%, branches 93.51%, functions 92.59%, lines 96.03%; all configured thresholds passed.
- `npm run test:e2e`: final full run passed 20/20 tests. Checks cover both languages, both pages, desktop/mobile layouts, carousel/project dialogs, language persistence, and accessibility.
- The first browser run passed 18/20 tests. Two contact tests compared the button's top edge while its font was loading. The assertion now checks the bottom edge after fonts are ready; all four contact cases passed on rerun.
- Desktop/mobile screenshots were visually reviewed in English and Russian.
- Diff and new-component review found no injected HTML, dynamic code execution, or added dependencies.

Tests verify contact destinations without sending messages or opening external mail/chat applications. No deployment was performed.
