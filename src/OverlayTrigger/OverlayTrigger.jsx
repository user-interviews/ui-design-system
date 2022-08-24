import React from 'react';
import PropTypes from 'prop-types';

import { OverlayTrigger as RBOverlayTrigger } from 'react-bootstrap';

const OverlayTrigger = ({
  children,
  defaultShow,
  delay,
  onToggle,
  overlay,
  placement,
  show,
  trigger,
  ...props
}) => (
  <RBOverlayTrigger
    defaultShow={defaultShow}
    delay={delay}
    overlay={overlay}
    placement={placement}
    show={show}
    trigger={trigger}
    onToggle={onToggle}
    {...props}
  >
    {children}
  </RBOverlayTrigger>
);

const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);

OverlayTrigger.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
    * The initial visibility state of the Overlay.
    */
  defaultShow: PropTypes.bool,
  /**
    * A millisecond delay amount to show and hide the Overlay once triggered
    */
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      hide: PropTypes.number,
      show: PropTypes.number,
    }),
  ]),
  /**
   * An element or text to overlay next to the target.
   */
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.element.isRequired]),
  /**
   * The placement of the Overlay in relation to it's `target`.
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
   /**
   * The visibility of the Overlay. `show` is a _controlled_ prop so should be paired
   * with `onToggle` to avoid breaking user interactions.
   *
   * Manually toggling `show` does **not** wait for `delay` to change the visibility.
   */
  show: PropTypes.bool,
  /**
   * Specify which action or actions trigger Overlay visibility
   *
   * The `click` trigger ignores the configured `delay`.
   *
   * `{'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}`
   */
  trigger: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),
  /**
   * A callback that fires when the user triggers a change in tooltip visibility.
   *
   * `onToggle` is called with the desired next `show`, and generally should be passed
   * back to the `show` prop. `onToggle` fires _after_ the configured `delay`
   */
  onToggle: PropTypes.func,
};

OverlayTrigger.defaultProps = {
  children: undefined,
  defaultShow: false,
  delay: undefined,
  overlay: undefined,
  placement: undefined,
  show: undefined,
  trigger: undefined,
  onToggle: undefined,
};

export default OverlayTrigger;
