"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Grow = _interopRequireDefault(require("@material-ui/core/Grow"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Popper = _interopRequireDefault(require("@material-ui/core/Popper"));

var _Unstable_TrapFocus = _interopRequireDefault(require("@material-ui/core/Unstable_TrapFocus"));

var _utils = require("@material-ui/core/utils");

var _styles = require("@material-ui/core/styles");

var _useKeyDown = require("./hooks/useKeyDown");

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.modal
  },
  paper: {
    transformOrigin: 'top center',
    outline: 0
  },
  topTransition: {
    transformOrigin: 'bottom center'
  }
});

exports.styles = styles;

function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
 * Based on @material-ui/core/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 *
 * @param onClickAway
 * @param onClick
 * @param onTouchStart
 */


function useClickAwayListener(active, onClickAway) {
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    function handleClickCapture() {
      activatedRef.current = true;
    }

    document.addEventListener('click', handleClickCapture, {
      capture: true,
      once: true
    });
    return () => {
      activatedRef.current = false;
      document.removeEventListener('click', handleClickCapture, {
        capture: true
      });
    };
  }, [active]); // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.

  const handleClickAway = (0, _utils.useEventCallback)(event => {
    if (!activatedRef.current) {
      return;
    } // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.


    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = (0, _utils.ownerDocument)(nodeRef.current); // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.

    if (!nodeRef.current || // is a TouchEvent?
    'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    } // Do not act if user performed touchmove


    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };

  React.useEffect(() => {
    if (active) {
      const doc = (0, _utils.ownerDocument)(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = (0, _utils.ownerDocument)(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return () => {
        doc.removeEventListener('click', handleClickAway);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}

const PickersPopper = props => {
  const {
    anchorEl,
    children,
    classes,
    containerRef = null,
    onClose,
    open,
    PopperProps,
    role,
    TransitionComponent = _Grow.default,
    TrapFocusProps
  } = props;
  (0, _useKeyDown.useGlobalKeyDown)(open, {
    [_useKeyDown.keycode.Esc]: onClose
  });
  const lastFocusedElementRef = React.useRef(null);
  React.useEffect(() => {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);
  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onClose);
  const paperRef = React.useRef(null);
  const handleRef = (0, _utils.useForkRef)(paperRef, containerRef);
  const handlePaperRef = (0, _utils.useForkRef)(handleRef, clickAwayRef);
  return /*#__PURE__*/React.createElement(_Popper.default, (0, _extends2.default)({
    transition: true,
    role: role,
    open: open,
    anchorEl: anchorEl,
    className: (0, _clsx.default)(classes.root, PopperProps === null || PopperProps === void 0 ? void 0 : PopperProps.className)
  }, PopperProps), ({
    TransitionProps,
    placement
  }) => /*#__PURE__*/React.createElement(_Unstable_TrapFocus.default, (0, _extends2.default)({
    open: open,
    disableAutoFocus: true,
    disableEnforceFocus: role === 'tooltip',
    isEnabled: () => true,
    getDoc: () => {
      var _paperRef$current$own, _paperRef$current;

      return (_paperRef$current$own = (_paperRef$current = paperRef.current) === null || _paperRef$current === void 0 ? void 0 : _paperRef$current.ownerDocument) !== null && _paperRef$current$own !== void 0 ? _paperRef$current$own : document;
    }
  }, TrapFocusProps), /*#__PURE__*/React.createElement(TransitionComponent, TransitionProps, /*#__PURE__*/React.createElement(_Paper.default, {
    tabIndex: -1,
    elevation: 8,
    ref: handlePaperRef,
    className: (0, _clsx.default)(classes.paper, placement === 'top' && classes.topTransition),
    onClick: onPaperClick,
    onTouchStart: onPaperTouchStart
  }, children))));
};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPickersPopper'
})(PickersPopper);

exports.default = _default;