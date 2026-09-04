import React, { useEffect, useRef, useState } from 'react';

import { RichTextEditor, RichTextEditorActions } from '.';
import Button from '../Button';
import { type RichTextEditorRef } from './RichTextEditor';
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
  return <RichTextEditor id="text-editor" onChange={() => null} />;
}

export function ARIAAttributes() {
  return (
    <RichTextEditor
      ariaAttributes={{
        'aria-label': 'Rich Text Editor',
        'aria-required': true,
      }}
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function AvailableActions() {
  return (
    <RichTextEditor
      availableActions={[
        RichTextEditorActions.BOLD,
        RichTextEditorActions.ITALIC,
      ]}
      id="text-editor"
      onChange={() => null}
    />
  );
}

export function LinkOnlyActions() {
  return (
    <RichTextEditor
      availableActions={[RichTextEditorActions.LINK]}
      id="link-only-editor"
      initialValue="<p>Select this text and add a link.</p>"
      onChange={() => null}
    />
  );
}

export function NoActions() {
  return (
    <RichTextEditor
      availableActions={[]}
      id="no-actions-editor"
      initialValue="<p>This editor has no formatting toolbar.</p>"
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
  return <RichTextEditor id="text-editor" isOneLine onChange={() => null} />;
}

export function EditableToggle() {
  const [editable, setEditable] = useState(false);

  return (
    <>
      <Button onClick={() => setEditable((current) => !current)}>
        {editable ? 'Make read-only' : 'Make editable'}
      </Button>
      <RichTextEditor
        editable={editable}
        id="editable-toggle-editor"
        initialValue="<p>Toggle the editor between read-only and editable.</p>"
        onChange={() => null}
      />
    </>
  );
}

export function InitialValueAndSanitization() {
  const [value, setValue] = useState('');

  return (
    <>
      <RichTextEditor
        allowedTags={['p']}
        id="initial-value-editor"
        initialValue="<p><strong>Hello</strong> from the initial value.</p><script>bad()</script>"
        onChange={setValue}
      />
      <p>Sanitized HTML:</p>
      <pre>{value}</pre>
    </>
  );
}

export function Error() {
  return <RichTextEditor hasErrors id="text-editor" onChange={() => null} />;
}

export function SetContent() {
  const ref = useRef<RichTextEditorRef>(null);

  const handleClick = () => {
    if (ref.current && ref.current.setContent) ref.current.setContent('Oh hey');
  };

  return (
    <>
      <Button onClick={handleClick}>Set content to "Oh hey"</Button>
      <RichTextEditor id="text-editor" ref={ref} onChange={() => null} />
    </>
  );
}

export function SetContentBeforeEditorReady() {
  const ref = useRef<RichTextEditorRef>(null);

  useEffect(() => {
    ref.current?.setContent(
      '<p>This content was queued before the editor was ready.</p>',
    );
  }, []);

  return (
    <RichTextEditor
      id="queued-content-editor"
      ref={ref}
      onChange={() => null}
    />
  );
}

export function ClearContentWithRef() {
  const ref = useRef<RichTextEditorRef>(null);

  return (
    <>
      <Button onClick={() => ref.current?.setContent(null)}>
        Clear content
      </Button>
      <RichTextEditor
        id="clear-content-editor"
        initialValue="<p>Clear this content with the button.</p>"
        ref={ref}
        onChange={() => null}
      />
    </>
  );
}
