---
title: Объявление ресурсов
---

import { Sandpack, AddRoutesToApp, AddResourcesToApp } from "./sandpack.tsx";

<Sandpack>

Ключевая концепция в Refine - это ресурсы. В этой секции мы определим ресурсы и интегрируем их с роутером.

Подробнее о ресурсах можно узнать [из документации](/docs/guides-concepts/general-concepts/#resource-concept).

## Создание роутов

Ранее мы обернули наши роуты компонентом [`<Authenticated />`](/docs/authentication/components/authenticated). Теперь создаем роуты, относящиеся к продуктам и размещаем по ним наши компоненты:

- `/products` - `<ListProducts />`
- `/products/:id` - `<ShowProduct />`
- `/products/:id/edit` - `<EditProduct />`
- `/products/create` - `<CreateProduct />`

Также мы выставим корневой роут `/` и перенаправление к `/products` через компонент `<Navigate />`.

Обнови `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

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
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            {/* highlight-start */}
            <Route index element={<Navigate to="/products" />} />
            <Route path="/products">
              <Route index element={<ListProducts />} />
              <Route path=":id" element={<ShowProduct />} />
              <Route path=":id/edit" element={<EditProduct />} />
              <Route path="create" element={<CreateProduct />} />
            </Route>
            {/* highlight-end */}
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* highlight-start */}
                <Navigate to="/products" />
                {/* highlight-end */}
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddRoutesToApp />

## Объявление ресурсов

Объявив наши ресурсы и сопоставив роуты с соответствующими действиями, мы позволим Refine решать многие вопросы за нас:

- Автоматическое определение (инферинг) части параметров на основе роутов, вместо задания вручную.
- Реализация перенаправлений и переходов между роутами.
- Создание меню и хлебных крошек для ресурсов.
- Возможность задать метаданные для целого множества хуков разом и в одном месте.
- Упрощенное управление контролем доступа, интернационализацией и прочим.

Для объявления ресурсов используем свойство `resources` компонента `<Refine />`.

Объявление ресурса содержит следующие свойства:

- `name`: название ресурса, используется в методах провайдера данных и не только.
- `list`, `create`, `edit`, `show`: эти свойства используются для сопоставления роутов соответствующим действиям.
- `meta`: опциональный объект для передачи дополнительных метаданных для ресурса.

Обнови `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
        // highlight-start
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
        // highlight-end
      >
        <Routes>
          <Route
            element={
              <Authenticated key="authenticated-routes" redirectOnFail="/login">
                <Header />
                <Outlet />
              </Authenticated>
            }
          >
            <Route
              index
              // highlight-start
              // Мы заменили компонент <Navigate /> на <NavigateToResource />,
              // Преднастроенный для взаимодействия с ресурсами.
              element={<NavigateToResource resource="protected-products" />}
              // highlight-end
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
                {/* highlight-start */}
                {/* Мы заменили компонент <Navigate /> на <NavigateToResource /> */}
                {/* Преднастроенный для взаимодействия с ресурсами */}
                <NavigateToResource resource="protected-products" />
                {/* highlight-end */}
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
```

<AddResourcesToApp />

Теперь, определив роуты и ресурсы, мы готовы рефакторить наши компоненты для получения всех преимуществ, предоставляемых Refine.

</Sandpack>
