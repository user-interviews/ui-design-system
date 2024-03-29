import React from 'react';

import Card, { CardSizes } from 'src/Card';
import { LoadingSkeleton } from 'src/LoadingSkeleton';
import { Text } from 'src/Text';

import mdx from './Card.mdx';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Card
    divided={false}
    helperText="(helper text)"
    noPadding={false}
    size={undefined}
    subTitle="Subtitle"
    title="Default card title"
  />
);

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

export const LoadingDefault = () => (
  <Card
    divided={false}
    helperText="(helper text)"
    isLoading
    noPadding={false}
    size={undefined}
    subTitle="Subtitle"
    title="Default card title"
  >
    <Text>
      Powerful panel management and recruitment automation.
      The #1 panel software for teams that research at scale. Built for ReOps,
      loved by researchers, trusted by participants.
    </Text>
  </Card>
);

export const LoadingParagraphCount = () => (
  <Card
    divided={false}
    helperText="(helper text)"
    isLoading
    loadingSkeletonParagraphCount={2}
    noPadding={false}
    size={undefined}
    subTitle="Subtitle"
    title="Default card title"
  >
    <Text>
      Powerful panel management and recruitment automation.
      The #1 panel software for teams that research at scale. Built for ReOps,
      loved by researchers, trusted by participants.
    </Text>
    <Text>
      From branding to invite rules, you’re in total control over how research gets done org-wide
      doodle-y blue check mark with a black outline. With integrations and an API, our open
      platform plays nice with all your favorite research tools and methods doodle-y blue check
      mark with a black outline. SOC2 certified, SSO, 2FA, data consent, and all the privacy
      settings you need to stay GDPR compliant.
    </Text>
  </Card>
  );

export const LoadingCustom = () => {
  const CustomLoadingSkeleton = (
    <>
      <LoadingSkeleton circle height={40} width={40} />
      <br />
      <LoadingSkeleton count={3} />
      <br />
      <LoadingSkeleton count={2.5} />
    </>
  );

  return (
    <Card
      divided={false}
      helperText="(helper text)"
      isLoading
      loadingSkeleton={CustomLoadingSkeleton}
      noPadding={false}
      size={CardSizes.SMALL}
      subTitle="Subtitle"
      title="Default card title"
    />
  );
};
