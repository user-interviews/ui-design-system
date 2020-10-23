import React from 'react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import Pill from 'src/Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
};

const colors = ['', 'blue', 'orange', 'green', 'gray', 'yellow'];
const sizes = ['', 'sm'];

export const Default = () => (
  <Pill
    text={text('Pill Text', 'Test pill')}
    color={select('Color', colors, '')}
    size={select('Size', sizes, '')}
    squared={boolean('Squared', false)}
  />
);
