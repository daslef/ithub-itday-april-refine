---
title: Обновление записи
---

import { Sandpack, AddUpdateMethod, CreateEditProductFile, AddUseUpdateToEditProduct, AddEditProductToAppTsx } from "./sandpack.tsx";

<Sandpack>

Читать данные мы научились, теперь освоим модификацию записей через хук `useUpdate` и соответствующий метод провайдера данных `update`.

## Реализация метода `update`

Первично, добавим метод [`update`](/docs/data/data-provider/#update-) к провайдеру данных. Этот метод будет использован хуком [`useUpdate`](/docs/data/hooks/use-update).

Метод `update` принимает свойства `resource`, `id`, `variables` и `meta`.

- `resource` относится к сущности, которая нас интересует.
- `id` - уникальный идентификатор обновляемой записи.
- `variables` - объект, содержащий данные для обновления записи.
- `meta` - объект, через который можно передать дополнительные данные об операции.

Фейковый API ожидает, что для обновления записи сущности `products` будет использован эндпоинт `/products/:id` с http-методом `PATCH`.

Внеси изменения в `src/providers/data-provider.js`:

```js title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-start
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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
  // highlight-end
  getList: () => {
    throw new Error("Not implemented");
  },
  /* ... */
};
```

<AddUpdateMethod />

## Применение хука `useUpdate`

Создадим компонент `EditProduct` в файле `src/pages/products/edit.jsx`.

<CreateEditProductFile />

Используем хук `useOne` для получения исходного состояния записи, а уже после - хук `useUpdate` для ее обновления.

```jsx title="src/pages/products/edit.jsx"
// highlight-next-line
import { useOne, useUpdate } from "@refinedev/core";

export const EditProduct = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 123 });
  // highlight-next-line
  const { mutate, isLoading: isUpdating } = useUpdate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updatePrice = async () => {
    // highlight-start
    await mutate({
      resource: "products",
      id: 123,
      values: {
        price: Math.floor(Math.random() * 100),
      },
    });
    // highlight-end
  };

  return (
    <div>
      <div>Product name: {data?.data.name}</div>
      <div>Product price: ${data?.data.price}</div>
      <button onClick={updatePrice}>Update Price</button>
    </div>
  );
};
```

<AddUseUpdateToEditProduct />

Наконец, импортируем и встроим `EditProduct` в компонент `<Refine />`:

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
// highlight-next-line
import { EditProduct } from "./pages/products/edit";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* highlight-next-line */}
      <EditProduct />
    </Refine>
  );
}
```

<AddEditProductToAppTsx />

Должны отобразиться исходное название продукта, его цена и кнопка `Update Price`, по щелчку на которую цена должна обновиться.

:::tip Smart Invalidations

Обратите внимание, что после отправки запроса на изменение данных через `useUpdate`, цена на экране также обновилась. Это называется _инвалидацией данных_ и происходит автоматически, когда Refine замечает изменения в том или ином ресурсе, так что мы всегда можем быть уверены в актуальности отображаемых данных.
:::

</Sandpack>
