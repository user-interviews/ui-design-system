import { render, screen } from '@testing-library/react';

import CheckboxButton from 'src/CheckboxButton';

describe('CheckboxButton', () => {
  it('does not force controlled mode when checked is omitted', () => {
    render(<CheckboxButton defaultChecked id="checkbox-button" />);

    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();
    expect(input).not.toHaveAttribute('checked');
  });
});
