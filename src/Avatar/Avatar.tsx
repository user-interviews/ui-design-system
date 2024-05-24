import React, { useState } from 'react';
import classNames from 'classnames';

import { uiModClassName } from '../Styles/classNames';

import './Avatar.scss';

type AvatarProps = {
  ariaHidden?: boolean;
  colorId?: string | number;
  image?: string;
  initials: string;
  large?: boolean;
  name?: string;
  showAlert?: boolean;
  url?: string;
};

function Avatar({
  ariaHidden,
  colorId,
  image,
  initials,
  large,
  name = '',
  showAlert,
  url,
}: AvatarProps) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  function onImageLoadError() {
    setImageLoadFailed(true);
  }

  function wrapIfUrlPresent(content) {
    if (url) {
      return (
        <a
          href={url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }
    return content;
  }

  const displayImage = image && !imageLoadFailed;
  const content = displayImage ? (
    <img
      alt={name}
      src={image}
      onError={onImageLoadError}
    />
  ) : (
    <span className="Avatar__circle__initials">
      {initials}
    </span>
  );

  return (
    <div
      aria-hidden={ariaHidden}
      className={classNames(
        'Avatar',
        { 'Avatar--large': large },
      )}
    >
      <div
        className={classNames([
          'Avatar__circle',
          { [uiModClassName(colorId)]: !!colorId },
        ])}
      >
        {wrapIfUrlPresent(content)}
      </div>
      {showAlert && (
        <div className="Avatar__alert" />
      )}
    </div>
  );
}

Avatar.defaultProps = {
  ariaHidden: false,
  colorId: undefined,
  image: undefined,
  large: false,
  name: '',
  showAlert: false,
  url: undefined,
};

export default Avatar;
