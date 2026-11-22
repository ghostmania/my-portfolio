# Spec: igorborisenko.dev rebrand, name-free Projects and light single-page redesign

Status: ready for implementation. Vocabulary follows `GLOSSARY.md`. No ADRs exist yet.

## Problem Statement

Igor's portfolio does not present him the way he wants to be found or remembered.

- The site lives at a long GitHub Pages address and brands itself with the bare first name "Igor". Igor wants a short, ownable identity built around the domain `igorborisenko.dev` and his full name.
- Every Project is introduced by its product name. Igor considers those names noise: a visitor does not know the products, and the name says nothing about what Igor achieved.
- The site is dark, split across two pages, and carries a screenshot gallery, an architecture diagram and a separate technical page. Igor admires the simplicity of antonnevin.com, where a light single page leads with a short first-person hero and a stack of large, outcome-led project blocks.
- Adding a Project means touching five places: the project list and its hand-written id union, a fallback-artwork map, the image folder, a separately maintained gallery list, and the Russian dictionary. Nothing warns Igor when he forgets one.

## Solution

A single light-themed page, branded as `igorborisenko.dev`, that tells a visitor who Igor is and what his work achieved without naming any product.

- The Wordmark is the full domain. The favicon and social card carry an "IB" monogram and the full name. Titles and metadata say "Igor Borisenko"; the hero still speaks as "Hi, I'm Igor".
- The hero is short: a first-person introduction, one headline, the Portrait, the contact actions and three headline metrics.
- Projects sit on the home page as a vertical stack of large tinted blocks. Each is titled by its Outcome headline, labelled with a Category tag, and shows a summary, metric chips, technology tags, one lead screenshot and a way to open the Case study in a popup.
- Product names appear nowhere on the site. The Résumé download is the only place they remain.
- Services, About (now including skills), an Experience timeline and Contact follow. The gallery, the hero diagram and the separate projects page are gone.
- A new Project is one typed entry plus its images. A check fails loudly when the entry is incomplete.
- Both languages keep working throughout.

## User Stories

### Brand

1. As a visitor, I want to see `igorborisenko.dev` as the Wordmark in the header, so that I learn the address I can come back to.
2. As a visitor, I want the `.dev` part of the Wordmark visually distinguished, so that it reads as a domain and not as a name.
3. As a visitor on a phone, I want the full Wordmark to fit the header without wrapping or overflowing, so that the header stays usable.
4. As a visitor, I want the Wordmark to take me to the top of the page, so that I can always get back to the start.
5. As a visitor, I want the browser tab to show an "IB" monogram icon, so that I can find the tab among others.
6. As a recruiter, I want the browser title to read "Igor Borisenko" with his role, so that I can identify him by full name.
7. As a recruiter searching by name, I want the page description and social metadata to carry the full name, so that search results and link previews identify him.
8. As someone receiving a shared link, I want the social preview card to show Igor's full name, role, domain and Portrait, so that I know whose site it is before opening it.
9. As a Russian-speaking visitor, I want the name shown as "Игорь Борисенко" in titles and metadata, so that the Russian version feels native.
10. As a visitor, I want the hero to greet me as "Hi, I'm Igor", so that the page reads as a person speaking and not as a company.
11. As a visitor, I want the footer to carry the same Wordmark and the full name in the copyright line, so that the brand is consistent top to bottom.

### Hero

12. As a visitor, I want a one-line introduction saying who Igor is and where he is based, so that I can place him immediately.
13. As a visitor, I want one headline that states what Igor does for a product, so that I understand his value in a single read.
14. As a visitor, I want to see Igor's Portrait beside the introduction, so that I am dealing with a real person.
15. As a visitor using a screen reader, I want the Portrait to have a meaningful text alternative, so that I know what the image shows.
16. As a visitor on a slow connection, I want the Portrait delivered at web size in a modern format with reserved dimensions, so that the hero loads fast and does not shift.
17. As a visitor, I want a primary action that takes me to the Projects, so that I can go straight to the evidence.
18. As a visitor, I want direct email and Telegram actions in the hero, so that I can contact Igor without scrolling.
19. As a visitor, I want three headline metrics near the hero, so that I can gauge experience at a glance.
20. As a visitor, I want the daily-users metric described by the kind of product and not its name, so that the figure still makes sense to me.
21. As a visitor, I want to see that Igor is available for remote work, so that I know whether to reach out.
22. As a visitor, I do not want an abstract architecture diagram in the hero, so that nothing competes with the introduction.

