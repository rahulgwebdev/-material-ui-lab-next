"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _PickersFadeTransitionGroup = _interopRequireDefault(require("./PickersFadeTransitionGroup"));

var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));

var _PickersArrowSwitcher = _interopRequireDefault(require("../internal/pickers/PickersArrowSwitcher"));

var _dateHelpersHooks = require("../internal/pickers/hooks/date-helpers-hooks");

// tslint:disable-next-line no-relative-import-in-test
const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 24,
    paddingRight: 12,
    // prevent jumping in safari
    maxHeight: 30,
    minHeight: 30
  },
  yearSelectionSwitcher: {
    marginRight: 'auto'
  },
  switchView: {
    willChange: 'transform',
    transition: theme.transitions.create('transform'),
    transform: 'rotate(0deg)'
  },
  switchViewActive: {
    transform: 'rotate(180deg)'
  },
  label: (0, _extends2.default)({
    display: 'flex',
    maxHeight: 30,
    overflow: 'hidden',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 'auto'
  }, theme.typography.body1, {
    fontWeight: theme.typography.fontWeightMedium
  }),
  labelItem: {
    marginRight: 6
  }
});

exports.styles = styles;

function getSwitchingViewAriaText(view) {
  return view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view';
}
/**
 * @ignore - do not document.
 */


function PickersCalendarHeader(props) {
  const {
    classes,
    components = {},
    componentsProps = {},
    currentMonth: month,
    disableFuture,
    disablePast,
    getViewSwitchingButtonText = getSwitchingViewAriaText,
    leftArrowButtonText = 'Previous month',
    maxDate,
    minDate,
    onMonthChange,
    onViewChange,
    openView: currentView,
    reduceAnimations,
    rightArrowButtonText = 'Next month',
    views
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const SwitchViewButton = components.SwitchViewButton || _IconButton.default;
  const switchViewButtonProps = componentsProps.switchViewButton || {};
  const SwitchViewIcon = components.SwitchViewIcon || _ArrowDropDown.default;

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(month), 'left');

  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(month), 'right');

  const isNextMonthDisabled = (0, _dateHelpersHooks.useNextMonthDisabled)(month, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = (0, _dateHelpersHooks.usePreviousMonthDisabled)(month, {
    disablePast,
    minDate
  });

  const handleToggleView = () => {
    if (views.length === 1 || !onViewChange) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find(view => view !== currentView) || views[0]);
    } else {
      // switching only between first 2
      const nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
      onViewChange(views[nextIndexToOpen]);
    }
  }; // No need to display more information


  if (views.length === 1 && views[0] === 'year') {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement("div", {
    role: "presentation",
    className: classes.label,
    onClick: handleToggleView
  }, /*#__PURE__*/React.createElement(_PickersFadeTransitionGroup.default, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'month')
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    className: classes.labelItem
  }, utils.format(month, 'month'))), /*#__PURE__*/React.createElement(_PickersFadeTransitionGroup.default, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'year')
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    className: classes.labelItem
  }, utils.format(month, 'year'))), views.length > 1 && /*#__PURE__*/React.createElement(SwitchViewButton, (0, _extends2.default)({
    size: "small",
    className: classes.yearSelectionSwitcher,
    "aria-label": getViewSwitchingButtonText(currentView)
  }, switchViewButtonProps), /*#__PURE__*/React.createElement(SwitchViewIcon, {
    className: (0, _clsx.default)(classes.switchView, currentView === 'year' && classes.switchViewActive)
  }))), /*#__PURE__*/React.createElement(_Fade.default, {
    in: currentView === 'date'
  }, /*#__PURE__*/React.createElement(_PickersArrowSwitcher.default, {
    leftArrowButtonText: leftArrowButtonText,
    rightArrowButtonText: rightArrowButtonText,
    components: components,
    componentsProps: componentsProps,
    onLeftClick: selectPreviousMonth,
    onRightClick: selectNextMonth,
    isLeftDisabled: isPreviousMonthDisabled,
    isRightDisabled: isNextMonthDisabled
  })));
}

process.env.NODE_ENV !== "production" ? PickersCalendarHeader.propTypes = {
  leftArrowButtonText: _propTypes.default.string,
  rightArrowButtonText: _propTypes.default.string
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPickersCalendarHeader'
})(PickersCalendarHeader);

exports.default = _default;