"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabContext;
exports.useTabContext = useTabContext;
exports.getPanelId = getPanelId;
exports.getTabId = getTabId;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * @type {React.Context<{ idPrefix: string; value: string } | null>}
 */
const Context = /*#__PURE__*/React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

function useUniquePrefix() {
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    setId(`mui-p-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

function TabContext(props) {
  const {
    children,
    value
  } = props;
  const idPrefix = useUniquePrefix();
  const context = React.useMemo(() => {
    return {
      idPrefix,
      value
    };
  }, [idPrefix, value]);
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: context
  }, children);
}

process.env.NODE_ENV !== "production" ? TabContext.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * The value of the currently selected `Tab`.
   */
  value: _propTypes.default.string.isRequired
} : void 0;
/**
 * @returns {unknown}
 */

function useTabContext() {
  return React.useContext(Context);
}

function getPanelId(context, value) {
  const {
    idPrefix
  } = context;

  if (idPrefix === null) {
    return null;
  }

  return `${context.idPrefix}-P-${value}`;
}

function getTabId(context, value) {
  const {
    idPrefix
  } = context;

  if (idPrefix === null) {
    return null;
  }

  return `${context.idPrefix}-T-${value}`;
}