import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { faSpinnerThird } from '../font_awesome/solid';

import './LoadingOverlay.scss';

type LoadingOverlayProps = {
  /** Modifier for vertically centering content with overflow handling. */
  contentCenterOverflow?: boolean;
  /** Aligns overlay content toward the top. */
  contentTop?: boolean;
  /** `data-testid` on the root (`LoadingOverlay` default). */
  dataTestid?: string;
  header?: string;
  /** Secondary line with `overlay--text` styling. */
  text?: string;
  /** Class on the `text` paragraph. */
  textClassName?: string;
  /** When false, root uses `display: none` instead of relying on CSS alone (`true` default). */
  visible?: boolean;
};

function LoadingOverlay({
  contentCenterOverflow = false,
  contentTop = false,
  dataTestid = 'LoadingOverlay',
  header,
  text,
  textClassName,
  visible = true,
}: LoadingOverlayProps) {
  // Only set style if this is not visible to let CSS handle how to display this
  const classes = classNames('overlay', {
    'overlay--text': !!text,
    'overlay--content-top': contentTop,
    'overlay--content-center-overflow': contentCenterOverflow,
  });

  return (
    <div
      className={classes}
      data-testid={dataTestid}
      style={visible ? {} : { display: 'none' }}
    >
      {header && <p className="overlay__header">{header}</p>}
      {text && <p className={textClassName}>{text}</p>}

      <FontAwesomeIcon className="fa-spinner" icon={faSpinnerThird} />
    </div>
  );
}

export default LoadingOverlay;
