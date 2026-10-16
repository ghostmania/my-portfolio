import { useLanguage } from "../../i18n/context";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { galleryImages as images } from "../../data/gallery";
import { Modal } from "../Modal";
import "./Gallery.css";

const format = (index: number) => String(index + 1).padStart(2, "0");
const wrap = (index: number) => (index + images.length) % images.length;
const source = (image: (typeof images)[number]) =>
  `${import.meta.env.BASE_URL}${image.src}`;
const ratio = (image: (typeof images)[number]) =>
  ({ "--image-ratio": image.width / image.height }) as CSSProperties;

function useSwipe(onSwipe: (direction: number) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const suppressUntil = useRef(0);
  return {
    onTouchStart(event: TouchEvent) {
      const touch = event.touches[0];
      start.current =
        event.touches.length === 1
          ? { x: touch.clientX, y: touch.clientY }
          : null;
      suppressUntil.current = 0;
    },
    onTouchCancel() {
      start.current = null;
    },
    onTouchEnd(event: TouchEvent) {
      const origin = start.current;
      start.current = null;
      const touch = event.changedTouches[0];
      if (!origin || !touch || event.touches.length) return;
      const dx = touch.clientX - origin.x;
      const dy = touch.clientY - origin.y;
      if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        suppressUntil.current = Date.now() + 500;
        onSwipe(dx < 0 ? 1 : -1);
      }
    },
    suppressUntil,
  };
}

