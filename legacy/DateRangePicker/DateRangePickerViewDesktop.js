import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { calculateRangePreview } from './date-range-manager';
import PickersCalendar from '../DayPicker/PickersCalendar';
import DateRangePickerDay, { DateRangePickerDayProps } from '../DateRangePickerDay';
import { defaultMinDate, defaultMaxDate } from '../internal/pickers/constants/prop-types';
import PickersArrowSwitcher from '../internal/pickers/PickersArrowSwitcher';
import { usePreviousMonthDisabled, useNextMonthDisabled } from '../internal/pickers/hooks/date-helpers-hooks';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';
export var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    rangeCalendarContainer: {
      '&:not(:last-child)': {
        borderRight: "2px solid ".concat(theme.palette.divider)
      }
    },
    calendar: {
      minWidth: 312,
      minHeight: 288
    },
    arrowSwitcher: {
      padding: '16px 16px 8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };
};

function getCalendarsArray(calendars) {
  switch (calendars) {
    case 1:
      return [0];

    case 2:
      return [0, 0];

    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars

    default:
      return new Array(calendars).fill(0);
  }
}
/**
 * @ignore - internal component.
 */


function DateRangePickerViewDesktop(props) {
  var _props$calendars = props.calendars,
      calendars = _props$calendars === void 0 ? 2 : _props$calendars,
      changeMonth = props.changeMonth,
      classes = props.classes,
      components = props.components,
      componentsProps = props.componentsProps,
      currentlySelectingRangeEnd = props.currentlySelectingRangeEnd,
      currentMonth = props.currentMonth,
      date = props.date,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      _props$leftArrowButto = props.leftArrowButtonText,
      leftArrowButtonText = _props$leftArrowButto === void 0 ? 'Previous month' : _props$leftArrowButto,
      maxDateProp = props.maxDate,
      minDateProp = props.minDate,
      onChange = props.onChange,
      _props$renderDay = props.renderDay,
      _renderDay = _props$renderDay === void 0 ? function (_, dateRangeProps) {
    return /*#__PURE__*/React.createElement(DateRangePickerDay, dateRangeProps);
  } : _props$renderDay,
      _props$rightArrowButt = props.rightArrowButtonText,
      rightArrowButtonText = _props$rightArrowButt === void 0 ? 'Next month' : _props$rightArrowButt,
      other = _objectWithoutProperties(props, ["calendars", "changeMonth", "classes", "components", "componentsProps", "currentlySelectingRangeEnd", "currentMonth", "date", "disableFuture", "disablePast", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"]);

  var utils = useUtils();
  var minDate = minDateProp || utils.date(defaultMinDate);
  var maxDate = maxDateProp || utils.date(defaultMaxDate);

  var _React$useState = React.useState(null),
      rangePreviewDay = _React$useState[0],
      setRangePreviewDay = _React$useState[1];

  var isNextMonthDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast: disablePast,
    minDate: minDate
  });
  var previewingRange = calculateRangePreview({
    utils: utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd: currentlySelectingRangeEnd
  });
  var handleDayChange = React.useCallback(function (day) {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  var handlePreviewDayChange = function handlePreviewDayChange(newPreviewRequest) {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  var CalendarTransitionProps = React.useMemo(function () {
    return {
      onMouseLeave: function onMouseLeave() {
        return setRangePreviewDay(null);
      }
    };
  }, []);
  var selectNextMonth = React.useCallback(function () {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  var selectPreviousMonth = React.useCallback(function () {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, getCalendarsArray(calendars).map(function (_, index) {
    var monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: classes.rangeCalendarContainer
    }, /*#__PURE__*/React.createElement(PickersArrowSwitcher, {
      className: classes.arrowSwitcher,
      onLeftClick: selectPreviousMonth,
      onRightClick: selectNextMonth,
      isLeftHidden: index !== 0,
      isRightHidden: index !== calendars - 1,
      isLeftDisabled: isPreviousMonthDisabled,
      isRightDisabled: isNextMonthDisabled,
      leftArrowButtonText: leftArrowButtonText,
      components: components,
      componentsProps: componentsProps,
      rightArrowButtonText: rightArrowButtonText
    }, utils.format(monthOnIteration, 'monthAndYear')), /*#__PURE__*/React.createElement(PickersCalendar, _extends({}, other, {
      key: index,
      date: date,
      onFocusedDayChange: doNothing,
      className: classes.calendar,
      onChange: handleDayChange,
      currentMonth: monthOnIteration,
      TransitionProps: CalendarTransitionProps,
      renderDay: function renderDay(day, __, DayProps) {
        return _renderDay(day, _extends({
          isPreviewing: isWithinRange(utils, day, previewingRange),
          isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
          isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
          isHighlighting: isWithinRange(utils, day, date),
          isStartOfHighlighting: isStartOfRange(utils, day, date),
          isEndOfHighlighting: isEndOfRange(utils, day, date),
          onMouseEnter: function onMouseEnter() {
            return handlePreviewDayChange(day);
          }
        }, DayProps));
      }
    })));
  }));
}

export default withStyles(styles, {
  name: 'MuiDateRangePickerViewDesktop'
})(DateRangePickerViewDesktop);