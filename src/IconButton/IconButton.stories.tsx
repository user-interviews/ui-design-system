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

export function CommonActions() {
  return (
    <>
      <IconButton action="ADD" />
      <IconButton action="SUBTRACT" />
      <IconButton action="EDIT" />
      <IconButton action="DELETE" />
      <IconButton action="COPY" />
      <IconButton action="PREVIOUS" />
      <IconButton action="NEXT" />
      <IconButton action="CLOSE" />
      <IconButton action="EXPAND" />
    </>
  );
}

export function AriaLabel() {
  return (
    <>
      <IconButton action="PREVIOUS" ariaLabel="Previous page" />
      <IconButton action="NEXT" ariaLabel="Next page" />
      <IconButton action="DELETE" ariaLabel="Delete participant" />
      <IconButton action="EDIT" ariaLabel="Edit note" />
    </>
  );
}

export function Loading() {
  return <IconButton action="ADD" isLoading />;
}

export function Sizes() {
  return (
    <>
      <IconButton action="DELETE" size="sm" />
      <IconButton action="DELETE" />
      <IconButton action="DELETE" size="lg" />
    </>
  );
}
