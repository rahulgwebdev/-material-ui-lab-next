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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _TabContext = require("../TabContext");

const TabList = /*#__PURE__*/React.forwardRef(function TabList(props, ref) {
  const {
    children: childrenProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children"]);
  const context = (0, _TabContext.useTabContext)();

  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  const children = React.Children.map(childrenProp, child => {
    return /*#__PURE__*/React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      'aria-controls': (0, _TabContext.getPanelId)(context, child.props.value),
      id: (0, _TabContext.getTabId)(context, child.props.value)
    });
  });
  return /*#__PURE__*/React.createElement(_Tabs.default, (0, _extends2.default)({}, other, {
    ref: ref,
    value: context.value
  }), children);
});
process.env.NODE_ENV !== "production" ? TabList.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A list of `<Tab />` elements.
   */
  children: _propTypes.default.arrayOf(_propTypes.default.element)
} : void 0;
var _default = TabList;
exports.default = _default;