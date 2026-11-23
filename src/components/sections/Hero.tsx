import { useLanguage } from "../../i18n/context";
import { metrics, profile } from "../../data/profile";
import { ContactActions } from "../ContactActions";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="hero-intro">
          {t(
            "Hi, I'm {name}, a senior full-stack developer based in {location}.",
            { name: t(profile.firstName), location: t(profile.location) },
          )}
        </p>
        <h1 id="hero-heading">
          {t("I take web products from first concept to daily use.")}
        </h1>
        <p className="hero-description">
          {t(
            "Eight years across Angular, React and Node.js. I build the interface, the services behind it and the delivery process that keeps it shipping.",
          )}
        </p>
        <div className="actions">
          <a className="button" href="#projects">
            {t("View projects")}
          </a>
          <ContactActions />
        </div>
        <p className="availability">
          <span>{t(profile.availability)}</span>
          <span>{profile.timezone}</span>
        </p>
      </div>
      <img
        className="portrait"
        src={`${import.meta.env.BASE_URL}${profile.portrait.path}`}
        alt={t(profile.portrait.alt)}
        width={profile.portrait.width}
        height={profile.portrait.height}
        decoding="async"
      />
      <dl className="metrics">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <dt>{t(metric.label)}</dt>
            <dd>{metric.value}+</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
