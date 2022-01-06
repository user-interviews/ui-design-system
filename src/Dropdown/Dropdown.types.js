import PropTypes from 'prop-types';

const alignDirection = PropTypes.oneOf(['start', 'end']);

// PropType for 'align' prop can be reused for both Dropdown and DropdownMenu components
export const DROPDOWN_ALIGN_PROP_TYPE = PropTypes.oneOfType([
  alignDirection,
  PropTypes.shape({ sm: alignDirection }),
  PropTypes.shape({ md: alignDirection }),
  PropTypes.shape({ lg: alignDirection }),
  PropTypes.shape({ xl: alignDirection }),
  PropTypes.shape({ xxl: alignDirection }),
]);
