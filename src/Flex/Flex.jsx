import React from 'react';
import PropTypes from 'prop-types';

import { FlexWrapper } from './FlexWrapper.styles';

const Flex = ({ className, children, ...props }) => (
  <FlexWrapper className={className} {...props}>
    {children}
  </FlexWrapper>
);

Flex.propTypes = {
  alignItems: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'baseline',
    'initial',
    'inherit',
  ]),
  alignSelf: PropTypes.oneOf([
    'stretch',
    'center',
    'start',
    'end',
  ]),
  className: PropTypes.string,
  /**
    If `true`, `display: flex;` otherwise `display: block;`
  */
  container: PropTypes.bool,
  direction: PropTypes.oneOf(['column', 'row']),
  flex: PropTypes.string,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'reverse']),
  /**
    rem or px
  */
  height: PropTypes.string,
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
    'center',
    'initial',
    'inherit',
  ]),
  justifySelf: PropTypes.oneOf([
    'stretch',
    'center',
    'start',
    'end',
  ]),
  /**
    rem or px
  */
  maxHeight: PropTypes.string,
  /**
    rem or px
  */
  maxWidth: PropTypes.string,
  /**
    rem or px
  */
  width: PropTypes.string,
};

Flex.defaultProps = {
  alignItems: undefined,
  alignSelf: undefined,
  className: undefined,
  container: undefined,
  direction: undefined,
  flex: undefined,
  flexBasis: undefined,
  flexGrow: undefined,
  flexShrink: undefined,
  flexWrap: undefined,
  height: undefined,
  justifyContent: undefined,
  justifySelf: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
  width: undefined,
};

export default Flex;
