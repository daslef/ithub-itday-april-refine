---
title: Уведомления
---

import { Sandpack, AddNotificationProviderToApp } from "./sandpack.tsx";

<Sandpack>

В этом шаге мы интегрируем систему уведомлений Ant Design с аналогичной системой Refine для доставки уведомлений пользователям.

Refine отображает уведомления в различных сценариях, например при создании записи, обновлении или удалении, либо при возникновении ошибок в провайдерах. Важно, чтобы пользователь получал обратную связь при взаимодействии с приложением.

Все описанные уведомления начинают срабатывать как только `notificationProvider` передан в компонент `<Refine />`. Провайдер уведомлений отвечает за отображение уведомлений любого рода.

Ant Design предоставляет систему нотификаций, которую можно использовать в связке с Refine через хук `useNotificationProvider` из пакета `@refinedev/antd`.

## Провайдер уведомлений

Импортируем `useNotificationProvider` и передадим его в свойство `notificationProvider` компонента `<Refine />`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
// highlight-next-line
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
            // highlight-next-line
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
            ]}
          >
            <Routes>{/* ... */}</Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

<AddNotificationProviderToApp />

Попробуй создать, обновить, удалить запись, либо выполнить логаут и логин в приложении, чтобы увидеть уведомления в работе.

</Sandpack>
