# 03: Name-free Projects with Outcome headlines

**What to build:** A visitor reads what each Project achieved and never its product name. Each Project is titled by its Outcome headline, carries a Category tag and result chips, and opens a Case study titled by the same headline with no live link. For Igor, a Project becomes one typed entry plus its images, and a check fails when an entry is incomplete.

**Blocked by:** 02 (Remove the gallery and the hero diagram)

**Status:** ready-for-agent

- [ ] A Project entry has an Outcome headline, a Category tag and one ordered screenshot list whose first item is the lead; product name, live URL, the featured flag, the closed id list and the separate gallery field are gone
- [ ] Projects render in list order: wedding platform, construction marketplace, social app, plant catalogue, home-care site
- [ ] Each Project shows its Category tag, Outcome headline as the heading, summary, result chips, technology tags and lead screenshot
- [ ] The action on each Project reads "Read case study" and its accessible name includes the Outcome headline
- [ ] The Case study popup is titled and labelled by the Outcome headline, shows every screenshot, and has no live-link action
- [ ] No product name appears in any headline, summary, section, result label, tag or screenshot description, in English or Russian
- [ ] The illustrated fallback artwork is removed
- [ ] The lead screenshot of each Project is the one where the product logo is least prominent; no image is edited
- [ ] A new content-level test fails when any Project string lacks a Russian translation, when an id repeats, when a Project has no screenshot, or when a known product name appears in Project content or the dictionary
- [ ] The build still fails when a Project points at an image that does not exist
- [ ] The README explains adding a Project in three steps: images, one entry, Russian text
- [ ] The home-care Project keeps an honest short note and no invented detail
- [ ] All of typecheck, lint, unit tests, build and end-to-end tests pass
