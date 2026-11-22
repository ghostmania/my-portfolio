import { useLanguage } from "../../i18n/context";
import { experience } from "../../data/experience";

export function Experience() {
  const { t } = useLanguage();
  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading">
        <div>
          <h2 id="experience-heading">{t("Built on experience.")}</h2>
        </div>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-item" key={item.period}>
            <div className="experience-time">
              {t(item.period)}
              <br />
              {t(item.category)}
            </div>
            <div>
              <h3>{t(item.title)}</h3>
              <p className="role">{t(item.role)}</p>
              <p>{t(item.description)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
