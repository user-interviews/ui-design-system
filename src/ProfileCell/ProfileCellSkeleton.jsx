import React from 'react';
import PropTypes from 'prop-types';

import { LoadingSkeleton } from 'src/LoadingSkeleton';

import './ProfileCellSkeleton.scss';

const ProfileCellSkeleton = ({ maxWidth, ...props }) => (
  <div className="ProfileCellSkeleton" {...props}>
    <div className="ProfileCellSkeleton__avatar">
      <LoadingSkeleton circle height={44} width={44} />
    </div>
    <div className="ProfileCellSkeleton__info">
      <LoadingSkeleton count={2} width={maxWidth} />
    </div>
  </div>
  );

ProfileCellSkeleton.propTypes = {
  maxWidth: PropTypes.string,
};

ProfileCellSkeleton.defaultProps = {
  maxWidth: '100%',
};

export default ProfileCellSkeleton;
