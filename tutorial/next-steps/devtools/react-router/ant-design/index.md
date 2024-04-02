---
title: Devtools
---

import { Sandpack, SelectorButtonIcon } from "./sandpack.tsx";

<Sandpack>

:::note

Пакет `@refinedev/devtools` разработан для помощи при разработке и не используется в продакшен-окружении. В данный момент находится в бета-стадии.

:::

## Установка

Можно установить и настроить вручную либо с использованием пакета `@refinedev/cli`.

<Tabs>

<TabItem value="cli" label="Через CLI" default>

```sh
npm run refine devtools init
```

</TabItem>

<TabItem value="manual" label="Вручную">

<InstallPackagesCommand args="@refinedev/devtools" />

Далее нужно обернуть `<Refine />` компонентом `<DevtoolsProvider />`, а также импортировать `<DevtoolsPanel />` для быстрого доступа к инструментам.

```jsx title="src/App.jsx"
import { Refine } from "@refinedev/core";
// highlight-next-line
import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
/* ... */

export default function App() {
    return (
        {/* highlight-start */}
        <DevtoolsProvider>
        {/* highlight-end */}
            <Refine>
                {/* ... */}
            </Refine>
            {/* highlight-start */}

            <DevtoolsPanel />
            {/* highlight-end */}
            {/* ... */}
        {/* highlight-next-line */}
        </DevtoolsProvider>
    );
}
```

</TabItem>

</Tabs>

## Мониторинг

После установки и настройки появится небольшая панель внизу приложения, клик по ней откроет инструменты разработчика.

На вкладке `"Monitor"` представлены все запросы и мутации в рамках текущей сессии. Представлены детали об ответе, данных, провайдере, ресурсах и таймингах. Доступна фильтрация по типу, ресурсу, компоненту и хуку.

Доступен селектор для отслеживания событий по конкретным компонентам через <SelectorButtonIcon />.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/devtools-xray-3.webm" playsInline loop autoPlay muted />

</Sandpack>
