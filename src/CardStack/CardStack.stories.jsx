import React from 'react';

import Card, { CardSizes } from 'src/Card';
import { withKnobs, select } from '@storybook/addon-knobs';
import CardStack from './CardStack';

import mdx from './CardStack.mdx';
import CardStackContainer from './CardStackContainer';

export default {
  title: 'Layouts/CardStack',
  decorators: [withKnobs],
  component: CardStack,
  subcomponents: {
    CardStackContainer,
  },
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
  <div style={{ display: 'flex', justifyContent: 'center' }}>
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
  </div>
);

const selectColWidth = (breakpoint, defaultColWidth) => (
  select(breakpoint, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], defaultColWidth)
);

export const Responsive = () => (
  <CardStackContainer
    lg={selectColWidth('lg', 8)}
    md={selectColWidth('md', 10)}
    sm={selectColWidth('sm', 12)}
    xl={selectColWidth('xl', 6)}
    xs={selectColWidth('xs', 12)}
    xxl={selectColWidth('xxl', 6)}
  >
    <CardStack>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>CardStackContainer</h1>
      <Card
        title="Card 1"
      >
        <p>
          Use <code>CardStackContainer</code> to wrap <code>CardStack </code>
          when creating a horizontally centered, responsive, vertical stack of Cards.
        </p>
      </Card>
      <p>You can place elements above, below, and between <code>Card</code> components.</p>
      <p>They fall edge to edge with its container.</p>
      <Card
        title="Card 2"
      >
        <p>
          <code>
            CardStackContainer
          </code> creates a single <code>Row </code>
          and 3 <code>Col </code>grid layout by default.
        </p>
        <p>It will horizontally center your <code>CardStack</code></p>
      </Card>
      <Card
        title="Card 3"
      >
        <p>
          Use the knobs to adjust the <code>Col</code>
          width for any breakpoint on <code>CardStackContainer</code>
        </p>
      </Card>
    </CardStack>
  </CardStackContainer>
);
