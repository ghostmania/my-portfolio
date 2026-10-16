import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "../i18n/context";
import { ContactActions } from "./ContactActions";

export function FloatingContact() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  function closeAndRestoreFocus() {
    setOpen(false);
    trigger.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeAndRestoreFocus();
    }
    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={container}
      className="floating-contact"
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      <div
        ref={panel}
        id="floating-contact-panel"
        className="floating-contact-panel"
        role="region"
        aria-label={t("Contact options")}
        hidden={!open}
      >
        <div className="floating-contact-heading">
          <div>
            <h2>{t("Let's talk about your project.")}</h2>
            <p>{t("Choose where to message me.")}</p>
          </div>
          <button
            type="button"
            className="close-contact"
            aria-label={t("Close contact options")}
            onClick={closeAndRestoreFocus}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <ContactActions />
      </div>
      <button
        ref={trigger}
        type="button"
        className="floating-contact-trigger"
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle size={22} aria-hidden="true" />
        {t("Contact me")}
      </button>
    </div>
  );
}
