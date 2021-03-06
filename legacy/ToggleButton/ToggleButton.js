import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';
var warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedToggleButton(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The ToggleButton component was moved from the lab to the core.', '', "You should use `import { ToggleButton } from '@material-ui/core'`", "or `import ToggleButton from '@material-ui/core/ToggleButton'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/React.createElement(ToggleButton, _extends({
    ref: ref
  }, props));
});