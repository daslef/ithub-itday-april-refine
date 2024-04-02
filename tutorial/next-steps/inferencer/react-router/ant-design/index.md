---
title: Inferencer
---

import { Sandpack, CreateListCategoriesTsx, AddListCategoriesToApp, AddInferencerToListCategories } from "./sandpack.tsx";

<Sandpack>

Пакет [`@refinedev/inferencer`](/docs/packages/inferencer) может быть использован для быстрой генерации кода страниц ресурсов на основе запросов к API.

Сгенерированный код не будет идеален, его не стоит использовать в продакшен-средах, и рано или поздно его придется кастомизировать, но для первого шага некоторые могут счесть его полезным.

## Установка

Начнем с установки пакета `@refinedev/inferencer`. Этот пакет может работать в связке с рядом интегрированных UI-библиотек, но для этого убедитесь, что должные зависимости также установлены (например, для Ant Design это `@refinedev/antd` и `antd`).

- [Ant Design](/docs/ui-integrations/ant-design/components/inferencer)

<InstallPackagesCommand args="@refinedev/inferencer @refinedev/antd antd" />

## Использование

Для использования с Ant Design нужно импортировать `AntdInferencer` из `@refinedev/inferencer/antd`.

```jsx
import { AntdInferencer } from "@refinedev/inferencer/antd";

export const MyPage = () => {
  return <AntdInferencer resource="products" action="list" />;
};
```

В примере выше мы используем `AntdInferencer` чтобы сгенерировать страницу списка записей ресурса `products`, на это указывает `action="list"`. Помимо списка, можно подать значения `show`, `edit` и `create`.

После маунта компонента Inferencer ты увидишь превью результата и его исходный код, который можно скопировать и модифицировать под собственные нужды.

Теперь аналогично сгенерируем страницы для ресурса категорий, связанного с ресурсом продуктов. Начнем с созданий нового файла `src/pages/categories/list.jsx`.

<CreateListCategoriesTsx />

Теперь определим роут `/categories` на рендер компонента `ListCategories`.

Обнови `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

// highlight-next-line
import { ListCategories } from "./pages/categories/list";

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
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "protected-products",
                list: "/products",
                show: "/products/:id",
                edit: "/products/:id/edit",
                create: "/products/create",
                meta: { label: "Products" },
              },
              // highlight-start
              {
                name: "categories",
                list: "/categories",
                meta: { label: "Categories" },
              },
              // highlight-end
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Awesome Project" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
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
                {/* highlight-start */}
                <Route path="/categories">
                  <Route index element={<ListCategories />} />
                </Route>
                {/* highlight-end */}
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

<AddListCategoriesToApp />

Теперь добавим Inferencer к компоненту `ListCategories` в `src/pages/categories/list.jsx`:

```jsx title="src/pages/categories/list.jsx"
import { AntdInferencer } from "@refinedev/inferencer/antd";

export const ListCategories = () => {
  return <AntdInferencer />;
};
```

<AddInferencerToListCategories />

Заметь, что мы не пердали свойства `resource` и `action` в компонент `AntdInferencer`, так как они будут автоматически определены исходя из роута.

Перейди к `/categories` и убедись, что страница списка категорий сгенерирована, скопируй исходный код и попробуй внести модификации.

</Sandpack>
