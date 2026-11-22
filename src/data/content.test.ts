import ru from "../i18n/ru.json";
import { experience } from "./experience";
import { metrics, profile } from "./profile";
import { projects } from "./projects";

// Product names stay in the résumé only. Add a new product's name here when
// its Project is added, so it can never slip into site text.
const productNames = /hochzeit|parametric|pyjam|heldyn|wild\s?food/i;

const dictionary = ru as Record<string, string>;

const projectText = projects.flatMap((project) => [
  project.category,
  project.headline,
  project.summary,
  project.intro,
  ...project.sections.flatMap((section) => [section.title, section.body]),
  ...project.results.map((result) => result.label),
  ...project.screenshots.map((screenshot) => screenshot.alt),
]);
const experienceText = experience.flatMap((entry) => [
  entry.period,
  entry.category,
  entry.title,
  entry.role,
  entry.description,
]);
const profileText = [
  profile.name,
  profile.firstName,
  profile.location,
  profile.availability,
  profile.portrait.alt,
  ...metrics.map((metric) => metric.label),
];
const siteText = [...projectText, ...experienceText, ...profileText];

it("translates every Project, Experience entry and profile string into Russian", () => {
  expect(siteText.filter((text) => !dictionary[text])).toEqual([]);
});

it("keeps product names out of site text in both languages", () => {
  const visible = [
    ...siteText,
    ...projects.flatMap((project) => [
      ...project.tags,
      ...project.results.map((result) => result.value),
    ]),
    ...Object.keys(dictionary),
    ...Object.values(dictionary),
  ];
  expect(visible.filter((text) => productNames.test(text))).toEqual([]);
});

it("gives every Project a unique id and at least one screenshot", () => {
  expect(new Set(projects.map((project) => project.id)).size).toBe(
    projects.length,
  );
  expect(
    projects.filter((project) => project.screenshots.length === 0),
  ).toEqual([]);
});
