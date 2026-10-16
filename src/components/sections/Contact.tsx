import { useLanguage } from "../../i18n/context";
import { useState } from "react";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import type { Profile } from "../../data/profile";
import { SocialLinks } from "../SocialLinks";
import { ContactActions } from "../ContactActions";

export function Contact({ profile }: { profile: Profile }) {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email!);
      setCopyStatus("Email copied");
    } catch {
      setCopyStatus("Please copy the email address manually.");
    }
  }
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div>
        <span className="eyebrow">{t("Have something in mind?")}</span>
        <h2 id="contact-heading">
          {t("Let's build")} <br />
          <span>{t("something great.")}</span>
        </h2>
        <p>
          {t(
            "A new product, an ambitious challenge, or a platform ready for its next chapter. I'd love to hear about it.",
          )}
        </p>
      </div>
      <div className="contact-links">
        <ContactActions profile={profile} />
        {profile.email ? (
          <>
            <a
              className="contact-email-address"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
            <button className="copy-email text-link" onClick={copyEmail}>
              <Copy size={14} aria-hidden="true" /> {t("Copy email")}
            </button>
            <span role="status" className="copy-status">
              {t(copyStatus)}
            </span>
          </>
        ) : (
          <div className="contact-row pending">
            <span className="od-field">
              <span>{t("Start a conversation")}</span>
              <small>{t("Email address to be added")}</small>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </div>
        )}
        {profile.resume ? (
          <a
            className="contact-row"
            href={`${import.meta.env.BASE_URL}${profile.resume}`}
            download
          >
            <span className="od-field">
              <span>{t("Download résumé")}</span>
              <small>{t("PDF · Get to know my work")}</small>
            </span>
            <Download size={20} aria-hidden="true" />
          </a>
        ) : (
          <div className="contact-row pending">
            <span className="od-field">
              <span>{t("My résumé")}</span>
              <small>{t("PDF will be available here")}</small>
            </span>
            <Download size={20} aria-hidden="true" />
          </div>
        )}
        <SocialLinks profile={profile} hideTelegram />
      </div>
    </section>
  );
}
