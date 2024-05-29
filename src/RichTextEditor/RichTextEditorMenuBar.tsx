import type { Editor } from '@tiptap/core';

import './RichTextEditorMenuBar.scss';

import React from 'react';
import classNames from 'classnames';

import {
  faBold,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faUnlink,
} from '@fortawesome/pro-regular-svg-icons';
import IconButton from '../IconButton';

import { RichTextEditorActions } from './richTextEditorActions';
import { createActionHandlers } from './actionHandlers';

type RichTextEditorMenuBarProps = {
  availableActions: typeof RichTextEditorActions[keyof typeof RichTextEditorActions][];
  editor: Editor;
  editable?: boolean
}

function RichTextEditorMenuBar({
  availableActions,
  editor,
  editable = true,
}: RichTextEditorMenuBarProps) {
  const actionHandlers = createActionHandlers(editor);

  const actions = [
    {
      label: 'Bold',
      name: RichTextEditorActions.BOLD,
      disabled: !editable || (
        availableActions.includes(RichTextEditorActions.BOLD) && !editor.can()
          .chain()
          .focus()
          .toggleBold()
          .run()
        ),
      onClick: actionHandlers.bold,
      icon: faBold,
    },
    {
      label: 'Italic',
      name: RichTextEditorActions.ITALIC,
      disabled: !editable || (
        availableActions.includes(RichTextEditorActions.ITALIC) && !editor.can()
          .chain()
          .focus()
          .toggleItalic()
          .run()
        ),
      onClick: actionHandlers.italic,
      icon: faItalic,
    },
    {
      label: 'Link',
      name: RichTextEditorActions.LINK,
      disabled: !editable,
      onClick: actionHandlers.link,
      icon: faLink,
    },
    {
      label: 'Unlink',
      name: RichTextEditorActions.UNLINK,
      disabled: !editable || (availableActions.includes(RichTextEditorActions.LINK) && !editor.isActive('link')),
      onClick: actionHandlers.unlink,
      icon: faUnlink,
    },
    {
      label: 'Unordered List',
      name: RichTextEditorActions.UNORDERED_LIST,
      disabled: !editable,
      onClick: actionHandlers.unorderedList,
      icon: faListUl,
    },
    {
      label: 'Ordered List',
      name: RichTextEditorActions.ORDERED_LIST,
      disabled: !editable,
      onClick: actionHandlers.orderedList,
      icon: faListOl,
    },
  ];

  return (
    <div className="RichTextEditorMenuBar">
      {
        actions
          .filter((action) => availableActions.includes(action.name))
          .map((action) => (
            <IconButton
              ariaLabel={action.label}
              className={classNames({ 'Button--active': editor.isActive(action.name) })}
              disabled={action.disabled}
              icon={action.icon}
              key={action.name}
              onClick={action.onClick}
            />
          ))
      }
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default RichTextEditorMenuBar;
