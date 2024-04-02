---
title: <ThemedLayout />
description: Компонент <ThemedLayoutV2>, определяющий верхнеуровневные структуру и макет приложения.
swizzle: true
source: packages/antd/src/components/themedLayoutV2/index.tsx
---

```tsx live shared
const authProvider = {
  login: async () => ({
    success: true,
    redirectTo: "/",
  }),
  logout: async () => ({
    success: true,
    redirectTo: "/login",
  }),
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => ({
    authenticated: true,
  }),
  getIdentity: async () => ({
    id: 1,
    name: "Jane Doe",
    avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
  }),
};
```

`<ThemedLayoutV2>` использует компоненты [`<Layout>`][antd-layout] и [`<Sider>`][antd-sider] из библиотеки Ant Design для задания макета и структуры веб-страницы. Включает в себя хедер, боковую панель, заголовок и футер, которые могут быть заменены или кастомизированы при необходимости.

С использованием `<ThemedLayoutV2>` разработчики могут достичь согласованного внешнего вида и пользовательского опыта для всех страниц приложения. К настраиваемым элементам `<ThemedLayoutV2>` относятся:

- [`<ThemedHeaderV2>`][themed-header]: расположен наверху страницы, может содержать имя пользователя и его аватар.
- [`<ThemedSiderV2>`][themed-sider]: расположен слева страницы, отображает меню навигации.
- [`<ThemedTitleV2>`][themed-title]: расположен наверху компонента [`<ThemedSiderV2>`][themed-sider], содержит лого и текст.
- `<Footer>`: расположен внизу страницы.
- `<OffLayoutArea>`: зона вне основного макета, расположение можно настроить.

## Использование

По умолчанию `<ThemedLayoutV2>` выглядит следующим образом:

```jsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

`<ThemedLayoutV2>` адаптивен по умолчанию: например, мобильная версия использует компонент [`<Drawer>`][antd-drawer], десктопная - [`<Sider>`][antd-sider].

Пример использования с [React Router v6](https://github.com/refinedev/refine/blob/master/examples/auth-antd/src/App.tsx#L186)

## Пропсы

### Sider

При использовании `<ThemedLayoutV2>` за боковую панель по умолчанию отвечает компонент [`<ThemedSiderV2>`][themed-sider]. Меню на боковой панели генерируется автоматически на основе ресурсов, определенных в компоненте [`<Refine>`][refine-component], и хука `useMenu`. Однако при необходимости компонент [`<ThemedSiderV2>`][themed-sider] можно заменить на кастомный, передав его в проп `Sider`.

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

import { CustomSider } from "./CustomSider";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Sider={() => <CustomSider />}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

Еще один способ кастомизировать компонент [`<ThemedSiderV2>`][themed-sider] - использовать пропсы `render` и `Title`:

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

import { CustomTitle } from "./CustomTitle";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Sider={() => (
          <ThemedSiderV2
            Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
            render={({ items, logout, collapsed }) => {
              return (
                <>
                  <div>My Custom Element</div>
                  {items}
                  {logout}
                </>
              );
            }}
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

Из более простых модификаций - можно зафиксировать боковую панель через проп `fixed`:

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Sider={() => <ThemedSiderV2 fixed />}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

#### Пропсы компонента Sider

| Prop                 | Type                                          | Description                                                                 |
| -------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| [`Title`](#title)    | `React.FC`                                    | Компонент для отрисовки в верхней части                                     |
| `render`             | [`SiderRenderFunction`](#siderrenderfunction) | Функция для отрисовки меню и иных элементов внутри `<ThemedSiderV2>`        |
| `meta`               | `Record<string,any>`                          | Мета-данные для расчета адресов ссылок для пунктов меню                     |
| `fixed`              | `boolean`                                     | Зафиксирована ли боковая панель                                             |
| `activeItemDisabled` | `boolean`                                     | Должен ли щелчек по элементам боковой панели вызывать перезагрузку страницы |

```tsx
type SiderRenderFunction = (props: {
  items: JSX.Element[];
  logout: React.ReactNode;
  dashboard: React.ReactNode;
  collapsed: boolean;
}) => React.ReactNode;
```

### initialSiderCollapsed

Этот проп используется для задания изначального состояния боковой панели
[`<ThemedSiderV2>`][themed-sider].

- `true`: [`<ThemedSiderV2>`][themed-sider] изначально будет свернут.
- `false`: [`<ThemedSiderV2>`][themed-sider] изначально будет открыт.

```jsx
<ThemedLayoutV2
  // highlight-next-line
  initialSiderCollapsed={true}
