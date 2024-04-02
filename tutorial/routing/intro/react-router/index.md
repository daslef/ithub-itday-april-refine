---
title: Введение
---

import { Sandpack, AddRouterProviderToApp } from "./sandpack.tsx";

<Sandpack>

В этой секции мы добавим к нашему приложению провайдер роутинга!

Refine предоставляет интеграции для наиболее популярных решений, таких как [React Router](/docs/routing/integrations/react-router), [Next.js](/docs/routing//integrations/next-js) и [Remix](/docs/routing/integrations/remix).

:::simple Implementation Tips

Пусть Refine и предоставляет возможность реализации провайдера роутинга с нуля, мы рекомендуем использовать одну из готовых интеграций.

:::

В этой секции мы обсудим:

- Концепцию _ресурсов_,
- Использование роутера для автоматического определения параметров, таких как `resource`, `action` или `id` из URL,
- Навигация и редиректы,
- Использование роутера для хранения состояний форм и таблиц в URL,
- Интеграция с провайдером аутентификации и провайдеров данных.

## Провайдер роутинга

Начнем с установки зависимостей `react-router-dom` и `@refinedev/react-router-v6`.

<InstallPackagesCommand args="react-router-dom @refinedev/react-router-v6"/>

Настроим провайдер на уровне компонента `<Refine />` в `src/App.tsx`:

```jsx title="src/App.jsx"
import { Refine, Authenticated } from "@refinedev/core";
// highlight-next-line
import routerProvider from "@refinedev/react-router-v6";

// highlight-next-line
import { BrowserRouter } from "react-router-dom";

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
    // highlight-next-line
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        // highlight-next-line
        routerProvider={routerProvider}
      >
        <Authenticated key="protected" fallback={<Login />}>
          <Header />
          {/* <ShowProduct /> */}
          {/* <EditProduct /> */}
          <ListProducts />
          {/* <CreateProduct /> */}
        </Authenticated>
      </Refine>
      {/* highlight-next-line */}
    </BrowserRouter>
  );
}
```

<AddRouterProviderToApp />

</Sandpack>
