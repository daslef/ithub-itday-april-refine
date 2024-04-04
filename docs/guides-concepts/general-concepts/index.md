---
title: Ключевые концепции
---

Refine - расширяемый фреймворк, разработанный для быстрого создания веб-приложений. Он предлагает современную, **hook-based архитектуру**, a **pluggable-систему провайдеров** и решение для **стейт-менеджмента**.

## Концепция Headless

Вместо того, чтобы привязывать себя к набору преднастроенных компонентов, **Refine** предоставляет коллекцию вспомогательных `хуков`, `компонентов`, `провайдеров` и иных инструментов. Так как бизнес-логика и UI полностью отделены, можно модифицировать UI без ограничений.

Из этого следует, что **Refine** работает _бесшовно_ с любым _кастомным UI-решением_ или _UI фреймворками_. Можно использовать любые популярные CSS фреймворки, например [TailwindCSS](https://tailwindcss.com/), или создать свои таблицы стилей с нуля.

Refine также предоставляет интеграции с [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), и [Chakra UI](https://chakra-ui.com/) для быстрого старта.

## Концепция Ресурсов

Центральной концепцией в Refine является **ресурс**.

Обычно ресурс соотносится с сущностью базы данных, например, `products`, `blogPosts`, или `orders`.

Объявление ресурса позволяет управлять приложением более структурно, абстрагируя сложные операции в простые действия через **провайдеры** и **UI-интеграции**.

Типовое объявление ресурса может выглядеть так:

```jsx title=App.jsx
import { Refine } from "@refinedev/core";

export const App = () => {
  return (
    <Refine
      resources={[
        {
          name: "products",
          list: "/my-products",
          show: "/my-products/:id",
          edit: "/my-products/:id/edit",
          create: "/my-products/new",
        },
      ]}
    >
      {/* ... */}
    </Refine>
  );
};
```

## Концепция Провайдера

Провайдеры - строительные блоки Refine, используемые для управления различными аспектами приложения, такими как работа с данными, роутинг, контроль доступа и др.

Они реализованы как плагины, что дает возможность как использовать **встроенные провайдеры**, так и **создавать собственные**.

- **Data Provider**: Провайдер данных, обеспечивает коммуникацию с бэкендом в процессах получения данных, создания / удаления / обновления записей, кэширования и инвалидации.
- **Authentication Provider**: Управляет процессами аутентификации и авторизации, перенаправлениями и обработкой ошибок.
- **Access Control Provider**: Обеспечивает авторизацию и контроль доступа, используется для ограничения доступа к роутам и компонентам, скрытия или отключения интерактивных элементов.
- **Notification Provider**: Управляет отображением уведомлений.
- **I18n Provider**: Предоставляет функциональность i18n, к коей относят локализацию и интернационализацию, форматирование ряда типов данных.
- **Live Provider**: Управляет обновлениями в реальном времени через системы подписок и веб-хуков без перезагрузки страницы.
- **Router Provider**: Сопоставляет ресурсам роуты, обеспечивает навигацию, автоматические перенаправления после CRUD-операций, отрисовку меню навигации.

## Концепция Хуков

Хуки - современный паттерн, используемый в разработке на React, положительно влияющий на DX и производительность приложений.

Хуки в Refine предоставляют **унифицированный интерфейс** для любых библиотек или фреймворков, выбранных для конкретного проекта.

К примеру, есть четыре встроенных провайдера роутинга для **React Router v6**, **Next.js**, **Remix**, **Expo**, и ко всем из них в равной степени подходит хук `useGo` из пакета `@refinedev/core`, который может быть использован для перехода к страницам ресурсов приложения.

Аналогичная ситуация с остальными хуками - для работы с данными, аутентификации, контроля доступа, нотификаций, i18n и других.

## Провайдеры

### Data Provider <GuideBadge id="guides-concepts/data-fetching" />

Провайдер данных - мостик между фронтендом и источником данных на бэкенде. Он отвечает за все относящиеся к данным операции.

Каждая операция над данными обычно ассоциирована с конкретным ресурсом. Так, получая данные для ресурса `products`, провайдер данных узнает, к какой конечной точке обратиться и как обработать ответ.

```jsx title=data-provider.ts
const myDataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(
      `https://example.com/api/v1/${resource}/${id}`,
    );
    const data = await response.json();

    return { data };
  },
  // other methods...
};
```

> Refine предлагает ряд встроенных провайдеров данных для популярных источников данных, таких как REST, Strapi, AirTable, Supabase, GraphQL и других.

#### Хуки

Вы можете использовать хуки `useList`, `useOne`, `useCreate`, `useEdit`, `useShow` для получения и отправки данных в приложении.

```jsx title=show.jsx
import { useOne } from "@refinedev/core";

