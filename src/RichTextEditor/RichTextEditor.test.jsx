import React from 'react';
import { render, screen } from '@testing-library/react';

import RichTextEditor from './RichTextEditor';

describe('<RichTextEditor />', () => {
  const Setup = (overrides = {}) => (
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
