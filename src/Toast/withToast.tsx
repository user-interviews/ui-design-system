import React from 'react';

import Toast from './Toast';
import useToast from './useToast';

type WithToastProps = {
  autoDismiss?: boolean;
  WrappedComponent: React.ComponentType<
    unknown & {
      setToastMessage: ReturnType<typeof useToast>['setMessage'],
    }
  >
};

const WithToast = ({
  WrappedComponent,
  autoDismiss,
  ...props
}: WithToastProps) => {
  const { messages, setMessage, dismissMessage } = useToast();

  return (
    <>
      <Toast
        autoDismiss={autoDismiss}
        messages={messages}
        onToastClosed={dismissMessage}
      />
      <WrappedComponent
        setToastMessage={setMessage}
        {...props}
      />
    </>
  );
};

WithToast.defaultProps = {
  autoDismiss: true,
};

export default function withToast(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: (...args: any[]) => React.JSX.Element,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hocProps?: any,
) {
  const wrappedComponent = (props) => (
    <WithToast WrappedComponent={WrappedComponent} {...hocProps} {...props} />
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrappedComponent.displayName = `${(WrappedComponent as any).displayName || WrappedComponent.name}WithToast`;
  return wrappedComponent;
}
