import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { projects } from "../../data/projects";
import { Modal } from "../Modal";

const images = projects.flatMap((project) =>
  (project.screenshot
    ? [project.screenshot, ...(project.gallery ?? [])]
    : []
  ).map((screenshot) => ({ ...screenshot, project: project.name })),
);

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : images[selected];
  function move(direction: number) {
    setSelected((index) =>
      index === null
        ? null
        : (index + direction + images.length) % images.length,
    );
  }
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A look at my work</span>
          <h2 id="gallery-heading">From idea to screen.</h2>
        </div>
        <a className="text-link" href={`${import.meta.env.BASE_URL}projects/`}>
          Explore the technical details{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <div className="visual-gallery">
        {images.map((image, index) => (
          <button
            className="gallery-tile"
            key={image.path}
            onClick={() => setSelected(index)}
            aria-label={`Enlarge ${image.project}: ${image.alt}`}
          >
            <div className="gallery-preview">
              <img
                src={`${import.meta.env.BASE_URL}${image.path}`}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="gallery-label">
              {image.project}
              <Expand size={18} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      {current && (
        <Modal
          label={current.project}
          className="image-viewer"
          onClose={() => setSelected(null)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="viewer-image">
            <img
              src={`${import.meta.env.BASE_URL}${current.path}`}
              alt={current.alt}
              width={current.width}
              height={current.height}
            />
          </div>
          <div className="viewer-controls">
            <button aria-label="Previous image" onClick={() => move(-1)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <span aria-live="polite">
              {selected! + 1} / {images.length}
            </span>
            <a
              href={`${import.meta.env.BASE_URL}${current.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full size <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button aria-label="Next image" onClick={() => move(1)}>
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
