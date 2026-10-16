import { useLanguage } from "../../i18n/context";
import { useEffect, useRef, useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { profile } from "../../data/profile";

export function Header({ technical = false }: { technical?: boolean }) {
  const { t, language, setLanguage } = useLanguage();
  const home = import.meta.env.BASE_URL;
  const navigation = technical
    ? [
        { label: "Home", href: home },
        ...["Projects", "About", "Skills", "Contact"].map((label) => ({
          label,
          href: "#" + label.toLowerCase(),
        })),
      ]
    : [
        { label: "Services", href: "#services" },
        { label: "Gallery", href: "#gallery" },
        { label: "Projects", href: home + "projects/" },
        { label: "Contact", href: "#contact" },
      ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a
          className="wordmark"
          href={technical ? home : "#top"}
          aria-label={t("{name} home", { name: t(profile.name) })}
        >
          {t(profile.name)}
          <span>.</span>
        </a>
        <nav
          id="navigation"
          className={`navigation${open ? " open" : ""}`}
          aria-label={t("Main navigation")}
        >
          {navigation.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              aria-current={
                active === label.toLowerCase() ? "location" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t(label)}
            </a>
          ))}
        </nav>
        <div
          className="language-switch"
          role="group"
          aria-label={t("Language")}
        >
          <button
            type="button"
            lang="en"
            aria-label="EN — English"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            lang="ru"
            aria-label="RU — Русский"
            aria-pressed={language === "ru"}
            onClick={() => setLanguage("ru")}
          >
            RU
          </button>
        </div>
        <a
          className="button header-cta"
          href={profile.email ? `mailto:${profile.email}` : "#contact"}
          aria-label={t("Contact me")}
          onClick={() => setOpen(false)}
        >
          <Mail size={20} aria-hidden="true" />
          <span className="header-contact-label">{t("Contact me")}</span>
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={t(open ? "Close navigation" : "Open navigation")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
