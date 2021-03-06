"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ArrowLeft = _interopRequireDefault(require("../svg-icons/ArrowLeft"));

var _ArrowRight = _interopRequireDefault(require("../svg-icons/ArrowRight"));

const styles = theme => ({
  root: {
    display: 'flex'
  },
  spacer: {
    width: theme.spacing(3)
  },
  hidden: {
    visibility: 'hidden'
  }
});

exports.styles = styles;
const PickersArrowSwitcher = /*#__PURE__*/React.forwardRef(function PickersArrowSwitcher(props, ref) {
  const {
    children,
    classes,
    className,
    components = {},
    componentsProps = {},
    isLeftDisabled,
    isLeftHidden,
    isRightDisabled,
    isRightHidden,
    leftArrowButtonText,
    onLeftClick,
    onRightClick,
    rightArrowButtonText
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "components", "componentsProps", "isLeftDisabled", "isLeftHidden", "isRightDisabled", "isRightHidden", "leftArrowButtonText", "onLeftClick", "onRightClick", "rightArrowButtonText"]);
  const theme = (0, _styles.useTheme)();
  const isRtl = theme.direction === 'rtl';
  const LeftArrowButton = components.LeftArrowButton || _IconButton.default;
  const leftArrowButtonProps = componentsProps.leftArrowButton || {};
  const LeftArrowIcon = components.LeftArrowIcon || _ArrowLeft.default;
  const RightArrowButton = components.RightArrowButton || _IconButton.default;
  const rightArrowButtonProps = componentsProps.rightArrowButton || {};
  const RightArrowIcon = components.RightArrowIcon || _ArrowRight.default;
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement(LeftArrowButton, (0, _extends2.default)({
    size: "small",
    "aria-hidden": isLeftHidden,
    "aria-label": leftArrowButtonText,
    title: leftArrowButtonText,
    disabled: isLeftDisabled,
    edge: "end",
    onClick: onLeftClick
  }, leftArrowButtonProps, {
    className: (0, _clsx.default)(leftArrowButtonProps.className, isLeftHidden && classes.hidden)
  }), isRtl ? /*#__PURE__*/React.createElement(RightArrowIcon, null) : /*#__PURE__*/React.createElement(LeftArrowIcon, null)), children ? /*#__PURE__*/React.createElement(_Typography.default, {
    variant: "subtitle1",
    component: "span"
  }, children) : /*#__PURE__*/React.createElement("div", {
    className: classes.spacer
  }), /*#__PURE__*/React.createElement(RightArrowButton, (0, _extends2.default)({
    size: "small",
    "aria-hidden": isRightHidden,
    "aria-label": rightArrowButtonText,
    title: rightArrowButtonText,
    edge: "start",
    disabled: isRightDisabled,
    onClick: onRightClick
  }, rightArrowButtonProps, {
    className: (0, _clsx.default)(rightArrowButtonProps.className, isRightHidden && classes.hidden)
  }), isRtl ? /*#__PURE__*/React.createElement(LeftArrowIcon, null) : /*#__PURE__*/React.createElement(RightArrowIcon, null)));
});

var _default = /*#__PURE__*/React.memo((0, _styles.withStyles)(styles, {
  name: 'MuiPickersArrowSwitcher'
})(PickersArrowSwitcher));

exports.default = _default;