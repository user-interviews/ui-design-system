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
import { TemplateVariable, buildSuggestions } from './TemplateVariable';

import RichTextEditorMenuBar from './RichTextEditorMenuBar';

import { OneLineLimit } from './oneLineLimit';

import { RichTextEditorActions, RichTextEditorAllActionsArray, RichTextEditorDefaultActionsArray } from './richTextEditorActions';
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
  ariaAttributes,
  availableActions,
  characterLimit,
  className,
  hasErrors,
  id,
  initialValue,
  isOneLine,
  onChange,
  placeholder,
  templateVariables,
}) => {
  const oneLineExtension = isOneLine ? [OneLineLimit] : [];
  const hasTemplateVariables = templateVariables.length > 0;

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

  const templateVariablesExtension = hasTemplateVariables ?
    [TemplateVariable.configure({
      HTMLAttributes: {
        class: 'RichTextEditor__TemplateVariable',
      },
      suggestion: buildSuggestions(templateVariables),
    })] : [];

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

  const extensions = [
    ...oneLineExtension,
    ...requiredExtensions,
    ...templateVariablesExtension,
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

      // When using template variables, we need to whitelist some specific attributes so that
      // the editor can re-initialize correctly from db state
      if (hasTemplateVariables) {
        options.allowedAttributes = {
          ...(options.allowedAttributes || {}),
          span: ['class', 'data-id', 'data-type'],
        };

        if (options.allowedTags && !options.allowedTags.includes('span')) {
          options.allowedTags.push(['span']);
        }
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
    ARIA attributes to pass along to the text editor field
    for accessibility purposes. The keys of the object should be valid
    ARIA attributes.
  */
  ariaAttributes: propTypes.object,
  /**
   Which actions to include in the taskbar. Available as constants.
   Current options are BOLD, ITALIC, LINK, UNLINK, UNORDERED_LIST and ORDERED_LIST
  */
  availableActions: propTypes.arrayOf(propTypes.oneOf(RichTextEditorAllActionsArray)),
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
  templateVariables: propTypes.arrayOf(propTypes.string),
  /**
    Callback function to call with sanitized HTML when editor state changes
  */
  onChange: propTypes.func.isRequired,
};

RichTextEditor.defaultProps = {
  allowedAttributes: undefined,
  allowedTags: undefined,
  ariaAttributes: undefined,
  availableActions: RichTextEditorDefaultActionsArray,
  characterLimit: undefined,
  className: undefined,
  hasErrors: false,
  initialValue: undefined,
  isOneLine: false,
  placeholder: undefined,
  templateVariables: [],
};

export default RichTextEditor;
