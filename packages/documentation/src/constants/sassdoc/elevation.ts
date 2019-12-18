/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-elevation": {
      name: "rmd-elevation",
      description:
        "Returns a box shadow string for the current material design elevation. This is\nuseful if you want to merge material design elevation with custom box shadow\nvalues as well.\n\n",
      source: "packages/elevation/src/_functions.scss#L27-L48",
      usedBy: [
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
      ],
      packageName: "elevation",
      examples: [
        {
          code: ".my-class {\n  box-shadow: rmd-elevation(2);\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n",
          type: "scss",
          description: "Simple usage",
        },
        {
          code:
            ".my-class {\n  box-shadow: rmd-elevation(2), inset 0 0 0 1px $rmd-blue-500;\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12),\n    inset 0 0 0 1px #2196f3;\n}\n",
          type: "scss",
          description: "Merging Shadows",
        },
      ],
      code:
        "@function rmd-elevation($z-value\n$color: $rmd-elevation-color\n$opacity-boost: 0) { … }",
      sourceCode:
        "@function rmd-elevation($z-value\n$color: $rmd-elevation-color\n$opacity-boost: 0) {\n  @if type-of($z-value) != 'number' or not unitless($z-value) {\n    @error \"$z-value must be a unitless number, but received '#{$z-value}'\";\n  }\n\n  @if $z-value < 0 or $z-value > 24 {\n    @error \"$z-value must be between 0 and 24, but received '#{$z-value}'\";\n  }\n\n  $color: rmd-theme($color);\n  $shadow-1-value: map-get($rmd-elevation-shadow-1-map, $z-value);\n  $shadow-1-color: rgba($color, $rmd-elevation-shadow-1-opacity + $opacity-boost);\n\n  $shadow-2-value: map-get($rmd-elevation-shadow-2-map, $z-value);\n  $shadow-2-color: rgba($color, $rmd-elevation-shadow-2-opacity + $opacity-boost);\n\n  $shadow-3-value: map-get($rmd-elevation-shadow-3-map, $z-value);\n  $shadow-3-color: rgba($color, $rmd-elevation-shadow-3-opacity + $opacity-boost);\n\n  @return #{'#{$shadow-1-value} #{$shadow-1-color}'}, #{'#{$shadow-2-value} #{$shadow-2-color}'},\n    #{'#{$shadow-3-value} #{$shadow-3-color}'};\n}",
      throws: [
        "$z-value must be a unitless number, but received ",
        "$z-value must be between 0 and 24, but received ",
      ],
      type: "function",
      parameters: [
        {
          type: "Number",
          name: "z-value",
          description: "This should be a number between 0 and 24.",
        },
        {
          type: "Color",
          name: "color",
          default: "rmd-elevation-color",
          description: "The color to use for the box-shadow.",
        },
        {
          type: "Number",
          name: "opacity-boost",
          default: "0",
          description:
            "The amount to boost the default opacity levels for the\n  three box-shadows applied.",
        },
      ],
      returns: {
        type: "String",
        description: "the box shadow string for the current elevation.",
      },
    },
  },
  mixins: {
    "rmd-elevation": {
      name: "rmd-elevation",
      description:
        "Returns a box shadow string for the current material design elevation. This is\nuseful if you want to merge material design elevation with custom box shadow\nvalues as well.\n\n",
      source: "packages/elevation/src/_functions.scss#L27-L48",
      usedBy: [
        { name: "rmd-elevation", type: "mixin", packageName: "elevation" },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
        {
          name: "rmd-elevation-transition",
          type: "mixin",
          packageName: "elevation",
        },
      ],
      packageName: "elevation",
      examples: [
        {
          code: ".my-class {\n  box-shadow: rmd-elevation(2);\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n",
          type: "scss",
          description: "Simple usage",
        },
        {
          code:
            ".my-class {\n  box-shadow: rmd-elevation(2), inset 0 0 0 1px $rmd-blue-500;\n}\n",
          compiled:
            ".my-class {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),\n    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12),\n    inset 0 0 0 1px #2196f3;\n}\n",
          type: "scss",
          description: "Merging Shadows",
        },
      ],
      code:
        "@function rmd-elevation($z-value\n$color: $rmd-elevation-color\n$opacity-boost: 0) { … }",
      sourceCode:
        "@function rmd-elevation($z-value\n$color: $rmd-elevation-color\n$opacity-boost: 0) {\n  @if type-of($z-value) != 'number' or not unitless($z-value) {\n    @error \"$z-value must be a unitless number, but received '#{$z-value}'\";\n  }\n\n  @if $z-value < 0 or $z-value > 24 {\n    @error \"$z-value must be between 0 and 24, but received '#{$z-value}'\";\n  }\n\n  $color: rmd-theme($color);\n  $shadow-1-value: map-get($rmd-elevation-shadow-1-map, $z-value);\n  $shadow-1-color: rgba($color, $rmd-elevation-shadow-1-opacity + $opacity-boost);\n\n  $shadow-2-value: map-get($rmd-elevation-shadow-2-map, $z-value);\n  $shadow-2-color: rgba($color, $rmd-elevation-shadow-2-opacity + $opacity-boost);\n\n  $shadow-3-value: map-get($rmd-elevation-shadow-3-map, $z-value);\n  $shadow-3-color: rgba($color, $rmd-elevation-shadow-3-opacity + $opacity-boost);\n\n  @return #{'#{$shadow-1-value} #{$shadow-1-color}'}, #{'#{$shadow-2-value} #{$shadow-2-color}'},\n    #{'#{$shadow-3-value} #{$shadow-3-color}'};\n}",
      throws: [
        "$z-value must be a unitless number, but received ",
        "$z-value must be between 0 and 24, but received ",
      ],
      type: "mixin",
      parameters: [
        {
          type: "Number",
          name: "z-value",
          description: "This should be a number between 0 and 24.",
        },
        {
          type: "Color",
          name: "color",
          default: "rmd-elevation-color",
          description: "The color to use for the box-shadow.",
        },
        {
          type: "Number",
          name: "opacity-boost",
          default: "0",
          description:
            "The amount to boost the default opacity levels for the\n  three box-shadows applied.",
        },
      ],
    },
  },
  variables: {
    "rmd-elevation-color": {
      name: "rmd-elevation-color",
      description: "The normal elevation color to use.\n",
      source: "packages/elevation/src/_variables.scss#L12",
      packageName: "elevation",
      type: "Color",
      value: "$rmd-black-base",
      compiled: "#000",
      overridable: false,
    },
    "rmd-elevation-shadow-1-opacity": {
      name: "rmd-elevation-shadow-1-opacity",
      description: "The opacity to apply to the first box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L17",
      see: [
        {
          name: "rmd-elevation-shadow-1-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.2",
      overridable: false,
    },
    "rmd-elevation-shadow-2-opacity": {
      name: "rmd-elevation-shadow-2-opacity",
      description: "The opacity to apply to the second box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L22",
      see: [
        {
          name: "rmd-elevation-shadow-2-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.14",
      overridable: false,
    },
    "rmd-elevation-shadow-3-opacity": {
      name: "rmd-elevation-shadow-3-opacity",
      description: "The opacity to apply to the third box-shadow\n",
      source: "packages/elevation/src/_variables.scss#L27",
      see: [
        {
          name: "rmd-elevation-shadow-3-map",
          type: "variable",
          packageName: "elevation",
        },
      ],
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Number",
      value: "0.12",
      overridable: false,
    },
    "rmd-elevation-shadow-1-map": {
      name: "rmd-elevation-shadow-1-map",
      description:
        "A Map of the first layer of box-shadows to apply for elevation.\nThis is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L32-L58",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 2px 1px -1px',\n  2: '0px 3px 1px -2px',\n  3: '0px 3px 3px -2px',\n  4: '0px 2px 4px -1px',\n  5: '0px 3px 5px -1px',\n  6: '0px 3px 5px -1px',\n  7: '0px 4px 5px -2px',\n  8: '0px 5px 5px -3px',\n  9: '0px 5px 6px -3px',\n  10: '0px 6px 6px -3px',\n  11: '0px 6px 7px -4px',\n  12: '0px 7px 8px -4px',\n  13: '0px 7px 8px -4px',\n  14: '0px 7px 9px -4px',\n  15: '0px 8px 9px -5px',\n  16: '0px 8px 10px -5px',\n  17: '0px 8px 11px -5px',\n  18: '0px 9px 11px -5px',\n  19: '0px 9px 12px -6px',\n  20: '0px 10px 13px -6px',\n  21: '0px 10px 13px -6px',\n  22: '0px 10px 14px -6px',\n  23: '0px 11px 14px -7px',\n  24: '0px 11px 15px -7px',\n)",
      overridable: false,
    },
    "rmd-elevation-shadow-2-map": {
      name: "rmd-elevation-shadow-2-map",
      description:
        "A Map of the second layer of box-shadows to apply for elevation.\nThis is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L63-L89",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 1px 1px 0px',\n  2: '0px 2px 2px 0px',\n  3: '0px 3px 4px 0px',\n  4: '0px 4px 5px 0px',\n  5: '0px 5px 8px 0px',\n  6: '0px 6px 10px 0px',\n  7: '0px 7px 10px 1px',\n  8: '0px 8px 10px 1px',\n  9: '0px 9px 12px 1px',\n  10: '0px 10px 14px 1px',\n  11: '0px 11px 15px 1px',\n  12: '0px 12px 17px 2px',\n  13: '0px 13px 19px 2px',\n  14: '0px 14px 21px 2px',\n  15: '0px 15px 22px 2px',\n  16: '0px 16px 24px 2px',\n  17: '0px 17px 26px 2px',\n  18: '0px 18px 28px 2px',\n  19: '0px 19px 29px 2px',\n  20: '0px 20px 31px 3px',\n  21: '0px 21px 33px 3px',\n  22: '0px 22px 35px 3px',\n  23: '0px 23px 36px 3px',\n  24: '0px 24px 38px 3px',\n)",
      overridable: false,
    },
    "rmd-elevation-shadow-3-map": {
      name: "rmd-elevation-shadow-3-map",
      description:
        "A Map of the third layer of box-shadows to apply for elevation.\nThis is a map of numbers from 0 -> 24.\n",
      source: "packages/elevation/src/_variables.scss#L94-L120",
      usedBy: [
        { name: "rmd-elevation", type: "function", packageName: "elevation" },
      ],
      packageName: "elevation",
      type: "Map",
      value:
        "(\n  0: '0px 0px 0px 0px',\n  1: '0px 1px 3px 0px',\n  2: '0px 1px 5px 0px',\n  3: '0px 1px 8px 0px',\n  4: '0px 1px 10px 0px',\n  5: '0px 1px 14px 0px',\n  6: '0px 1px 18px 0px',\n  7: '0px 2px 16px 1px',\n  8: '0px 3px 14px 2px',\n  9: '0px 3px 16px 2px',\n  10: '0px 4px 18px 3px',\n  11: '0px 4px 20px 3px',\n  12: '0px 5px 22px 4px',\n  13: '0px 5px 24px 4px',\n  14: '0px 5px 26px 4px',\n  15: '0px 6px 28px 5px',\n  16: '0px 6px 30px 5px',\n  17: '0px 6px 32px 5px',\n  18: '0px 7px 34px 6px',\n  19: '0px 7px 36px 6px',\n  20: '0px 8px 38px 7px',\n  21: '0px 8px 40px 7px',\n  22: '0px 8px 42px 7px',\n  23: '0px 9px 44px 8px',\n  24: '0px 9px 46px 8px',\n)",
      overridable: false,
    },
  },
};

export default sassdoc;
