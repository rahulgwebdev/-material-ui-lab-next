"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _ClockPicker = _interopRequireDefault(require("./ClockPicker"));

var _PickerView = _interopRequireDefault(require("../internal/pickers/Picker/PickerView"));

var _useViews = require("../internal/pickers/hooks/useViews");

/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
var _default = /*#__PURE__*/React.forwardRef(function ClockPickerStandalone(props, ref) {
  const {
    view,
    openTo,
    className,
    onViewChange,
    views = ['hours', 'minutes']
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["view", "openTo", "className", "onViewChange", "views"]);
  const {
    openView,
    setOpenView,
    nextView,
    previousView
  } = (0, _useViews.useViews)({
    view,
    views,
    openTo,
    onViewChange,
    onChange: other.onChange
  });
  return /*#__PURE__*/React.createElement(_PickerView.default, {
    className: className,
    ref: ref
  }, /*#__PURE__*/React.createElement(_ClockPicker.default, (0, _extends2.default)({
    view: openView,
    nextViewAvailable: Boolean(nextView),
    previousViewAvailable: Boolean(previousView),
    openNextView: () => setOpenView(nextView),
    openPreviousView: () => setOpenView(previousView)
  }, other)));
});

exports.default = _default;