export const MyPage = () => {
  const { data, isLoading } = useOne({ resource: "products", id: 1 });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{data.name}</>;
};
```

### Authentication Provider <GuideBadge id="guides-concepts/authentication" />

Провайдер аутентификации находится в центре процессов аутентификации и авторизации, таких как логин, логаут, перенаправления или обработка ошибок.

```jsx title=auth-provider.js
export const authProvider = {
  login: async ({ email, password }) => {
    const { status } = handleLogin(email, password);

    if (status === 200) {
      return { success: true, redirectTo: "/dashboard" };
    } else {
      return {
        success: false,
        error: { name: "Login Error", message: "Invalid credentials" },
      };
    }
  },
  check: async (params) => ({}),
  logout: async (params) => ({}),
  onError: async (params) => ({}),
  register: async (params) => ({}),
  forgotPassword: async (params) => ({}),
  updatePassword: async (params) => ({}),
  getPermissions: async (params) => ({}),
  getIdentity: async (params) => ({}),
};
```

#### Компоненты

Вы можете использовать компонент `Authenticated` из `@refinedev/core` для защиты роутов и компонентов.

```jsx title=my-page.jsx
import { Authenticated } from "@refinedev/core";

const MyPage = () => (
  <Authenticated>
    // Only authenticated users can see this.
    <MyComponent />
  </Authenticated>
);
```

#### Хуки

Вы можете использовать хук `useGetIdentity` для получения текущего пользователя.

```jsx title=show.jsx
import { useGetIdentity } from "@refinedev/core";

export const DashboardPage = () => {
  const {
    data: { name },
  } = useGetIdentity();

  return <>Welcome {name}!</>;
};
```

#### UI

В Refine есть преднастроенные компоненты, которые работают в связке с Auth Provider, автоматически отрисовывая информацию о пользователе в хедере и кнопку логаута на боковой панели.

Для страниц логина, регистрации, восстановления и обновления пароля можно использовать компонент `AuthPage`.

Примеры использования [Auth Pages](#auth-pages) представлены ниже.

### Access Control Provider <GuideBadge id="guides-concepts/authorization" />

Провайдер контроля доступа следит за тем, к каким страницам, ресурсам, операциям или компонентам тот или иной пользователь может иметь доступ, основываясь на их правах.

Он использует информацию из объявлений ресурсов и, например, может принять решение, разрешается ли пользователю удалять или редактировать записи ресурса `products`.

```jsx title=App.jsx
import { Refine } from "@refinedev/core";

const myAccessControlProvider = {
  can: async ({ resource, action }) => {
    if (resource === "users" && action === "block") {
      return { can: false };
    }

    return { can: true };
  },
};

export const App = () => {
  return (
    <Refine accessControlProvider={myAccessControlProvider}>{/* ... */}</Refine>
  );
};
```

#### Компоненты

Компонент `CanAccess` может быть использован для оборачивания частей приложения, над которыми требуется установить контроль доступа.

```jsx title=my-page.jsx
import { CanAccess } from "@refinedev/core";

export const MyPage = () => {
  return (
    <CanAccess resource="users" action="show" params={{ id: 1 }}>
      <>
        My Page
        <CanAccess
          resource="users"
          action="block"
          params={{ id: 1 }}
          fallback={"You are not authorized."}
        >
          // Only authorized users can see this button.
          <BlockUserButton />
        </CanAccess>
      </>
    </CanAccess>
  );
};
```

#### Хуки

Для контроля доступа к компонентам также может использоваться хук `useCan`.

```jsx title=my-page.jsx
import { ErrorComponent, useCan } from "@refinedev/core";

