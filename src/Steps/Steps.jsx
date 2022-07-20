import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Steps.scss';

const Steps = ({ children, className, ...props }) => (
  <div className={classNames('Steps', className)} {...props}>
    {children}
  </div>
);

Steps.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Steps.defaultProps = {
  children: undefined,
  className: undefined,
};

export default Steps;
