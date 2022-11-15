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
  direction: PropTypes.oneOf(Object.values(FLEX_PROPS.direction)),
  flex: PropTypes.string,
  flexBasis: PropTypes.string,
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  flexWrap: PropTypes.oneOf(Object.values(FLEX_PROPS.flexWrap)),
  /**
    row-gap column-gap (e.g. '10px 20px' => `gap: 10px 20px;`)
  */
  gap: PropTypes.string,
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
  direction: undefined,
  flex: undefined,
  flexBasis: undefined,
  flexGrow: undefined,
  flexShrink: undefined,
  flexWrap: undefined,
  gap: undefined,
  height: undefined,
  justifyContent: undefined,
  justifySelf: undefined,
  maxHeight: undefined,
  maxWidth: undefined,
  width: undefined,
};

export default Flex;
