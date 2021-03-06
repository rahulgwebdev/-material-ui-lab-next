"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMaskedInput = useMaskedInput;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rifm = require("rifm");

var _useUtils = require("./useUtils");

var _utils = require("../utils");

var _textFieldHelper = require("../text-field-helper");

function useMaskedInput({
  acceptRegex = /[\d]/gi,
  disabled,
  disableMaskedInput,
  ignoreInvalidInputs,
  inputFormat,
  inputProps,
  label,
  mask,
  onChange,
  rawValue,
  readOnly,
  rifmFormatter,
  TextFieldProps,
  validationError
}) {
  const utils = (0, _useUtils.useUtils)();
  const isFocusedRef = React.useRef(false);
  const getInputValue = React.useCallback(() => (0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat), [inputFormat, rawValue, utils]);
  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState(getInputValue());
  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return (0, _textFieldHelper.checkMaskIsValidForCurrentFormat)(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  const formatter = React.useMemo(() => shouldUseMaskedInput && mask ? (0, _textFieldHelper.maskedDateFormatter)(mask, acceptRegex) : st => st, [acceptRegex, mask, shouldUseMaskedInput]);
  React.useEffect(() => {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  const handleChange = text => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    const date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const rifmProps = (0, _rifm.useRifm)({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  const inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: event => {
      handleChange(event.currentTarget.value);
    }
  };
  return (0, _extends2.default)({
    label,
    disabled,
    error: validationError,
    helperText: formatHelperText,
    inputProps: (0, _extends2.default)({}, inputStateArgs, {
      disabled,
      placeholder: formatHelperText,
      readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps, {
      onFocus: (0, _utils.createDelegatedEventHandler)(() => {
        isFocusedRef.current = true;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onFocus),
      onBlur: (0, _utils.createDelegatedEventHandler)(() => {
        isFocusedRef.current = false;
      }, inputProps === null || inputProps === void 0 ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}

var _default = useMaskedInput;
exports.default = _default;