import { getStoryContext } from '@storybook/test-runner';
import axe from 'axe-core';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import { drawerResponsiveWidths } from '../src/Drawer/drawerResponsiveWidths';

import type { TestRunnerConfig } from '@storybook/test-runner';

const defaultViewport = {
  height: 720,
  width: Number.parseInt(MINIMAL_VIEWPORTS.desktop.styles.width),
};

// Fixed design colors catch Bootstrap changing how the DS mixins are consumed.
const primaryColor = 'rgb(22, 44, 78)';
const pressedColor = 'rgb(1, 8, 18)';
const white = 'rgb(255, 255, 255)';
const transparent = 'rgba(0, 0, 0, 0)';
const variantStyles = {
  primary: {
    normal: {
      color: white,
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    hover: {
      color: white,
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    active: {
      color: white,
      backgroundColor: pressedColor,
      borderColor: pressedColor,
    },
  },
  'outline-primary': {
    normal: {
      color: primaryColor,
      backgroundColor: transparent,
      borderColor: primaryColor,
    },
    hover: {
      color: white,
      backgroundColor: primaryColor,
      borderColor: primaryColor,
    },
    active: {
      color: white,
      backgroundColor: pressedColor,
      borderColor: pressedColor,
    },
  },
  transparent: {
    normal: {
      color: 'rgb(97, 97, 97)',
      backgroundColor: transparent,
      borderColor: transparent,
    },
    hover: {
      color: 'rgb(16, 16, 16)',
      backgroundColor: 'rgb(225, 225, 225)',
      borderColor: transparent,
    },
    active: {
      color: 'rgb(16, 16, 16)',
      backgroundColor: 'rgb(209, 209, 209)',
      borderColor: 'rgb(209, 209, 209)',
    },
  },
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
    if (
      [
        'components-button--regression-variants',
        'components-dropdown--regression-variants',
      ].includes(story.id)
    ) {
      const isDropdown = story.id.startsWith('components-dropdown');
      // Read settled states without depending on Bootstrap's color-transition duration.
      await page.addStyleTag({
        content: '.Button, .DropdownToggle { transition: none !important; }',
      });

      for (const [variant, expected] of Object.entries(variantStyles)) {
        const button = page.locator(`#regression-${variant}`);
        const readStyle = () =>
          button.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              color: style.color,
              backgroundColor: style.backgroundColor,
              borderColor: style.borderColor,
            };
          });
        await page.mouse.move(0, 0);
        expect(await readStyle()).toEqual(expected.normal);
        await button.hover();
        expect(await readStyle()).toEqual(expected.hover);
        await page.mouse.down();
        // Transparent dropdown toggles deliberately retain a clear background on focus.
        expect(await readStyle()).toEqual({
          ...expected.active,
          ...(isDropdown && variant === 'transparent'
            ? { backgroundColor: transparent }
            : {}),
        });
        // Releasing away avoids opening a dropdown during the style assertions.
        await page.mouse.move(0, 0);
        await page.mouse.up();
        await page.keyboard.press('Tab');
        await button.focus();
        const focus = await button.evaluate((element) => {
          const style = getComputedStyle(element);
          return { width: style.outlineWidth, style: style.outlineStyle };
        });
        expect(focus).toEqual({ width: '2px', style: 'solid' });

        if (isDropdown) {
          await page.keyboard.press('ArrowDown');
          const first = page.getByRole('link', {
            name: 'First action',
            exact: true,
          });
          const second = page.getByRole('link', {
            name: 'Second action',
            exact: true,
          });
          await first.waitFor({ state: 'visible' });
          // Link menus open on the first ArrowDown and enter items on the next.
          await page.keyboard.press('ArrowDown');
          expect(
            await first.evaluate(
              (element) => element === document.activeElement,
            ),
          ).toBe(true);
          await page.keyboard.press('ArrowDown');
          expect(
            await second.evaluate(
              (element) => element === document.activeElement,
            ),
          ).toBe(true);
          await page.keyboard.press('Escape');
          expect(await button.getAttribute('aria-expanded')).toBe('false');
          expect(
            await button.evaluate(
              (element) => element === document.activeElement,
            ),
          ).toBe(true);
        } else {
          const disabled = page.locator(`#regression-${variant}-disabled`);
          expect(await disabled.isDisabled()).toBe(true);
          const disabledStyle = await disabled.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
              color: style.color,
              backgroundColor: style.backgroundColor,
              borderColor: style.borderColor,
            };
          });
          expect(disabledStyle).toEqual({
            ...expected.normal,
            ...(variant === 'transparent'
              ? { color: 'rgb(161, 161, 161)' }
              : {}),
          });
        }
        await button.blur();
      }
      return;
    }

    if (story.id === 'components-tooltip--default') {
      await page.addScriptTag({ content: axe.source });
      const trigger = page.locator('#storybook-root .Tooltip__icon');
      for (const viewport of [
        MINIMAL_VIEWPORTS.desktop,
        MINIMAL_VIEWPORTS.tablet,
        MINIMAL_VIEWPORTS.mobile1,
      ]) {
        const width = Number.parseInt(viewport.styles.width);
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
