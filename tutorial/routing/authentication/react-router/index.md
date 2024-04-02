---
title: Аутентификация
---

import { Sandpack, AddAuthenticationToApp } from "./sandpack.tsx";

<Sandpack>

## Роутинг и `<Authenticated />`

Ранее мы реализовали систему аутентификации и ограничили доступ к нашим ресурсам через компонент `<Authenticated />` и его свойства `children` и `fallback`. Теперь расширим логику уровней доступа для множественных роутов.

Компонент `<Authenticated />` бесшовно работает с провайдером роутинга, стоит лишь использовать вместо свойства `fallback` свойство `redirectOnFail`. В нашем случае, будем перенаправлять пользователя на страницу логина.

```jsx
import { Authenticated } from "@refinedev/core";

const MyRoute = () => {
  // Если пользователь не аутентифицировался, он будет перенаправлен на роут `/login`
  return (
    <Authenticated key="my-routes" redirectOnFail="/login">
      <div>Authenticated</div>
    </Authenticated>
  );
};
```

## Оборачивание роутов в `<Authenticated />`

Теперь добавим в `src/App.jsx` роут-обертку, которая возьмет на себя проверку аутентификации и будет либо отображать компонент `<ListProducts />`, либо перенаправлять пользователя на `/login`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";

// highlight-start
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
// highlight-end

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App() {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        {/* highlight-start */}
        <Routes>
          <Route
            element={
              // Мы оборачиваем наши роуты компонентом `<Authenticated />`
              // Свойство `fallback` более не используем, вместо этого перенаправляем на /login
              // Если же пользователь аутентифицирован, мы отображаем знакомый нам компонент `<Header />` и специальный компонент `<Outlet />`, который выполняет роль "окна" для отрисовки внутренних роутов.
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route index element={<ListProducts />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* Мы перенаправляем пользователя на `/` в случае, если он уже аутентифицирован, но пытается перейти к роуту `/login` повторно */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        {/* highlight-end */}
      </Refine>
    </BrowserRouter>
  );
}
```

<AddAuthenticationToApp />

</Sandpack>
