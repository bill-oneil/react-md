import {
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInteractionModeContext } from "@react-md/states";
import { UserInteractionMode } from "@react-md/states/types/useModeDetection";
import { getViewportSize, useTimeout, useToggle } from "@react-md/utils";

import { DEFAULT_DELAY, DEFAULT_THRESHOLD } from "./constants";
import {
  useTooltipHoverModeDelay,
  useTooltipHoverModeActions,
  useTooltipHoverModeEnabled,
} from "./useTooltipHoverMode";
import { TooltipPosition, TooltipProps } from "./Tooltip";

type TooltipInitiated = UserInteractionMode | null;

interface HandlersBaseOptions {
  mode: UserInteractionMode;
  showTooltip: () => void;
  hideTooltip: () => void;
  /**
   * This is _normally_ triggered at when a timeout starts to help determine what the
   * animation position for the tooltip should be. If this isn't set before the animation
   * starts, the tooltip will animate weirdly.
   */
  setEstimatedPosition: (container: HTMLElement) => void;

  /**
   * The type of interaction that initiated the tooltip. When this value is `null`,
   * the tooltip hasn't been initiated yet and _should_ not be visible within the
   * page as well.
   *
   * When this is set to "window", it means that the tooltip was visible when the entire
   * window was blurred. Check out the keyboard `onFocus` comment for more info about
   * this flow.
   */
  initiated: MutableRefObject<TooltipInitiated>;

  /**
   * A small callback that will set the current initiation type for the tooltip.
   */
  setInitiated: (mode: TooltipInitiated) => void;

  /**
   * The amount of delay to wait before showing the tooltip for the mouse and keyboard
   * flows. In the touch flow, this is the amount of time before the tooltip will hide
   * after the user releases their finger from the phone.
   */
  delay: number;
}

type MergableMouseHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onMouseEnter" | "onMouseLeave"
>;

interface MouseOptions extends MergableMouseHandlers, HandlersBaseOptions {
  disableHoverMode?: boolean;
}

/**
 * This handles creating and returning the required mouse event listeners
 * to show and hide tooltips as needed. If there were any mouse event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 */
export function useMouseState({
  mode,
  showTooltip,
  hideTooltip,
  initiated,
  setInitiated,
  delay: propDelay,
  onMouseEnter,
  onMouseLeave,
  setEstimatedPosition,
  disableHoverMode,
}: MouseOptions) {
  const handlers = useRef({ onMouseEnter, onMouseLeave });
  useEffect(() => {
    handlers.current = { onMouseEnter, onMouseLeave };
  });

  let isHoverModeable = useTooltipHoverModeEnabled();
  if (typeof disableHoverMode === "boolean") {
    isHoverModeable = !disableHoverMode;
  }

  let delay = useTooltipHoverModeDelay();
  if (!isHoverModeable) {
    delay = propDelay;
  }

  const hoverModeActions = useTooltipHoverModeActions();

  const { start, stop } = useTimeout(() => {
    if (initiated.current === "mouse") {
      showTooltip();

      if (isHoverModeable) {
        hoverModeActions.enable();
      }
    }
  }, delay);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseEnter } = handlers.current;
      if (onMouseEnter) {
        onMouseEnter(event);
      }

      if (initiated.current !== null) {
        return;
      }

      setInitiated("mouse");
      setEstimatedPosition(event.currentTarget);
      start();
    },
    []
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onMouseLeave } = handlers.current;
      if (onMouseLeave) {
        onMouseLeave(event);
      }

      if (initiated.current !== "mouse") {
        return;
      }

      stop();
      hideTooltip();
      if (isHoverModeable) {
        hoverModeActions.startDisableTimer();
      }
    },
    [isHoverModeable]
  );

  return {
    stopMouseTimer: stop,
    mouseHandlers: {
      // the mouse flows should not be returned for the touch mode since
      // the mouseenter event is still triggered after a touch
      onMouseEnter: mode !== "touch" ? handleMouseEnter : onMouseEnter,
      onMouseLeave: mode !== "touch" ? handleMouseLeave : onMouseLeave,
    },
  };
}

type MergableKeyboardHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onFocus" | "onBlur" | "onKeyDown"
>;

interface KeyboardOptions
  extends MergableKeyboardHandlers,
    HandlersBaseOptions {}

/**
 * This handles creating and returning the required keyboard event listeners
 * to show and hide tooltips as needed. If there were any keyboard event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 */
