import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from '../Card';
import Flex from './Flex';

const meta: Meta<typeof Flex> = {
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: 'Flex is a utility component for creating consistent spacing between items. Use this for quick alignment and spacing in your layouts.',
      },
    },
  },
  title: 'Layouts/Flex',
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: {
    container: true,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  render: ({ ...args }) => (
    <Flex {...args}>
      <Card size="xs" title="Card 1" />
      <Card size="xs" title="Card 2" />
      <Card size="xs" title="Card 3" />
    </Flex>
  ),
};

export const FlexDirection: Story = {
  args: {
    container: true,
    flexDirection: 'column',
  },
  render: ({ ...args }) => (
    <Flex {...args}>
      <Card size="xs" title="Card 1" />
      <Card size="xs" subTitle={args.flexDirection} title="flex-direction: " />
      <Card size="xs" title="Card 3" />
    </Flex>
  ),
};

export const JustifyContent: Story = {
  args: {
    container: true,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  render: ({ ...args }) => (
    <Flex {...args}>
      <Card size="xs" title="Card 1" />
      <Card size="xs" subTitle={args.justifyContent} title="justify-content: " />
      <Card size="xs" title="Card 3" />
    </Flex>
  ),
};

export const AlignItems: Story = {
  args: {
    container: true,
    alignItems: 'center',
  },
  render: ({ ...args }) => (
    <Flex {...args}>
      <Card size="xs" title="Card 1" />
      <Card size="xs" subTitle={args.alignItems} title="align-items: " />
      <Card size="xs" title="Card 3" />
    </Flex>
  ),
};
