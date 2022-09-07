import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from 'src/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ProfileCell.scss';

function ProfileCell(props) {
  const profileImage = props.user.imageUrl || props.user.profilePictureUrl;
  const contentStyle = {
    maxWidth: props.maxWidth ? props.maxWidth : 'none',
  };

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
          image={profileImage}
          initials={props.user.initials}
          large={props.large}
          name={props.user.name}
          showAlert={props.showAlert}
        />
      </div>
      <div className="ProfileCell__content" style={contentStyle}>
        <div className="ProfileCell__content__name__container">
          <h5 className="ProfileCell__content__name">
            {props.user.name}
          </h5>
          {props.trailingIcon && (
            <FontAwesomeIcon className="ProfileCell__content__trailing_icon" icon={props.trailingIcon} />
          )}
        </div>
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
  maxWidth: PropTypes.string,
  showAlert: PropTypes.bool,
  subtitle: PropTypes.node,
  trailingIcon: PropTypes.object,
  user: ProfileUser.isRequired,
};

ProfileCell.defaultProps = {
  colorId: undefined,
  large: false,
  maxWidth: undefined,
  showAlert: false,
  subtitle: undefined,
  trailingIcon: undefined,
};

export default ProfileCell;
