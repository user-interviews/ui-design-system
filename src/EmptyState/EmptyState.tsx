import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { Heading, HeadingSize } from '../Heading';
import { Text } from '../Text';

import './EmptyState.scss';

export interface EmptyStateProps {
  className?: string;
  fullWidth?: boolean;
  image?: string;
  marginTop?: 'sm' | 'md' | 'lg' | 'none';
  primaryAction?: ReactNode;
  subtitle?: string | ReactNode;
  title?: ReactNode;
}

function EmptyState({
  className,
  fullWidth = false,
  image,
  marginTop = 'sm',
  primaryAction,
  subtitle,
  title,
}: EmptyStateProps) {
  return (
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
        {image && (
        <div className="EmptyState__image">
          <img alt="" src={image} />
        </div>
      )}
        {title && (
        <Heading
          className="EmptyState__title"
          level={4}
          size={HeadingSize.SMALL}
          textAlign="center"
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
}

export default EmptyState;
