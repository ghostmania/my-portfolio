import { useLanguage } from "../../i18n/context";
import { ArrowUp } from "lucide-react";
import { profile } from "../../data/profile";
import { SocialLinks } from "../SocialLinks";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="wrap footer-inner">
        <div>
          <a className="wordmark" href="#top">
            {t(profile.name)}
            <span>.</span>
          </a>
          <span>
            © {new Date().getFullYear()} {t(profile.name)}
            {t(". Crafted with intention.")}
          </span>
        </div>
        <SocialLinks profile={profile} hideMissing />
        <a href="#top">
          {t("Back to top")} <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
