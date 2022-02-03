import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Step.scss';

const Step = ({
  className,
  circleText,
  text,
  circleBorderColor,
  circleTextColor,
  ...props
}) => {
  const getCircleBorderColorStyle = () => circleBorderColor && (
    { border: `1px solid ${circleBorderColor}` }
  );

  const getCircleTextColor = () => circleTextColor && (
    { color: circleTextColor }
  );

  return (
    <div
      className={classNames('Step', className, `Step--${circleText}`)}
      {...props}
    >
      <div className="Step__circle" style={getCircleBorderColorStyle()}>
        <span className="Step__circle__number" style={getCircleTextColor()}>
          {circleText}
        </span>
      </div>
      <span className="Step__text-container">
        <span className="Step__text-container__text">{text}</span>
      </span>
    </div>
  );
};

Step.propTypes = {
  circleBorderColor: PropTypes.string,
  circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  circleTextColor: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Step.defaultProps = {
  className: undefined,
  circleText: undefined,
  text: undefined,
  circleBorderColor: undefined,
  circleTextColor: undefined,
};

export default Step;
