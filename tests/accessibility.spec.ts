import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getStories } from './util.ts';

const STORIES = await getStories();

test.describe('accessibility', () => {
  for (const key of Object.keys(STORIES.stories)) {
    const story = STORIES.stories[key];
    if (
      typeof story.parameters.docsOnly === 'boolean' &&
      story.parameters.docsOnly
    ) {
      continue;
    }

    test(`[${story.title}] ${story.name}`, async ({ page }, testInfo) => {
      await page.goto(`http://localhost:6006/?path=/story/${story.id}`);

      const frame = page
        .frameLocator('#storybook-preview-iframe')
        .locator('#storybook-root');
      await frame.waitFor();

      const accessibilityScanResults = await new AxeBuilder({ page })
        .include({
          fromFrames: ['#storybook-preview-iframe', '#storybook-root'],
        })
        .analyze();

      await testInfo.attach(`accessibility-scan-${story.id}-results`, {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json',
      });

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