export function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const rail = useRef<HTMLElement>(null);
  const slide = images[active];
  const current = selected === null ? null : images[selected];
  const { suppressUntil, ...swipe } = useSwipe((direction) =>
    setActive((index) => wrap(index + direction)),
  );
  const { suppressUntil: viewerSuppressUntil, ...viewerSwipe } = useSwipe(move);
  void viewerSuppressUntil;
  function move(direction: number) {
    setSelected((index) => (index === null ? null : wrap(index + direction)));
  }
  useEffect(() => {
    const container = rail.current;
    const thumb = container?.children[active] as HTMLElement | undefined;
    if (!container || !thumb) return;
    const bounds = container.getBoundingClientRect();
    const item = thumb.getBoundingClientRect();
    if (item.left < bounds.left || item.right > bounds.right) {
      container.scrollTo({
        left:
          container.scrollLeft +
          item.left -
          bounds.left -
          (container.clientWidth - thumb.offsetWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [active]);
  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("A look at my work")}</span>
          <h2 id="gallery-heading">{t("From idea to screen.")}</h2>
        </div>
        <p className="gc-collection-meta">
          <span>{String(images.length).padStart(2, "0")}</span> {t("screens /")}{" "}
          <span>
            {String(
              new Set(images.map((image) => image.project)).size,
            ).padStart(2, "0")}
          </span>{" "}
          {t("projects")}
        </p>
      </div>
      <div
        className="gc-carousel"
        role="group"
        aria-roledescription={t("carousel")}
        aria-labelledby="gallery-heading"
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          const target =
            event.key === "ArrowRight"
              ? wrap(active + 1)
              : event.key === "ArrowLeft"
                ? wrap(active - 1)
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? images.length - 1
                    : null;
          if (target === null) return;
          event.preventDefault();
          setActive(target);
          if ((event.target as HTMLElement).closest(".gc-thumbnail"))
            (rail.current?.children[target] as HTMLElement)?.focus({
              preventScroll: true,
            });
        }}
      >
        <div className="gc-slide-card">
          <div
            id="gallery-slide"
            role="group"
            aria-roledescription={t("slide")}
            aria-label={t("{number} of {total}: {project}, {title}", {
              number: active + 1,
              total: images.length,
              project: slide.project,
              title: t(slide.title),
            })}
          >
            <div className="gc-stage">
              <button
                className="gc-enlarge"
                aria-label={t("Enlarge {project} — {title}", {
                  project: slide.project,
                  title: t(slide.title),
                })}
                {...swipe}
                onClick={(event) => {
                  if (event.detail === 0 || Date.now() > suppressUntil.current)
                    setSelected(active);
                }}
              >
                <img
                  key={slide.src}
                  className="gc-main-image gc-image-enter"
                  src={source(slide)}
                  alt={t(slide.alt)}
                  width={slide.width}
                  height={slide.height}
                  style={ratio(slide)}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            </div>
          </div>
          <div className="gc-caption">
            <div className="gc-caption-info">
              <span className="gc-project-mark" aria-hidden="true">
                {slide.project[0]}.
              </span>
              <div>
                <h3 className="gc-project-name">{slide.project}</h3>
                <p className="gc-screen-name">{t(slide.title)}</p>
              </div>
            </div>
            <div className="gc-caption-actions">
              <button
                className="gc-expand-button"
                aria-label={t("Expand image")}
                onClick={() => setSelected(active)}
              >
                <Expand size={20} aria-hidden="true" />
                <span className="gc-expand-label">{t("Expand image")}</span>
              </button>
              <span className="gc-divider" aria-hidden="true" />
              <div
                className="gc-controls"
                role="group"
                aria-label={t("Screenshot navigation")}
              >
                <button
                  className="gc-arrow"
                  aria-label={t("Previous screenshot")}
                  aria-controls="gallery-slide"
                  onClick={() => setActive(wrap(active - 1))}
                >
                  <ArrowLeft size={20} aria-hidden="true" />
                </button>
                <span className="gc-counter" aria-hidden="true">
                  <strong>{format(active)}</strong> /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <button
                  className="gc-arrow gc-next"
                  aria-label={t("Next screenshot")}
                  aria-controls="gallery-slide"
                  onClick={() => setActive(wrap(active + 1))}
                >
                  <ArrowRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <p
          className="gc-sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {t("Screenshot")} {active + 1} {t("of")} {images.length}.{" "}
          {slide.project}: {t(slide.title)}.
        </p>
        <nav
          ref={rail}
          className="gc-filmstrip"
          aria-label={t("Choose a screenshot")}
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              className="gc-thumbnail"
              aria-current={index === active}
              aria-controls="gallery-slide"
              aria-label={t("Show screenshot {number} {project} — {title}", {
                number: format(index),
                project: image.project,
                title: t(image.title),
              })}
              onClick={() => setActive(index)}
            >
              <span className="gc-thumbnail-frame">
                <img
                  src={source(image)}
                  alt=""
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  draggable={false}
                />
              </span>
              <span className="gc-thumbnail-label">
                {format(index)} &nbsp; {image.project}
              </span>
            </button>
          ))}
        </nav>
      </div>
      <div className="gc-gallery-foot">
        <span>{t("Real products. A closer look.")}</span>
        <a className="text-link" href={`${import.meta.env.BASE_URL}projects/`}>
          {t("Explore the technical details")}{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <span className="gc-keyboard-hint">
          <kbd>←</kbd>
          <kbd>→</kbd> {t("to explore · Click to enlarge")}
        </span>
        <span className="gc-mobile-hint">
          {t("Swipe to explore · Tap to enlarge")}
        </span>
      </div>
      {current && (
        <Modal
          label={current.project}
          className="image-viewer"
          onClose={() => setSelected(null)}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          <div className="gc-viewer-stage">
            <img
              src={source(current)}
              alt={t(current.alt)}
              width={current.width}
              height={current.height}
              style={ratio(current)}
              {...viewerSwipe}
            />
          </div>
          <div className="gc-viewer-footer">
            <p className="gc-viewer-caption">{t(current.title)}</p>
            <a
              className="gc-full-size"
              href={source(current)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Open original")} <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <div
              className="gc-controls"
              role="group"
              aria-label={t("Expanded image navigation")}
            >
              <button
                className="gc-arrow"
                aria-label={t("Previous image")}
                onClick={() => move(-1)}
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <span
                className="gc-counter"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {format(selected!)} / {String(images.length).padStart(2, "0")}
              </span>
              <button
                className="gc-arrow gc-next"
                aria-label={t("Next image")}
                onClick={() => move(1)}
              >
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