export function useKeyboardState({
  mode,
  showTooltip,
  hideTooltip,
  delay,
  initiated,
  setInitiated,
  onFocus,
  onBlur,
  onKeyDown,
  setEstimatedPosition,
}: KeyboardOptions) {
  const handlers = useRef({ onFocus, onBlur, onKeyDown });
  useEffect(() => {
    handlers.current = { onFocus, onBlur, onKeyDown };
  });

  const isWindowBlurred = useRef(false);

  const { start, stop } = useTimeout(() => {
    if (initiated.current === "keyboard") {
      showTooltip();
    }
  }, delay);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const { onFocus } = handlers.current;
    if (onFocus) {
      onFocus(event);
    }

    // if the entire browser window was blurred, we don't want to show the tooltip
    // on the next focus event since it is confusing to see a tooltip appear again
    // after re-focusing a window.
    if (isWindowBlurred.current) {
      isWindowBlurred.current = false;
      return;
    }

    setInitiated("keyboard");
    setEstimatedPosition(event.currentTarget);
    start();
  }, []);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const { onBlur } = handlers.current;
    if (onBlur) {
      onBlur(event);
    }

    stop();
    hideTooltip();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const { onKeyDown } = handlers.current;
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (initiated.current === "keyboard" && event.key === "Escape") {
        stop();
        hideTooltip();
      }
    },
    []
  );

  useEffect(() => {
    if (mode !== "keyboard") {
      return;
    }

    // whenever the browser loses focus, need to ensure that when the browser is re-focused
    // the last focused element (that had a tooltip) does not make the tooltip appear
    const handleWindowBlur = (event: Event) => {
      if (document.hidden) {
        isWindowBlurred.current = true;
        hideTooltip();
      } else {
        window.requestAnimationFrame(() => {
          isWindowBlurred.current = false;
        });
      }
    };

    window.addEventListener("visibilitychange", handleWindowBlur);
    return () => {
      window.removeEventListener("visibilitychange", handleWindowBlur);
    };
  }, [mode, hideTooltip]);

  return {
    stopKeyboardTimer: stop,
    keyboardHandlers: {
      onFocus: mode === "keyboard" ? handleFocus : onFocus,
      onBlur: mode === "keyboard" ? handleBlur : onBlur,
      onKeyDown: mode === "keyboard" ? handleKeyDown : onKeyDown,
    },
  };
}

type MergableTouchHandlers = Pick<
  HTMLAttributes<HTMLElement>,
  "onTouchStart" | "onTouchMove" | "onContextMenu"
>;

interface TouchOptions extends MergableTouchHandlers, HandlersBaseOptions {
  visible: boolean;
}

/**
 * This handles creating and returning the required touch event listeners
 * to show and hide tooltips as needed. If there were any touch event listeners
 * passed in, they will be merged with the tooltip logic automatically and
 * memoized.
 *
 * Tooltips on touch devices are a bit different than mouse and keyboard. Since tooltips
 * appear after a long press on mobile and long presses on mobile cause a context menu
 * to appear, no timeouts for showing the tooltip are started after a touchstart event.
 * The tooltip will only appear after a contextmenu event which has the default behavior
 * prevented so the tooltip appears instead. After the tooltip appears, it will stay
 * visible as long as the user keeps their finter on their phone. Once they remove their
 * finger, the tooltip will be visible for another `x`ms to make it easier to read without
 * their finter in the way and finally hide.
 */
export function useTouchState({
  mode,
  visible,
  showTooltip,
  hideTooltip,
  delay,
  setInitiated,
  onTouchStart,
  onTouchMove,
  onContextMenu,
  setEstimatedPosition,
}: TouchOptions) {
  const touched = useRef(false);
  const handlers = useRef({ onTouchStart, onTouchMove, onContextMenu });
  useEffect(() => {
    handlers.current = { onTouchStart, onTouchMove, onContextMenu };
  });

  const { start, stop } = useTimeout(() => {
    touched.current = false;
    hideTooltip();
  }, delay);

  useEffect(() => {
    if (!visible) {
      return;
    } else if (mode !== "touch") {
      touched.current = false;
      return;
    }

    const cb = () => {
      start();
      window.removeEventListener("touchend", cb, true);
    };

    window.addEventListener("touchend", cb, true);
    return () => {
      window.removeEventListener("touchend", cb, true);
    };
  }, [visible, mode]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchStart } = handlers.current;
      if (onTouchStart) {
        onTouchStart(event);
      }

      touched.current = true;
      stop();
      setEstimatedPosition(event.currentTarget);
    },
    []
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      const { onTouchMove } = handlers.current;
      if (onTouchMove) {
        onTouchMove(event);
      }

      touched.current = false;
    },
    []
  );

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const { onContextMenu } = handlers.current;
      if (onContextMenu) {
        onContextMenu(event);
      }

      if (!touched.current) {
        return;
      }

      // need to prevent the context menu from appearing and instead show the tooltip
      event.preventDefault();

      // since the context menu might also select text by default, we want to deselect any
      // selected text if it is within the container element
      const selection = window.getSelection();
      const selectionNode =
        selection && selection.anchorNode && selection.anchorNode.parentElement;
      if (
        selection &&
        selectionNode &&
        event.currentTarget.contains(selectionNode)
      ) {
        selection.empty();
      }

      setInitiated("touch");
      showTooltip();
    },
    []
  );

  return {
    stopTouchTimer: stop,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onContextMenu: mode === "touch" ? handleContextMenu : onContextMenu,
    },
  };
}

