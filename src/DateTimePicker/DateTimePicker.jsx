import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

// TODO log errors
// import { logError } from 'lib/logging';

import {
  STANDARD_TIME_FORMAT_FNS,
  ISO_DATE_FORMAT_FNS,
} from './constants';

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

function DateTimePicker({
  date,
  dateFormat,
  dateViewMode,
  disabled,
  id,
  inputClassName,
  maxDate,
  minDate,
  name,
  showPickerEnforcedInput,
  showTimeSelect,
  time,
  timeFormat,
  onChangeDate,
}) {
  const [startDate, setStartDate] = useState(date); // string
  const [startTime, setStartTime] = useState(time); // string

  const parsedDateFromString = useCallback(() => {
    if (dateFormat === ISO_DATE_FORMAT_FNS) {
      return parseISO(startDate, dateFormat);
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
    // we don't set the time here because it messes with
    // the hub filters for some reason
    setStartDate(date);

    // register and set the locale if it is supported
    if (supportedLocale) {
      registerLocale(localeLanguage, supportedLocale);
      setDefaultLocale(localeLanguage);
    }
  }, [date]);

  const handleOnCalendarClose = () => {
    if (!onChangeDate || !startDate) return;

    const updated = dateFromString();

    if (!isValid(updated)) {
      // TODO log error
      // logError(
      //   new Error(
      //     `bad date parse values in handleOnCalendarClose: date: ${startDate}, time: ${startTime}`,
      //   ),
      // );
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

DateTimePicker.propTypes = {
  date: PropTypes.string,
  dateFormat: PropTypes.string,
  dateViewMode: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  name: PropTypes.string,
  showPickerEnforcedInput: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  time: PropTypes.string,
  timeFormat: PropTypes.string,

  onChangeDate: PropTypes.func,
};

DateTimePicker.defaultProps = {
  date: '',
  dateFormat: ISO_DATE_FORMAT_FNS,
  dateViewMode: undefined,
  disabled: false,
  maxDate: undefined,
  minDate: undefined,
  id: undefined,
  inputClassName: 'form-control',
  name: undefined,
  showPickerEnforcedInput: false,
  showTimeSelect: false,
  time: '',
  timeFormat: STANDARD_TIME_FORMAT_FNS,

  onChangeDate: undefined,
};

export default DateTimePicker;
