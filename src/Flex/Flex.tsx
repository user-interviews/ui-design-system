import { ReactNode, ElementType, createElement } from 'react';
import classNames from 'classnames';

import { useDeprecationWarning } from 'src/utils';

import styles from './Flex.module.scss';

export interface FlexProps {
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  alignSelf?: 'stretch' | 'center' | 'start' | 'end';
  /**
    You can use a custom element for this component other than the default `div`
  */
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  /**
    If `true`, `display: flex;` otherwise `display: block;`
  */
  container?: boolean;
  flex?: number | string;
  flexBasis?: string;
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'no-wrap' | 'wrap-reverse';
  /**
    px
  */
  height?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'center' | 'initial' | 'inherit';
  justifySelf?: 'stretch' | 'center' | 'start' | 'end';
  /**
    px
  */
  maxHeight?: string;
  /**
    px
  */
  maxWidth?: string;
  /**
    px
  */
  width?: string;
}

function Flex({
  alignItems,
  alignSelf,
  as = 'div',
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
  ...props
}: FlexProps) {
  useDeprecationWarning({ componentName: 'Flex', message: 'Please use FlexContainer instead.' });

  // Defined flex properties as strings
  const flexClasses = [
    container ? styles[`flex-container`] : styles.container,
    alignItems && styles[`align-items-${alignItems}`],
    alignSelf && styles[`align-self-${alignSelf}`],
    flexDirection && styles[`flex-direction-${flexDirection}`],
    flexWrap && styles[`flex-wrap-${flexWrap}`],
    justifyContent && styles[`justify-content-${justifyContent}`],
    justifySelf && styles[`justify-self-${justifySelf}`],
  ].filter(Boolean).join(' ');

  // Variable flex properties defined by consumer
  const style = {
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
    height,
    maxHeight,
    maxWidth,
    width,
  };

  return createElement(
    as,
    {
      className: classNames('Flex', className, flexClasses),
      style,
      ...props,
    },
    children,
  );
}

export default Flex;
