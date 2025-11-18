import React from 'react';
import { action } from 'storybook/actions';
import {
 faClock, faGiftCard, faGlobe, faMicrophone, faUsers,
} from '../font_awesome/solid';

import { Pill, Pills, PILL_COLORS } from '.';
import mdx from './Pill.mdx';

export default {
  title: 'Components/Pill',
  component: Pill,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const handleClose = (id) => {
  action('handle close')(id);
};

export function Default() {
  return (
    <div>
      <h4 style={{ marginBottom: '32px' }}>Test Pill</h4>
      <Pill
        color={PILL_COLORS.BLUE}
        id="1"
      >
        Text
      </Pill>
      <h4 style={{ marginBottom: '32px', marginTop: '32px' }}>Colors</h4>
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
}

export function Statuses() {
  return (
    <Pills>
      <Pill
        color={PILL_COLORS.BLUE}
      >
        Informational
      </Pill>
      <Pill
        color={PILL_COLORS.SILVER}
      >
        Informational
      </Pill>
      <Pill
        color={PILL_COLORS.ORANGE}
      >
        Partially complete
      </Pill>
      <Pill
        color={PILL_COLORS.YELLOW}
      >
        Incomplete
      </Pill>
      <Pill
        color={PILL_COLORS.RED}
      >
        Attention
      </Pill>
      <Pill
        color={PILL_COLORS.GREEN}
      >
        Active
      </Pill>
      <Pill
        color={PILL_COLORS.GRAY}
      >
        Inactive
      </Pill>
    </Pills>
  );
}

export function WithContainer() {
  return (
    <Pills>
      <Pill
        color={PILL_COLORS.SILVER}
        icon={faMicrophone}
      >
        1-on-1 Interview
      </Pill>
      <Pill
        color={PILL_COLORS.SILVER}
        icon={faGlobe}
      >
        Online
      </Pill>
      <Pill
        color={PILL_COLORS.SILVER}
        icon={faGiftCard}
      >
        $120 choice of dozens of digital gift cards
      </Pill>
      <Pill
        color={PILL_COLORS.SILVER}
        icon={faClock}
      >
        1 hour
      </Pill>
    </Pills>
  );
}

export function WithLeadingIcon() {
  return (
    <Pill
      color={PILL_COLORS.BLUE}
      icon={faUsers}
      id="2"
    >
      Text
    </Pill>
  );
}

export function WithClose() {
  return (
    <Pill
      color={PILL_COLORS.BLUE}
      id="3"
      onClose={handleClose}
    >
      Text
    </Pill>
  );
}

export function WithLink() {
  return (
    <Pill
      color={PILL_COLORS.BLUE}
      id="3"
    >
      <a href="https://www.userinterviews.com/" rel="noreferrer" target="_blank">Visit our site</a>
    </Pill>
  );
}
