import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Pill.scss';

const Pill = ({
  color,
  size,
  squared,
  text,
}) => (
  <div
    className={
      classNames(
        'Pill',
        { 'Pill--squared': squared },
        { [`Pill--${color}`]: !!color },
        { [`Pill--${size}`]: !!size },
      )
    }
  >
    {text}
  </div>
);

Pill.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  squared: PropTypes.bool,
  text: PropTypes.node.isRequired,
};

Pill.defaultProps = {
  color: undefined,
  size: undefined,
  squared: false,
};

export default Pill;
