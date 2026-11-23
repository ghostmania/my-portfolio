import { useRef } from "react";
import { useLanguage } from "../i18n/context";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const { t } = useLanguage();
  const lead = project.screenshots[0];
  const label = t("Read case study");
  const trigger = useRef<HTMLButtonElement>(null);
  // The whole block opens the case study; the button stays the one keyboard and
  // screen-reader control, and takes focus so the popup can hand it back on close.
  const open = () => {
    if (window.getSelection()?.toString()) return;
    trigger.current?.focus();
    onSelect(project);
  };
  return (
    <article className="project-block" onClick={open}>
      <div className="project-block-copy">
        <p className="project-category">{t(project.category)}</p>
        <h3>{t(project.headline)}</h3>
        <p className="project-description">{t(project.summary)}</p>
        {!!project.results.length && (
          <ProjectResults results={project.results} />
        )}
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {t(tag)}
            </span>
          ))}
        </div>
        <button
          ref={trigger}
          className="case-link"
          aria-label={`${label}: ${t(project.headline)}`}
        >
          {label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="project-block-shot">
        <img
          className="project-screenshot"
          src={`${import.meta.env.BASE_URL}${lead.path}`}
          alt={t(lead.alt)}
          width={lead.width}
          height={lead.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    </article>
  );
}

export function ProjectResults({ results }: { results: Project["results"] }) {
  const { t } = useLanguage();
  return (
    <div className="project-results">
      {results.map((result) => (
        <div className="od-stat" key={result.label}>
          <strong>{t(result.value)}</strong>
          <small>{t(result.label)}</small>
        </div>
      ))}
    </div>
  );
}
