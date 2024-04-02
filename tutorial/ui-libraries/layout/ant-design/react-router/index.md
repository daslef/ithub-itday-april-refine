---
title: Layout-компоненты
---

import { Sandpack, AddCustomTitleToLayout } from "./sandpack.tsx";

<Sandpack>

Refine предоставляет компоненты [`<ThemedLayoutV2 />`](/docs/ui-integrations/ant-design/components/themed-layout) для всех UI-интеграций.

`<ThemedLayoutV2 />` состоит из хедера с информацией о пользователе (если настроен `authProvider`), боковой панели с ссылками навигации на основе объявленных ресурсов и кнопкой логаута (если настроен `authProvider`), и зоны основного контента.

:::tip

Заметим, что мы удалили предыдущую реализацию компонента `<Header />`, так как теперь этот функционал будет обеспечен `<ThemedLayoutV2 />`.

:::

## Кастомизация названия

Layout-компоненты это композиция меньших компонентов, которые могут быть настроены через соответствующие свойства. Компонент `<ThemedLayoutV2 />` состоит из следующих компонентов:

- `<ThemedHeaderV2 />` для хедера, может быть настроен через свойство `Header`.
- `<ThemedSiderV2 />` для боковой панели, может быть настроен через свойство `Sider`.
- `<ThemedTitleV2 />` для лого и названия приложения, может быть настроен через свойство `Title`.
- Есть также свойства `Footer` и `OffLayoutArea`, через которые можно настроить футер и зону вне макета, которые не имеют компонентов по умолчанию.

Предлагаем изменить название приложения используя свойство `Title` компонента `<ThemedLayoutV2 />` и компонент `<ThemedTitleV2 />`.

Обнови `src/App.jsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// highlight-next-line
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

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
                    <ThemedLayoutV2
                      // highlight-start
                      Title={(props) => (
                        <ThemedTitleV2 {...props} text="Awesome Project" />
                      )}
                      // highlight-end
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                {/* ... */}
              </Route>
              {/* ... */}
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddCustomTitleToLayout />

Теперь наше приложение обернуто в кастомизированный layout с боковой панелью и областью основного контента.

:::tip

Заметим, что ресурс `protected-products` отображается на боковой панели под именем `"Products"`. Всё потому, что мы передали кастомное именование в `meta.label` при объявлении ресурса.

:::

</Sandpack>
