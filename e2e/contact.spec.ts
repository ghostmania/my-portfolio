import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const language of ["en", "ru"] as const) {
  test(`contact stays reachable and accessible in ${language}`, async ({
    page,
  }, testInfo) => {
    const labels =
      language === "en"
        ? {
            contact: "Contact me",
            options: "Contact options",
            email: "Email me",
            telegram: "Message on Telegram",
            close: "Close contact options",
            afterWork: "Have a project in mind?",
          }
        : {
            contact: "Написать мне",
            options: "Способы связи",
            email: "Написать на почту",
            telegram: "Написать в Telegram",
            close: "Закрыть способы связи",
            afterWork: "Есть идея проекта?",
          };
    await page.goto("./");
    await page.evaluate(() => document.fonts.ready);
    if (language === "ru")
      await page.getByRole("button", { name: "RU — Русский" }).click();
    const headerContact = page
      .getByRole("banner")
      .getByRole("link", { name: labels.contact });
    await expect(headerContact).toBeVisible();
    await expect(headerContact).toHaveAttribute(
      "href",
      "mailto:ghostmania2@gmail.com",
    );
    const trigger = page.getByRole("button", {
      name: labels.contact,
      exact: true,
    });
    await expect(trigger).toBeInViewport();
    const initialBounds = await trigger.boundingBox();
    const initialBottomGap = await trigger.evaluate(
      (button) => innerHeight - button.getBoundingClientRect().bottom,
    );
    expect(initialBounds!.height).toBeGreaterThanOrEqual(48);
    await page
      .getByRole("group", { name: labels.afterWork })
      .scrollIntoViewIfNeeded();
    await expect(trigger).toBeInViewport();
    expect(
      await trigger.evaluate(
        (button) => innerHeight - button.getBoundingClientRect().bottom,
      ),
    ).toBeCloseTo(initialBottomGap, 0);
    await trigger.click();
    const options = page.getByRole("region", { name: labels.options });
    await expect(
      options.getByRole("link", { name: labels.email }),
    ).toBeFocused();
    await expect(
      options.getByRole("link", { name: labels.email }),
    ).toHaveAttribute("href", "mailto:ghostmania2@gmail.com");
    await expect(
      options.getByRole("link", { name: labels.telegram }),
    ).toHaveAttribute("href", "https://t.me/ghostmania2");
    await page.keyboard.press("Tab");
    await expect(
      options.getByRole("link", { name: labels.telegram }),
    ).toBeFocused();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({
      path: `test-results/${testInfo.project.name}-contact-panel-${language}.png`,
    });
    await page.keyboard.press("Escape");
    await expect(options).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await options.getByRole("button", { name: labels.close }).click();
    await expect(trigger).toBeFocused();
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await page.screenshot({
      path: `test-results/${testInfo.project.name}-contact-landing-${language}.png`,
      fullPage: true,
    });
    if (testInfo.project.name === "mobile") {
      await page.setViewportSize({ width: 320, height: 640 });
      await expect(headerContact).toBeInViewport();
      await trigger.click();
      const panelBounds = await options.boundingBox();
      expect(panelBounds!.x).toBeGreaterThanOrEqual(0);
      expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(320);
      await page.keyboard.press("Escape");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.goto("./projects/");
    await expect(
      page.getByRole("group", { name: labels.afterWork }),
    ).toBeVisible();
    await expect(trigger).toBeInViewport();
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(trigger).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
