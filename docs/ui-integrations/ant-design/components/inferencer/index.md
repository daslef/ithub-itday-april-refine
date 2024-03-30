---
title: Inferencer
---

Вы можете сгенерировать вьюшки для описанных ресурсов через `@refinedev/inferencer`. Доступны компоненты `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer`, а также компонент `AntdInferencer`, объединяющий в себе все перечисленные.

## Использование

Компоненты инференсера могут быть импортированы из пакета `@refinedev/inferencer/antd`. Можно использовать их в роутах не передавая каких-либо настроек - `resource`, `action` и `id` будут определены автоматически.

<Tabs
defaultValue="resources"
values={[
{label: <>через<code style={{ margin: "0 0.7ch" }}>resources</code></>, value: 'resources'},
{label: 'в кастомных компонентах', value: 'custom'}
]}>
<TabItem value="resources">

```jsx
import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerProvider}
        resources={[
          {
            name: "samples",
            list: "/samples",
          },
        ]}
      >
        <Routes>
          {/* highlight-next-line */}
          <Route path="/samples" element={<AntdInferencer />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};
```

  </TabItem>
  <TabItem value="custom">

```jsx
// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const SampleList = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="list" />
  );
};

const SampleShow = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="show" id="1" />
  );
};

const SampleCreate = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="create" />
  );
};

const SampleEdit = () => {
  return (
    // highlight-next-line
    <AntdInferencer resource="samples" action="edit" id="1" />
  );
};
```

  </TabItem>
</Tabs>

## Вьюшки

### List

Генерирует вьюшку со списком содержимого ресурса, используя компоненты `List` и `Table`, а также хук `useTable` из `@refinedev/antd`.

```jsx live hideCode previewHeight=600px url=http://localhost:3000/samples
setInitialRoutes(["/samples"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
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
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              {/* highlight-next-line */}
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

### Show

Генерирует вьюшку для просмотра выбранной записи ресурса, использует компонент `Show` и поля из `@refinedev/antd`, а также хук `useShow` из `@refinedev/core`.

```jsx live hideCode previewHeight=600px url=http://localhost:3000/samples/show/123
setInitialRoutes(["/samples/show/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayoutV2 } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              show: "/samples/show/:id",
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
              <Route path="/samples/show/:id" element={<AntdInferencer />} />
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

### Create

Создает вьюшку для создания новых записей ресурса, использует компоненты `Create` и хук `useForm` из `@refinedev/antd`.

```jsx live hideCode previewHeight=600px url=http://localhost:3000/samples/create
setInitialRoutes(["/samples/create"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              create: "/samples/create",
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
              <Route path="/samples/create" element={<AntdInferencer />} />
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

### Edit

Создает вьюшку для редактирования записей ресурса, использует компонент `Edit` и хук `useForm` из `@refinedev/antd`.

```jsx live hideCode previewHeight=600px url=http://localhost:3000/samples/edit/123
setInitialRoutes(["/samples/edit/123"]);

// visible-block-start
import { Refine } from "@refinedev/core";
import { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// highlight-next-line
import { AntdInferencer } from "@refinedev/inferencer/antd";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: "samples",
              edit: "/samples/edit/:id",
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
              <Route path="/samples/edit/:id" element={<AntdInferencer />} />
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

## Пример

Ознакомьтесь с примером полноценного приложения с использованием компонентов `@refinedev/inferencer/antd`

<CodeSandboxExample path="inferencer-antd" />
