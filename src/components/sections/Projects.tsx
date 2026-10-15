import { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectCard } from "../ProjectCard";
import { ProjectModal } from "../ProjectModal";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <section
      id="projects"
      className="section"
      aria-labelledby="projects-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2 id="projects-heading">Ideas brought to life.</h2>
        </div>
        <p>
          Platforms, marketplaces, and mobile apps.
          <br />
          Built with purpose. Owned end to end.
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
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
