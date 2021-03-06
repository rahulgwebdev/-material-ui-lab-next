"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _styles = require("@material-ui/core/styles");

var _dimensions = require("./constants/dimensions");

const styles = {
  container: {
    outline: 0
  },
  paper: {
    outline: 0,
    minWidth: _dimensions.DIALOG_WIDTH
  },
  content: {
    '&:first-child': {
      padding: 0
    }
  },
  action: {},
  withAdditionalAction: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/mui-org/material-ui-pickers/pull/267
    justifyContent: 'flex-start',
    '& > *:first-child': {
      marginRight: 'auto'
    }
  }
};
exports.styles = styles;

const PickersModalDialog = props => {
  const {
    cancelText = 'Cancel',
    children,
    classes,
    clearable = false,
    clearText = 'Clear',
    DialogProps = {},
    okText = 'OK',
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    showTodayButton = false,
    todayText = 'Today'
  } = props;
  return /*#__PURE__*/React.createElement(_Dialog.default, (0, _extends2.default)({
    open: open,
    onClose: onDismiss
  }, DialogProps, {
    classes: (0, _extends2.default)({}, DialogProps.classes, {
      container: classes.container,
      paper: classes.paper
    })
  }), /*#__PURE__*/React.createElement(_DialogContent.default, {
    className: classes.content
  }, children), /*#__PURE__*/React.createElement(_DialogActions.default, {
    className: (0, _clsx.default)(classes.action, (clearable || showTodayButton) && classes.withAdditionalAction)
  }, clearable && /*#__PURE__*/React.createElement(_Button.default, {
    onClick: onClear
  }, clearText), showTodayButton && /*#__PURE__*/React.createElement(_Button.default, {
    onClick: onSetToday
  }, todayText), cancelText && /*#__PURE__*/React.createElement(_Button.default, {
    onClick: onDismiss
  }, cancelText), okText && /*#__PURE__*/React.createElement(_Button.default, {
    onClick: onAccept
  }, okText)));
};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPickersModalDialog'
})(PickersModalDialog);

exports.default = _default;