import { useLanguage } from "../../i18n/context";
import { ArrowRight, MapPin } from "lucide-react";
import { metrics, profile } from "../../data/profile";
import { ContactActions } from "../ContactActions";

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
            {t("Hi, I'm")} <strong>{t(profile.firstName)}</strong>{" "}
            {t(
              "— a Senior Full-stack Developer with 8+ years of experience. I turn complex ideas into reliable web experiences, from the first sketch to the final deployment.",
            )}
          </p>
          <div className="actions">
            <ContactActions primaryLabel="Contact me" />
            <a className="text-link" href="#projects">
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
