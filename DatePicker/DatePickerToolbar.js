import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { isYearAndMonthViews, isYearOnlyView } from '../internal/pickers/date-utils';
export const styles = {
  root: {},
  dateTitleLandscape: {
    margin: 'auto 16px auto auto'
  },
  penIcon: {
    position: 'relative',
    top: 4
  }
};
/**
 * @ignore - internal component.
 */

const DatePickerToolbar = (_ref) => {
  let {
    classes,
    date,
    isLandscape,
    isMobileKeyboardViewOpen,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'SELECT DATE',
    views
  } = _ref,
      other = _objectWithoutPropertiesLoose(_ref, ["classes", "date", "isLandscape", "isMobileKeyboardViewOpen", "onChange", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle", "views"]);

  const utils = useUtils();
  const dateText = React.useMemo(() => {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    if (isYearOnlyView(views)) {
      return utils.format(date, 'year');
    }

    if (isYearAndMonthViews(views)) {
      return utils.format(date, 'month');
    } // Little localization hack (Google is doing the same for android native pickers):
    // For english localization it is convenient to include weekday into the date "Mon, Jun 1".
    // For other locales using strings like "June 1", without weekday.


    return /en/.test(utils.getCurrentLocaleCode()) ? utils.format(date, 'normalDateWithWeekday') : utils.format(date, 'normalDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils, views]);
  return /*#__PURE__*/React.createElement(PickersToolbar, _extends({
    className: classes.root,
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: isLandscape,
    penIconClassName: classes.penIcon
  }, other), /*#__PURE__*/React.createElement(Typography, {
    variant: "h4",
    align: isLandscape ? 'left' : 'center',
    className: clsx(isLandscape && classes.dateTitleLandscape)
  }, dateText));
};

export default withStyles(styles, {
  name: 'MuiDatePickerToolbar'
})(DatePickerToolbar);