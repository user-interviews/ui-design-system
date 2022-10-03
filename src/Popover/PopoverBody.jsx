import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Popover as RBPopover } from 'react-bootstrap';

import './PopoverBody.scss';

const PopoverBody = ({
  children,
  className,
  ...props
}) => (
  <RBPopover.Body
    className={classNames(className, 'PopoverBody')}
    {...props}
  >
    { children }
  </RBPopover.Body>
  );

PopoverBody.propTypes = {
  className: PropTypes.string,
};

PopoverBody.defaultProps = {
  className: undefined,
};

export default PopoverBody;
