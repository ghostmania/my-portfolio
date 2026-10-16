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

  it("switches the landing page to Russian and remembers the choice on the projects page", async () => {
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(screen.getByRole("button", { name: "RU — Русский" }));
    expect(document.documentElement).toHaveAttribute("lang", "ru");
    expect(
      screen.getByRole("heading", { name: "От идеи до экрана." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Следующий скриншот" }),
    ).toBeInTheDocument();
    view.unmount();
    window.history.replaceState({}, "", "/projects/");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Проекты и разработка.",
    );
    await user.click(
      screen.getByRole("button", { name: "Обзор проекта: Hochzeit.click" }),
    );
    expect(screen.getByText("Решение и архитектура")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Закрыть окно" }));
    await user.click(screen.getByRole("button", { name: "EN — English" }));
    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Projects & engineering.",
    );
  });

  it("defaults to English when the saved language is unsupported", () => {
    localStorage.setItem("portfolio-language", "de");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building digital",
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
    expect(
      screen.getByRole("heading", { name: "От идеи до экрана." }),
    ).toBeInTheDocument();
  });
});
