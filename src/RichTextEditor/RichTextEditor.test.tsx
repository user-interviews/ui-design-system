import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import RichTextEditor, { type RichTextEditorProps } from './RichTextEditor';
import { RichTextEditorDefaultActionsArray } from './richTextEditorActions';

describe('<RichTextEditor />', () => {
  const elements = {
    textbox: {
      // The latest tiptap seems to be applying "textbox" role to two elements, parent and child now
      // so just going to grab the innermost one that has contenteditable attribute...
      // note that this might be a tiptap bug? so be ready if this has to be undone
      find: () => screen.findAllByRole('textbox').then(
        (elems) => elems.find((element) => element.hasAttribute('contenteditable')),
      ),
    },
    allButtons: {
      findAll: () => screen.findAllByRole('button'),
    },
  };
  function Setup(overrides: Omit<RichTextEditorProps, 'id' | 'onChange'> = {}) {
  return (
    <RichTextEditor
      id="some-id"
      onChange={jest.fn()}
      {...overrides}
    />
  );
}

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
      expect(textbox).toHaveAttribute('contenteditable', 'false');
    });
  });
});
