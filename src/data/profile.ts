export interface Profile {
  readonly name: string;
  readonly location: string;
  readonly timezone: string;
  readonly availability: string;
  readonly email: string | null;
  readonly linkedin: string | null;
  readonly github: string | null;
  readonly telegram: string | null;
  /** Path relative to public/, without a leading slash. Supply the real file first. */
  readonly resume: string | null;
}

export const profile: Profile = {
  name: "Igor", // TODO: confirm preferred public name before adding a surname.
  location: "Batumi, Georgia",
  timezone: "UTC+4",
  availability: "Available for remote work",
  email: "ghostmania2@gmail.com",
  linkedin: "https://www.linkedin.com/in/igor-borisenko-71bb50367",
  github: "https://github.com/ghostmania",
  telegram: "https://t.me/ghostmania2",
  resume: "resume.pdf",
};

export const metrics = [
  { value: "8", label: "Years of experience" },
  { value: "15", label: "Projects delivered" },
  { value: "500", label: "Daily users on Hochzeit.click" },
] as const;
