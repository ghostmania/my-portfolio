import { fireEvent, render, screen, within } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "../data/projects";

const project: Project = {
  id: "sample",
  category: "Sample category",
  headline: "A sample product taken from idea to launch",
  summary: "Sample summary.",
  intro: "Sample intro.",
  tags: ["TypeScript"],
  sections: [{ title: "My role", body: "Sample role." }],
  results: [{ value: "10+", label: "Sample result" }],
  screenshots: [
    {
      path: "projects/real.webp",
      alt: "Lead screenshot",
      width: 1200,
      height: 800,
    },
    {
      path: "projects/second.webp",
      alt: "Second screenshot",
      width: 900,
      height: 600,
    },
  ],
};

it("presents a Project by its Outcome headline, Category tag, results and lead screenshot", () => {
  const select = vi.fn();
  render(<ProjectCard project={project} onSelect={select} />);
  expect(
    screen.getByRole("heading", { name: project.headline }),
  ).toBeInTheDocument();
  expect(screen.getByText("Sample category")).toBeInTheDocument();
  expect(screen.getByText("10+")).toBeInTheDocument();
  expect(screen.getAllByRole("img")).toHaveLength(1);
  const image = screen.getByRole("img", { name: "Lead screenshot" });
  expect(image).toHaveAttribute("src", "/projects/real.webp");
  expect(image).toHaveAttribute("width", "1200");
  expect(image).toHaveAttribute("loading", "lazy");
  fireEvent.click(
    screen.getByRole("button", {
      name: `Read case study: ${project.headline}`,
    }),
  );
  expect(select).toHaveBeenCalledWith(project);
});

it("shows every screenshot in the Case study and offers no live link", () => {
  render(<ProjectModal project={project} onClose={vi.fn()} />);
  const dialog = within(screen.getByRole("dialog", { name: project.headline }));
  expect(
    dialog.getByRole("heading", { level: 2, name: project.headline }),
  ).toBeInTheDocument();
  expect(dialog.getAllByRole("img")).toHaveLength(2);
  const second = dialog.getByRole("img", { name: "Second screenshot" });
  expect(second).toHaveAttribute("width", "900");
  expect(second).toHaveAttribute("height", "600");
  expect(dialog.queryAllByRole("link")).toEqual([]);
});
