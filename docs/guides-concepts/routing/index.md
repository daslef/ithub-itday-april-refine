---
title: Routing
---

Routing is essential for any CRUD application. Refine's headless architecture allows you to use any router solution, without being locked into a specific router/framework.

Refine also offers built-in router integrations for the most popular frameworks. These integrations makes it easier to use Refine with these frameworks and offers a lot of benefits such as:

- Automatic parameter detection in hooks/components.
- Automatic redirections after mutation or authentication.
- Set of utility components & hooks which can be used to navigate between pages/routes.

## Router Integrations

To integrate a router provider with Refine, all you need to do is to import the router integration of your choice and pass it to the `<Refine />`'s `routerProvider` prop.

```jsx title="App.jsx"
import { BrowserRouter, Routes } from "react-router-dom";
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";

const App = () => (
  <BrowserRouter>
    // highlight-next-line
    <Refine routerProvider={routerProvider}>
      <Routes>{/* Your route definitions */}</Routes>
    </Refine>
  </BrowserRouter>
);
```

## Relationship Between Resources and Routes <GuideBadge id="guides-concepts/general-concepts" />

Refine can infer current `resource`, `action` and it's `id` from the **current route** based on your **resource definitions**.

This eliminates the need of passing these parameters to the components/hooks manually.

All you have to do is to define your resource and their routes.

```jsx
<Refine
  resources={[
    {
      name: "products",
      list: "/my-products", // http://localhost:3000/my-products
      show: "my-products/:id", // http://localhost:3000/my-products/1
      create: "/my-products/new", // http://localhost:3000/my-products/new
      edit: "/my-products/:id/edit", // http://localhost:3000/my-products/1/edit
      clone: "/my-products/:id/clone", // http://localhost:3000/my-products/1/clone
    },
  ]}
/>
```

You can see how we omit **resource** and **id** parameters for `useList`, and `useShow` hooks in the example below.

import { ReactRouterResourceAndRoutesUsage } from "./react-router/resource-and-routes-usage";

<ReactRouterResourceAndRoutesUsage />

## Hook Integrations

### useForm <GuideBadge id="guides-concepts/forms/#integration-with-routers" />

Router integration of Refine allows you to use `useForm` without passing **resource**, **id** and **action** parameters.
It will also redirect you to resource's action route defined in `redirect` prop. `redirect` prop is `list` by default.

import { ReactRouterUseFormUsage } from "./react-router/use-form-usage";

<ReactRouterUseFormUsage />

Additionally, router integrations exposes an `<UnsavedChangesNotifier />` component which can be used to notify the user about unsaved changes before navigating away from the current page. This component provides this feature which can be enabled by setting `warnWhenUnsavedChanges` to `true` in `useForm` hooks.

```jsx title="app.jsx"
import { Refine } from "@refinedev/core";
import {
  routerProvider,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Refine
      // ...
      routerProvider={routerProvider}
      options={{
        // highlight-next-line
        warnWhenUnsavedChanges: true,
      }}
    >
      <Routes>{/* ... */}</Routes>
      {/* highlight-start */}
      {/* The `UnsavedChangesNotifier` component should be placed under <Refine /> component. */}
      <UnsavedChangesNotifier />
      {/* highlight-end */}
    </Refine>
  </BrowserRouter>
);
```

### useTable <GuideBadge id="guides-concepts/tables/#integrating-with-routers" />

`useTable` can synchronize it's parameters (filters, pagination, sorting) with the current route.

To enable synchronization, you need to pass `syncWithLocation: true` to `<Refine />` component's `options` prop.

```jsx
<Refine {...} options={{ syncWithLocation: true }}>

```

Once you pass `syncWithLocation: true` to `<Refine />` component's `options` prop, `useTable` will:

- Read the current route and update it's parameters (filters, pagination, sorting) accordingly.
- Update the current route when it's parameters (filters, pagination, sorting) change.

Let's say we have a `products` list page with the following route:

```
/my-products
```

And we want to filter products by `category.id` and sort them by `id` in `asc` order.

We can pass these parameters to `useTable` hook as follows:

