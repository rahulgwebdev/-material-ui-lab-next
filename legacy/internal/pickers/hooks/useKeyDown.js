import * as React from 'react';
export var useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
export function runKeyHandler(event, keyHandlers) {
  // tslint:disable-next-line deprecation IE11
  var handler = keyHandlers[event.keyCode];

  if (handler) {
    handler(); // if event was handled prevent other side effects (e.g. page scroll)

    event.preventDefault();
  }
}
export function useKeyDownHandler(active, keyHandlers) {
  var keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  return React.useCallback(function (event) {
    if (active) {
      runKeyHandler(event, keyHandlersRef.current);
    }
  }, [active]);
}
export function useGlobalKeyDown(active, keyHandlers) {
  var keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  useIsomorphicEffect(function () {
    if (active) {
      var handleKeyDown = function handleKeyDown(nativeEvent) {
        runKeyHandler(nativeEvent, keyHandlersRef.current);
      };

      document.addEventListener('keydown', handleKeyDown);
      return function () {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return undefined;
  }, [active]);
}
export var keycode = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Home: 36,
  End: 35,
  PageUp: 33,
  PageDown: 34,
  Esc: 27
};