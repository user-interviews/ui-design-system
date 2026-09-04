import React, { createRef, useEffect, useRef } from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mark } from '@tiptap/core';

import RichTextEditor, {
  type RichTextEditorProps,
  type RichTextEditorRef,
} from './RichTextEditor';
import {
  RichTextEditorActions,
  RichTextEditorDefaultActionsArray,
} from './richTextEditorActions';

describe('<RichTextEditor />', () => {
  const emptyRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  };

  beforeAll(() => {
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: () => null,
    });
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: () => emptyRect,
    });
    Object.defineProperty(Range.prototype, 'getClientRects', {
      configurable: true,
      value: () => [],
    });
  });

  const elements = {
    textbox: {
      // The latest tiptap seems to be applying "textbox" role to two elements, parent and child now
      // so just going to grab the innermost one that has contenteditable attribute...
      // note that this might be a tiptap bug? so be ready if this has to be undone
      find: () =>
        screen
          .findAllByRole('textbox')
          .then((elems) =>
            elems.find((element) => element.hasAttribute('contenteditable')),
          ),
    },
    allButtons: {
      findAll: () => screen.findAllByRole('button'),
    },
  };
  function Setup(
    overrides: Omit<RichTextEditorProps, 'id' | 'onChange'> & {
      onChange?: RichTextEditorProps['onChange'];
    } = {},
  ) {
    return <RichTextEditor id="some-id" onChange={jest.fn()} {...overrides} />;
  }

  function SetContentOnMount({
    content,
    initialValue,
    onChange,
  }: {
    content: (string | null)[];
    initialValue?: string;
    onChange: RichTextEditorProps['onChange'];
  }) {
    const editorRef = useRef<RichTextEditorRef>(null);

    useEffect(() => {
      content.forEach((value) => editorRef.current?.setContent(value));
    }, [content]);

    return (
      <RichTextEditor
        allowedTags={['p']}
        id="some-id"
        initialValue={initialValue}
        ref={editorRef}
        onChange={onChange}
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

    it('preserves list markup', async () => {
      render(
        <Setup initialValue="<ul><li><p>first</p></li><li><p>second</p></li></ul>" />,
      );

      expect(await screen.findByRole('list')).toHaveTextContent('firstsecond');
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('deserializes markup from a custom extension', async () => {
      const CustomMark = Mark.create({
        name: 'customMark',
        parseHTML: () => [{ tag: 'mark' }],
        renderHTML: () => ['mark', 0],
      });

      render(
        <Setup
          customExtensions={[CustomMark]}
          initialValue="<p><mark>hello world</mark></p>"
        />,
      );

      expect(await screen.findByText('hello world')).toHaveProperty(
        'tagName',
        'MARK',
      );
    });
  });

  describe('when setting content through the ref', () => {
    it('emits one sanitized change and supports clearing with null', async () => {
      const editorRef = createRef<RichTextEditorRef>();
      const onChange = jest.fn();

      render(
        <RichTextEditor
          allowedTags={['p']}
          id="some-id"
          ref={editorRef}
          onChange={onChange}
        />,
      );

      expect(await elements.textbox.find()).toBeInTheDocument();

      act(() =>
        editorRef.current?.setContent(
          '<p><strong>hello</strong></p><script>alert("bad")</script>',
        ),
      );

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('<p>hello</p>');

      onChange.mockClear();
      act(() => editorRef.current?.setContent(null));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith('');
    });

    it('applies the latest content queued from a parent mount effect', async () => {
      const onChange = jest.fn();

      render(
        <SetContentOnMount
          content={[
            '<p>discarded</p>',
            '<p><strong>queued content</strong></p>',
          ]}
          onChange={onChange}
        />,
      );

      expect(await screen.findByText('queued content')).toBeInTheDocument();
      expect(screen.queryByText('discarded')).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('<p>queued content</p>');
    });

    it('applies a null value queued from a parent mount effect', async () => {
      const onChange = jest.fn();

      render(
        <SetContentOnMount
          content={[null]}
          initialValue="<p>initial content</p>"
          onChange={onChange}
        />,
      );

      await waitFor(() => expect(onChange).toHaveBeenCalledWith(''));
      expect(screen.queryByText('initial content')).not.toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  it('supports action subsets that omit formatting extensions', async () => {
    render(<Setup availableActions={[RichTextEditorActions.LINK]} />);

    expect(
      await screen.findByRole('button', { name: /^link$/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /bold/i })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /italic/i }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('toggles list markup and active toolbar state', async () => {
    const editorRef = createRef<RichTextEditorRef>();
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<RichTextEditor id="some-id" ref={editorRef} onChange={onChange} />);

    expect(await elements.textbox.find()).toBeInTheDocument();
    act(() => editorRef.current?.setContent('<p>hello</p>'));
    onChange.mockClear();

    const listButton = await screen.findByRole('button', {
      name: /unordered list/i,
    });
    await user.click(listButton);

    expect(listButton).toHaveClass('Button--active');
    expect(onChange).toHaveBeenLastCalledWith('<ul><li><p>hello</p></li></ul>');
  });

  it('updates link toolbar state when a link is removed', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Setup
        initialValue='<p><a href="https://example.com">hello</a></p>'
        onChange={onChange}
      />,
    );

    expect(await screen.findByText('hello')).toBeInTheDocument();
    const linkButton = await screen.findByRole('button', { name: /^link$/i });
    const unlinkButton = await screen.findByRole('button', { name: /unlink/i });

    expect(linkButton).toHaveClass('Button--active');
    expect(unlinkButton).toBeEnabled();

    await user.click(unlinkButton);

    expect(linkButton).not.toHaveClass('Button--active');
    expect(unlinkButton).toBeDisabled();
    expect(onChange).toHaveBeenLastCalledWith('<p>hello</p>');
  });

  it('updates toolbar and character count state after transactions', async () => {
    const editorRef = createRef<RichTextEditorRef>();
    const user = userEvent.setup();

    render(
      <RichTextEditor
        characterLimit={20}
        id="some-id"
        ref={editorRef}
        onChange={jest.fn()}
      />,
    );

    const textbox = await elements.textbox.find();
    const boldButton = await screen.findByRole('button', { name: /bold/i });
    expect(textbox).toBeInTheDocument();

    await user.click(boldButton);
    expect(boldButton).toHaveClass('Button--active');

    act(() => editorRef.current?.setContent('<p>hello</p>'));
    expect(await screen.findByText('5/20')).toBeInTheDocument();
  });

  describe('with prop editable set to false', () => {
    it('renders disabled editor', async () => {
      render(<Setup editable={false} initialValue="<p>hello world</p>" />);

      expect(await screen.findByText('hello world')).toBeInTheDocument();
      const textbox = await elements.textbox.find();
      expect(textbox).toBeInTheDocument();

      const buttons = await elements.allButtons.findAll();
      const disabledButtons = buttons.filter((button) =>
        button.hasAttribute('disabled'),
      );

      expect(disabledButtons.length).toBe(
        RichTextEditorDefaultActionsArray.length,
      );
      expect(textbox).toHaveAttribute('contenteditable', 'false');
    });

    it('can become editable after mounting', async () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <Setup
          editable={false}
          initialValue="<p>hello world</p>"
          onChange={onChange}
        />,
      );

      const textbox = await elements.textbox.find();
      expect(textbox).toHaveAttribute('contenteditable', 'false');

      rerender(
        <Setup
          editable
          initialValue="<p>hello world</p>"
          onChange={onChange}
        />,
      );

      await waitFor(() =>
        expect(textbox).toHaveAttribute('contenteditable', 'true'),
      );
      expect(
        await screen.findByRole('button', { name: /bold/i }),
      ).toBeEnabled();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
