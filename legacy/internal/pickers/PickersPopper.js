import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import clsx from 'clsx';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TrapFocus from '@material-ui/core/Unstable_TrapFocus';
import { useForkRef, useEventCallback, ownerDocument } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import { useGlobalKeyDown, keycode } from './hooks/useKeyDown';
export var styles = function styles(theme) {
  return {
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
  };
};

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
  var movedRef = React.useRef(false);
  var syntheticEventRef = React.useRef(false);
  var nodeRef = React.useRef(null);
  var activatedRef = React.useRef(false);
  React.useEffect(function () {
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
    return function () {
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

  var handleClickAway = useEventCallback(function (event) {
    if (!activatedRef.current) {
      return;
    } // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.


    var insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    var doc = ownerDocument(nodeRef.current); // 1. IE11 support, which trigger the handleClickAway even after the unbind
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

    var insideDOM; // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js

    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  }); // Keep track of mouse/touch events that bubbled up through the portal.

  var handleSynthetic = function handleSynthetic() {
    syntheticEventRef.current = true;
  };

  React.useEffect(function () {
    if (active) {
      var doc = ownerDocument(nodeRef.current);

      var handleTouchMove = function handleTouchMove() {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return function () {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(function () {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      var doc = ownerDocument(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return function () {
        doc.removeEventListener('click', handleClickAway);
      };
    }

    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}

var PickersPopper = function PickersPopper(props) {
  var anchorEl = props.anchorEl,
      children = props.children,
      classes = props.classes,
      _props$containerRef = props.containerRef,
      containerRef = _props$containerRef === void 0 ? null : _props$containerRef,
      onClose = props.onClose,
      open = props.open,
      PopperProps = props.PopperProps,
      role = props.role,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TrapFocusProps = props.TrapFocusProps;
  useGlobalKeyDown(open, _defineProperty({}, keycode.Esc, onClose));
  var lastFocusedElementRef = React.useRef(null);
  React.useEffect(function () {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);

  var _useClickAwayListener = useClickAwayListener(open, onClose),
      _useClickAwayListener2 = _slicedToArray(_useClickAwayListener, 3),
      clickAwayRef = _useClickAwayListener2[0],
      onPaperClick = _useClickAwayListener2[1],
      onPaperTouchStart = _useClickAwayListener2[2];

  var paperRef = React.useRef(null);
  var handleRef = useForkRef(paperRef, containerRef);
  var handlePaperRef = useForkRef(handleRef, clickAwayRef);
  return /*#__PURE__*/React.createElement(Popper, _extends({
    transition: true,
    role: role,
    open: open,
    anchorEl: anchorEl,
    className: clsx(classes.root, PopperProps === null || PopperProps === void 0 ? void 0 : PopperProps.className)
  }, PopperProps), function (_ref) {
    var TransitionProps = _ref.TransitionProps,
        placement = _ref.placement;
    return /*#__PURE__*/React.createElement(TrapFocus, _extends({
      open: open,
      disableAutoFocus: true,
      disableEnforceFocus: role === 'tooltip',
      isEnabled: function isEnabled() {
        return true;
      },
      getDoc: function getDoc() {
        var _paperRef$current$own, _paperRef$current;

        return (_paperRef$current$own = (_paperRef$current = paperRef.current) === null || _paperRef$current === void 0 ? void 0 : _paperRef$current.ownerDocument) !== null && _paperRef$current$own !== void 0 ? _paperRef$current$own : document;
      }
    }, TrapFocusProps), /*#__PURE__*/React.createElement(TransitionComponent, TransitionProps, /*#__PURE__*/React.createElement(Paper, {
      tabIndex: -1,
      elevation: 8,
      ref: handlePaperRef,
      className: clsx(classes.paper, placement === 'top' && classes.topTransition),
      onClick: onPaperClick,
      onTouchStart: onPaperTouchStart
    }, children)));
  });
};

export default withStyles(styles, {
  name: 'MuiPickersPopper'
})(PickersPopper);