import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext, translate, type Language } from "./context";

function initialLanguage(): Language {
  try {
    return localStorage.getItem("portfolio-language") === "ru" ? "ru" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    const title = "Igor Borisenko — Senior Full-stack Developer";
    const description =
      "Igor Borisenko — Senior Full-stack Developer with 8+ years of experience. Reliable web applications, thoughtful architecture, and end-to-end product development.";
    document.title = translate(language, title);
    const descriptions = [
      ["meta[name='description']", description],
      ["meta[property='og:title']", title],
      [
        "meta[property='og:description']",
        "Building digital products that make an impact. Explore selected projects, engineering expertise, and development services.",
      ],
    ];
    descriptions.forEach(([selector, text]) =>
      document
        .querySelector(selector)
        ?.setAttribute("content", translate(language, text)),
    );
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, [language]);
  return (
    <LanguageContext
      value={{
        language,
        setLanguage,
        t: (text, values) => translate(language, text, values),
      }}
    >
      {children}
    </LanguageContext>
  );
}
