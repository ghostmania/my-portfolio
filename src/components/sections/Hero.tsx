import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  LayoutPanelTop,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { metrics, profile } from "../../data/profile";

const layers = [
  {
    icon: LayoutPanelTop,
    title: "Thoughtful interfaces",
    tools: "Angular · React · TypeScript",
  },
  {
    icon: Code2,
    title: "Reliable foundations",
    tools: "Node.js · APIs · Databases",
  },
  {
    icon: TrendingUp,
    title: "Real-world performance",
    tools: "Optimize · Ship · Improve",
  },
];

export function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div>
          <div className="availability">{profile.availability}</div>
          <h1 id="hero-heading">
            Building digital
            <br />
            products that
            <br />
            <em>make an impact.</em>
          </h1>
          <p className="hero-description">
            Hi, I'm <strong>{profile.name}</strong> — a Senior Full-stack
            Developer with 8+ years of experience. I turn complex ideas into
            reliable web experiences, from the first sketch to the final
            deployment.
          </p>
          <div className="actions">
            <a className="button" href="#gallery">
              Explore projects
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a className="text-link" href="#contact">
              Get in touch
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="location">
            <MapPin size={14} aria-hidden="true" />
            {profile.location}
            <span aria-hidden="true">·</span>
            {profile.timezone}
          </div>
        </div>
        <aside
          className="architecture"
          aria-label="My approach to product development"
        >
          <div className="architecture-label">
            <span>IDEA → PRODUCTION</span>
            <span>FULL-STACK</span>
          </div>
          <h2 className="architecture-title">Built as a whole.</h2>
          <p className="architecture-subtitle">
            Every layer. One clear vision.
          </p>
          <div className="architecture-flow">
            {layers.map(({ icon: Icon, title, tools }, index) => (
              <div key={title}>
                {index > 0 && <div className="connector" />}
                <div className="node">
                  <div className="node-icon">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <b>{title}</b>
                    <small>{tools}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="architecture-foot">
            <span>End-to-end ownership</span>
            <span>↗ Built to last</span>
          </div>
        </aside>
      </section>
      <div className="metrics" aria-label="Experience at a glance">
        {metrics.map((metric) => (
          <div className="metric od-stat" key={metric.label}>
            <b>
              {metric.value}
              <span>+</span>
            </b>
            <small>{metric.label}</small>
          </div>
        ))}
      </div>
    </>
  );
}