export const MyPage = () => {
  const { data: show } = useCan({
    resource: "users",
    action: "show",
    params: { id: 1 },
  });
  const { data: block } = useCan({
    resource: "users",
    action: "block",
    params: { id: 1 },
  });

  if (!show?.can) {
    return <ErrorComponent />;
  }

  return (
    <>
      My Page
      {block?.can && <BlockUserButton />}
      {!block?.can && "You are not authorized."}
    </>
  );
};
```

#### UI

Встроенные интеграции работают с Access Control Provider бесшовно.

Например, если пользователь не авторизован для доступа к ресурса `orders`, он будет исключен из меню навигации автоматически.

Или, если пользователь не авторизован на удаление продукта, кнопка удаления будет неактивной или скрытой автоматически.

```jsx title=my-page.jsx
import { DeleteButton } from "@refinedev/antd";

export const MyPage = () => {
  return (
    <>
      My Page
      {/* Only authorized users can see this button. */}
      <DeleteButton resource="users" recordItemId={1} />
    </>
  );
};
```

Это относится и к кнопкам `CreateButton`, `EditButton`, `ShowButton`, `ListButton`.

### Notification Provider <GuideBadge id="guides-concepts/notifications" />

Refine может автоматически показывать уведомления о статусе CRUD-операций и ошибках. Например, после создания, удаления или обновления записи ресурса `products`, или при ошибке отправки формы.

Refine интегрирован с провайдерами уведомлений популярных UI-библиотек **Ant Design**, **Material UI**, **Chakra UI** и **Mantine**.

#### Хуки

**Хуки данных**, **хуки мутаций** и **хуки аутентификации** могут автоматически показывать уведомления о действиях и ошибках. Эти уведомления можно модифицировать.

```jsx title=my-page.jsx
import { useDelete } from "@refinedev/core";

export const MyPage = () => {
  const { mutate } = useDelete();

  return (
    <Button
      onClick={() => {
        mutate({
          resource: "products",
          id: 1,
          successNotification: () => ({
            message: "Product Deleted",
            description: "Product has been deleted successfully.",
            type: "success",
          }),
          errorNotification: () => ({
            message: "Product Delete Error",
            description: "An error occurred while deleting the product.",
            type: "error",
          }),
        });
      }}
    >
      Delete Product
    </Button>
  );
};
```

Если ваше событие не обрабатывается провайдером уведомлений автоматически, можно использовать хук `useNotification` для ручной настройки.

```jsx title=my-page.jsx
import { useNotification } from "@refinedev/core";

export const MyPage = () => {
  const { open, close } = useNotification();

  return (
    <>
      <Button
        onClick={() => {
          open?.({
            key: "my-notification",
            message: "Test Notification",
            description: "This is a test notification.",
            type: "success", // success | error | progress
          });
        }}
      >
        Show notification
      </Button>
      <Button
        onClick={() => {
          close?.("my-notification");
        }}
      >
        Close Notification
      </Button>
    </>
  );
};
```

### I18n Provider <GuideBadge id="guides-concepts/i18n" />

Провайдер I18n ответственен за локализацию приложения.

```tsx title=App.tsx
import { Refine, I18nProvider } from "@refinedev/core";

const i18nProvider: I18nProvider = {
    translate: (key: string, options?: any, defaultMessage?: string) => string,
    changeLocale: (lang: string, options?: any) => Promise,
    getLocale: () => string,
};

export const App = () => {
  return (
    <Refine i18nProvider={i18nProvider} {/* ...*/}>
      {/* ... */}
    </Refine>
  )
}
```

#### Хуки

Для настройки i18n в компонентах можно использовать хуки `useTranslate`, `useSetLocale`, `useGetLocale`.

```jsx title=my-page.jsx
import { useTranslate, useSetLocale, useGetLocale } from "@refinedev/core";

