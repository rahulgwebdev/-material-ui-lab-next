"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MuiPickersAdapterContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

const MuiPickersAdapterContext = /*#__PURE__*/React.createContext(null);
exports.MuiPickersAdapterContext = MuiPickersAdapterContext;

/**
 * @ignore - do not document.
 */
const LocalizationProvider = props => {
  const {
    children,
    dateAdapter: Utils,
    dateFormats,
    dateLibInstance,
    locale
  } = props;
  const utils = React.useMemo(() => new Utils({
    locale,
    formats: dateFormats,
    instance: dateLibInstance
  }), [Utils, locale, dateFormats, dateLibInstance]);
  return /*#__PURE__*/React.createElement(MuiPickersAdapterContext.Provider, {
    value: utils
  }, children);
};

process.env.NODE_ENV !== "production" ? LocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * DateIO adapter class function
   */
  dateAdapter: _propTypes.default.func.isRequired,

  /**
   * Formats that are used for any child pickers
   */
  dateFormats: _propTypes.default.shape({
    dayOfMonth: _propTypes.default.string,
    fullDate: _propTypes.default.string,
    fullDateTime: _propTypes.default.string,
    fullDateTime12h: _propTypes.default.string,
    fullDateTime24h: _propTypes.default.string,
    fullDateWithWeekday: _propTypes.default.string,
    fullTime: _propTypes.default.string,
    fullTime12h: _propTypes.default.string,
    fullTime24h: _propTypes.default.string,
    hours12h: _propTypes.default.string,
    hours24h: _propTypes.default.string,
    keyboardDate: _propTypes.default.string,
    keyboardDateTime: _propTypes.default.string,
    keyboardDateTime12h: _propTypes.default.string,
    keyboardDateTime24h: _propTypes.default.string,
    minutes: _propTypes.default.string,
    month: _propTypes.default.string,
    monthAndDate: _propTypes.default.string,
    monthAndYear: _propTypes.default.string,
    monthShort: _propTypes.default.string,
    normalDate: _propTypes.default.string,
    normalDateWithWeekday: _propTypes.default.string,
    seconds: _propTypes.default.string,
    shortDate: _propTypes.default.string,
    weekday: _propTypes.default.string,
    weekdayShort: _propTypes.default.string,
    year: _propTypes.default.string
  }),

  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: _propTypes.default.any,

  /**
   * Locale for the date library you are using
   */
  locale: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string])
} : void 0;
var _default = LocalizationProvider;
exports.default = _default;