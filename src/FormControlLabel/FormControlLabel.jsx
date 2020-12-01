import React, { Fragment } from 'react';
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
  // If the control has additional children, add another wrapping div to support
  // horizontal and vertical flex alignment
  const ContainerElement = children ? 'div' : Fragment;
  return (
    <label
      className={classnames(
        'FormControlLabel',
        className,
        {
          'FormControlLabel--bordered': bordered,
          'FormControlLabel--active': bordered && checked,
          'FormControlLabel--with-children': children,
        },
      )}
      htmlFor={id}
    >
      <ContainerElement>
        <Control checked={checked} className="FormControlLabel__control" id={id} {...controlProps} />
        {text}
      </ContainerElement>
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
