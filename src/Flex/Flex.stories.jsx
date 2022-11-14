import React from 'react';

import {
  boolean,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import { colors } from 'src/Styles';
import Flex from './Flex';

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
    alignItems={radios('alignItems',
      [
        'stretch',
        'center',
        'flex-start',
        'flex-end',
        'baseline',
        'initial',
        'inherit',
      ])}
    alignSelf={radios('alignSelf',
      [
        'stretch',
        'center',
        'start',
        'end',
      ])}
    container={boolean('container', true)}
    direction={radios('direction', ['row', 'column'])}
    flex={text('flex')}
    flexBasis={text('flexBasis')}
    flexGrow={text('flexGrow')}
    flexShrink={text('flexShrink')}
    flexWrap={radios('flexWrap', ['wrap', 'nowrap', 'reverse'])}
    height={text('height')}
    justifyContent={radios('justifyContent',
      [
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'center',
        'initial',
        'inherit',
      ])}
    justifySelf={radios('justifySelf',
      [
        'stretch',
        'center',
        'start',
        'end',
      ])}
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
      alignItems={radios('alignItems',
      [
        'stretch',
        'center',
        'flex-start',
        'flex-end',
        'baseline',
        'initial',
        'inherit',
      ])}
      container
      direction={radios('direction', ['row', 'column'], 'row')}
      flexWrap={radios('flexWrap', ['wrap', 'nowrap', 'reverse'])}
      justifyContent={radios('justifyContent',
      [
        'flex-start',
        'flex-end',
        'space-between',
        'space-around',
        'center',
        'initial',
        'inherit',
      ])}
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
        alignSelf={radios('alignSelf',
          [
            'stretch',
            'center',
            'start',
            'end',
          ])}
        flex={text('flex')}
        flexBasis={text('flexBasis')}
        flexGrow={text('flexGrow')}
        flexShrink={text('flexShrink')}
        justifySelf={radios('justifySelf',
          [
            'stretch',
            'center',
            'start',
            'end',
          ])}
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
