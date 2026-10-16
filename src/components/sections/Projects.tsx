import { useLanguage } from "../../i18n/context";
import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectCard } from "../ProjectCard";
import { ProjectModal } from "../ProjectModal";
import { ProjectContact } from "../ProjectContact";

export function Projects() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section
      id="projects"
      className="section"
      aria-labelledby="projects-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("Selected work")}</span>
          <h2 id="projects-heading">{t("Ideas brought to life.")}</h2>
        </div>
        <p>
          {t("Platforms, marketplaces, and mobile apps.")} <br />{" "}
          {t("Built with purpose. Owned end to end.")}
        </p>
      </div>
      {projects
        .filter((project) => project.featured)
        .map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelected}
          />
        ))}
      <div className="project-grid">
        {projects
          .filter((project) => !project.featured)
          .map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelected}
            />
          ))}
      </div>
      <ProjectContact />
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
