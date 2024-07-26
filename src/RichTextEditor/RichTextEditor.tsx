import type { IOptions } from 'sanitize-html';
import type { Extension, Node as TipTapNode, Mark } from '@tiptap/core';

import './RichTextEditor.scss';

import React, {
  forwardRef, useImperativeHandle, type AriaAttributes, type ForwardedRef, useEffect,
} from 'react';

import classNames from 'classnames';

import { EditorContent, useEditor } from '@tiptap/react';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';

import sanitizeHtml from 'sanitize-html';

import { LoadingSkeleton } from '../LoadingSkeleton';

import RichTextEditorMenuBar from './RichTextEditorMenuBar';

import { OneLineLimit } from './oneLineLimit';

import { RichTextEditorActions, RichTextEditorDefaultActionsArray } from './richTextEditorActions';
import { createActionHandlers } from './actionHandlers';

const ELLIPSIS = '...'

const ExtendedLink = Link.extend({
  addKeyboardShortcuts() {
    const actionHandlers = createActionHandlers(this.editor);

    return {
      'Mod-k': actionHandlers.link,
    };
  },
});

export type RichTextEditorProps = {
  /**
   HTML attributes to allow while sanitizing the editor's content.
   If none provided then it uses sanitize-html's defaults
   https://github.com/apostrophecms/sanitize-html#default-options
  */
  allowedAttributes?: IOptions['allowedAttributes'];
  /**
   HTML tags to allow while sanitizing the editor's content.
   If none provided then it uses sanitize-html's defaults
   https://github.com/apostrophecms/sanitize-html#default-options
  */
  allowedTags?: string[];
  /**
    ARIA attributes to pass along to the text editor field
    for accessibility purposes. The keys of the object should be valid
    ARIA attributes.
  */
  ariaAttributes?: AriaAttributes;
  /**
   Which actions to include in the taskbar. Available as constants.
   Current options are BOLD, ITALIC, LINK, UNLINK, UNORDERED_LIST and ORDERED_LIST
  */
  availableActions?: typeof RichTextEditorActions[keyof typeof RichTextEditorActions][];
  characterLimit?: number;
  className?: string;
  /**
   Custom extensions that provide functionality related to app features beyond
   the responsibility of the text editor itself. An example of such an extension
   would be template variables as the requirements of implementation would rely on
   other code processing them. Not yet supported extensions which relate solely
   to the text editor should be added via a pull request and used via `availableActions`.
   https://tiptap.dev/docs/editor/guide/custom-extensions
  */
  customExtensions?: (Extension | TipTapNode | Mark)[];
  displayMode?: boolean;
  editable?: boolean;
  hasErrors?: boolean;
  id: string;
  /**
   HTML provided to initialize the editor's content
  */
  initialValue?: string;
  isOneLine?: boolean;
  placeholder?: string;
  /**
    Callback function to call with sanitized HTML when editor state changes
  */
  onChange: (arg0: string) => void;
}

export type RichTextEditorRef = {
  setContent: (content: string) => void;
}

const RichTextEditor = forwardRef((
  {
    allowedAttributes,
    allowedTags,
    ariaAttributes,
    availableActions = RichTextEditorDefaultActionsArray,
    displayMode = false,
    editable = true,
    characterLimit,
    className,
    hasErrors,
    id,
    initialValue,
    isOneLine,
    onChange,
    placeholder,
    customExtensions = [],
  }: RichTextEditorProps,
  ref: ForwardedRef<RichTextEditorRef>,
) => {
  const shouldDisplayMenuBar = !displayMode && availableActions.length > 0;
  const shouldDisplayCharacterLimit = !!characterLimit && !displayMode;
  const isEditable = editable && !displayMode;
  const oneLineExtension = isOneLine ? [OneLineLimit] : [];

  const requiredExtensions = [
    Document,
    Text,
    History,
    HardBreak,
    Paragraph,
    ListItem,
    Placeholder.configure({
      placeholder,
    }),
    CharacterCount.configure({
      limit: characterLimit,
    }),
  ];

  const optionalExtensions = [
    {
      name: RichTextEditorActions.BOLD,
      config: Bold,
    },
    {
      name: RichTextEditorActions.ITALIC,
      config: Italic,
    },
    {
      name: RichTextEditorActions.LINK,
      config: ExtendedLink,
    },
    {
      name: RichTextEditorActions.UNORDERED_LIST,
      config: BulletList,
    },
    {
      name: RichTextEditorActions.ORDERED_LIST,
      config: OrderedList,
    },
  ].filter((extension) => availableActions.includes(extension.name))
    .map((extension) => extension.config);

  const editorExtensions = [
    ...requiredExtensions,
    ...optionalExtensions,
    ...oneLineExtension,
    ...customExtensions,
  ];

  const editor = useEditor({
    extensions: editorExtensions,
    content: initialValue,
    onUpdate: ({ editor: ttEditor }) => {
      const html = ttEditor.isEmpty ? '' : ttEditor.getHTML();

      // if allowAttributes or allowedTags aren't passed
      // then use defaults from sanitize-html by not passing that key in the options
      // https://github.com/apostrophecms/sanitize-html

      const options: IOptions = {};

      if (allowedAttributes) {
        options.allowedAttributes = allowedAttributes;
      }

      if (allowedTags) {
        options.allowedTags = allowedTags;
      }

      const sanitizedHtml = sanitizeHtml(html, options);

      onChange(sanitizedHtml);
    },
    editable: isEditable,
  });

  useImperativeHandle(ref, () => ({
    setContent: (content: string) => {
      editor?.commands.setContent(content);
      onChange(content);
    },
  }));

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [editor, isEditable]);

  useEffect(() => {
    if (
      characterLimit &&
      displayMode &&
      editor &&
      editor.storage.characterCount.characters() > characterLimit
    ) {
      const truncatedText = editor
        .getText()
        .substring(0, characterLimit - ELLIPSIS.length)
        .concat(ELLIPSIS);

      editor.commands.setContent(truncatedText);
    }
  }, [characterLimit, displayMode, editor]);

  return (
    editor ? (
      <div
        className="RichTextEditor"
        id={id}
      >
        {shouldDisplayMenuBar && (
          <RichTextEditorMenuBar
            availableActions={availableActions}
            editable={isEditable}
            editor={editor}
          />
        )}
        <EditorContent
          className={classNames(
            className,
            'RichTextEditor__field',
            { 'RichTextEditor__field--error': hasErrors },
            { 'RichTextEditor__field--without-menu-bar': availableActions.length === 0 },
            { 'RichTextEditor__field--display-mode': displayMode },
          )}
          editor={editor}
          role="textbox"
          {...ariaAttributes}
        />
        {
          shouldDisplayCharacterLimit && (
            <p className="RichTextEditor__character-count">
              {editor.storage.characterCount.characters()}/{characterLimit}
            </p>
          )
        }
      </div>
    ) : (
      <>
        <LoadingSkeleton height={40} />
        <LoadingSkeleton height={70} />
      </>
    )
  );
});

// eslint-disable-next-line import/no-default-export
export default RichTextEditor;
