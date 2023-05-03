import { test } from '@playwright/test';

test('button', async ({ page }) => {
  await page.goto('/?path=/story/ouibutton--primary');

  // TODO: actually test interaction
});