### Projects

23. As a visitor, I want the Projects on the home page, so that I do not have to find a second page to see the work.
24. As a visitor, I want each Project titled by its Outcome headline, so that I learn what was achieved before anything else.
25. As a visitor, I want each Project labelled with a Category tag, so that I know what kind of product it was.
26. As a visitor, I want a short summary under each Outcome headline, so that I get the context in two sentences.
27. As a visitor, I want the key results shown as compact metric chips on the Project, so that the numbers stand out.
28. As a visitor, I want the technologies shown as tags, so that I can match the work to my stack.
29. As a visitor, I want one lead screenshot per Project, so that I can see the product was real.
30. As a visitor, I want each Project to be its own large tinted block in a vertical stack, so that the Projects are easy to tell apart while scrolling.
31. As a visitor, I want the Projects ordered from strongest to thinnest, so that the best work comes first.
32. As a visitor, I never want to read a product name in a Project's headline, summary, tags, results or captions, so that the page is about outcomes.
33. As a visitor using a screen reader, I want screenshot descriptions that describe the screen without naming the product, so that the hiding rule holds for me too.
34. As a visitor, I do not want links to the live products, so that the product name is not one click away.
35. As a visitor, I want a "Read case study" action on every Project, so that I can go deeper when one interests me.
36. As a visitor using a screen reader, I want that action's accessible name to include the Outcome headline, so that I can tell five identical-looking actions apart.
37. As a visitor, I want a contact prompt directly after the Projects, so that I can act while the work is fresh in my mind.

### Case study

38. As a visitor, I want the Case study to open in a popup over the page, so that I keep my place.
39. As a visitor, I want the popup titled with the Outcome headline, so that I know which Project I opened.
40. As a visitor, I want the Case study to cover the challenge, Igor's role, the solution and the results, so that I understand his contribution.
41. As a visitor, I want the Case study to show all of the Project's screenshots, so that I can see more than the lead image.
42. As a visitor, I want no product name and no live link anywhere in the Case study, so that the hiding rule is consistent.
43. As a keyboard user, I want focus to move into the popup, stay inside it and return to the action I used when it closes, so that I never lose my place.
44. As a keyboard user, I want Escape to close the popup, so that I can leave quickly.
45. As a mouse user, I want a click outside the popup to close it and a click inside to keep it open, so that it behaves as expected.
46. As a visitor, I want the page behind the popup not to scroll while it is open, so that I do not lose my position.
47. As a visitor reading the thinnest Project, I want an honest short note and not invented detail, so that I can trust the rest.

### Other sections

48. As a prospective client, I want a Services section describing what Igor can build for me, so that I know whether my need fits.
49. As a visitor, I want an About section that describes how Igor works, so that I can judge fit beyond the technology.
50. As a visitor, I want the skills listed inside About, grouped by area, so that I do not need a separate section to find his stack.
51. As a recruiter, I want an Experience timeline with periods and roles, so that I can check continuity of work.
52. As a recruiter, I want each Experience entry titled by the kind of product, so that the timeline stays readable without product names.
53. As a recruiter, I want the advertising-agency entry to keep its real employer name, so that at least the plain employer is verifiable.
54. As a recruiter, I want an Experience entry that mentions a second product to describe it by kind, so that no product name leaks through a description.
55. As a visitor, I want a closing Contact section with email, Telegram, LinkedIn, GitHub and the Résumé download, so that I can choose how to follow up.
56. As a recruiter, I want the Résumé to keep the real product names, so that I can verify the history when I need to.
57. As a visitor, I do not want a screenshot gallery, so that I am not shown the same images twice.
58. As a visitor, I do not want a testimonials section until real quotes exist, so that nothing on the page is invented.
59. As a visitor following an old link to the separate projects page, I want to know that page no longer exists, so that the change is a deliberate decision and not a surprise. (Accepted: the old path stops resolving.)

