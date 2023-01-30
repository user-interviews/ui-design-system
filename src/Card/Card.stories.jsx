import React from 'react';
import {
  withKnobs, text, select, boolean,
} from '@storybook/addon-knobs';

import Card, { CardSizes } from 'src/Card';

import mdx from './Card.mdx';

export default {
  title: 'Components/Card',
  component: Card,
  decorators: [withKnobs({ escapeHTML: false })],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Card
    divided={boolean('divided', false)}
    helperText={text('helperText', '(helper text)')}
    noPadding={boolean('noPadding', false)}
    size={select('size', CardSizes, undefined)}
    subTitle={text('subTitle', 'Subtitle')}
    title={text('title', 'Default card title')}
  >
    <div>
      Use knobs to try out the different card sizes
    </div>
  </Card>
);

export const Sizes = () => (
  <>
    <Card
      size={CardSizes.EXTRA_SMALL}
      title="xs"
    >
      <code>CardSizes.EXTRA_SMALL</code>
    </Card>
    <Card
      size={CardSizes.SMALL}
      title="sm"
    >
      <code>CardSizes.SMALL</code>
    </Card>
    <Card
      size={CardSizes.MEDIUM}
      title="md"
    >
      <code>CardSizes.MEDIUM</code>
    </Card>
    <Card
      size={CardSizes.LARGE}
      title="lg"
    >
      <code>CardSizes.LARGE</code>
    </Card>
    <Card
      title="default"
    >
      When no size is given, the Card takes up the full width of its parent container.
    </Card>
  </>
);

export const Loading = () => (
  <Card
    divided={boolean('divided', false)}
    helperText={text('helperText', '(helper text)')}
    isLoading={boolean('isLoading', true)}
    noPadding={boolean('noPadding', false)}
    size={select('size', CardSizes, undefined)}
    subTitle={text('subTitle', 'Subtitle')}
    title={text('title', 'Default card title')}
  />
);
