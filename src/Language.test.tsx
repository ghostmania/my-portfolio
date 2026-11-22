import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { vi } from "vitest";

describe("Language selection", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("switches the page to Russian, remembers the choice and switches back", async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(screen.getByRole("button", { name: "RU — Русский" }));
    expect(document.documentElement).toHaveAttribute("lang", "ru");
    expect(document.title).toBe(
      "Игорь Борисенко — Senior Full-stack разработчик",
    );
    expect(
      screen.getByRole("heading", {
        name: "Платформа для планирования свадеб",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Довожу веб-продукты",
    );
    view.unmount();
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Идеи, ставшие продуктами." }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", {
        name: "Читать кейс: Платформа для планирования свадеб: от первой идеи до 500+ пользователей в день",
      }),
    );
    expect(screen.getByText("Решение и архитектура")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Закрыть окно" }));
    await user.click(screen.getByRole("button", { name: "EN — English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "I take web products",
    );
  });

  it("defaults to English when the saved language is unsupported", () => {
    localStorage.setItem("portfolio-language", "de");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "I take web products",
    );
  });

  it("still switches languages when browser storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage blocked");
    });
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "RU — Русский" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Довожу веб-продукты",
    );
  });
});
