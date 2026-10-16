import { useLanguage } from "../i18n/context";
import { ArrowUpRight } from "lucide-react";
import type { Profile } from "../data/profile";

export function SocialLinks({
  profile,
  hideMissing = false,
  hideTelegram = false,
}: {
  profile: Profile;
  hideMissing?: boolean;
  hideTelegram?: boolean;
}) {
  const { t } = useLanguage();
  const links = [
    { label: "LinkedIn", url: profile.linkedin },
    { label: "GitHub", url: profile.github },
    { label: "Telegram", url: profile.telegram },
  ];
  return (
    <div className="socials">
      {links
        .filter(({ label }) => !hideTelegram || label !== "Telegram")
        .map(({ label, url }) =>
          url ? (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer">
              {label}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : (
            !hideMissing && (
              <span className="social-pending" key={label}>
                {label}
                <small>{t("Coming soon")}</small>
              </span>
            )
          ),
        )}
    </div>
  );
}
