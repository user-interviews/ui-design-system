import React, { useState } from 'react';

import classNames from 'classnames';

import { uiModClassName } from '../Styles/classNames';

import './Avatar.scss';

type AvatarProps = {
  /** Sets `aria-hidden` on the root (default `false`). */
  ariaHidden?: boolean;
  /** When set, adds a `ui-mod` class derived from `id` for alternate circle colors. */
  colorId?: string | number;
  /** Image URL; on load error, shows `initials` instead. */
  image?: string;
  /** Initials shown when there is no `image` or the image fails to load. */
  initials: string;
  /** Larger circle and alert dot (`Avatar--large`; default `false`). */
  large?: boolean;
  /** `alt` text for the image when `image` is used (default `''`). */
  name?: string;
  /** Renders the red corner badge (default `false`). */
  showAlert?: boolean;
  /** Wraps the avatar content in a new-tab link when set. */
  url?: string;
};

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

  function wrapIfUrlPresent(content) {
    if (url) {
      return (
        <a href={url} rel="noopener noreferrer" target="_blank">
          {content}
        </a>
      );
    }
    return content;
  }

  const displayImage = image && !imageLoadFailed;
  const content = displayImage ? (
    <img alt={name} src={image} onError={onImageLoadError} />
  ) : (
    <span className="Avatar__circle__initials">{initials}</span>
  );

  return (
    <div
      aria-hidden={ariaHidden}
      className={classNames('Avatar', { 'Avatar--large': large })}
    >
      <div
        className={classNames([
          'Avatar__circle',
          { [uiModClassName(colorId)]: !!colorId },
        ])}
      >
        {wrapIfUrlPresent(content)}
      </div>
      {showAlert && <div className="Avatar__alert" />}
    </div>
  );
}

export default Avatar;
