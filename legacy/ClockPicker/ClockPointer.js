import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from '../internal/pickers/constants/dimensions';
export var styles = function styles(theme) {
  return {
    root: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    animateTransform: {
      transition: theme.transitions.create(['transform', 'height'])
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '50%',
      position: 'absolute',
      top: -21,
      left: "calc(50% - ".concat(CLOCK_HOUR_WIDTH / 2, "px)"),
      border: "".concat((CLOCK_HOUR_WIDTH - 4) / 2, "px solid ").concat(theme.palette.primary.main),
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  };
};

/**
 * @ignore - internal component.
 */
var ClockPointer = /*#__PURE__*/function (_React$Component) {
  _inherits(ClockPointer, _React$Component);

  var _super = _createSuper(ClockPointer);

  function ClockPointer() {
    var _this;

    _classCallCheck(this, ClockPointer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      toAnimateTransform: false,
      // eslint-disable-next-line react/no-unused-state
      previousType: undefined
    };
    return _this;
  }

  _createClass(ClockPointer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          hasSelected = _this$props.hasSelected,
          isInner = _this$props.isInner,
          type = _this$props.type,
          value = _this$props.value,
          other = _objectWithoutProperties(_this$props, ["classes", "hasSelected", "isInner", "type", "value"]);

      var getAngleStyle = function getAngleStyle() {
        var max = type === 'hours' ? 12 : 60;
        var angle = 360 / max * value;

        if (type === 'hours' && value > 12) {
          angle -= 360; // round up angle to max 360 degrees
        }

        return {
          height: Math.round((isInner ? 0.26 : 0.4) * CLOCK_WIDTH),
          transform: "rotateZ(".concat(angle, "deg)")
        };
      };

      return /*#__PURE__*/React.createElement("div", _extends({
        style: getAngleStyle(),
        className: clsx(classes.root, this.state.toAnimateTransform && classes.animateTransform)
      }, other), /*#__PURE__*/React.createElement("div", {
        className: clsx(classes.thumb, hasSelected && classes.noPoint)
      }));
    }
  }]);

  return ClockPointer;
}(React.Component);

ClockPointer.getDerivedStateFromProps = function (nextProps, state) {
  if (nextProps.type !== state.previousType) {
    return {
      toAnimateTransform: true,
      previousType: nextProps.type
    };
  }

  return {
    toAnimateTransform: false,
    previousType: nextProps.type
  };
};

export default withStyles(styles, {
  name: 'MuiClockPointer'
})(ClockPointer);