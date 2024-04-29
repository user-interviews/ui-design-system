import React from 'react';

import { LoadingSkeleton } from '../LoadingSkeleton';

import './ProfileCellSkeleton.scss';

type ProfileCellSkeletonProps = {
  maxWidth?: string;
};

const ProfileCellSkeleton = ({
  maxWidth = '100%',
  ...props
}: ProfileCellSkeletonProps) => (
  <div className="ProfileCellSkeleton" {...props}>
    <div className="ProfileCellSkeleton__avatar">
      <LoadingSkeleton circle height={44} width={44} />
    </div>
    <div className="ProfileCellSkeleton__info">
      <LoadingSkeleton count={2} width={maxWidth} />
    </div>
  </div>
);

export default ProfileCellSkeleton;
