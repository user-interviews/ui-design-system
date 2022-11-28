import React from 'react';

import {
  boolean,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import Flex from './Flex';
import { FLEX_PROPS } from './Flex.types';
import ProfileCell from '../ProfileCell';

import mdx from './Flex.mdx';

export default {
  title: 'Layouts/Flex',
  component: Flex,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const userNoImage = {
  initials: 'RR',
  name: 'Riley Researcher',
};

export const Default = () => (
  <Flex
    alignItems={radios('alignItems', Object.values(FLEX_PROPS.alignItems))}
    alignSelf={radios('alignSelf', Object.values(FLEX_PROPS.alignSelf))}
    container={boolean('container', true)}
    flex={text('flex')}
    flexBasis={text('flexBasis')}
    flexDirection={radios('flexDirection', Object.values(FLEX_PROPS.flexDirection))}
    flexGrow={text('flexGrow')}
    flexShrink={text('flexShrink')}
    flexWrap={radios('flexWrap', Object.values(FLEX_PROPS.flexWrap), 'wrap')}
    height={text('height', '100%')}
    justifyContent={radios('justifyContent', Object.values(FLEX_PROPS.justifyContent))}
    justifySelf={radios('justifySelf', Object.values(FLEX_PROPS.justifySelf))}
    maxHeight={text('maxHeight')}
    maxWidth={text('maxWidth')}
    width={text('width')}
  >
    <ProfileCell
      colorId={1}
      subtitle="riley+1@userinterviews.com"
      user={userNoImage}
    />
    <ProfileCell
      colorId={2}
      subtitle="riley+2@userinterviews.com"
      user={userNoImage}
    />
    <ProfileCell
      colorId={3}
      subtitle="riley+3@userinterviews.com"
      user={userNoImage}
    />
    <ProfileCell
      colorId={4}
      subtitle="riley+4@userinterviews.com"
      user={userNoImage}
    />
    <ProfileCell
      colorId={5}
      subtitle="riley+5@userinterviews.com"
      user={userNoImage}
    />
    <ProfileCell
      colorId={6}
      subtitle="riley+6@userinterviews.com"
      user={userNoImage}
    />
  </Flex>
  );

export const FlexContainer = () => (
  <>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Properties for the parent (flex container)</h1>
    <Flex
      alignItems={radios('alignItems', Object.values(FLEX_PROPS.alignItems))}
      container
      flexDirection={radios('flexDirection', Object.values(FLEX_PROPS.flexDirection))}
      flexWrap={radios('flexWrap', Object.values(FLEX_PROPS.flexWrap), 'wrap')}
      height="100%"
      justifyContent={radios('justifyContent', Object.values(FLEX_PROPS.justifyContent))}
    >
      <ProfileCell
        colorId={1}
        subtitle="riley+1@userinterviews.com"
        user={userNoImage}
      />
      <ProfileCell
        colorId={2}
        subtitle="riley+2@userinterviews.com"
        user={userNoImage}
      />
      <ProfileCell
        colorId={3}
        subtitle="riley+3@userinterviews.com"
        user={userNoImage}
      />
      <ProfileCell
        colorId={4}
        subtitle="riley+4@userinterviews.com"
        user={userNoImage}
      />
      <ProfileCell
        colorId={5}
        subtitle="riley+5@userinterviews.com"
        user={userNoImage}
      />
      <ProfileCell
        colorId={6}
        subtitle="riley+6@userinterviews.com"
        user={userNoImage}
      />
    </Flex>
  </>
);

export const FlexItem = () => (
  <>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Properties for the children (flex item)</h1>
    <Flex container>
      <Flex
        alignSelf={radios('alignSelf', Object.values(FLEX_PROPS.alignSelf))}
        flex={text('flex', '2')}
        flexBasis={text('flexBasis')}
        flexGrow={text('flexGrow')}
        flexShrink={text('flexShrink')}
        justifySelf={radios('justifySelf', Object.values(FLEX_PROPS.justifySelf))}
      >
        <ProfileCell
          colorId={1}
          subtitle="change@userinterviews.com"
          user={{ name: 'Change Me', initials: 'CM' }}
        />
      </Flex>
      <Flex flex={1}>
        <ProfileCell
          colorId={2}
          subtitle="riley+2@userinterviews.com"
          user={userNoImage}
        />
      </Flex>
      <Flex flex={1}>
        <ProfileCell
          colorId={3}
          subtitle="riley+3@userinterviews.com"
          user={userNoImage}
        />
      </Flex>
    </Flex>
  </>
);
