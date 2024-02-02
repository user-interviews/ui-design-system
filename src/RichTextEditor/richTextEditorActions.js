export const RichTextEditorActions = {
  BOLD: 'bold',
  ITALIC: 'italic',
  LINK: 'link',
  UNLINK: 'unlink',
  UNORDERED_LIST: 'bulletList',
  ORDERED_LIST: 'orderedList',
};

// currently the default is to include all of the actions
// that won't necessarily be the case in the future as more actions are added
export const RichTextEditorAllActionsArray = Object.values(RichTextEditorActions);
export const RichTextEditorDefaultActionsArray = Object.values(RichTextEditorActions);
