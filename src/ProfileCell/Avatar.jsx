import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Avatar.scss';

function Avatar(props) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  function onImageLoadError() {
    setImageLoadFailed(true);
  }

  function displayImage() {
    return props.image && !imageLoadFailed;
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

  const content = displayImage() ? (
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

Avatar.propTypes = {
  ariaHidden: PropTypes.bool,
  colorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  initials: PropTypes.string.isRequired,
  large: PropTypes.bool,
  name: PropTypes.string,
  showAlert: PropTypes.bool,
  url: PropTypes.string,
};

Avatar.defaultProps = {
  ariaHidden: false,
  colorId: undefined,
  image: undefined,
  large: false,
  name: '',
  showAlert: false,
  url: undefined,
};

const UI_MOD_OPERAND = 6;
const uiModClassName = (id) =>
  Number.isNaN(id) ? null : `ui-mod ui-mod--${window.parseInt(id) % UI_MOD_OPERAND}`;


export default Avatar;
