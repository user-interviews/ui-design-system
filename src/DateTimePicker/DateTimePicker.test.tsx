import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker, { DateTimePickerProps } from './DateTimePicker';

const PLACEHOLDER = 'YYYY-MM-DD';

const VALID_DATE = '1999-12-31';
const VALID_DATE_CUSTOM_FORMAT = '12/31/1999';
const INVALID_DATE = '99999';
const VALID_TIME = '02:00 PM';

describe('DateTimePicker', () => {
  // react-datepicker 9.x uses ResizeObserver in its Time component (for calendar height).
  // jsdom does not implement ResizeObserver, so we mock it here for these tests.
  beforeAll(() => {
    if (typeof globalThis.ResizeObserver === 'undefined') {
      globalThis.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
  });

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

      it('parses custom dateFormat', async () => {
        await renderAndFlush(
          <Setup
            date={VALID_DATE_CUSTOM_FORMAT}
            dateFormat="MM/dd/yyyy"
          />
        );

        expect(
          screen.getByDisplayValue(VALID_DATE_CUSTOM_FORMAT)
        ).toBeInTheDocument();
      });
    });

    describe('when passed date and time with showTimeSelect', () => {
      it('sets input value with date and time', async () => {
        await renderAndFlush(
          <Setup
            date={VALID_DATE}
            showTimeSelect
            time={VALID_TIME}
          />
        );

        expect(
          screen.getByDisplayValue(`${VALID_DATE} ${VALID_TIME}`)
        ).toBeInTheDocument();
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

    describe('when showTimeSelect is true', () => {
      it('updates date and time when user selects from calendar', async () => {
        await renderAndFlush(
          <Setup
            date={VALID_DATE}
            showTimeSelect
            time={VALID_TIME}
          />
        );

        const input = screen.getByDisplayValue(`${VALID_DATE} ${VALID_TIME}`);
        const user = userEvent.setup();
        await user.click(input);

        const popper = document.body.querySelector('.react-datepicker-popper');
        expect(popper).toBeInTheDocument();

        const firstAvailableDay = popper?.querySelector(
          '.react-datepicker__day:not(.react-datepicker__day--outside-month)'
        );
        if (firstAvailableDay) {
          await user.click(firstAvailableDay as HTMLElement);
        }

        await waitFor(() => {
          const inputEl = input as HTMLInputElement;
          expect(inputEl.value).toBeTruthy();
          expect(inputEl.value).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2} [AP]M/);
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

    describe('onCalendarClose', () => {
      it('calls onChangeDate with parsed date when calendar closes with valid date', async () => {
        const onChangeDate = jest.fn();
        await renderAndFlush(
          <Setup date={VALID_DATE} onChangeDate={onChangeDate} />
        );

        const input = screen.getByDisplayValue(VALID_DATE);
        const user = userEvent.setup();
        await user.click(input);
        await user.keyboard('{Escape}');

        await waitFor(() => {
          expect(onChangeDate).toHaveBeenCalledWith({
            startDate: VALID_DATE,
            startTime: '',
          });
        });
      });

    });

    describe('showPickerEnforcedInput', () => {
      it('renders PickerEnforcedInput with valid date', async () => {
        await renderAndFlush(
          <Setup date={VALID_DATE} showPickerEnforcedInput />
        );

        const input = screen.getByDisplayValue('12/31/1999');
        expect(input).toBeInTheDocument();
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
