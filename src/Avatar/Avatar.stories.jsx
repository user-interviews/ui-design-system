import React from 'react';
import {
 withKnobs, text, number, boolean,
} from '@storybook/addon-knobs';

import Avatar from 'src/Avatar';
import mdx from './Avatar.mdx';

export default {
  title: 'Design System/Avatar',
  component: Avatar,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const largeSubtitle = (
  <React.Fragment>
    <div>
      riley@userinterviews.com
    </div>
    <div>
      +1 888 888 8888
    </div>
    <div>
      (-5:00) America/New York
    </div>
  </React.Fragment>
);

const userNoImage = {
  initials: 'RR',
  name: 'Riley Researcher',
};

const userWithImage = {
  ...userNoImage,
  imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/013/564/doge.jpg',
};

export const Small = () => (
  <div>
    <Avatar
      initials="RR"
    />
    <Avatar
      colorId={1}
      initials="RR"
    />
    <Avatar
      colorId={2}
      initials="RR"
    />
    <Avatar
      colorId={3}
      initials="RR"
    />
    <Avatar
      colorId={4}
      initials="RR"
    />
    <Avatar
      colorId={5}
      initials="RR"
    />
    <Avatar
      colorId={6}
      initials="RR"
    />
  </div>
);

export const Large = () => (
  <div>
    <Avatar
      initials="RR"
      large
    />
    <Avatar
      colorId={1}
      initials="RR"
      large
    />
    <Avatar
      colorId={2}
      initials="RR"
      large
    />
    <Avatar
      colorId={3}
      initials="RR"
      large
    />
    <Avatar
      colorId={4}
      initials="RR"
      large
    />
    <Avatar
      colorId={5}
      initials="RR"
      large
    />
    <Avatar
      colorId={6}
      initials="RR"
      large
    />
  </div>
);

export const WithAlert = () => (
  <div>
    <Avatar
      large
      initials="RR"
      showAlert
    />
    <Avatar
      showAlert
      initials="RR"
    />
  </div>
);

export const WithImage = () => (
  <div>
    <Avatar
      image="https://avatars.dicebear.com/api/avataaars/1234.svg"
      large
    />
    <Avatar
      image="https://avatars.dicebear.com/api/avataaars/1234.svg"
    />
  </div>
);

