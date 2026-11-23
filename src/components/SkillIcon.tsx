import { Blocks, Gauge, Rocket, Webhook, type LucideIcon } from "lucide-react";
import {
  siAngular,
  siFirebase,
  siGithubactions,
  siGoogle,
  siHtml5,
  siHubspot,
  siJest,
  siNodedotjs,
  siPostgresql,
  siReact,
  siStripe,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import type { skills } from "../data/skills";

type SkillItem = (typeof skills)[number]["items"][number];

// Every skill needs an entry here: a brand mark where one exists, a plain icon otherwise.
const icons: Record<SkillItem, SimpleIcon | LucideIcon> = {
  "Angular & RxJS": siAngular,
  "React & Next.js": siReact,
  TypeScript: siTypescript,
  "HTML · CSS · SCSS": siHtml5,
  "Node.js & NestJS": siNodedotjs,
  Firebase: siFirebase,
  "PostgreSQL & MongoDB": siPostgresql,
  "REST APIs": Webhook,
  Stripe: siStripe,
  HubSpot: siHubspot,
  "Google APIs": siGoogle,
  "Third-party services": Blocks,
  "Performance & architecture": Gauge,
  "Jest & Playwright": siJest,
  "CI/CD & GitHub Actions": siGithubactions,
  "Deployment & optimization": Rocket,
};

export function SkillIcon({ item }: { item: SkillItem }) {
  const icon = icons[item];
  if ("path" in icon) {
    return (
      <svg
        className="skill-icon"
        viewBox="0 0 24 24"
        fill={`#${icon.hex}`}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
    );
  }
  const Icon = icon;
  return <Icon className="skill-icon" aria-hidden="true" />;
}
