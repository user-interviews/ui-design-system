import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';

import './LoadingOverlay.scss';

type LoadingOverlayProps = {
  contentCenterOverflow?: boolean;
  contentTop?: boolean;
  dataTestid?: string;
  header?: string;
  text?: string;
  textClassName?: string;
  visible?: boolean;
};

const LoadingOverlay = ({
  contentCenterOverflow,
  contentTop,
  dataTestid = 'LoadingOverlay',
  header,
  text,
  textClassName,
  visible = true,
}: LoadingOverlayProps) => {
  // Only set style if this is not visible to let CSS handle how to display this
  const classes = classNames(
    'overlay',
    {
      'overlay--text': !!text,
      'overlay--content-top': contentTop,
      'overlay--content-center-overflow': contentCenterOverflow,
    },
  );

  return (
    <div
      className={classes}
      data-testid={dataTestid}
      style={visible ? {} : { display: 'none' }}
    >
      { header && (
        <p className="overlay__header">
          {header}
        </p>
      )}
      { text && <p className={textClassName}>{text}</p> }

      <FontAwesomeIcon className="fa-spinner" icon={faSpinnerThird} />
    </div>
  );
};

export default LoadingOverlay;
