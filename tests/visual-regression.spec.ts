import { test, expect } from '@playwright/test';
import { getStories } from './util.ts';

const STORIES = await getStories();

test.describe('regression test', () => {
  for (const key of Object.keys(STORIES.stories)) {
    const story = STORIES.stories[key];
    if (
      typeof story.parameters.docsOnly === 'boolean' &&
      story.parameters.docsOnly
    ) {
      continue;
    }

    test(`[${story.title}] ${story.name}`, async ({ page }) => {
      await page.goto(`http://localhost:6006/?path=/story/${story.id}`);

      const frame = page
        .frameLocator('#storybook-preview-iframe')
        .locator('#storybook-root');
      await expect(frame).toHaveScreenshot(`${story.id}.png`);
    });
  }
});
