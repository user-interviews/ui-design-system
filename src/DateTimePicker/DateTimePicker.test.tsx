import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker, { DateTimePickerProps } from './DateTimePicker';

const PLACEHOLDER = 'YYYY-MM-DD';

const VALID_DATE = '1999-12-31';
const INVALID_DATE = '99999';

describe('DateTimePicker', () => {
  function Setup(overrides: DateTimePickerProps) {
    return <DateTimePicker {...overrides} />;
  }

  async function renderAndFlush(ui: React.ReactElement) {
    let result: ReturnType<typeof render>;
    await act(async () => {
      result = render(ui);
      await Promise.resolve();
    });
    return result!;
  }

  describe('when initializing', () => {
    describe('when passed a (date) prop', () => {
      it('sets input value', async () => {
        await renderAndFlush(<Setup date={VALID_DATE} />);

        expect(screen.getByDisplayValue(VALID_DATE)).toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    describe('when typing in date', () => {
      describe('with a valid value', () => {
        it('keeps value', async () => {
          await renderAndFlush(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          const user = userEvent.setup();
          await user.type(input, `${VALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue(VALID_DATE);
          });
        });
      });

      describe('with an invalid value', () => {
        it('clears value', async () => {
          await renderAndFlush(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          const user = userEvent.setup();
          await user.type(input, `${INVALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue('');
          });
        });
      });
    });

    describe('when isWithinModal is true', () => {
      it('renders the datepicker popper in a portal', async () => {
        await renderAndFlush(<Setup date={VALID_DATE} isWithinModal />);

        const input = screen.getByDisplayValue(VALID_DATE);
        const user = userEvent.setup();
        await user.click(input);

        expect(
          document.body.querySelector('.react-datepicker-popper')
        ).toBeInTheDocument();
      });
    });

    describe('isClearable prop', () => {
      describe('when isClearable is false (default)', () => {
        it('does not render clear button', async () => {
          await renderAndFlush(<Setup date={VALID_DATE} />);

          expect(
            screen.queryByRole('button', { name: /close/i })
          ).not.toBeInTheDocument();
        });
      });

      describe('when isClearable is true', () => {
        it('renders clear button when date is selected', async () => {
          await renderAndFlush(<Setup date={VALID_DATE} isClearable />);

          expect(
            screen.getByRole('button', { name: /close/i })
          ).toBeInTheDocument();
        });

        it('calls onChangeDate with null values when cleared', async () => {
          const user = userEvent.setup();
          const onChangeDate = jest.fn();
          await renderAndFlush(
            <Setup date={VALID_DATE} isClearable onChangeDate={onChangeDate} />
          );

          const clearButton = screen.getByRole('button', { name: /close/i });
          await user.click(clearButton);

          await waitFor(() => {
            expect(onChangeDate).toHaveBeenCalledWith({
              startDate: null,
              startTime: null,
            });
          });
        });
      });
    });
  });
});
