const hasNoHttpProtocol = (url) => url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0;

export const createActionHandlers = (editor) => ({
  link: () => {
    // TODO: use DS components for link prompt
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run();

      return;
    }

    const absoluteUrl = hasNoHttpProtocol(url) ? `//${url}` : url;

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: absoluteUrl })
      .run();
  },
  unlink: () => editor.chain().focus().unsetLink().run(),
  bold: () => editor.chain().focus().toggleBold().run(),
  italic: () => editor.chain().focus().toggleItalic().run(),
  unorderedList: () => editor.chain().focus().toggleBulletList().run(),
  orderedList: () => editor.chain().focus().toggleOrderedList().run(),
});
