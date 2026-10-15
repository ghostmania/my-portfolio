import { experience } from "../../data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="section experience-layout"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">The journey so far</span>
          <h2 id="experience-heading">Built on experience.</h2>
        </div>
      </div>
      <div className="experience-list">
        {experience.map((item) => (
          <article className="experience-item" key={item.title}>
            <div className="experience-time">
              {item.period}
              <br />
              {item.category}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p className="role">{item.role}</p>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
