import React, { useCallback, useState, useEffect } from 'react';
import DatePicker, { getDefaultLocale, registerLocale, setDefaultLocale } from 'react-datepicker';
import {
  format,
  isDate,
  isValid,
  parse,
  parseISO,
} from 'date-fns';

import {
  enAU, enCA, enGB, enUS, enZA, fr, frCA, de,
} from 'date-fns/locale';

import { PickerEnforcedInput } from './PickerEnforcedInput';

import './DateTimePicker.scss';

const localeMap = {
  'en-US': enUS,
  'en-CA': enCA,
  'en-GB': enGB,
  'en-AU': enAU,
  'en-ZA': enZA,
  de,
  'de-DE': de,
  fr,
  'fr-CA': frCA,
  'fr-FR': fr,
};

const STANDARD_TIME_FORMAT_FNS = 'hh:mm aa';
const ISO_DATE_FORMAT_FNS = 'yyyy-MM-dd';

type DateTimePickerProps = {
  date?: string;
  dateFormat?: string;
  dateViewMode?: string;
  disabled?: boolean;
  id?: string;
  inputClassName?: string;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  showPickerEnforcedInput?: boolean;
  showTimeSelect?: boolean;
  time?: string;
  timeFormat?: string;
  onChangeDate?: (...args: unknown[]) => unknown;
  onDateParseError?: (...args: unknown[]) => unknown;
};

function DateTimePicker({
  date = '',
  dateFormat = ISO_DATE_FORMAT_FNS,
  dateViewMode,
  disabled = false,
  id,
  inputClassName = 'form-control',
  maxDate,
  minDate,
  name,
  showPickerEnforcedInput = false,
  showTimeSelect = false,
  time = '',
  timeFormat = STANDARD_TIME_FORMAT_FNS,
  onChangeDate,
  onDateParseError,
}: DateTimePickerProps) {
  const [startDate, setStartDate] = useState(date); // string
  const [startTime, setStartTime] = useState(time); // string

  const parsedDateFromString = useCallback(() => {
    if (dateFormat === ISO_DATE_FORMAT_FNS) {
      return parseISO(startDate);
    }

    return parse(startDate, dateFormat, new Date());
  }, [dateFormat, startDate]);

  const getDateFormat = useCallback(() => {
    // if we are enforcing that users use the picker instead of typing
    // we want to use the localized date format (and not mess with times)
    // https://date-fns.org/v2.0.0-alpha.18/docs/format
    // https://github.com/Hacker0x01/react-datepicker/issues/3447#issuecomment-1034623173
    if (showPickerEnforcedInput) return 'P';

    if (showTimeSelect) {
      return `${dateFormat} ${timeFormat}`;
    }
    return dateFormat;
  }, [dateFormat, showPickerEnforcedInput, showTimeSelect, timeFormat]);

  // converts string values into a date object
  const dateFromString = useCallback(() => {
    if (typeof startDate === 'string' && startDate !== '') {
      if (showTimeSelect && startTime !== undefined) {
        return parse(`${startDate} ${startTime}`, getDateFormat(), new Date());
      }
      return parsedDateFromString();
    }
    return undefined;
  }, [getDateFormat, parsedDateFromString, showTimeSelect, startDate, startTime]);

  const resetDate = () => {
    setStartDate('');
    setStartTime('');
  };

  useEffect(() => {
    const localeLanguage = navigator.language;
    const supportedLocale = localeMap[localeLanguage];
    setStartDate(date);

    // register and set the locale if it is supported
    if (supportedLocale) {
      registerLocale(localeLanguage, supportedLocale);
      setDefaultLocale(localeLanguage);
    }
  }, [date]);

  const handleOnCalendarClose = () => {
    const updated = dateFromString();

    if (!onChangeDate || !startDate || !updated) return;

    if (!isValid(updated)) {
      if (onDateParseError) {
        onDateParseError(
          new Error(
            `bad date parse values in handleOnCalendarClose: date: ${startDate}, time: ${startTime}`,
          ),
        );
      }
      return;
    }

    const parsedTime = format(updated, timeFormat);
    const parsedDate = format(updated, dateFormat);

    const dateObj = { startDate: date, startTime: time };

    if (parsedDate !== date) {
      dateObj.startDate = parsedDate;
    }
    if (showTimeSelect && parsedTime !== time) {
      dateObj.startTime = parsedTime;
    }
    onChangeDate(dateObj);
  };

  const handleOnChange = (updatedDate) => {
    if (!isValid(updatedDate)) {
      resetDate();
      return;
    }

    const parsedDate = format(updatedDate, dateFormat);
    setStartDate(parsedDate);

    if (showTimeSelect) {
      const parsedTime = format(updatedDate, timeFormat);
      setStartTime(parsedTime);
    }
  };

  useEffect(() => {
    const parsedDate = dateFromString();

    if (isDate(parsedDate) && !isValid(parsedDate)) {
      resetDate();
    }
  }, [dateFromString, startDate, startTime]);

  return (
    <div className="date-time-picker">
      <DatePicker
        adjustDateOnChange
        allowSameDay
        className={showPickerEnforcedInput ? '' : 'date-time-picker__input-group'}
        customInput={showPickerEnforcedInput && (
          <PickerEnforcedInput
            disabled={disabled}
            inputClassName={inputClassName}
            name={name}
            startDate={startDate}
          />
        )}
        dateFormat={getDateFormat()}
        disabled={disabled}
        dropdownMode="select"
        id={id}
        locale={getDefaultLocale()}
        maxDate={maxDate}
        minDate={minDate}
        name={name}
        placeholderText={getDateFormat().toUpperCase()}
        selected={dateFromString()}
        showMonthDropdown={dateViewMode === 'years'}
        showTimeSelect={showTimeSelect}
        showYearDropdown={dateViewMode === 'years'}
        timeCaption="Time"
        timeFormat={timeFormat}
        timeIntervals={60}
        title={name}
        onCalendarClose={handleOnCalendarClose}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default DateTimePicker;
