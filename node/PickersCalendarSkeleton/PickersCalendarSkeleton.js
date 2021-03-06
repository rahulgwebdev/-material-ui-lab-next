"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Skeleton = _interopRequireDefault(require("@material-ui/core/Skeleton"));

var _styles = require("@material-ui/core/styles");

var _dimensions = require("../internal/pickers/constants/dimensions");

var _PickersCalendar = require("../DayPicker/PickersCalendar");

const styles = theme => (0, _extends2.default)({}, (0, _PickersCalendar.styles)(theme), {
  root: {
    alignSelf: 'start'
  },
  daySkeleton: {
    margin: `0 ${_dimensions.DAY_MARGIN}px`
  },
  hidden: {
    visibility: 'hidden'
  }
});

exports.styles = styles;
const monthMap = [[0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0]];

const PickersCalendarSkeleton = props => {
  const {
    className,
    classes
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "classes"]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className)
  }, other), monthMap.map((week, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: classes.week
  }, week.map((day, index2) => /*#__PURE__*/React.createElement(_Skeleton.default, {
    key: index2,
    variant: "circular",
    width: _dimensions.DAY_SIZE,
    height: _dimensions.DAY_SIZE,
    className: (0, _clsx.default)(classes.daySkeleton, day === 0 && classes.hidden)
  })))));
};

process.env.NODE_ENV !== "production" ? PickersCalendarSkeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string
} : void 0;
/**
 *
 * API:
 *
 * - [PickersCalendarSkeleton API](https://material-ui.com/api/pickers-calendar-skeleton/)
 */

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiCalendarSkeleton'
})(PickersCalendarSkeleton);

exports.default = _default;