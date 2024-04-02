---
title: Чтение записи
---

import { Sandpack, AddGetOneMethod, CreateShowProductFile, AddUseOneToShowProduct, AddShowProductToAppTsx } from "./sandpack.tsx";

<Sandpack>

В этом шаге мы освоим хук `useOne` для получения единичной конкретной записи от нашего фейкового API и реализуем соответствующий метод `getOne` для провайдера данных.

## Имплементация метода `getOne`

Для получения записи через хук `useOne` первично нужно реализовать соответствующий ему метод [`getOne`](/docs/data/data-provider/#getone-) в провайдере данных.

Метод `getOne` принимает свойства `resource`, `id` и `meta`.

- `resource` относится к сущности, которая нас интересует.
- `id` является уникальным идентификатором записи, которую мы хотим получить.
- `meta` может содержать дополнительные уточняющие сведения.

Наш фейковый API содержит сущность `products` и ожидает, что мы будем обращаться к ней через эндпоинт `/products/:id`. Следовательно, нам понадобятся свойства `resource` и `id`, чтобы обратиться за данными.

Обнови свой `src/providers/data-provider.js` следующим образом:

```js title="src/providers/data-provider.js"
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  // highlight-start
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  // highlight-end
  update: () => {
    throw new Error("Not implemented");
  },
  getList: () => {
    throw new Error("Not implemented");
  },
  /* ... */
};
```

<AddGetOneMethod />

## Использование хука `useOne`

Теперь, когда метод `getOne` реализован, мы можем опробовать хук `useOne` в деле и запросить запись. Создай компонент `ShowProduct` в файле `src/pages/products/show.jsx`.

<CreateShowProductFile />

Импортируй `useOne` и примени его в компоненте `ShowProduct` для получения конкретной записи сущности `products`.

```jsx title="src/pages/products/show.jsx"
// highlight-next-line
import { useOne } from "@refinedev/core";

export const ShowProduct = () => {
  // highlight-next-line
  const { data, isLoading } = useOne({ resource: "products", id: 123 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Product name: {data?.data.name}</div>;
};
```

<AddUseOneToShowProduct />

Теперь импортируй компонент `ShowProduct` в `src/App.tsx` и помести его внутрь компонента `<Refine />`:

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
// highlight-next-line
import { ShowProduct } from "./pages/products/show";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* highlight-next-line */}
      <ShowProduct />
    </Refine>
  );
}
```

<AddShowProductToAppTsx />

По завершению этого шага название продукта должно отобразиться на экране.

</Sandpack>
