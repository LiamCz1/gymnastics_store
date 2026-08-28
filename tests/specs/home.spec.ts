import { test, expect } from '../fixtures/test-fixtures';

test.describe('Home Page', () => {
  test('should display the homepage successfully', async ({ homePage }) => {
    await homePage.goto();

    await homePage.expectLoaded();
    await expect(homePage.homeNavigationLink).toBeVisible();
  });
});
