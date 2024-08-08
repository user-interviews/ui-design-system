import React from 'react';

import { OverlayTrigger as RBOverlayTrigger, OverlayTriggerProps as RBOverlayTriggerProps } from 'react-bootstrap';

export const OVERLAY_TRIGGER_PLACEMENT = [
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
] as const;

type OverlayTriggerProps = RBOverlayTriggerProps & {
  children?: RBOverlayTriggerProps['children'];
  /**
    * The initial visibility state of the Overlay.
    */
  defaultShow?: boolean;
  /**
    * A millisecond delay amount to show and hide the Overlay once triggered
    */
  delay?: number | {
    hide?: number;
    show?: number;
  };
  /**
   * An element or text to overlay next to the target.
   */
  overlay?: RBOverlayTriggerProps['overlay'],
  /**
   * The placement of the Overlay in relation to it's `target`.
   */
  placement?: typeof OVERLAY_TRIGGER_PLACEMENT[number];
  /**
  * The visibility of the Overlay. `show` is a _controlled_ prop so should be paired
  * with `onToggle` to avoid breaking user interactions.
  *
  * Manually toggling `show` does **not** wait for `delay` to change the visibility.
  */
  show?: boolean;
  /**
   * Specify which action or actions trigger Overlay visibility
   *
   * The `click` trigger ignores the configured `delay`.
   *
   * `{'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}`
   */
  trigger?: unknown | unknown[];
  /**
   * A callback that fires when the user triggers a change in tooltip visibility.
   *
   * `onToggle` is called with the desired next `show`, and generally should be passed
   * back to the `show` prop. `onToggle` fires _after_ the configured `delay`
   */
  onToggle?: (...args: unknown[]) => unknown;
};

export function OverlayTrigger({
  children,
  defaultShow,
  delay,
  onToggle,
  overlay,
  placement,
  show,
  trigger,
  ...props
}: OverlayTriggerProps) {
  return (
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
}
