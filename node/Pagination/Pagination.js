"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Pagination = _interopRequireDefault(require("@material-ui/core/Pagination"));

let warnedOnce = false;
/**
 * @ignore - do not document.
 */

var _default = /*#__PURE__*/React.forwardRef(function DeprecatedPagination(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The Pagination component was moved from the lab to the core.', '', "You should use `import { Pagination } from '@material-ui/core'`", "or `import Pagination from '@material-ui/core/Pagination'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/React.createElement(_Pagination.default, (0, _extends2.default)({
    ref: ref
  }, props));
});

exports.default = _default;