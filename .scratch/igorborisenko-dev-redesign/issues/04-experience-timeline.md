# 04: Show the Experience timeline without product names

**What to build:** A recruiter sees Igor's working history on the home page, between About and Contact, with each Experience entry titled by the kind of product. The headline daily-users metric is described by kind as well. After this ticket the Résumé is the only place a product name appears.

**Blocked by:** 03 (Name-free Projects with Outcome headlines)

**Status:** ready-for-agent

- [ ] The Experience timeline renders on the home page between About and Contact and has a navigation link
- [ ] Entries are titled "Wedding-planning platform", "Construction-supplies marketplace" and "Plant catalogue application"; the advertising agency keeps its real name
- [ ] The entry that mentions a second product describes it by kind
- [ ] The daily-users metric label names the kind of product, not the product
- [ ] Every Experience string is translated into Russian, including periods and roles
- [ ] The content-level test from the previous ticket now also covers Experience entries and profile content, for both the translation rule and the product-name rule
- [ ] The Résumé file is unchanged and still downloads
- [ ] All of typecheck, lint, unit tests, build and end-to-end tests pass
