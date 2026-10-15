import { useState } from "react";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import type { Profile } from "../../data/profile";
import { SocialLinks } from "../SocialLinks";

export function Contact({ profile }: { profile: Profile }) {
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
        <span className="eyebrow">Have something in mind?</span>
        <h2 id="contact-heading">
          Let's build
          <br />
          <span>something great.</span>
        </h2>
        <p>
          A new product, an ambitious challenge, or a platform ready for its
          next chapter. I'd love to hear about it.
        </p>
      </div>
      <div className="contact-links">
        {profile.email ? (
          <>
            <a className="contact-row" href={`mailto:${profile.email}`}>
              <span className="od-field">
                <span>Start a conversation</span>
                <small>{profile.email}</small>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <button className="copy-email text-link" onClick={copyEmail}>
              <Copy size={14} aria-hidden="true" />
              Copy email
            </button>
            <span role="status" className="copy-status">
              {copyStatus}
            </span>
          </>
        ) : (
          <div className="contact-row pending">
            <span className="od-field">
              <span>Start a conversation</span>
              <small>Email address to be added</small>
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
              <span>Download résumé</span>
              <small>PDF · Get to know my work</small>
            </span>
            <Download size={20} aria-hidden="true" />
          </a>
        ) : (
          <div className="contact-row pending">
            <span className="od-field">
              <span>My résumé</span>
              <small>PDF will be available here</small>
            </span>
            <Download size={20} aria-hidden="true" />
          </div>
        )}
        <SocialLinks profile={profile} />
      </div>
    </section>
  );
}
