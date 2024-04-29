import React from 'react';

import Card, { CardSizes } from '../Card';
import { Flex } from '../Flex';
import CardStack from './CardStack';

import mdx from './CardStack.mdx';

export default {
  title: 'Layouts/CardStack',
  component: CardStack,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <CardStack size={CardSizes.SMALL}>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStack</h1>
    <Card size="sm" title="Card 1">
      <p>A layout container for a vertical stack of <code>Card</code> components</p>
      <p>Adjust the <code>size</code> knob below</p>
    </Card>
    <Card size="sm" title="Card 2" />
    <Card size="sm" title="Card 3" />
  </CardStack>
);

export const Centered = () => (
  <Flex container justifyContent="center">
    <CardStack size={CardSizes.SMALL}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStack</h1>
      <Card size="sm" title="Card 1">
        <p>Many pages consist of <code>CardStack</code> containers centered on the page.</p>
        <p>
          <code>CardStack</code> can be placed in any container and aligned as needed.
          This example is in a container with <code>display: flex; justify-content: center;</code>
        </p>
      </Card>
      <Card size="sm" title="Card 2" />
      <Card size="sm" title="Card 3" />
    </CardStack>
  </Flex>
);
