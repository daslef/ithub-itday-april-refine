---
title: Список записей
---

import { Sandpack, AddGetListMethod, CreateListProductsFile, AddUseListToListProducts, AddListProductsToAppTsx, AddPaginationToGetList, AddPaginationToListProducts, AddSortingToGetList, AddSortingToListProducts, AddFiltersToGetList, AddFiltersToListProducts } from "./sandpack.tsx";

<Sandpack>

Цель этого шага - научиться пользоваться хуком `useList` для получения уже не одной записи, а списка записей. Мы также поговорим о пагинации, сортировке и фильтрации.

## Имплементация метода `getList`

Аналогично прошлому шагу, для использования хука первично необходимо реализовать соответствующий метод в провайдере данных. Теперь это метод [`getList`](/docs/data/data-provider/#getlist-). Этот метод используется хуком [`useList`](/docs/data/hooks/use-list) и его модификациями для получения списка данных.

Метод `getList` принимает свойства `resource`, `pagination`, `sorters`, `filters` и `meta`.

- `resource` обозначает сущность, которую мы запрашиваем.
- `pagination` - это объект, содержащий свойства `current` и `pageSize`.
- `sorters` - массив, содержащий правила сортировки.
- `filters` - массив, содержащий правила фильтрации.
- `meta` - объект, в который можно передать дополнительную информацию о запросе.

Напомним, наш фейковый API содержит сущность `products`, и ожидает что для получения списка продуктов мы обратимся к эндпоинту `/products`.

Чтобы упростить процесс реализации, в первой итерации обойдемся без пагинации, сортировки и фильтрации, и будем дополнять ими последовательно.

Обнови файл `src/providers/data-provider.js` следующим образом:

```js title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  // highlight-start
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(`${API_URL}/${resource}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0, // Разберем далее
    };
  },
  // highlight-end
  /* ... */
};
```

<AddGetListMethod />

## Применение хука `useList`

Создадим компонент `ListProducts` в файле `src/pages/products/list.jsx`.

<CreateListProductsFile />

Импортируй и задействуй хук `useList` в компоненте `ListProducts` для получения списка всех продуктов:

```jsx title="src/pages/products/list.jsx"
// highlight-next-line
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  // highlight-start
  const { data, isLoading } = useList({ resource: "products" });
  // highlight-end

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {/* highlight-next-line */}
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

<AddUseListToListProducts />

Наконец, добавь компонент `ListProducts` внутрь компонента `<Refine />`.

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
// highlight-next-line
import { ListProducts } from "./pages/products/list";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* highlight-next-line */}
      <ListProducts />
    </Refine>
  );
}
```

<AddListProductsToAppTsx />

По окончанию этого шага мы ожидаем увидеть на экране полный список продуктов.

## Добавление пагинации

В случае, когда записей становится слишком много, становится нецелесообразным загружать их все разом, потому дополним метод `getList` пагинацией.

Наш фейковый API поддерживает пагинацию через квери-параметры `_start` и `_end`.

- `_start` обозначает порядковый номер первой записи, начиная с которой мы хотим получить данные,
- `_end` напротив, порядковый номер последней записи.

Следовательно, нам нужно адаптировать свойство `pagination` под работу с квери-параметрами `_start` и `_end`.

Дополни файл `src/providers/data-provider.js` следующими строками:

```js title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    // highlight-start
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    // highlight-end

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0,
    };
  },
  /* ... */
};
```

<AddPaginationToGetList />

Осталось добавить пагинацию в компонент `ListProducts`.

Обнови файл `src/pages/products/list.jsx`:

```tsx title="src/pages/products/list.tsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    // highlight-next-line
    pagination: { current: 1, pageSize: 10 },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddPaginationToListProducts />

Теперь на экране должны остаться только первые 10 продуктов.

## Добавление сортировки

Сортировку можно производить как на бэкенде, так и на фронте. В данном случае мы делегируем сортировку на бэкенд, так как он поддерживает данную функциональность через квери-параметры `_sort` и `_order`:

- `_sort` содержит имя поля, по которому мы сортируем,
- `_order` содержит порядок сортировки.

Наша задача, опять же, написать адаптер между свойством `sorters` и указанными выше квери-параметрами.

:::simple Implementation Details

Refine поддерживает множественные сортировщики переданные массивом, и используемый нами фейковый API тоже поддерживает их в формате указания через запятую. Но так бывает не всегда.

:::

Добавь в `src/providers/data-provider.js` следующие строки:

```js title="src/providers/data-provider.js"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    // highlight-start
    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0,
    };
  },
  /* ... */
};
```

<AddSortingToGetList />

Проверим работоспособность! Обнови файл `src/pages/products/list.jsx` следующим образом:

```jsx title="src/pages/products/list.jsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    // highlight-next-line
    sorters: [{ field: "name", order: "asc" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddSortingToListProducts />

Теперь первые 10 записей должны быть отсортированы по названию, по алфавиту.

## Добавление фильтрации

Наконец, добавим в `getList` логику фильтрации.

За это отвечает свойство `filters`. Оно реализует интерфейс [`CrudFilters`](https://refine.dev/docs/core/interface-references/#crudfilters) и подробнее описано в [документации о фильтрах](/docs/guides-concepts/data-fetching/#filters-sorters-and-pagination).

:::simple Implementation Details

- Refine поддерживает множественные фильтры, как и наш фейковый API, но так бывает не всегда.

- Фейковый API поддерживает фильтрацию через множество различных операторов, в том числе через логические И и ИЛИ, но в целях упрощения здесь мы будем фильтровать только через оператор равенства `"eq"`.

:::

Обнови `src/providers/data-provider.js`:

```js title="src/providers/data-provider.js"
import type { DataProvider } from "@refinedev/core";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    // highlight-start
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          // наш фейковый API поддерживает оператор "eq" через квери-параметры
          params.append(filter.field, filter.value);
        }
      });
    }
    // highlight-end

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0,
    };
  },
  /* ... */
};
```

<AddFiltersToGetList />

Теперь мы можем фильтровать список продуктов:

```jsx title="src/pages/products/list.jsx"
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    // highlight-next-line
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{/* ... */}</div>;
};
```

<AddFiltersToListProducts />

:::simple Implementation Tips

- Refine также поддерживает хук `useInfiniteList` для ленивого получения записей через бесконечный скроллинг и хук `useTable`, чуть более продвинутый в плане функционала. С ними мы познакомим позднее.

- Полноценную реализацию провайдера данных для протокола REST ты можешь осмотреть [в исходном коде адаптера `@refinedev/simple-rest`](https://github.com/refinedev/refine/tree/master/packages/simple-rest).

:::

</Sandpack>
