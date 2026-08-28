import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly homeNavigationLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.getByRole('heading', { name: /Train Like a Champion/i });
    this.homeNavigationLink = page.getByRole('link', { name: 'Home', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.mainHeading).toBeVisible();
  }
}
