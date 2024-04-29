import React from 'react';
import { faShieldCheck } from '@fortawesome/pro-solid-svg-icons';
import ProfileCell from 'src/ProfileCell';
import ProfileCellSkeleton from './ProfileCellSkeleton';
import mdx from './ProfileCell.mdx';

export default {
  title: 'Components/Profile Cell',
  component: ProfileCell,
  subcomponents: { ProfileCellSkeleton },
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
    colorId={undefined}
    maxWidth=""
    showAlert={false}
    subtitle="riley@userinterviews.com"
    user={userNoImage}
  />
);

export const Large = () => (
  <ProfileCell
    colorId={undefined}
    large
    maxWidth=""
    showAlert={false}
    subtitle={largeSubtitle}
    user={userNoImage}
  />
);

export const WithImage = () => (
  <ProfileCell
    large
    maxWidth=""
    showAlert={false}
    subtitle={largeSubtitle}
    user={userWithImage}
  />
);

export const WithTrailingIcon = () => (
  <ProfileCell
    colorId={undefined}
    maxWidth=""
    showAlert={false}
    subtitle="riley@userinterviews.com"
    trailingIcon={faShieldCheck}
    user={userWithImage}
  />
);

export const Loading = () => (
  <>
    <ProfileCell
      colorId={undefined}
      isLoading
      maxWidth=""
      showAlert={false}
      subtitle="riley@userinterviews.com"
      user={userNoImage}
    />
    <br />
    <ProfileCellSkeleton maxWidth="" />
  </>
);
