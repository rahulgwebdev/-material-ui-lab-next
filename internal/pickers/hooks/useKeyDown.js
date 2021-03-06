import * as React from 'react';
export const useIsomorphicEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
export function runKeyHandler(event, keyHandlers) {
  // tslint:disable-next-line deprecation IE11
  const handler = keyHandlers[event.keyCode];

  if (handler) {
    handler(); // if event was handled prevent other side effects (e.g. page scroll)

    event.preventDefault();
  }
}
export function useKeyDownHandler(active, keyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  return React.useCallback(event => {
    if (active) {
      runKeyHandler(event, keyHandlersRef.current);
    }
  }, [active]);
}
export function useGlobalKeyDown(active, keyHandlers) {
  const keyHandlersRef = React.useRef(keyHandlers);
  keyHandlersRef.current = keyHandlers;
  useIsomorphicEffect(() => {
    if (active) {
      const handleKeyDown = nativeEvent => {
        runKeyHandler(nativeEvent, keyHandlersRef.current);
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    return undefined;
  }, [active]);
}
export const keycode = {
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