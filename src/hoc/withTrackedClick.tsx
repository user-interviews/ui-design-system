import React from 'react';
import track from 'react-tracking';

type TrackedComponentProps = {
  event: string;
  eventData?: object;
  tracking: {
    getTrackingData?: (...args: unknown[]) => unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackEvent: (arg0: {[key: string]: any}) => unknown;
  };
  onClick?: (...args: unknown[]) => unknown;
};

export default function withTrackedClick(Target) {
  function TrackedComponent(props: TrackedComponentProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (TrackedComponent as any).displayName = `${Target.displayName || Target.name}WithTrackedClick`;

    const { eventData, event, ...rest } = props;

    const handleClick = (clickEvent) => {
      props.tracking.trackEvent({ ...eventData, event });

      if (props.onClick) {
        props.onClick(clickEvent);
      }
    };

    return <Target {...rest} onClick={handleClick} />;
  }

  TrackedComponent.defaultProps = {
    eventData: {},
    onClick: undefined,
  };

  return track()(TrackedComponent);
}
