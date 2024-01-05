import type { IOptions } from 'sanitize-html';
import type { AriaAttributes } from 'react';
import type { Extension, Node as TipTapNode, Mark } from '@tiptap/core';

import './RichTextEditor.scss';

import React from 'react';

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
   https://tiptap.dev/docs/editor/guide/custom-extensions
  */
  extensions?: (Extension | TipTapNode | Mark)[];
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

function RichTextEditor({
  allowedAttributes,
  allowedTags,
  ariaAttributes,
  availableActions = RichTextEditorDefaultActionsArray,
  characterLimit,
  className,
  hasErrors,
  id,
  initialValue,
  isOneLine,
  onChange,
  placeholder,
  extensions = [],
}: RichTextEditorProps) {
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
    ...oneLineExtension,
    ...requiredExtensions,
    ...extensions,
    ...optionalExtensions,
  ];

  const editor = useEditor({
    extensions: editorExtensions,
    content: initialValue,
    onUpdate: ({ editor: ttEditor }) => {
      const html = ttEditor.getHTML();

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
  });

  return (
    editor ? (
      <div
        className="RichTextEditor"
        id={id}
      >
        {availableActions.length > 0 && (
          <RichTextEditorMenuBar
            availableActions={availableActions}
            editor={editor}
          />
        )}
        <EditorContent
          className={classNames(
            className,
            'RichTextEditor__field',
            { 'RichTextEditor__field--error': hasErrors },
            { 'RichTextEditor__field--without-menu-bar': availableActions.length === 0 },
          )}
          editor={editor}
          role="textbox"
          {...ariaAttributes}
        />
        {
          !!characterLimit && (
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
}

// eslint-disable-next-line import/no-default-export
export default RichTextEditor;
