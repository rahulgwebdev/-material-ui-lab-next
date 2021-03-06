import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import { styled, withStyles } from '@material-ui/core/styles';
import { useViews } from '../hooks/useViews';
import ClockPicker from '../../../ClockPicker/ClockPicker';
import DayPicker from '../../../DayPicker/DayPicker';
import { KeyboardDateInput } from '../KeyboardDateInput';
import { useIsLandscape } from '../hooks/useIsLandscape';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';
import { WrapperVariantContext } from '../wrappers/WrapperVariantContext';
import PickerView from './PickerView';
export var MobileKeyboardInputView = styled('div')({
  padding: '16px 24px'
}, {
  name: 'MuiPickersMobileKeyboardInputView'
});
export var styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  landscape: {
    flexDirection: 'row'
  },
  pickerView: {
    overflowX: 'hidden',
    width: DIALOG_WIDTH,
    maxHeight: VIEW_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
  }
};
var MobileKeyboardTextFieldProps = {
  fullWidth: true
};

var isDatePickerView = function isDatePickerView(view) {
  return view === 'year' || view === 'month' || view === 'date';
};

var isTimePickerView = function isTimePickerView(view) {
  return view === 'hours' || view === 'minutes' || view === 'seconds';
};

function Picker(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      date = _ref.date,
      DateInputProps = _ref.DateInputProps,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      onDateChange = _ref.onDateChange,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'date' : _ref$openTo,
      orientation = _ref.orientation,
      showToolbar = _ref.showToolbar,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      _ref$ToolbarComponent = _ref.ToolbarComponent,
      ToolbarComponent = _ref$ToolbarComponent === void 0 ? function () {
    return null;
  } : _ref$ToolbarComponent,
      toolbarFormat = _ref.toolbarFormat,
      toolbarPlaceholder = _ref.toolbarPlaceholder,
      toolbarTitle = _ref.toolbarTitle,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['year', 'month', 'date', 'hours', 'minutes', 'seconds'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["classes", "className", "date", "DateInputProps", "isMobileKeyboardViewOpen", "onDateChange", "openTo", "orientation", "showToolbar", "toggleMobileKeyboardView", "ToolbarComponent", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"]);

  var isLandscape = useIsLandscape(views, orientation);
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var toShowToolbar = typeof showToolbar === 'undefined' ? wrapperVariant !== 'desktop' : showToolbar;
  var handleDateChange = React.useCallback(function (newDate, selectionState) {
    onDateChange(newDate, wrapperVariant, selectionState);
  }, [onDateChange, wrapperVariant]);

  var _useViews = useViews({
    view: undefined,
    views: views,
    openTo: openTo,
    onChange: handleDateChange
  }),
      openView = _useViews.openView,
      nextView = _useViews.nextView,
      previousView = _useViews.previousView,
      setOpenView = _useViews.setOpenView,
      handleChangeAndOpenNext = _useViews.handleChangeAndOpenNext;

  React.useEffect(function () {
    if (isMobileKeyboardViewOpen && toggleMobileKeyboardView) {
      toggleMobileKeyboardView();
    } // React on `openView` change

  }, [openView]); // eslint-disable-line

  return /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.root, className, isLandscape && classes.landscape)
  }, toShowToolbar && /*#__PURE__*/React.createElement(ToolbarComponent, _extends({}, other, {
    views: views,
    isLandscape: isLandscape,
    date: date,
    onChange: handleDateChange,
    setOpenView: setOpenView,
    openView: openView,
    toolbarTitle: toolbarTitle,
    toolbarFormat: toolbarFormat,
    toolbarPlaceholder: toolbarPlaceholder,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView
  })), /*#__PURE__*/React.createElement(PickerView, null, isMobileKeyboardViewOpen ? /*#__PURE__*/React.createElement(MobileKeyboardInputView, null, /*#__PURE__*/React.createElement(KeyboardDateInput, _extends({}, DateInputProps, {
    ignoreInvalidInputs: true,
    disableOpenPicker: true,
    TextFieldProps: MobileKeyboardTextFieldProps
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, isDatePickerView(openView) && /*#__PURE__*/React.createElement(DayPicker, _extends({
    date: date,
    onViewChange: setOpenView,
    onChange: handleChangeAndOpenNext,
    view: openView,
    views: views.filter(isDatePickerView)
  }, other)), isTimePickerView(openView) && /*#__PURE__*/React.createElement(ClockPicker, _extends({}, other, {
    date: date,
    view: openView,
    onChange: handleChangeAndOpenNext,
    openNextView: function openNextView() {
      return setOpenView(nextView);
    },
    openPreviousView: function openPreviousView() {
      return setOpenView(previousView);
    },
    nextViewAvailable: !nextView,
    previousViewAvailable: !previousView || isDatePickerView(previousView),
    showViewSwitcher: wrapperVariant === 'desktop'
  })))));
}

export default withStyles(styles, {
  name: 'MuiPicker'
})(Picker);