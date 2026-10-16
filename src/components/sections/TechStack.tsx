import { useLanguage } from "../../i18n/context";
import { skills } from "../../data/skills";

export function TechStack() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("Tools with purpose")}</span>
          <h2 id="skills-heading">{t("The right stack for the job.")}</h2>
        </div>
        <p>
          {t("Deep experience with Angular and Firebase.")} <br />
          {t("A broader toolkit shaped by each product.")}
        </p>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-column" key={skill.title}>
            <h3>{t(skill.title)}</h3>
            <ul>
              {skill.items.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
