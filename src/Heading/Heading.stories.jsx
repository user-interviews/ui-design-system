import React from 'react';

import Heading from './Heading';
import mdx from './Heading.mdx';

export default {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Heading>The fastest way to recruit research participants</Heading>
);

export const Levels = () => (
  <>
    <Heading level={1} size="xxxl">The fastest way to recruit research participants</Heading>
    <Heading level={2} size="xxl">The fastest way to recruit research participants</Heading>
    <Heading level={3} size="xl">The fastest way to recruit research participants</Heading>
    <Heading level={4} size="lg">The fastest way to recruit research participants</Heading>
    <Heading level={5} size="md">The fastest way to recruit research participants</Heading>
    <Heading level={6} size="sm">The fastest way to recruit research participants</Heading>
    <Heading level={6} size="xs">The fastest way to recruit research participants</Heading>
  </>
);

export const Weights = () => (
  <>
    <Heading weight="bold">The fastest way to recruit research participants</Heading>
    <Heading weight="medium">The fastest way to recruit research participants</Heading>
    <Heading weight="regular">The fastest way to recruit research participants</Heading>
  </>
);

export const Alignment = () => (
  <>
    <Heading textAlign="left">The fastest way to recruit research participants</Heading>
    <Heading textAlign="center">The fastest way to recruit research participants</Heading>
    <Heading textAlign="right">The fastest way to recruit research participants</Heading>
  </>
);