### Navigation and persistent contact

60. As a visitor, I want header navigation to Projects, Services, About, Experience and Contact, so that I can jump to any section.
61. As a visitor, I want the navigation to mark the section I am in, so that I know where I am.
62. As a visitor on a phone, I want the navigation behind a menu button that closes after I choose a link, so that it does not cover the page.
63. As a keyboard user, I want Escape to close the open menu and return focus to its button, so that I can dismiss it without a pointer.
64. As a visitor, I want a contact action in the header, so that contact is always one step away.
65. As a visitor, I want the floating contact control to keep working as it does today, so that I can reach Igor from anywhere on the page.
66. As a keyboard user, I want a skip link to the main content, so that I can bypass the header.

### Look and feel

67. As a visitor, I want a light page with dark text, so that the site feels calm and simple.
68. As a visitor, I want the existing typefaces kept, so that the site still feels like Igor's and not a copy of the reference.
69. As a visitor, I want each Project block in its own soft tint, so that colour separates the Projects without decoration.
70. As a visitor with low vision, I want text and controls to meet contrast requirements on the light background and on every tint, so that I can read everything.
71. As a keyboard user, I want a clearly visible focus indicator on the light theme, so that I can see where I am.
72. As a visitor who prefers reduced motion, I want smooth scrolling and transitions switched off, so that the page does not move unexpectedly.
73. As a visitor on any screen from small phone to wide desktop, I want no horizontal scrolling, so that the layout always fits.
74. As a visitor, I want the browser chrome colour to match the light theme, so that the page does not sit inside a dark frame on a phone.

### Languages

75. As a Russian-speaking visitor, I want to switch the whole page to Russian, so that I can read it in my language.
76. As a Russian-speaking visitor, I want every Outcome headline, Category tag, summary, Case study, result label, Experience entry and screenshot description translated, so that no English is left behind.
77. As a returning visitor, I want my language choice remembered, so that I do not have to switch again.
78. As a visitor whose browser blocks storage, I want language switching to still work during my visit, so that a privacy setting does not break the site.
79. As a Russian-speaking visitor, I want Russian headlines sized so that they fit on a phone, so that longer Russian words do not overflow.

### Maintaining the site

80. As Igor, I want to add a Project by writing one typed entry and dropping its images in a folder, so that adding work is quick.
81. As Igor, I do not want to register a new Project's id in a second place, so that I cannot forget it.
82. As Igor, I do not want to maintain a separate gallery list, so that screenshots are described once.
83. As Igor, I want a Project's tint assigned automatically, so that a new entry needs no design decision.
84. As Igor, I want the order of entries in the list to be the order on the page, so that reordering is a cut and paste.
85. As Igor, I want a check to fail when a Project is missing a Russian translation, so that I never ship half-translated work.
86. As Igor, I want a check to fail when a known product name appears in site text, so that a name cannot slip back in.
87. As Igor, I want the build to fail when a Project points at an image that does not exist, so that I never publish a broken image.
88. As Igor, I want the README to explain how to add a Project in a few steps, so that I do not need to re-read the code.
89. As Igor, I want no database or content management system, so that the site stays free to host and has nothing to operate.
90. As Igor, I want the site to keep deploying to its current address until I buy the domain, so that nothing goes offline in the meantime.

## Implementation Decisions

### Decisions made with Igor

