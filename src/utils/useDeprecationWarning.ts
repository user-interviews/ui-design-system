import { useEffect } from 'react';

type useDeprecationWarningProps = {
  componentName: string,
  message?: string,
}

export function useDeprecationWarning({
  componentName,
  message = '',
} : useDeprecationWarningProps) {
  useEffect(() => {
    const warningMessage = `Warning: ${componentName} is deprecated and will be removed in a future release.${
      message ? ` ${message}` : ''}`;

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(warningMessage);
    }
  }, [componentName, message]);
}
