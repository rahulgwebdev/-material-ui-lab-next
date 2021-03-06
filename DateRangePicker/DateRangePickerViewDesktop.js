import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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
export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row'
  },
  rangeCalendarContainer: {
    '&:not(:last-child)': {
      borderRight: `2px solid ${theme.palette.divider}`
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
});

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
  const {
    calendars = 2,
    changeMonth,
    classes,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    currentMonth,
    date,
    disableFuture,
    disablePast,
    leftArrowButtonText = 'Previous month',
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dateRangeProps) => /*#__PURE__*/React.createElement(DateRangePickerDay, dateRangeProps),
    rightArrowButtonText = 'Next month'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["calendars", "changeMonth", "classes", "components", "componentsProps", "currentlySelectingRangeEnd", "currentMonth", "date", "disableFuture", "disablePast", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"]);

  const utils = useUtils();
  const minDate = minDateProp || utils.date(defaultMinDate);
  const maxDate = maxDateProp || utils.date(defaultMaxDate);
  const [rangePreviewDay, setRangePreviewDay] = React.useState(null);
  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast,
    minDate
  });
  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd
  });
  const handleDayChange = React.useCallback(day => {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  const handlePreviewDayChange = newPreviewRequest => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(() => ({
    onMouseLeave: () => setRangePreviewDay(null)
  }), []);
  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, getCalendarsArray(calendars).map((_, index) => {
    const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
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
      renderDay: (day, __, DayProps) => renderDay(day, _extends({
        isPreviewing: isWithinRange(utils, day, previewingRange),
        isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
        isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
        isHighlighting: isWithinRange(utils, day, date),
        isStartOfHighlighting: isStartOfRange(utils, day, date),
        isEndOfHighlighting: isEndOfRange(utils, day, date),
        onMouseEnter: () => handlePreviewDayChange(day)
      }, DayProps))
    })));
  }));
}

export default withStyles(styles, {
  name: 'MuiDateRangePickerViewDesktop'
})(DateRangePickerViewDesktop);