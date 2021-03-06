import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TimelineContext from '../Timeline/TimelineContext';
import TimelineItemContext from '../TimelineItem/TimelineItemContext';
export var styles = function styles() {
  return {
    /* Styles applied to the root element. */
    root: {
      padding: '6px 16px',
      marginRight: 'auto',
      textAlign: 'right',
      flex: 1
    },

    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: 'left'
    }
  };
};
var TimelineOppositeContent = /*#__PURE__*/React.forwardRef(function TimelineOppositeContent(props, ref) {
  var classes = props.classes,
      className = props.className,
      other = _objectWithoutProperties(props, ["classes", "className"]);

  var _React$useContext = React.useContext(TimelineContext),
      _React$useContext$ali = _React$useContext.align,
      align = _React$useContext$ali === void 0 ? 'left' : _React$useContext$ali;

  var _React$useContext2 = React.useContext(TimelineItemContext),
      _React$useContext2$cl = _React$useContext2.classes,
      contextClasses = _React$useContext2$cl === void 0 ? {} : _React$useContext2$cl;

  return /*#__PURE__*/React.createElement(Typography, _extends({
    component: "div",
    className: clsx(classes.root, contextClasses.oppositeContent, classes["align".concat(capitalize(align))], className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? TimelineOppositeContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
TimelineOppositeContent.muiName = 'TimelineOppositeContent';
export default withStyles(styles, {
  name: 'MuiTimelineOppositeContent'
})(TimelineOppositeContent);