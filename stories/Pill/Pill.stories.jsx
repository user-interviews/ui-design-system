import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  select,
} from '@storybook/addon-knobs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import Pill from 'src/Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
};

const colors = ['', 'blue', 'orange', 'yellow', 'green', 'gray', 'silver'];
const sizes = ['', 'lg', 'sm'];

const handleClose = (id) => {
  action('handle close')(id)
};

export const Default = () => (
  <Pill
    color={select('Color', colors, '')}
    id='1'
    size={select('Size', sizes, '')}
    text={text('Text', 'Test pill')}
  />
);

export const WithLeadingIcon = () => (
  <Pill
    color={select('Color', colors, 'green')}
    icon={faUsers}
    id='2'
    size={select('Size', sizes, 'sm')}
    text={text('Text','Text' )}
  />
);

export const WithClose = () => (
  <Pill
    color={select('Color', colors, 'orange')}
    id="3"
    onClose={handleClose}
    size={select('Size', sizes, 'sm')}
    text={text('Text','Text' )}
  />
);
