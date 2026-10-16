import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Gallery } from "./Gallery";

describe("Carousel navigation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("wraps through screenshots and supports thumbnail keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const thumbnails = screen.getAllByRole("button", {
      name: /Show screenshot/,
    });
    await user.click(
      screen.getByRole("button", { name: "Previous screenshot" }),
    );
    expect(thumbnails.at(-1)).toHaveAttribute("aria-current", "true");
    await user.click(screen.getByRole("button", { name: "Next screenshot" }));
    expect(thumbnails[0]).toHaveAttribute("aria-current", "true");
    await user.click(thumbnails[4]);
    expect(
      screen.getByRole("heading", { name: "Parametric.one" }),
    ).toBeInTheDocument();
    await user.keyboard("{ArrowRight}{ArrowLeft}{End}");
    expect(thumbnails.at(-1)).toHaveFocus();
    await user.keyboard("{Home}");
    expect(thumbnails[0]).toHaveFocus();
    fireEvent.keyDown(thumbnails[0], { key: "ArrowRight", ctrlKey: true });
    fireEvent.keyDown(thumbnails[0], { key: "ArrowRight", altKey: true });
    fireEvent.keyDown(thumbnails[0], { key: "ArrowRight", metaKey: true });
    await user.keyboard("a");
    expect(thumbnails[0]).toHaveAttribute("aria-current", "true");
  });

  it.each([false, true])(
    "scrolls the selected thumbnail into the rail with reduced motion %s",
    async (reduced) => {
      const user = userEvent.setup();
      render(<Gallery />);
      vi.stubGlobal("matchMedia", () => ({ matches: reduced }));
      const rail = screen.getByRole("navigation", {
        name: "Choose a screenshot",
      });
      const scroll = vi.fn();
      rail.scrollTo = scroll;
      vi.spyOn(rail, "getBoundingClientRect").mockReturnValue({
        left: 0,
        right: 200,
      } as DOMRect);
      const thumbnails = screen.getAllByRole("button", {
        name: /Show screenshot/,
      });
      vi.spyOn(thumbnails[8], "getBoundingClientRect").mockReturnValue({
        left: 800,
        right: 900,
      } as DOMRect);
      await user.click(thumbnails[8]);
      expect(scroll).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: reduced ? "instant" : "smooth" }),
      );
      vi.spyOn(thumbnails[0], "getBoundingClientRect").mockReturnValue({
        left: -800,
        right: -700,
      } as DOMRect);
      await user.click(thumbnails[0]);
      expect(scroll).toHaveBeenCalledTimes(2);
    },
  );

  it("recognizes horizontal swipes without opening the viewer or hijacking vertical gestures", () => {
    render(<Gallery />);
    const surface = screen.getByRole("button", { name: /Enlarge/ });
    const swipe = (dx: number, dy: number) => {
      fireEvent.touchStart(surface, {
        touches: [{ clientX: 100, clientY: 100 }],
      });
      fireEvent.touchEnd(surface, {
        touches: [],
        changedTouches: [{ clientX: 100 + dx, clientY: 100 + dy }],
      });
    };
    swipe(-80, 0);
    expect(screen.getByText("Vendor discovery")).toBeInTheDocument();
    fireEvent.click(surface, { detail: 1 });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    swipe(80, 0);
    swipe(10, 0);
    swipe(80, 100);
    expect(screen.getByText("Couple onboarding")).toBeInTheDocument();
    fireEvent.touchStart(surface, {
      touches: [{ clientX: 100, clientY: 100 }],
    });
    fireEvent.touchCancel(surface);
    fireEvent.touchEnd(surface, {
      touches: [],
      changedTouches: [{ clientX: 0, clientY: 100 }],
    });
    fireEvent.touchStart(surface, {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 100 },
      ],
    });
    fireEvent.touchEnd(surface, {
      touches: [],
      changedTouches: [{ clientX: 0, clientY: 100 }],
    });
    expect(screen.getByText("Couple onboarding")).toBeInTheDocument();
    fireEvent.click(surface, { detail: 0 });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("navigates the expanded viewer independently and restores its trigger", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const trigger = screen.getByRole("button", { name: "Expand image" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: "Previous image" }),
    );
    expect(within(dialog).getByText("Home care services")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Next image" }),
    );
    fireEvent.keyDown(dialog, { key: "ArrowRight", altKey: true });
    fireEvent.keyDown(dialog, { key: "ArrowRight", ctrlKey: true });
    fireEvent.keyDown(dialog, { key: "ArrowRight", metaKey: true });
    expect(within(dialog).getByText("Couple onboarding")).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    const image = within(dialog).getByRole("img");
    fireEvent.touchStart(image, { touches: [{ clientX: 100, clientY: 0 }] });
    fireEvent.touchEnd(image, {
      touches: [],
      changedTouches: [{ clientX: 0, clientY: 0 }],
    });
    expect(within(dialog).getByText("Vendor discovery")).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: "Close dialog" }),
    );
    expect(trigger).toHaveFocus();
    expect(screen.getByText("Couple onboarding")).toBeInTheDocument();
  });
});
