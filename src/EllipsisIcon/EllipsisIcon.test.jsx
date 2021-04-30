import React from 'react';

import { render } from '@testing-library/react';

import EllipsisIcon from './EllipsisIcon';

describe('EllipsisIcon', () => {
  it('renders the expected snapshot', () => {
    const { container } = render(<EllipsisIcon />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('with a className set', () => {
    it('renders the expected snapshot', () => {
      const { container } = render(<EllipsisIcon className="hello-world" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