interface OtherInteractionsHideOptions
  extends Pick<HandlersBaseOptions, "hideTooltip"> {
  visible: boolean;
}

/**
 * When the tooltip becomes visible, the tooltip should be hidden if any element
 * within the page is clicked, or the browser is blurred. This hook will just
 * add the required event listeners to hide the tooltip.
 *
 * Whent he entire window is blurred, we start a different flow to ensure that
 * a tooltip won't appear when the window is re-focused. Without this flow, a
 * keyboard user that had focused a tooltippable element will have the tooltip
 * appear again after `x`ms which is not wanted. The user will need to manually
 * re-focus the tooltippable element to show a tooltip again.
 */
export function useOtherInteractionDisable({
  visible,
  hideTooltip,
}: OtherInteractionsHideOptions) {
  useEffect(() => {
    if (!visible) {
      return;
    }

    window.addEventListener("click", hideTooltip, true);
    return () => {
      window.removeEventListener("click", hideTooltip, true);
    };
  }, [visible, hideTooltip]);
}

interface PositionOptions {
  position?: TooltipPosition;
  defaultPosition: TooltipPosition;
  threshold: number;
}

const NOOP = () => {};

/**
 * A small hook that will set the tooltip position automatically based on the container
 * element's location within the viewport. However, if the `position` option/prop was
 * provided, that value will always be used instead.
 */
export function useTooltipPosition({
  position: determinedPosition,
  defaultPosition,
  threshold,
}: PositionOptions) {
  const [position, setPosition] = useState(defaultPosition);
  const prevPosition = useRef(position);
  useEffect(() => {
    prevPosition.current = position;
  });

  const setEstimatedPosition = useCallback((container: HTMLElement) => {
    const { top } = container.getBoundingClientRect();
    const vh = getViewportSize("height");
    const nextPosition = top > vh * threshold ? "above" : "below";
    if (prevPosition.current !== nextPosition) {
      setPosition(nextPosition);
    }
  }, []);

  const isDeterminedPosition = typeof determinedPosition !== "undefined";

  return {
    position: isDeterminedPosition ? determinedPosition : position,
    setEstimatedPosition: isDeterminedPosition ? NOOP : setEstimatedPosition,
  };
}

interface VisibilityChangeOptions {
  /**
   * An optional function to call after the tooltip becomes visible. You will be provided
   * the user interaction mode that caused the tooltip to become visible.
   */
  onShow?: (mode: UserInteractionMode) => void;

  /**
   * An optional function to call after the tooltip becomes visible.
   */
  onHide?: () => void;

  mode: TooltipInitiated;
  visible: boolean;
}

/**
 * This hook will call the `onShow` and `onHide` functions as needed based on the current interaction
 * mode and the visibility of the tooltip.
 *
 * @private
 */
export function useVisiblityChange({
  onShow,
  onHide,
  visible,
  mode,
}: VisibilityChangeOptions) {
  const handlers = useRef({ onShow, onHide });
  useEffect(() => {
    handlers.current = { onShow, onHide };
  });

  useEffect(() => {
    if (!visible || mode === null) {
      return;
    }

    const { onShow } = handlers.current;
    if (onShow) {
      onShow(mode);
    }

    return () => {
      const { onHide } = handlers.current;
      if (onHide) {
        onHide();
      }
    };
  }, [visible]);
}

export type MergableHandlers = MergableMouseHandlers &
  MergableKeyboardHandlers &
  MergableTouchHandlers;