export const MyPage = () => {
  const translate = useTranslate();
  const setLocale = useSetLocale();
  const getLocale = useGetLocale();

  return (
    <>
      Current Locale: {getLocale()}
      <Button onClick={() => setLocale("en")}>Set Locale to English</Button>
      <Button onClick={() => setLocale("de")}>Set Locale to German</Button>

      <Button>{translate("Hello")</Button>
    </>
  );
};

```

#### UI

UI-библиотеки работают с провайдером I18n бесшовно. Например, элементы меню, текст кнопок, названия таблиц и прочее переводятся автоматически.

### Router Provider <GuideBadge id="guides-concepts/routing" />

Провайдер роутинга связывает ресурсы с соответствующими им путями. Делает возможным использование таких решений как хлебные крошки, автоматические перенаправления после операций, отрисовка меню, автоматическое распознавание параметров для хуков, и многое другое.

Встроенные интеграции реализованы для следующих решений:

- React Router v6
- Next.js
- Remix
- Expo Router (React Native)

#### Компоненты

Компоненты UI могут распознавать информацию о ресурсах исходя из URL.

Например, находясь на странице списка продуктов с компонентом `List` и кнопкой `CreateButton` для перенаправления на страницу создания нового продукта, мы можем делегировать распознавание информации о ресурсе **провайдеру роутинга**.

```jsx title=products.jsx
import { List, CreateButton } from "@refinedev/antd";

export const ProductsListPage = () => {
  return (
    // Вместо <List resource="products">
    <List>
      {/* Вместо <CreateButton resource="products" /> */}
      <CreateButton /> // Перенаправление к /products/new
    </List>
  );
};
```

#### Хуки

Хуки могут распознавать параметры **resource**, **id**, **action** исходя из текущего URL. Это снимает необходимость передавать их вручную.

Например, хук `useShow` может определить параметры `resource` и `id` по URL.

```jsx title=show.jsx
import { useShow } from "@refinedev/core";

export const ShowPage = () => {
  // const { queryResult } = useShow({ resource: "products", id: 1 });
  // Мы можем не передавать "resource" и "id" вручную!
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{data?.data.name}</>;
};
```

Другой пример - хук `useTable` hook. Он не только способен автоматически определять параметры **resource**, **pagination**, **filters** и **sorters**, но и наоборот, обновлять URL исходя из них.

## UI-интеграции <GuideBadge id="guides-concepts/ui-libraries" />

Refine предлагает интеграции для популярных UI-библиотек:

- [Ant Design](/docs/ui-integrations/ant-design/introduction)
- Material UI
- Chakra UI
- Mantine

Все они являются мостиком между базовым функционалом `@refinedev/core` и UI-библиотекой.

<Tabs wrapContent={false}>

<TabItem value="Ant Design">

import { AntdLayout } from './layout/antd';

<AntdLayout />

</TabItem>

</Tabs>

### Формы <GuideBadge id="guides-concepts/forms" />

Refine предлагает набор хуков для работы с состоянием формы, валидацией, отправкой, автосохранением и многим другим.

### Таблицы <GuideBadge id="guides-concepts/tables" />

Аналогично бесшовно интегрированы и компоненты таблиц, со всеми сопуствующими возможностями, такими как пагинация, сортировка, фильтрация, редактируемые поля или ленивая загрузка.

### Layout-компоненты

UI-интеграции предоставляют компонент Layout, включающий в себя **боковое меню**, **хедер** и **зону контента** приложения.

Боковое меню отрисовывается автоматически на основе **определений ресурсов**, а хедер - на основе **текущего пользователя**.

### CRUD-страницы

Компоненты `List`, `Create`, `Edit`, `Show` представляют собой обертки над основным содержимым страницы и могут содержать:

- Хедер с заголовком
- Хлебные крошки
- Кнопки

### Кнопки

Например, в пакете интеграции с Ant Design присутствует `CreateButton`, перенаправляющая пользователя на страницу создания новой записи.

Помимо визуального оформления от Ant Desing, Refine добавляет к ней возможности **роутинга**, **контроля доступа** и **локализации / перевода**.

### Auth Pages

Типовые страницы аутентификации как `Login`, `Register`, `Forgot Password`, `Reset Password` уже интегрированы с `AuthProvider`.

<Tabs wrapContent={false}>

<TabItem value="Ant Design">

import { AntdAuth } from "./auth-pages/antd";

<AntdAuth />

</TabItem>

</Tabs>

### Хуки UI-интеграций

Хуки UI-интеграций базируются на хуках `@refinedev/core`, преднастраивая их для использования с компонентами выбранной UI-библиотеки.

Например, хук `useTable` из пакета `@refinedev/antd` использует хук `useTable` из `@refinedev/core`, но возвращает набор свойств, совместимый с компонентом Ant Design `Table`.

## Стейт-менеджмент

Refine использует **React Query** для работы с данными и кеширования, что позитивно влияет на производительность и пользовательский опыт. React Query синхронизирует состояние между сервером и UI, облегчает работу с фоновыми обновлениями, кеш-менеджментом и инвалидацией данных.
