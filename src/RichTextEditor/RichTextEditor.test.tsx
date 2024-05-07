import { render, screen, waitFor } from '@testing-library/react';
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

  it('renders snapshot', async () => {
    const { asFragment } = render(<Setup />);

    await waitFor(() => screen.getByRole('button', { name: /bold/i }));

    expect(asFragment()).toMatchSnapshot();
  });

  describe('given an initial value', () => {
    it('deserializes value correctly', async () => {
      render(<Setup initialValue="<p>hello world</p>" />);

      expect(await screen.findByText('hello world')).toBeInTheDocument();
    });
  });
});
