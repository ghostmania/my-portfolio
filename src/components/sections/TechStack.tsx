import { skills } from "../../data/skills";

export function TechStack() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Tools with purpose</span>
          <h2 id="skills-heading">The right stack for the job.</h2>
        </div>
        <p>
          Deep experience with Angular and Firebase.
          <br />A broader toolkit shaped by each product.
        </p>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-column" key={skill.title}>
            <h3>{skill.title}</h3>
            <ul>
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
