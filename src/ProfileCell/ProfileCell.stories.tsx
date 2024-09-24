import React from 'react';
import { faShieldCheck } from 'src/font_awesome/solid';
import ProfileCell from '.';
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

export function Small() {
  return (
    <ProfileCell
      colorId={undefined}
      maxWidth=""
      showAlert={false}
      subtitle="riley@userinterviews.com"
      user={userNoImage}
    />
  );
}

export function Large() {
  return (
    <ProfileCell
      colorId={undefined}
      large
      maxWidth=""
      showAlert={false}
      subtitle={largeSubtitle}
      user={userNoImage}
    />
  );
}

export function WithImage() {
  return (
    <ProfileCell
      large
      maxWidth=""
      showAlert={false}
      subtitle={largeSubtitle}
      user={userWithImage}
    />
  );
}

export function WithTrailingIcon() {
  return (
    <ProfileCell
      colorId={undefined}
      maxWidth=""
      showAlert={false}
      subtitle="riley@userinterviews.com"
      trailingIcon={faShieldCheck}
      user={userWithImage}
    />
  );
}

export function Loading() {
  return (
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
}
