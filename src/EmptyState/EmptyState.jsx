import React from 'react';

import classNames from 'classnames';
import propTypes from 'prop-types';

import { Heading } from 'src/Heading';
import { Text } from 'src/Text';

import './EmptyState.scss';

export const EmptyStateMarginTopSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  NONE: 'none',
};

const EmptyState = ({
  className,
  fullWidth,
  marginTop,
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
        <>
          { typeof title === 'string' ? (
            <Heading className="EmptyState__title" level={4} size="lg" textAlign="center">{title}</Heading>
          ) : (
            <>{title}</>
          )}
        </>
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

EmptyState.propTypes = {
  className: propTypes.string,
  /**
    Sets the content area to full width.
  */
  fullWidth: propTypes.bool,
  /**
    Sets a predefined margin-top depending on spacial context.
  */
  marginTop: propTypes.oneOf(Object.values(EmptyStateMarginTopSizes)),
  /**
    Accepts a React node, in most cases a Button component.
  */
  primaryAction: propTypes.node,
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.node]),
  title: propTypes.oneOfType([propTypes.string, propTypes.node]),
};

EmptyState.defaultProps = {
  className: undefined,
  fullWidth: false,
  marginTop: EmptyStateMarginTopSizes.SMALL,
  primaryAction: undefined,
  subtitle: undefined,
  title: undefined,
};

export default EmptyState;