```js
const { ... } = useTable(
    {
        current: 1,
        pageSize: 2,
        filters: { initial: [{ field: "category.id", operator: "eq", value: 1 }]},
        sorters: { initial: [{ field: "id", direction: "asc" }] }
    }
);
```

`useTable` will automatically update the route to:

```jsx title=http://localhost:3000/my-products
// removed-line
/my-products

// added-line
/my-products?current=1&pageSize=2&sorters[0][field]=id&sorters[0][order]=asc&filters[0][field]=category.id&filters[0][operator]=eq&filters[0][value]=1
```

And you will see a list of products, already **filtered**, **sorted** and **paginated** automatically based on the query parameters of the **current route**.

```js
const { tableQueryResult, current, pageSize, filters, sorters } = useTable();

console.log(tableQueryResult.data.data); // [{...}, {...}]
console.log(tableQueryResult.data.total); // 32 - total number of unpaginated records
console.log(current); // 1 - current page
console.log(pageSize); // 2 - page size
console.log(filters); // [{ field: "category.id", operator: "eq", value: "1" }]
console.log(sorters); // [{ field: "id", order: "asc" }]
```

Check the example below to see how you can use `useTable` with router integration.

import { ReactRouterUseTableUsage } from "./react-router/use-table-usage";

<ReactRouterUseTableUsage />

### useModalForm

`useModalForm` can automatically detect `resource` parameter from the current route.

It can also sync it's parameters with the current route.

```jsx
const { ... } = useModalForm({ syncWithLocation: true })
```

Once the modal is visible, current route will look like this:

```
/my-products?modal-products-edit[open]=true&modal-products-edit[id]=1
```

You can see the example below for usage.

import { ReactRouterUseModalFormUsage } from "./react-router/use-modal-form-usage";

<ReactRouterUseModalFormUsage />

### useOne

`useOne` can automatically detect `resource` and `id` parameters from the current route.

```tsx title=components/products/show.tsx
import { useOne } from "@refinedev/core";

// removed-line
const { data: productResponse } = useOne({ resource: "products", id: "1" });

console.log(productResponse.data); // { id: "1", title: "Product 1", ... }

// added-line
const { data: productResponse } = useOne();

console.log(productResponse.data); // { id: "1", title: "Product 1", ... }
```

### useShow

`useShow` can automatically detect `resource` and `id` parameters from the current route.

```tsx title=components/products/show.tsx
import { useShow } from "@refinedev/core";

const { queryResult: showResponse } = useShow({
  // removed-start
  resource: "products",
  id: "1",
  // removed-end
});

console.log(showResponse.data.data); // { id: "1", title: "Product 1", ... }

// added-line
const { queryResult: showResponse } = useShow();

console.log(showResponse.data.data); // { id: "1", title: "Product 1", ... }
```

### useList

`useList` can automatically detect `resource` parameter from the current route.

```tsx title=components/products/list.tsx
import { useList } from "@refinedev/core";

// removed-line
const { data: listResponse } = useList({ resource: "products" });

console.log(listResponse.data); // [{ id: "1", title: "Product 1", ... }, { id: "2", title: "Product 2", ... }]
console.log(listResponse.total); // 32 - total number of unpaginated records

// added-line
const { data: listResponse } = useList();

console.log(listResponse.data); // [{ id: "1", title: "Product 1", ... }, { id: "2", title: "Product 2", ... }]
console.log(listResponse.total); // 32 - total number of unpaginated records
```

:::caution

`config.pagination`, `config.filters`, `config.sorters` will not be automatically detected from the current route.

:::

## The `routerProvider` Interface

A router integration of Refine consists of a set of basic implementations for:

- Ability to navigate between pages/routes
- An interface to interact with the parameters and query strings of the current route
- An utility to navigate back in the history
- A simple component to use for anchor tags

These implementations will be provided via `routerProvider` which expects an object with the following methods:

- `go`: A function that accepts an object and returns a function that handles the navigation.
- `back`: A function that returns a function that handles the navigation back in the history.
- `parse`: A function that returns a function that parses the current route and returns an object.
- `Link`: A React component that accepts a `to` prop and renders a component that handles the navigation to the given `to` prop.

While all these methods are optional, if you're working on creating a custom router integration, you'll be able to incrementally add more features and adopt more of Refine's features by izmplementing more of these methods.
