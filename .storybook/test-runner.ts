import { getStoryContext } from '@storybook/test-runner';

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
};

export default config;
