import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Pills.scss';

const Pills = ({
  children,
  className,
  ...props
}) => (
  <div
    className={classNames('Pills', className)}
    {...props}
  >
    {children}
  </div>
);

Pills.propTypes = {
  className: PropTypes.string,
};

Pills.defaultProps = {
  className: undefined,
};

export default Pills;
