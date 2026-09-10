import React, { createRef, useEffect, useRef } from 'react';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Extension, Mark, type Editor } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';

import RichTextEditor, {
  type RichTextEditorProps,
  type RichTextEditorRef,
} from './RichTextEditor';
import {
  RichTextEditorActions,
  RichTextEditorDefaultActionsArray,
} from './richTextEditorActions';

import type { Slice } from '@tiptap/pm/model';

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

    it('emits the normalized, sanitized value once the editor is ready', async () => {
      const onChange = jest.fn();

      render(
        <Setup
          allowedTags={['p']}
          initialValue="<p><strong>hello</strong></p><script>bad()<\/script>"
          onChange={onChange}
        />,
      );

      await waitFor(() =>
        expect(onChange).toHaveBeenCalledWith('<p>hello</p>'),
      );
      expect(onChange).toHaveBeenCalledTimes(1);
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
    expect(
      screen.queryByRole('button', { name: /bold/i }),
    ).not.toBeInTheDocument();
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

  it('supports unlink-only action subsets', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    let editor: Editor | undefined;
    const CaptureEditor = Extension.create({
      name: 'captureEditor',
      onCreate() {
        const { editor: capturedEditor } = this;
        editor = capturedEditor;
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[CaptureEditor]}
        initialValue='<p><a href="https://example.com">hello</a></p>'
        onChange={onChange}
      />,
    );

    expect(await screen.findByText('hello')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^link$/i }),
    ).not.toBeInTheDocument();

    act(() => editor?.commands.setTextSelection({ from: 1, to: 6 }));

    const unlinkButton = await screen.findByRole('button', {
      name: /unlink/i,
    });
    expect(unlinkButton).toBeEnabled();

    await user.click(unlinkButton);

    expect(unlinkButton).toBeDisabled();
    expect(onChange).toHaveBeenLastCalledWith('<p>hello</p>');
  });

  it('does not create links for unlink-only action subsets', async () => {
    const prompt = jest.spyOn(window, 'prompt').mockImplementation(jest.fn());
    const user = userEvent.setup();

    render(<Setup availableActions={[RichTextEditorActions.UNLINK]} />);

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    await user.click(textbox);
    await user.keyboard('{Meta>}k{/Meta}');
    await user.type(textbox, 'https://example.com ');

    expect(prompt).not.toHaveBeenCalled();
    expect(textbox.querySelector('a')).not.toBeInTheDocument();

    prompt.mockRestore();
  });

  it('does not link pasted URLs for unlink-only action subsets', async () => {
    const user = userEvent.setup();

    render(<Setup availableActions={[RichTextEditorActions.UNLINK]} />);

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    await user.click(textbox);
    await user.paste('https://example.com');

    expect(textbox).toHaveTextContent('https://example.com');
    expect(textbox.querySelector('a')).not.toBeInTheDocument();
  });

  it('does not preserve links from rich-text pastes for unlink-only action subsets', async () => {
    render(<Setup availableActions={[RichTextEditorActions.UNLINK]} />);

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    fireEvent.paste(textbox, {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html'
            ? '<p><a href="https://example.com">hello</a></p>'
            : 'hello',
      },
    });

    expect(textbox).toHaveTextContent('hello');
    expect(textbox.querySelector('a')).not.toBeInTheDocument();
  });

  it('does not delete selected content when an empty clipboard is pasted in an unlink-only editor', async () => {
    let editor: Editor | undefined;
    const CaptureEditor = Extension.create({
      name: 'captureEditor',
      onCreate() {
        const { editor: capturedEditor } = this;
        editor = capturedEditor;
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[CaptureEditor]}
        initialValue="<p>hello</p>"
      />,
    );

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    act(() => editor?.commands.setTextSelection({ from: 1, to: 6 }));
    fireEvent.paste(textbox, {
      clipboardData: { getData: () => '' },
    });

    expect(textbox).toHaveTextContent('hello');
  });

  it('notifies paste observers in unlink-only editors', async () => {
    const onPaste = jest.fn(({ editor }: { editor: Editor; slice: Slice }) => {
      editor.commands.insertContent('before ');
    });
    const ObservePaste = Extension.create({
      name: 'observePaste',
      onCreate() {
        this.editor.on('paste', onPaste);
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[ObservePaste]}
      />,
    );

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    fireEvent.paste(textbox, {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html'
            ? '<p><a href="https://example.com">hello</a></p>'
            : 'hello',
      },
    });

    expect(onPaste).toHaveBeenCalledTimes(1);
    expect(textbox).toHaveTextContent('before hello');
    expect(onPaste.mock.calls[0][0].slice.content.firstChild?.marks).toEqual(
      [],
    );
  });

  it('allows custom extensions to handle pastes in unlink-only editors', async () => {
    const handlePaste = jest.fn((view) => {
      view.dispatch(view.state.tr.insertText('custom paste'));

      return true;
    });
    const CustomPaste = Extension.create({
      name: 'customPaste',
      addProseMirrorPlugins() {
        return [new Plugin({ props: { handlePaste } })];
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[CustomPaste]}
      />,
    );

    const textbox = await elements.textbox.find();
    if (!textbox) throw new Error('RichTextEditor textbox was not rendered');

    fireEvent.paste(textbox, {
      clipboardData: {
        getData: (type: string) =>
          type === 'text/html'
            ? '<p><a href="https://example.com">hello</a></p>'
            : 'hello',
      },
    });

    expect(handlePaste).toHaveBeenCalledTimes(1);
    expect(textbox).toHaveTextContent('custom paste');
    expect(textbox.querySelector('a')).not.toBeInTheDocument();
  });

  it('preserves links in dragged content for unlink-only action subsets', async () => {
    let editor: Editor | undefined;
    const CaptureEditor = Extension.create({
      name: 'captureEditor',
      onCreate() {
        const { editor: capturedEditor } = this;
        editor = capturedEditor;
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[CaptureEditor]}
        initialValue='<p><a href="https://example.com">hello</a></p>'
      />,
    );

    await screen.findByRole('link', { name: 'hello' });
    const tiptapEditor = editor;
    if (!tiptapEditor) throw new Error('RichTextEditor was not created');

    const draggedSlice = tiptapEditor.state.doc.slice(1, 6);
    let transformedSlice = draggedSlice;

    tiptapEditor.view.someProp('transformPasted', (transform) => {
      transformedSlice = transform(transformedSlice, tiptapEditor.view, false);
    });

    expect(
      transformedSlice.content.firstChild?.marks.some(
        (mark) => mark.type.name === 'link',
      ),
    ).toBe(true);
  });

  it('does not extend existing links for unlink-only action subsets', async () => {
    let editor: Editor | undefined;
    const CaptureEditor = Extension.create({
      name: 'captureEditor',
      onCreate() {
        const { editor: capturedEditor } = this;
        editor = capturedEditor;
      },
    });

    render(
      <Setup
        availableActions={[RichTextEditorActions.UNLINK]}
        customExtensions={[CaptureEditor]}
        initialValue='<p><a href="https://example.com">hello</a></p>'
      />,
    );

    await screen.findByRole('link', { name: 'hello' });

    act(() => {
      editor?.commands.setTextSelection(6);
      editor?.commands.insertContent(' world');
    });

    expect(
      await screen.findByRole('link', { name: 'hello' }),
    ).toHaveTextContent('hello');
    expect(await elements.textbox.find()).toHaveTextContent('hello world');
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
      await waitFor(() =>
        expect(onChange).toHaveBeenCalledWith('<p>hello world</p>'),
      );
      onChange.mockClear();

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
