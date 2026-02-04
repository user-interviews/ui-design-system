import React from 'react';

import { FlexContainer } from '../FlexContainer';

import * as styles from './Logo.module.css';

type LogoProps = {
  alt: string;
  alignment?: 'center' | 'flex-start' | 'flex-end';
  src: string;
};

export function Logo({ alt, alignment = 'center', src }: LogoProps) {
  return (
    <FlexContainer
      className={styles.logoContainer}
      flexDirection="row"
      justifyContent={alignment}
    >
      <img alt={alt} className={styles.logo} src={src} />
    </FlexContainer>
  );
}
