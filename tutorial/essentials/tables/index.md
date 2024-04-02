---
title: Таблицы
---

import { Sandpack, MountListProductsInAppTsx, RefactorToUseTableInListProducts, AddRelationHandlingToUseTableInListProducts, AddGetManyMethodToDataProvider, AddTotalToGetListMethodInDataProvider, AddPaginationToUseTableInListProducts, AddHeaderSortersToUseTableInListProducts } from "./sandpack.tsx";

<Sandpack>

Следующая важнейшая тема - работа с данными в табличном виде через хук - `useTable`.

:::simple Implementation Tips

Хук `useTable` имеет расширенные версии для UI-библиотек типа Ant Design или Material UI и библиотек для таблиц типа Tanstack Table.

:::

Хук `useTable` построен на базе хука `useList` hook. Он из коробки поддерживает поиск, фильтрацию, сортировку и пагинацию, а также в сквозную интегрируется с роутерами.

В этой секции мы отрефакторим наш компонент `<ListProducts />` для работы через хук `useTable`.

Вновь замаунтим `<ListProducts />` в `/src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* highlight-next-line */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<MountListProductsInAppTsx />

## Рефакторинг с использованием `useTable`

Добавим хук `useTable` и поля `id`, `name`, `category`, `material` и `price` в компонент `<ListProducts />`, который находится в файле `src/pages/products/list.jsx`::

```jsx title="src/pages/products/list.jsx"
// highlight-next-line
import { useTable } from "@refinedev/core";

export const ListProducts = () => {
  // highlight-start
  const {
    tableQueryResult: { data, isLoading },
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });
  // highlight-end

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* highlight-start */}
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category?.id}</td>
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
          {/* highlight-end */}
        </tbody>
      </table>
    </div>
  );
};
```

<RefactorToUseTableInListProducts />

## Отношения

Обрати внимание, что сейчас мы отображаем в таблице `category.id`. По схожей с хуком `useSelect` схеме, Refine также предлагает хук `useMany` для получения множества записей по их идентификаторам.

Используем `useMany` для получения полной информации о категориях по их идентификаторам и отобразим `category.title` вместо `category.id`:

```jsx title="src/pages/products/list.jsx"
// highlight-next-line
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  // highlight-start
  const { data: categories } = useMany({
    resource: "categories",
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  });
  // highlight-end

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              {/* highlight-start */}
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id,
                  )?.title
                }
              </td>
              {/* highlight-end */}
              <td>{product.material}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

<AddRelationHandlingToUseTableInListProducts />

## Добавление метода `getMany` в провайдер данных

Мы научились получать категории для компонента `<ListProducts />`. Но сейчас мы получаем их по одному, через метод `getOne`. Но если реализовать метод `getMany` в провайдере данных, мы сможем получать коллекцию записей однократным запросом.

:::simple Implementation Tips

Если `getMany` в используемом провайдере данных не реализован, Refine автоматически переходит на получение записей по одной через метод `getOne`.

:::

Наш фейковый API поддерживает запрос множества записей через перечисление их идентификаторов в следующей форме: `/products?id=1&id=2&id=3`. Добавим метод `getMany` в провайдер данных:

```jsx title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  // highlight-start
  getMany: async ({ resource, ids, meta }) => {
    const params = new URLSearchParams();

    if (ids) {
      ids.forEach((id) => params.append("id", id));
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-end
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  create: async ({ resource, variables }) => {
    /* ... */
  },
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    /* ... */
  },
  /* ... */
};
```

<AddGetManyMethodToDataProvider />

Наше сетевое взаимодействие стало чуточку эффективней!

## Реализация `total` в провайдере данных

Для корректной работы пагинации мы должны возвращать значение `total` в методе `getList`. Фейковый API предоставляет нам количество записей в хедере `X-Total-Count`.

Обновим `getList`:

