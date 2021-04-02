import React from 'react';
import {
  withKnobs, text, radios, boolean,
} from '@storybook/addon-knobs';

import Card, { CardSizes } from 'src/Card';
import mdx from './Card.mdx';

export default {
  title: 'Design System/Card',
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
    divided={boolean('With divider', false)}
    helperText={text('Helper text', '(helper text)')}
    noPadding={boolean('Without padding', false)}
    size={radios('Message Type', CardSizes, CardSizes.LARGE)}
    subTitle={text('Subtitle', 'And a subtitle')}
    title={text('Title', 'Large card with title')}
  >
    <div>
      Use knobs to try out the different card sizes
    </div>
  </Card>
);
