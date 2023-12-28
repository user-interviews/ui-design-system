/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import tippy from 'tippy.js';

import React, {
  forwardRef, useEffect, useImperativeHandle,
  useState,
} from 'react';
import { mergeAttributes, Node } from '@tiptap/core';
import { DOMOutputSpec, Node as ProseMirrorNode } from '@tiptap/pm/model';
import { PluginKey } from '@tiptap/pm/state';
import Suggestion, { SuggestionOptions } from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';

import './TemplateVariable.scss';

export type TemplateVariableOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
  renderText: (props: { options: TemplateVariableOptions; node: ProseMirrorNode }) => string;
  renderHTML: (props: { options: TemplateVariableOptions; node: ProseMirrorNode }) => DOMOutputSpec;
  suggestion: Omit<SuggestionOptions, 'editor'>;
}

export const TemplateVariablePluginKey = new PluginKey('template_variable');

export const TemplateVariable = Node.create<TemplateVariableOptions>({
  name: 'template_variable',

  addOptions() {
    return {
      HTMLAttributes: {},
      renderText({ node }) {
        return `{{ ${node.attrs.label ?? node.attrs.id} }}`;
      },
      renderHTML({ node }) {
        return [
          'span',
          this.HTMLAttributes,
          `{{ ${node.attrs.label ?? node.attrs.id} }}`,
        ];
      },
      suggestion: {
        char: '/',
        pluginKey: TemplateVariablePluginKey,
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const { nodeAfter } = editor.view.state.selection.$to;
          const overrideSpace = nodeAfter?.text?.startsWith(' ');

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: 'text',
                text: ' ',
              },
            ])
            .run();

          window.getSelection()?.collapseToEnd();
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }

          return {
            'data-id': attributes.id,
          };
        },
      },

      label: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-label'),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            'data-label': attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const html = this.options.renderHTML({
      options: this.options,
      node,
    });

    if (typeof html === 'string') {
      return [
        'span',
        mergeAttributes({ 'data-type': this.name }, this.options.HTMLAttributes, HTMLAttributes),
        html,
      ];
    }
    return html;
  },

  renderText({ node }) {
    return this.options.renderText({
      options: this.options,
      node,
    });
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isTemplateVariable = false;
        const { selection } = state;
        const { empty, anchor } = selection;

        if (!empty) {
          return false;
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isTemplateVariable = true;
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize);

            return false;
          }

          return undefined;
        });

        return isTemplateVariable;
      }),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

type TemplateVariableListProps = {
  items: string[];
  command: (arg0: {id: string}) => void;
}

export const TemplateVariableList = forwardRef((props: TemplateVariableListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="RichTextEditor__TemplateVariables__Items">
      {props.items.length ?
        props.items.map((item, index) => (
          <button
            className={`RichTextEditor__TemplateVariables__Item ${index === selectedIndex ? 'RichTextEditor__TemplateVariables__Item--selected' : ''}`}
            key={index}
            type="button"
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        )) :
        <div className="RichTextEditor__TemplateVariables__Item">No variables found</div>}
    </div>
  );
});

export function buildSuggestions(variables: string[]) {
  return {
    items: ({ query }) => variables
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase())),

    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(TemplateVariableList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          popup = tippy('body', {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
          });
        },

        onUpdate(props) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props) {
          if (props.event.key === 'Escape') {
            popup[0].hide();

            return true;
          }

          return component.ref?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
        },
      };
    },
  };
}
