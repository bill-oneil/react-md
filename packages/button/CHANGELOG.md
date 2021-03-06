# v2.0.0

The `Button` component was completely re-written in this release for full
Typescript support, forwarding the ref to the `<button>` element, and can be
rendered with only children to enable a default theme. However, the `Button`
component removed built-in support for tooltips and rendering icons with text as
well as the floating button styles.

A new `UnstyledButton` component was added that can be used to create a
clickable element with the native accessibility of a `<button>` without the
default styles.

## New Behavior and Features

- added a new `UnstyledButton` component that can be used for simple clickable
  elements without the default browser button styles (think of this as a better
  version of `AccessibleFakeButton`)
- buttons can be rendered without requiring any of the theme props
- buttons will have a static size across all device sizes instead of changing
  between mobile and desktop
- switched from `px` to `rem`
- the SCSS variables, functions, and mixins are now in separate files and moved
  to the `dist` (and `dist/scss`) folder instead of `src`
- updated the theme to be configured with css variables and utility mixins

## Breaking changes

- updated the ref to be forwarded on to the `<button>` element
- removed built-in support for rendering icons
- removed the `component` and `href` props
- removed the `primary`, `secondary`, `flat`, `raised`, `floating`,
  `swapTheming`, and `icon` theme props
- removed the `fixed`, `fixedPosition`, and `mini` props
- removed the `tooltipLabel`, `tooltipDelay`, and `tooltipPosition` props
- removed the `iconClassName`, `iconChildren`, `iconEl`, `forceIconSize`,
  `forceIconFontSize`, and `svg` props
- removed the deprecated `FlatButton`, `RaisedButton`, `IconButton`, and
  `FloatingButton` components
- every SCSS variable, function, and mixin has been renamed or removed

### New SCSS Variables, Functions, and Mixins

- `$rmd-button-text-icon-inherit-color: true !default` - boolean if buttons that
  have both text and icons should force the icons to inherit the button color
- `$rmd-button-text-icon-size: 1.125rem !default` - a new icon size to apply to
  buttons that have both text and icons
- `$rmd-button-text-border-radius: 0.5rem !default` - a new border radius to
  apply to buttons that include text. **Note: there was no `border-radius` in
  `v1` for text buttons**
- `@function rmd-button-theme` - gets one of the theme values and validates that
  the theme name is valid
