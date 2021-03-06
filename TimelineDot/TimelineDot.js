import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { capitalize } from '@material-ui/core/utils';
import { withStyles, useThemeVariants } from '@material-ui/core/styles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignSelf: 'baseline',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 4,
    borderRadius: '50%',
    boxShadow: theme.shadows[1],
    margin: '11.5px 0'
  },

  /* Styles applied to the root element if `variant="filled"`. */
  filled: {},

  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {},

  /* Styles applied to the root element if `color="grey"` and `variant="filled"`. */
  filledGrey: {
    borderColor: 'transparent',
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.grey[400]
  },

  /* Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
  outlinedGrey: {
    boxShadow: 'none',
    color: theme.palette.grey.contrastText,
    borderColor: theme.palette.grey[400],
    backgroundColor: 'transparent'
  },

  /* Styles applied to the root element if `color="primary"` and `variant="filled"`. */
  filledPrimary: {
    borderColor: 'transparent',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
  outlinedPrimary: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderColor: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"` and `variant="filled"`. */
  filledSecondary: {
    borderColor: 'transparent',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  },

  /* Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
  outlinedSecondary: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderColor: theme.palette.secondary.main
  }
});
const TimelineDot = /*#__PURE__*/React.forwardRef(function TimelineDot(props, ref) {
  const {
    classes,
    className,
    color = 'grey',
    variant = 'filled'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "color", "variant"]);

  const themeVariantsClasses = useThemeVariants(_extends({}, props, {
    color,
    variant
  }), 'MuiTimelineDot');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: clsx(classes.root, classes[variant], themeVariantsClasses, className, color !== 'inherit' && classes[`${variant}${capitalize(color)}`]),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? TimelineDot.propTypes = {
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
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: PropTypes.oneOf(['grey', 'inherit', 'primary', 'secondary']),

  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
} : void 0;
export default withStyles(styles, {
  name: 'MuiTimelineDot'
})(TimelineDot);