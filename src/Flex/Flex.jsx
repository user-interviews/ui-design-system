import React from 'react';
import PropTypes from 'prop-types';

import { FLEX_PROPS } from './Flex.types';
import { FlexWrapper } from './FlexWrapper.styles';

const Flex = ({ className, children, ...props }) => (
  <FlexWrapper className={className} {...props}>
    {children}
  </FlexWrapper>
);

Flex.propTypes = {
  alignItems: PropTypes.oneOf(Object.values(FLEX_PROPS.alignItems)),
  alignSelf: PropTypes.oneOf(Object.values(FLEX_PROPS.alignSelf)),
  className: PropTypes.string,
  /**
    If `true`, `display: flex;` otherwise `display: block;`
  */
  container: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.oneOf(Object.values(FLEX_PROPS.flexDirection)),
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexWrap: PropTypes.oneOf(Object.values(FLEX_PROPS.flexWrap)),
  /**
    rem or px
  */
  height: PropTypes.string,
  justifyContent: PropTypes.oneOf(Object.values(FLEX_PROPS.justifyContent)),
  justifySelf: PropTypes.oneOf(Object.values(FLEX_PROPS.justifySelf)),
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
  flex: undefined,
  flexBasis: undefined,
  flexDirection: undefined,
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