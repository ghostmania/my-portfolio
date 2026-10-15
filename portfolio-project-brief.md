# Personal Portfolio — Implementation Brief

> **Purpose:** This is a self-contained handoff for continuing development in a coding console or with a coding agent. Use it as the source of truth for building the first implementation.

## Objective

Build a polished, performant **English-language, single-page Dark Tech portfolio** for **Igor**, a Senior Full-stack Developer. The website must persuade **both recruiters/employers and prospective freelance clients**. It is a real implementation project, not just a mockup.

The site should convey within 10–15 seconds who Igor is, what he builds, evidence of results, and how to contact him.

## Approved scope (all items required)

- English copy and dark theme.
- A single page with sticky header and anchor navigation.
- Strong emphasis on **Hochzeit.click**, plus 3–4 additional projects.
- A distinct **Services / What I Do** section for clients.
- Contact options: **email, LinkedIn, GitHub, Telegram**.
- **Accessible project-detail modal dialogs** (no separate project routes initially).
- **Downloadable PDF resume**.
- Fully responsive mobile layout.
- **GitHub Pages hosting**, automatically deployed via **GitHub Actions**.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Motion (optional tasteful scroll/entrance animations; honor `prefers-reduced-motion`)
- lucide-react icons
- Static content stored in typed TypeScript files (no backend, no CMS)
- GitHub Actions for build and deployment to GitHub Pages
- Client-side only, compatible with static hosting under a repo subpath

## Visual design system

**Theme:** premium minimalist Dark Tech, not a generic flashy developer template.

**Palette**:

| Role | Hex |
| --- | --- |
| Page background | `#0B0F17` |
| Card background | `#141C29` |
| Alternative panel | `#101722` |
| Card border | `#263247` |
| Primary/accent cyan | `#65D9E8` |
| Heading text | `#F3F6FC` |
| Muted text | `#95A5B9` |
| Available status | `#55DDAA` |

**Fonts**:
- Display/headings: Space Grotesk
- Body: Inter
- Micro-labels/technical details: JetBrains Mono

**Aesthetic**: spacious editorial hierarchy, generous white space, slightly rounded cards, fine low-contrast strokes, gentle accent glow on hover, soft gradient or subtle grid texture in hero. Avoid aggressive neon, particle backgrounds, 3D effects, terminal typing gimmicks, oversized animations. Maintain accessible contrast and clear focus styles.

**Layout**: max-width approximately 1120–1200px, responsive grid; hero headline substantial on desktop and mobile; project artwork prominent. Sticky translucent header with backdrop blur. Anchor scroll targets must account for sticky header.

## Page order and content

### 1. Header

- Wordmark: `IB.` / `Igor` or `Igor Borisenko` **(confirm exact public-facing full name before using it; default to Igor)**.
- Links to `Projects`, `About`, `Skills`, `Services`, `Experience`, `Contact`.
- Primary button `Let's Talk` linking to contact section.
- On mobile, accessible menu toggle.

### 2. Hero

Suggested copy (editable):

- Status pill: **Available for remote work**
- Location: **Batumi, Georgia · UTC+4** (the owner can easily edit this).
- Main heading: **Building digital products that make an impact.**
- Subheading: **Hi, I'm Igor — a Senior Full-stack Developer with 8+ years of experience building fast, scalable web applications.**
- CTAs: **Explore Projects** (scroll to projects) and **Get in Touch** (scroll to contact).
- Metrics: **8+ years of experience**, **15+ projects delivered**, **500+ daily users on a product**.

### 3. Featured Projects (highest priority)

One large feature block for Hochzeit.click, followed by 3–4 smaller project cards. Each card should support a screenshot, summary, technology badges, role/results, links when provided, and a `View case study` button opening a modal.

**Featured: Hochzeit.click**
- B2C wedding-planning platform for Germany.
- Developed/owned end to end over around seven years: architecture, frontend, backend, integrations, and deployments.
- **500+ daily active users**.
- **Initial load time improved from 4.0s to 1.5s** (approx. 62.5% reduction).
- Relevant tech: Angular, Firebase, Node.js, Stripe, BigQuery; HubSpot, GA4 as applicable.
- Features: bookings, vendor dashboards, search, payments/subscriptions, integrations, performance improvements.
- Case study sections: Challenge, My Role, Solution/Architecture, Key Features, Results, Tech Stack.

**Additional projects (confirm/edit details and links; avoid inventing quantitative outcomes):**
- **Parametric.one** — marketplace; Angular, Ionic, RxJS among the technologies previously used; verify exact project-specific tools before publishing.
- **Heldyn** — healthcare/medical application; Angular-related development; confirm public details and permissions.
- **Pyjam** — mobile application; Ionic + Capacitor; confirm public details and permissions.
- Optional fourth: another user-approved project (e.g. ListCast when appropriate or Wild Food). Do not represent concepts as shipped products.

**Images:** Use clearly labeled placeholder assets until the owner supplies actual authorized screenshots. Do not embed unrelated stock or incorrectly attributed screenshots. All external links must be genuine and supplied/verified.

**Modal UX**:
- Focus trap, escape-key close, close button, backdrop close, restore focus to triggering card.
- Semantic dialog labels; prevent background scroll while open.
- Responsive vertically scrollable content; images have meaningful alt text.

### 4. About Me

Suggested heading: **More than just writing code.**

Suggested description: **I'm a full-stack developer focused on building reliable products — from architecture and implementation to deployment and optimization. I've spent years working on real-world applications, solving performance challenges and integrating complex business processes.**

