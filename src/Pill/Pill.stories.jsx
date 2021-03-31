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
import mdx from './Pill.mdx';

export default {
  title: 'Design System/Pill',
  component: Pill,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const colors = ['blue', 'orange', 'yellow', 'green', 'gray', 'silver'];

const handleClose = (id) => {
  action('handle close')(id);
};

export const Default = () => (
  <div>
    <h4 style={{marginBottom: '2rem'}}>Test Pill</h4>
    <Pill
      color={select('Color', colors, 'blue')}
      id="1"
      large={boolean('Large', false)}
      text={text('Text', 'Text')}
    />
    <h4 style={{marginBottom: '2rem', marginTop: '2rem'}} >Large</h4>
    <Pill
      color='blue'
      large
      text='Text'
    />
    <h4 style={{marginBottom: '2rem', marginTop: '2rem'}} >Colors</h4>
    <Pill
      color='blue'
      text='blue'
    />
     <Pill
      color='orange'
      text='orange'
    />
     <Pill
      color='yellow'
      text='yellow'
    />
     <Pill
      color='green'
      text='green'
    />
     <Pill
      color='gray'
      text='gray'
    />
     <Pill
      color='silver'
      text='silver'
    />
  </div>
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
