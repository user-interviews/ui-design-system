import React from 'react';
import PropTypes from 'prop-types';
import track from 'react-tracking';

export default function withTrackedClick(Target) {
  const TrackedComponent = (props) => {
    TrackedComponent.displayName = `${Target.displayName || Target.name}WithTrackedClick`;

    const { eventData, event, ...rest } = props;

    const handleClick = (clickEvent) => {
      props.tracking.trackEvent({ ...eventData, event });

      if (props.onClick) {
        props.onClick(clickEvent);
      }
    };

    return <Target {...rest} onClick={handleClick} />;
  };

  TrackedComponent.propTypes = {
    event: PropTypes.string.isRequired,
    eventData: PropTypes.object,
    tracking: PropTypes.shape({
      getTrackingData: PropTypes.func,
      trackEvent: PropTypes.func,
    }).isRequired,
    onClick: PropTypes.func,
  };

  TrackedComponent.defaultProps = {
    eventData: {},
    onClick: undefined,
  };

  return track()(TrackedComponent);
}
