import { getStoryContext } from '@storybook/test-runner';
import axe from 'axe-core';

import type { TestRunnerConfig } from '@storybook/test-runner';

const defaultViewport = { height: 720, width: 1280 };

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story);
    const viewportName = context.storyGlobals?.viewport?.value;
    const viewport = context.parameters.viewport?.options?.[viewportName];
    const width = Number.parseInt(viewport?.styles?.width ?? '', 10);
    const height = Number.parseInt(viewport?.styles?.height ?? '', 10);

    await page.setViewportSize(
      Number.isFinite(width) && Number.isFinite(height)
        ? { height, width }
        : defaultViewport,
    );
  },

  async postVisit(page, story) {
    if (story.id !== 'components-tooltip--default') return;

    await page.addScriptTag({ content: axe.source });
    const trigger = page.locator('#storybook-root .Tooltip__icon');
    for (const width of [1280, 720, 375]) {
      await page.setViewportSize({ width, height: 720 });
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.locator('#storybook-root .Popper').waitFor();
      const violations = await page.evaluate(async () => {
        // Full-page scans belong to consuming apps; target this control's rules.
        const result = await window.axe.run('#storybook-root', {
          runOnly: ['aria-hidden-focus', 'aria-command-name'],
        });
        return result.violations;
      });
      expect(violations).toEqual([]);
      await page.keyboard.press('Escape');
      await page
        .locator('#storybook-root .Popper')
        .waitFor({ state: 'detached' });
      await page.keyboard.press('Space');
      await page.locator('#storybook-root .Popper').waitFor();
      await page.keyboard.press('Tab');
      await page
        .locator('#storybook-root .Popper')
        .waitFor({ state: 'detached' });
    }
  },
};

export default config;
