import { Mail, Send } from "lucide-react";
import { profile as owner, type Profile } from "../data/profile";
import { useLanguage } from "../i18n/context";

export function ContactActions({
  profile = owner,
  primaryLabel = "Email me",
}: {
  profile?: Profile;
  primaryLabel?: "Email me" | "Contact me";
}) {
  const { t } = useLanguage();
  return (
    <div className="contact-actions">
      {profile.email && (
        <a className="button contact-action" href={`mailto:${profile.email}`}>
          <Mail size={20} aria-hidden="true" />
          {t(primaryLabel)}
        </a>
      )}
      {profile.telegram && (
        <a
          className="button contact-action contact-action-secondary"
          href={profile.telegram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send size={20} aria-hidden="true" />
          {t("Message on Telegram")}
        </a>
      )}
    </div>
  );
}
