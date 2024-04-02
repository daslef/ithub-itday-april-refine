---
title: Формы
---

import { Sandpack, AddCreateMethod, CreateCreateProductFile, AddUseFormToCreateProduct, AddCreateProductToAppTsx, AddPriceUpdateToCreateProduct, AddCategoryRelationToCreateProduct, MountEditProductInAppTsx, RefactorToUseFormInEditProduct } from "./sandpack.tsx";

<Sandpack>

Формы - один из основных способов взаимодействия с бэкендом. Пришло время изучить хук `useForm`, который служит для создания и обновления записей.

:::simple Implementation Tips

У хука `useForm` есть расширенные версии, созданные под конкретные UI-библиотеки, и в реальных проектах мы рекомендуем использовать их.

:::

Хук `useForm` можно использовать в трех вариациях:

- `create`: для создания новой записи для ресурса через метод `create` провайдера данных.
- `edit`: для обновления существующей записи ресурса через метод `update` провайдера данных.
- `clone`: для создания новой записи на основе существующей, также через метод `create`.

В этом руководстве мы рассмотрим первые два.

## Имплементация метода `create`

Для создания записи через хуки `useForm` и `useCreate` изначально нам нужно реализовать метод `create` для провайдера данных.

Метод `create` принимает свойства `resource`, `variables` и `meta`:
- `resource` это имя сущности, экземпляр которой мы создаем;
- `variables` - объект, содержащий данные;
- `meta` можно использовать для передачи дополнительных данных и настроек.

Фейковый API для создания нового продукта ожидает от нас `POST` запрос к эндпоинту `/products`. Обнови `src/providers/data-provider.js` следующим образом:

```js title="src/providers/data-provider.js"

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  // highlight-start
  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
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
  // highlight-end
  update: async ({ resource, id, variables }) => {
    /* ... */
  },
  getList: async ({ resource, pagination, filters, sorters }) => {
    /* ... */
  },
  getOne: async ({ resource, id }) => {
    /* ... */
  },
  /* ... */
};
```

<AddCreateMethod />

## Применение хука `useForm`

Теперь можно попробовать вызвать хук `useForm` для создания новой записи. 

Создай файл `/pages/products/create.js` и компонент `CreateProduct`

<CreateCreateProductFile />

Теперь импортируй компонент `CreateProduct` в `src/App.jsx` и примонтируй его внутрь компонента `<Refine />`:

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
// highlight-next-line
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* <ListProducts /> */}
      {/* highlight-next-line */}
      <CreateProduct />
    </Refine>
  );
}
```

<AddCreateProductToAppTsx />

Будем использовать форму с полями `name`, `description`, `price`, `material` и `category`.

Обнови `src/pages/products/create.jsx` следующим образом:

```jsx title="src/pages/products/create.jsx"
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "products",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    // используем FormData чтобы достать значения из формы и упаковать их в объект
    const data = Object.fromEntries(new FormData(event.target).entries());
    // вызываем onFinish чтобы отправить данные
    onFinish(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

<AddUseFormToCreateProduct />

## Предобработка значений перед отправкой формы

Кажется, что мы готовы к отправке формы. Но перед этим стоит удостовериться, что формат наших данных соответствует ожиданиям API.

Ориентируясь на документацию фейкового API, оно ожидает поле `price` в виде строки с двумя знаками после точки, а поле `category` - в виде объекта со свойством `id`. Так что необходимо сделать некоторую предобработку.

Обнови `src/pages/products/create.jsx`, добавив следующие строки::

```jsx title="src/pages/products/create.jsx"
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "products",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    // highlight-start
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
    // highlight-end
  };

  return <form onSubmit={onSubmit}>{/* ... */}</form>;
};
```

<AddPriceUpdateToCreateProduct />

Теперь поле `price` имеет корректный формат.

:::simple Implementation Tips

Изменение значение перед отправкой поддерживается всеми версиями хука `useForm`, но реализация может отличаться, поэтому используя аналоги, настроенные под конкретную UI-библиотеку, обращайтесь к документации.

:::

## Отношения

Теперь обратим внимание на поле `category`, которое используется для выбора категории нового продукта.

Наш фейковый API предоставляет сущность `categories`, которая связана с используемой нами сущностью `products`. Следовательно, стоит удостовериться, что мы отправляем категорию, которая точно существует, и в идеале - подгружать список категорий для выбора динамически!

Для подобных случаев Refine предлагает хук `useSelect`. Его можно использовать для подгрузки данных для html-элемента `<select>`:

```jsx title="src/pages/products/create.jsx"
// highlight-next-line
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "products",
  });

  // highlight-start
  const { options } = useSelect({
    resource: "categories",
  });
  // highlight-end

  const onSubmit = (event) => {
    /* ... */
  };

  return (
    <form onSubmit={onSubmit}>
      {/* ... */}

      <label htmlFor="category">Category</label>
      {/* highlight-start */}
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* highlight-end */}

      {/* ... */}
    </form>
  );
};
```

<AddCategoryRelationToCreateProduct />

Ура! Мы наконец можем отправить форму 😅

:::simple Relations

Refine поддерживает различные виды отношений, которые могут быть полезны для отображения в формах, таблицах, и не только. Если возникнет необходимость, больше информации ты сможешь найти в [разделе документации по работе с данными](/docs/guides-concepts/data-fetching/#relationships)
:::

## Рефакторинг `src/pages/products/edit.jsx` с `useForm`

Теперь, когда мы научились работать с `useForm`, перепишем на его основе компонент `EditProduct` для обновления записей.

Вновь замаунтим `EditProduct` в компонент `<Refine />`:

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
      {/* highlight-next-line */}
      <EditProduct />
      {/* <ListProducts /> */}
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<MountEditProductInAppTsx />

Теперь, когда мы снова увидели компонент `EditProduct`, импортируем `useForm` для замены им сразу двух действий - получения исходных данных через `useOne` и обновления через `useUpdate`.

Мы также переиспользуем часть элементов, использованных при построении компонента `<CreateProduct />`.

Обнови `src/pages/products/edit.jsx` следующим образом:

```jsx title="src/pages/products/edit.jsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  // highlight-start
  const { onFinish, mutationResult, queryResult } = useForm({
    action: "edit",
    resource: "products",
    id: "123",
  });
  // highlight-end

  // highlight-next-line
  const record = queryResult.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());

    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      {/* highlight-next-line */}
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        // highlight-next-line
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\d*\.?\d*"
        // highlight-next-line
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        // highlight-next-line
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            // highlight-next-line
            selected={record?.category.id == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

<RefactorToUseFormInEditProduct />

Сделано! Теперь функционал редактирования реализован на базе более продвинутого хука `useForm`!

## Итоги

Итак, мы рассмотрели хук `useForm`, который может быть использован для создания и обновления записей, попутно поработав с отношениями.

Хук `useForm` и его расширения так же позволяют:

- Инвалидировать связанные запросы,
- Перенаправлять после отправки формы,
- Интегрировать валидацию на стороне сервера,
- Автосохраненять состояние полей,
- Отправлять уведомления и многое другое...

</Sandpack>