>
  {/* ... */}
</ThemedLayoutV2>
```

### Header

В `<ThemedLayoutV2>` блок хедера по умолчанию отрисовывается компонентом [`<ThemedHeaderV2>`][themed-header]. Он использует хук [`useGetIdentity`](/docs/authentication/hooks/use-get-identity) для получения имени пользователя и его аватара в правой части хедера. Компонент [`<ThemedHeaderV2>`][themed-header] может быть заменен на иной, если передать его в проп `Header`.

Пример использования кастомного хедера вместо компонента [`<ThemedHeaderV2>`][themed-header]:

```tsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";

// highlight-next-line
import { CustomHeader } from "./CustomHeader";

const App: React.FC = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Header={() => <CustomHeader />}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

You can also make it sticky using the `sticky` property:

```jsx
import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  // highlight-next-line
  ThemedHeaderV2,
} from "@refinedev/antd";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Header={() => <ThemedHeaderV2 sticky />}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### Title

В `<ThemedLayoutV2>` секция заголовка по умолчанию рендерится с использованием компонента [`<ThemedTitleV2>`][themed-title]. Однако, при желании, можно заменить [`<ThemedTitleV2>`][themed-title] на иной компонент, передав его в проп `Title`.

```jsx
import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

// highlight-next-line
import { MyLargeIcon, MySmallIcon } from "./MyIcon";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        Title={({ collapsed }) => (
          <ThemedTitleV2
            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
            collapsed={collapsed}
            icon={collapsed ? <MySmallIcon /> : <MyLargeIcon />}
            text="My Project"
          />
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### Footer

Refine не предлагает готовых компонентов для футера, но при желании вы можете передать кастомный компонент в проп `Footer`.

```jsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Layout } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2
                  Footer={() => (
                    <Layout.Footer
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#7dbcea",
                      }}
                    >
                      My Custom Footer
                    </Layout.Footer>
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="samples">
                <Route index element={<AntdInferencer />} />
              </Route>
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Layout } from "antd";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-next-line
        Footer={() => (
          <Layout.Footer
            style={{
              textAlign: "center",
              color: "#fff",
              backgroundColor: "#7dbcea",
            }}
          >
            My Custom Footer
          </Layout.Footer>
        )}
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

### OffLayoutArea

Используется для отрисовки компонентов за пределами основного макета. Компоненты, переданные в этот проп, можно расположить в любом месте страницы, в том числе используя нестандартное позиционирование.

```jsx live previewHeight=600px hideCode url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import { ConfigProvider, Button } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                // highlight-next-line
                <ThemedLayoutV2
                  OffLayoutArea={() => (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => alert("Off layout are clicked")}
                      style={{
                        position: "fixed",
                        left: "8px",
                        bottom: "8px",
                        zIndex: 1000,
                      }}
                    >
                      Send us Feedback 👋
                    </Button>
                  )}
                >
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { Button } from "antd";

const App = () => {
  return (
    <Refine
    // ...
    >
      <ThemedLayoutV2
        // highlight-start
        OffLayoutArea={() => (
          <Button
            type="primary"
            size="small"
            onClick={() => alert("Off layout are clicked")}
            style={{
              position: "fixed",
              left: "8px",
              bottom: "8px",
              zIndex: 1000,
            }}
          >
            Send us Feedback 👋
          </Button>
        )}
        // highlight-end
      >
        {/* ... */}
      </ThemedLayoutV2>
    </Refine>
  );
};
```

## Кастомизация через swizzle

> 🚨 Для этого шага рекомендуем использовать `@refine/cli`.

Исходный код компонента `<ThemedLayoutV2>` может быть извлечен с помощью команды `swizzle`. Будет создана копия компонента, доступная для любых модификаций.

```bash
> npm run refine swizzle

? Which package do you want to swizzle? (Use arrow keys or type to search)

Data Provider
 ◯ @refinedev/simple-rest
UI Framework
 ◉ @refinedev/antd
```

Сначала выберите пакет, который хотите извлечь - в нашем случае это `@refinedev/antd`.

```bash
? Which component do you want to swizzle?

 ◯ TagField
 ◯ TextField
 ◯ UrlField
Other
 ◯ Breadcrumb
❯◉ ThemedLayoutV2
Pages
 ◯ ErrorPage
 ◯ AuthPage
(Move up and down to reveal more choices)
```

Далее выберите конкретный компонент, в этом примере - `ThemedLayoutV2`.

```bash
Successfully swizzled Themed Layout
Files created:
 - src/components/themedLayout/sider.tsx
 - src/components/themedLayout/header.tsx
 - src/components/themedLayout/title.tsx
 - src/components/themedLayout/index.tsx

Warning:
If you want to change the default layout;
You should pass layout related components to the <ThemedLayoutV2/> component's props.

    ╭ App.tsx ───────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                │
    │   import { ThemedLayoutV2 } from "components/themedLayout";                                    │
    │   import { ThemedHeaderV2 } from "components/themedLayout/header";                             │
    │   import { ThemedSiderV2 } from "components/themedLayout/sider";                               │
    │   import { ThemedTitleV2 } from "components/themedLayout/title";                               │
    │                                                                                                │
    │   const App = () => {                                                                          │
    │       return (                                                                                 │
    │           <Refine                                                                              │
    │               /* ... */                                                                        │
    │           >                                                                                    │
    │               <ThemedLayoutV2                                                                  │
    │                    Header={ThemedHeaderV2}                                                     │
    │                    Sider={ThemedSiderV2}                                                       │
    │                    Title={ThemedTitleV2}                                                       │
    │                />                                                                              │
    │                   /* ... */                                                                    │
    │               </ThemedLayoutV2>                                                                │
    │           </Refine>                                                                            │
    │       );                                                                                       │
    │   }                                                                                            │
    │                                                                                                │
    ╰────────────────────────────────────────────────────────────────────────────────────────────────╯
```

В итоге будет создана новая директория `src/components/layout` с извлеченными компонентами.

Далее их можно изменять и использовать по вашему усмотрению.

```jsx
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2 } from "components/themedLayout";
import { ThemedHeaderV2 } from "components/themedLayout/header";
import { ThemedSiderV2 } from "components/themedLayout/sider";
import { ThemedTitleV2 } from "components/themedLayout/title";

