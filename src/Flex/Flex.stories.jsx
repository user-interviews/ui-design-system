import React from 'react';

import {
  boolean,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import { colors } from 'src/Styles';
import Flex from './Flex';
import { FLEX_PROPS } from './Flex.types';

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

const Box = ({ children }) => (
  <div style={{
    height: '100px',
    width: '100px',
    backgroundColor: colors.UX_EMERALD_600,
    borderRadius: '4px',
    color: colors.UX_WHITE,
    fontSize: '1rem',
    border: `2px solid ${colors.UX_NAVY}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    {children}
  </div>
);

export const Default = () => (
  <Flex
    alignItems={radios('alignItems', Object.values(FLEX_PROPS.alignItems))}
    alignSelf={radios('alignSelf', Object.values(FLEX_PROPS.alignSelf))}
    container={boolean('container', true)}
    direction={radios('direction', Object.values(FLEX_PROPS.direction))}
    flex={text('flex')}
    flexBasis={text('flexBasis')}
    flexGrow={text('flexGrow')}
    flexShrink={text('flexShrink')}
    flexWrap={radios('flexWrap', Object.values(FLEX_PROPS.flexWrap))}
    gap={text('gap')}
    height={text('height')}
    justifyContent={radios('justifyContent', Object.values(FLEX_PROPS.justifyContent))}
    justifySelf={radios('justifySelf', Object.values(FLEX_PROPS.justifySelf))}
    maxHeight={text('maxHeight')}
    maxWidth={text('maxWidth')}
    width={text('width')}
  >
    <Box>Box 1</Box>
    <Box>Box 2</Box>
    <Box>Box 3</Box>
  </Flex>
  );

export const FlexContainer = () => (
  <>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Properties for the parent (flex container)</h1>
    <Flex
      alignItems={radios('alignItems', Object.values(FLEX_PROPS.alignItems))}
      container
      direction={radios('direction', Object.values(FLEX_PROPS.direction))}
      flexWrap={radios('flexWrap', Object.values(FLEX_PROPS.flexWrap))}
      gap={text('gap')}
      justifyContent={radios('justifyContent', Object.values(FLEX_PROPS.justifyContent))}
    >
      <Box>Box 1</Box>
      <Box>Box 2</Box>
      <Box>Box 3</Box>
      <Box>Box 4</Box>
      <Box>Box 5</Box>
    </Flex>
  </>
);

export const FlexItem = () => (
  <>
    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Properties for the children (flex item)</h1>
    <Flex container>
      <Flex
        alignSelf={radios('alignSelf', Object.values(FLEX_PROPS.alignSelf))}
        flex={text('flex')}
        flexBasis={text('flexBasis')}
        flexGrow={text('flexGrow')}
        flexShrink={text('flexShrink')}
        justifySelf={radios('justifySelf', Object.values(FLEX_PROPS.justifySelf))}
      >
        <Box>Adjust me</Box>
      </Flex>
      <Flex>
        <Box>Box 2</Box>
      </Flex>
      <Flex>
        <Box>Box 3</Box>
      </Flex>
    </Flex>
  </>
);
