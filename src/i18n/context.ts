import { createContext, useContext } from "react";
import ru from "./ru.json";

export type Language = "en" | "ru";
type Values = Record<string, string | number>;

export function translate(
  language: Language,
  text: string,
  values: Values = {},
) {
  const message =
    language === "ru" ? ((ru as Record<string, string>)[text] ?? text) : text;
  return message.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
    values[key] === undefined ? placeholder : String(values[key]),
  );
}

export const LanguageContext = createContext({
  language: "en" as Language,
  setLanguage: (_language: Language) => {
    void _language;
  },
  t: (text: string, values?: Values) => translate("en", text, values),
});

export const useLanguage = () => useContext(LanguageContext);
