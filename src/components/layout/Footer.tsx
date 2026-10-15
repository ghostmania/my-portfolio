import { ArrowUp } from "lucide-react";
import { profile } from "../../data/profile";
import { SocialLinks } from "../SocialLinks";

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <div>
          <a className="wordmark" href="#top">
            {profile.name}
            <span>.</span>
          </a>
          <span>
            © {new Date().getFullYear()} {profile.name}. Crafted with intention.
          </span>
        </div>
        <SocialLinks profile={profile} hideMissing />
        <a href="#top">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
