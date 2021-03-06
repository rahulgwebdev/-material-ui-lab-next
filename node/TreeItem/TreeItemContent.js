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

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useTreeItem = _interopRequireDefault(require("./useTreeItem"));

/**
 * @ignore - internal component.
 */
const TreeItemContent = /*#__PURE__*/React.forwardRef(function TreeItemContent(props, ref) {
  const {
    classes,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "displayIcon", "expansionIcon", "icon", "label", "nodeId", "onClick", "onMouseDown"]);
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = (0, _useTreeItem.default)(nodeId);
  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = event => {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleClick = event => {
    handleExpansion(event);
    handleSelection(event);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    /*#__PURE__*/

    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
    React.createElement("div", (0, _extends2.default)({
      className: (0, _clsx.default)(classes.root, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled),
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      ref: ref
    }, other), /*#__PURE__*/React.createElement("div", {
      className: classes.iconContainer
    }, icon), /*#__PURE__*/React.createElement("div", {
      className: classes.label
    }, label))
  );
});
process.env.NODE_ENV !== "production" ? TreeItemContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: _propTypes.default.node,

  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: _propTypes.default.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: _propTypes.default.node,

  /**
   * The tree node label.
   */
  label: _propTypes.default.node,

  /**
   * The id of the node.
   */
  nodeId: _propTypes.default.string.isRequired,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseDown: _propTypes.default.func
} : void 0;
var _default = TreeItemContent;
exports.default = _default;