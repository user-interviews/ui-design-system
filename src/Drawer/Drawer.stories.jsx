import React, { useState } from 'react';
import {
  withKnobs, text, select, boolean, number,
} from '@storybook/addon-knobs';

import {
 Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerSizes,
} from 'src/Drawer';

import Button from 'src/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faChevronLeft, faChevronRight, faTrash,
} from '@fortawesome/pro-solid-svg-icons';

import mdx from './Drawer.mdx';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  subcomponents: {
     DrawerHeader, DrawerBody, DrawerFooter,
  },
  decorators: [withKnobs({ escapeHTML: false })],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav={(boolean('behindNav', true))}
        expandable={boolean('expandable', false)}
        hasBackgroundOverlay={boolean('hasBackgroundOverlay', true)}
        orientation={select('orientation', ['left', 'right'], 'right')}
        size={select('size', DrawerSizes, 'sm')}
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={boolean('bordered', true)}
          title="Title goes here"
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          <p>
            Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
            vitae malesuada odio. Sed varius libero sed erat faucibus ultrices.
            Suspendisse potenti. Mauris sit amet sollicitudin urna. Donec
            porttitor, est quis aliquet condimentum, nisi felis porta odio, eu
            luctus dui ex id nisi. Curabitur ultrices enim in dolor laoreet
            porta. Proin vehicula at nisl a maximus. Sed lorem enim, elementum in
            arcu eu, lacinia consequat arcu. Pellentesque non nibh viverra,
            imperdiet purus at, finibus turpis. Sed mattis erat a risus
            dignissim, eu ultrices est rhoncus. Fusce nec feugiat tortor. Quisque
            tincidunt nulla urna, ut egestas massa congue a. Quisque metus felis,
            auctor sit amet posuere eu, aliquam blandit libero. Mauris sodales,
            velit sit amet egestas aliquet, ipsum arcu porta lacus, vitae mattis
            felis elit in metus. Nulla ligula ligula, laoreet in dictum sit amet,
            pretium ac est.
          </p>
        </DrawerBody>
        <DrawerFooter
          primaryActionIcon={faEnvelope}
          primaryActionText="Send"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={toggleVisible}
        />
      </Drawer>
    </>
  );
};

export const Orientation = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav={(boolean('behindNav', true))}
        expandable={boolean('expandable', false)}
        hasBackgroundOverlay={boolean('hasBackgroundOverlay', true)}
        orientation={select('orientation', ['left', 'right'], 'left')}
        size={select('size', DrawerSizes, 'sm')}
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={boolean('bordered', true)}
          title="Title goes here"
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          <p>
            Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
            vitae malesuada odio. Sed varius libero sed erat faucibus ultrices.
            Suspendisse potenti. Mauris sit amet sollicitudin urna. Donec
            porttitor, est quis aliquet condimentum, nisi felis porta odio, eu
            luctus dui ex id nisi. Curabitur ultrices enim in dolor laoreet
            porta. Proin vehicula at nisl a maximus. Sed lorem enim, elementum in
            arcu eu, lacinia consequat arcu. Pellentesque non nibh viverra,
            imperdiet purus at, finibus turpis. Sed mattis erat a risus
            dignissim, eu ultrices est rhoncus. Fusce nec feugiat tortor. Quisque
            tincidunt nulla urna, ut egestas massa congue a. Quisque metus felis,
            auctor sit amet posuere eu, aliquam blandit libero. Mauris sodales,
            velit sit amet egestas aliquet, ipsum arcu porta lacus, vitae mattis
            felis elit in metus. Nulla ligula ligula, laoreet in dictum sit amet,
            pretium ac est.
          </p>
        </DrawerBody>
        <DrawerFooter
          primaryActionIcon={faEnvelope}
          primaryActionText="Send"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={toggleVisible}
        />
      </Drawer>
    </>
  );
};

export const Expandable = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav={(boolean('behindNav', true))}
        expandable={boolean('expandable', true)}
        hasBackgroundOverlay={boolean('hasBackgroundOverlay', true)}
        orientation={select('orientation', ['left', 'right'], 'right')}
        size={select('size', DrawerSizes, 'sm')}
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={boolean('bordered', true)}
          title="Title goes here"
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          <p>
            Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
            vitae malesuada odio. Sed varius libero sed erat faucibus ultrices.
            Suspendisse potenti. Mauris sit amet sollicitudin urna. Donec
            porttitor, est quis aliquet condimentum, nisi felis porta odio, eu
            luctus dui ex id nisi. Curabitur ultrices enim in dolor laoreet
            porta. Proin vehicula at nisl a maximus. Sed lorem enim, elementum in
            arcu eu, lacinia consequat arcu. Pellentesque non nibh viverra,
            imperdiet purus at, finibus turpis. Sed mattis erat a risus
            dignissim, eu ultrices est rhoncus. Fusce nec feugiat tortor. Quisque
            tincidunt nulla urna, ut egestas massa congue a. Quisque metus felis,
            auctor sit amet posuere eu, aliquam blandit libero. Mauris sodales,
            velit sit amet egestas aliquet, ipsum arcu porta lacus, vitae mattis
            felis elit in metus. Nulla ligula ligula, laoreet in dictum sit amet,
            pretium ac est.
          </p>
        </DrawerBody>
        <DrawerFooter
          primaryActionIcon={faEnvelope}
          primaryActionText="Send"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={toggleVisible}
        />
      </Drawer>
    </>
  );
};

export const AdditionalActions = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav={(boolean('behindNav', true))}
        expandable={boolean('expandable', true)}
        hasBackgroundOverlay={boolean('hasBackgroundOverlay', true)}
        orientation={select('orientation', ['left', 'right'], 'right')}
        size={select('size', DrawerSizes, 'sm')}
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={boolean('bordered', false)}
          onRequestClose={toggleVisible}
        />
        <DrawerBody>
          <p>
            Proin elementum vitae nibh nec tincidunt. Donec vel placerat mi,
            vitae malesuada odio. Sed varius libero sed erat faucibus ultrices.
            Suspendisse potenti. Mauris sit amet sollicitudin urna. Donec
            porttitor, est quis aliquet condimentum, nisi felis porta odio, eu
            luctus dui ex id nisi. Curabitur ultrices enim in dolor laoreet
            porta. Proin vehicula at nisl a maximus. Sed lorem enim, elementum in
            arcu eu, lacinia consequat arcu. Pellentesque non nibh viverra,
            imperdiet purus at, finibus turpis. Sed mattis erat a risus
            dignissim, eu ultrices est rhoncus. Fusce nec feugiat tortor. Quisque
            tincidunt nulla urna, ut egestas massa congue a. Quisque metus felis,
            auctor sit amet posuere eu, aliquam blandit libero. Mauris sodales,
            velit sit amet egestas aliquet, ipsum arcu porta lacus, vitae mattis
            felis elit in metus. Nulla ligula ligula, laoreet in dictum sit amet,
            pretium ac est.
          </p>
        </DrawerBody>
        <DrawerFooter
          primaryActionIcon={faTrash}
          primaryActionText="Delete"
          primaryActionVariant="danger"
          secondaryActionText="Cancel"
          onPrimaryAction={() => null}
          onSecondaryAction={toggleVisible}
        >
          <Button variant="transparent">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button variant="transparent">
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const Empty = () => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        visible={isVisible}
        onRequestClose={toggleVisible}
      />
    </>
  );
};
