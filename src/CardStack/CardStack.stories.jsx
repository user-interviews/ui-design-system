import React from 'react';

import Card, { CardSizes } from 'src/Card';
// import { withKnobs, select } from '@storybook/addon-knobs';
import { Flex } from 'src/Flex';
import CardStack from './CardStack';

import mdx from './CardStack.mdx';

export default {
  title: 'Layouts/CardStack',
  component: CardStack,
  parameters: {
    controls: { exclude: [] },
    docs: {
      page: mdx,
    },
  },
  args: {
    size: CardSizes.SMALL,
  },
  argTypes: {
    size: {
      options: Object.values(CardSizes),
      mapping: CardSizes,
      control: { type: 'select' },
    },
  },
};

export const Default = {
  render: (args) => (
    <CardStack {...args}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStack</h1>
      <Card title="Card 1">
        <p>A layout container for a vertical stack of <code>Card</code> components</p>
        <p>Adjust the <code>size</code> knob below</p>
      </Card>
      <Card title="Card 2" />
      <Card title="Card 3" />
    </CardStack>
  ),
};
