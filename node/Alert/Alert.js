"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Alert = _interopRequireDefault(require("@material-ui/core/Alert"));

let warnedOnce = false;
/**
 * @ignore - do not document.
 */

var _default = /*#__PURE__*/React.forwardRef(function DeprecatedAlert(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The Alert component was moved from the lab to the core.', '', "You should use `import { Alert } from '@material-ui/core'`", "or `import Alert from '@material-ui/core/Alert'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/React.createElement(_Alert.default, (0, _extends2.default)({
    ref: ref
  }, props));
});

exports.default = _default;