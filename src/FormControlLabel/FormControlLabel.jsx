import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import 'scss/forms/form_control_label.scss';

const FormControlLabel = React.forwardRef(({
  bordered,
  checked,
  className,
  Control,
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
          'FormControlLabel--active': bordered && checked,
        },
      )}
    htmlFor={id}
  >
    <Control checked={checked} className="FormControlLabel__control" id={id} ref={ref} {...controlProps} />
    {text}
  </label>
  ));

FormControlLabel.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  Control: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

FormControlLabel.defaultProps = {
  bordered: false,
  checked: undefined,
  className: undefined,
};

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;
