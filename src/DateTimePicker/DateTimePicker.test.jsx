import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker from './DateTimePicker';

const PLACEHOLDER = 'YYYY-MM-DD';

const VALID_DATE = '1999-12-31';
const INVALID_DATE = '99999';

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
        it('keeps value', async () => {
          render(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          userEvent.type(input, `${VALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue(VALID_DATE);
          });
        });
      });

      describe('with an invalid value', () => {
        it('clears value', async () => {
          render(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          userEvent.type(input, `${INVALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue('');
          });
        });
      });
    });
  });
});
