import React from 'react';
import {
  withKnobs,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';

import Pill from 'src/Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
};

const colors = ['', 'blue', 'orange', 'yellow', 'green', 'gray', 'silver' ];
const sizes = ['', 'sm'];

export const Default = () => (
  <Pill
    color={select('Color', colors, '')}
    size={select('Size', sizes, '')}
    squared={boolean('Squared', false)}
    text={text('Pill Text', 'Test pill')}
  />
);
