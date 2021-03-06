import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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
export const styles = {
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
export const defaultReduceAnimations = typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent);

var _ref = /*#__PURE__*/React.createElement("span", null, "...");

const DayPicker = /*#__PURE__*/React.forwardRef(function DayPicker(props, ref) {
  const {
    allowKeyboardControl: allowKeyboardControlProp,
    onViewChange,
    date,
    disableFuture = false,
    disablePast = false,
    defaultCalendarMonth,
    classes,
    loading = false,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    onMonthChange,
    reduceAnimations = defaultReduceAnimations,
    renderLoading = () => _ref,
    shouldDisableDate,
    shouldDisableYear,
    view,
    // TODO: unsound. `TView` could be `'date'`. `T extends Literal` does not mean there are more constituents but less.
    // Probably easiest to remove `TView`. How would one even pass this type parameter?
    views = ['year', 'date'],
    openTo = 'date',
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["allowKeyboardControl", "onViewChange", "date", "disableFuture", "disablePast", "defaultCalendarMonth", "classes", "loading", "maxDate", "minDate", "onChange", "onMonthChange", "reduceAnimations", "renderLoading", "shouldDisableDate", "shouldDisableYear", "view", "views", "openTo", "className"]);

  const utils = useUtils();
  const isStatic = React.useContext(IsStaticVariantContext);
  const allowKeyboardControl = allowKeyboardControlProp ?? !isStatic;
  const minDate = minDateProp || utils.date(defaultMinDate);
  const maxDate = maxDateProp || utils.date(defaultMaxDate);
  const {
    openView,
    setOpenView
  } = useViews({
    view,
    views,
    openTo,
    onChange,
    onViewChange
  });
  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    isDateDisabled,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd
  } = useCalendarState({
    date,
    defaultCalendarMonth,
    reduceAnimations,
    onMonthChange,
    minDate,
    maxDate,
    shouldDisableDate,
    disablePast,
    disableFuture
  });
  React.useEffect(() => {
    if (date && isDateDisabled(date)) {
      const closestEnabledDate = findClosestEnabledDate({
        utils,
        date,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        shouldDisableDate: isDateDisabled
      });
      onChange(closestEnabledDate, 'partial');
    } // This call is too expensive to run it on each prop change.
    // So just ensure that we are not rendering disabled as selected on mount.

  }, []); // eslint-disable-line

  React.useEffect(() => {
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
    onMonthChange: (newMonth, direction) => handleChangeMonth({
      newMonth,
      direction
    }),
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