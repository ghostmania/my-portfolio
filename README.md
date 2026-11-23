# igorborisenko.dev — personal portfolio

The personal site of Igor Borisenko, a senior full-stack developer. React, TypeScript, Vite, Tailwind CSS and Lucide. One light-themed page in English and Russian.

Repository: [ghostmania/my-portfolio](https://github.com/ghostmania/my-portfolio). The site is currently published at the [GitHub Pages address](https://ghostmania.github.io/my-portfolio/). The brand is `igorborisenko.dev`; buying that domain, moving hosting and redirecting the old address are follow-up tasks.

`GLOSSARY.md` defines the terms used below. `docs/redesign-igorborisenko-dev.spec.md` records the decisions behind the current design. `mockup.html`, `portfolio-project-brief.md` and `docs/implementation-plan.md` describe the earlier dark two-page version and are kept as history.

## The page

Hero with the Portrait, Projects, Services, About with skills, Experience, Contact. Each Project is a tinted block titled by its Outcome headline; "Read case study" opens the Case study in a popup.

**Product names never appear on the site.** They remain only in the Résumé (`public/resume.pdf`). A test fails if one slips into site text.

## Run locally

Use Node 24 LTS (`.nvmrc`); Node 22.12+ is required.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To preview the production build:

```sh
npm run build
npm run preview
```

## Edit content

There is no database. All content is typed files in the repository.

| File                                   | Content                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| `src/data/profile.ts`                  | Name, domain, location, availability, contact links, Résumé, Portrait, metrics |
| `src/data/projects.ts`                 | Projects and their Case studies                                                |
| `src/data/experience.ts`               | Experience entries                                                             |
| `src/data/skills.ts`                   | Skill groups shown in About                                                    |
| `src/components/sections/Services.tsx` | Service copy                                                                   |
| `src/i18n/ru.json`                     | Russian text, keyed by the English string                                      |
| `src/styles/globals.css`               | Design tokens, including the Project tints, and all layout                     |
| `index.html`                           | Page title, description and social tags                                        |

### Add a Project

1. Put its screenshots in a folder under `public/projects/`, named after the kind of product and not its name.
2. Add one entry to the list in `src/data/projects.ts`. The first screenshot is the one shown on the page. The position in the list is the position on the page, and the tint is assigned automatically.
3. Add the Russian text for the entry's strings to `src/i18n/ru.json`.

Then run `npm test`. It fails if a Project or Experience string has no Russian translation, if an id repeats, if a Project has no screenshot, or if a product name appears. When the new product has a name, add it to the list in `src/data/content.test.ts` so the check covers it. `npm run build` fails if a screenshot path does not exist.

### Other assets

- Replace `public/resume.pdf` to update the Résumé download.
- The Portrait is `public/portrait.webp`, made from `reference-assets/portrait-source.png`. After changing it, run `node scripts/generateSocialCard.mjs` to rebuild `public/social-card.png`.
- Missing contact destinations render as clearly labeled text, not dead links.

See `docs/project-content-sources.md` for where project facts come from and what is unresolved.

## Checks

```sh
npm run typecheck
npm run lint
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
```

Vitest and React Testing Library cover visitor journeys, languages, contact states, clipboard failure, dialog controls, content rules and metadata validation. Playwright runs Chromium desktop and mobile checks against the production build, including native dialog focus/Escape/backdrop, section navigation, overflow, reduced motion, and axe accessibility checks. Screenshots are written to `test-results/`.

Native browser semantics are tested in Playwright; jsdom's dialog/IntersectionObserver shims are only for component tests. No Lighthouse score is claimed. See `docs/verification.md` for recorded checks and limits.

## GitHub Pages deployment

1. Create your GitHub repository and push this project to its `main` branch, including `package-lock.json`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Review the missing owner inputs below before publishing. Push to `main` or manually run **Verify and deploy portfolio** from Actions.

`.github/workflows/deploy.yml` installs locked dependencies, runs lint/types/coverage, builds, tests the production page, uploads `dist`, and deploys using the `github-pages` environment. Pull requests run verification without publishing. GitHub Actions supplies the Pages URL and base path using `configure-pages`; publishing permissions are limited to the deployment job. Third-party actions are pinned to commit hashes from Vite's official Pages example.

The workflow reads optional repository variables from **Settings → Secrets and variables → Actions → Variables**:

| Variable         | Project repository                              | User site / custom domain                    |
| ---------------- | ----------------------------------------------- | -------------------------------------------- |
| `VITE_BASE_PATH` | `/my-portfolio/`                                | `/`                                          |
| `SITE_URL`       | `https://YOUR-USERNAME.github.io/my-portfolio/` | Your full HTTPS site URL with trailing slash |

These are examples, not configured owner identifiers. Variables override the automatically detected Pages values. `SITE_URL` controls canonical/OG URLs, `robots.txt`, and `sitemap.xml`. If blank locally, these URL-dependent artifacts are omitted instead of publishing a fabricated domain. The branded `public/social-card.png` is used for social previews when a URL is configured.

To verify a repository subpath locally (POSIX shell):

```sh
VITE_BASE_PATH=/my-portfolio/ SITE_URL=https://example.com/my-portfolio/ npm run build
VITE_BASE_PATH=/my-portfolio/ npm run test:e2e
```

The example domain is only for testing metadata. For the normal local preview, rebuild with `npm run build`. You may also copy `.env.example` to `.env.local` and fill in your actual values. All values shipped in a static site are public; no secrets are needed.

For a custom domain, configure it in **Settings → Pages**, set the provider's DNS records as GitHub instructs, and enable **Enforce HTTPS**. Use `/` for the base and your domain for `SITE_URL`. If managing the domain through a `CNAME` file, add only the verified hostname to `public/CNAME`. No SPA fallback is needed: the site is one HTML page; section navigation uses anchors and Case studies open in dialogs.

To roll back, revert the problematic commit on `main` or re-run a known-good workflow with its original source. The workflow publishes the verified build when changes are pushed to main.

## Owner inputs before publishing

- Confirm location, availability, and the supplied experience metrics.
- Review the résumé-based case studies and clarify the Wild Food migration version/date. Heldyn still needs details because it is absent from the résumé.
- Buy `igorborisenko.dev`, move hosting, and redirect the old address.

## History

The first release was built using the installed `ecc@ecc` 2.2.3 skills: search-first, coding-standards, frontend-patterns, tdd-workflow, deployment-patterns and verification-loop. Cache validation confirmed all manifest references. The plan is in `docs/implementation-plan.md`; test evidence is in `docs/verification.md`. No Git repository existed at intake; the repository was initialized for the first release.

## References

- [Vite deployment guide](https://vite.dev/guide/static-deploy.html)
- [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React dialog synchronization](https://react.dev/reference/react/useEffect#controlling-a-modal-dialog)
- [Fontsource variable fonts](https://fontsource.org/docs/getting-started/variable)

Fonts are self-hosted Latin variable WOFF2 assets from Fontsource (Inter, Space Grotesk and JetBrains Mono); their licenses are included with the installed font packages. No external fonts, tracking, backend, or contact form service are required.