- **Domain and brand.** The brand is `igorborisenko.dev`. `igor.dev` was already registered. The domain is not yet purchased; Igor will buy it later.
- **Name.** "Igor Borisenko" in titles, metadata, the social card and the copyright line. "Igor" in conversational hero copy. Russian form "Игорь Борисенко".
- **Hiding rule.** Product names are removed for style reasons, not confidentiality. They are removed from all site text, accessible names, screenshot descriptions, metrics and Experience entries. Live product links are removed. The Résumé is the only place names remain. Screenshots are not edited, even where a logo is visible; the lead screenshot per Project should be the one where the logo is least prominent.
- **Experience titles.** The wedding-platform entry becomes "Wedding-planning platform", the marketplace entry becomes "Construction-supplies marketplace", the plant entry becomes "Plant catalogue application". The advertising agency keeps its real name.
- **Reference site.** Take the structure of antonnevin.com, not its look: outcome-led stacked Project blocks, a shorter hero, one closing call to action. Keep the current typefaces and both languages.
- **Theme.** Light. One tinted block per Project.
- **Sections.** Remove the gallery, the hero architecture diagram and the separate projects page. Merge skills into About. Keep Services, Experience and Contact. No testimonials.
- **Case study.** Stays a popup. No per-Project pages.
- **Projects shown.** All five, ordered: wedding platform, construction marketplace, social app, plant catalogue, home-care site.
- **Portrait.** Supplied by Igor. Shown on the right of the hero as a rounded square cropped to head and shoulders, and reused on the social card. The untouched source is stored in the repository's non-published reference assets; the published copy must be compressed to web size.
- **Content storage.** Typed content in the repository. No database.

### Modules

- **Profile content.** Gains the full name, the first name for conversational copy and the domain used by the Wordmark. The daily-users metric label describes the product by kind.
- **Project content.** The single source of truth for a Project. The entry shape changes as follows:
  - removed: product name, live URL, the "featured" flag, the closed id union, the separate lead-screenshot and gallery fields;
  - added: Outcome headline, Category tag, and one ordered screenshot list whose first item is the lead;
  - kept: id (now any unique string), summary, intro, technology tags, Case study sections, results.
    The tint is derived from the entry's position, cycling through a fixed palette. Page order is list order.
- **Project block.** Renders one Project as a tinted block: Category tag, Outcome headline as the heading, summary, result chips, technology tags, lead screenshot, and the "Read case study" action whose accessible name includes the Outcome headline. The illustrated fallback artwork is removed; a Project always has at least one screenshot.
- **Case study popup.** Titled and labelled by the Outcome headline. Renders intro, results, sections, every screenshot and the technology tags. The live-link action is removed. The generic popup behaviour (focus handling, Escape, backdrop, scroll lock) is reused unchanged.
- **Projects section.** Renders every Project in list order on the home page, followed by the existing after-work contact prompt.
- **Hero.** Rewritten: availability, first-person introduction, headline, Portrait, a primary action to the Projects, the existing contact actions, and the metrics. The diagram is removed.
- **About.** Absorbs the grouped skills. The standalone skills section is removed.
- **Experience.** Rendered on the home page (it exists today but is not displayed and is not translated). Entries are retitled per the hiding rule and fully translated.
- **Header and footer.** Wordmark becomes the domain. Navigation becomes same-page anchors to Projects, Services, About, Experience and Contact. The two-page "technical" mode is removed everywhere it is threaded through.
- **App shell.** One page. Section order: hero, Projects, Services, About, Experience, Contact.
- **Language provider and dictionary.** Titles and descriptions use the full name; the second-page variants are removed. The dictionary gains Russian for every new string and loses entries that are no longer used.
- **Page shell and metadata.** One HTML entry. Title, description, social tags and theme colour updated. The build no longer emits a second page, and the sitemap lists only the home page.
- **Icon and social card.** Favicon redrawn as an "IB" monogram for the light theme. Social card regenerated at the same dimensions with full name, role, domain and Portrait.
- **Styles.** The global stylesheet is retokenised for a light palette and trimmed of gallery, diagram, illustrated-artwork and second-page rules. Contact styles are adjusted to the new tokens. Tint colours are defined once as tokens.
- **Documentation.** README rewritten for the single page and the new "add a Project" steps. The content-sources note is updated to describe the hiding rule. The glossary is already updated.

