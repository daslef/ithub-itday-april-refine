---
title: Логин & Логаут
---

import { Sandpack, AddLoginMethodToAuthProvider, CreateLoginComponentFile, AddLoginToAppTsx, AddUseLoginToLoginComponent, AddLogoutMethodToAuthProvider, CreateHeaderComponentFile, AddHeaderToAppTsx, AddUseLogoutToHeaderComponent } from "./sandpack.tsx";

<Sandpack>

В прошлой секции мы добавили компонент `<Authenticated />` в `src/App.tsx` для ограничения доступа для неавторизованных пользователей. Следующая задача - реализовать методы `login` и `logout` в ауз-провайдере.

## Реализация метода `login`

Метод `login` отвечает за аутентификацию пользователя и сопутствующие операции вроде сохранения токенов. Он должен возаращать `Promise`, разрешающийся в объект со статусом операции в поле `success`.

Наш фейковый REST API ожидает от нас `POST` запрос к эндпоинту `/auth/login` с параметрами `email` и `password` в теле запроса, и вернет нам `token` в теле ответа. Мы сохраним `token` в `localStorage` для дальнейшего использования.

Обнови `src/providers/auth-provider.js` следующим образом:

```js title="src/providers/auth-provider.js"
export const authProvider = {
  // highlight-start
  // метод login принимает на вход объект со всеми значениями, требуемыми в хуке useLogin.
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
      return { success: true };
    }

    return { success: false };
  },
  // highlight-end
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
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

<AddLoginMethodToAuthProvider />

## Использование хука `useLogin`

Создадим компонент `Login` в `./pages/login.jsx`.

<CreateLoginComponentFile />

Импортируем его в `src/App.jsx` и передадим в качестве значения для свойства `fallback` компонента `<Authenticated />`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

// highlight-next-line
import { Login } from "./pages/login";

export default function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated
        key="protected"
        // highlight-next-line
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
```

<AddLoginToAppTsx />

Наконец, применим `useLogin`:

```jsx title="src/pages/login.jsx"
import React from "react";
// highlight-next-line
import { useLogin } from "@refinedev/core";

export const Login = () => {
  // highlight-next-line
  const { mutate, isLoading } = useLogin();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    // highlight-next-line
    mutate(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue="demo@demo.com"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue="demodemo"
        />

        {isLoading && <span>loading...</span>}
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </div>
  );
};
```

<AddUseLoginToLoginComponent />

## Имплементация метода `logout`

Метод `logout` служит для реализации выхода из приложения и сопутствующих операций, таких как удаление токена. Он должен возвращать `Promise`, разрешающийся в объект с полем `success` со статусом действия.

Наш фейковый REST API не требует отправки каких-либо запросов, так что требуется лишь удалить `token` из `localStorage`.

Обнови `src/providers/auth-provider.js`:

```js title="src/providers/auth-provider.js"
export const authProvider = {
  // highlight-start
  logout: async () => {
    localStorage.removeItem("my_access_token");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },
  // highlight-end

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
      return { success: true };
    }

    return { success: false };
  },
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  onError: async (error) => {
    throw new Error("Not implemented");
  },
  // ...
};
```

<AddLogoutMethodToAuthProvider />

## Использование хука `useLogout`

Теперь создадим компонент `Header` в `./components/header.jsx` и разместим в нем кнопку логаута.

<CreateHeaderComponentFile />

Импортируй `<Header />` в `src/App.tsx` и передай его в `<Authenticated />` в качестве дочернего:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
// highlight-next-line
import { Header } from "./components/header";

export default function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        {/* highlight-next-line */}
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
```

<AddHeaderToAppTsx />

Импортируем `useLogout` и используем в компоненте `Header`:

```jsx title="src/components/header.jsx"
import React from "react";
// highlight-next-line
import { useLogout } from "@refinedev/core";

export const Header = () => {
  // highlight-next-line
  const { mutate, isLoading } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
      <button
        type="button"
        disabled={isLoading}
        // highlight-next-line
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};
```

<AddUseLogoutToHeaderComponent />

Теперь вход и выход из системы реализованы. Заметим, что после логина компонент `<Authenticated />` отрисовывает защищенный контент, а после логаута - ориентируется на свойство `fallback`. Refine отслеживает статус аутентификации за нас.

</Sandpack>
