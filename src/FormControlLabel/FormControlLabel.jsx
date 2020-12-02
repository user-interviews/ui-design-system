import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import 'scss/forms/form_control_label.scss';

export default function FormControlLabel({
  bordered,
  checked,
  className,
  Control,
  id,
  text,
  ...controlProps
}) {
  return (
    <label
      className={classnames(
        'FormControlLabel',
        className,
        {
          'FormControlLabel--bordered': bordered,
          'FormControlLabel--active': bordered && checked,
        },
      )}
      htmlFor={id}
    >
      <Control checked={checked} className="FormControlLabel__control" id={id} {...controlProps} />
      {text}
    </label>
  );
}

FormControlLabel.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  Control: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

FormControlLabel.defaultProps = {
  bordered: false,
  checked: undefined,
  className: undefined,
};
