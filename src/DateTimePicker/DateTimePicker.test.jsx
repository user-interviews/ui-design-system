import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker from './DateTimePicker';

const PLACEHOLDER = 'YYYY-MM-DD';

const VALID_DATE = '1999-12-31';
const INVALID_DATE = '99999';

const enterDateValue = (dateInput) => {
  userEvent.click(screen.getByPlaceholderText(PLACEHOLDER));
  userEvent.keyboard(`${dateInput}{enter}`);
};

describe('DateTimePicker', () => {
  function Setup(overrides = {}) {
    return (
      <DateTimePicker
        {...overrides}
      />
    );
  }

  describe('when initializing', () => {
    describe('when passed a (date) prop', () => {
      it('sets input value', () => {
        render(<Setup date={VALID_DATE} />);

        expect(screen.getByDisplayValue(VALID_DATE)).toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    describe('when typing in date', () => {
      describe('with a valid value', () => {
        it('keeps value', () => {
          render(<Setup />);

          enterDateValue(VALID_DATE);

          expect(screen.getByDisplayValue(VALID_DATE)).toBeInTheDocument();
        });
      });

      describe('with an invalid value', () => {
        it('clears value', () => {
          render(<Setup />);

          enterDateValue(INVALID_DATE);

          expect(screen.getByPlaceholderText(PLACEHOLDER).value).toBe('');
        });
      });
    });
  });
});
