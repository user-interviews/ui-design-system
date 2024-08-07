import React from 'react';

import Avatar from '.';
import mdx from './Avatar.mdx';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Small() {
  return (
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
}

export function Large() {
  return (
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
}

export function WithAlert() {
  return (
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
}

export function WithImage() {
  return (
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
}
