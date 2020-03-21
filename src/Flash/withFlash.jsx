import React from 'react';
import PropTypes from 'prop-types';

import Flash from './Flash';
import useFlash from './useFlash';

export const withFlashPropTypes = {
  setFlashMessage: PropTypes.func,
};

export default function withFlash(WrappedComponent) {
  return (props) => {
    const { messages, setMessage, dismissMessage } = useFlash();

    return (
      <>
        <Flash
          messages={messages}
          onFlashClosed={dismissMessage}
        />
        <WrappedComponent
          setFlashMessage={setMessage}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...props}
        />
      </>
    );
  };
}
