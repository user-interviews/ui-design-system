import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Flex from './Flex';
import Card from 'src/Card';

const meta: Meta<typeof Flex> = {
  component: Flex,
  parameters: {
    docs: {
      description: {
        component:  'Flex is a utility component for creating consistent spacing between items. Use this for quick alignment and spacing in your layouts.'
      },
    }
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
  render: ({children, ...args}) => (
    <Flex {...args}>
      <Card title="Card 1" size="xs" />
      <Card title="Card 2" size="xs" />
      <Card title="Card 3" size="xs" />
    </Flex>
  )
}

export const FlexDirection: Story = {
  args: {
    container: true,
    flexDirection: 'column',
  },
  render: ({children, ...args}) => (
    <Flex {...args}>
      <Card title="Card 1" size="xs" />
      <Card title={'flex-direction: ' } subTitle={args.flexDirection} size="xs" />
      <Card title="Card 3" size="xs" />
    </Flex>
  )
}

export const JustifyContent: Story = {
  args: {
    container: true,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  render: ({children, ...args}) => (
    <Flex {...args}>
      <Card title="Card 1" size="xs" />
      <Card title={'justify-content: ' } subTitle={args.justifyContent} size="xs" />
      <Card title="Card 3" size="xs" />
    </Flex>
  )
}

export const AlignItems: Story = {
  args: {
    container: true,
    alignItems: 'center',
  },
  render: ({children, ...args}) => (
    <Flex {...args}>
      <Card title="Card 1" size="xs" />
      <Card title={'align-items: ' } subTitle={args.alignItems} size="xs" />
      <Card title="Card 3" size="xs" />
    </Flex>
  )
}
