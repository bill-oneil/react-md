# v2.0.0

This release has fixed the keyboard movement behavior for the expansion panels
as well as updating the API to use a hook instead of `React.cloneElement` hacks.
In addition, the `ExpansionPanel` will now no longer attempt to create equal
width labels within each panel and instead will need to be done manually.

The expansion behavior is now provided through a hook: `usePanels` that will
provide the required props for each of your panels as well as the "root"
`onKeyDown` event listener required to navigate between each panel. Since the
expansion functionality was moved into this hook, the `ExpansionList` component
is not actually useful other than enforcing that `children` and `onKeyDown`
props are required and provides no styles.

## New Behavior and Features

- all components now correctly forward the `ref` to the DOM element
- now provides a `usePanels` hook to implement keyboard focus behavior along
  with expansion logic for your panels
- the expansion logic was updated to support:
  - optionally prevent the last panel from being closed
  - optionally support multiple panels being expanded at once (multiple panel
    expansion is now opt-in)
- now exports an `ExpansionPanelHeader` component for additional customization
- fixed the keyboard focus behavior between panels
- now supports displaying persistent content that is not unmounted while the
  expansion panel is collapsed
- the spacing, padding, and icon-spacing can now be configured with CSS
  variables with the new theme mixin API
- now supports updating spacing and styling for right-to-left languages and
  layouts

## Breaking Changes

- no longer supports `label`, `secondaryLabel`, and `expandedSecondaryLabel`
  props and instead should use the `header` for content
- no longer supports equal width labels between panels and must be implemented
  manually
- no longer supports rendering the "Save" and "Cancel" buttons in the panel
  content by default and must be implemented manually.
- the `header` no longer changes height once expanded
- the `footer` prop was removed from the `ExpansionPanel` since the `children`
  should be used instead

### New SCSS Variables, Functions, and Mixins

- `$rmd-expansion-panel-expander-icon-spacing: $rmd-icon-spacing-with-text !default` -
  The spacing to use for the expansion panel's expander icon that will be used
  as `padding-left` for the icon
- `@function rmd-expansion-panel-theme` - gets one of the theme values and
  validates that the theme name is valid
- `@function rmd-expansion-panel-theme-var` - gets one of the theme values as a
  css variable with a fallback value and validates that the theme name is valid
- `@mixin rmd-expansion-panel-theme` - applies one of the theme values to a css
  property as a css variable
- `@mixin rmd-expansion-panel-theme-update-var` - updates one of the theme
  values as a css variable
- `@mixin react-md-expansion-panel` - creates all the styles required for the
  expansion panel package
- `@mixin rmd-expansion-panel` - used to apply all the expansion panel styles to
  a selector. Probably won't be used externally

### Renamed SCSS Variables, Functions, and Mixins

- rename `$md-expansion-panel-opened-margin` to `$rmd-expansion-panel-spacing`
  and changed the default value from `16px` to `1rem`
- renamed `$md-expansion-panel-padding` to `$rmd-expansion-panel-header-padding`
  and changed the default value from `24px` to `1rem`

### Removed SCSS Variables Placeholders, and Mixins

- removed `$md-expansion-panel-font-size` and
  `$md-expansion-panel-secondary-font-size` since there are no `label` props
  anymore
- removed `$md-expansion-panel-expanded-height` since the panel's header no
  longer changes height once expanded
- removed `@mixin react-md-theme-expansion-panels` since it is no longer
  required
- removed `@mixin react-md-expanion-panels`
