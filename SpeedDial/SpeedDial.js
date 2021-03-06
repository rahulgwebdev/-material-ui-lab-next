import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import SpeedDial from '@material-ui/core/SpeedDial';
let warnedOnce = false;
/**
 * @ignore - do not document.
 */

export default /*#__PURE__*/React.forwardRef(function DeprecatedSpeedDial(props, ref) {
  if (!warnedOnce) {
    console.warn(['Material-UI: The SpeedDial component was moved from the lab to the core.', '', "You should use `import { SpeedDial } from '@material-ui/core'`", "or `import SpeedDial from '@material-ui/core/SpeedDial'`"].join('\n'));
    warnedOnce = true;
  }

  return /*#__PURE__*/React.createElement(SpeedDial, _extends({
    ref: ref
  }, props));
});