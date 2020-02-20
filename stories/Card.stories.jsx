import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';

import Card from '../src/Card/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/global.scss';

export default {
  title: 'Design System/Card',
  component: Card,
  decorators: [withA11y, withKnobs],
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
