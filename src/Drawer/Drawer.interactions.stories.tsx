import React, { useState } from 'react';

import { expect, waitFor } from 'storybook/test';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import { Drawer, DrawerBody, DrawerHeader } from '.';
import Button from '../Button';
import {
  AdditionalActions as AdditionalActionsExample,
  Default as DefaultExample,
  Expandable as ExpandableExample,
  MultipleDrawers as MultipleDrawersExample,
  OverlayClickDisabled as OverlayClickDisabledExample,
  ResponsiveWidths as ResponsiveWidthsExample,
} from './Drawer.stories';
import {
  drawerBreakpointViewports,
  drawerResponsiveWidths,
} from './drawerResponsiveWidths';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  title: 'Interaction Tests/Drawer',
  component: Drawer,
  args: {
    visible: false,
    onRequestClose: () => {},
  },
  tags: ['!autodocs', '!dev'],
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...drawerBreakpointViewports,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function LifecycleCleanupRender() {
  const [isMounted, setMounted] = useState(true);
  const [isVisible, setVisible] = useState(false);

  const openDrawer = () => {
    setMounted(true);
    setVisible(true);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open</Button>
      {isMounted && (
        <Drawer visible={isVisible} onRequestClose={() => setVisible(false)}>
          <DrawerHeader
            title="Lifecycle Drawer"
            onRequestClose={() => setVisible(false)}
          />
          <DrawerBody>
            <Button onClick={() => setMounted(false)}>Unmount Drawer</Button>
          </DrawerBody>
        </Drawer>
      )}
    </>
  );
}

function getDrawer(canvasElement: HTMLElement) {
  const drawer = canvasElement.querySelector('.Drawer');
  if (!drawer) throw new Error('Drawer did not render');

  return drawer;
}

function getDocumentBody(canvasElement: HTMLElement) {
  const { ownerDocument } = canvasElement;
  const { body } = ownerDocument;

  return body;
}

type DrawerSize = keyof typeof drawerResponsiveWidths;

function responsiveWidthStory(
  size: DrawerSize,
  boundary: 'below' | 'above',
): Story {
  const width = drawerResponsiveWidths[size];
  const viewportWidth = boundary === 'below' ? width - 1 : width + 1;
  const expectedWidth = boundary === 'below' ? viewportWidth : width;

  return {
    ...ResponsiveWidthsExample,
    args: { size },
    globals: {
      viewport: {
        value: `drawer-${size}-${boundary}`,
        isRotated: false,
      },
    },
    play: async ({ canvas, canvasElement, userEvent }) => {
      const drawer = getDrawer(canvasElement);

      await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
      await expect(drawer).toHaveStyle({ width: `${expectedWidth}px` });
    },
  };
}

export const EscapeDismissal: Story = {
  ...DefaultExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(drawer).toHaveClass('Drawer--visible');
    await expect(canvas.getByRole('presentation')).toHaveClass(
      'DrawerBackgroundOverlay--active',
    );
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.keyboard('{Escape}');
    await expect(drawer).not.toHaveClass('Drawer--visible');
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const OverlayDismissal: Story = {
  ...DefaultExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(canvas.getByRole('presentation'));
    await expect(drawer).not.toHaveClass('Drawer--visible');
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const HeaderCloseDismissal: Story = {
  ...DefaultExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(drawer).not.toHaveClass('Drawer--visible');
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const OverlayClickDisabled: Story = {
  ...OverlayClickDisabledExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(drawer).toHaveStyle({ width: '512px' });
    await userEvent.click(canvas.getByRole('presentation'));
    await expect(drawer).toHaveClass('Drawer--visible');
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const Expansion: Story = {
  ...ExpandableExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(drawer).not.toHaveClass('Drawer--expanded');

    await userEvent.click(canvas.getByRole('button', { name: 'Expand' }));
    await expect(drawer).toHaveClass('Drawer--expanded');
    await waitFor(() => expect(drawer).toHaveStyle({ width: '1152px' }));

    await userEvent.click(canvas.getByRole('button', { name: 'Expand' }));
    await expect(drawer).not.toHaveClass('Drawer--expanded');
  },
};

export const SmallBelowBreakpoint = responsiveWidthStory('sm', 'below');
export const SmallAboveBreakpoint = responsiveWidthStory('sm', 'above');
export const MediumBelowBreakpoint = responsiveWidthStory('md', 'below');
export const MediumAboveBreakpoint = responsiveWidthStory('md', 'above');
export const LargeBelowBreakpoint = responsiveWidthStory('lg', 'below');
export const LargeAboveBreakpoint = responsiveWidthStory('lg', 'above');

export const TitlelessAdditionalActions: Story = {
  ...AdditionalActionsExample,
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector('.Drawer__title');
    if (!title) throw new Error('Drawer title did not render');

    await expect(title).toBeEmptyDOMElement();
  },
};

export const LifecycleCleanup: Story = {
  render: LifecycleCleanupRender,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Unmount Drawer' }),
    );
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const SharedBodyLock: Story = {
  ...MultipleDrawersExample,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const body = getDocumentBody(canvasElement);
    const drawers = canvasElement.querySelectorAll('.Drawer');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Open first drawer' }),
    );
    await expect(drawers[0]).toHaveClass('Drawer--visible');
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Open second drawer' }),
    );
    await expect(drawers[1]).toHaveClass('Drawer--visible');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Close second drawer' }),
    );
    await expect(drawers[1]).not.toHaveClass('Drawer--visible');
    await expect(drawers[0]).toHaveClass('Drawer--visible');
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Close first drawer' }),
    );
    await expect(body).not.toHaveClass('Drawer--open');
  },
};
