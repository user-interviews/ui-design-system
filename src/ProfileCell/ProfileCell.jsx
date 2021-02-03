import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from './Avatar';

import './ProfileCell.scss';

function ProfileCell(props) {
  function getProfileImage() {
    return props.user.imageUrl || props.user.profilePictureUrl;
  }

  return (
    <div
      className={classNames(
        'ProfileCell',
        { 'ProfileCell--large': props.large },
      )}
    >
      <div className="ProfileCell__image">
        <Avatar
          colorId={props.colorId}
          image={getProfileImage()}
          initials={props.user.initials}
          large={props.large}
          name={props.user.name}
          showAlert={props.showAlert}
        />
      </div>
      <div className="ProfileCell__content">
        <h5 className="ProfileCell__content__name">
          {props.user.name}
        </h5>
        <div className="ProfileCell__content__subtitle">
          {props.subtitle || ' '}
        </div>
      </div>
    </div>
  );
}

/*
I don't think this is a perfect prop type, but I imagine we'll need something
that can be passed a bunch of varying shapes to from the backend, so its just
a first stab at that - Jeff
 */
const ProfileUser = PropTypes.shape({
  facebookProfileUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  initials: PropTypes.string.isRequired,
  linkedinProfileUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string,
  profileUrl: PropTypes.string,
  url: PropTypes.string,
});

ProfileCell.propTypes = {
  colorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  large: PropTypes.bool,
  showAlert: PropTypes.bool,
  subtitle: PropTypes.node,
  user: ProfileUser.isRequired,
};

ProfileCell.defaultProps = {
  colorId: undefined,
  large: false,
  showAlert: false,
  subtitle: undefined,
};

export default ProfileCell;
