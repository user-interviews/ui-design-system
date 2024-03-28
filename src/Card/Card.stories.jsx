import React from 'react';

import Card, { CardSizes } from 'src/Card';
import { LoadingSkeleton } from 'src/LoadingSkeleton';

import mdx from './Card.mdx';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    controls: { exclude: [] },
    docs: {
      page: mdx,
    },
  },
  args: {
    children: 'Children',
    title: 'Title',
    helperText: '(helper text)',
    subTitle: 'Subtitle',
    divided: true,
  },
  argTypes: {
    title: { control: 'text' },
    size: {
      options: Object.values(CardSizes),
      mapping: CardSizes,
      control: { type: 'select' },
    },
    loadingSkeleton: { control: { type: null } },
  },
};

export const Default = {
  args: {},
};

export const Sizes = () => (
  <>
    <Card
      size={CardSizes.EXTRA_SMALL}
      title="xs"
    >
      <code>CardSizes.EXTRA_SMALL</code>
    </Card>
    <Card
      size={CardSizes.SMALL}
      title="sm"
    >
      <code>CardSizes.SMALL</code>
    </Card>
    <Card
      size={CardSizes.MEDIUM}
      title="md"
    >
      <code>CardSizes.MEDIUM</code>
    </Card>
    <Card
      size={CardSizes.LARGE}
      title="lg"
    >
      <code>CardSizes.LARGE</code>
    </Card>
    <Card
      title="default"
    >
      When no size is given, the Card takes up the full width of its parent container.
    </Card>
  </>
);

export const LoadingDefault = {
  args: {
    isLoading: true,
  },
};

export const LoadingParagraphCount = {
  args: {
    isLoading: true,
    loadingSkeletonParagraphCount: 2,
  },
};

const CustomLoadingSkeleton = (
  <>
    <LoadingSkeleton circle height={40} width={40} />
    <br />
    <LoadingSkeleton count={3} />
    <br />
    <LoadingSkeleton count={2.5} />
  </>
);

export const LoadingCustom = {
  args: {
    isLoading: true,
    loadingSkeleton: CustomLoadingSkeleton,
  },
};
