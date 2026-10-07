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

    expect(
      screen.getByRole('button', { name: 'Confirm' }).firstChild,
    ).toHaveProperty('tagName', 'SPAN');
  });

  it('leaves element children unwrapped', () => {
    render(
      <Button>
        <strong>Confirm</strong>
      </Button>,
    );

    expect(screen.getByRole('button').firstChild).toHaveProperty(
      'tagName',
      'STRONG',
    );
  });

  it('toggles isLoading on a translated page without throwing', () => {
    const { rerender } = render(
      <Button loadingText="Saving...">Confirm</Button>,
    );
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

  it('joins all-text children into one span, keeping the accessible name', () => {
    const count = 40;
    const { rerender } = render(
      <Button loadingText="Saving...">+{count} more</Button>,
    );
    const button = screen.getByRole('button', { name: '+40 more' });

    expect(button.childNodes).toHaveLength(1);
    expect(button.firstChild).toHaveProperty('tagName', 'SPAN');
    expect(button).toHaveTextContent('+40 more');

    translateTextNodes(button);

    expect(() => {
      rerender(
        <Button isLoading loadingText="Saving...">
          +{count} more
        </Button>,
      );
    }).not.toThrow();
  });

  it('wraps each text piece of mixed text and element children', () => {
    const { rerender } = render(
      <Button loadingText="Saving...">
        Save <strong>draft</strong> now
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(Array.from(button.childNodes).map((node) => node.nodeName)).toEqual([
      'SPAN',
      'STRONG',
      'SPAN',
    ]);

    translateTextNodes(button);

    expect(() => {
      rerender(
        <Button isLoading loadingText="Saving...">
          Save <strong>draft</strong> now
        </Button>,
      );
    }).not.toThrow();
  });
});
