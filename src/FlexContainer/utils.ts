import { type FlexContainerProps } from './FlexContainer';
import styles from './FlexContainer.module.css';

export function computeBreakpointClassNames(
  props: Omit<FlexContainerProps, 'children' | 'className'>,
  bp?: 'xs' | 'sm' | 'md' | 'lg'| 'xl' | 'xxl',
): string[] {
  if (bp && bp in props) {
    const attributes = props[bp];
    return [
      styles[`${bp}_alignItems_${attributes?.alignItems}`],
      styles[`${bp}_flexDirection_${attributes?.flexDirection}`],
      styles[`${bp}_flexWrap_${attributes?.flexWrap}`],
      styles[`${bp}_justifyContent_${attributes?.justifyContent}`],
      styles[`${bp}_gap_${attributes?.gap}`],
      styles[`${bp}_width_${attributes?.width}`],
    ].filter(Boolean);
  }

  return [
    styles[`alignItems_${props.alignItems}`],
    styles[`flexDirection_${props.flexDirection}`],
    styles[`flexWrap_${props.flexWrap}`],
    styles[`justifyContent_${props.justifyContent}`],
    styles[`gap_${props.gap}`],
    styles[`width_${props.width}`],
  ];
}
