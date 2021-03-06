"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _reactTransitionGroup = require("react-transition-group");

const animationDuration = 500;

const styles = theme => ({
  root: {
    display: 'block',
    position: 'relative'
  },
  fadeEnter: {
    willChange: 'transform',
    opacity: 0
  },
  fadeEnterActive: {
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      duration: animationDuration
    })
  },
  fadeExit: {
    opacity: 1
  },
  fadeExitActive: {
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      duration: animationDuration / 2
    })
  }
});
/**
 * @ignore - do not document.
 */


exports.styles = styles;

const FadeTransitionGroup = ({
  classes,
  children,
  className,
  reduceAnimations,
  transKey
}) => {
  if (reduceAnimations) {
    return children;
  }

  const transitionClasses = {
    exit: classes.fadeExit,
    enterActive: classes.fadeEnterActive,
    enter: classes.fadeEnter,
    exitActive: classes.fadeExitActive
  };
  return /*#__PURE__*/React.createElement(_reactTransitionGroup.TransitionGroup, {
    className: (0, _clsx.default)(classes.root, className),
    childFactory: element => /*#__PURE__*/React.cloneElement(element, {
      classNames: transitionClasses
    })
  }, /*#__PURE__*/React.createElement(_reactTransitionGroup.CSSTransition, {
    mountOnEnter: true,
    unmountOnExit: true,
    key: transKey,
    timeout: {
      appear: animationDuration,
      enter: animationDuration / 2,
      exit: 0
    },
    classNames: transitionClasses
  }, children));
};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPickersFadeTransitionGroup'
})(FadeTransitionGroup);

exports.default = _default;