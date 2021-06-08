import React from 'react';
import PropTypes from 'prop-types';

import { baseTheme } from '../Theming/theme';

import { StyledButton } from './Button.styles';

const Button = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.any,
  size: PropTypes.string,
  theme: PropTypes.object,
  variant: PropTypes.string,
  onClose: PropTypes.func,
};

Button.defaultProps = {
  icon: undefined,
  onClose: undefined,
  size: undefined,
  variant: 'primary',
  theme: baseTheme,
};

export default Button;
