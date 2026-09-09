import React from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateTimePicker from './DateTimePicker';

import type { DateTimePickerProps } from './DateTimePicker';

const VALID_DATE = '1999-12-31';
const VALID_DATE_CUSTOM_FORMAT = '12/31/1999';
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
          <Setup date={VALID_DATE_CUSTOM_FORMAT} dateFormat="MM/dd/yyyy" />,
        );

        expect(
          screen.getByDisplayValue(VALID_DATE_CUSTOM_FORMAT),
        ).toBeInTheDocument();
      });
    });

    describe('when passed date and time with showTimeSelect', () => {
      it('sets input value with date and time', async () => {
        await renderAndFlush(
          <Setup date={VALID_DATE} showTimeSelect time={VALID_TIME} />,
        );

        expect(
          screen.getByDisplayValue(`${VALID_DATE} ${VALID_TIME}`),
        ).toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    describe('showPickerEnforcedInput', () => {
      it('renders PickerEnforcedInput with valid date', async () => {
        await renderAndFlush(
          <Setup date={VALID_DATE} showPickerEnforcedInput />,
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
            screen.queryByRole('button', { name: /close/i }),
          ).not.toBeInTheDocument();
        });
      });

      describe('when isClearable is true', () => {
        it('renders clear button when date is selected', async () => {
          await renderAndFlush(<Setup date={VALID_DATE} isClearable />);

          expect(
            screen.getByRole('button', { name: /close/i }),
          ).toBeInTheDocument();
        });

        it('calls onChangeDate with null values when cleared', async () => {
          const user = userEvent.setup();
          const onChangeDate = jest.fn();
          await renderAndFlush(
            <Setup date={VALID_DATE} isClearable onChangeDate={onChangeDate} />,
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
