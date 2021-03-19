import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import Pill from 'src/Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
};

const colors = ['blue', 'orange', 'yellow', 'green', 'gray', 'silver'];

const handleClose = (id) => {
  action('handle close')(id);
};

export const Default = () => (
  <Pill
    color={select('Color', colors, 'blue')}
    id="1"
    large={boolean('Large', false)}
    text={text('Text', 'Text')}
  />
);

export const WithLeadingIcon = () => (
  <Pill
    color={select('Color', colors, 'blue')}
    icon={faUsers}
    id="2"
    large={boolean('Large', false)}
    text={text('Text', 'Text')}
  />
);

export const WithClose = () => (
  <Pill
    color={select('Color', colors, 'blue')}
    id="3"
    large={boolean('Large', false)}
    text={text('Text', 'Text')}
    onClose={handleClose}
  />
);
