import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useTreeItem from './useTreeItem';
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
        other = _objectWithoutPropertiesLoose(props, ["classes", "displayIcon", "expansionIcon", "icon", "label", "nodeId", "onClick", "onMouseDown"]);

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection
  } = useTreeItem(nodeId);
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
    React.createElement("div", _extends({
      className: clsx(classes.root, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled),
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
  classes: PropTypes.object,

  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,

  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,

  /**
   * The tree node label.
   */
  label: PropTypes.node,

  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onMouseDown: PropTypes.func
} : void 0;
export default TreeItemContent;