import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  select,
} from '@storybook/addon-knobs';
import {
 faClock, faGiftCard, faGlobe, faMicrophone, faUsers,
} from '@fortawesome/pro-solid-svg-icons';

import { Pill, Pills, PILL_COLORS } from 'src/Pill';
import mdx from './Pill.mdx';

export default {
  title: 'Components/Pill',
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
    >
      {text('Text', 'Text')}
    </Pill>
    <h4 style={{ marginBottom: '2rem', marginTop: '2rem' }}>Colors</h4>
    <Pill
      color={PILL_COLORS.BLUE}
    >
      blue
    </Pill>
    <Pill
      color={PILL_COLORS.ORANGE}
    >
      orange
    </Pill>
    <Pill
      color={PILL_COLORS.YELLOW}
    >
      yellow
    </Pill>
    <Pill
      color={PILL_COLORS.RED}
    >
      red
    </Pill>
    <Pill
      color={PILL_COLORS.GREEN}
    >
      green
    </Pill>
    <Pill
      color={PILL_COLORS.GRAY}
    >
      gray
    </Pill>
    <Pill
      color={PILL_COLORS.SILVER}
    >
      silver
    </Pill>
  </div>
);

export const WithContainer = () => (
  <Pills>
    <Pill
      color={PILL_COLORS.GRAY}
      icon={faMicrophone}
    >
      1-on-1 Interview
    </Pill>
    <Pill
      color={PILL_COLORS.GRAY}
      icon={faGlobe}
    >
      Online
    </Pill>
    <Pill
      color={PILL_COLORS.GRAY}
      icon={faGiftCard}
    >
      $120 choice of dozens of digital gift cards
    </Pill>
    <Pill
      color={PILL_COLORS.GRAY}
      icon={faClock}
    >
      1 hour
    </Pill>
  </Pills>
);

export const WithLeadingIcon = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    icon={faUsers}
    id="2"
  >
    {text('Text', 'Text')}
  </Pill>
);

export const WithClose = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    id="3"
    onClose={handleClose}
  >
    {text('Text', 'Text')}
  </Pill>
);

export const WithLink = () => (
  <Pill
    color={select('Color', Object.values(PILL_COLORS), PILL_COLORS.BLUE)}
    id="3"
  >
    <a href="https://www.userinterviews.com/" rel="noreferrer" target="_blank">{text('Link text', 'Visit our site')}</a>
  </Pill>
);
