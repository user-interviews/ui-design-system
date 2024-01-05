import React, { useState } from 'react';
import classNames from 'classnames';

import './Avatar.scss';

const uiModClassName = (id: string | number) => {
  const UI_MOD_OPERAND = 6;

  if (Number.isNaN(id)) return null;
  const mod = (typeof id === 'string' ? parseInt(id) : id) % UI_MOD_OPERAND;

  return `ui-mod ui-mod--${mod}`;
};

type AvatarProps = {
  ariaHidden?: boolean;
  colorId?: string | number;
  image?: string;
  initials: string;
  large?: boolean;
  name?: string;
  showAlert?: boolean;
  url?: string;
}

function Avatar({
  ariaHidden = false,
  colorId,
  image,
  initials,
  large = false,
  name = '',
  showAlert = false,
  url,
}: AvatarProps) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  function onImageLoadError() {
    setImageLoadFailed(true);
  }

  function wrapIfUrlPresent(content: JSX.Element) {
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
          colorId ? uiModClassName(colorId) : undefined,
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

export default Avatar;
