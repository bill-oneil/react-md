# Configuring Your Layout

This guide will cover the following topics:

- Configuring `react-md` with the `Configuration` component
- Setting up the base `Layout` component
- Create a navigation pane with the `useLayoutNavigation` hook and
  [react-router](https://github.com/ReactTraining/react-router)

## Configuration

If you couldn't tell already, there are a lot of features and configuration
within `react-md` that require initializing
[React Context Providers](https://reactjs.org/docs/context.html#contextprovider).
Since it can be annoying to have to import all of these providers manually and
initialize them, the #layout package provides a nice `Configuration` component
that will initialize all of these for you with reasonable defaults that can be
overridden.

The `Configuration` component should normally be at the root of your app and
will throw an error if you have mounted it multiple times:

```tsx
import React from "react";
import { render } from "react-dom";
import { Configuration, ConfigurationProps } from "@react-md/layout";

import App from "./App";

// the ConfigurationProps are just all the props for the providers
// joined together. The only difference is that onResize has been
// renamed to onAppResize for the AppSizeListener
const overrides: ConfigurationProps = {
  // your configuration overrides
};

render(
  <Configuration {...overrides}>
    <App />
  </Configuration>,
  document.getElementById("root")
);
```

##### The included Providers

This component will initialize:

- `AppSizeListener` - see #utils
- `InteractionModeListener` - see #utils
- `StatesConfig` - see #states
- `NestedDialogContextProvider` - see #dialog
- `TooltipHoverModeConfig` - see #tooltip

The three most important Providers that are included are the `AppSizeListener`,
`InteractionModeListener` and `StatesConfig`. The `AppSizeListener` is in the
#utils package that helps determine how your app is being viewed based on media
queries. The `InteractionModeListener` also comes from the #utils package and
helps determine if your app is being interacted by touch, mouse, or keyboard to
customize the styles for that experience. Finally, the `StatesConfig` is the
general configuration for how different interactable elements gain different
states based on the interaction mode. This also globally controls the "ripple"
effect when elements are clicked so allows for a quick opt-out if you don't like
that effect.

## Creating a Layout

Once you've initialized your base `Configuration`, the next step is to create
your layout! This package also provides a pretty nice `Layout` component that
can help with this since it is a combination of the `AppBar`, `Sheet`, and
`Tree` packages with sensible defaults.

The layout will automatically change depending on the current app size and the
default behavior can be changed if desired. The default layout is:

- create a fixed header with the primary theme and try to render a title and
  additional actions
- create a navigation pane for all the routes in your app which can toggleable
  in a sheet on mobile or persistent on landscape tablets and desktops
- create a `<main>` element that automatically updates it's position for the
  fixed `AppBar` and the persistent navigation pane when it exists.

##### Creating the navigation tree

The `Layout` component expects a prop named `navItems` which is an flat object
of all the routes in your app (see #tree for more details) and also provides a
`useLayoutNavigation` hook that handles the selection and expansion of tree
items for you. You'll want to structure your navigation tree to have `itemId`
for each route in your app, text `children`, optional `ListItem` props from the
#list package, and a `parentId` referencing another nav item or `null` for it be
be at the root of the navigation tree.

> If you use Typescript, this package also exports the `LayoutNavigationItem`
> and `LayoutNavigationTree` types to help strictly type this for you.

```ts
import { ReactNode } from "react";
import { LayoutNavigationItem, LayoutNavigationTree } from "@react-md/layout";
import { HomeSVGIcon, TVSVGIcon } from "@react-md/material-icons";

function createRoute(
  pathname: string,
  children: string,
  leftAddon: ReactNode | undefined,
  parentId: string | null = null
): LayoutNavigationItem {
  return {
    itemId: pathname,
    parentId,
    to: pathname,
    children,
    leftAddon,
  };
}

const navItems: LayoutNavigationTree = {
  "/": createRoute("/", "Home", <HomeSVGIcon />),
  "/route-1": createRoute("/route-1", "Home", <TVSVGIcon />),
};

export default navItems;
```

The code above is a simple example for how you can create your navigation tree,
but you can also come up with your own way such as looping over a list of
routes. The only important parts are ensuring each `itemId` in the tree is the
current `pathname` for that route (with a leading `/`). The `parentId` should
reference another `itemId` if it should appear as a child of another route or
`null` if it should appear at the root level.

Now that your tree has been initialized with routes, you'll want to update your
app to use the `Layout` component along with this navigation tree:

```diff
 import React from "react";
 import { render } from "react-dom";
-import { Configuration, ConfigurationProps } from "@react-md/layout";
+import {
+  Configuration,
+  ConfigurationProps,
+  Layout,
+  useLayoutNavigation,
+} from "@react-md/layout";
+
+import navItems from "./navItems";

 import App from "./App";

 // the ConfigurationProps are just all the props for the providers
 // joined together. The only difference is that onResize has been
 // renamed to onAppResize for the AppSizeListener
 const overrides: ConfigurationProps = {
   // your configuration overrides
 };

 render(
   <Configuration {...overrides}>
+    <Layout
+      title="My Title"
+      navHeaderTitle="My Title"
+      treeProps={useLayoutNavigation(navItems, window.location.pathname)}
+    >
       <App />
+    </Layout>
   </Configuration>,
   document.getElementById("root")
 );
```

Great! This should now have the general layout with your base navigation.

### Adding react-router

Now that we've done most of the initial layout setup, it's time to add our
routing library into the mix for a true SPA experience. Start by adding
[react-router](https://github.com/ReactTraining/react-router) to your project:

```sh
$ npm install --save react-router-dom
```

Or with `yarn`:

```sh
$ yarn add react-router-dom
```

Next, let's wrap the app in the `BrowserRouter` and add the `linkComponent` prop
to the `Layout` component:

```diff
 import React from "react";
 import { render } from "react-dom";
+import { BrowserRouter, Link } from "react-router-dom";
 import {
   Configuration,
   ConfigurationProps,
   Layout,
   useLayoutNavigation,
 } from "@react-md/layout";

 import navItems from "./navItems";

 import App from "./App";

 // the ConfigurationProps are just all the props for the providers
 // joined together. The only difference is that onResize has been
 // renamed to onAppResize for the AppSizeListener
 const overrides: ConfigurationProps = {
   // your configuration overrides
 };

 render(
-  <Configuration {...overrides}>
+  <BrowserRouter>
+    <Configuration {...overrides}>
       <Layout
         title="My Title"
         navHeaderTitle="My Title"
-        treeProps={useLayoutNavigation(navItems, window.location.pathname)}
+        treeProps={useLayoutNavigation(navItems, window.location.pathname, Link)}
       >
         <App />
       </Layout>
-  </Configuration>,
+    </Configuration>
+  </BrowserRouter>,
   document.getElementById("root")
 );
```

> The `linkComponent` prop is really just a convenience prop that will update
> any navigation item that has an `href`, `to`, or `isLink` prop to render with
> that component instead of the default `<div>`

We're almost done! You might notice that the navigation pane doesn't update when
a new route has changed. This is because we are using the
`window.location.pathname` which will not cause a re-render when changed.
Luckily, this can be fixed with the `useLocation` hook from `react-router`
itself. Let's start by moving the `Layout` component into a new file:
`src/Layout.tsx`:

```tsx
import React, { ReactElement } from "react";
import { Layout, useLayoutNavigation } from "@react-md/layout";
import { useLocation, Link } from "react-router-dom";

import navItems from "./navItems";

import App from "./App";

export default (): ReactElement => {
  const { pathname } = useLocation();

  return (
    <Layout
      title="My Title"
      navHeaderTitle="My Title"
      treeProps={useLayoutNavigation(navItems, pathname, Link)}
    >
      <App />
    </Layout>
  );
};
```

Finally, update the main `src/index.tsx` file to use the customized `Layout` in
your app:

```diff
 import React from "react";
 import { render } from "react-dom";
 import { BrowserRouter, Link } from "react-router-dom";
+import { Configuration, ConfigurationProps } from "@react-md/layout";
+
+import Layout from "./Layout";
-import {
-  Configuration,
-  ConfigurationProps,
-  Layout,
-  useLayoutNavigation,
-} from "@react-md/layout";
-
-import navItems from "./navItems";
-
-import App from "./App";

 // the ConfigurationProps are just all the props for the providers
 // joined together. The only difference is that onResize has been
 // renamed to onAppResize for the AppSizeListener
 const overrides: ConfigurationProps = {
   // your configuration overrides
 };

 render(
   <BrowserRouter>
     <Configuration {...overrides}>
-      <Layout
-        title="My Title"
-        navHeaderTitle="My Title"
-        treeProps={useLayoutNavigation(navItems, window.location.pathname, Link)}
-      >
-        <App />
-      </Layout>
+      <Layout />
     </Configuration>
   </BrowserRouter>,
   document.getElementById("root")
 );
```

We're done! Clicking on one of the navigation items should now automatically
update to select the current route as well as expand any parent folders as
needed.

#### Adding Route Transitions (Optional)

Something that can help your app flow between routes is to also add a transition
to the main content after a pathname changes. A recommended transition is the
"cross fade" transition from #transition that is just a simple opacity change
and a slight vertical movement, but any transition can be added if desired. To
keep things simple, let's update the `src/Layout.tsx` component to apply the
cross fade transition on route changes with the `useCrossFade` hook.

```diff
-import React, { ReactElement } from "react";
+import React, { ReactElement, useRef } from "react";
 import { Layout, useLayoutNavigation } from "@react-md/layout";
+import { ENTER, useCrossFade } from "@react-md/transition";
 import { useLocation, Link } from "react-router-dom";

 import navItems from "./navItems";

 import App from "./App";

 export default (): ReactElement => {
   const { pathname } = useLocation();
+  const [_rendered, transitionProps, dispatch] = useCrossFade();
+
+  const prevPathname = useRef(pathname);
+  if (pathname !== prevPathname.current) {
+    prevPathname.current = pathname;
+    dispatch(ENTER);
+  }

   return (
     <Layout
       title="My Title"
       navHeaderTitle="My Title"
       treeProps={useLayoutNavigation(navItems, pathname, Link)}
+      mainProps={transitionProps}
     >
       <App />
     </Layout>
   );
 };
```

So how does this work? First, the `ref` and `className` from the cross fade
transition are extracted from the `transitionProps` and then passed to the
`<main>` element within the `Layout` component by using the `mainRef` and
`mainClassName` props. Finally, the previous `pathname` is stored in a `ref` so
that pathname changes can be determined during the render and dispatch the
`ENTER` event to trigger the animation.

You might be wondering...

> "Why is the `dispatch` triggered during the render phase instead of in
> `useEffect` or `useLayoutEffect`?"

There isn't really a big reason other than I prefer handling transitions this
way instead of having a custom `useEffect` that skips the first callback. If the
first callback for this effect isn't cancelled, the "appear" transition will
still be triggered.

If you prefer using `useEffect`, here's an example of this pattern instead.

```diff
-import React, { ReactElement, useRef } from "react";
+import React, { ReactElement, useEffect, useRef } from "react";
 import { Layout, useLayoutNavigation } from "@react-md/layout";
 import { ENTER, useCrossFade } from "@react-md/transition";
 import { useLocation, Link } from "react-router-dom";

 import navItems from "./navItems";

 import App from "./App";

 export default (): ReactElement => {
   const { pathname } = useLocation();
   const [_rendered, transitionProps, dispatch] = useCrossFade();
   const { ref: mainRef, className: mainClassName } = transitionProps;

-  const prevPathname = useRef(pathname);
-  if (pathname !== prevPathname.current) {
-    prevPathname.current = pathname;
-    dispatch(ENTER);
-  }
+  const renderedOnce = useRef(false);
+  useEffect(() => {
+    if (!renderedOnce.current) {
+      renderedOnce.current = true;
+      return;
+    }
+
+    dispatch(ENTER);
+  }, [dispatch, pathname])

   return (
     <Layout
       title="My Title"
       navHeaderTitle="My Title"
       treeProps={useLayoutNavigation(navItems, pathname, Link)}
       mainProps={transitionProps}
     >
       <App />
     </Layout>
   );
 };
```

However this _is_ opinionated, so feel free to handle transitions however you
prefer.

### Completed Codesandbox

<iframe
  class="iframe"
  src="https://codesandbox.io/embed/react-md-creating-a-layout-c1g8c?fontsize=14&runonclick=1"
  title="react-md - Creating a Layout"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin">
</iframe>
