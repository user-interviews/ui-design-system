import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { Heading } from '../Heading';
import { Text } from '../Text';

import './EmptyState.scss';

export interface EmptyStateProps {
  className?: string;
  fullWidth?: boolean;
  marginTop?: 'sm' | 'md' | 'lg' | 'none';
  primaryAction?: ReactNode;
  subtitle?: string | ReactNode;
  title?: ReactNode;
}

const EmptyState = ({
  className,
  fullWidth = false,
  marginTop = 'sm',
  primaryAction,
  subtitle,
  title,
}: EmptyStateProps) => (
  <div className={classNames(
    className,
    'EmptyState',
    marginTop && `EmptyState--margin-top--${marginTop}`,
  )}
  >
    <div className={classNames(
      'EmptyState__content',
      fullWidth && 'EmptyState--full-width',
    )}
    >
      {title && (
        <Heading
          className="EmptyState__title"
          level={4}
          size="lg"
          textAlign="center"
          weight="bold"
        >
            {title}
        </Heading>
      )}

      {subtitle && (
        <Text className="EmptyState__subtitle" textAlign="center">{subtitle}</Text>
      )}

      {primaryAction && (
        <div className="EmptyState__actions">
          <div className="EmptyState__actions__primary-action">
            {primaryAction}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default EmptyState;
