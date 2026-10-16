import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";

const contactProfile = {
  name: "Test owner",
  location: "Test location",
  timezone: "UTC+4",
  availability: "Available for remote work",
  email: "test@example.com",
  linkedin: "https://www.linkedin.com/in/test",
  github: "https://github.com/test",
  telegram: "https://t.me/test",
  resume: "resume.pdf",
};

it("shows honest placeholders when contact details and résumé are missing", () => {
  render(
    <Contact
      profile={{
        ...contactProfile,
        email: null,
        linkedin: null,
        github: null,
        telegram: null,
        resume: null,
      }}
    />,
  );
  expect(screen.getByText("Email address to be added")).toBeInTheDocument();
  expect(screen.getByText("PDF will be available here")).toBeInTheDocument();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
});

it("renders supplied contact destinations and a base-aware real resume link", () => {
  render(<Contact profile={contactProfile} />);
  expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
    "href",
    "mailto:test@example.com",
  );
  expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    contactProfile.github,
  );
  expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  expect(screen.getByRole("link", { name: /Download résumé/ })).toHaveAttribute(
    "href",
    "/resume.pdf",
  );
});

it("copies the configured email and announces success", async () => {
  const user = userEvent.setup();
  render(<Contact profile={contactProfile} />);
  await user.click(screen.getByRole("button", { name: "Copy email" }));
  expect(await navigator.clipboard.readText()).toBe("test@example.com");
  expect(screen.getByRole("status")).toHaveTextContent("Email copied");
});

it("provides an honest fallback when clipboard access fails", async () => {
  const user = userEvent.setup();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(
    new Error("Denied"),
  );
  render(<Contact profile={contactProfile} />);
  await user.click(screen.getByRole("button", { name: "Copy email" }));
  expect(screen.getByRole("status")).toHaveTextContent(
    "Please copy the email address manually",
  );
});
