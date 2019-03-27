import React, {
  createElement,
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactType,
  ReactNode,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

/**
 * A union of all the material design provided typography styles. When used with the Text
 * component, this will generate the correct typography className to apply and determine
 * what component to be rendered as if none was provided.
 */
export type TextTypes =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2"
  | "caption"
  | "overline"
  | "button";

export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "underline" | "overline" | "line-through";
export type TextTransform = "capitalize" | "uppercase" | "lowercase";
export type TextWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semi-bold"
  | "black";

/**
 * A union of the default supported elements that the `Text` component can be rendered as. This
 * is mostly used for adding the correct HTMLAttributes and enabling the forward ref.
 */
export type TextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

export type TextRenderFunction = (props: {
  className: string;
}) => ReactElement<any>;

export interface TextProps extends HTMLAttributes<TextElement> {
  /**
   * An optional className to merge into typography styles.
   */
  className?: string;

  /**
   * The component to render as when the children are not a render function. If this prop
   * is omitted, the component will be determined by the `type` prop where:
   * - `"headline-1" -> <h1>`
   * - `"headline-2" -> <h2>`
   * - `"headline-3" -> <h3>`
   * - `"headline-4" -> <h4>`
   * - `"headline-5" -> <h5>`
   * - `"headline-6" -> <h6>`
   * - `"subtitle-1" -> <h5>`
   * - `"subtitle-2" -> <h6>`
   * - `"body-1"     -> <p>`
   * - `"body-2"     -> <p>`
   * - `"caption"    -> <caption>`
   * - `"overline"   -> <span>`
   * - `"button"     -> <button>`
   *
   */
  component?: ReactType | null;

  /**
   * One of the material design typography text styles. This is used to generate a className
   * that can be applied to any element and have the correct typography.
   */
  type?: TextTypes;

  /**
   * Either a child render function or a react node. If this is not the child render function, a
   * different wrapper component can be provided using the `component` prop.
   */
  children?: ReactNode | TextRenderFunction;

  /**
   * Boolean if the browser default margin's should be removed. This is generally disabled
   * by default since it is helpful to have the default margins in place when using this
   * component to create text pages.
   */
  noMargin?: boolean;

  /**
   * An optional text alignment to apply.
   */
  align?: TextAlign;

  /**
   * An optional text decoration to apply.
   */
  decoration?: TextDecoration;

  /**
   * An optional text transformation to apply.
   */
  transform?: TextTransform;

  /**
   * An optional font-weight to apply.
   */
  weight?: TextWeight;
}

function getComponent(component: ReactType | null, type: TextTypes): ReactType {
  if (component) {
    return component;
  }

  switch (type) {
    case "headline-1":
      return "h1";
    case "headline-2":
      return "h2";
    case "headline-3":
      return "h3";
    case "headline-4":
      return "h4";
    case "headline-5":
      return "h5";
    case "headline-6":
    case "subtitle-1":
    case "subtitle-2":
      return "h6";
    case "body-1":
    case "body-2":
      return "p";
    case "caption":
      return "caption";
    case "button":
      return "button";
    default:
      return "span";
  }
}

type WithRef = WithForwardedRef<TextElement>;
type DefaultProps = Required<
  Pick<TextProps, "type" | "component" | "noMargin">
>;
type WithDefaultProps = TextProps & DefaultProps & WithRef;

const block = bem("rmd-typography");

/**
 * The `Text` component is used to render text with the material design typography styles applied.
 * By default, everything will be rendered in a `<p>` tag with the normal paragraph styles.
 *
 * When the `type` prop is changed to another typography style, this component will determine the
 * "best" element to render the text in *unless* the `component` prop is provided. The default
 * mapping is:
 * - `"headline-1" -> <h1>`
 * - `"headline-2" -> <h2>`
 * - `"headline-3" -> <h3>`
 * - `"headline-4" -> <h4>`
 * - `"headline-5" -> <h5>`
 * - `"headline-6" -> <h6>`
 * - `"subtitle-1" -> <h5>`
 * - `"subtitle-2" -> <h6>`
 * - `"body-1"     -> <p>`
 * - `"body-2"     -> <p>`
 * - `"caption"    -> <caption>`
 * - `"overline"   -> <span>`
 * - `"button"     -> <button>`
 * NOTE: if the `component` prop is not `null`, this logic will be ignored and the provided
 * `component` will be used instead.
 */
const Text: FunctionComponent<TextProps & WithRef> = providedProps => {
  const {
    className: propClassName,
    children,
    type,
    component,
    forwardedRef,
    noMargin,
    align,
    decoration,
    transform,
    weight,
    ...props
  } = providedProps as WithDefaultProps;

  const className = cn(
    block({
      [type]: true,
      "no-margin": noMargin,
      [align as string]: align,
      [decoration as string]: decoration,
      [transform as string]: transform,
      [weight as string]: weight,
    }),
    propClassName
  );
  if (typeof children === "function") {
    return (children as TextRenderFunction)({ className });
  }

  return createElement(
    getComponent(component, type),
    { ...props, className, ref: forwardedRef },
    children
  );
};

const defaultProps: DefaultProps = {
  type: "body-1",
  component: null,
  noMargin: false,
};

Text.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  Text.displayName = "Text";

  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    Text.propTypes = {
      className: PropTypes.string,
      type: PropTypes.oneOf([
        "headline-1",
        "headline-2",
        "headline-3",
        "headline-4",
        "headline-5",
        "headline-6",
        "subtitle-1",
        "subtitle-2",
        "body-1",
        "body-2",
        "caption",
        "overline",
        "button",
      ]),
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      align: PropTypes.oneOf(["left", "center", "right"]),
      decoration: PropTypes.oneOf(["underline", "overline", "line-through"]),
      weight: PropTypes.oneOf([
        "thin",
        "light",
        "regular",
        "medium",
        "bold",
        "semi-bold",
        "black",
      ]),
      transform: PropTypes.oneOf(["capitalize", "uppercase", "lowercase"]),
    };
  }
}

export default forwardRef<TextElement, TextProps>((props, ref) => (
  <Text {...props} forwardedRef={ref} />
));
