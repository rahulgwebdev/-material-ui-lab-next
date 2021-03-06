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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/core/utils");

var _styles = require("@material-ui/core/styles");

var _TimelineContext = _interopRequireDefault(require("../Timeline/TimelineContext"));

var _TimelineItemContext = _interopRequireDefault(require("./TimelineItemContext"));

const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    display: 'flex',
    position: 'relative',
    minHeight: 70
  },

  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {},

  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    flexDirection: 'row-reverse'
  },

  /* Styles applied to the root element if `align="alternate"`. */
  alignAlternate: {
    '&:nth-child(even)': {
      flexDirection: 'row-reverse',
      '& $content': {
        textAlign: 'right'
      },
      '& $oppositeContent': {
        textAlign: 'left'
      }
    }
  },

  /* Styles applied to the root element if TimelineOppositeContent isn't provided. */
  missingOppositeContent: {
    '&:before': {
      content: '""',
      flex: 1,
      padding: '6px 16px'
    }
  },

  /* Styles applied to the timeline content node. */
  content: {},

  /* Styles applied to the timeline opposite content node. */
  oppositeContent: {}
});

exports.styles = styles;
const TimelineItem = /*#__PURE__*/React.forwardRef(function TimelineItem(props, ref) {
  const {
    classes,
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className"]);
  const {
    align = 'left'
  } = React.useContext(_TimelineContext.default);
  let hasOppositeContent = false;
  React.Children.forEach(props.children, child => {
    if ((0, _utils.isMuiElement)(child, ['TimelineOppositeContent'])) {
      hasOppositeContent = true;
    }
  });
  return /*#__PURE__*/React.createElement(_TimelineItemContext.default.Provider, {
    value: {
      classes: {
        content: classes.content,
        oppositeContent: classes.oppositeContent
      }
    }
  }, /*#__PURE__*/React.createElement("li", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[`align${(0, _utils.capitalize)(align)}`], className, !hasOppositeContent && classes.missingOppositeContent),
    ref: ref
  }, other)));
});
process.env.NODE_ENV !== "production" ? TimelineItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiTimelineItem'
})(TimelineItem);

exports.default = _default;