- `@function rmd-button-theme-var` - gets one of the theme values as a css
  variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-button-theme` - applies one of the theme values to a css property
  as a css variable
- `@mixin rmd-button-theme-update-var` - updates one of the theme values as a
  css variable
- `@mixin rmd-button-reset` - a minimal button reset that removes the default
  borders, outline, and focus effects from a button and adds
  `display: inline-flex`
- `@mixin rmd-button-base` - generates the base styles for a styled button
  within a selector if the button styles should be used without the `Button`
  component
- `@mixin rmd-button-text` - generates the styles for a text button within a
  selector if the text button styles should be used without the `Button`
  component
- `@mixin rmd-button-icon` - generates the styles for an icon button within a
  selector if the icon button styles should be used without the `Button`
  component
- `@mixin rmd-button` - generates the styles for a button within a selector if
  the button styles should be used without the `Button` component
- `mixin rmd-button-styled` - generates the base styles for an unstyled button
  if it's useful to not use the `UnstyledButton` component

### Renamed SCSS Variables and Values

- `$md-btn-tb-padding` was renamed to `$rmd-button-text-vertical-padding` and
  changed from a default value of `8px` to `0`
- `$md-btn-lr-padding` was renamed to `$rmd-button-text-horizontal-padding` and
  changed from a default value of `16px` to `1rem` (same size, just `rem`-ified)
- `$md-btn-min-width` was renamed to `$rmd-button-text-min-width` and changed
  from a default value of `88px` to a smaller `4rem`

### Removed SCSS Variables and Mixins

- the `$md-btn-include-flat`, `$md-btn-include-raised`, `$md-btn-include-icon`,
  and `$md-btn-include-floating` variables have been completely removed with no
  new implementation
- the `$md-btn-fized-z-index`, `$md-btn-mobile-floating-margin`,
  `$md-btn-desktop-floating-margin`, `$md-btn-floating-size`,
  `$md-btn-floating-dense-size`, `$md-btn-floating-mini-size`, and
  `$md-btn-floating-fixed-positions` variables were removed size floating
  buttons aren't included in this release
- the `$md-btn-mobile-height`, `$md-btn-mobile-font-size`,
  `$md-btn-desktop-height`, and `$md-btn-desktop-font-size` variables were
  removed since buttons no longer change size and font-size based on device size
- `@mixin react-md-theme-buttons` was removed since the new theming functions
  and mixins are preferred
- `@mixin react-md-buttons-mobile`, `@mixin react-md-buttons-desktop`, and
  `@mixin react-md-buttons-media` removed due to having a static size on all
  devices now
- `@mixin react-md-button-fixed-positions` removed due to no longer having
  floating buttons

## Rendering non-button components and elements

This release "simplified" the button component as now it can only be rendered as
a `<button>`. There is no longer support to render as a link (when the `href`)
prop was provided or the provided `component` prop to be able to render as any
React Component. Instead, there is now an exported `buttonThemeClassNames`
function that can be used instead to apply a button theme to any other component
with the generated class names.

```tsx
const LinkStyledButton = ({
  classname,
  theme,
  themeType,
  buttonType,
  children,
  ...props
}) => (
  <a
    {...props}
    className={buttonThemeClassNames({
      className,
      theme,
      themeType,
      buttonType,
      children,
    })}
  >
    {children}
  </a>
);
```

## Theming

The theme has been updated along with the default props so now you can render a
`Button` without provided any props and it will render without any warnings and
with general button styles. This is possible since the theming props were moved
into:

- `theme`
- `themeType`
- `buttonType`

### `theme`

Using the new `theme` prop is a replacement the `primary` and `secondary` props,
but also includes 3 additional themes. The supported values are:

- `clear`
- `primary` (default)
- `secondary`
- `warning`
- `error`

### `themeType`

Using the new `themeType` prop is a replacement for the `raised`, `flat`, and
`floating` props. The supported values are:

- `flat` (default)
- `outline`
- `contained` - this is a rename for the `raised` and `floating` specs

The value of this prop affects how the `theme` prop gets applied as well. A
`themeType` of `flat` will apply the `theme` to the text color of the button. A
`themeType` of `outline` will apply the `theme` to the text color and outline of
the button. Finally, a `themeType` of `contained` will apply the theme color to
the background of the button and update the text color to be legible on that
background color.

### `buttonType`

Using the new `buttonType` prop is how you can now render either as a text or
icon button. The supported values are:

- text (default)
- icon

A small change is that the `floating` spec was entirely removed as it can be
implemented by providing `buttonType="icon"` and `themeType="contained"`.

## Icon Support

Built-in icon rendering support was also removed since it became confusing about
how to render an icon button vs an text button with an icon. The icons can be
added back by using the `TextIconSpacing` component from the [@react-md/icon]
package. There is also a new icon package [@react-md/material-icons] that can be
used to implement all the pre-made icons, so it felt easier to keep the icon
support omitted.

```tsx
import React from "react";
import { Button } from "@react-md/button";
import { TextIconSpacing } from "@react-md/icon";
import { InfoSVGIcon } from "@react-md/material-icons";

const Example = () => (
  <Button>
    <TextIconSpacing icon={<InfoSVGIcon />}>Info</TextIconSpacing>
  </Button>
);
```

[@react-md/icon]: https://github.com/mlaursen/react-md/tree/master/packages/icon
[@react-md/material-icons]:
  https://github.com/mlaursen/react-md/tree/master/packages/material-icons
