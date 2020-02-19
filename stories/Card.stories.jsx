import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Card from '../src/Card';

export default {
  title: 'Design System|Card',
  component: Card,
  decorators: [withKnobs],
};

export const allCards = () => (
  <div>
    <Card title="Test Card">
      <div>
        {
          text('Card text', 'Some quick example text to build on the card title and make up the bulk of the card\'s content.')
        }
      </div>
    </Card>
  </div>
);

allCards.story = {
  name: 'all cards',
};
