import React from 'react';
import {
  withKnobs, text, radios, boolean,
} from '@storybook/addon-knobs';

import Card, { CardSizes } from 'src/Card';

export default {
  title: 'Design System/Card',
  component: Card,
  decorators: [withKnobs({ escapeHTML: false })],
};

export const Default = () => (
  <Card
    active={boolean('Is active', false)}
    noPadding={boolean('Without padding', false)}
    ruled={boolean('With horizontal rule', false)}
    size={radios('Message Type', CardSizes, CardSizes.LARGE)}
    subTitle={text('Subtitle', 'And a subtitle')}
    title={text('Title', 'Large card with title')}
  >
    <div>
      Use knobs to try out the different card sizes
    </div>
  </Card>
);