### Adding a Project after this change

1. Put the screenshots in a folder named after the Project's id under the published project images.
2. Add one entry to the project list.
3. Add the Russian text for the entry's strings to the dictionary.

The checks described below fail if step 1 or step 3 is incomplete.

## Testing Decisions

A good test here exercises what a visitor can see and do: headings, accessible names, links, focus, language. It does not assert on class names, component structure or the shape of content objects.

**Seams, highest first. These were chosen without Igor's confirmation and are open to correction.**

1. **The rendered application, in component tests.** This is the main seam and already exists as the visitor-journey, language and contact-journey suites. Update them rather than add new seams. They should cover:
   - section order on the single page;
   - the Wordmark text and its accessible name;
   - the hero's heading, Portrait, action to the Projects, and email and Telegram actions;
   - five Projects, each a heading with its Outcome headline and a "Read case study" action named with that headline;
   - opening a Case study, its title, sections and results, scroll lock, focus trap, backdrop behaviour and focus return;
   - absence of any live product link in a Case study;
   - the Experience timeline's retitled entries;
   - navigation open, close on selection, Escape;
   - contact links and Résumé download;
   - switching to Russian and back, persistence, unsupported saved value, blocked storage.
2. **The production build in a real browser.** The existing Playwright suites, updated for one page. They keep covering fonts and assets loading without errors, no horizontal overflow on desktop and mobile, native dialog behaviour, navigation, reduced motion, and axe accessibility checks on the page and on an open Case study. The accessibility checks matter more than before because the palette changes. The tests for the gallery and for moving between two pages are removed.
3. **Project content rules, as one content-level test.** This is the only new seam, and it exists to protect Igor when he adds a Project. It asserts over the real content:
   - every translatable string of every Project and every Experience entry has a Russian translation;
   - no known product name appears in any site-visible string, in either language, across Project, Experience and profile content and the dictionary;
   - every Project has an id unique in the list and at least one screenshot.
     The list of known product names lives with this test.
4. **Build-time asset check.** Already exists; it must follow the new screenshot list so a missing image still fails the build.
5. **Site metadata.** The existing unit test is updated: the sitemap no longer lists a second page, and the image description uses the full name.

Prior art: the existing visitor-journey suite for dialog and navigation behaviour, the language suite for translation and storage, the contact suites for contact actions, the Project card suite for screenshot attributes, and the Playwright suites for browser-level behaviour. The gallery suite is deleted with the gallery.

All of typecheck, lint, unit tests with coverage, build and end-to-end tests must pass before the work is considered done.

## Out of Scope

- Buying `igorborisenko.dev`.
- Moving hosting from GitHub Pages to Vercel, and wiring the custom domain.
- Redirecting the old GitHub Pages address, or the removed projects path, to the new site.
- Editing or blurring screenshots.
- Changing the Résumé file.
- Testimonials.
- Per-Project pages or shareable Case study links.
- A database, a content management system or any admin interface.
- Automatic translation of new content.
- A dark theme or a theme switch.

## Further Notes

- **Name availability.** `igorborisenko.dev` showed no registry record when checked on 2026-11-22. Checkout is the final confirmation.
- **Thin Project.** The home-care Project has no confirmed detail in the Résumé. Its block will be visibly thinner than the others. Dropping it to show four strong Projects was offered and declined for now.
- **Employer verifiability.** With product names gone from Experience, three of the four entries cannot be verified from the site alone. The Résumé covers this, and Igor accepted the trade-off.
- **Existing content caveats.** The content-sources note records unresolved details, including a version and date mismatch in the plant-catalogue entry and the instruction not to attribute every visible feature to Igor. Those caveats still apply.
- **Design approach.** The reference site's known look is a white page with pastel blocks. The implementation should take that simplicity without reproducing its palette, and should avoid decorative labels and scattered entrance animation. One bold element is enough: the tinted Project stack.
- **State of the work.** A feature branch named for this redesign exists and contains only the new glossary and this spec. No site code has been changed.
