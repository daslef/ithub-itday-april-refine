---
title: Навигация
---

import { Sandpack, AddLinksToHeader, AddShowAndEditButtonsToListProducts } from "./sandpack.tsx";

<Sandpack>

Познакомимся с возможностями Refine связанными с навигацией.

Мы будем использовать хук [`useNavigation`](/docs/routing/hooks/use-navigation) и создадим кнопки для перехода к страницам для создания, редактирования и показа продуктов. Помимо этого, мы реализуем ссылку на список всех продуктов в компоненте `<Header />`.

## Добавление ссылок на список продуктов и создание продукта

Используем хук `useNavigation` из `@refinedev/core` и компонент `<Link />` из библиотеки `react-router-dom`.

Обнови компонент `<Header />` и добавь ссылку на список продуктов:

```jsx title="src/components/header.jsx"
import React from "react";
// highlight-next-line
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";

// highlight-next-line
import { Link } from "react-router-dom";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  // Также, можно использовать методы list или create.
  // Мы используем url-методы для более семантичного html.
  // highlight-next-line
  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      {/* highlight-start */}
      <Link to={listUrl("protected-products")}>List Products</Link>
      <Link to={createUrl("protected-products")}>Create Product</Link>
      {/* highlight-end */}
      <button type="button" disabled={isLoading} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
```

<AddLinksToHeader />

## Добавление кнопок на страницу списка продуктов

Аналогично, добавим к компоненту `<ListProducts />` ссылки для отображения и редактирования продукта.

```jsx title="src/pages/products/list.jsx"
// highlight-next-line
import { useTable, useMany, useNavigation } from "@refinedev/core";

// highlight-next-line
import { Link } from "react-router-dom";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: "protected-products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { showUrl, editUrl } = useNavigation();

  /* ... */

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>Category</th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            {/* highlight-start */}
            <th>Actions</th>
            {/* highlight-end */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
              {/* highlight-start */}
              <td>
                <Link to={showUrl("protected-products", product.id)}>Show</Link>
                <Link to={editUrl("protected-products", product.id)}>Edit</Link>
              </td>
              {/* highlight-end */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{/* ... */}</div>
    </div>
  );
};
```

<AddShowAndEditButtonsToListProducts />

:::info

Помимо хука `useNavigation` можно использовать любые иные методы навигации, существующие в выбранной библиотеке роутинга.

:::

</Sandpack>
