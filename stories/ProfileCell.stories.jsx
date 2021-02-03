import React from 'react';
import {
 withKnobs, text, number, boolean,
} from '@storybook/addon-knobs';

import ProfileCell from 'src/ProfileCell';

export default {
  title: 'Design System/Profile Cell',
  component: ProfileCell,
  decorators: [withKnobs],
};

export const Small = () => (
  <ProfileCell
    colorId={number('Color ID', null)}
    showAlert={boolean('Show Alert', false)}
    subtitle={text('Subtitle Text', `riley@userinterviews.com`)}
    user={userNoImage}
    visible
  />
);

export const Large = () => (
  <ProfileCell
    colorId={number('Color ID', null)}
    large
    showAlert={boolean('Show Alert', false)}
    subtitle={largeSubtitle}
    user={userNoImage}
    visible
  />
);

export const WithImage = () => (
  <ProfileCell
    colorId={number('Color ID', null)}
    large
    showAlert={boolean('Show Alert', false)}
    subtitle={largeSubtitle}
    user={userWithImage}
    visible
  />
);

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
