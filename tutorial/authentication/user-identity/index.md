---
title: Информация о пользователе
---

import { Sandpack, AddGetIdentityMethodToAuthProvider, AddUseGetIdentityToHeaderComponent } from "./sandpack.tsx";

<Sandpack>

К этому моменту мы добавили функциональность логина и логаута, защитили наше приложение от анонимного доступа, и теперь познакомимся с хуком `useGetIdentity`, предварительно реализовав метод `getIdentity` в ауз-провайдере.

По ходу дела мы также разработаем простой компонент `UserGreeting` для отображения приветствия для пользователя.

## Имплементация метода `getIdentity`

Метод `getIdentity` используется для получения информации о пользователе от нашего API. Он должен возвращать `Promise`, разрешаемый в объект, содержащий информацию о пользователе.

Наш фейковый REST API ожидает от нас запрос типа `GET` к эндпоинту `/auth/me` с полем `token` в хедере `Authorization`, и тогда он вернет нам информацию о пользователе в теле ответа.

Обнови `src/providers/auth-provider.js`:

```js title="src/providers/auth-provider.js"
export const authProvider = {
  // highlight-start
  getIdentity: async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
      headers: {
        Authorization: localStorage.getItem("my_access_token"),
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  // highlight-end
  logout: async () => {
    /* ... */
  },
  login: async ({ email, password }) => {
    /* ... */
  },
  check: async () => {
    /* ... */
  },
  onError: async (error) => {
    /* ... */
  },
  // ...
};
```

<AddGetIdentityMethodToAuthProvider />

## Использование хука `useGetIdentity`

Теперь мы можем использовать хук `useGetIdentity` в компоненте `<Header />` для отображения приветствия.

Обнови `src/components/header.jsx`, добавив следующее:

```jsx title="src/components/header.jsx"
import React from "react";
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isLoading} onClick={mutate}>
        Logout
      </button>
    </>
  );
};
```

<AddUseGetIdentityToHeaderComponent />

Теперь при логине мы должны видеть приветственное сообщение с именем пользователя.

:::simple Note

В целях демонстрации наш фейковый REST API возвращает ответ "John Doe" независимо от отправленного токена

:::

Базовый флоу аутентификации настроен, в следующей секции мы наладим его интеграцию с провайдером данных.

</Sandpack>
