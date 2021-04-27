import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  select,
} from '@storybook/addon-knobs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import { Pill, PILL_COLORS } from 'src/Pill';
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

const handleClose = (id) => {
  action('handle close')(id);
};

export const Default = () => (
  <div>
    <h4 style={{ marginBottom: '2rem' }}>Test Pill</h4>
    <Pill
      color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
      id="1"
      text={text('Text', 'Text')}
    />
    <h4 style={{ marginBottom: '2rem', marginTop: '2rem' }}>Colors</h4>
    <Pill
      color={PILL_COLORS.BLUE}
      text="blue"
    />
    <Pill
      color={PILL_COLORS.ORANGE}
      text="orange"
    />
    <Pill
      color={PILL_COLORS.YELLOW}
      text="yellow"
    />
    <Pill
      color={PILL_COLORS.GREEN}
      text="green"
    />
    <Pill
      color={PILL_COLORS.GRAY}
      text="gray"
    />
    <Pill
      color={PILL_COLORS.SILVER}
      text="silver"
    />
  </div>
);

export const WithLeadingIcon = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    icon={faUsers}
    id="2"
    text={text('Text', 'Text')}
  />
);

export const WithClose = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    id="3"
    text={text('Text', 'Text')}
    onClose={handleClose}
  />
);

export const WithLink = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    href="https://www.userinterviews.com/"
    id="3"
    text={text('Text', 'Visit our site')}
  />
);
