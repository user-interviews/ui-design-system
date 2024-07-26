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

export const NotEditable = () => (
  <RichTextEditor
    editable={false}
    id="text-editor"
    onChange={() => null}
  />
);

export const DisplayMode = () => (
  <RichTextEditor
    displayMode
    id="text-editor"
    initialValue="<p><b>My rich text</b></p><p>asda sda sdad sdasdasd</p>"
    onChange={() => {}}
  />
);

export const DisplayModeWithCharacterLimitAbove = () => (
  <RichTextEditor
    characterLimit={20}
    displayMode
    id="text-editor"
    initialValue="<p><b>My rich text</b></p><p>asda sda sdad sdasdasd</p>"
    onChange={() => {}}
  />
);

export const DisplayModeWithCharacterLimitBelow = () => (
  <RichTextEditor
    characterLimit={100}
    displayMode
    id="text-editor"
    initialValue="<p><b>My rich text</b></p><p>asda sda sdad sdasdasd</p>"
    onChange={() => {}}
  />
);

export const SetContent = () => {
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
};
