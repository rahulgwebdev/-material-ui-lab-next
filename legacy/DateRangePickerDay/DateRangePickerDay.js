import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, alpha } from '@material-ui/core/styles';
import { DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersDay, { areDayPropsEqual } from '../PickersDay/PickersDay';
var endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%'
};
var startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%'
};

var styles = function styles(theme) {
  return {
    root: {
      '&:first-child $rangeIntervalDayPreview': _extends({}, startBorderStyle, {
        borderLeftColor: theme.palette.divider
      }),
      '&:last-child $rangeIntervalDayPreview': _extends({}, endBorderStyle, {
        borderRightColor: theme.palette.divider
      })
    },
    rangeIntervalDayHighlight: {
      borderRadius: 0,
      color: theme.palette.primary.contrastText,
      backgroundColor: alpha(theme.palette.primary.light, 0.6),
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle
    },
    rangeIntervalDayHighlightStart: _extends({}, startBorderStyle, {
      paddingLeft: 0,
      marginLeft: DAY_MARGIN / 2
    }),
    rangeIntervalDayHighlightEnd: _extends({}, endBorderStyle, {
      paddingRight: 0,
      marginRight: DAY_MARGIN / 2
    }),
    day: {
      // Required to overlap preview border
      transform: 'scale(1.1)',
      '& > *': {
        transform: 'scale(0.9)'
      }
    },
    dayOutsideRangeInterval: {
      '&:hover': {
        border: "1px solid ".concat(theme.palette.grey[500])
      }
    },
    dayInsideRangeInterval: {
      color: theme.palette.getContrastText(alpha(theme.palette.primary.light, 0.6))
    },
    notSelectedDate: {
      backgroundColor: 'transparent'
    },
    rangeIntervalPreview: {
      // replace default day component margin with transparent border to avoid jumping on preview
      border: '2px solid transparent'
    },
    rangeIntervalDayPreview: {
      borderRadius: 0,
      border: "2px dashed ".concat(theme.palette.divider),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      '&$rangeIntervalDayPreviewStart': _extends({
        borderLeftColor: theme.palette.divider
      }, startBorderStyle),
      '&$rangeIntervalDayPreviewEnd': _extends({
        borderRightColor: theme.palette.divider
      }, endBorderStyle)
    },
    rangeIntervalDayPreviewStart: {},
    rangeIntervalDayPreviewEnd: {}
  };
};

var DateRangePickerDay = /*#__PURE__*/React.forwardRef(function DateRangePickerDay(props, ref) {
  var classes = props.classes,
      className = props.className,
      day = props.day,
      outsideCurrentMonth = props.outsideCurrentMonth,
      isEndOfHighlighting = props.isEndOfHighlighting,
      isEndOfPreviewing = props.isEndOfPreviewing,
      isHighlighting = props.isHighlighting,
      isPreviewing = props.isPreviewing,
      isStartOfHighlighting = props.isStartOfHighlighting,
      isStartOfPreviewing = props.isStartOfPreviewing,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      other = _objectWithoutProperties(props, ["classes", "className", "day", "outsideCurrentMonth", "isEndOfHighlighting", "isEndOfPreviewing", "isHighlighting", "isPreviewing", "isStartOfHighlighting", "isStartOfPreviewing", "selected"]);

  var utils = useUtils();
  var isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  var isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));
  var shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  var shouldRenderPreview = isPreviewing && !outsideCurrentMonth;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.root, className, (isEndOfHighlighting || isEndOfMonth) && classes.rangeIntervalDayHighlightEnd, (isStartOfHighlighting || isStartOfMonth) && classes.rangeIntervalDayHighlightStart, shouldRenderHighlight && classes.rangeIntervalDayHighlight)
  }, /*#__PURE__*/React.createElement("div", {
    role: "cell",
    className: clsx(classes.rangeIntervalPreview, (isEndOfPreviewing || isEndOfMonth) && classes.rangeIntervalDayPreviewEnd, (isStartOfPreviewing || isStartOfMonth) && classes.rangeIntervalDayPreviewStart, shouldRenderPreview && classes.rangeIntervalDayPreview)
  }, /*#__PURE__*/React.createElement(PickersDay, _extends({}, other, {
    ref: ref,
    disableMargin: true,
    allowSameDateSelection: true,
    allowKeyboardControl: false,
    day: day,
    selected: selected,
    outsideCurrentMonth: outsideCurrentMonth,
    className: clsx(classes.day, !selected && [classes.notSelectedDate, isHighlighting && classes.dayInsideRangeInterval], !isHighlighting && classes.dayOutsideRangeInterval)
  }))));
});
process.env.NODE_ENV !== "production" ? DateRangePickerDay.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The date to show.
   */
  day: PropTypes.any.isRequired,

  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isEndOfHighlighting: PropTypes.bool.isRequired,

  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isEndOfPreviewing: PropTypes.bool.isRequired,

  /**
   * Set to `true` if the `day` is in a highlighted date range.
   */
  isHighlighting: PropTypes.bool.isRequired,

  /**
   * Set to `true` if the `day` is in a preview date range.
   */
  isPreviewing: PropTypes.bool.isRequired,

  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isStartOfHighlighting: PropTypes.bool.isRequired,

  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isStartOfPreviewing: PropTypes.bool.isRequired,

  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: PropTypes.bool.isRequired,

  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: PropTypes.bool
} : void 0;
/**
 *
 * API:
 *
 * - [DateRangePickerDay API](https://material-ui.com/api/date-range-picker-day/)
 */

export default withStyles(styles, {
  name: 'MuiDateRangePickerDay'
})( /*#__PURE__*/React.memo(DateRangePickerDay, function (prevProps, nextProps) {
  return prevProps.isHighlighting === nextProps.isHighlighting && prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting && prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting && prevProps.isPreviewing === nextProps.isPreviewing && prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing && prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing && areDayPropsEqual(prevProps, nextProps);
}));