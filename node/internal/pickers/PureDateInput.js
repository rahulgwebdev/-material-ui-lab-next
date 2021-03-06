"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureDateInput = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _useUtils = require("./hooks/useUtils");

var _textFieldHelper = require("./text-field-helper");

// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
const PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  const {
    containerRef,
    disabled,
    getOpenDialogAriaText = _textFieldHelper.getTextFieldAriaText,
    inputFormat,
    InputProps,
    label,
    openPicker: onOpen,
    rawValue,
    renderInput,
    TextFieldProps = {},
    validationError
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const PureDateInputProps = React.useMemo(() => (0, _extends2.default)({}, InputProps, {
    readOnly: true
  }), [InputProps]);
  const inputValue = (0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat);
  return renderInput((0, _extends2.default)({
    label,
    disabled,
    ref: containerRef,
    inputRef: ref,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: (0, _utils.onSpaceOrEnter)(onOpen)
    }
  }, TextFieldProps));
});
exports.PureDateInput = PureDateInput;
PureDateInput.propTypes = {
  getOpenDialogAriaText: _propTypes.default.func,
  renderInput: _propTypes.default.func.isRequired
};