import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import 'scss/forms/form_control_label.scss';

const FormControlLabel = React.forwardRef(({
  bordered,
  checked,
  children,
  className,
  Control,
  disabled,
  helperText,
  id,
  text,
  ...controlProps
}, ref) => (
  <label
    className={classnames(
      'FormControlLabel',
      className,
      {
        'FormControlLabel--bordered': bordered,
        'FormControlLabel--active': checked,
        'FormControlLabel--with-children': !!children,
        'FormControlLabel--disabled': bordered && disabled,
      },
    )}
    htmlFor={id}
  >
    <span className="FormControlLabel__label">
      <Control
        checked={checked}
        className="FormControlLabel__control"
        disabled={disabled}
        id={id}
        ref={ref}
        {...controlProps}
      />
      {text}
      { helperText && <span className="FormControlLabel__helper-text">&nbsp;({helperText})</span> }
    </span>
    {children && (
      <span className="FormControlLabel__children">
        {children}
      </span>
    )}
  </label>
));

FormControlLabel.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  Control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
};

FormControlLabel.defaultProps = {
  bordered: undefined,
  checked: undefined,
  className: undefined,
  disabled: undefined,
  helperText: undefined,
};

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;
