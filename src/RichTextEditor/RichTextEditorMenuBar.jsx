import './RichTextEditorMenuBar.scss';

import React from 'react';
import * as propTypes from 'prop-types';

import classNames from 'classnames';

import Button from 'src/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBold,
  faItalic,
  faLink,
  faListOl,
  faListUl,
  faUnlink,
} from '@fortawesome/pro-regular-svg-icons';

import { RteActions, AllRteActions } from './richTextEditorActions';
import { createActionHandlers } from './actionHandlers';

const RichTextEditorMenuBar = ({
  availableActions,
  editor,
}) => {
  const actionHandlers = createActionHandlers(editor);

  const actions = [
    {
      name: RteActions.BOLD,
      disabled: availableActions.includes(RteActions.BOLD) && !editor.can()
        .chain()
        .focus()
        .toggleBold()
        .run(),
      onClick: actionHandlers.bold,
      icon: faBold,
    },
    {
      name: RteActions.ITALIC,
      disabled: availableActions.includes(RteActions.ITALIC) && !editor.can()
        .chain()
        .focus()
        .toggleItalic()
        .run(),
      onClick: actionHandlers.italic,
      icon: faItalic,
    },
    {
      name: RteActions.LINK,
      disabled: false,
      onClick: actionHandlers.link,
      icon: faLink,
    },
    {
      name: RteActions.UNLINK,
      disabled: availableActions.includes(RteActions.LINK) && !editor.isActive('link'),
      onClick: actionHandlers.unlink,
      icon: faUnlink,
    },
    {
      name: RteActions.UNORDERED_LIST,
      disabled: false,
      onClick: actionHandlers.unorderedList,
      icon: faListUl,
    },
    {
      name: RteActions.ORDERED_LIST,
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
            <Button
              className={classNames({ 'Button--active': editor.isActive(action.name) })}
              disabled={action.disabled}
              key={action.name}
              variant="transparent"
              onClick={action.onClick}
            >
              <FontAwesomeIcon icon={action.icon} />
            </Button>
          ))
      }
    </div>
  );
};

RichTextEditorMenuBar.propTypes = {
  availableActions: propTypes.arrayOf(propTypes.oneOf(AllRteActions)).isRequired,
  editor: propTypes.object.isRequired,
};

export default RichTextEditorMenuBar;
