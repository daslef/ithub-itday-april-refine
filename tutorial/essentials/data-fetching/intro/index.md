---
title: Работа с данными
---

import { Sandpack, FocusOnDataProviderFile, AddDataProviderToRefine } from "./sandpack.tsx";

<Sandpack>

В этой секции мы изучим основы дата-фетчинга, иначе - работы с данными. В компонент `<Refine />` можно передать свойство `dataProvider`. Провайдер данных обслуживает все возможные операции получения и мутации данных. Refine предоставляет множество официальных интеграций с провайдерами данных, но для лучшего понимания мы реализуем собственный и подключим его к [fake REST API](https://api.fake-rest.refine.dev/).

## Создание провайдера данных

Во-первых, создадим файл `src/providers/data-provider.js`, который будет содержать в себе все необходимые методы работы с данными.

Ты можешь увидеть <FocusOnDataProviderFile>пустой провайдер данных `src/providers/data-provider.ts`</FocusOnDataProviderFile> на панели справа.

Далее, передадим наш провайдер данных в компонент `<Refine />` в файле `src/App.jsx`, конкретно - в свойство `dataProvider`.

```jsx
import { Refine, WelcomePage } from "@refinedev/core";

// highlight-next-line
import { dataProvider } from "./providers/data-provider";

export default function App() {
  return (
    // highlight-next-line
    <Refine dataProvider={dataProvider}>
      <WelcomePage />
    </Refine>
  );
}
```

<AddDataProviderToRefine />

</Sandpack>
