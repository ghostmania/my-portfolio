import { Modal } from "./Modal";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import { ProjectResults } from "./ProjectCard";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <Modal label={project.name} onClose={onClose}>
      <div className="dialog-content">
        <h2 id="dialog-title">{project.name}</h2>
        <p>{project.intro}</p>
        {!!project.results.length && (
          <ProjectResults results={project.results} />
        )}
        {project.sections.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ))}
        {project.screenshot && (
          <div
            className="project-gallery"
            role="group"
            aria-label="Project screenshots"
          >
            <h3>Inside the product</h3>
            {[project.screenshot, ...(project.gallery ?? [])].map(
              (screenshot) => (
                <figure key={screenshot.path}>
                  <img
                    src={`${import.meta.env.BASE_URL}${screenshot.path}`}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ),
            )}
          </div>
        )}
        <h3>Tech stack & focus</h3>
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            className="text-link mt-6"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit project
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </Modal>
  );
}
