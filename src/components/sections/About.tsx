import { useLanguage } from "../../i18n/context";
export function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="section about">
      <div>
        <span className="eyebrow">{t("A little about me")}</span>
        <h2>
          {t("More than just")} <br /> {t("writing code.")}
        </h2>
      </div>
      <div className="about-copy">
        <p>
          {t(
            "I'm a full-stack developer who enjoys connecting the dots — between a business problem, a thoughtful interface, and the engineering that makes it all work.",
          )}
        </p>
        <p>
          {t(
            "From architecture to deployment, I take ownership of the whole picture. I care about the details that make a product fast, maintainable, and genuinely useful.",
          )}
        </p>
        <div className="principles">
          <span>{t("↗ End-to-end ownership")}</span>
          <span>{t("↗ Clear communication")}</span>
          <span>{t("↗ Fluent English")}</span>
        </div>
      </div>
    </section>
  );
}
