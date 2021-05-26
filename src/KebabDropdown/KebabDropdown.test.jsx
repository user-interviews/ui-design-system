import React from 'react';

import { render } from '@testing-library/react';

import KebabDropdown from './KebabDropdown';

describe('KebabDropdown', () => {
  const ariaLabel = 'Test options';
  const dropdownContent = 'Hello World';

  it('renders the expected snapshot', () => {
    const { container } = render(
      <KebabDropdown {...{ ariaLabel }}>
        <div>{dropdownContent}</div>
      </KebabDropdown>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  xit('shows and hides the dropdown on click', () => {
    // TODO: Test show/hide which does not work without supporting css/js
    // const dropDownButton = screen.queryByLabelIfText(ariaLabel);
  });
});
