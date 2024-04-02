---
title: Создание первого приложения
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

Создание нового приложения на Refine требует всего пары шагов. В целях обучения мы не будем использовать `create-refine-app` в полной мере его возможностей, вместо этого создадим приложение, установим зависимости и произведем настройку вручную. А уже далее, в рабочих проектах, с пониманием процессов, происходящих за кадром, мы рекомендуем попробовать познакомиться с `create-refine-app` и `@refinedev/cli` поближе.

Создадим проект на основе шаблона `vite/react-swc`.

```sh
npm create vite@latest my-refine-app -- --template react-swc
```

Установим Refine и его зависимости:

- `@refinedev/core` предоставляет основную функциональность Refine,
- [`@refinedev/cli`](/docs/packages/cli) опционален, однако при умелом использовании ускоряет многие процессы при разработке.

```sh
npm install @refinedev/core @refinedev/cli
```

### Настройка скриптов

Заменим скрипты в `package.json` следующим образом:

```json
{
  "scripts": {
    "dev": "refine dev",
    "build": "refine build",
    "serve": "refine serve"
  }
}
```

### Настройка приложения

Замаунтим компонент `<Refine />` в корень нашего приложения:

```jsx title="src/App.jsx"
import { Refine, WelcomePage } from "@refinedev/core";

function App() {
  return (
    <Refine>
      <WelcomePage />
    </Refine>
  );
}

export default App;
```

Компонент `<Refine />` является родительским компонентом Refine, который обеспечивает все дочерние компоненты контекстом и логикой.

Компонент `<WelcomePage />` - тестовая страница приветствия, в некотором роде аналог `hello world`.

Теперь можем запустить приложение:

```sh
npm run dev
```

Открой браузер и обратись по локальному адресу, посвеченному в консоли, и если приветственная страница отобразилась, переходи к следующему шагу.

</Sandpack>
