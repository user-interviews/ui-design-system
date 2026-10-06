import React from 'react';

import { render, screen } from '@testing-library/react';

import Button from './Button';

// Mimics Chrome's page translation, which swaps each text node for its own element.
const translateTextNodes = (root: HTMLElement) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  textNodes.forEach((node) => {
    const font = document.createElement('font');
    font.textContent = node.textContent;
    node.replaceWith(font);
  });
};

describe('Button', () => {
  it('wraps text children so translation cannot detach them', () => {
    render(<Button>Confirm</Button>);

    expect(screen.getByRole('button', { name: 'Confirm' }).firstChild).toHaveProperty(
      'tagName',
      'SPAN',
    );
  });

  it('leaves element children unwrapped', () => {
    render(
      <Button>
        <strong>Confirm</strong>
      </Button>,
    );

    expect(screen.getByRole('button').firstChild).toHaveProperty('tagName', 'STRONG');
  });

  it('toggles isLoading on a translated page without throwing', () => {
    const { rerender } = render(<Button loadingText="Saving...">Confirm</Button>);
    translateTextNodes(screen.getByRole('button'));

    expect(() => {
      rerender(
        <Button isLoading loadingText="Saving...">
          Confirm
        </Button>,
      );
      translateTextNodes(screen.getByRole('button'));
      rerender(<Button loadingText="Saving...">Save & continue</Button>);
    }).not.toThrow();
  });
});
