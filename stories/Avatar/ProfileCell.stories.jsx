import React from 'react';
import {
 withKnobs, text, number, boolean,
} from '@storybook/addon-knobs';

import ProfileCell from 'src/ProfileCell';
import mdx from './Avatar.mdx';

export default {
  title: 'Design System/Avatar',
  component: ProfileCell,
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
  <ProfileCell
    colorId={number('Color ID', undefined)}
    maxWidth={text('Max Text Width (e.g. 8rem)', '')}
    showAlert={boolean('Show Alert', false)}
    subtitle={text('Subtitle Text', `riley@userinterviews.com`)}
    user={userNoImage}
  />
);

export const Large = () => (
  <ProfileCell
    colorId={number('Color ID', undefined)}
    large
    maxWidth={text('Max Text Width (e.g. 8rem)', '')}
    showAlert={boolean('Show Alert', false)}
    subtitle={largeSubtitle}
    user={userNoImage}
  />
);

export const WithImage = () => (
  <ProfileCell
    large
    maxWidth={text('Max Text Width (e.g. 8rem)', '')}
    showAlert={boolean('Show Alert', false)}
    subtitle={largeSubtitle}
    user={userWithImage}
  />
);
