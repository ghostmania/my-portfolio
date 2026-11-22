import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const weddingPlatform =
  "A wedding-planning platform taken from first concept to 500+ daily users";

describe("Portfolio visitor journeys", () => {
  beforeEach(() => window.history.replaceState({}, "", "/"));

  it("presents the whole portfolio on one page, in reading order", () => {
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building digital",
    );
    expect(
      [...container.querySelectorAll("main section[id]")].map(
        (section) => section.id,
      ),
    ).toEqual(["projects", "services", "about", "experience", "contact"]);
    expect(
      screen.getByRole("link", { name: /Explore projects/i }),
    ).toHaveAttribute("href", "#projects");
    expect(
      screen.getByRole("heading", { name: "The right stack for the job." }),
    ).toBeInTheDocument();
    expect(screen.queryByText("From idea to screen.")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("My approach to product development"),
    ).not.toBeInTheDocument();
  });

  it("links the header navigation to sections of the same page", () => {
    render(<App />);
    const navigation = within(screen.getByRole("navigation"));
    expect(
      navigation.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual(["#projects", "#services", "#about", "#experience", "#contact"]);
  });

  it("brands the site as igorborisenko.dev under Igor's full name", () => {
    render(<App />);
    const wordmark = within(screen.getByRole("banner")).getByRole("link", {
      name: "igorborisenko.dev home",
    });
    expect(wordmark).toHaveTextContent("igorborisenko.dev");
    expect(wordmark).toHaveAttribute("href", "#top");
    expect(document.title).toBe("Igor Borisenko — Senior Full-stack Developer");
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      /© \d{4} Igor Borisenko/,
    );
    expect(
      screen.getByRole("heading", { level: 1 }).parentElement,
    ).toHaveTextContent("Hi, I'm Igor —");
  });

  it("titles the five Projects by outcome and never names a product", () => {
    render(<App />);
    const headlines = [
      weddingPlatform,
      "A construction-supplies marketplace launched on a shared component library",
      "A mobile-first social app with navigation that earned a 4.5-star rating",
      "A legacy plant-discovery app modernised and made 40% faster",
      "Clearer digital experiences for a home-care service",
    ];
    const projects = within(document.getElementById("projects")!);
    expect(
      projects
        .getAllByRole("heading", { level: 3 })
        .slice(0, 5)
        .map((heading) => heading.textContent),
    ).toEqual(headlines);
    for (const headline of headlines)
      expect(
        projects.getByRole("button", { name: `Read case study: ${headline}` }),
      ).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(
      /hochzeit|parametric|pyjam|heldyn|wild\s?food/i,
    );
  });

  it("shows the Experience timeline titled by kind of product", () => {
    render(<App />);
    const experience = within(document.getElementById("experience")!);
    expect(
      experience
        .getAllByRole("heading", { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      "Wedding-planning platform",
      "Construction-supplies marketplace",
      "IDEA Advertising Agency",
      "Plant catalogue application",
    ]);
    expect(
      screen.getByText("Daily users on a wedding platform"),
    ).toBeInTheDocument();
  });

  it("opens a Case study and restores focus when closed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole("button", {
      name: `Read case study: ${weddingPlatform}`,
    });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: weddingPlatform });
    expect(
      within(dialog).getByText("Solution & architecture"),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("4.0s → 1.5s")).toBeInTheDocument();
    expect(within(dialog).queryAllByRole("link")).toEqual([]);
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(
      within(dialog).getByRole("button", { name: "Close dialog" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("keeps an honest short note for the Project without confirmed detail", async () => {
    const user = userEvent.setup();
    render(<App />);
    const headline = "Clearer digital experiences for a home-care service";
    await user.click(
      screen.getByRole("button", { name: `Read case study: ${headline}` }),
    );
    expect(
      within(screen.getByRole("dialog", { name: headline })).getByRole(
        "heading",
        { name: "Project context" },
      ),
    ).toBeInTheDocument();
  });

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
      screen.getByRole("button", {
        name: `Read case study: ${weddingPlatform}`,
      }),
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
      screen.getByRole("button", {
        name: `Read case study: ${weddingPlatform}`,
      }),
    );
    const dialog = screen.getByRole("dialog");
    fireEvent.click(
      within(dialog).getByRole("heading", { name: weddingPlatform }),
    );
    fireEvent.click(dialog, { clientX: 0, clientY: 0 });
    expect(dialog).toBeInTheDocument();
    fireEvent.click(dialog, { clientX: -1, clientY: -1 });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
