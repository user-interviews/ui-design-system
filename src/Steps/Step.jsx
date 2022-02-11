import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Step.scss';

const Step = ({
  className,
  circleText,
  text,
  ...props
}) => (
  <div
    className={classNames('Step', className, `Step--${circleText}`)}
    {...props}
  >
    <div className="Step__circle">
      <span className="Step__circle__number">
        {circleText}
      </span>
    </div>
    <span className="Step__text-container">
      <span className="Step__text-container__text">{text}</span>
    </span>
  </div>
  );

Step.propTypes = {
  circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Step.defaultProps = {
  circleText: undefined,
  className: undefined,
  text: undefined,
};

export default Step;
