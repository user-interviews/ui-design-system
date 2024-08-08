import React from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../Avatar';

import ProfileCellSkeleton from './ProfileCellSkeleton';

import './ProfileCell.scss';

type ProfileCellProps = {
  colorId?: string | number;
  isLoading?: boolean;
  large?: boolean;
  maxWidth?: string;
  showAlert?: boolean;
  subtitle?: React.ReactNode;
  trailingIcon?: IconDefinition;
  user: {
    facebookProfileUrl?: string;
    imageUrl?: string;
    initials: string;
    linkedinProfileUrl?: string
    name: string;
    profilePictureUrl?: string;
    profileUrl?: string,
    url?: string;
  };
};

function ProfileCell(props: ProfileCellProps) {
  const profileImage = props.user.imageUrl || props.user.profilePictureUrl;
  const contentStyle = {
    maxWidth: props.maxWidth ? props.maxWidth : 'none',
  };

  return props.isLoading ? (
    <ProfileCellSkeleton maxWidth={props.maxWidth || '100%'} />
  ) : (
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

export default ProfileCell;
