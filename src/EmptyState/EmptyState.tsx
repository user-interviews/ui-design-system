import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { Heading } from 'src/Heading';
import { Text } from 'src/Text';

import './EmptyState.scss';

export interface IEmptyStateProps {
  className?: string;
  fullWidth?: boolean;
  marginTop?: 'sm' | 'md' | 'lg' | 'none';
  primaryAction?: ReactNode;
  subtitle?: string | ReactNode;
  title?: ReactNode;
}

const EmptyState: React.FC<IEmptyStateProps> = ({
  className,
  fullWidth = false,
  marginTop = 'sm',
  primaryAction,
  subtitle,
  title,
}) => (
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
        <Heading className="EmptyState__title" level={4} size="lg" textAlign="center">{title}</Heading>
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
