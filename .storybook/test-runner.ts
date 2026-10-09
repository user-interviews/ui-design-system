import { getStoryContext } from '@storybook/test-runner';
import axe from 'axe-core';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import { drawerResponsiveWidths } from '../src/Drawer/drawerResponsiveWidths';

import type { TestRunnerConfig } from '@storybook/test-runner';

const defaultViewport = {
  height: 720,
  width: Number.parseInt(MINIMAL_VIEWPORTS.desktop.styles.width, 10),
};

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
    if (story.id === 'components-tooltip--default') {
      await page.addScriptTag({ content: axe.source });
      const trigger = page.locator('#storybook-root .Tooltip__icon');
      for (const viewport of [
        MINIMAL_VIEWPORTS.desktop,
        MINIMAL_VIEWPORTS.tablet,
        MINIMAL_VIEWPORTS.mobile1,
      ]) {
        const width = Number.parseInt(viewport.styles.width, 10);
        await page.setViewportSize({ ...defaultViewport, width });
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
      return;
    }

    if (!/^components-drawer--responsive-(small|medium|large)$/.test(story.id))
      return;

    const sizes = { small: 'sm', medium: 'md', large: 'lg' } as const;
    const name = story.id.split('-').at(-1) as keyof typeof sizes;
    const requestedWidth = drawerResponsiveWidths[sizes[name]];
    await page.getByRole('button', { name: 'Open', exact: true }).click();
    const drawer = page.locator('.Drawer--visible');
    const body = drawer.locator('.Drawer__body');

    for (const width of [
      375,
      requestedWidth - 1,
      requestedWidth,
      requestedWidth + 1,
      1280,
    ]) {
      await page.setViewportSize({ width, height: 720 });
      const actualWidth = await drawer.evaluate(
        (element) => element.getBoundingClientRect().width,
      );
      expect(actualWidth).toBe(Math.min(width, requestedWidth));
      await body.evaluate((element) => {
        element.scrollTop = 0;
      });
      await body.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForFunction(
        () =>
          document.querySelector('.Drawer--visible .Drawer__body')!.scrollTop >
          0,
      );
      const scroll = await body.evaluate((element) => ({
        top: element.scrollTop,
        height: element.clientHeight,
        contentHeight: element.scrollHeight,
      }));
      expect(scroll.contentHeight).toBeGreaterThan(scroll.height);
      expect(scroll.top).toBeGreaterThan(0);
      const send = drawer.getByRole('button', { name: 'Send', exact: true });
      const bounds = await send.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(720);
      await send.click();
    }

    await drawer.getByRole('button', { name: 'Cancel', exact: true }).click();
    await drawer.waitFor({ state: 'detached' });
  },
};

export default config;
