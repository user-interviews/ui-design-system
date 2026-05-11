import React, { type ReactNode } from 'react';

import classNames from 'classnames';

import { Heading, HeadingSize } from '../Heading';
import { Text } from '../Text';

import './EmptyState.scss';

export interface EmptyStateProps {
  className?: string;
  /** Lets inner content span wider than the default `max-width` (`false` default). */
  fullWidth?: boolean;
  /** Illustration URL; `<img>` uses `alt=""`. */
  image?: string;
  /** Top spacing preset on the outer wrapper (`sm` default). */
  marginTop?: 'sm' | 'md' | 'lg' | 'none';
  /** CTA area below the subtitle (e.g. a `Button`). */
  primaryAction?: ReactNode;
  /** Centered `Text` body under the title. */
  subtitle?: string | ReactNode;
  /** Centered `Heading` (level 4, small) when provided. */
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
    <div
      className={classNames(
        className,
        'EmptyState',
        marginTop && `EmptyState--margin-top--${marginTop}`,
      )}
    >
      <div
        className={classNames(
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
          <Text className="EmptyState__subtitle" textAlign="center">
            {subtitle}
          </Text>
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
