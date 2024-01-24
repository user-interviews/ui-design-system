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
    <IconButton action="ADD" ariaLabel="add" />
    <IconButton action="SUBTRACT" ariaLabel="subtract" />
    <IconButton action="EDIT" ariaLabel="edit" />
    <IconButton action="DELETE" ariaLabel="delete" />
    <IconButton action="COPY" ariaLabel="copy" />
    <IconButton action="PREVIOUS" ariaLabel="previous" />
    <IconButton action="NEXT" ariaLabel="next" />
    <IconButton action="CLOSE" ariaLabel="close" />
    <IconButton action="EXPAND" ariaLabel="expand" />
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

export const Sizes = () => (
  <>
    <IconButton action="DELETE" size="sm" />
    <IconButton action="DELETE" size="md" />
  </>
);
