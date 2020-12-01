import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './FormControlLabel.scss';

export default function FormControlLabel({
  bordered,
  checked,
  children,
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
      <div className="FormControlLabel__label">
        <Control checked={checked} className="FormControlLabel__control" id={id} {...controlProps} />
        {text}
      </div>
      {children && (
        <div className="FormControlLabel__children">
          {children}
        </div>
      )}
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
