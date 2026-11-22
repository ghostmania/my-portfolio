# 01: Collapse the site into one page

**What to build:** The separate projects page disappears and everything a visitor needs is on the home page. After this ticket the home page shows, in order: hero, Projects, Services, About with the grouped skills inside it, and Contact. The header navigation is same-page anchors and marks the current section. The look stays dark and the content is unchanged; this is the prefactor that makes every later ticket a change to one page.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The home page renders hero, Projects, Services, About and Contact in that order
- [ ] The grouped skills appear inside About and the standalone skills section is gone
- [ ] The after-work contact prompt still follows the Projects
- [ ] Header navigation links are same-page anchors to Projects, Services, About and Contact, and the mobile menu still closes on selection and on Escape
- [ ] The separate projects page is no longer built, and the two-page mode is removed everywhere it was threaded through, including page titles in both languages
- [ ] The sitemap lists only the home page
- [ ] Opening a Case study from the home page works with the same focus, Escape, backdrop and scroll-lock behaviour as before
- [ ] Visitor-journey, language, contact and browser tests are updated for one page; tests for moving between two pages are removed
- [ ] Russian still works across the whole page and persists on reload
- [ ] All of typecheck, lint, unit tests, build and end-to-end tests pass
