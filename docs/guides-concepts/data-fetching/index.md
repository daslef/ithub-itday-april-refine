---
title: Data Fetching
---

import UseOne from "./use-one";
import UseUpdate from "./use-update";
import UseList from "./use-list";
import UseListWithFilters from "./use-list-with-filters";
import MultipleDataProvider from "./multiple-data-provider";
import Authentication from "./authentication";
import OneToOne from "./one-to-one";
import OneToMany from "./one-to-many";
import ErrorHandling from "./error-handling";
import SupportedDataProviders from "@site/src/partials/data-provider/supported-data-providers.md";
import DataHooks from "@site/src/partials/data-provider/data-hooks.md";
import DataProviderInterface from "./data-provider-interface.md";

Data is essential for any UI Application and these applications are a bridge between users and the underlying data source(s), making it possible for users to interact with data in a meaningful way.

To manage data, Refine needs a `data provider`, which is a function that implements the [`DataProvider`](/docs/core/interface-references#dataprovider) interface. It is responsible for communicating with your API and making data available to Refine applications. While you can use one of our built-in data providers, you can also easily create your own data provider matching your API.

Refine passes relevant parameters like `resource` name, or the `id` of the record to your data provider, so data provider can make API calls to appropriate endpoints.

Once you provide `data provider` to Refine, you can utilize our data hooks (`useOne`, `useList`, `useUpdate`) to easily manage your data from various sources, including REST, GraphQL, RPC, and SOAP.

Moreover, Refine offers support for multiple data providers, allowing you to use different data providers for different resources. For instance, you can use **REST** for the `posts` endpoint and **GraphQL** for the `users` query.

<Image src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/providers/data-provider/api-consuming-flow.png" />

## Fetching Data

Imagine we want to fetch a record with the ID `123` from the `products` endpoint. For this, we will use the `useOne` hook. Under the hood, it calls the `dataProvider.getOne` method from your data provider.

<UseOne />

## Updating Data

Now, let's update the record with the ID `124` from `products` endpoint. To do this, we can use `useUpdate` hook, which calls `dataProvider.update` method under the hood.

In this example, we are updating product's price with a random value.

<UseUpdate />

Refine offers various data hooks for CRUD operations, you can see the list of these hooks below:

<DataHooks />

## How Refine treats data and state?

Data hooks uses [TanStack Query](https://tanstack.com/query) under the hood. It takes care of managing the state for you. It provides `data`, `isLoading`, and `error` states to help you handle loading, success, and error scenarios gracefully.

Refine treats data and state in a structured and efficient manner, providing developers with powerful tools to manage data seamlessly within their applications. Here are some key aspects of how Refine treats data and state:

1. **Resource-Based Approach:** Organizes data around resources, which are essentially models representing different data entities or API endpoints. These resources help structure your application's data management.

2. **Invalidation:** Automatically invalidates data after a successful mutation (e.g., creating, updating, or deleting a resource), ensuring that the UI is updated with the latest data.

3. **Caching:** Caches data to improve performance and deduplicates API calls.

4. **Optimistic Updates:** Supports optimistic updates, which means it will update the UI optimistically before the actual API call is complete. This enhances the user experience by reducing perceived latency.

5. **Hooks for CRUD Operations:** Offers a collection of hooks that align with common data operations like listing, creating, updating, and deleting data (`useList`, `useCreate`, `useUpdate`, `useDelete`). In addition to these basic hooks, Refine provides advanced hooks that are a composition of these fundamental ones for handling more complex tasks (`useForm`, `useTable`, `useSelect`).

6. **Integration with UI Libraries:** Works seamlessly with popular UI libraries. It provides a structured approach to represent data within these libraries.

7. **Realtime Updates**: Allowing your application to reflect changes in data as they occur.

## Handling errors

Refine expects errors to be extended from [HttpError](/docs/core/interface-references#httperror). We believe that having consistent error interface makes it easier to handle errors coming from your API.

When implemented correctly, Refine offers several advantages in error handling:

- **Notification**: If you have [`notificationProvider` ](/docs/notification/notification-provider), Refine will automatically show a notification when an error occurs.
- **Server-Side Validation**: Shows [errors coming from the API](/docs/advanced-tutorials/forms/server-side-form-validation/) on the corresponding form fields.
- **Optimistic Updates**: Instantly update UI when you send a mutation and automatically revert the changes if an error occurs during the mutation.

<ErrorHandling />

## Listing Data

Imagine we need to fetch a list of records from the `products` endpoint. For this, we can use [`useList`][use-list] or [`useInfiniteList`][use-infinite-list] hooks. It calls `dataProvider.getList` method from your data provider, returns `data` and `total` fields from the response.

<UseList />

### Filters, Sorters and Pagination

We fetched all the products from the `products` endpoint in the previous example. But in real world, we usually need to fetch a subset of the data.

Refine provides a unified [`filters`][crud-filters], [`sorters`][crud-sorting], and [`pagination`][pagination] parameters in data hooks to pass your `data provider` methods, making it possible to fetch the data you need with any complexity. It's data provider's responsibility to handle these parameters and modify the request sent to your API.

Now let's make it more realistic example by adding filters, sorters, and pagination.

We want to:

- Fetch 5 products
- With `material` field equals to `wooden`
- Sorted by `ID` field in `descending` order

For this purpose, we can pass additional parameters to `useList` hook like [`filters`][crud-filters], [`sorters`][crud-sorting], and [`pagination`][pagination].

`useList` calls the `dataProvider.getList` method under the hood with the given parameters. We will use these parameters modify our request sent to our API.

<UseListWithFilters />

While the example above is simple, it's also possible to build more complex queries with [`filters`][crud-filters] and [`sorters`][crud-sorting].

For instance, we can fetch products:

- With wooden material
- Belongs to category ID 45
- **OR** have a price between 1000 and 2000.

```tsx
import { DataProvider, useList } from "@refinedev/core";

useList({
  resource: "products",
  pagination: {
    current: 1,
    pageSize: 10,
  },
  filters: [
    {
      operator: "and",
      value: [
        { field: "material", operator: "eq", value: "wooden" },
        { field: "category.id", operator: "eq", value: 45 },
      ],
    },
    {
      operator: "or",
      value: [
        { field: "price", operator: "gte", value: 1000 },
        { field: "price", operator: "lte", value: 2000 },
      ],
    },
  ],
});
```

## Relationships

Refine handles data relations with data hooks(eg: `useOne`, `useMany`, etc.). This compositional design allows you to flexibly and efficiently manage data relationships to suit your specific requirements.

### One-to-One

In a one-to-one relationship, each thing matches with just one other thing. It's like a unique partnership.

For instance, a product can have only one product detail.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ ProductDetail  │
│--------------│       │----------------│
│ id           │───────│ id             │
│ name         │       │ weight         │
│ price        │       │ dimensions     │
│ description  │       │ productId      │
│ detail       │       │                │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useOne` hook to fetch the detail of a product.

<OneToOne />

### One-to-Many

In a one-to-many relationship, each resource matches with many other resource. It's like a parent with many children.

For instance, a products can have many reviews.

<!-- prettier-ignore-start -->

```md
┌──────────────┐       ┌────────────────┐
│ Products     │       │ Reviews        │
│--------------│       │----------------│
│ id           │───┐   │ id             │
│ name         │   │   │ rating         │
│ price        │   │   │ comment        │
│ description  │   │   │ user           │
│ detail       │   └───│ product        │
│              │       │                │
└──────────────┘       └────────────────┘
```
<!-- prettier-ignore-end -->

We can use the `useList` hook and filter by the product ID to fetch the reviews of a product.

<OneToMany />

### Many-to-Many

In a many-to-many relationship, each resource matches with many other resources, and each of those resources matches with many other resources.

For instance, products can have many categories, and categories can have many products.

<!-- prettier-ignore-start -->
```md
┌──────────────┐       ┌───────────────────┐       ┌──────────────┐
│ Products     │       │ ProductCategories │       │ Categories   │
│--------------│       │----------------───│       │--------------│
│ id           │───┐   │ id                │   ┌───│ id           │
│ name         │   └───│ productId         │   │   │ name         │
│ price        │       │ categoryId        │───┘   │ description  │
│ description  │       │                   │       │              │
│ detail       │       │                   │       │              │
│              │       │                   │       │              │
└──────────────┘       └───────────────────┘       └──────────────┘

```
<!-- prettier-ignore-end -->

In this case, we can use the `useMany` hook to fetch the categories of a product and the `useMany` hook to fetch the products of a category.

```jsx
import { DataProvider, useMany } from "@refinedev/core";

const { data: productCategories } = useList({
  resource: "productCategories",
});

const { data: products } = useMany({
  resource: "products",
  ids: productCategories.map((productCategory) => productCategory.productId),
  queryOptions: {
    enabled: productCategories.length > 0,
  },
});

const { data: categories } = useMany({
  resource: "categories",
  ids: productCategories.map((productCategory) => productCategory.categoryId),
  queryOptions: {
    enabled: productCategories.length > 0,
  },
});
```

## `dataProvider` interface

To better understand the data provider interface, we have created an example that demonstrates how the required methods are implemented. For more comprehensive and diverse examples, you can refer to the [supported data providers](#supported-data-providers) section.

> In this example, we implemented data provider to support [JSON placeholder API](https://jsonplaceholder.typicode.com/).

<DataProviderInterface />

[To learn more about the `dataProvider` interface, check out the reference page.](/docs/data/data-provider)

## Supported data providers

<SupportedDataProviders/>

## Data hooks

<DataHooks />

[basekey]: /docs/core/interface-references#basekey
[create-a-data-provider]: /docs/data/data-provider
[swizzle-a-data-provider]: /docs/packages/cli#swizzle
[data-provider-tutorial]: /docs/data/data-provider
[use-api-url]: /docs/data/hooks/use-api-url
[use-create]: /docs/data/hooks/use-create
[use-create-many]: /docs/data/hooks/use-create
[use-custom]: /docs/data/hooks/use-custom
[use-delete]: /docs/data/hooks/use-delete
[use-delete-many]: /docs/data/hooks/use-delete
[use-list]: /docs/data/hooks/use-list
[use-infinite-list]: /docs/data/hooks/use-infinite-list
[use-many]: /docs/data/hooks/use-many
[use-one]: /docs/data/hooks/use-one
[use-update]: /docs/data/hooks/use-update
[use-update-many]: /docs/data/hooks/use-update
[crud-sorting]: /docs/core/interface-references#crudsorting
[crud-filters]: /docs/core/interface-references#crudfilters
[pagination]: /docs/core/interface-references#pagination
[http-error]: /docs/core/interface-references#httperror
[meta-data]: /docs/core/interface-references#metaquery
[meta]: /docs/core/interface-references#metaquery
[use-login]: /docs/authentication/hooks/use-login
[use-register]: /docs/authentication/hooks/use-register
