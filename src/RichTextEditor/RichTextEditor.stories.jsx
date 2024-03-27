import React, { useRef } from 'react';

import Button from 'src/Button';
import { RichTextEditor, RichTextEditorActions } from 'src/RichTextEditor';

import mdx from './RichTextEditor.mdx';

export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <RichTextEditor
    id="text-editor"
    onChange={() => null}
  />
);

export const ARIAAttributes = () => (
  <RichTextEditor
    ariaAttributes={{ 'aria-label': 'Rich Text Editor', 'aria-required': true }}
    id="text-editor"
    onChange={() => null}
  />
);

export const AvailableActions = () => (
  <RichTextEditor
    availableActions={[RichTextEditorActions.BOLD, RichTextEditorActions.ITALIC]}
    id="text-editor"
    onChange={() => null}
  />
);

export const CharacterLimit = () => (
  <RichTextEditor
    characterLimit={140}
    id="text-editor"
    onChange={() => null}
  />
);

export const OneLine = () => (
  <RichTextEditor
    id="text-editor"
    isOneLine
    onChange={() => null}
  />
);

export const Error = () => (
  <RichTextEditor
    hasErrors
    id="text-editor"
    onChange={() => null}
  />
);

export const SetContent = () => {
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.setContent('Oh hey');
  };

  return (
    <>
      <Button onClick={handleClick}>Set content to "Oh hey"</Button>
      <RichTextEditor
        id="text-editor"
        ref={ref}
        onChange={() => null}
      />
    </>
  );
};
