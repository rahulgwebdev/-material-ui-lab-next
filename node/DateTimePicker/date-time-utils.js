"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDateAndTime = validateDateAndTime;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _dateUtils = require("../internal/pickers/date-utils");

var _timeUtils = require("../internal/pickers/time-utils");

function validateDateAndTime(utils, value, _ref) {
  let {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  } = _ref,
      timeValidationProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"]);
  const dateValidationResult = (0, _dateUtils.validateDate)(utils, value, {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return (0, _timeUtils.validateTime)(utils, value, timeValidationProps);
}