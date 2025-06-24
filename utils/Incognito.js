import { test as baseTest, expect } from '@playwright/test';

const test = baseTest.extend({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();  // incognito
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  }
});

export { test, expect };
