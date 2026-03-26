import React from 'react';
import track from 'react-tracking';

type TrackedComponentProps = {
  event: string;
  eventData?: object;
  tracking: {
    getTrackingData?: (...args: unknown[]) => unknown;
    // oxlint-disable-next-line typescript/no-explicit-any
    trackEvent: (arg0: { [key: string]: any }) => unknown;
  };
  onClick?: (...args: unknown[]) => unknown;
};

export default function withTrackedClick(Target) {
  function TrackedComponent({
    eventData = {},
    ...props
  }: TrackedComponentProps) {
    // oxlint-disable-next-line typescript/no-explicit-any
    (TrackedComponent as any).displayName =
      `${Target.displayName || Target.name}WithTrackedClick`;

    const { event, ...rest } = props;

    const handleClick = (clickEvent) => {
      props.tracking.trackEvent({ ...eventData, event });

      if (props.onClick) {
        props.onClick(clickEvent);
      }
    };

    return <Target {...rest} onClick={handleClick} />;
  }

  return track()(TrackedComponent);
}
