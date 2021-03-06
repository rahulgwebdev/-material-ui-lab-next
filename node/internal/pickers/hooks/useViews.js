"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViews = useViews;

var React = _interopRequireWildcard(require("react"));

var _utils = require("@material-ui/core/utils");

var _utils2 = require("../utils");

function useViews({
  view,
  views,
  openTo,
  onChange,
  onViewChange
}) {
  var _views, _views2;

  const [openView, setOpenView] = (0, _utils.useControlled)({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && (0, _utils2.arrayIncludes)(views, openTo) ? openTo : views[0]
  });
  const previousView = (_views = views[views.indexOf(openView) - 1]) !== null && _views !== void 0 ? _views : null;
  const nextView = (_views2 = views[views.indexOf(openView) + 1]) !== null && _views2 !== void 0 ? _views2 : null;
  const changeView = React.useCallback(newView => {
    setOpenView(newView);

    if (onViewChange) {
      onViewChange(newView);
    }
  }, [setOpenView, onViewChange]);
  const openNext = React.useCallback(() => {
    if (nextView) {
      changeView(nextView);
    }
  }, [nextView, changeView]);
  const handleChangeAndOpenNext = React.useCallback((date, currentViewSelectionState) => {
    const isSelectionFinishedOnCurrentView = currentViewSelectionState === 'finish';
    const globalSelectionState = isSelectionFinishedOnCurrentView && Boolean(nextView) ? 'partial' : currentViewSelectionState;
    onChange(date, globalSelectionState);

    if (isSelectionFinishedOnCurrentView) {
      openNext();
    }
  }, [nextView, onChange, openNext]);
  return {
    nextView,
    previousView,
    openNext,
    handleChangeAndOpenNext,
    openView,
    setOpenView: changeView
  };
}