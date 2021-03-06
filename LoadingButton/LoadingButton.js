import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the root element if `pending={true}`. */
  pending: {},

  /* Styles applied to the pendingIndicator element. */
  pendingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex'
  },

  /* Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)'
  },

  /* Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
  pendingIndicatorStart: {
    left: 14
  },

  /* Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
  pendingIndicatorEnd: {
    right: 14
  },

  /* Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
  endIconPendingEnd: {
    visibility: 'hidden'
  },

  /* Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
  startIconPendingStart: {
    visibility: 'hidden'
  },

  /* Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
  labelPendingCenter: {
    visibility: 'hidden'
  }
});
const PendingIndicator = /*#__PURE__*/React.createElement(CircularProgress, {
  color: "inherit",
  size: 16
});
const LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(props, ref) {
  const {
    children,
    classes,
    className,
    disabled = false,
    pending = false,
    pendingIndicator = PendingIndicator,
    pendingPosition = 'center'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "disabled", "pending", "pendingIndicator", "pendingPosition"]);

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: clsx(classes.root, className, pending && classes.pending),
    disabled: disabled || pending,
    ref: ref,
    classes: {
      startIcon: classes[`startIcon${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`],
      endIcon: classes[`endIcon${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`],
      label: classes[`label${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`]
    }
  }, other), pending && /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.pendingIndicator, classes[`pendingIndicator${capitalize(pendingPosition)}`])
  }, pendingIndicator), children);
});
process.env.NODE_ENV !== "production" ? LoadingButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the pending indicator is shown.
   * @default false
   */
  pending: PropTypes.bool,

  /**
   * Element placed before the children if the button is in pending state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  pendingIndicator: PropTypes.node,

  /**
   * The pending indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  pendingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), props => {
    if (props.pendingPosition === 'start' && !props.startIcon) {
      return new Error(`Material-UI: The pendingPosition="start" should be used in combination with startIcon.`);
    }

    if (props.pendingPosition === 'end' && !props.endIcon) {
      return new Error(`Material-UI: The pendingPosition="end" should be used in combination with endIcon.`);
    }

    return null;
  })
} : void 0;
export default withStyles(styles, {
  name: 'MuiLoadingButton'
})(LoadingButton);