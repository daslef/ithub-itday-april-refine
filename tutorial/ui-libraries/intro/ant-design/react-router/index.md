---
title: Введение
---

import { Sandpack, AddAntDesignToApp, AddLayoutToApp } from "./sandpack.tsx";

<Sandpack>

Пришло время навести красоту и погрузиться в интеграцию приложения с Ant Design.

Refine предоставляет интеграционные решения для популярных UI-библиотек, таких как Ant Design, Material UI, Chakra UI и Mantine, предлагая набор компонентов и хуков.

В этой секции мы будем:

- Использовать layout-компоненты для меню, заголовков, хлебных крошек и управления аутентификацией,
- Использовать CRUD-компоненты,
- Использовать хуки для интеграции форм и таблиц,
- Интегрировать уведомления Refine с системой нотификаций Ant Design,
- Использовать компоненты `<AuthPage />` для аутентификационных страниц.

## Установка зависимостей для Ant Design

Для использования компонентов Ant Design в связке с Refine нужно установить пакеты `antd` и `@refinedev/antd`.

<InstallPackagesCommand args="antd @refinedev/antd"/>

Чтобы использовать темы оформления, нам нужно обернуть приложение компонентами `ConfigProvider` и `App`. Также, мы импортируем файл `reset.css` для сброса стандартных стилей браузера.

Обнови `src/App.jsx` следующим образом:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-start
import { ConfigProvider, App as AntdApp } from "antd";
// highlight-end

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

// highlight-start
import "antd/dist/reset.css";
// highlight-end

export default function App() {
  return (
    <BrowserRouter>
      {/* highlight-start */}
      <ConfigProvider>
        <AntdApp>
          {/* highlight-end */}
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <Header />
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
          {/* highlight-start */}
        </AntdApp>
      </ConfigProvider>
      {/* highlight-end */}
    </BrowserRouter>
  );
}
```

<AddAntDesignToApp />

## Добавление Layout-компонента

Refine предоставляет компонент [`<ThemedLayoutV2 />`](/docs/ui-integrations/ant-design/components/themed-layout).

Обнови `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// highlight-next-line
import { ThemedLayoutV2 } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

import "antd/dist/reset.css";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    {/* highlight-start */}
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                    {/* highlight-end */}
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="protected-products" />}
                />
                <Route path="/products">
                  <Route index element={<ListProducts />} />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />
                  <Route path="create" element={<CreateProduct />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="protected-products" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddLayoutToApp />

Теперь наше приложение обернуто в layout с боковой панелью и хедером. В следующем шаге мы познакомимся с остальными его преимуществами поближе.

</Sandpack>
