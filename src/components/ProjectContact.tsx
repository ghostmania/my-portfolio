import { useId } from "react";
import { useLanguage } from "../i18n/context";
import { ContactActions } from "./ContactActions";

export function ProjectContact() {
  const { t } = useLanguage();
  const headingId = useId();
  return (
    <div className="project-contact" role="group" aria-labelledby={headingId}>
      <div>
        <h3 id={headingId}>{t("Have a project in mind?")}</h3>
        <p>{t("Tell me what you want to build. Let's take the next step.")}</p>
      </div>
      <ContactActions />
    </div>
  );
}
