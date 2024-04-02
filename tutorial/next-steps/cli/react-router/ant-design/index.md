---
title: CLI
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

Refine предлагает пакет `@refinedev/cli` с набором команд и встроенных утилит для помощи в разработке и управлении приложением:

- раннеры, который можно использовать для запуска сервера для разработки и предпросмотра, сборки приложения для продакшен-использования,
- `add` для создания новых ресурсов и провайдеров,
- `update` для определения и обновления версий пакетов связанных с Refine,
- `swizzle` для экспорта компонентов и провайдеров Refine для глубинной кастомизации.

## Установка

<InstallPackagesCommand args="@refinedev/cli" />

## Использование раннеров

Мы уже настроили скрипты `package.json` на их использование:

```json title="package.json"
{
  "scripts": {
    "dev": "refine dev",
    "build": "refine build",
    "start": "refine start",
    "refine": "refine"
  }
}
```

## Команда `add`

Команда `add` служит для создания новых ресурсов и провайдеров.

Например, для создания ресурса категорий можно использовать команду:

```sh
npm run refine add resource categories
```

Эта команда создаст файлы по соответствующему пути проекта, наполнит их компонентами Inferencer и добавит объявление ресурса в компонент `<Refine />`.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/add-resource.webm" playsInline loop autoPlay muted />

Командой `add provider` можно создавать новые провайдеры, а именно:

- Auth Provider для управления аутентификацией,
- Data Provider для работы с данными,
- Live Provider для риалтайм-обновлений,
- Access Control Provider для разграничения доступов,
- Audit Log Provider для ведения логов событий,
- i18n Provider для интернационализации и локализации.
- Notification Provider для уведомлений.

Например:

```sh
npm run refine add provider i18n
```

Эта команда сгенерирует необходимые файлы для настройки i18n и передаст провайдер в компонент `<Refine />`.

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/add-provider-i18n-2.webm" playsInline loop autoPlay muted />

## Команда `update`

Команда `update` используется для проверки и обновления пакетов, связанных с Refine:

```sh
npm run refine update
```

## Команда `swizzle`

Команда `swizzle` экспортирует выбранные компоненты и провайдеры Refine для кастомизации.

:::note

Использование `swizzle` открепляет компоненты от Refine, они более не будут получать обновления и становятся вашей личной ответственностью.

:::

```sh
npm run refine swizzle
```

<VideoInView src="https://refine.ams3.cdn.digitaloceanspaces.com/assets/tutorial/webm/cli-swizzle.webm" playsInline loop autoPlay muted />

</Sandpack>
