import { test, expect } from '@playwright/test';

test.describe('Dashboard User Journey', () => {
  test('navigates through feed, performs search, and checks favorites', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Unified Feed' })).toBeVisible();

    const searchInput = page.getByPlaceholder(/search news, movies, or posts/i);
    await searchInput.fill('Insight');
    await page.waitForTimeout(600);

    const cards = page.locator('[data-testid="content-card"]');
    await expect(cards.first()).toBeVisible();

    const favButton = page.locator('button[aria-label="favorite-button"]').first();
    await favButton.click();

    await page.getByRole('link', { name: 'Favorites' }).click();
    await expect(page).toHaveURL('/favorites');
    await expect(page.getByRole('heading', { name: 'Saved Favorites' })).toBeVisible();
    await expect(page.locator('[data-testid="content-card"]')).toHaveCount(1);
  });

  test('verifies feed cards render and drag handle is accessible', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('[data-testid="content-card"]');
    await expect(cards.first()).toBeVisible();
    
    // Verify draggable wrapper items are rendered in the DOM
    const dragWrappers = page.locator('.group\\/drag');
    await expect(dragWrappers.first()).toBeVisible();
  });
});
