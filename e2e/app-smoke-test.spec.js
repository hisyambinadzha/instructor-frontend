// @ts-check
import { test, expect } from '@playwright/test';

test('admin can login and view instructor page', async ({ page }) => {
  await page.goto('/login');
  
  await page.getByPlaceholder('Enter email').fill('admin@gmail.com');
  await page.getByPlaceholder('Enter password').fill('password');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/dashboard/);

  await page.goto("/instructors");

  await expect(
    page.getByRole("heading", { name: /instructor list/i })
  ).toBeVisible();

  await expect(
    page.getByText(/this is the instructor list page/i)
  ).toBeVisible({ timeout: 10000 });
});

test('admin can search for an instructor', async ({ page }) => {
  await page.goto('/login');
  
  await page.getByPlaceholder('Enter email').fill('user@gmail.com');
  await page.getByPlaceholder('Enter password').fill('password');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto("/instructors");

  await page.getByPlaceholder(/search/i).fill("JWT");

  await expect(page.getByText(/showing/i)).toBeVisible();
});