export interface TooltipStateOptions
  extends MergableHandlers,
    Pick<TooltipProps, "position">,
    Pick<VisibilityChangeOptions, "onShow" | "onHide"> {
  /**
   * The threshold multiplier to apply to the entire viewheight to determine if the tooltip should be placed above or below
   * the container element.
   */
  positionThreshold?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the user keyboard
   * focuses the container element.
   */
  focusDelay?: number;

  /**
   * The amount of time in ms to wait before a tooltip should be shown after the user hovers
   * the container element.
   */
  hoverDelay?: number;

  /**
   * The amount of time in ms to wait before triggering the exit animation after the user stops
   * touching the container element on mobile devices.
   */
  touchTimeout?: number;

  /**
   * Bolean if the hover mode functionality should be disabled. When this is `undefined`, it will default to `false` if there is
   * no `ToolipHoverModeConfig` parent component of the current tooltip, otherwise it will be `true`. When this value is a boolean,
   * it will always be used instead.
   */
  disableHoverMode?: boolean;
}

/**
 * This is a reusable hook that allows you to have all the event listeners and visibility
 * logic of toolips so it can be used for any component. This is extremely helpful for when
 * you want to create more complex tooltips (like dialogs).
 *
 * The tooltip state flow is pretty complex, so here's a quick run down of some of the logic:
 * - the tooltip can only be shown by mouse, keyboard, or touch and can only be closed by the
 *   same "initiation" type. So basically if the tooltip was shown via mouse, it can only be
 *   closed by mouse as well.
 * - if the user resizes the window, scrolls the page, clicks anywhere on the page, switches tabs/
 *   blurs the browser window while the tooltip is visible, the tooltip will be hidden.
 * - a keyboard user can hide the tooltip by pressing the escape key after it was shown by focusing
 *   the element
 *
 * Since the tooltip can appear above or below the element, the position of the tooltip must be
 * determined before the tooltip becomes visible or else the animation will be in the wrong direction.
 * So when one of the starting interaction types happen to the container element, the initial position
 * is "guessed" based on the current viewport height and the position of the container element within
 * the viewport.
 */
export default function useTooltipState({
  position: propPosition,
  positionThreshold = DEFAULT_THRESHOLD,
  hoverDelay = DEFAULT_DELAY,
  touchTimeout = DEFAULT_DELAY,
  focusDelay = DEFAULT_DELAY,
  disableHoverMode,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onFocus,
  onBlur,
  onKeyDown,
  onShow,
  onHide,
}: TooltipStateOptions) {
  const mode = useInteractionModeContext();
  const initiated = useRef<TooltipInitiated>(null);
  const setInitiated = useCallback((initiatedBy: TooltipInitiated) => {
    initiated.current = initiatedBy;
  }, []);

  const { toggled: visible, enable: showTooltip, disable: hide } = useToggle();
  const hideTooltip = useCallback(() => {
    initiated.current = null;
    hide();
  }, []);

  useVisiblityChange({
    visible,
    onShow,
    onHide,
    mode: initiated.current,
  });

  const { position, setEstimatedPosition } = useTooltipPosition({
    position: propPosition,
    defaultPosition: "below",
    threshold: positionThreshold,
  });

  const { stopMouseTimer, mouseHandlers } = useMouseState({
    mode,
    showTooltip,
    hideTooltip,
    delay: hoverDelay,
    disableHoverMode,
    initiated,
    setInitiated,
    onMouseEnter,
    onMouseLeave,
    setEstimatedPosition,
  });

  const { stopKeyboardTimer, keyboardHandlers } = useKeyboardState({
    mode,
    showTooltip,
    hideTooltip,
    delay: focusDelay,
    initiated,
    setInitiated,
    onFocus,
    onBlur,
    onKeyDown,
    setEstimatedPosition,
  });

  const { stopTouchTimer, touchHandlers } = useTouchState({
    mode,
    visible,
    showTooltip,
    hideTooltip,
    delay: touchTimeout,
    initiated,
    setInitiated,
    onTouchStart,
    onTouchMove,
    setEstimatedPosition,
  });

  const hideAndReset = useCallback(() => {
    stopMouseTimer();
    stopKeyboardTimer();
    stopTouchTimer();
    hide();
  }, []);

  useOtherInteractionDisable({ visible, hideTooltip: hideAndReset });

  return {
    hide,
    visible,
    position,
    handlers: {
      ...mouseHandlers,
      ...keyboardHandlers,
      ...touchHandlers,
    },
  };
}