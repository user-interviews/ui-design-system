import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope, faChevronLeft, faChevronRight, faTrash,
} from '../font_awesome/solid';
import {
 Drawer, DrawerBody, DrawerFooter, DrawerHeader,
} from '.';

import Button from '../Button';

import mdx from './Drawer.mdx';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        defaultExpanded={false}
        expandable={false}
        hasBackgroundOverlay
        orientation="right"
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered
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
}

export function Orientation() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        defaultExpanded={false}
        expandable={false}
        hasBackgroundOverlay
        orientation="left"
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered
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
}

export function Expandable() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        defaultExpanded={false}
        expandable
        hasBackgroundOverlay
        orientation="right"
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered
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
}

export function DefaultExpanded() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        defaultExpanded
        expandable={false}
        hasBackgroundOverlay
        orientation="right"
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered
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
}

export function AdditionalActions() {
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => setVisible(!isVisible);

  return (
    <>
      <Button onClick={toggleVisible}>Open</Button>
      <Drawer
        behindNav
        defaultExpanded={false}
        expandable
        hasBackgroundOverlay={false}
        orientation="right"
        size="sm"
        visible={isVisible}
        onRequestClose={toggleVisible}
      >
        <DrawerHeader
          bordered={false}
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
}

export function Empty() {
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
}
