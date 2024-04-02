---
title: Перенаправления
---

import { Sandpack, AddRedirectsToAuthProvider, AddCustomRedirectToCreate, AddCustomRedirectToEdit } from "./sandpack.tsx";

<Sandpack>

Научимся использовать редиректы в связке с формами и провайдером аутентификации.

## Редирект после отправки формы

По умолчанию, после успешной отправки формы Refine перенаправит пользователя к странице со списком записей ресурса, но это можно настроить, задав значение параметру `redirect` хука `useForm`.

:::tip

Можно также установить редирект по умолчанию, который будет применяться ко всем формам, через свойство `options.redirect` компонента `<Refine />`.

:::

### Показать запись после обновления

Настроим компонент `<EditProduct />` на редирект к странице отображения записи после успешной отправки формы редактирования.
Обнови `src/pages/products/edit.jsx`:

```jsx title="src/pages/products/edit.jsx"
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    // highlight-start
    // По умолчанию перенаправление происходит на `"list"`.
    // Мы перенастроили на перенаправление к странице ``"show"`.
    // А передав значение `false` редирект можно отключить.
    redirect: "show",
    // highlight-end
  });

  /* ... */
};
```

<AddCustomRedirectToEdit />

### Редактирование записи после создания

Передав в `<CreateProduct />` `redirect` равный `"edit"`, мы дадим возможность внести изменения в только что созданный продукт.

Обнови `src/pages/products/create.jsx`:

```jsx title="src/pages/products/create.jsx"
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    // highlight-start
    redirect: "edit",
    // highlight-end
  });

  /* ... */
};
```

<AddCustomRedirectToCreate />

## Редиректы провайдера аутентификации

Используя `redirectTo` в методах `login`, `logout` и `onError`, можно перенаправить пользователя на желаемую страницу.

Обновим `src/providers/auth-provider.js` и зададим `redirectTo` на главную страницу после успешного логина и на логин после успешного логаута.

```jsx title="src/providers/auth-provider.js"
export const authProvider = {
  logout: async () => {
    localStorage.removeItem("my_access_token");

    // highlight-start
    return { success: true, redirectTo: "/login" };
    // highlight-end
  },
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      // highlight-start
      return { success: true, redirectTo: "/" };
      // highlight-end
    }

    return { success: false };
  },
  /* ... */
};
```

<AddRedirectsToAuthProvider />

</Sandpack>
