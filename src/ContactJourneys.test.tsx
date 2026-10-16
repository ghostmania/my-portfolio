import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Contact discovery", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });
  afterEach(() => localStorage.clear());

  it("offers direct email and Telegram actions at the start, after work, and before the résumé", () => {
    render(<App />);
    const hero = within(screen.getByRole("region", { name: /Building digital/ }));
    expect(hero.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
    expect(hero.getByRole("link", { name: "Message on Telegram" })).toHaveAttribute("href", "https://t.me/ghostmania2");
    const afterWork = within(screen.getByRole("group", { name: "Have a project in mind?" }));
    expect(afterWork.getByRole("link", { name: "Email me" })).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
    expect(afterWork.getByRole("link", { name: "Message on Telegram" })).toHaveAttribute("rel", "noopener noreferrer");
    const contact = within(screen.getByRole("region", { name: "Let's build something great." }));
    const telegram = contact.getByRole("link", { name: "Message on Telegram" });
    const resume = contact.getByRole("link", { name: /Download résumé/ });
    expect(telegram.compareDocumentPosition(resume) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
  });

  it("opens contact options, supports keyboard dismissal and restores focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    const trigger = screen.getByRole("button", { name: "Contact me" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    const options = screen.getByRole("region", { name: "Contact options" });
    expect(within(options).getByRole("link", { name: "Email me" })).toHaveFocus();
    await user.tab();
    expect(within(options).getByRole("link", { name: "Message on Telegram" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("region", { name: "Contact options" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    await user.click(screen.getByRole("heading", { level: 1 }));
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    fireEvent.keyDown(document, { key: "a" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("provides the same translated contact options on the technical page", async () => {
    window.history.replaceState({}, "", "/projects/");
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "RU — Русский" }));
    expect(screen.getByRole("group", { name: "Есть идея проекта?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Написать мне" }));
    const options = within(screen.getByRole("region", { name: "Способы связи" }));
    expect(options.getByRole("link", { name: "Написать на почту" })).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
    expect(options.getByRole("link", { name: "Написать в Telegram" })).toHaveAttribute("href", "https://t.me/ghostmania2");
    await user.click(options.getByRole("button", { name: "Закрыть способы связи" }));
    expect(screen.getByRole("button", { name: "Написать мне" })).toHaveFocus();
  });
});
