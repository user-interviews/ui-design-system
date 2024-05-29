import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import RichTextEditor, { type RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorDefaultActionsArray } from './richTextEditorActions';

describe('<RichTextEditor />', () => {
  const elements = {
    textbox: {
      find: () => screen.findByRole('textbox'),
    },
    allButtons: {
      findAll: () => screen.findAllByRole('button'),
    },
  };
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

  describe('with prop editable set to false', () => {
    it('renders disabled editor', async () => {
      render(<Setup editable={false} initialValue="<p>hello world</p>" />);

      expect(await screen.findByText('hello world')).toBeInTheDocument();
      const textbox = await elements.textbox.find();
      expect(textbox).toBeInTheDocument();

      const buttons = await elements.allButtons.findAll();
      const disabledButtons = buttons.filter((button) => button.hasAttribute('disabled'));

      expect(disabledButtons.length).toBe(RichTextEditorDefaultActionsArray.length);
      expect(textbox.firstChild).toHaveAttribute('contenteditable', 'false');
    });
  });
});
