import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Clock from './Clock';
import { pipe } from '../internal/pickers/utils';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import PickersArrowSwitcher from '../internal/pickers/PickersArrowSwitcher';
import { convertValueToMeridiem, createIsAfterIgnoreDatePart } from '../internal/pickers/time-utils';
import { useMeridiemMode } from '../internal/pickers/hooks/date-helpers-hooks';
export var styles = {
  arrowSwitcher: {
    position: 'absolute',
    right: 12,
    top: 15
  }
};

var defaultGetClockLabelText = function defaultGetClockLabelText(view, time, adapter) {
  return "Select ".concat(view, ". Selected time is ").concat(adapter.format(time, 'fullTime'));
};

var defaultGetMinutesClockNumberText = function defaultGetMinutesClockNumberText(minutes) {
  return "".concat(minutes, " minutes");
};

var defaultGetHoursClockNumberText = function defaultGetHoursClockNumberText(hours) {
  return "".concat(hours, " hours");
};

var defaultGetSecondsClockNumberText = function defaultGetSecondsClockNumberText(seconds) {
  return "".concat(seconds, " seconds");
};
/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */


function ClockPicker(props) {
  var allowKeyboardControl = props.allowKeyboardControl,
      _props$ampm = props.ampm,
      ampm = _props$ampm === void 0 ? false : _props$ampm,
      _props$ampmInClock = props.ampmInClock,
      ampmInClock = _props$ampmInClock === void 0 ? false : _props$ampmInClock,
      classes = props.classes,
      components = props.components,
      componentsProps = props.componentsProps,
      date = props.date,
      _props$disableIgnorin = props.disableIgnoringDatePartForTimeValidation,
      disableIgnoringDatePartForTimeValidation = _props$disableIgnorin === void 0 ? false : _props$disableIgnorin,
      _props$getClockLabelT = props.getClockLabelText,
      getClockLabelText = _props$getClockLabelT === void 0 ? defaultGetClockLabelText : _props$getClockLabelT,
      _props$getHoursClockN = props.getHoursClockNumberText,
      getHoursClockNumberText = _props$getHoursClockN === void 0 ? defaultGetHoursClockNumberText : _props$getHoursClockN,
      _props$getMinutesCloc = props.getMinutesClockNumberText,
      getMinutesClockNumberText = _props$getMinutesCloc === void 0 ? defaultGetMinutesClockNumberText : _props$getMinutesCloc,
      _props$getSecondsCloc = props.getSecondsClockNumberText,
      getSecondsClockNumberText = _props$getSecondsCloc === void 0 ? defaultGetSecondsClockNumberText : _props$getSecondsCloc,
      _props$leftArrowButto = props.leftArrowButtonText,
      leftArrowButtonText = _props$leftArrowButto === void 0 ? 'open previous view' : _props$leftArrowButto,
      maxTime = props.maxTime,
      minTime = props.minTime,
      _props$minutesStep = props.minutesStep,
      minutesStep = _props$minutesStep === void 0 ? 1 : _props$minutesStep,
      nextViewAvailable = props.nextViewAvailable,
      onChange = props.onChange,
      openNextView = props.openNextView,
      openPreviousView = props.openPreviousView,
      previousViewAvailable = props.previousViewAvailable,
      _props$rightArrowButt = props.rightArrowButtonText,
      rightArrowButtonText = _props$rightArrowButt === void 0 ? 'open next view' : _props$rightArrowButt,
      shouldDisableTime = props.shouldDisableTime,
      showViewSwitcher = props.showViewSwitcher,
      view = props.view;
  var now = useNow();
  var utils = useUtils();
  var dateOrNow = date || now;

  var _useMeridiemMode = useMeridiemMode(dateOrNow, ampm, onChange),
      meridiemMode = _useMeridiemMode.meridiemMode,
      handleMeridiemChange = _useMeridiemMode.handleMeridiemChange;

  var isTimeDisabled = React.useCallback(function (rawValue, viewType) {
    if (date === null) {
      return false;
    }

    var validateTimeValue = function validateTimeValue(getRequestedTimePoint) {
      var isAfterComparingFn = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils);
      return Boolean(minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end')) || maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime) || shouldDisableTime && shouldDisableTime(rawValue, viewType));
    };

    switch (viewType) {
      case 'hours':
        {
          var hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
          return validateTimeValue(function (when) {
            return pipe(function (currentDate) {
              return utils.setHours(currentDate, hoursWithMeridiem);
            }, function (dateWithHours) {
              return utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59);
            }, function (dateWithMinutes) {
              return utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59);
            })(date);
          });
        }

      case 'minutes':
        return validateTimeValue(function (when) {
          return pipe(function (currentDate) {
            return utils.setMinutes(currentDate, rawValue);
          }, function (dateWithMinutes) {
            return utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59);
          })(date);
        });

      case 'seconds':
        return validateTimeValue(function () {
          return utils.setSeconds(date, rawValue);
        });

      default:
        throw new Error('not supported');
    }
  }, [ampm, date, disableIgnoringDatePartForTimeValidation, maxTime, meridiemMode, minTime, shouldDisableTime, utils]);
  var viewProps = React.useMemo(function () {
    switch (view) {
      case 'hours':
        {
          var handleHoursChange = function handleHoursChange(value, isFinish) {
            var valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, ampm);
            onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrNow),
            children: getHourNumbers({
              date: date,
              utils: utils,
              ampm: ampm,
              onChange: handleHoursChange,
              getClockNumberText: getHoursClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'hours');
              }
            })
          };
        }

      case 'minutes':
        {
          var minutesValue = utils.getMinutes(dateOrNow);

          var handleMinutesChange = function handleMinutesChange(value, isFinish) {
            onChange(utils.setMinutes(dateOrNow, value), isFinish);
          };

          return {
            value: minutesValue,
            onChange: handleMinutesChange,
            children: getMinutesNumbers({
              utils: utils,
              value: minutesValue,
              onChange: handleMinutesChange,
              getClockNumberText: getMinutesClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'minutes');
              }
            })
          };
        }

      case 'seconds':
        {
          var secondsValue = utils.getSeconds(dateOrNow);

          var handleSecondsChange = function handleSecondsChange(value, isFinish) {
            onChange(utils.setSeconds(dateOrNow, value), isFinish);
          };

          return {
            value: secondsValue,
            onChange: handleSecondsChange,
            children: getMinutesNumbers({
              utils: utils,
              value: secondsValue,
              onChange: handleSecondsChange,
              getClockNumberText: getSecondsClockNumberText,
              isDisabled: function isDisabled(value) {
                return isTimeDisabled(value, 'seconds');
              }
            })
          };
        }

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [view, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, onChange, dateOrNow, isTimeDisabled]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, showViewSwitcher && /*#__PURE__*/React.createElement(PickersArrowSwitcher, {
    className: classes.arrowSwitcher,
    leftArrowButtonText: leftArrowButtonText,
    rightArrowButtonText: rightArrowButtonText,
    components: components,
    componentsProps: componentsProps,
    onLeftClick: openPreviousView,
    onRightClick: openNextView,
    isLeftDisabled: previousViewAvailable,
    isRightDisabled: nextViewAvailable
  }), /*#__PURE__*/React.createElement(Clock, _extends({
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
  allowKeyboardControl: PropTypes.bool,

  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,

  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,

  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,

  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside.
   */
  componentsProps: PropTypes.object,

  /**
   * Selected date @DateIOType.
   */
  date: PropTypes.any,

  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,

  /**
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: 'hours' | 'minutes' | 'seconds',
   *   time: TDate,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) => `Select ${view}. Selected time is ${adapter.format(time, 'fullTime')}`
   */
  getClockLabelText: PropTypes.func,

  /**
   * Get clock number aria-text for hours.
   * @default (hours: string) => `${hours} hours`
   */
  getHoursClockNumberText: PropTypes.func,

  /**
   * Get clock number aria-text for minutes.
   * @default (minutes: string) => `${minutes} minutes`
   */
  getMinutesClockNumberText: PropTypes.func,

  /**
   * Get clock number aria-text for seconds.
   * @default (seconds: string) => `${seconds} seconds`
   */
  getSecondsClockNumberText: PropTypes.func,

  /**
   * Left arrow icon aria-label text.
   * @default 'open previous view'
   */
  leftArrowButtonText: PropTypes.string,

  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: PropTypes.any,

  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: PropTypes.any,

  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,

  /**
   * @ignore
   */
  nextViewAvailable: PropTypes.bool.isRequired,

  /**
   * On change callback @DateIOType.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * @ignore
   */
  openNextView: PropTypes.func.isRequired,

  /**
   * @ignore
   */
  openPreviousView: PropTypes.func.isRequired,

  /**
   * @ignore
   */
  previousViewAvailable: PropTypes.bool.isRequired,

  /**
   * Right arrow icon aria-label text.
   * @default 'open next view'
   */
  rightArrowButtonText: PropTypes.string,

  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,

  /**
   * @ignore
   */
  showViewSwitcher: PropTypes.bool,

  /**
   * @ignore
   */
  view: PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired
} : void 0;
/**
 *
 * API:
 *
 * - [ClockPicker API](https://material-ui.com/api/clock-picker/)
 */

export default withStyles(styles, {
  name: 'MuiClockPicker'
})(ClockPicker);