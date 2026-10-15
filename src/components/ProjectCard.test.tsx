import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projects } from "../data/projects";

const suppliedProject = {
  ...projects[0],
  url: "https://example.com/project",
  screenshot: {
    path: "projects/real.webp",
    alt: "Authorized project screenshot",
    width: 1200,
    height: 800,
  },
};

it("renders an owner-supplied screenshot with reserved size and lazy loading", () => {
  const select = vi.fn();
  render(<ProjectCard project={suppliedProject} onSelect={select} />);
  const image = screen.getByRole("img", {
    name: "Authorized project screenshot",
  });
  expect(image).toHaveAttribute("src", "/projects/real.webp");
  expect(image).toHaveAttribute("width", "1200");
  expect(image).toHaveAttribute("loading", "lazy");
  fireEvent.click(screen.getByRole("button", { name: /Project overview/ }));
  expect(select).toHaveBeenCalledWith(suppliedProject);
});

it("renders an authorized live project link and keeps focus within multiple controls", () => {
  render(<ProjectModal project={suppliedProject} onClose={vi.fn()} />);
  const link = screen.getByRole("link", { name: "Visit project" });
  expect(link).toHaveAttribute("href", suppliedProject.url);
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  link.focus();
  fireEvent.keyDown(link, { key: "Tab" });
  expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole("button", { name: "Close dialog" }), {
    key: "Tab",
    shiftKey: true,
  });
  expect(link).toHaveFocus();
  fireEvent.keyDown(link, { key: "Tab", shiftKey: true });
});

it("shows the supplied screenshot in the case study with its natural dimensions", () => {
  render(<ProjectModal project={suppliedProject} onClose={vi.fn()} />);
  const image = screen.getByRole("img", {
    name: "Authorized project screenshot",
  });
  expect(image).toHaveAttribute("src", "/projects/real.webp");
  expect(image).toHaveAttribute("width", "1200");
  expect(image).toHaveAttribute("height", "800");
  expect(image).toHaveAttribute("loading", "lazy");
});
