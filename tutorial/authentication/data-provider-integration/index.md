---
title: Интеграция с провайдером данных
---

import { Sandpack, AddAuthenticationToDataProvider, AddProtectedProductsResourceToListProducts, AddOnErrorMethodToAuthProvider } from "./sandpack.tsx";

<Sandpack>

Теперь, когда реализована ауз-логика, интегрируемся с провайдером данных, чтобы скрыть ресурсы от неавторизованных пользователей, а для обработки связанных с аутентификацией ошибок применим `onError`.

## Добавление хедера `Authorization`

На предыдущем шаге мы получали `token` и сохраняли его в `localStorage`, а теперь добавим к нашим запросам хедер `Authorization`.

Наш фейковый REST API предоставляет несколько ресурсов, защищенных от анонимных запросов. Для доступа к таким ресурсам фейковый API ожидает, что мы отправим `token` в поле `Authorization` хедера.

Предлагаем заменить метод `fetch` провайдера данных на кастомную обертку над ним, добавляющую к запросам хедер `Authorization`.

Обнови `src/providers/data-provider.js` следующим образом:

```js title="src/providers/data-provider.js"

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const fetcher = async (url, options) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: localStorage.getItem("my_access_token"),
    },
  });
};
// highlight-end

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) { /* ... */ }

    if (sorters && sorters.length > 0) { /* ... */ }

    if (filters && filters.length > 0) { /* ... */ }

    // removed-line
    const response = await fetch(
    // added-line
    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    const total = Number(response.headers.get("x-total-count"));

    return {
      data,
      total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) { /* ... */ }

    // removed-line
    const response = await fetch(
    // added-line
    const response = await fetcher(
      `${API_URL}/${resource}?${params.toString()}`,
    );

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getOne: async ({ resource, id, meta }) => {
    // removed-line
    const response = await fetcher(`${API_URL}/${resource}/${id}`);
    // added-line
    const response = await fetcher(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    // removed-line
    const response = await fetch(`${API_URL}/${resource}`, {
    // added-line
    const response = await fetcher(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    // removed-line
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
    // added-line
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  /* ... */
};
```

<AddAuthenticationToDataProvider />

## Работа с защищенным ресурсом

Фейковый ресурс `protected-products` по сути аналогичен ресурсу `products`, который мы использовали ранее, но в отличие от него требует аутентификации.

Давай переключимся на использование `protected-resources` в компоненте `<ListProducts />`.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // highlight-next-line
    resource: "protected-products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPrevious = () => {
    /* ... */
  };
  const onNext = () => {
    /* ... */
  };
  const onPage = (page: number) => {
    /* ... */
  };
  const getSorter = (field: string) => {
    /* ... */
  };
  const onSort = (field: string) => {
    /* ... */
  };

  const indicator = { asc: "⬆️", desc: "⬇️" };

  return <div>{/* ... */}</div>;
};
```

<AddProtectedProductsResourceToListProducts />

## Обработка ошибок аутентификации

При попытке получить защищенный ресурс без аутентификации фейковый API вернем нам ошибку `401 Unauthorized`. Мы можем обработать ее в методе `onError` провайдера аутентификации.

`onError` обрабатывает ошибки, происходящие на провайдере данных. Используя этот метод, мы сможем обрабатывать случаи истечения срока годности токенов, невалидные токены и требовать логаут.

Добавим метод `onError` в `src/providers/auth-provider.js` и обработаем ошибку `401 Unauthorized`:

```js title="src/providers/auth-provider.js"
export const authProvider = {
  // highlight-start
  onError: async (error) => {
    if (error?.status === 401) {
      return {
        logout: true,
        error: { message: "Unauthorized" },
      };
    }

    return {};
  },
  // highlight-end
  getIdentity: async () => {
    /* ... */
  },
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  // ...
};
```

<AddOnErrorMethodToAuthProvider />

## Итоги

Первый шаг интеграции сделан, остальные методы могут быть реализованы по аналогии, с использованием соответствующих хуков.

</Sandpack>
