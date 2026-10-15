# Igor — personal portfolio

React, TypeScript, Vite, Tailwind CSS, and Lucide. This implements the English-language Dark Tech design in `mockup.html` and the scope in `portfolio-project-brief.md`. Both input files are preserved.

Repository: [ghostmania/my-portfolio](https://github.com/ghostmania/my-portfolio). GitHub Pages address: [portfolio](https://ghostmania.github.io/my-portfolio/), [projects](https://ghostmania.github.io/my-portfolio/projects/).

## Pages

- Landing page: hero, services, screenshot gallery with a full-size image viewer, and contact.
- `projects/`: project case studies, About, tech stack, and contact.
- The experience timeline is no longer displayed. Header links connect the pages.
- Gallery arrows and left/right keyboard keys browse images; Escape closes the viewer. “Open full size” opens the original image.

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

| File                                   | Content                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/data/profile.ts`                  | Public name, location, availability, email, social profiles, résumé path, metrics        |
| `src/data/projects.ts`                 | Summaries, technology badges, case studies, results, optional live links and screenshots |
| `src/data/experience.ts`               | Experience entries; add verified dates/titles here                                       |
| `src/data/skills.ts`                   | Capability groups                                                                        |
| `src/components/sections/Services.tsx` | Client-facing service copy                                                               |
| `src/styles/globals.css`               | Prototype design tokens, typography, layout and responsive styles                        |
| `index.html`                           | Page title, description, Open Graph title/description                                    |

The current public name is **Igor**, as required by the brief. The owner-supplied email, LinkedIn, GitHub, Telegram, and résumé are configured in `src/data/profile.ts`. Missing destinations render as clearly labeled text, not dead links. Real configured email/social links become active automatically; copying email announces success or a fallback message.

The supplied résumé is stored at `public/resume.pdf`, with `resume: 'resume.pdf'` enabled. Replace that file to update the download. The build rejects configured résumé/screenshot paths that do not exist. All public asset paths are relative to Vite's base URL.

All five projects use owner-supplied screenshots, including the Heldyn home-care homepage. Add authorized images under `public/projects/` (prefer WebP/AVIF), then set each project's `screenshot` with `path`, meaningful `alt`, `width`, and `height`. The image replaces the illustration. Add a verified `url` to show a live-project link in the dialog. Project copy and experience dates are drawn from the supplied résumé. Additional images can be added to each project’s `gallery` array. See `docs/project-content-sources.md` for attribution and unresolved details.

## Checks

```sh
npm run typecheck
npm run lint
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
```

Vitest and React Testing Library cover visitor journeys, editable contact states, clipboard failure, dialog controls, and metadata validation. Playwright runs Chromium desktop and mobile checks against the production build, including native dialog focus/Escape/backdrop, section navigation, overflow, reduced motion, and axe accessibility checks. Screenshots are written to `test-results/`.

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

For a custom domain, configure it in **Settings → Pages**, set the provider's DNS records as GitHub instructs, and enable **Enforce HTTPS**. Use `/` for the base and your domain for `SITE_URL`. If managing the domain through a `CNAME` file, add only the verified hostname to `public/CNAME`. No SPA fallback is needed: both HTML pages are emitted by Vite; section navigation uses anchors and project details use dialogs.

To roll back, revert the problematic commit on `main` or re-run a known-good workflow with its original source. The workflow publishes the verified build when changes are pushed to main.

## Owner inputs before publishing

- Confirm public name, location, availability, and the supplied experience metrics.
- Supply any missing public project links.
- Review the résumé-based case studies and clarify the Wild Food migration version/date. Heldyn still needs details because it is absent from the résumé.
- Set up the repository and, optionally, a custom domain.

## ECC workflow

Built using the installed `ecc@ecc` 2.2.3 skills: search-first, coding-standards, frontend-patterns, tdd-workflow, deployment-patterns and verification-loop. Cache validation confirmed all manifest references. The plan is in `docs/implementation-plan.md`; test evidence is in `docs/verification.md`. No Git repository existed at intake; the repository was initialized for the first release.

## References

- [Vite deployment guide](https://vite.dev/guide/static-deploy.html)
- [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [React dialog synchronization](https://react.dev/reference/react/useEffect#controlling-a-modal-dialog)
- [Fontsource variable fonts](https://fontsource.org/docs/getting-started/variable)

Fonts are self-hosted Latin variable WOFF2 assets from Fontsource (Inter, Space Grotesk and JetBrains Mono); their licenses are included with the installed font packages. No external fonts, tracking, backend, or contact form service are required.
