"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePickerInputValue = parsePickerInputValue;
exports.parseRangeInputValue = parseRangeInputValue;
exports.validateDateRange = exports.validateDate = exports.isEndOfRange = exports.isStartOfRange = exports.isWithinRange = exports.isRangeValid = exports.getFormatAndMaskByViews = exports.isYearAndMonthViews = exports.isYearOnlyView = exports.findClosestEnabledDate = void 0;

var _utils = require("./utils");

const findClosestEnabledDate = ({
  date,
  utils,
  minDate,
  maxDate,
  disableFuture,
  disablePast,
  shouldDisableDate
}) => {
  const today = utils.startOfDay(utils.date());

  if (disablePast && utils.isBefore(minDate, today)) {
    minDate = today;
  }

  if (disableFuture && utils.isAfter(maxDate, today)) {
    maxDate = today;
  }

  let forward = date;
  let backward = date;

  if (utils.isBefore(date, minDate)) {
    forward = utils.date(minDate);
    backward = null;
  }

  if (utils.isAfter(date, maxDate)) {
    if (backward) {
      backward = utils.date(maxDate);
    }

    forward = null;
  }

  while (forward || backward) {
    if (forward && utils.isAfter(forward, maxDate)) {
      forward = null;
    }

    if (backward && utils.isBefore(backward, minDate)) {
      backward = null;
    }

    if (forward) {
      if (!shouldDisableDate(forward)) {
        return forward;
      }

      forward = utils.addDays(forward, 1);
    }

    if (backward) {
      if (!shouldDisableDate(backward)) {
        return backward;
      }

      backward = utils.addDays(backward, -1);
    }
  } // fallback to today if no enabled days


  return utils.date();
};

exports.findClosestEnabledDate = findClosestEnabledDate;

const isYearOnlyView = views => views.length === 1 && views[0] === 'year';

exports.isYearOnlyView = isYearOnlyView;

const isYearAndMonthViews = views => views.length === 2 && (0, _utils.arrayIncludes)(views, 'month') && (0, _utils.arrayIncludes)(views, 'year');

exports.isYearAndMonthViews = isYearAndMonthViews;

const getFormatAndMaskByViews = (views, utils) => {
  if (isYearOnlyView(views)) {
    return {
      mask: '____',
      inputFormat: utils.formats.year
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear
    };
  }

  return {
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate
  };
};

exports.getFormatAndMaskByViews = getFormatAndMaskByViews;

function parsePickerInputValue(utils, value) {
  const parsedValue = utils.date(value);
  return utils.isValid(parsedValue) ? parsedValue : null;
}

function parseRangeInputValue(utils, value = [null, null]) {
  return value.map(date => !utils.isValid(date) || date === null ? null : utils.startOfDay(utils.date(date)));
}

const isRangeValid = (utils, range) => {
  return Boolean(range && range[0] && range[1] && !utils.isBefore(range[1], range[0]));
};

exports.isRangeValid = isRangeValid;

const isWithinRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isWithinRange(day, range);
};

exports.isWithinRange = isWithinRange;

const isStartOfRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[0]);
};

exports.isStartOfRange = isStartOfRange;

const isEndOfRange = (utils, day, range) => {
  return isRangeValid(utils, range) && utils.isSameDay(day, range[1]);
};

exports.isEndOfRange = isEndOfRange;

const validateDate = (utils, value, {
  minDate,
  maxDate,
  disableFuture,
  shouldDisableDate,
  disablePast
}) => {
  const now = utils.date();
  const date = utils.date(value);

  if (date === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(shouldDisableDate && shouldDisableDate(date)):
      return 'shouldDisableDate';

    case Boolean(disableFuture && utils.isAfterDay(date, now)):
      return 'disableFuture';

    case Boolean(disablePast && utils.isBeforeDay(date, now)):
      return 'disablePast';

    case Boolean(minDate && utils.isBeforeDay(date, minDate)):
      return 'minDate';

    case Boolean(maxDate && utils.isAfterDay(date, maxDate)):
      return 'maxDate';

    default:
      return null;
  }
};

exports.validateDate = validateDate;

const validateDateRange = (utils, value, dateValidationProps) => {
  const [start, end] = value; // for partial input

  if (start === null || end === null) {
    return [null, null];
  }

  const dateValidations = [validateDate(utils, start, dateValidationProps), validateDate(utils, end, dateValidationProps)];

  if (dateValidations[0] || dateValidations[1]) {
    return dateValidations;
  }

  if (!isRangeValid(utils, [utils.date(start), utils.date(end)])) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};

exports.validateDateRange = validateDateRange;