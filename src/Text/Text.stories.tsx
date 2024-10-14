import React from 'react';

import Text from './Text';
import mdx from './Text.mdx';

export default {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  return (
    <Text>
      Source from a pool of more than 2.1 million participants to reach nearly any target audience.
    </Text>
  );
}

export function Sizes() {
  return (
    <>
      <Text size="lg">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text size="md">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text size="sm">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
    </>
  );
}

export function Weight() {
  return (
    <>
      <Text weight="bold">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text weight="semibold">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text weight="medium">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text weight="regular">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
    </>
  );
}

export function Alignment() {
  return (
    <>
      <Text textAlign="left">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text textAlign="center">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
      <Text textAlign="right">Source from a pool of more than 2.1 million participants to reach nearly any target audience.</Text>
    </>
  );
}
