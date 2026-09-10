/** @jest-environment node */

import React from 'react';

import { renderToString } from 'react-dom/server';

import RichTextEditor from './RichTextEditor';

describe('<RichTextEditor /> server rendering', () => {
  it('renders loading placeholders before the editor mounts', () => {
    const serverMarkup = renderToString(
      <RichTextEditor id="some-id" onChange={jest.fn()} />,
    );

    expect(serverMarkup).toContain('LoadingSkeleton');
    expect(serverMarkup).not.toContain('ProseMirror');
  });
});
