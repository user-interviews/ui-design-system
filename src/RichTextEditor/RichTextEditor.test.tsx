import { render, screen } from '@testing-library/react';
import React from 'react';

import RichTextEditor, { type RichTextEditorProps } from './RichTextEditor';

describe('<RichTextEditor />', () => {
  const Setup = (overrides: Omit<RichTextEditorProps, 'id' | 'onChange'> = {}) => (
    <RichTextEditor
      id="some-id"
      onChange={jest.fn()}
      {...overrides}
    />
  );

  it('renders snapshot', () => {
    const { asFragment } = render(<Setup />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe('given an initial value', () => {
    it('deserializes value correctly', () => {
      render(<Setup initialValue="<p>hello world</p>" />);

      expect(screen.getByText('hello world')).toBeInTheDocument();
    });
  });
});
