import React from 'react';

import { expect, fn, within } from 'storybook/test';

import { DateTimePicker } from '.';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const VALID_DATE = '1999-12-31';
const INVALID_DATE = '99999';
const VALID_TIME = '02:00 PM';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EnforcedInput: Story = {
  args: { showPickerEnforcedInput: true },
};

export const ShowMonthAndYearSelects: Story = {
  args: { showMonthAndYearSelects: true },
};

export const ShowTimeSelect: Story = {
  args: { showTimeSelect: true },
};

export const TypedDate: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText('YYYY-MM-DD');

    await userEvent.type(input, `${VALID_DATE}{enter}`);
    await expect(input).toHaveValue(VALID_DATE);

    await userEvent.clear(input);
    await userEvent.type(input, `${INVALID_DATE}{enter}`);
    await expect(input).toHaveValue('');
  },
};

export const TimeSelection: Story = {
  args: {
    date: VALID_DATE,
    showTimeSelect: true,
    time: VALID_TIME,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByDisplayValue(`${VALID_DATE} ${VALID_TIME}`);
    await userEvent.click(input);

    const popper = document.body.querySelector('.react-datepicker-popper');
    if (!popper) throw new Error('Datepicker popper did not open');

    const firstAvailableDay = popper.querySelector<HTMLElement>(
      '.react-datepicker__day:not(.react-datepicker__day--outside-month)',
    );
    if (!firstAvailableDay) throw new Error('Datepicker has no selectable day');

    await userEvent.click(firstAvailableDay);
    await expect((input as HTMLInputElement).value).toMatch(
      /\d{4}-\d{2}-\d{2} \d{2}:\d{2} [AP]M/,
    );
  },
};

export const ModalPortal: Story = {
  args: {
    date: VALID_DATE,
    isWithinModal: true,
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByDisplayValue(VALID_DATE));

    const popper = within(document.body).queryByRole('dialog');
    await expect(popper).toBeInTheDocument();
    await expect(canvasElement.contains(popper)).toBe(false);
  },
};

export const CalendarClose: Story = {
  args: {
    date: VALID_DATE,
    onChangeDate: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByDisplayValue(VALID_DATE));
    await userEvent.keyboard('{Escape}');

    await expect(args.onChangeDate).toHaveBeenCalledWith({
      startDate: VALID_DATE,
      startTime: '',
    });
  },
};
