import React from 'react';

import { DateTimePicker } from '.';

export default {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
};

export const Default = () => (
  <DateTimePicker />
  );

export const EnforcedInput = () => (
  <DateTimePicker showPickerEnforcedInput />
  );

export const ShowMonthAndYearSelects = () => (
  <DateTimePicker showMonthAndYearSelects />
  );

export const ShowTimeSelect = () => (
  <DateTimePicker showTimeSelect />
  );
