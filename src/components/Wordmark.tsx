import { profile } from "../data/profile";
import { useLanguage } from "../i18n/context";

export function Wordmark() {
  const { t } = useLanguage();
  const [name, ...rest] = profile.domain.split(".");
  return (
    <a
      className="wordmark"
      href="#top"
      aria-label={t("{name} home", { name: profile.domain })}
    >
      {name}
      <span>.{rest.join(".")}</span>
    </a>
  );
}
