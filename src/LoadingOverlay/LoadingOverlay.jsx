import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';

import './LoadingOverlay.scss';

const LoadingOverlay = (props) => {
  // Only set style if this is not visible to let CSS handle how to display this
  const classes = classNames(
    'overlay',
    {
      'overlay--text': !!props.text,
      'overlay--content-top': props.contentTop,
      'overlay--content-center-overflow': props.contentCenterOverflow,
    },
  );

  return (
    <div
      className={classes}
      data-testid={props.dataTestid}
      style={props.visible ? {} : { display: 'none' }}
    >
      { props.header && (
        <p className="overlay__header">
          {props.header}
        </p>
      )}
      { props.text && <p className={props.textClassName}>{props.text}</p> }

      <FontAwesomeIcon className="fa-spinner" icon={faSpinnerThird} />
    </div>
  );
};

LoadingOverlay.propTypes = {
  contentCenterOverflow: PropTypes.bool,
  contentTop: PropTypes.bool,
  dataTestid: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  textClassName: PropTypes.string,
  visible: PropTypes.bool,
};

LoadingOverlay.defaultProps = {
  contentCenterOverflow: false,
  contentTop: false,
  dataTestid: 'LoadingOverlay',
  header: undefined,
  text: undefined,
  textClassName: undefined,
  visible: true,
};

export default LoadingOverlay;
