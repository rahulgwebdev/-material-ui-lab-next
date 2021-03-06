"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _Clock = _interopRequireDefault(require("./Clock"));

var _utils = require("../internal/pickers/utils");

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _ClockNumbers = require("./ClockNumbers");

var _PickersArrowSwitcher = _interopRequireDefault(require("../internal/pickers/PickersArrowSwitcher"));

var _timeUtils = require("../internal/pickers/time-utils");

var _dateHelpersHooks = require("../internal/pickers/hooks/date-helpers-hooks");

const styles = {
  arrowSwitcher: {
    position: 'absolute',
    right: 12,
    top: 15
  }
};
exports.styles = styles;

const defaultGetClockLabelText = (view, time, adapter) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`;

const defaultGetMinutesClockNumberText = minutes => `${minutes} minutes`;

const defaultGetHoursClockNumberText = hours => `${hours} hours`;

const defaultGetSecondsClockNumberText = seconds => `${seconds} seconds`;
/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */


function ClockPicker(props) {
  const {
    allowKeyboardControl,
    ampm = false,
    ampmInClock = false,
    classes,
    components,
    componentsProps,
    date,
    disableIgnoringDatePartForTimeValidation = false,
    getClockLabelText = defaultGetClockLabelText,
    getHoursClockNumberText = defaultGetHoursClockNumberText,
    getMinutesClockNumberText = defaultGetMinutesClockNumberText,
    getSecondsClockNumberText = defaultGetSecondsClockNumberText,
    leftArrowButtonText = 'open previous view',
    maxTime,
    minTime,
    minutesStep = 1,
    nextViewAvailable,
    onChange,
    openNextView,
    openPreviousView,
    previousViewAvailable,
    rightArrowButtonText = 'open next view',
    shouldDisableTime,
    showViewSwitcher,
    view
  } = props;
  const now = (0, _useUtils.useNow)();
  const utils = (0, _useUtils.useUtils)();
  const dateOrNow = date || now;
  const {
    meridiemMode,
    handleMeridiemChange
  } = (0, _dateHelpersHooks.useMeridiemMode)(dateOrNow, ampm, onChange);
  const isTimeDisabled = React.useCallback((rawValue, viewType) => {
    if (date === null) {
      return false;
    }

    const validateTimeValue = getRequestedTimePoint => {
      const isAfterComparingFn = (0, _timeUtils.createIsAfterIgnoreDatePart)(disableIgnoringDatePartForTimeValidation, utils);
      return Boolean(minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end')) || maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime) || shouldDisableTime && shouldDisableTime(rawValue, viewType));
    };

    switch (viewType) {
      case 'hours':
        {
          const hoursWithMeridiem = (0, _timeUtils.convertValueToMeridiem)(rawValue, meridiemMode, ampm);
          return validateTimeValue(when => (0, _utils.pipe)(currentDate => utils.setHours(currentDate, hoursWithMeridiem), dateWithHours => utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59), dateWithMinutes => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59))(date));
        }

      case 'minutes':
        return validateTimeValue(when => (0, _utils.pipe)(currentDate => utils.setMinutes(currentDate, rawValue), dateWithMinutes => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59))(date));

      case 'seconds':
        return validateTimeValue(() => utils.setSeconds(date, rawValue));

      default:
        throw new Error('not supported');
    }
  }, [ampm, date, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, shouldDisableTime, utils]);
  const viewProps = React.useMemo(() => {
    switch (view) {
      case 'hours':
        {
          const handleHoursChange = (value, isFinish) => {
            const valueWithMeridiem = (0, _timeUtils.convertValueToMeridiem)(value, meridiemMode, ampm);
            onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrNow),
            children: (0, _ClockNumbers.getHourNumbers)({
              date,
              utils,
              ampm,
              onChange: handleHoursChange,
              getClockNumberText: getHoursClockNumberText,
              isDisabled: value => isTimeDisabled(value, 'hours')
            })
          };
        }

      case 'minutes':
        {
          const minutesValue = utils.getMinutes(dateOrNow);

          const handleMinutesChange = (value, isFinish) => {
            onChange(utils.setMinutes(dateOrNow, value), isFinish);
          };

          return {
            value: minutesValue,
            onChange: handleMinutesChange,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: getMinutesClockNumberText,
              isDisabled: value => isTimeDisabled(value, 'minutes')
            })
          };
        }

      case 'seconds':
        {
          const secondsValue = utils.getSeconds(dateOrNow);

          const handleSecondsChange = (value, isFinish) => {
            onChange(utils.setSeconds(dateOrNow, value), isFinish);
          };

          return {
            value: secondsValue,
            onChange: handleSecondsChange,
            children: (0, _ClockNumbers.getMinutesNumbers)({
              utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: getSecondsClockNumberText,
              isDisabled: value => isTimeDisabled(value, 'seconds')
            })
          };
        }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [view, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, onChange, dateOrNow, isTimeDisabled]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showViewSwitcher && /*#__PURE__*/React.createElement(_PickersArrowSwitcher.default, {
    className: classes.arrowSwitcher,
    leftArrowButtonText: leftArrowButtonText,
    rightArrowButtonText: rightArrowButtonText,
    components: components,
    componentsProps: componentsProps,
    onLeftClick: openPreviousView,
    onRightClick: openNextView,
    isLeftDisabled: previousViewAvailable,
    isRightDisabled: nextViewAvailable
  }), /*#__PURE__*/React.createElement(_Clock.default, (0, _extends2.default)({
    date: date,
    ampmInClock: ampmInClock,
    type: view,
    ampm: ampm,
    getClockLabelText: getClockLabelText,
    minutesStep: minutesStep,
    allowKeyboardControl: allowKeyboardControl,
    isTimeDisabled: isTimeDisabled,
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  }, viewProps)));
}

process.env.NODE_ENV !== "production" ? ClockPicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Enables keyboard listener for moving between days in calendar.
   * Defaults to `true` unless the `ClockPicker` is used inside a `Static*` picker component.
   */
  allowKeyboardControl: _propTypes.default.bool,

  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: _propTypes.default.bool,

  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: _propTypes.default.bool,

  /**
   * @ignore
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   */
  components: _propTypes.default.shape({
    LeftArrowButton: _propTypes.default.elementType,
    LeftArrowIcon: _propTypes.default.elementType,
    RightArrowButton: _propTypes.default.elementType,
    RightArrowIcon: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside.
   */
  componentsProps: _propTypes.default.object,

  /**
   * Selected date @DateIOType.
   */
  date: _propTypes.default.any,

  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: _propTypes.default.bool,

  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: 'hours' | 'minutes' | 'seconds',
   *   time: TDate,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`
   */
  getClockLabelText: _propTypes.default.func,

  /**
   * Get clock number aria-text for hours.
   * @default (hours: string) => `${hours} hours`
   */
  getHoursClockNumberText: _propTypes.default.func,

  /**
   * Get clock number aria-text for minutes.
   * @default (minutes: string) => `${minutes} minutes`
   */
  getMinutesClockNumberText: _propTypes.default.func,

  /**
   * Get clock number aria-text for seconds.
   * @default (seconds: string) => `${seconds} seconds`
   */
  getSecondsClockNumberText: _propTypes.default.func,

  /**
   * Left arrow icon aria-label text.
   * @default 'open previous view'
   */
  leftArrowButtonText: _propTypes.default.string,

  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: _propTypes.default.any,

  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: _propTypes.default.any,

  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: _propTypes.default.number,

  /**
   * @ignore
   */
  nextViewAvailable: _propTypes.default.bool.isRequired,

  /**
   * On change callback @DateIOType.
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * @ignore
   */
  openNextView: _propTypes.default.func.isRequired,

  /**
   * @ignore
   */
  openPreviousView: _propTypes.default.func.isRequired,

  /**
   * @ignore
   */
  previousViewAvailable: _propTypes.default.bool.isRequired,

  /**
   * Right arrow icon aria-label text.
   * @default 'open next view'
   */
  rightArrowButtonText: _propTypes.default.string,

  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: _propTypes.default.func,

  /**
   * @ignore
   */
  showViewSwitcher: _propTypes.default.bool,

  /**
   * @ignore
   */
  view: _propTypes.default.oneOf(['hours', 'minutes', 'seconds']).isRequired
} : void 0;
/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiClockPicker'
})(ClockPicker);

exports.default = _default;