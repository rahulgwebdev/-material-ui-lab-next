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
export const styles = {
  arrowSwitcher: {
    position: 'absolute',
    right: 12,
    top: 15
  }
};

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
  const now = useNow();
  const utils = useUtils();
  const dateOrNow = date || now;
  const {
    meridiemMode,
    handleMeridiemChange
  } = useMeridiemMode(dateOrNow, ampm, onChange);
  const isTimeDisabled = React.useCallback((rawValue, viewType) => {
    if (date === null) {
      return false;
    }

    const validateTimeValue = getRequestedTimePoint => {
      const isAfterComparingFn = createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils);
      return Boolean(minTime && isAfterComparingFn(minTime, getRequestedTimePoint('end')) || maxTime && isAfterComparingFn(getRequestedTimePoint('start'), maxTime) || shouldDisableTime && shouldDisableTime(rawValue, viewType));
    };

    switch (viewType) {
      case 'hours':
        {
          const hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, ampm);
          return validateTimeValue(when => pipe(currentDate => utils.setHours(currentDate, hoursWithMeridiem), dateWithHours => utils.setMinutes(dateWithHours, when === 'start' ? 0 : 59), dateWithMinutes => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59))(date));
        }

      case 'minutes':
        return validateTimeValue(when => pipe(currentDate => utils.setMinutes(currentDate, rawValue), dateWithMinutes => utils.setSeconds(dateWithMinutes, when === 'start' ? 0 : 59))(date));

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
            const valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, ampm);
            onChange(utils.setHours(dateOrNow, valueWithMeridiem), isFinish);
          };

          return {
            onChange: handleHoursChange,
            value: utils.getHours(dateOrNow),
            children: getHourNumbers({
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
            children: getMinutesNumbers({
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
            children: getMinutesNumbers({
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