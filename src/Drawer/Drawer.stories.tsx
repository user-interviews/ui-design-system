import React, { useState, type ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerSizes } from '.';
import Button from '../Button';
import {
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faTrash,
} from '../font_awesome/solid';
import mdx from './Drawer.mdx';
import { drawerBreakpointViewports } from './drawerResponsiveWidths';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const drawerViewportOptions = {
  ...MINIMAL_VIEWPORTS,
  ...drawerBreakpointViewports,
};

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  args: {
    visible: false,
    onRequestClose: () => {},
  },
  parameters: {
    docs: {
      page: mdx,
    },
    viewport: {
      options: drawerViewportOptions,
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

type DrawerExampleProps = {
  body?: ReactNode;
  bordered?: boolean;
  closeOnOverlayClick?: boolean;
  defaultExpanded?: boolean;
  expandable?: boolean;
  hasBackgroundOverlay?: boolean;
  orientation?: 'left' | 'right';
  renderFooter?: (onRequestClose: () => void) => ReactNode;
  size?: (typeof DrawerSizes)[keyof typeof DrawerSizes];
  title?: ReactNode;
};

function DrawerExample({
  body,
  bordered = true,
  closeOnOverlayClick,
  defaultExpanded,
  expandable,
  hasBackgroundOverlay,
  orientation,
  renderFooter,
  size = DrawerSizes.SMALL,
  title = 'Title goes here',
}: DrawerExampleProps) {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((wasVisible) => !wasVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        closeOnOverlayClick={closeOnOverlayClick}
        defaultExpanded={defaultExpanded}
        expandable={expandable}
        hasBackgroundOverlay={hasBackgroundOverlay}
        orientation={orientation}
        size={size}
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={bordered}
          title={title}
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          {body ?? (
            <p>
              Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
              vitae malesuada odio. Sed varius libero sed erat faucibus
              ultrices. Suspendisse potenti. Mauris sit amet sollicitudin urna.
              Donec porttitor, est quis aliquet condimentum, nisi felis porta
              odio, eu luctus dui ex id nisi. Curabitur ultrices enim in dolor
              laoreet porta. Proin vehicula at nisl a maximus. Sed lorem enim,
              elementum in arcu eu, lacinia consequat arcu. Pellentesque non
              nibh viverra, imperdiet purus at, finibus turpis. Sed mattis erat
              a risus dignissim, eu ultrices est rhoncus. Fusce nec feugiat
              tortor. Quisque tincidunt nulla urna, ut egestas massa congue a.
              Quisque metus felis, auctor sit amet posuere eu, aliquam blandit
              libero. Mauris sodales, velit sit amet egestas aliquet, ipsum arcu
              porta lacus, vitae mattis felis elit in metus. Nulla ligula
              ligula, laoreet in dictum sit amet, pretium ac est.
            </p>
          )}
        </DrawerBody>
        {renderFooter?.(toggleVisible)}
      </Drawer>
    </>
  );
}

function EmptyRender() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible((wasVisible) => !wasVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer visible={isVisible} onRequestClose={toggleVisible} />
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

export const Default: Story = {
  render: () => (
    <DrawerExample
      renderFooter={(onRequestClose) => (
        <DrawerFooter
          primaryActionIcon={faEnvelope}
          primaryActionText="Send"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={onRequestClose}
        />
      )}
    />
  ),
};

export const Orientation: Story = {
  render: () => <DrawerExample orientation="left" />,
};

export const Expandable: Story = {
  render: () => <DrawerExample expandable />,
};

export const DefaultExpanded: Story = {
  render: () => <DrawerExample defaultExpanded />,
};

export const ResponsiveWidths: Story = {
  args: {
    size: DrawerSizes.SMALL,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(DrawerSizes),
    },
  },
  render: ({ size }) => (
    <DrawerExample
      body={
        <p>
          Select a Drawer breakpoint in the Viewport toolbar, choose a size in
          Controls, then open the drawer to inspect its responsive width.
        </p>
      }
      size={size}
      title="Responsive width"
    />
  ),
};

export const AdditionalActions: Story = {
  render: () => (
    <DrawerExample
      bordered={false}
      expandable
      hasBackgroundOverlay={false}
      renderFooter={(onRequestClose) => (
        <DrawerFooter
          primaryActionIcon={faTrash}
          primaryActionText="Delete"
          primaryActionVariant="danger"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={onRequestClose}
        >
          <Button variant="transparent">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button variant="transparent">
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </DrawerFooter>
      )}
      title={null}
    />
  ),
};

export const Empty: Story = {
  render: EmptyRender,
};

export const OverlayClickDisabled: Story = {
  name: 'Overlay Click Does Not Dismiss',
  render: () => (
    <DrawerExample
      body={
        <p>
          At canvas widths wider than 512px, click the shaded backdrop. This
          drawer should remain open. Use the Close button to dismiss it.
        </p>
      }
      closeOnOverlayClick={false}
      title="Overlay clicks do not dismiss"
    />
  ),
};

export const MultipleDrawers: Story = {
  render: MultipleDrawersRender,
};
