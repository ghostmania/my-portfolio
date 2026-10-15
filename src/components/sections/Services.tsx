import {
  ArrowUpRight,
  Cable,
  LayoutPanelTop,
  ShoppingBag,
  Zap,
} from "lucide-react";

const services = [
  {
    icon: LayoutPanelTop,
    title: "Web applications",
    description:
      "Custom platforms, dashboards, and SaaS products. From the initial architecture to a dependable launch.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Online stores and marketplaces with smooth payments, subscriptions, and order management.",
  },
  {
    icon: Cable,
    title: "API integrations",
    description:
      "Connect your tools, automate workflows, and make complex systems work together without the friction.",
  },
  {
    icon: Zap,
    title: "Performance optimization",
    description:
      "Faster loading, better reliability, and a maintainable foundation for the next stage of your product.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="services"
      aria-labelledby="services-heading"
    >
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">What I can do for you</span>
            <h2 id="services-heading">Your next idea. Let's build it.</h2>
          </div>
          <a href="#contact" className="text-link">
            Discuss your project
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, description }) => (
            <article className="service" key={title}>
              <Icon className="od-icon" aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
