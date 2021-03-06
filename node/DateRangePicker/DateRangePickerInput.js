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

var _styles = require("@material-ui/core/styles");

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _useMaskedInput = require("../internal/pickers/hooks/useMaskedInput");

var _WrapperVariantContext = require("../internal/pickers/wrappers/WrapperVariantContext");

var _utils = require("../internal/pickers/utils");

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  toLabelDelimiter: {
    margin: '8px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '0 16px'
    }
  }
});

exports.styles = styles;

/**
 * @ignore - internal component.
 */
const DateRangePickerInput = (_ref) => {
  let {
    classes,
    containerRef,
    currentlySelectingRangeEnd,
    disableOpenPicker,
    endText,
    forwardedRef,
    onBlur,
    onChange,
    open,
    openPicker,
    rawValue: [start, end],
    readOnly,
    renderInput,
    setCurrentlySelectingRangeEnd,
    startText,
    TextFieldProps,
    validationError: [startValidationError, endValidationError]
  } = _ref,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["classes", "containerRef", "currentlySelectingRangeEnd", "disableOpenPicker", "endText", "forwardedRef", "onBlur", "onChange", "open", "openPicker", "rawValue", "rawValue", "readOnly", "renderInput", "setCurrentlySelectingRangeEnd", "startText", "TextFieldProps", "validationError"]);
  const utils = (0, _useUtils.useUtils)();
  const startRef = React.useRef(null);
  const endRef = React.useRef(null);
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (currentlySelectingRangeEnd === 'start') {
      var _startRef$current;

      (_startRef$current = startRef.current) === null || _startRef$current === void 0 ? void 0 : _startRef$current.focus();
    } else if (currentlySelectingRangeEnd === 'end') {
      var _endRef$current;

      (_endRef$current = endRef.current) === null || _endRef$current === void 0 ? void 0 : _endRef$current.focus();
    }
  }, [currentlySelectingRangeEnd, open]); // TODO: rethink this approach. We do not need to wait for calendar to be updated to rerender input (looks like freezing)
  // TODO: so simply break 1 react's commit phase in 2 (first for input and second for calendars) by executing onChange in the next tick

  const lazyHandleChangeCallback = React.useCallback((...args) => (0, _utils.executeInTheNextEventLoopTick)(() => onChange(...args)), [onChange]);

  const handleStartChange = (date, inputString) => {
    lazyHandleChangeCallback([date, utils.date(end)], inputString);
  };

  const handleEndChange = (date, inputString) => {
    lazyHandleChangeCallback([utils.date(start), date], inputString);
  };

  const openRangeStartSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('start');
    }

    if (!disableOpenPicker) {
      openPicker();
    }
  };

  const openRangeEndSelection = () => {
    if (setCurrentlySelectingRangeEnd) {
      setCurrentlySelectingRangeEnd('end');
    }

    if (!disableOpenPicker) {
      openPicker();
    }
  };

  const openOnFocus = wrapperVariant === 'desktop';
  const startInputProps = (0, _useMaskedInput.useMaskedInput)((0, _extends2.default)({}, other, {
    readOnly,
    rawValue: start,
    onChange: handleStartChange,
    label: startText,
    validationError: startValidationError !== null,
    TextFieldProps: (0, _extends2.default)({}, TextFieldProps, {
      ref: startRef,
      focused: open && currentlySelectingRangeEnd === 'start'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeStartSelection : undefined,
      onFocus: openOnFocus ? openRangeStartSelection : undefined
    }
  }));
  const endInputProps = (0, _useMaskedInput.useMaskedInput)((0, _extends2.default)({}, other, {
    readOnly,
    label: endText,
    rawValue: end,
    onChange: handleEndChange,
    validationError: endValidationError !== null,
    TextFieldProps: (0, _extends2.default)({}, TextFieldProps, {
      ref: endRef,
      focused: open && currentlySelectingRangeEnd === 'end'
    }),
    inputProps: {
      onClick: !openOnFocus ? openRangeEndSelection : undefined,
      onFocus: openOnFocus ? openRangeEndSelection : undefined
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    onBlur: onBlur,
    className: classes.root,
    ref: (0, _utils.mergeRefs)([containerRef, forwardedRef])
  }, renderInput(startInputProps, endInputProps));
};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiDateRangePickerInput'
})(DateRangePickerInput);

exports.default = _default;