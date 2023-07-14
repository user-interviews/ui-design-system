import './RichTextEditor.scss';

import React from 'react';
import * as propTypes from 'prop-types';

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

import { LoadingSkeleton } from 'src/LoadingSkeleton';

import RichTextEditorMenuBar from './RichTextEditorMenuBar';

import { OneLineLimit } from './oneLineLimit';

import { RteActions, AllRteActions, DefaultRteActions } from './richTextEditorActions';
import { createActionHandlers } from './actionHandlers';

const ExtendedLink = Link.extend({
  addKeyboardShortcuts() {
    const actionHandlers = createActionHandlers(this.editor);

    return {
      'Mod-k': actionHandlers.link,
    };
  },
});

const RichTextEditor = ({
  allowedAttributes,
  allowedTags,
  availableActions,
  className,
  characterLimit,
  hasErrors,
  id,
  isOneLine,
  initialValue,
  placeholder,
  onChange,
  ...rest
}) => {
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
      name: RteActions.BOLD,
      config: Bold,
    },
    {
      name: RteActions.ITALIC,
      config: Italic,
    },
    {
      name: RteActions.LINK,
      config: ExtendedLink,
    },
    {
      name: RteActions.UNORDERED_LIST,
      config: BulletList,
    },
    {
      name: RteActions.ORDERED_LIST,
      config: OrderedList,
    },
  ].filter((extension) => availableActions.includes(extension.name))
    .map((extension) => extension.config);

  const extensions = [
    ...oneLineExtension,
    ...requiredExtensions,
    ...optionalExtensions,
  ];

  const editor = useEditor({
    extensions,
    content: initialValue,
    onUpdate: ({ editor: ttEditor }) => {
      const html = ttEditor.getHTML();

      // if allowAttributes or allowedTags aren't passed
      // then use defaults from sanitize-html by not passing that key in the options
      // https://github.com/apostrophecms/sanitize-html

      const options = {};

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
        <RichTextEditorMenuBar
          availableActions={availableActions}
          editor={editor}
        />
        <EditorContent
          className={classNames(
            className,
            'RichTextEditor__field',
            { 'RichTextEditor__field--error': hasErrors },
          )}
          editor={editor}
          {...rest} // pass along ARIA attributes
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
};

RichTextEditor.propTypes = {
  /**
   HTML attributes to allow while sanitizing the editor's content.
   If none provided then it uses sanitize-html's defaults
   https://github.com/apostrophecms/sanitize-html#default-options
  */
  allowedAttributes: propTypes.array,
  /**
   HTML tags to allow while sanitizing the editor's content.
   If none provided then it uses sanitize-html's defaults
   https://github.com/apostrophecms/sanitize-html#default-options
  */
  allowedTags: propTypes.array,
  /**
   Which actions to include in the taskbar. Available as constants.
   Current options are BOLD, ITALIC, LINK, UNLINK, UNORDERED_LIST and ORDERED_LIST
  */
  availableActions: propTypes.arrayOf(propTypes.oneOf(AllRteActions)),
  characterLimit: propTypes.number,
  className: propTypes.string,
  hasErrors: propTypes.bool,
  id: propTypes.string.isRequired,
  /**
   HTML provided to initialize the editor's content
  */
  initialValue: propTypes.string,
  isOneLine: propTypes.bool,
  placeholder: propTypes.string,
  /**
    Callback function to call with sanitized HTML when editor state changes
  */
  onChange: propTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  allowedAttributes: undefined,
  allowedTags: undefined,
  availableActions: DefaultRteActions,
  characterLimit: undefined,
  className: undefined,
  hasErrors: false,
  initialValue: undefined,
  isOneLine: false,
  placeholder: undefined,
};

export default RichTextEditor;
