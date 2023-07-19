import './RichTextEditorMenuBar.scss';

import React from 'react';
import * as propTypes from 'prop-types';

import classNames from 'classnames';

import IconButton from 'src/IconButton';

import {
  faBold,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faUnlink,
} from '@fortawesome/pro-regular-svg-icons';

import { RichTextEditorActions, RichTextEditorAllActionsArray } from './richTextEditorActions';
import { createActionHandlers } from './actionHandlers';

const RichTextEditorMenuBar = ({
  availableActions,
  editor,
}) => {
  const actionHandlers = createActionHandlers(editor);

  const actions = [
    {
      label: 'Bold',
      name: RichTextEditorActions.BOLD,
      disabled: availableActions.includes(RichTextEditorActions.BOLD) && !editor.can()
        .chain()
        .focus()
        .toggleBold()
        .run(),
      onClick: actionHandlers.bold,
      icon: faBold,
    },
    {
      label: 'Italic',
      name: RichTextEditorActions.ITALIC,
      disabled: availableActions.includes(RichTextEditorActions.ITALIC) && !editor.can()
        .chain()
        .focus()
        .toggleItalic()
        .run(),
      onClick: actionHandlers.italic,
      icon: faItalic,
    },
    {
      label: 'Link',
      name: RichTextEditorActions.LINK,
      disabled: false,
      onClick: actionHandlers.link,
      icon: faLink,
    },
    {
      label: 'Unlink',
      name: RichTextEditorActions.UNLINK,
      disabled: availableActions.includes(RichTextEditorActions.LINK) && !editor.isActive('link'),
      onClick: actionHandlers.unlink,
      icon: faUnlink,
    },
    {
      label: 'Unordered List',
      name: RichTextEditorActions.UNORDERED_LIST,
      disabled: false,
      onClick: actionHandlers.unorderedList,
      icon: faListUl,
    },
    {
      label: 'Ordered List',
      name: RichTextEditorActions.ORDERED_LIST,
      disabled: false,
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
};

RichTextEditorMenuBar.propTypes = {
  availableActions: propTypes.arrayOf(propTypes.oneOf(RichTextEditorAllActionsArray)).isRequired,
  editor: propTypes.object.isRequired,
};

export default RichTextEditorMenuBar;
