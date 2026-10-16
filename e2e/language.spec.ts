import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Russian works across pages, persists on reload, and switches back to English", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  const russian = page.getByRole("button", { name: "RU — Русский" });
  await expect(russian).toBeVisible();
  await russian.click();
  await expect(russian).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page).toHaveTitle("Игорь — Senior Full-stack разработчик");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Создаю цифровые",
  );
  await page.getByRole("button", { name: "Следующий скриншот" }).click();
  await expect(page.locator(".gc-screen-name")).toHaveText(
    "Поиск специалистов",
  );
  await page
    .getByRole("button", { name: "Увеличить изображение", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Увеличить изображение", exact: true }),
  ).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-russian.png`,
    fullPage: true,
  });
  await page.getByRole("link", { name: "Подробнее о разработке" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Проекты и разработка.",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await page
    .getByRole("button", { name: "Обзор проекта: Hochzeit.click" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Решение и архитектура" }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "EN — English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Projects & engineering.",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "EN — English" }),
  ).toHaveAttribute("aria-pressed", "true");
});
