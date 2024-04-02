---
title: Инференс параметров
---

import { Sandpack, AddInferenceToEditProduct, AddInferenceToCreateProduct, AddInferenceToShowProduct, AddInferenceToListProducts } from "./sandpack.tsx";

<Sandpack>

Освоившись с хуком `useNavigation`, теперь мы можем отрефакторить существующие компоненты с учетом инференса параметров.

При использования провайдера роутинга Refine инферит параметры из определения роута и прокидывает их в хуки и компоненты автоматически, что в большинстве случае избавляет нас от необходимости задавать `resource`, `id` или `action` вручную (но не запрещает).

## Рефакторинг компонента `ListProducts`

Обновим компонент `<ListProducts />`, исключив параметр `resource` из хука `useTable`:

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
    // removed-line
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
  });

  /* ... */
};
```

<AddInferenceToListProducts />

## Рефакторинг компонента `ShowProduct`

Для компонента `<ShowProduct />` рискнем убрать сразу два параметра: `resource` и `id`. Ранее мы задавали `id` хардкодом, теперь же позволим определить `id` автоматически, исходя из роута, и динамически подгрузить контент.

Мы также перейдем на хук [`useShow`](/docs/data/hooks/use-show), который является более продвинутой оберткой над `useOne` и в отличие от него поддерживает инференс, значит что передавать `resource` и `id` вручную более не требуется.

Обнови `src/pages/products/show.jsx`:

```jsx title="src/pages/products/show.jsx"
// highlight-next-line
import { useShow } from "@refinedev/core";

export const ShowProduct = () => {
  // removed-line
  const { data, isLoading } = useOne({ resource: "products", id: 123 });
  // added-line
  const { queryResult } = useShow();

  /* ... */
};
```

<AddInferenceToShowProduct />

## Рефакторинг компонента `EditProduct`

Обновим компонент `<EditProduct />`, удалив `resource`, `action` и `id` из хука `useForm`. Помимо инференса ресурса и идентификатора, как в примерах ранее, здесь также автоматически распознается параметр `action`, равный `edit`.

Обнови `src/pages/products/edit.jsx`:

```jsx title="src/pages/products/edit.jsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  // removed-line
  const { onFinish, mutationResult, queryResult } = useForm({
    // removed-line
    action: "edit",
    // removed-line
    resource: "products",
    // removed-line
    id: "123",
    // removed-line
  });
  // added-line
  const { onFinish, mutationResult, queryResult } = useForm();

  /* ... */
};
```

<AddInferenceToEditProduct />

## Рефакторинг компонента `CreateProduct`

Наконец, проделаем аналогичные операции с компонентом `<CreateProduct />`, удалив `resource` и `action` из хука `useForm`. Так как при определении ресурсов мы указали текущий роут как роут для создания новых записей, `create` также автоматически определяется как значение параметра `action`.

Обнови `src/pages/products/create.jsx`:

```jsx title="src/pages/products/create.jsx"
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  // removed-line
  const { onFinish, mutationResult } = useForm({
    // removed-line
    action: "create",
    // removed-line
    resource: "products",
    // removed-line
  });
  // added-line
  const { onFinish, mutationResult } = useForm();

  /* ... */
};
```

<AddInferenceToCreateProduct />

Теперь мы используем преимущества динамического инференса параметров для хуков!

</Sandpack>