const App = () => {
  return (
    <Refine
    /* ... */
    >
      <ThemedLayoutV2
        Header={ThemedHeaderV2}
        Sider={ThemedSiderV2}
        Title={ThemedTitleV2}
      >
        /* ... */
      </ThemedLayoutV2>
    </Refine>
  );
};
```

## Управление состоянием компонента `Sider` через хук `useThemedLayoutContext`

The `useThemedLayoutContext` hook is that is used to collapse/uncollapse the `Sider` component. You can do this anywhere you want using the `useThemedLayoutContext` hook. Below you can see an example put on the dashboard page.

```tsx live previewHeight=300px hideCode url=http://localhost:3000/
setInitialRoutes(["/"]);

// visible-block-start

import { Refine } from "@refinedev/core";
// highlight-next-line
import {
  ThemedLayoutV2,
  RefineThemes,
  useThemedLayoutContext,
} from "@refinedev/antd";
import { ConfigProvider, Button, Space } from "antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import dataProvider from "@refinedev/simple-rest";

import { authProvider } from "./authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

// highlight-start
const DashboardPage = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext();

  return (
    <Space style={{ paddingTop: 30 }}>
      <Button
        type="primary"
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
      >
        toggle mobile sider
      </Button>
      <Button type="primary" onClick={() => setSiderCollapsed(!siderCollapsed)}>
        toggle collapse of sider
      </Button>
    </Space>
  );
};
// highlight-end

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          resources={[
            // highlight-start
            {
              name: "dashboard",
              list: "/",
            },
            // highlight-end
            {
              name: "samples",
              list: "/samples",
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              {/* highlight-next-line */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/samples" element={<AntdInferencer />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};

// visible-block-end

render(<App />);
```

[themed-sider]: https://github.com/refinedev/refine/blob/master/packages/antd/src/components/themedLayoutV2/sider/index.tsx
[themed-header]: https://github.com/refinedev/refine/blob/master/packages/antd/src/components/themedLayoutV2/header/index.tsx
[themed-title]: https://github.com/refinedev/refine/blob/master/packages/antd/src/components/themedLayoutV2/title/index.tsx
[refine-component]: /docs/core/refine-component
[antd-drawer]: https://ant.design/components/drawer
[antd-sider]: https://ant.design/components/layout#layoutsider
[antd-layout]: https://ant.design/components/layout
