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

function Avatar(props: AvatarProps) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  function onImageLoadError() {
    setImageLoadFailed(true);
  }

  function wrapIfUrlPresent(content) {
    if (props.url) {
      return (
        <a
          href={props.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }
    return content;
  }

  const displayImage = props.image && !imageLoadFailed;
  const content = displayImage ? (
    <img
      alt={props.name}
      src={props.image}
      onError={onImageLoadError}
    />
  ) : (
    <span className="Avatar__circle__initials">
      {props.initials}
    </span>
  );

  return (
    <div
      aria-hidden={props.ariaHidden}
      className={classNames(
        'Avatar',
        { 'Avatar--large': props.large },
      )}
    >
      <div
        className={classNames([
          'Avatar__circle',
          { [uiModClassName(props.colorId)]: !!props.colorId },
        ])}
      >
        {wrapIfUrlPresent(content)}
      </div>
      {props.showAlert && (
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
