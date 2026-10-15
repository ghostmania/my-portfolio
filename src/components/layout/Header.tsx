import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../../data/profile";

export function Header({ technical = false }: { technical?: boolean }) {
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
          aria-label={`${profile.name} home`}
        >
          {profile.name}
          <span>.</span>
        </a>
        <nav
          id="navigation"
          className={`navigation${open ? " open" : ""}`}
          aria-label="Main navigation"
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
              {label}
            </a>
          ))}
        </nav>
        <a
          className="small-button header-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Let's talk <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
