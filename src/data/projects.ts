export interface ProjectScreenshot {
  readonly path: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly id: "hochzeit" | "parametric" | "heldyn" | "pyjam" | "wildfood";
  readonly name: string;
  readonly summary: string;
  readonly intro: string;
  readonly tags: readonly string[];
  readonly sections: readonly { title: string; body: string }[];
  readonly results: readonly { value: string; label: string }[];
  readonly featured?: boolean;
  readonly url: string | null;
  readonly screenshot: ProjectScreenshot | null;
  readonly gallery?: readonly ProjectScreenshot[];
}

// Responsibilities, stacks, dates and outcomes are sourced from the supplied résumé.
// See docs/project-content-sources.md for sources and unresolved details.
export const projects: readonly Project[] = [
  {
    id: "hochzeit",
    name: "Hochzeit.click",
    featured: true,
    summary:
      "From first concept to a platform used every day. Seven years of full-stack development connecting couples with wedding professionals.",
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
    ],
    url: "https://my.hochzeit.click",
    screenshot: {
      path: "projects/hochzeit/couple-onboarding.png",
      alt: "Hochzeit.click onboarding screen asking couples about their wedding-planning stage",
      width: 1874,
      height: 911,
    },
    gallery: [
      {
        path: "projects/hochzeit/vendor-search.png",
        alt: "Wedding vendor search with venue cards, ratings and brochure requests",
        width: 3568,
        height: 1952,
      },
      {
        path: "projects/hochzeit/vendor-galleries.png",
        alt: "Vendor photo-gallery management with publication status and wedding collections",
        width: 3588,
        height: 1964,
      },
      {
        path: "projects/hochzeit/vendor-profile.png",
        alt: "Vendor profile editor with service pricing, experience and additional offerings",
        width: 3572,
        height: 1964,
      },
    ],
  },
  {
    id: "parametric",
    name: "Parametric.one",
    summary:
      "A B2B marketplace for construction supplies. React frontend development, shared UI components and a clearer approach to application state.",
    intro:
      "A public-facing marketplace for purchasing construction materials. I worked on the React frontend at Parametric LLC, contributing core features for the initial launch.",
    tags: ["React", "REST APIs", "Laravel", "PostgreSQL", "Docker"],
    sections: [
      {
        title: "The challenge",
        body: "Deliver a consistent marketplace interface while keeping shared state and UI behavior manageable across product teams.",
      },
      {
        title: "My role",
        body: "React Frontend Developer at Parametric LLC, January 2018–August 2019. I developed and shipped more than 10 core features using React and REST APIs.",
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
    results: [],
    url: "https://parametric.one/",
    screenshot: {
      path: "projects/parametric/marketplace-home.png",
      alt: "Parametric construction-materials marketplace homepage with product search and categories",
      width: 1557,
      height: 581,
    },
  },
  {
    id: "pyjam",
    name: "Pyjam",
    summary:
      "A mobile-first social app. React and Ionic interfaces, reusable components and improvements to navigation and stability.",
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
    results: [],
    url: "https://pyjam.com/",
    screenshot: {
      path: "projects/pyjam/social-app-home.png",
      alt: "Pyjam social-app landing page introducing live streams and mobile apps",
      width: 2848,
      height: 1578,
    },
    gallery: [
      {
        path: "projects/pyjam/interactive-stream.png",
        alt: "Pyjam mobile streaming interface with directional controls and an onboarding hint",
        width: 816,
        height: 1042,
      },
    ],
  },
  {
    id: "wildfood",
    name: "Wild Food",
    summary:
      "A community plant-discovery application. Legacy frontend modernization and faster loading through code splitting and improved image delivery.",
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
    results: [],
    url: null,
    screenshot: {
      path: "projects/wildfood/plant-catalog.png",
      alt: "Wild Food plant catalogue with browsing cards and a detailed African Olive plant profile",
      width: 1936,
      height: 954,
    },
  },
  {
    id: "heldyn",
    name: "Heldyn",
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
    url: null,
    screenshot: {
      path: "projects/heldyn/home-care-homepage.png",
      alt: "Heldyn home-care services homepage with a caregiver and an older woman",
      width: 2814,
      height: 1958,
    },
  },
];
