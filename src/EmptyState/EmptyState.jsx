import React from 'react';

import classNames from 'classnames';
import propTypes from 'prop-types';

import { Heading } from 'src/Heading';
import { Text } from 'src/Text';

import './EmptyState.scss';

const EmptyState = ({
  className,
  fullWidth,
  imageSrc,
  primaryAction,
  secondaryAction,
  subtitle,
  title,
}) => (
  <div className={classNames(className, 'EmptyState')}>
    <div className={classNames(
      'EmptyState__content',
      fullWidth && 'EmptyState--full-width',
    )}
    >
      {imageSrc && (
        <div className="EmptyState__image">
          <img alt="" aria-hidden="true" className="EmptyState__image" role="presentation" src={imageSrc} />
        </div>
      )}

      {title && (
        <Heading className="EmptyState__title" level={4} textAlign="center">{title}</Heading>
      )}

      {subtitle && (
        <Text className="EmptyState__subtitle" textAlign="center">{subtitle}</Text>
      )}

      {primaryAction && (
        <div className="EmptyState__actions">

          <div className="EmptyState__actions__secondary-action">
            {secondaryAction}
          </div>

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
  imageSrc: propTypes.string,
  /**
    Accepts a React node, in most cases a Button component.
  */
  primaryAction: propTypes.node,
  /**
    Accepts a React node, in most cases a Button component.
  */
  secondaryAction: propTypes.node,
  subtitle: propTypes.string,
  title: propTypes.string,
};

EmptyState.defaultProps = {
  className: undefined,
  fullWidth: false,
  imageSrc: undefined,
  primaryAction: undefined,
  secondaryAction: undefined,
  subtitle: undefined,
  title: undefined,
};

export default EmptyState;
