import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Pill.scss';

const Pill = ({ color, size, text }) => (
  <div
    className={
      classNames(
        'Pill',
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
  text: PropTypes.string.isRequired,
};

Pill.defaultProps = {
  color: undefined,
  size: undefined,
};

export default Pill;
