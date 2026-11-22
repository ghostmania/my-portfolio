# 06: Light theme with tinted Project blocks

**What to build:** The whole site switches from dark to light, and the Projects become a vertical stack of large blocks, each in its own soft tint. The existing typefaces stay. This is the one bold visual element; everything around it is quiet.

**Blocked by:** 03 (Name-free Projects with Outcome headlines), 04 (Show the Experience timeline without product names), 05 (Brand the site as igorborisenko.dev)

**Status:** ready-for-agent

- [ ] Every section, the header, the footer, the Case study popup, the floating contact control and the mobile menu use the light palette
- [ ] Each Project is a large block with its own tint, assigned automatically from its position so a new Project needs no colour choice
- [ ] Tints are defined once as tokens
- [ ] The existing display, body and monospace typefaces are kept, including their Cyrillic variants
- [ ] Text and controls meet contrast requirements on the page background and on every tint; automated accessibility checks pass on the page and on an open Case study
- [ ] Keyboard focus is clearly visible on every interactive element
- [ ] The browser chrome colour matches the light theme
- [ ] Reduced-motion preference still disables smooth scrolling and transitions
- [ ] No horizontal overflow from small phone to wide desktop, in both languages
- [ ] Styles left over from the dark theme, the gallery, the diagram, the illustrated artwork and the second page are removed
- [ ] The result does not reproduce the reference site's palette, and adds no decorative labels or scattered entrance animation
- [ ] All of typecheck, lint, unit tests, build and end-to-end tests pass
