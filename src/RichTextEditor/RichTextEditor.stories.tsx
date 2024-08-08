import React, { useRef } from 'react';

import Button from '../Button';
import { type RichTextEditorRef } from './RichTextEditor';
import { RichTextEditor, RichTextEditorActions } from '.';

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

export function Default() {
  return (
    <RichTextEditor
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function ARIAAttributes() {
  return (
    <RichTextEditor
      ariaAttributes={{ 'aria-label': 'Rich Text Editor', 'aria-required': true }}
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function AvailableActions() {
  return (
    <RichTextEditor
      availableActions={[RichTextEditorActions.BOLD, RichTextEditorActions.ITALIC]}
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function CharacterLimit() {
  return (
    <RichTextEditor
      characterLimit={140}
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function OneLine() {
  return (
    <RichTextEditor
      id="text-editor"
      isOneLine
      onChange={() => null}
    />
  );
}

export function Error() {
  return (
    <RichTextEditor
      hasErrors
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function SetContent() {
  const ref = useRef<RichTextEditorRef>(null);

  const handleClick = () => {
    if (ref.current && ref.current.setContent) ref.current.setContent('Oh hey');
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
}
