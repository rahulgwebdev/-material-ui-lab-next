import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import FadeTransitionGroup from './PickersFadeTransitionGroup';
// tslint:disable-next-line no-relative-import-in-test
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import PickersArrowSwitcher from '../internal/pickers/PickersArrowSwitcher';
import { usePreviousMonthDisabled, useNextMonthDisabled } from '../internal/pickers/hooks/date-helpers-hooks';
export var styles = function styles(theme) {
  return {
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
    label: _extends({
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
  };
};

function getSwitchingViewAriaText(view) {
  return view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view';
}
/**
 * @ignore - do not document.
 */


function PickersCalendarHeader(props) {
  var classes = props.classes,
      _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      month = props.currentMonth,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      _props$getViewSwitchi = props.getViewSwitchingButtonText,
      getViewSwitchingButtonText = _props$getViewSwitchi === void 0 ? getSwitchingViewAriaText : _props$getViewSwitchi,
      _props$leftArrowButto = props.leftArrowButtonText,
      leftArrowButtonText = _props$leftArrowButto === void 0 ? 'Previous month' : _props$leftArrowButto,
      maxDate = props.maxDate,
      minDate = props.minDate,
      onMonthChange = props.onMonthChange,
      onViewChange = props.onViewChange,
      currentView = props.openView,
      reduceAnimations = props.reduceAnimations,
      _props$rightArrowButt = props.rightArrowButtonText,
      rightArrowButtonText = _props$rightArrowButt === void 0 ? 'Next month' : _props$rightArrowButt,
      views = props.views;
  var utils = useUtils();
  var SwitchViewButton = components.SwitchViewButton || IconButton;
  var switchViewButtonProps = componentsProps.switchViewButton || {};
  var SwitchViewIcon = components.SwitchViewIcon || ArrowDropDownIcon;

  var selectNextMonth = function selectNextMonth() {
    return onMonthChange(utils.getNextMonth(month), 'left');
  };

  var selectPreviousMonth = function selectPreviousMonth() {
    return onMonthChange(utils.getPreviousMonth(month), 'right');
  };

  var isNextMonthDisabled = useNextMonthDisabled(month, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
    disablePast: disablePast,
    minDate: minDate
  });

  var handleToggleView = function handleToggleView() {
    if (views.length === 1 || !onViewChange) {
      return;
    }

    if (views.length === 2) {
      onViewChange(views.find(function (view) {
        return view !== currentView;
      }) || views[0]);
    } else {
      // switching only between first 2
      var nextIndexToOpen = views.indexOf(currentView) !== 0 ? 0 : 1;
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
  }, /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'month')
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    className: classes.labelItem
  }, utils.format(month, 'month'))), /*#__PURE__*/React.createElement(FadeTransitionGroup, {
    reduceAnimations: reduceAnimations,
    transKey: utils.format(month, 'year')
  }, /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    className: classes.labelItem
  }, utils.format(month, 'year'))), views.length > 1 && /*#__PURE__*/React.createElement(SwitchViewButton, _extends({
    size: "small",
    className: classes.yearSelectionSwitcher,
    "aria-label": getViewSwitchingButtonText(currentView)
  }, switchViewButtonProps), /*#__PURE__*/React.createElement(SwitchViewIcon, {
    className: clsx(classes.switchView, currentView === 'year' && classes.switchViewActive)
  }))), /*#__PURE__*/React.createElement(Fade, {
    in: currentView === 'date'
  }, /*#__PURE__*/React.createElement(PickersArrowSwitcher, {
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
  leftArrowButtonText: PropTypes.string,
  rightArrowButtonText: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'MuiPickersCalendarHeader'
})(PickersCalendarHeader);