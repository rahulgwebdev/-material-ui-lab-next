"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCalendarState = useCalendarState;
exports.createCalendarStateReducer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _dateUtils = require("../internal/pickers/date-utils");

var _useUtils = require("../internal/pickers/hooks/useUtils");

const createCalendarStateReducer = (reduceAnimations, disableSwitchToMonthOnDayFocus, utils) => (state, action) => {
  switch (action.type) {
    case 'changeMonth':
      return (0, _extends2.default)({}, state, {
        slideDirection: action.direction,
        currentMonth: action.newMonth,
        isMonthSwitchingAnimating: !reduceAnimations
      });

    case 'finishMonthSwitchingAnimation':
      return (0, _extends2.default)({}, state, {
        isMonthSwitchingAnimating: false
      });

    case 'changeFocusedDay':
      {
        if (state.focusedDay !== null && utils.isSameDay(action.focusedDay, state.focusedDay)) {
          return state;
        }

        const needMonthSwitch = Boolean(action.focusedDay) && !disableSwitchToMonthOnDayFocus && !utils.isSameMonth(state.currentMonth, action.focusedDay);
        return (0, _extends2.default)({}, state, {
          focusedDay: action.focusedDay,
          isMonthSwitchingAnimating: needMonthSwitch && !reduceAnimations,
          currentMonth: needMonthSwitch ? utils.startOfMonth(action.focusedDay) : state.currentMonth,
          slideDirection: utils.isAfterDay(action.focusedDay, state.currentMonth) ? 'left' : 'right'
        });
      }

    default:
      throw new Error('missing support');
  }
};

exports.createCalendarStateReducer = createCalendarStateReducer;

function useCalendarState({
  date,
  defaultCalendarMonth,
  disableFuture,
  disablePast,
  disableSwitchToMonthOnDayFocus = false,
  maxDate,
  minDate,
  onMonthChange,
  reduceAnimations,
  shouldDisableDate
}) {
  var _ref;

  const now = (0, _useUtils.useNow)();
  const utils = (0, _useUtils.useUtils)();
  const reducerFn = React.useRef(createCalendarStateReducer(Boolean(reduceAnimations), disableSwitchToMonthOnDayFocus, utils)).current;
  const [calendarState, dispatch] = React.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    focusedDay: date || now,
    currentMonth: utils.startOfMonth((_ref = date !== null && date !== void 0 ? date : defaultCalendarMonth) !== null && _ref !== void 0 ? _ref : now),
    slideDirection: 'left'
  });
  const handleChangeMonth = React.useCallback(payload => {
    dispatch((0, _extends2.default)({
      type: 'changeMonth'
    }, payload));

    if (onMonthChange) {
      onMonthChange(payload.newMonth);
    }
  }, [onMonthChange]);
  const changeMonth = React.useCallback(newDate => {
    const newDateRequested = newDate !== null && newDate !== void 0 ? newDate : now;

    if (utils.isSameMonth(newDateRequested, calendarState.currentMonth)) {
      return;
    }

    handleChangeMonth({
      newMonth: utils.startOfMonth(newDateRequested),
      direction: utils.isAfterDay(newDateRequested, calendarState.currentMonth) ? 'left' : 'right'
    });
  }, [calendarState.currentMonth, handleChangeMonth, now, utils]);
  const isDateDisabled = React.useCallback(day => (0, _dateUtils.validateDate)(utils, day, {
    disablePast,
    disableFuture,
    minDate,
    maxDate,
    shouldDisableDate
  }) !== null, [disableFuture, disablePast, maxDate, minDate, shouldDisableDate, utils]);
  const onMonthSwitchingAnimationEnd = React.useCallback(() => {
    dispatch({
      type: 'finishMonthSwitchingAnimation'
    });
  }, []);
  const changeFocusedDay = React.useCallback(newFocusedDate => {
    if (!isDateDisabled(newFocusedDate)) {
      dispatch({
        type: 'changeFocusedDay',
        focusedDay: newFocusedDate
      });
    }
  }, [isDateDisabled]);
  return {
    calendarState,
    changeMonth,
    changeFocusedDay,
    isDateDisabled,
    onMonthSwitchingAnimationEnd,
    handleChangeMonth
  };
}