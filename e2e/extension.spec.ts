import { test, expect } from "./utils/extension";
import dotenv from "dotenv";
dotenv.config();

test("test index title", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const title = await page.title();
  expect(title).toBe("Best page");
});

test("test test title in popup", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const element = page.locator(".title");

  const text = await element.textContent();
  expect(text).toBe("📜 Page Analyzer 🌟");
});

test("should show error when trying to save an empty API key", async ({
  page,
  extensionId,
}) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const button = page.locator(".btn");
  await button.click();

  expect(page.locator(".error-message")).not.toBe(null);
});

test("success login", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const input = await page.locator(".api-input");

  const apiKey = process.env.API_KEY;

  if (!apiKey) throw new Error("API_KEY is not set in environment variables");

  await input.type(apiKey);

  const button = page.locator(".btn");
  await button.click();

  const analysisSection = page.locator(".analysis-section");
  await page.waitForTimeout(3000);
  await analysisSection.waitFor({ state: "visible" });

  expect(analysisSection).toBeVisible();
});

test("unsucessful login", async ({ page, extensionId }) => {
  await page.goto(`chrome-extension://${extensionId}/index.html`);

  const input = await page.locator(".api-input");

  await input.type("invalid-api-key");

  const button = page.locator(".btn");
  await button.click();

  const error = page.locator(".error-message");
  await error.waitFor({ state: "visible" });
  expect(error).toBeVisible();
});
