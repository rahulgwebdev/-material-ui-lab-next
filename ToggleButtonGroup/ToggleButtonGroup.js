import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedToggleButtonGroup(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The ToggleButtonGroup component was moved from the lab to the core.', '', "You should use `import { ToggleButtonGroup } from '@material-ui/core'`", "or `import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/React.createElement(ToggleButtonGroup, _extends({
    ref: ref
  }, props));
});