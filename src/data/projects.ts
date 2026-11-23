export interface ProjectScreenshot {
  /** Path relative to public/, without a leading slash. */
  readonly path: string;
  /** Describes the screen. Never names the product. */
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  /** Unique within the list. Never shown to visitors. */
  readonly id: string;
  /** Category tag: the kind of product, such as "B2C platform". */
  readonly category: string;
  /** Outcome headline: one sentence stating the result. Stands in for the product name. */
  readonly headline: string;
  readonly summary: string;
  readonly intro: string;
  readonly tags: readonly string[];
  /** Case study sections, in reading order. */
  readonly sections: readonly { title: string; body: string }[];
  readonly results: readonly { value: string; label: string }[];
  /** At least one. The first is the lead screenshot shown on the page. */
  readonly screenshots: readonly ProjectScreenshot[];
}

// To add a Project: put its screenshots under public/projects/, add one entry
// here, and add the Russian text to src/i18n/ru.json. Page order is list order.
// Product names appear only in the résumé: never in any text below.
//
// Responsibilities, stacks, dates and outcomes are sourced from the supplied résumé.
// See docs/project-content-sources.md for sources and unresolved details.
export const projects: readonly Project[] = [
  {
    id: "wedding-platform",
    category: "B2C platform",
    headline:
      "A wedding-planning platform taken from first concept to 500+ daily users",
    summary:
      "Seven years of full-stack development connecting couples with wedding professionals, from the first sketch to a product used every day.",
    intro:
      "A B2C wedding-planning platform for the German-speaking market. I led development from the initial concept through production and long-term feature delivery.",
    tags: ["Angular", "Node.js", "Firebase", "Firestore", "Stripe", "BigQuery"],
    sections: [
      {
        title: "The challenge",
        body: "Bring wedding planning, vendor discovery, bookings and payments into one application, with a frontend that could grow alongside the product.",
      },
      {
        title: "My role",
        body: "Full-stack Developer, August 2019–August 2026. I led end-to-end development across the Angular frontend, Node.js services, Firebase data layer, payment integrations and deployment process.",
      },
      {
        title: "Solution & architecture",
        body: "I built a component-based Angular frontend with more than 50 reusable UI components. Firebase Authentication and Firestore supported authentication and application data, while Node.js powered the core booking flow and third-party payment integrations.",
      },
      {
        title: "Key features",
        body: "My work covered the core booking flow, authentication, data management and reusable interfaces. The platform also brings together vendor search, vendor profiles, galleries and wedding-planning tools.",
      },
      {
        title: "Performance & delivery",
        body: "I refactored data-loading patterns and introduced lazy loading, reducing initial page load from 4.0 seconds to 1.5 seconds. I also established a bug-fixing and CI/CD process that supported weekly deployments.",
      },
      {
        title: "Results",
        body: "The platform reached 500+ daily active users. The booking feature processed over 500 transactions, and the shared component architecture reduced development time for new features by 30%.",
      },
    ],
    results: [
      { value: "500+", label: "Daily active users" },
      { value: "4.0s → 1.5s", label: "Initial load time" },
      { value: "50+", label: "Reusable UI components" },
    ],
    screenshots: [
      {
        path: "projects/wedding-platform/vendor-search.png",
        alt: "Wedding vendor search with venue cards, ratings and brochure requests",
        width: 3568,
        height: 1952,
      },
      {
        path: "projects/wedding-platform/couple-onboarding.png",
        alt: "Onboarding screen asking couples about their wedding-planning stage",
        width: 1874,
        height: 911,
      },
      {
        path: "projects/wedding-platform/vendor-galleries.png",
        alt: "Vendor photo-gallery management with publication status and wedding collections",
        width: 3588,
        height: 1964,
      },
      {
        path: "projects/wedding-platform/vendor-profile.png",
        alt: "Vendor profile editor with service pricing, experience and additional offerings",
        width: 3572,
        height: 1964,
      },
    ],
  },
  {
    id: "construction-marketplace",
    category: "B2B marketplace",
    headline:
      "A construction-supplies marketplace launched on a shared component library",
    summary:
      "React frontend work for a marketplace selling construction materials: core launch features, shared UI components and a clearer approach to application state.",
    intro:
      "A public-facing marketplace for purchasing construction materials. I worked on the React frontend, contributing core features for the initial launch.",
    tags: ["React", "REST APIs", "Laravel", "PostgreSQL", "Docker"],
    sections: [
      {
        title: "The challenge",
        body: "Deliver a consistent marketplace interface while keeping shared state and UI behavior manageable across product teams.",
      },
      {
        title: "My role",
        body: "React Frontend Developer, January 2018–August 2019. I developed and shipped more than 10 core features using React and REST APIs.",
      },
      {
        title: "Implementation",
        body: "I centralized state-management logic in shared services to simplify data flow. I also led the creation of a shared component library that was adopted by two project teams.",
      },
      {
        title: "Results",
        body: "The frontend work contributed to the initial marketplace launch. Centralizing state logic reduced bugs related to state inconsistency by 50%, while the component library standardized the UI across teams.",
      },
      {
        title: "Project stack",
        body: "React on the frontend, with Laravel, PostgreSQL and Docker in the broader project stack. My role focused on frontend delivery, state management and reusable components.",
      },
    ],
    results: [
      { value: "10+", label: "Core features shipped" },
      { value: "−50%", label: "State-related bugs" },
    ],
    screenshots: [
      {
        path: "projects/construction-marketplace/marketplace-home.png",
        alt: "Construction-materials marketplace homepage with product search and categories",
        width: 1557,
        height: 581,
      },
    ],
  },
  {
    id: "social-app",
    category: "Mobile social app",
    headline:
      "A mobile-first social app with navigation that earned a 4.5-star rating",
    summary:
      "React and Ionic interfaces for a social streaming app, with reusable components and steady improvements to navigation and stability.",
    intro:
      "A social application with a mobile-first experience. My work focused on React and Ionic UI development, application architecture and maintaining reliable everyday interactions.",
    tags: ["React", "Ionic", "Laravel", "PostgreSQL", "Docker"],
    sections: [
      {
        title: "My role",
        body: "I built mobile-oriented interfaces using React and Ionic, designed application architecture and developed reusable UI components.",
      },
      {
        title: "The work",
        body: "I improved the user experience and navigation, addressed application stability, and maintained existing functionality as the product evolved.",
      },
      {
        title: "Results",
        body: "The app earned a 4.5-star app-store rating for its intuitive navigation. My contribution focused on making the interface easier to use and keeping existing functionality stable.",
      },
      {
        title: "Project stack",
        body: "React and Ionic for the mobile UI, with Laravel, PostgreSQL and Docker listed in the broader project stack.",
      },
    ],
    results: [{ value: "4.5★", label: "App-store rating" }],
    screenshots: [
      {
        path: "projects/social-app/interactive-stream.png",
        alt: "Mobile streaming interface with directional controls and an onboarding hint",
        width: 816,
        height: 1042,
      },
      {
        path: "projects/social-app/social-app-home.png",
        alt: "Social-app landing page introducing live streams and mobile apps",
        width: 2848,
        height: 1578,
      },
    ],
  },
  {
    id: "plant-catalogue",
    category: "Community app",
    headline: "A legacy plant-discovery app modernised and made 40% faster",
    summary:
      "Frontend modernization for a community plant-discovery application, with faster loading through code splitting and improved image delivery.",
    intro:
      "A MEAN-stack application for discovering plants and sharing local information. I worked on modernizing the frontend and improving loading performance.",
    tags: ["AngularJS", "Angular", "MongoDB", "Express", "Node.js"],
    sections: [
      {
        title: "My role",
        body: "MEAN Stack Developer, January–May 2017. I led work to modernize the legacy AngularJS application and improve its performance.",
      },
      {
        title: "Modernization",
        body: "I led the migration from the legacy AngularJS frontend to Angular, updating the codebase and enabling a modern CI/CD workflow.",
      },
      {
        title: "Performance",
        body: "I introduced code splitting and optimized the image-delivery pipeline. These changes improved load speed by 40%.",
      },
    ],
    results: [{ value: "40%", label: "Faster loading" }],
    screenshots: [
      {
        path: "projects/plant-catalogue/plant-catalog.png",
        alt: "Plant catalogue with browsing cards and a detailed African Olive plant profile",
        width: 1936,
        height: 954,
      },
    ],
  },
  {
    id: "home-care",
    category: "Healthcare",
    headline: "Clearer digital experiences for a home-care service",
    summary:
      "Healthcare application work focused on clear digital experiences.",
    intro: "Development work in the healthcare application space.",
    tags: ["Healthcare", "Web application"],
    sections: [
      {
        title: "Project context",
        body: "Angular-related development for a healthcare application. A detailed case study will follow once the public scope and individual contribution are confirmed.",
      },
    ],
    results: [],
    screenshots: [
      {
        path: "projects/home-care/home-care-homepage.png",
        alt: "Home-care services homepage with a caregiver and an older woman",
        width: 2814,
        height: 1958,
      },
    ],
  },
];
