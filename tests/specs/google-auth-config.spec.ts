import { test, expect } from '../fixtures/test-fixtures';

test.describe('Google auth configuration', () => {
  test('uses a configurable client ID instead of a hardcoded OAuth credential', async ({ page }) => {
    await page.goto('/login.html');

    const scriptText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script'))
        .map(script => script.textContent || '')
        .join('\n');
    });

    expect(scriptText).toContain('GOOGLE_CLIENT_ID');
    expect(scriptText).not.toContain('1028753478315-uiopbg7e2osj31mopfrkhu1ld51h4jd7.apps.googleusercontent.com');
  });
});
