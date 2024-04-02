---
title: Ограничение доступа
---

import { Sandpack, CreateAuthProviderFile, AddAuthProviderToAppTsx, AddCheckMethodToAuthProvider, AddAuthenticatedComponentToAppTsx } from "./sandpack.tsx";

<Sandpack>

В этой секции мы реализуем `authProvider` с методом `check` для для валидации статуса аутентификации пользователя, что позволит защитить некоторые блоки приложения от анонимных посетителей.

Refine поддерживает интеграцию с любым решением для аутентификации. В целях обучения мы реализуем свой адаптер для использования с фейковым REST API.

## Создание провайдера аутентификации

Создай файл `src/providers/auth-provider.js`, в котором мы последовательно реализуем все необходимые методы.

<CreateAuthProviderFile />

Далее, передай провайдер в компонент `<Refine />` в `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
// highlight-next-line
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine
      dataProvider={dataProvider}
      // highlight-next-line
      authProvider={authProvider}
    >
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
```

<AddAuthProviderToAppTsx />

## Имплементация метода `check`

Метод `check` используется хуком `useIsAuthenticated` и компонентом `<Authenticated />` для проверки статуса аутентификации, и должен отдавать `Promise`, разрешающийся в объект.

Если пользователь аутентифицирован, этот объект должен содержать пару `authenticated: true`, иначе - `authenticated: false`.

Если мы получаем токен доступа через метод `login` и сохраняем его в локальном хранилище, то в методе `check` мы можем просто проверить его наличие.

Обнови `src/providers/auth-provider.js`:

```js title="src/providers/auth-provider.js"
export const authProvider = {
  // highlight-start
  check: async () => {
    // При логине мы получим ключ доступа от нашего фейкового  API и сохраним его в локальном хранилище. А в этом методе мы проверяем его наличие.
    // Методы `login` и `logout` мы реализуем в последующих секциях.
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  // highlight-end
  login: async ({ email, password }) => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
  onError: async (error) => {
    throw new Error("Not implemented");
  },
  // ...
};
```

<AddCheckMethodToAuthProvider />

## Использование компонента `<Authenticated />`

Теперь, когда мы реализовали метод `check`, мы способны ограничить права доступа ко всему контенту или его части через компонент `<Authenticated />`.

Импортируем `<Authenticated />` в `src/App.jsx` и обернем им весь контент:

```jsx title="src/App.jsx"
// highlight-next-line
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      {/* highlight-start */}
      <Authenticated key="protected" fallback={<div>Not authenticated</div>}>
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
      {/* highlight-end */}
    </Refine>
  );
}
```

<AddAuthenticatedComponentToAppTsx />

:::note

Обрати внимание, что мы добавили свойство `key` к компоненту `<Authenticated />`. Это необходимо, чтобы компонент работал корректно даже при условии множественного использования в разных частях дерева отрисовки.

:::

Мы должны увидеть, что `<Authenticated />` работает, так как вместо контента теперь отрисовывается `fallback`.

:::tip

В некоторых случаях вместо компонента `<Authenticated />` удобнее использовать хук `useIsAuthenticated`, лежащий в его основе. Больше информации можно найти в документации по [useIsAuthenticated](/docs/authentication/hooks/use-is-authenticated/).

:::

</Sandpack>
