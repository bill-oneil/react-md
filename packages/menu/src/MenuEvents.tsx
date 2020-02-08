import { MutableRefObject } from "react";
import { usePreviousFocus, useFocusOnMount } from "@react-md/utils";

export interface MenuEventsProps {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  defaultFocus: "first" | "last" | string;
}

/**
 * This is just a simple component that is used with the `Menu` component to
 * handle the initial focus on mount and re-focusing a previous element on
 * unmount.
 * @private
 */
export default function MenuEvents({
  menuRef,
  defaultFocus,
}: MenuEventsProps): null {
  usePreviousFocus(false);
  useFocusOnMount(menuRef, defaultFocus, false, true);
  return null;
}