Focus on end-to-end ownership, independent technical decision making, performance, maintainability, communication, and measurable outcomes. English fluent; open to remote opportunities.

### 5. Expertise & Tech Stack

Organize by capabilities instead of a wall of logos:
- **Frontend**: Angular, React, Next.js, TypeScript, RxJS, HTML/CSS/SCSS.
- **Backend**: Node.js, NestJS, Firebase, REST APIs, PostgreSQL, MongoDB.
- **Integrations**: Stripe, HubSpot, Google APIs, third-party services.
- **Engineering**: performance, architecture, testing (Jest, Playwright), CI/CD, GitHub Actions.

Present credible proficiency; do not claim equal mastery of every listed tool.

### 6. Services / What I Do

Client-facing four-card grid:
- **Web Applications** — custom platforms, dashboards, SaaS products.
- **E-commerce** — online stores, payment integration, order management.
- **API Integrations** — third-party systems, backend workflows, automation.
- **Performance Optimization** — website speed, reliability, modernization.

Use straightforward copy and a call-to-action to Contact. Do not imply Igor operates a large agency.

### 7. Experience

Concise reverse-chronological timeline, with most space for long-term ownership of Hochzeit.click. Earlier marketplace and mobile work (including Parametric) can be represented. Avoid fabricated job titles, employer dates, and achievements. Content must be editable in typed data files.

### 8. Contact

Suggested heading: **Let's build something great.**

Email link, GitHub, LinkedIn, Telegram, and **Download Resume (PDF)** button. Have optional `Copy email` interaction. Make contact info configurable in `src/data/profile.ts` and do not invent actual addresses or usernames.

### 9. Footer

Short copyright/wordmark and social links. Avoid duplicate heavy content.

## Responsive design

- Desktop: spacious hero; one large featured project, smaller two-column project cards; split layouts where useful.
- Tablet: 2 columns as space allows.
- Mobile: single-column stack; accessible nav menu, tap-friendly links/buttons, readable headline, no horizontal overflow, modal fits narrow viewport.
- Header must not cover anchor headings.

## Interaction and motion

- Smooth anchor navigation (honor reduced motion).
- Active nav section highlighting where practical.
- Card hover with very subtle transform/border highlight, and strong keyboard-focus state.
- Lightweight stagger/fade entrance animation optional.
- Do not sacrifice performance or accessibility for visual effects.

## Suggested source structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── TechStack.tsx
│   │   ├── Services.tsx
│   │   ├── Experience.tsx
│   │   └── Contact.tsx
│   ├── ProjectCard.tsx
│   └── ProjectModal.tsx
├── data/
│   ├── profile.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── skills.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
public/
├── projects/
├── resume.pdf    # owner must supply real resume
└── favicon.svg
.github/workflows/deploy.yml
vite.config.ts
```

The above file structure is a guideline, not a restriction. Do not create a fake `resume.pdf`: show the button only when the real file is provided, or provide a clearly documented placeholder state until then.

## GitHub Pages deployment requirements

- Use `actions/configure-pages`, `actions/upload-pages-artifact` and `actions/deploy-pages` with suitable permissions (`pages: write`, `id-token: write`).
- Vite `base` must work on GitHub Pages: `/<repo-name>/` for a project repository, `/` for a `username.github.io` repository or a custom root domain. Make it configurable (e.g. environment variable or CLI build setting).
- Use `import.meta.env.BASE_URL` for static asset paths that need to work under a subdirectory; avoid absolute hardcoded paths.
- Static anchor links and modal routing need no SPA fallback.
- Document repository Pages settings and optional custom domain steps.
- Ensure `npm run build` succeeds before deployment.

## SEO & quality

- Semantic HTML, descriptive page title/meta description, Open Graph tags, favicon and sitemap (using configured public site URL).
- Accessible interactive elements, keyboard nav, visible focus, mobile usability.
- Lazy-load non-hero screenshots. Reserve image dimensions to limit CLS.
- Prefer compressed WebP/AVIF screenshots; fast font delivery.
- Lighthouse performance and accessibility should be high, without claiming scores until tested.

## Important owner-input placeholders

Before publishing, request or set:
1. Exact preferred public name.
2. Email address, LinkedIn URL, GitHub URL, Telegram handle.
3. Real resume PDF.
4. Real screenshots and authorized project links.
5. Verified descriptions for Heldyn, Pyjam, Parametric.one and optional fifth project.
6. GitHub Pages repository name / custom domain.

Do not fabricate missing identifiers, case-study statistics, or files. Development can proceed with explicit placeholder data and clearly marked TODOs.

## Implementation instructions for the coding console

**Build the complete first working version now.** Scaffold React + TypeScript + Vite, install dependencies, implement all approved sections and styling, typed project data, accessible case-study modals, responsive mobile header, functional anchors/contact links, and GitHub Actions deployment. Provide a README with local run (`npm install`, `npm run dev`), build (`npm run build`), and GitHub Pages instructions. If real data is missing, use conspicuous TODO placeholders in config files rather than fabricated links or assets. Check build and fix TypeScript errors. Keep the visual quality at a premium, polished portfolio standard.

## Definition of done

- [ ] `npm install` and `npm run build` pass.
- [ ] All approved sections implemented in correct order.
- [ ] Hochzeit.click featured and 3–4 other projects represented without invented details.
- [ ] Case-study modals accessible and usable on desktop/mobile.
- [ ] Header anchor nav and mobile menu work.
- [ ] Contact and resume behavior clearly configured without dead or deceptive links.
- [ ] GitHub Actions workflow and Vite base path deploy correctly to Pages.
- [ ] Documentation identifies owner-supplied assets and account URLs.
