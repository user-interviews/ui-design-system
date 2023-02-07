import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import { Button as RBButton } from 'react-bootstrap';

import './Button.scss';

const Button = forwardRef(({
  children,
  className,
  isLoading,
  leadingIcon,
  loadingText,
  trailingIcon,
  ...props
}, ref) => (
  <RBButton
    className={classNames('Button', className)}
    disabled={isLoading}
    ref={ref}
    {...props}
  >
    { !isLoading ? (
      <>
        { leadingIcon && (<FontAwesomeIcon className="icon-left" icon={leadingIcon} />)}
        { children }
        { trailingIcon && (<FontAwesomeIcon className="icon-right" icon={trailingIcon} />)}
      </>
    ) : (
      <>
        <FontAwesomeIcon className="icon-left btn-loading-spin" icon={faSpinnerThird} />
        {loadingText}
      </>
    )}
  </RBButton>
  ));

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  leadingIcon: PropTypes.object,
  loadingText: PropTypes.string,
  trailingIcon: PropTypes.object,
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  isLoading: undefined,
  leadingIcon: undefined,
  loadingText: 'Loading...',
  trailingIcon: undefined,
};
export default Button;
