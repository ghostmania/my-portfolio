import { useLanguage } from "../../i18n/context";
import {
  ArrowRight,
  Code2,
  LayoutPanelTop,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { metrics, profile } from "../../data/profile";
import { ContactActions } from "../ContactActions";

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
  const { t } = useLanguage();
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div>
          <div className="availability">{t(profile.availability)}</div>
          <h1 id="hero-heading">
            {t("Building digital")} <br /> {t("products that")} <br />
            <em>{t("make an impact.")}</em>
          </h1>
          <p className="hero-description">
            {t("Hi, I'm")} <strong>{t(profile.name)}</strong>{" "}
            {t(
              "— a Senior Full-stack Developer with 8+ years of experience. I turn complex ideas into reliable web experiences, from the first sketch to the final deployment.",
            )}
          </p>
          <div className="actions">
            <ContactActions primaryLabel="Contact me" />
            <a className="text-link" href="#gallery">
              {t("Explore projects")}{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="location">
            <MapPin size={14} aria-hidden="true" />
            {t(profile.location)}
            <span aria-hidden="true">·</span>
            {profile.timezone}
          </div>
        </div>
        <aside
          className="architecture"
          aria-label={t("My approach to product development")}
        >
          <div className="architecture-label">
            <span>{t("IDEA → PRODUCTION")}</span>
            <span>{t("FULL-STACK")}</span>
          </div>
          <h2 className="architecture-title">{t("Built as a whole.")}</h2>
          <p className="architecture-subtitle">
            {t("Every layer. One clear vision.")}
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
                    <b>{t(title)}</b>
                    <small>{t(tools)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="architecture-foot">
            <span>{t("End-to-end ownership")}</span>
            <span>{t("↗ Built to last")}</span>
          </div>
        </aside>
      </section>
      <div className="metrics" aria-label={t("Experience at a glance")}>
        {metrics.map((metric) => (
          <div className="metric od-stat" key={metric.label}>
            <b>
              {metric.value}
              <span>+</span>
            </b>
            <small>{t(metric.label)}</small>
          </div>
        ))}
      </div>
    </>
  );
}