```jsx title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  // highlight-next-line
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

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    // highlight-next-line
    const total = Number(response.headers.get("x-total-count"));

    return {
      data,
      // highlight-next-line
      total,
    };
  },
  getMany: async ({ resource, ids, meta }) => {
    /* ... */
  },
  getOne: async ({ resource, id, meta }) => {
    /* ... */
  },
  create: async ({ resource, variables }) => {
    /* ... */
  },
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  /* ... */
};
```

<AddTotalToGetListMethodInDataProvider />

## Реализация пагинации для таблиц

Теперь, когда у нас есть актуальный `total`, Refine сможет высчитать количество страниц для пагинации `pageCount` за нас.

Для пагинирования таблицы мы будем использовать значения `current`, `setCurrent` и `pageCount` из ответа хука `useTable`.

Обновим компонент `<ListProducts />` следующим образом:

```jsx title="src/pages/products/list.jsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    // highlight-start
    current,
    setCurrent,
    pageCount,
    // highlight-end
  } = useTable({
    resource: "products",
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

  // highlight-start
  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
  // highlight-end

  // highlight-start
  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };
  // highlight-end

  // highlight-start
  const onPage = (page: number) => {
    setCurrent(page);
  };
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Material</th>
            <th>Price</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      {/* highlight-start */}
      <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && (
            <span onClick={() => onPage(current - 1)}>{current - 1}</span>
          )}
          <span className="current">{current}</span>
          {current + 1 < pageCount && (
            <span onClick={() => onPage(current + 1)}>{current + 1}</span>
          )}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
      {/* highlight-end */}
    </div>
  );
};
```

<AddPaginationToUseTableInListProducts />

Теперь при смене страницы `useTable` автоматически запрашивает данные для новой страницы и ререндерит наш компонент.

## Добавление сортировок

Наконец, для реализации сортировки мы используем `sorters` и `setSorters` из ответа хука `useTable`.

Обновим `<ListProducts />` таким образом, чтобы сортировка происходила при клике на заголовки таблицы и сопровождалась визуальным индикатором.

```jsx title="src/pages/products/list.jsx"
import { useTable, useMany } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    // highlight-start
    sorters,
    setSorters,
    // highlight-end
  } = useTable({
    resource: "products",
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

  const onPrevious = () => { /* ... */ };

  const onNext = () => { /* ... */ };

  const onPage = (page) => { /* ... */ };

  // highlight-start
  // используем эту функцию для получения актуального сортировщика
  const getSorter = (field) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);

    if (sorter) {
      return sorter.order;
    }
  }
  // highlight-end

  // highlight-start
  // используем эту функцию для переключения сортировки при клике на заголовки таблицы
  const onSort = (field) => {
    const sorter = getSorter(field);
    setSorters(
        sorter === "desc" ? [] : [
        {
            field,
            order: sorter === "asc" ? "desc" : "asc",
        },
        ]
    );
  }
  // highlight-end

  // highlight-start
  // используем для визуальной индикации
  const indicator = { asc: "⬆️", desc: "⬇️" };
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            {/* highlight-start */}
            <th onClick={() => onSort("id")}>
              ID {indicator[getSorter("id")]}
            </th>
            <th onClick={() => onSort("name")}>
              Name {indicator[getSorter("name")]}
            </th>
            <th>
              Category
            </th>
            <th onClick={() => onSort("material")}>
              Material {indicator[getSorter("material")]}
            </th>
            <th onClick={() => onSort("price")}>
              Price {indicator[getSorter("price")]}
            </th>
            {/* highlight-end */}
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (/* ... */))}
        </tbody>
      </table>
      <div className="pagination">
        {/* ... */}
      </div>
    </div>
  );
};
```

<AddHeaderSortersToUseTableInListProducts />

## Итоги

Хук `useTable` - один из самых полезных для информационных систем, так как очень многие данные удобнее всего представлять именно в виде таблиц. У него много применений, в том числе для реализации фильтров, сортировки и пагинирования. А еще он интегрируется с роутерами для синхронизации адреса страницы и состояния таблицы.

Заметь, что хук `useTable` во многом похож на `useList`, но имеет больший охват кейсов применения.

</Sandpack>
