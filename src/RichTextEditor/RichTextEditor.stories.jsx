import React from 'react';

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

export const TemplateVariables = () => (
  <RichTextEditor
    id="text-editor"
    placeholder="Enter / to view available variables"
    templateVariables={['howdy', 'ho']}
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
