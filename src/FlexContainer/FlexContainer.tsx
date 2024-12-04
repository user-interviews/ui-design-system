import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import { computeBreakpointClassNames } from './utils';

import * as styles from './FlexContainer.module.css';

type FlexProps = {
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  flexWrap?:
    'wrap' |
    'no-wrap' |
    'wrap-reverse';
  justifyContent?:
    'flex-start' |
    'flex-end' |
    'space-between' |
    'space-around' |
    'space-evenly' |
    'center' |
    'initial' |
    'inherit';
  /**
    Sets the gap (gutters) between the flexbox's items with Synth spacing vars
  */
  gap?: 1 | 2 | 3 | 4 | 5;
  /**
    Sets the width of the FlexContainer. These variants are the same as Card and CardStack
  */
  width?: 'xs' | 'sm' | 'md' | 'lg';
}

export type FlexContainerProps = FlexProps & {
  className?: string;
  children: ReactNode;
  xs?: FlexProps;
  sm?: FlexProps;
  md?: FlexProps;
  lg?: FlexProps;
  xl?: FlexProps;
  xxl?: FlexProps;
}

export function FlexContainer({
  children,
  className,
  ...props
}: FlexContainerProps) {
  return (
    <div
      className={classNames(
        className,
        styles.flexContainer,
        ...computeBreakpointClassNames(props),
        ...computeBreakpointClassNames(props, 'xs'),
        ...computeBreakpointClassNames(props, 'sm'),
        ...computeBreakpointClassNames(props, 'md'),
        ...computeBreakpointClassNames(props, 'lg'),
        ...computeBreakpointClassNames(props, 'xl'),
        ...computeBreakpointClassNames(props, 'xxl'),
      )}
    >
      {children}
    </div>
  );
}
