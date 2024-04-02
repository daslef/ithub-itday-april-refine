---
title: Синхронизация состояния
---

import { Sandpack, AddLocationSyncToListProducts } from "./sandpack.tsx";

<Sandpack>

В качестве заключительного шага секции мы научимся синхронизировать состояние таблиц с URL-адресом. Это даст возможность поделиться состоянием таблиц (выставленные фильтры, сортировки, состояние пагинации и т.п.) с другими пользователями, передав ссылку.

Хук `useTable` содержит для этих целей опцию `syncWithLocation`. При любом изменении состояния таблицы URL будет обновлен.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
import { useTable, useMany, useNavigation } from "@refinedev/core";

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // highlight-next-line
    syncWithLocation: true,
  });

  /* ... */
};
```

<AddLocationSyncToListProducts />

Перейди на страницу `/products`, поменяй фильтры, сортировку или пагинацию, и отследи изменения в URL.

## Итоги

В этой секции мы научились:

- Использовать роутеры и хуки навигации,
- Объявлять ресурсы,
- Автоматически определять параметры для хуков на основе URL,
- Работать с перенаправлениями,
- Синхронизировать состояние таблиц с URL.

</Sandpack>
