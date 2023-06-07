import React from 'react';

import IconButton from './IconButton';

import mdx from './IconButton.mdx';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const CommonActions = () => (
  <>
    <IconButton action="ADD" />
    <IconButton action="SUBTRACT" />
    <IconButton action="EDIT" />
    <IconButton action="DELETE" />
    <IconButton action="COPY" />
    <IconButton action="PREVIOUS" />
    <IconButton action="NEXT" />
  </>
);

export const AriaLabel = () => (
  <>
    <IconButton action="PREVIOUS" ariaLabel="Previous page" />
    <IconButton action="NEXT" ariaLabel="Next page" />
    <IconButton action="DELETE" ariaLabel="Delete participant" />
    <IconButton action="EDIT" ariaLabel="Edit note" />
  </>
);
