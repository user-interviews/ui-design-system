import React from 'react';

import { LoadingSkeleton } from '../LoadingSkeleton';
import { Text } from '../Text';
import Card, { CardSizes } from '.';

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

export function Default() {
  return (
    <Card
      divided={false}
      helperText="(helper text)"
      noPadding={false}
      size="sm"
      subTitle="Subtitle"
      title="Default card title"
    />
  );
}

export function Sizes() {
  return (
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
    </>
  );
}

export function LoadingDefault() {
  return (
    <Card
      divided={false}
      helperText="(helper text)"
      isLoading
      noPadding={false}
      size="sm"
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
}

export function LoadingParagraphCount() {
  return (
    <Card
      divided={false}
      helperText="(helper text)"
      isLoading
      loadingSkeletonParagraphCount={2}
      noPadding={false}
      size="sm"
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
}

export function LoadingCustom() {
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
}
