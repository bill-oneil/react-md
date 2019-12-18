/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-menu-theme": {
      name: "rmd-menu-theme",
      description:
        "This function is used to quickly get one of the menu's theme values. This is really\njust for the `rmd-menu-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/menu/src/_functions.scss#L14-L16",
      packageName: "menu",
      code: "@function rmd-menu-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-menu-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-menu-theme-values, menu);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the menu's theme values.",
      },
    },
    "rmd-menu-theme-var": {
      name: "rmd-menu-theme-var",
      description:
        "This function is used to get one of the menu's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-menu-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/menu/src/_functions.scss#L29-L31",
      usedBy: [{ name: "react-md-menu", type: "mixin", packageName: "menu" }],
      packageName: "menu",
      code: "@function rmd-menu-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-menu-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-menu-theme-values, menu, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the menu's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-menu-theme": {
      name: "rmd-menu-theme",
      description:
        "This function is used to quickly get one of the menu's theme values. This is really\njust for the `rmd-menu-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/menu/src/_functions.scss#L14-L16",
      packageName: "menu",
      code: "@function rmd-menu-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-menu-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-menu-theme-values, menu);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-menu-theme-var": {
      name: "rmd-menu-theme-var",
      description:
        "This function is used to get one of the menu's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-menu-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/menu/src/_functions.scss#L29-L31",
      usedBy: [{ name: "react-md-menu", type: "mixin", packageName: "menu" }],
      packageName: "menu",
      code: "@function rmd-menu-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-menu-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-menu-theme-values, menu, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-menu-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
    },
  },
  variables: {
    "rmd-menu-background-color": {
      name: "rmd-menu-background-color",
      description: "The background color to use for menus\n",
      source: "packages/menu/src/_variables.scss#L10",
      packageName: "menu",
      type: "Color",
      value: "rmd-theme-var(surface)",
      compiled: "var(--rmd-theme-surface, #fff)",
      overridable: true,
    },
    "rmd-menu-color": {
      name: "rmd-menu-color",
      description: "The text color to use for menus\n",
      source: "packages/menu/src/_variables.scss#L14",
      packageName: "menu",
      type: "Color",
      value: "rmd-theme-var(on-surface)",
      compiled: "var(--rmd-theme-on-surface, #000)",
      overridable: true,
    },
    "rmd-menu-z-index": {
      name: "rmd-menu-z-index",
      description: "The z-index for menus.\n",
      source: "packages/menu/src/_variables.scss#L18",
      packageName: "menu",
      type: "Number",
      value: "11",
      overridable: true,
    },
    "rmd-menu-elevation": {
      name: "rmd-menu-elevation",
      description:
        "The elevation for menus. This should be a number from 0 to 24 (inclusive)\nas it gets passed to the `rmd-elevation` mixin.\n",
      source: "packages/menu/src/_variables.scss#L23",
      packageName: "menu",
      type: "Number",
      value: "8",
      overridable: true,
    },
    "rmd-menu-min-width": {
      name: "rmd-menu-min-width",
      description: "The min-width to apply to menus.\n",
      source: "packages/menu/src/_variables.scss#L27",
      packageName: "menu",
      type: "Number",
      value: "7rem",
      overridable: true,
    },
    "rmd-menu-horizontal-item-min-width": {
      name: "rmd-menu-horizontal-item-min-width",
      description:
        "The min-width to apply to each menu item when the menu is set\nto horizontal.\n",
      source: "packages/menu/src/_variables.scss#L32",
      packageName: "menu",
      type: "Number",
      value: "5rem",
      overridable: true,
    },
    "rmd-menu-icon-spacing": {
      name: "rmd-menu-icon-spacing",
      description:
        'The amount of spacing to use between icons and text within menu items. This\nreally overwrites the additional spacing provided in the base `list` package\nsince menu items are normally more dense and don\'t need to align with specific\n"keylines" in your app.\n',
      source: "packages/menu/src/_variables.scss#L39",
      packageName: "menu",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-menu-theme-values": {
      name: "rmd-menu-theme-values",
      description:
        'A Map of all the "themeable" parts of the menu package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/menu/src/_variables.scss#L45-L51",
      usedBy: [
        { name: "rmd-menu-theme", type: "function", packageName: "menu" },
        { name: "rmd-menu-theme-var", type: "function", packageName: "menu" },
        { name: "rmd-menu-theme", type: "mixin", packageName: "menu" },
        {
          name: "rmd-menu-theme-update-var",
          type: "mixin",
          packageName: "menu",
        },
        { name: "react-md-menu", type: "mixin", packageName: "menu" },
      ],
      packageName: "menu",
      type: "Map",
      value:
        "(\n  background-color: $rmd-menu-background-color,\n  color: $rmd-menu-color,\n  min-width: $rmd-menu-min-width,\n  icon-spacing: $rmd-menu-icon-spacing,\n  z-index: $rmd-menu-z-index,\n)",
      compiled:
        "(\n  background-color: var(--rmd-theme-surface, #fff),\n  color: var(--rmd-theme-on-surface, #000),\n  min-width: 7rem,\n  icon-spacing: 1rem,\n  z-index: 11,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;
