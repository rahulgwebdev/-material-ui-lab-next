"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _dimensions = require("../internal/pickers/constants/dimensions");

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _PickersDay = _interopRequireWildcard(require("../PickersDay/PickersDay"));

const endBorderStyle = {
  borderTopRightRadius: '50%',
  borderBottomRightRadius: '50%'
};
const startBorderStyle = {
  borderTopLeftRadius: '50%',
  borderBottomLeftRadius: '50%'
};

const styles = theme => ({
  root: {
    '&:first-child $rangeIntervalDayPreview': (0, _extends2.default)({}, startBorderStyle, {
      borderLeftColor: theme.palette.divider
    }),
    '&:last-child $rangeIntervalDayPreview': (0, _extends2.default)({}, endBorderStyle, {
      borderRightColor: theme.palette.divider
    })
  },
  rangeIntervalDayHighlight: {
    borderRadius: 0,
    color: theme.palette.primary.contrastText,
    backgroundColor: (0, _styles.alpha)(theme.palette.primary.light, 0.6),
    '&:first-child': startBorderStyle,
    '&:last-child': endBorderStyle
  },
  rangeIntervalDayHighlightStart: (0, _extends2.default)({}, startBorderStyle, {
    paddingLeft: 0,
    marginLeft: _dimensions.DAY_MARGIN / 2
  }),
  rangeIntervalDayHighlightEnd: (0, _extends2.default)({}, endBorderStyle, {
    paddingRight: 0,
    marginRight: _dimensions.DAY_MARGIN / 2
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
      border: `1px solid ${theme.palette.grey[500]}`
    }
  },
  dayInsideRangeInterval: {
    color: theme.palette.getContrastText((0, _styles.alpha)(theme.palette.primary.light, 0.6))
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
    border: `2px dashed ${theme.palette.divider}`,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    '&$rangeIntervalDayPreviewStart': (0, _extends2.default)({
      borderLeftColor: theme.palette.divider
    }, startBorderStyle),
    '&$rangeIntervalDayPreviewEnd': (0, _extends2.default)({
      borderRightColor: theme.palette.divider
    }, endBorderStyle)
  },
  rangeIntervalDayPreviewStart: {},
  rangeIntervalDayPreviewEnd: {}
});

const DateRangePickerDay = /*#__PURE__*/React.forwardRef(function DateRangePickerDay(props, ref) {
  const {
    classes,
    className,
    day,
    outsideCurrentMonth,
    isEndOfHighlighting,
    isEndOfPreviewing,
    isHighlighting,
    isPreviewing,
    isStartOfHighlighting,
    isStartOfPreviewing,
    selected = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "day", "outsideCurrentMonth", "isEndOfHighlighting", "isEndOfPreviewing", "isHighlighting", "isPreviewing", "isStartOfHighlighting", "isStartOfPreviewing", "selected"]);
  const utils = (0, _useUtils.useUtils)();
  const isEndOfMonth = utils.isSameDay(day, utils.endOfMonth(day));
  const isStartOfMonth = utils.isSameDay(day, utils.startOfMonth(day));
  const shouldRenderHighlight = isHighlighting && !outsideCurrentMonth;
  const shouldRenderPreview = isPreviewing && !outsideCurrentMonth;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.default)(classes.root, className, (isEndOfHighlighting || isEndOfMonth) && classes.rangeIntervalDayHighlightEnd, (isStartOfHighlighting || isStartOfMonth) && classes.rangeIntervalDayHighlightStart, shouldRenderHighlight && classes.rangeIntervalDayHighlight)
  }, /*#__PURE__*/React.createElement("div", {
    role: "cell",
    className: (0, _clsx.default)(classes.rangeIntervalPreview, (isEndOfPreviewing || isEndOfMonth) && classes.rangeIntervalDayPreviewEnd, (isStartOfPreviewing || isStartOfMonth) && classes.rangeIntervalDayPreviewStart, shouldRenderPreview && classes.rangeIntervalDayPreview)
  }, /*#__PURE__*/React.createElement(_PickersDay.default, (0, _extends2.default)({}, other, {
    ref: ref,
    disableMargin: true,
    allowSameDateSelection: true,
    allowKeyboardControl: false,
    day: day,
    selected: selected,
    outsideCurrentMonth: outsideCurrentMonth,
    className: (0, _clsx.default)(classes.day, !selected && [classes.notSelectedDate, isHighlighting && classes.dayInsideRangeInterval], !isHighlighting && classes.dayOutsideRangeInterval)
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
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The date to show.
   */
  day: _propTypes.default.any.isRequired,

  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isEndOfHighlighting: _propTypes.default.bool.isRequired,

  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isEndOfPreviewing: _propTypes.default.bool.isRequired,

  /**
   * Set to `true` if the `day` is in a highlighted date range.
   */
  isHighlighting: _propTypes.default.bool.isRequired,

  /**
   * Set to `true` if the `day` is in a preview date range.
   */
  isPreviewing: _propTypes.default.bool.isRequired,

  /**
   * Set to `true` if the `day` is the start of a highlighted date range.
   */
  isStartOfHighlighting: _propTypes.default.bool.isRequired,

  /**
   * Set to `true` if the `day` is the end of a highlighted date range.
   */
  isStartOfPreviewing: _propTypes.default.bool.isRequired,

  /**
   * If `true`, day is outside of month and will be hidden.
   */
  outsideCurrentMonth: _propTypes.default.bool.isRequired,

  /**
   * If `true`, renders as selected.
   * @default false
   */
  selected: _propTypes.default.bool
} : void 0;
/**
 *
 * API:
 *
 * - [DateRangePickerDay API](https://material-ui.com/api/date-range-picker-day/)
 */

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiDateRangePickerDay'
})( /*#__PURE__*/React.memo(DateRangePickerDay, (prevProps, nextProps) => {
  return prevProps.isHighlighting === nextProps.isHighlighting && prevProps.isEndOfHighlighting === nextProps.isEndOfHighlighting && prevProps.isStartOfHighlighting === nextProps.isStartOfHighlighting && prevProps.isPreviewing === nextProps.isPreviewing && prevProps.isEndOfPreviewing === nextProps.isEndOfPreviewing && prevProps.isStartOfPreviewing === nextProps.isStartOfPreviewing && (0, _PickersDay.areDayPropsEqual)(prevProps, nextProps);
}));

exports.default = _default;