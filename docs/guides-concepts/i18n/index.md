---
title: Internationalization (i18n)
---

import I18nHeadless from './i18n-headless.tsx';
import TranslationFileEN from '../../partials/\_partial-translation-file-en.md';
import TranslationFileDE from '../../partials/\_partial-translation-file-de.md';

Интернационализация (i18n) - это процесс локализации программного обеспечения для различных регионов и языков.

<I18nHeadless />

## Установка и настройка

:::simple Good to know

- При создании приложения через [`create refine-app`][create-refine-app] на одном из шагов настройки можно подключить и поддержку i18n. Если приложение уже создано, добавить i18n можно через `@refinedev/cli`. Либо, ее можно настроить полностью вручную, согласно руководству ниже.
- За дополнительной информацией также можете обращаться к [документации react-i18next &#8594](https://react.i18next.com/getting-started)
  :::

Refine можно интегрировать с любым i18n-фреймворком, главное реализовать для него [`i18nProvider`](/docs/i18n/i18n-provider). Мы будем использовать `react-i18next`.

Первично установим пакеты `react-i18next`, `i18next` и их зависимости:

<InstallPackagesCommand args="react-i18next i18next i18next-http-backend"/>

Теперь создадим инстанс для `react-i18next`.

```js title="src/i18n.js"
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // https://react.i18next.com/latest/using-with-hooks
import Backend from "i18next-http-backend"; // For lazy loading for translations: https://github.com/i18next/i18next-http-backend

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // locale files path
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: ["en", "de"],
  });

export default i18n;
```

Теперь импортируем инстанс и обернем приложение в `React.Suspense`.

```jsx title="src/index.jsx"
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// highlight-next-line
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    // highlight-start
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
    // highlight-end
  </React.StrictMode>,
);
```

Теперь создадим и подключим провайдер локализации.

[`i18nProvider`](/docs/i18n/i18n-provider) является точкой входа для всех процессов локализации.

```jsx title="src/App.jsx"
// highlight-next-line
import type { I18nProvider } from "@refinedev/core";
import { Refine } from "@refinedev/core";
// highlight-next-line
import { useTranslation } from "react-i18next";

const App = () => {
  // highlight-start
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key, options) => t(key, options),
    changeLocale: (lang) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  // highlight-end

  return (
    <Refine
      // highlight-next-line
      i18nProvider={i18nProvider}
      /* ... */
    >
      {/* ... */}
    </Refine>
  );
};
```

Теперь нам доступны следующие хуки:

- [`useTranslate`][use-translate] для перевода
- [`useSetLocale`][use-setlocale] для изменения активной локали
- [`useGetLocale`][use-getlocale] для получения активной локали.

Теперь настроим мультиязычность через `react-i18next`.

### Файлы перевода

Все компоненты Refine поддерживают `i18n`, это значит что любую текстовую информацию, используемую во встроенных компонентах, можно переназначать:

<details>
<summary>The translation file</summary>

 <TranslationFileEN />

</details>

Добавим файлы перевода:

```
|-- public
|   |-- locales
|       |-- en
|       |   |-- common.json
|       |-- de
|           |-- common.json
|-- src
|-- package.json
|-- tsconfig.json
```

<Tabs
defaultValue="en"
values={[{ label: "English", value: "en" }, { label: "German", value: "de" }]}>
<TabItem value="en">

<details>
<summary>Show translation file</summary>

<TranslationFileEN />

</details>

</TabItem>
<TabItem value="de">

<details>
<summary>Show translation file</summary>

<TranslationFileDE />

</details>

</TabItem>
</Tabs>

## Перевод для кастомных компонентов

Если вы хотите использовать i18n для перевода собственных компонентов, можно использовать хук `useTranslate`, который работает через метод `translate` из [`i18nProvider`](/docs/i18n/i18n-provider/#usage).

```jsx
import { useTranslate } from "@refinedev/core";

export const MyComponent = () => {
  const translate = useTranslate();

  return <button>{translate("my.translate.text")}</button>;
};
```

[i18nnextjs]: /examples/i18n/i18n-nextjs.md
[react-i18next]: https://react.i18next.com/
[create-refine-app]: /docs/getting-started/quickstart.md
[use-translate]: /docs/i18n/hooks/use-translate
[use-getlocale]: /docs/i18n/hooks/use-get-locale
[use-setlocale]: /docs/i18n/hooks/use-set-locale
