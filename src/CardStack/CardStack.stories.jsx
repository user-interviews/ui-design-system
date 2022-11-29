import React from 'react';

import Card, { CardSizes } from 'src/Card';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Flex } from 'src/Flex';
import CardStack from './CardStack';

import mdx from './CardStack.mdx';

export default {
  title: 'Layouts/CardStack',
  decorators: [withKnobs],
  component: CardStack,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <CardStack size={select('size', Object.values(CardSizes), CardSizes.SMALL)}>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStack</h1>
    <Card title="Card 1">
      <p>A layout container for a vertical stack of <code>Card</code> components</p>
      <p>Adjust the <code>size</code> knob below</p>
    </Card>
    <Card title="Card 2" />
    <Card title="Card 3" />
  </CardStack>
);

export const Centered = () => (
  <Flex container justifyContent="center">
    <CardStack size={select('size', Object.values(CardSizes), CardSizes.SMALL)}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStack</h1>
      <Card title="Card 1">
        <p>Many pages consist of <code>CardStack</code> containers centered on the page.</p>
        <p>
          <code>CardStack</code> can be placed in any container and aligned as needed.
          This example is in a container with <code>display: flex; justify-content: center;</code>
        </p>
      </Card>
      <Card title="Card 2" />
      <Card title="Card 3" />
    </CardStack>
  </Flex>
);
