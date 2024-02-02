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
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run();

      return false;
    }

    const protocolRegex = /^http(s?):\/\//;
    const absoluteUrl = url.match(protocolRegex) ? url : `//${url}`;

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: absoluteUrl })
      .run();

    return false;
  },
  unlink: () => editor.chain().focus().unsetLink().run(),
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
  unorderedList: () => editor.chain().focus().toggleBulletList().run(),
  orderedList: () => editor.chain().focus().toggleOrderedList().run(),
});
