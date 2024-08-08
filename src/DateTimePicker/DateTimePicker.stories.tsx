import React from 'react';

import { DateTimePicker } from '.';

export default {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
};

export function Default() {
  return <DateTimePicker />;
}

export function EnforcedInput() {
  return <DateTimePicker showPickerEnforcedInput />;
}

export function ShowMonthAndYearSelects() {
  return <DateTimePicker showMonthAndYearSelects />;
}

export function ShowTimeSelect() {
  return <DateTimePicker showTimeSelect />;
}
