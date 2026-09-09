import React, { useState } from 'react';

import { expect } from 'storybook/test';

import { Drawer, DrawerBody, DrawerHeader } from '.';
import Button from '../Button';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  title: 'Interaction Tests/Drawer',
  component: Drawer,
  args: {
    visible: false,
    onRequestClose: () => {},
  },
  tags: ['!autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

type DrawerTestRenderProps = {
  closeOnOverlayClick?: boolean;
  expandable?: boolean;
};

function DrawerTestRender({
  closeOnOverlayClick,
  expandable,
}: DrawerTestRenderProps) {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Drawer
        closeOnOverlayClick={closeOnOverlayClick}
        expandable={expandable}
        visible={isVisible}
        onRequestClose={() => setVisible(false)}
      >
        <DrawerHeader
          title="Test Drawer"
          onRequestClose={() => setVisible(false)}
        />
        <DrawerBody>Drawer content</DrawerBody>
      </Drawer>
    </>
  );
}

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
      <Button onClick={() => setMounted(false)}>Unmount Drawer</Button>
      {isMounted && (
        <Drawer visible={isVisible} onRequestClose={() => setVisible(false)}>
          <DrawerHeader
            title="Lifecycle Drawer"
            onRequestClose={() => setVisible(false)}
          />
        </Drawer>
      )}
    </>
  );
}

function MultipleDrawersRender() {
  const [isFirstVisible, setFirstVisible] = useState(false);
  const [isSecondVisible, setSecondVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setFirstVisible(true)}>Open first drawer</Button>
      <Drawer
        visible={isFirstVisible}
        onRequestClose={() => setFirstVisible(false)}
      >
        <DrawerHeader
          title="First Drawer"
          onRequestClose={() => setFirstVisible(false)}
        />
        <DrawerBody>
          <Button onClick={() => setSecondVisible(true)}>
            Open second drawer
          </Button>
          <Button onClick={() => setFirstVisible(false)}>
            Close first drawer
          </Button>
        </DrawerBody>
      </Drawer>
      <Drawer
        visible={isSecondVisible}
        onRequestClose={() => setSecondVisible(false)}
      >
        <DrawerHeader
          title="Second Drawer"
          onRequestClose={() => setSecondVisible(false)}
        />
        <DrawerBody>
          <Button onClick={() => setSecondVisible(false)}>
            Close second drawer
          </Button>
        </DrawerBody>
      </Drawer>
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

export const Dismissal: Story = {
  render: () => <DrawerTestRender />,
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

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(canvas.getByRole('presentation'));
    await expect(drawer).not.toHaveClass('Drawer--visible');

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(drawer).not.toHaveClass('Drawer--visible');
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const OverlayClickDisabled: Story = {
  render: () => <DrawerTestRender closeOnOverlayClick={false} />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);
    const body = getDocumentBody(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await userEvent.click(canvas.getByRole('presentation'));
    await expect(drawer).toHaveClass('Drawer--visible');
    await expect(body).toHaveClass('Drawer--open');

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await expect(body).not.toHaveClass('Drawer--open');
  },
};

export const Expansion: Story = {
  render: () => <DrawerTestRender expandable />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const drawer = getDrawer(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await expect(drawer).not.toHaveClass('Drawer--expanded');

    await userEvent.click(canvas.getByRole('button', { name: 'Expand' }));
    await expect(drawer).toHaveClass('Drawer--expanded');

    await userEvent.click(canvas.getByRole('button', { name: 'Expand' }));
    await expect(drawer).not.toHaveClass('Drawer--expanded');
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
  render: MultipleDrawersRender,
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
