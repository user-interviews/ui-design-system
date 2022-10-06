import React from 'react';

import {
  boolean,
  select,
  withKnobs,
} from '@storybook/addon-knobs';

import Card from 'src/Card';
import { Col, Container, Row } from 'src/Container';
// import mdx from './Container.mdx';

import { ThemeProvider } from 'react-bootstrap';

import { Stack } from 'src/Stack';

export default {
  title: 'Layouts/Stack',
  component: Stack,
  // subcomponents: {
  //   Col, Row,
  // },
  decorators: [withKnobs],
  // parameters: {
  //   docs: {
  //     page: mdx,
  //   },
  // },
};

export const Default = () => (

  <Stack direction="horizontal" gap={3}>
  <div className="bg-light border">First item</div>
  <div className="bg-light border">Second item</div>
  <div className="bg-light border">Third item</div>
</Stack>

);
