import React from 'react';

import Card, { CardSizes } from 'src/Card';
import Container from 'src/Container';
import mdx from './Container.mdx';

export default {
  title: 'Components/Container',
  component: Container,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <Container flex justifyContent="center">
      <Card size={CardSizes.EXTRA_SMALL} title="Card--xs" />
    </Container>
    <Container>
      <Card size={CardSizes.SMALL} title="Card--sm" />
    </Container>
    <Container>
      <Card size={CardSizes.MEDIUM} title="Card--md" />
    </Container>
    <Container>
      <Card size={CardSizes.LARGE} title="Card--lg" />
    </Container>
  </>
);
