import React from 'react';

import { useEditorState } from '@tiptap/react';
import classNames from 'classnames';

import {
  faBold,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faUnlink,
} from '../font_awesome/regular';
import IconButton from '../IconButton';
import { createActionHandlers } from './actionHandlers';
import { RichTextEditorActions } from './richTextEditorActions';

import type { Editor } from '@tiptap/core';

import './RichTextEditorMenuBar.scss';

type RichTextEditorMenuBarProps = {
  /** Subset of `RichTextEditorActions` to render (must align with parent editor extensions). */
  availableActions: (typeof RichTextEditorActions)[keyof typeof RichTextEditorActions][];
  /** Live TipTap instance for command handlers. */
  editor: Editor;
  /** Disables every control when false (`true` default). */
  editable?: boolean;
};

function RichTextEditorMenuBar({
  availableActions,
  editor,
  editable = true,
}: RichTextEditorMenuBarProps) {
  const actionHandlers = createActionHandlers(editor);
  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      canToggleBold:
        availableActions.includes(RichTextEditorActions.BOLD)
          ? currentEditor.can().chain().focus().toggleBold().run()
          : false,
      canToggleItalic:
        availableActions.includes(RichTextEditorActions.ITALIC)
          ? currentEditor.can().chain().focus().toggleItalic().run()
          : false,
      isBoldActive: currentEditor.isActive(RichTextEditorActions.BOLD),
      isItalicActive: currentEditor.isActive(RichTextEditorActions.ITALIC),
      isLinkActive: currentEditor.isActive(RichTextEditorActions.LINK),
      isOrderedListActive: currentEditor.isActive(
        RichTextEditorActions.ORDERED_LIST,
      ),
      isUnorderedListActive: currentEditor.isActive(
        RichTextEditorActions.UNORDERED_LIST,
      ),
    }),
  });

  const actions = [
    {
      label: 'Bold',
      name: RichTextEditorActions.BOLD,
      disabled: !editable || !editorState.canToggleBold,
      onClick: actionHandlers.bold,
      icon: faBold,
      active: editorState.isBoldActive,
    },
    {
      label: 'Italic',
      name: RichTextEditorActions.ITALIC,
      disabled: !editable || !editorState.canToggleItalic,
      onClick: actionHandlers.italic,
      icon: faItalic,
      active: editorState.isItalicActive,
    },
    {
      label: 'Link',
      name: RichTextEditorActions.LINK,
      disabled: !editable,
      onClick: actionHandlers.link,
      icon: faLink,
      active: editorState.isLinkActive,
    },
    {
      label: 'Unlink',
      name: RichTextEditorActions.UNLINK,
      disabled:
        !editable ||
        (availableActions.includes(RichTextEditorActions.LINK) &&
          !editorState.isLinkActive),
      onClick: actionHandlers.unlink,
      icon: faUnlink,
      active: false,
    },
    {
      label: 'Unordered List',
      name: RichTextEditorActions.UNORDERED_LIST,
      disabled: !editable,
      onClick: actionHandlers.unorderedList,
      icon: faListUl,
      active: editorState.isUnorderedListActive,
    },
    {
      label: 'Ordered List',
      name: RichTextEditorActions.ORDERED_LIST,
      disabled: !editable,
      onClick: actionHandlers.orderedList,
      icon: faListOl,
      active: editorState.isOrderedListActive,
    },
  ];

  return (
    <div className="RichTextEditorMenuBar">
      {actions
        .filter((action) => availableActions.includes(action.name))
        .map((action) => (
          <IconButton
            ariaLabel={action.label}
            className={classNames({
              'Button--active': action.active,
            })}
            disabled={action.disabled}
            icon={action.icon}
            key={action.name}
            onClick={action.onClick}
          />
        ))}
    </div>
  );
}

export default RichTextEditorMenuBar;
