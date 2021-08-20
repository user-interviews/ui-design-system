import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

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
      initials="RR"
      large
      showAlert
    />
    <Avatar
      initials="RR"
      showAlert
    />
  </div>
);

export const WithImage = () => (
  <div>
    <Avatar
      image="https://avatars.dicebear.com/api/avataaars/1234.svg"
      initials="RR"
      large
    />
    <Avatar
      image="https://avatars.dicebear.com/api/avataaars/1234.svg"
      initials="RR"
    />
  </div>
);
