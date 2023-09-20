import React, { ReactNode } from 'react';
import { FlexWrapper } from './FlexWrapper.styles';

export interface FlexProps {
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  alignSelf?: 'stretch' | 'center' | 'start' | 'end';
  className?: string;
  children?: ReactNode;
  container?: boolean;
  flex?: number | string;
  flexBasis?: string;
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'no-wrap' | 'wrap-reverse';
  height?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'initial' | 'inherit';
  justifySelf?: 'stretch' | 'center' | 'start' | 'end';
  maxHeight?: string;
  maxWidth?: string;
  width?: string;
}

const Flex = ({
  alignItems,
  alignSelf,
  className,
  children,
  container,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
  justifyContent,
  justifySelf,
  maxHeight,
  maxWidth,
  width,
  ...props } : FlexProps) => (
  <FlexWrapper
    alignItems={alignItems}
    alignSelf={alignSelf}
    className={className}
    container={container}
    flex={flex}
    flexBasis={flexBasis}
    flexDirection={flexDirection}
    flexGrow={flexGrow}
    flexShrink={flexShrink}
    flexWrap={flexWrap}
    height={height}
    justifyContent={justifyContent}
    justifySelf={justifySelf}
    maxHeight={maxHeight}
    maxWidth={maxWidth}
    width={width}
    {...props}
  >
    {children}
  </FlexWrapper>
);

export default Flex;
