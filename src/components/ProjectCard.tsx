import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "../data/projects";
import {
  HealthcareArtwork,
  MarketplaceArtwork,
  MobileArtwork,
  WeddingArtwork,
} from "./ProjectArtwork";

const artwork = {
  hochzeit: WeddingArtwork,
  parametric: MarketplaceArtwork,
  heldyn: HealthcareArtwork,
  pyjam: MobileArtwork,
  wildfood: MarketplaceArtwork,
};

export function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const Artwork = artwork[project.id];
  const preview = project.screenshot ? (
    <div
      className={`screenshot-preview${project.featured ? " screenshot-featured" : ""}`}
    >
      <img
        className="project-screenshot"
        src={`${import.meta.env.BASE_URL}${project.screenshot.path}`}
        alt={project.screenshot.alt}
        width={project.screenshot.width}
        height={project.screenshot.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : (
    <Artwork />
  );
  const label = "Project overview";
  return (
    <article className={project.featured ? "featured" : "project-card"}>
      {!project.featured && preview}
      <div className={project.featured ? "feature-copy" : "project-card-body"}>
        {project.featured && (
          <span className="feature-label">
            <Star size={14} aria-hidden="true" />
            Featured project · Full-stack ownership
          </span>
        )}
        <h3>{project.name}</h3>
        <p className="project-description">{project.summary}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {!!project.results.length && (
          <ProjectResults results={project.results} />
        )}
        <button
          className="case-link"
          aria-label={`${label}: ${project.name}`}
          onClick={() => onSelect(project)}
        >
          {label}
          <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
      {project.featured && preview}
    </article>
  );
}

export function ProjectResults({ results }: { results: Project["results"] }) {
  return (
    <div className="project-results">
      {results.map((result) => (
        <div className="od-stat" key={result.label}>
          <strong>{result.value}</strong>
          <small>{result.label}</small>
        </div>
      ))}
    </div>
  );
}
