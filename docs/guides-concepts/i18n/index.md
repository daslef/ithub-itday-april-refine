---
title: Internationalization (i18n)
---

import I18nHeadless from './i18n-headless.tsx';
import TranslationFileEN from '../../partials/\_partial-translation-file-en.md';
import TranslationFileDE from '../../partials/\_partial-translation-file-de.md';

Интернационализация (i18n) - это процесс локализации программного обеспечения для различных регионов и языков. Refine можно интегрировать с любым i18n-фреймворком, главное реализовать для него [`i18nProvider`](/docs/i18n/i18n-provider).

## i18n Provider

[`i18nProvider`](/docs/i18n/i18n-provider) centralizes localization process in Refine applications. With flexible interface you can use any i18n library you want.

Here is the basic example `i18nProvider` with [react-i18next](https://react.i18next.com/). We will explain the details in the following sections.

<I18nHeadless />

## Example

:::simple Good to know

- We will use the [Ant Design](https://ant.design/) UI library in this example. You can use any UI library you want.
- We recommend using [`create refine-app`][create-refine-app] to initialize your Refine projects as it configures the project according to your needs, i18n support included if you choose it in the CLI
- For more information, refer to the [react-i18next documentation&#8594](https://react.i18next.com/getting-started)
- This example is for SPA react apps, for Next.js refer to [i18n Next.js example&#8594][i18nnextjs]

:::

First of all, Refine expects the `i18nProvider` type as follows:

```ts
import { I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
  translate: (key: string, options?: any, defaultMessage?: string) => string,
  changeLocale: (lang: string, options?: any) => Promise,
  getLocale: () => string,
};
```

After creating a `i18nProvider`, you can pass it to the `<Refine />` component:

```tsx title="src/App.tsx"
import { Refine } from "@refinedev/core";

import i18nProvider from "./i18nProvider";

const App: React.FC = () => {
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

This will allow us to put translation features to the followings hooks:

- [`useTranslate`][use-translate] shows translation between different languages.
- [`useSetLocale`][use-setlocale] changes locale at runtime.
- [`useGetLocale`][use-getlocale] getting current locale.

Let's add multi-language support to our application using the `react-i18next` framework. When we are done, our application will support both German and English.

### Installation

To install both `react-i18next` and `i18next` packages, run the following command within your project directory:

<InstallPackagesCommand args="react-i18next i18next i18next-http-backend i18next-browser-languagedetector"/>

### Creating the i18n Instance

First, we will create an i18n instance using `react-i18next`.

```ts title="src/i18n.ts"
import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // https://react.i18next.com/latest/using-with-hooks
import Backend from "i18next-http-backend"; // For lazy loading for translations: https://github.com/i18next/i18next-http-backend
import detector from "i18next-browser-languagedetector"; // For auto detecting the user language: https://github.com/i18next/i18next-browser-languageDetector

i18n
  .use(Backend)
  .use(detector)
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

### Wrapping the app with React.Suspense

Then we will import the i18n instance we created and wrap the application with `React.Suspense`.

```tsx title="src/index.tsx"
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

### Creating the i18n Provider

Next, we will include the i18n instance and create the `i18nProvider` using `react-i18next`.

```tsx title="src/App.tsx"
// highlight-next-line
import type { I18nProvider } from "@refinedev/core";
import { Refine } from "@refinedev/core";
// highlight-next-line
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  // highlight-start
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any) => t(key, options),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
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

After we pass the `i18nProvider` to the `<Refine>` component, all three translation hooks ([`useTranslate`][use-translate], [`useSetLocale`][use-setlocale], [`useGetLocale`][use-getlocale]) will be ready for use.

### Adding the Translations Files

All of Refine's components supports `i18n`, meaning that if you want to change their text, you can create your own translation files to override Refine's default texts.

Here is the list of all translation keys that you can override:

<details>
<summary>The translation file</summary>

 <TranslationFileEN />

</details>

Now, let's add the language files:

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

</details>

## Перевод для кастомных компонентов

If you need to translate the texts in your own components, Refine provides the `useTranslate` hook, It returns the translate method from [`i18nProvider`](/docs/i18n/i18n-provider/#usage) under the hood.

```tsx
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
