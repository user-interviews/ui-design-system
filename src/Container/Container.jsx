import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Container.scss';

const Container = ({
  className,
  children,
  direction,
  flex,
  justifyContent,
  alignItems,
  spacing,
  ...props
}) => (
  <div
    className={classNames(
        'Container',
        className,
        {
          [`Container__flex`]: !!flex,
          [`Container__direction--${direction}`]: !!direction,
          [`Container__justifyContent--${justifyContent}`]: !!justifyContent,
          [`Container__alignItems--${alignItems}`]: !!alignItems,
          [`Container__spacing--${spacing}`]: !!spacing,
        },
      )}
    {...props}
  >
    {children}
  </div>
  );

export default Container;

Container.propTypes = {
  alignItems: PropTypes.string,
  className: PropTypes.string,
  direction: PropTypes.string,
  flex: PropTypes.bool,
  justifyContent: PropTypes.string,
  spacing: PropTypes.number,
};

Container.defaultProps = {
  alignItems: 'center',
  className: undefined,
  direction: 'row',
  flex: true,
  justifyContent: 'center',
  spacing: 8,
};
