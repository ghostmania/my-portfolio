import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("./projects/");
});

test("all sections, fonts and assets load without errors or horizontal overflow", async ({
  page,
}, testInfo) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator("main section[id]")).toHaveCount(4);
  const screenshots = page.locator(".project-screenshot");
  await expect(screenshots).toHaveCount(5);
  for (const screenshot of await screenshots.all()) {
    await screenshot.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        screenshot.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-portfolio.png`,
    fullPage: true,
  });
  await page
    .locator("#projects")
    .screenshot({ path: `test-results/${testInfo.project.name}-projects.png` });
});

test("case study traps focus, closes with Escape and restores the trigger", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Project overview: Hochzeit.click",
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Hochzeit.click" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Tab");
  expect(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
  ).toBe(true);
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("backdrop closes dialog and inside clicks keep it open", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Project overview: Hochzeit.click" })
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("heading", { name: "Hochzeit.click" }).click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(dialog).not.toBeVisible();
});

test("navigation reaches contact and the mobile menu supports Escape", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", { name: "Let's build something great." }),
  ).toBeInViewport();
});

test("page and open case study pass accessibility checks", async ({ page }) => {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Project overview: Hochzeit.click" })
    .click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});

test("landing gallery enlarges images and links to the separate technical page", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  await expect(
    page.locator("#projects, #about, #skills, #experience"),
  ).toHaveCount(0);
  await expect(page.locator("main section[id]")).toHaveCount(3);
  const trigger = page.getByRole("button", { name: /Enlarge/ }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const image = dialog.getByRole("img");
  await expect(image).toBeVisible();
  const original = await image.getAttribute("src");
  await page.keyboard.press("ArrowRight");
  await expect(image).not.toHaveAttribute("src", original!);
  await page.keyboard.press("ArrowLeft");
  await expect(image).toHaveAttribute("src", original!);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  for (const image of await page.locator(".gallery-preview img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-landing.png`,
    fullPage: true,
  });
  await page
    .getByRole("link", { name: "Explore the technical details" })
    .click();
  await expect(page).toHaveURL(/projects\/$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Projects & engineering." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Igor home" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Building digital",
  );
});
