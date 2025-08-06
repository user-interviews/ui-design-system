import type { Editor } from '@tiptap/core';

export const createActionHandlers = (editor: Editor) => ({
  link: () => {
    // TODO: use DS components for link prompt
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return false;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetMark('link').run();

      return false;
    }

    const protocolRegex = /^http(s?):\/\//;
    const absoluteUrl = url.match(protocolRegex) ? url : `//${url}`;

    // update link
    editor.chain().focus().extendMarkRange('link').setMark('link', { href: absoluteUrl }).run();

    return false;
  },
  unlink: () => editor.chain().focus().unsetMark('link').run(),
  bold: () => editor.chain().focus().toggleMark('bold').run(),
  italic: () => editor.chain().focus().toggleMark('italic').run(),
  unorderedList: () => editor.chain().focus().toggleList('bulletList', 'listItem').run(),
  orderedList: () => editor.chain().focus().toggleList('orderedList', 'listItem').run(),
});
