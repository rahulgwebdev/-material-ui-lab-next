import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MonthPicker from '../MonthPicker/MonthPicker';
import { useCalendarState } from './useCalendarState';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
import PickersCalendar from './PickersCalendar';
import { useViews } from '../internal/pickers/hooks/useViews';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import PickersCalendarHeader from './PickersCalendarHeader';
import YearPicker from '../YearPicker/YearPicker';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import { IsStaticVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { findClosestEnabledDate } from '../internal/pickers/date-utils';
import PickerView from '../internal/pickers/Picker/PickerView';
export var styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  viewTransitionContainer: {
    overflowY: 'auto'
  },
  fullHeightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: (DAY_SIZE + DAY_MARGIN * 4) * 7,
    height: '100%'
  }
};
export var defaultReduceAnimations = typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

var _ref = /*#__PURE__*/React.createElement("span", null, "...");

var DayPicker = /*#__PURE__*/React.forwardRef(function DayPicker(props, ref) {
  var allowKeyboardControlProp = props.allowKeyboardControl,
      onViewChange = props.onViewChange,
      date = props.date,
      _props$disableFuture = props.disableFuture,
      disableFuture = _props$disableFuture === void 0 ? false : _props$disableFuture,
      _props$disablePast = props.disablePast,
      disablePast = _props$disablePast === void 0 ? false : _props$disablePast,
      defaultCalendarMonth = props.defaultCalendarMonth,
      classes = props.classes,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      maxDateProp = props.maxDate,
      minDateProp = props.minDate,
      onChange = props.onChange,
      onMonthChange = props.onMonthChange,
      _props$reduceAnimatio = props.reduceAnimations,
      reduceAnimations = _props$reduceAnimatio === void 0 ? defaultReduceAnimations : _props$reduceAnimatio,
      _props$renderLoading = props.renderLoading,
      renderLoading = _props$renderLoading === void 0 ? function () {
    return _ref;
  } : _props$renderLoading,
      shouldDisableDate = props.shouldDisableDate,
      shouldDisableYear = props.shouldDisableYear,
      view = props.view,
      _props$views = props.views,
      views = _props$views === void 0 ? ['year', 'date'] : _props$views,
      _props$openTo = props.openTo,
      openTo = _props$openTo === void 0 ? 'date' : _props$openTo,
      className = props.className,
      other = _objectWithoutProperties(props, ["allowKeyboardControl", "onViewChange", "date", "disableFuture", "disablePast", "defaultCalendarMonth", "classes", "loading", "maxDate", "minDate", "onChange", "onMonthChange", "reduceAnimations", "renderLoading", "shouldDisableDate", "shouldDisableYear", "view", "views", "openTo", "className"]);

  var utils = useUtils();
  var isStatic = React.useContext(IsStaticVariantContext);
  var allowKeyboardControl = allowKeyboardControlProp !== null && allowKeyboardControlProp !== void 0 ? allowKeyboardControlProp : !isStatic;
  var minDate = minDateProp || utils.date(defaultMinDate);
  var maxDate = maxDateProp || utils.date(defaultMaxDate);

  var _useViews = useViews({
    view: view,
    views: views,
    openTo: openTo,
    onChange: onChange,
    onViewChange: onViewChange
  }),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView;

  var _useCalendarState = useCalendarState({
    date: date,
    defaultCalendarMonth: defaultCalendarMonth,
    reduceAnimations: reduceAnimations,
    onMonthChange: onMonthChange,
    minDate: minDate,
    maxDate: maxDate,
    shouldDisableDate: shouldDisableDate,
    disablePast: disablePast,
    disableFuture: disableFuture
  }),
      calendarState = _useCalendarState.calendarState,
      changeFocusedDay = _useCalendarState.changeFocusedDay,
      changeMonth = _useCalendarState.changeMonth,
      isDateDisabled = _useCalendarState.isDateDisabled,
      handleChangeMonth = _useCalendarState.handleChangeMonth,
      onMonthSwitchingAnimationEnd = _useCalendarState.onMonthSwitchingAnimationEnd;

  React.useEffect(function () {
    if (date && isDateDisabled(date)) {
      var closestEnabledDate = findClosestEnabledDate({
        utils: utils,
        date: date,
        minDate: minDate,
        maxDate: maxDate,
        disablePast: disablePast,
        disableFuture: disableFuture,
        shouldDisableDate: isDateDisabled
      });
      onChange(closestEnabledDate, 'partial');
    } // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.

  }, []); // eslint-disable-line

  React.useEffect(function () {
    if (date) {
      changeMonth(date);
    }
  }, [date]); // eslint-disable-line

  return /*#__PURE__*/React.createElement(PickerView, {
    ref: ref,
    className: clsx(classes.root, className)
  }, /*#__PURE__*/React.createElement(PickersCalendarHeader, _extends({}, other, {
    views: views,
    openView: openView,
    currentMonth: calendarState.currentMonth,
    onViewChange: setOpenView,
    onMonthChange: function onMonthChange(newMonth, direction) {
      return handleChangeMonth({
        newMonth: newMonth,
        direction: direction
      });
    },
    minDate: minDate,
    maxDate: maxDate,
    disablePast: disablePast,
    disableFuture: disableFuture,
    reduceAnimations: reduceAnimations
  })), /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    className: classes.viewTransitionContainer,
    transKey: openView
  }, /*#__PURE__*/React.createElement("div", null, openView === 'year' && /*#__PURE__*/React.createElement(YearPicker, _extends({}, other, {
    date: date,
    onChange: onChange,
    minDate: minDate,
    maxDate: maxDate,
    disableFuture: disableFuture,
    disablePast: disablePast,
    isDateDisabled: isDateDisabled,
    allowKeyboardControl: allowKeyboardControl,
    shouldDisableYear: shouldDisableYear,
    onFocusedDayChange: changeFocusedDay
  })), openView === 'month' && /*#__PURE__*/React.createElement(MonthPicker, _extends({}, other, {
    date: date,
    onChange: onChange,
    minDate: minDate,
    maxDate: maxDate,
    onMonthChange: onMonthChange
  })), openView === 'date' && /*#__PURE__*/React.createElement(PickersCalendar, _extends({}, other, calendarState, {
    onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
    onFocusedDayChange: changeFocusedDay,
    reduceAnimations: reduceAnimations,
    date: date,
    onChange: onChange,
    isDateDisabled: isDateDisabled,
    allowKeyboardControl: allowKeyboardControl,
    loading: loading,
    renderLoading: renderLoading
  })))));
});
process.env.NODE_ENV !== "production" ? DayPicker.propTypes = {
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
   * @ignore
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  date: PropTypes.any,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,

  /**
   * @default false
   */
  disableFuture: PropTypes.bool,

  /**
   * @default false
   */
  disablePast: PropTypes.bool,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Max selectable date. @DateIOType
   */
  maxDate: PropTypes.any,

  /**
   * Min selectable date. @DateIOType
   */
  minDate: PropTypes.any,

  /**
   * Callback fired on date change
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,

  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,

  /**
   * Initially open view.
   * @default 'date'
   */
  openTo: PropTypes.oneOf(['date', 'month', 'year']),

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,

  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,

  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,

  /**
   * Controlled open view.
   */
  view: PropTypes.oneOf(['date', 'month', 'year']),

  /**
   * Views for day picker.
   * @default ['year', 'date']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['date', 'month', 'year']).isRequired)
} : void 0;
/**
 *
 * API:
 *
 * - [DayPicker API](https://material-ui.com/api/day-picker/)
 */

export default withStyles(styles, {
  name: 'MuiDayPicker'
})(DayPicker);