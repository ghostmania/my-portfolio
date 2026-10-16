import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Portfolio visitor journeys", () => {
  beforeEach(() => window.history.replaceState({}, "", "/projects/"));

  it("keeps the landing page focused on services and visual work", () => {
    window.history.replaceState({}, "", "/");
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building digital",
    );
    expect(
      [...container.querySelectorAll("main section[id]")].map(
        (section) => section.id,
      ),
    ).toEqual(["services", "gallery", "contact"]);
    expect(
      screen.getByRole("link", { name: /Explore projects/i }),
    ).toHaveAttribute("href", "#gallery");
  });

  it("opens an enlarged gallery image and restores focus", async () => {
    window.history.replaceState({}, "", "/");
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getAllByRole("button", { name: /Enlarge/ })[0];
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Next image" }),
    );
    await user.click(
      within(dialog).getByRole("button", { name: "Close dialog" }),
    );
    expect(trigger).toHaveFocus();
  });

  it("keeps projects, about and skills on the technical page", () => {
    const { container } = render(<App />);
    expect(
      [...container.querySelectorAll("main section[id]")].map((el) => el.id),
    ).toEqual(["projects", "about", "skills", "contact"]);
    expect(screen.queryByText("Built on experience.")).not.toBeInTheDocument();
  });

  it("opens the featured case study and restores focus when closed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole("button", {
      name: "Project overview: Hochzeit.click",
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Hochzeit.click" });
    expect(
      within(dialog).getByText("Solution & architecture"),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("4.0s → 1.5s")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(
      within(dialog).getByRole("button", { name: "Close dialog" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it.each(["Parametric.one", "Heldyn", "Pyjam"])(
    "opens honest project notes for %s",
    async (name) => {
      const user = userEvent.setup();
      render(<App />);
      await user.click(
        screen.getByRole("button", { name: `Project overview: ${name}` }),
      );
      const dialog = screen.getByRole("dialog", { name });
      if (name === "Heldyn")
        expect(
          within(dialog).getByRole("heading", { name: "Project context" }),
        ).toBeInTheDocument();
      else
        expect(
          within(dialog).getByRole("heading", { name: "My role" }),
        ).toBeInTheDocument();
    },
  );

  it("opens navigation and closes it after an anchor selection", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");
    await user.click(
      within(screen.getByRole("navigation")).getByRole("link", {
        name: "Projects",
      }),
    );
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the owner's contact links and résumé download", () => {
    render(<App />);
    expect(
      screen
        .getByRole("region", { name: "Let's build something great." })
        .querySelector("a[href^='mailto:']"),
    ).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
    const contact = within(document.getElementById("contact")!);
    expect(contact.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/igor-borisenko-71bb50367",
    );
    expect(contact.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/ghostmania",
    );
    expect(contact.getByRole("link", { name: /Telegram/ })).toHaveAttribute(
      "href",
      "https://t.me/ghostmania2",
    );
    const resume = screen.getByRole("link", { name: /Download résumé/i });
    expect(resume).toHaveAttribute("href", "/resume.pdf");
    expect(resume).toHaveAttribute("download");
  });

  it("closes the mobile menu with Escape and returns focus to its toggle", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.keyboard("a{Escape}");
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveFocus();
  });

  it("closes mobile navigation from the header contact call to action", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Open navigation" }));
    await user.click(
      within(screen.getByRole("banner")).getByRole("link", {
        name: "Contact me",
      }),
    );
    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps keyboard focus in the dialog and synchronizes native cancellation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Project overview: Hochzeit.click" }),
    );
    const dialog = screen.getByRole("dialog");
    const close = within(dialog).getByRole("button", { name: "Close dialog" });
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.keyboard("a");
    fireEvent(dialog, new Event("cancel", { bubbles: true, cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes only on backdrop clicks, not on dialog content", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Project overview: Hochzeit.click" }),
    );
    const dialog = screen.getByRole("dialog");
    fireEvent.click(
      within(dialog).getByRole("heading", { name: "Hochzeit.click" }),
    );
    fireEvent.click(dialog, { clientX: 0, clientY: 0 });
    expect(dialog).toBeInTheDocument();
    fireEvent.click(dialog, { clientX: -1, clientY: -1 });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
