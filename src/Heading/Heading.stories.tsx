import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'Components/Heading',
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'The fastest way to recruit research participants'
  },
};

export const Levels: Story = {
  render: () => (
    <>
      <Heading level={1} size="xxxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={3} size="xl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={4} size="lg" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={5} size="md" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={6} size="sm" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={6} size="xs" weight="bold">The fastest way to recruit research participants</Heading>
    </>
  )
}

export const Weights: Story = {
  render: () => (
    <>
      <Heading level={2} size="xxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="medium">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="regular">The fastest way to recruit research participants</Heading>
    </>
  )
}

export const Alignment: Story = {
  render: () => (
    <>
      <Heading level={2} size="xxl" textAlign="left" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" textAlign="center" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" textAlign="right" weight="bold">The fastest way to recruit research participants</Heading>
    </>
  )
}
