// Dates, roles and responsibilities from the supplied résumé. Entries are
// titled by the kind of product; product names appear only in the résumé.
export const experience = [
  {
    period: "Aug 2019 – Aug 2026",
    category: "7 years",
    title: "Wedding-planning platform",
    role: "Full-stack Developer",
    description:
      "Led the platform from concept to production with Angular, Node.js and Firebase. Built reusable UI components, authentication, bookings and payment integrations; improved load time and established weekly delivery through CI/CD.",
  },
  {
    period: "Jan 2018 – Aug 2019",
    category: "Marketplace & mobile",
    title: "Construction-supplies marketplace",
    role: "React Frontend Developer",
    description:
      "Shipped marketplace features with React and REST APIs, centralized shared state, and led a component library adopted by two teams. Also developed React and Ionic interfaces, navigation and reusable components for a mobile social app.",
  },
  {
    period: "May 2017 – Dec 2017",
    category: "Client websites",
    title: "IDEA Advertising Agency",
    role: "Frontend Developer · WordPress",
    description:
      "Improved technical SEO through structured data and optimized asset loading, contributing to 30% growth in organic search traffic. Rebuilt the mobile experience for three client websites and improved cross-browser compatibility.",
  },
  {
    period: "Jan 2017 – May 2017",
    category: "MEAN stack",
    title: "Plant catalogue application",
    role: "MEAN Stack Developer",
    description:
      "Modernized a legacy AngularJS application and improved loading speed by 40% through code splitting and image-delivery optimization.",
  },
] as const;
