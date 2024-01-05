// a TipTap extension which forces the top node of the editor to not have children
// which enforces the content being one line long

import { Node } from '@tiptap/core';

export const OneLineLimit = Node.create({
  name: 'oneLineLimit',
  topNode: true,
  content: 'block',
});
