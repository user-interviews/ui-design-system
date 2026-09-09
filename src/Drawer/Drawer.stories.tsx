import React, { useState, type ReactNode } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from '.';
import Button from '../Button';
import {
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faTrash,
} from '../font_awesome/solid';
import mdx from './Drawer.mdx';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

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
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

type DrawerExampleProps = {
  closeOnOverlayClick?: boolean;
  defaultExpanded?: boolean;
  expandable?: boolean;
  hasBackgroundOverlay?: boolean;
  orientation?: 'left' | 'right';
  title?: ReactNode;
  bordered?: boolean;
  renderFooter?: (onRequestClose: () => void) => ReactNode;
};

function DrawerExample({
  closeOnOverlayClick,
  defaultExpanded,
  expandable,
  hasBackgroundOverlay,
  orientation,
  title = 'Title goes here',
  bordered = true,
  renderFooter,
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
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={bordered}
          title={title}
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          <p>
            Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
            vitae malesuada odio. Sed varius libero sed erat faucibus ultrices.
            Suspendisse potenti. Mauris sit amet sollicitudin urna. Donec
            porttitor, est quis aliquet condimentum, nisi felis porta odio, eu
            luctus dui ex id nisi. Curabitur ultrices enim in dolor laoreet
            porta. Proin vehicula at nisl a maximus. Sed lorem enim, elementum
            in arcu eu, lacinia consequat arcu. Pellentesque non nibh viverra,
            imperdiet purus at, finibus turpis. Sed mattis erat a risus
            dignissim, eu ultrices est rhoncus. Fusce nec feugiat tortor.
            Quisque tincidunt nulla urna, ut egestas massa congue a. Quisque
            metus felis, auctor sit amet posuere eu, aliquam blandit libero.
            Mauris sodales, velit sit amet egestas aliquet, ipsum arcu porta
            lacus, vitae mattis felis elit in metus. Nulla ligula ligula,
            laoreet in dictum sit amet, pretium ac est.
          </p>
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
      title={undefined}
    />
  ),
};

export const Empty: Story = {
  render: EmptyRender,
};

export const OverlayClickDisabled: Story = {
  render: () => <DrawerExample closeOnOverlayClick={false} />,
};
