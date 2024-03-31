---
title: Introduction
---

Refine предоставляет интеграцию для фреймворка [Ant Design](https://ant.design/). Этот пакет предоставляет набор готовых к использованию компонентов и хуков для использования компонентов Ant Design в связке с функционалом Refine.

import Example from "./previews/example.jsx";

<Example />

## Установка

<InstallPackagesCommand args="@refinedev/antd antd"/>

## Использование

import UsageReactRouterDom from "./previews/usage-react-router-dom.jsx";

<UsageReactRouterDom />

## Таблицы

Refine обеспечивает бесшовную интеграцию с компонентом [`<Table />`](https://ant.design/components/table), в том числе пагинацию, сортировку и фильтрацию, через хук [`useTable`](/docs/ui-integrations/ant-design/hooks/use-table) из пакета `@refinedev/antd`. Этот хук является надстройкой над базовым хуком [`useTable`](/docs/data/hooks/use-table) из пакета `@refinedev/core`.

```jsx title="pages/products/list.jsx"
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  // highlight-next-line
  const { tableProps } = useTable();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
    </Table>
  );
};
```

## Формы

Refine обеспечивает бесшовную интеграцию с компонентом [`<Form />`](https://ant.design/components/form) через хук [`useForm`](/docs/ui-integrations/ant-design/hooks/use-form) из пакета `@refinedev/antd`. Этот хук является адаптированной версией базового хука [`useForm`](/docs/data/hooks/use-form/) из пакета `@refinedev/core`.

```jsx title="pages/products/create.jsx"
import { useForm, SaveButton } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const ProductCreate = () => {
    // highlight-next-line
    const { formProps, saveButtonProps } = useForm();

    return (
        <Form {...formProps} layout="vertical">
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <SaveButton {...saveButtonProps}>
        </Form>
    )
}

```

Также, `@refinedev/antd` предоставляет хуки для реализации иных типов форм, такие как [`useDrawerForm`](/docs/ui-integrations/ant-design/hooks/use-drawer-form), [`useModalForm`](/docs/ui-integrations/ant-design/hooks/use-modal-form) и [`useStepsForm`](/docs/ui-integrations/ant-design/hooks/use-steps-form). А для работы с отношениями можно использовать хуки [`useSelect`](/docs/ui-integrations/ant-design/hooks/use-select), [`useCheckboxGroup`](/docs/ui-integrations/ant-design/hooks/use-checkbox-group) и [`useRadioGroup`](/docs/ui-integrations/ant-design/hooks/use-radio-group), которые в свою очередь основаны на хуке [`useSelect`](/docs/data/hooks/use-select) из пакета `@refinedev/core`.

## Нотификации

У Ant Design есть собственная [система уведомлений](https://ant.design/components/notification), основанная на ее UI-элементах. Refine настроен на работу с ней и отображение уведомлений о происходящих событиях и действиях. Эта интеграция обеспечена хуком `useNotificationProvider` из пакета `@refinedev/antd`, который можно подать напрямую в качестве пропа [`notificationProvider`](/docs/core/refine-component#notificationprovider) верхнеуровневого компонента `<Refine />`.

```jsx title="app.jsx"
import { Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { App as AntdApp } from "antd";

const App = () => {
  return (
    <ConfigProvider theme={RefineThemes.Green}>
      <AntdApp>
        <Refine notificationProvider={useNotificationProvider}>
          {/* ... */}
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
};
```

:::tip
Оборачивание компонентом [`<AntdApp />`](https://ant.design/components/app) требуется для того, чтобы визуальная тема, настроенная для Ant Design, применилась ко всем компонентам, включая нотификации.
:::

## Преднастроенные компоненты

Refine предоставляет компоненты, собранные на основе элементом Ant Design, которые можно использовать для верхнеуровневого макетирования приложения.

import LayoutReactRouterDom from "./previews/layout-react-router-dom.jsx";

<LayoutReactRouterDom />

Так, компонент [`<ThemedLayoutV2 />`](/docs/ui-integrations/ant-design/components/themed-layout) состоит из хедера, боковой панели и блока контента. Боковая панель содержит навигацию на основе объявленных ресурсов и, если настроен провайдер аутентификации, кнопку логаута. Хедер содержит лого приложения, название приложения и, опционально, информацию о пользователе.

Также, Refine предоставляет компонент [`<Breadcrumb />`](/docs/ui-integrations/ant-design/components/breadcrumb).

### Кнопки

Интеграция предлагает набор кнопок, построенных на базе компонента [`<Button />`](https://ant.design/components/button), которые реализуют такую логику как:

- Проверка авторизации
- Диалоги подтверждения операции
- Состояние загрузки
- Инвалидация
- Навигация
- Работа с формами
- Импорт/Экспорт, и др.

Вы можете использовать [`<EditButton />`](/docs/ui-integrations/ant-design/components/buttons/edit-button), [`<ListButton />`](/docs/ui-integrations/ant-design/components/buttons/list-button) и другие кнопки для перехода к соответствующим экранам, или [`<DeleteButton />`](/docs/ui-integrations/ant-design/components/buttons/delete-button) и [`<SaveButton />`](/docs/ui-integrations/ant-design/components/buttons/save-button) для соответствующих действий, не заботясь о проверках авторизации и иной внутренней логике.

Пример использования `<EditButton />`:

```jsx title="pages/products/list.jsx"
import { useTable, EditButton } from "@refinedev/antd";
import { Table } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable();

  return (
    // highlight-next-line
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title="ID" />
      <Table.Column dataIndex="name" title="Name" />
      <Table.Column dataIndex="price" title="Price" />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record) => (
          // highlight-start
          <EditButton hideText size="small" recordItemId={record.id} />
          // highlight-end
        )}
      />
    </Table>
  );
};
```

Список полезных кнопок:

- [`<CreateButton />`](/docs/ui-integrations/ant-design/components/buttons/create-button)
- [`<EditButton />`](/docs/ui-integrations/ant-design/components/buttons/edit-button)
- [`<ListButton />`](/docs/ui-integrations/ant-design/components/buttons/list-button)
- [`<ShowButton />`](/docs/ui-integrations/ant-design/components/buttons/show-button)
- [`<DeleteButton />`](/docs/ui-integrations/ant-design/components/buttons/delete-button)
- [`<SaveButton />`](/docs/ui-integrations/ant-design/components/buttons/save-button)
- [`<RefreshButton />`](/docs/ui-integrations/ant-design/components/buttons/refresh-button)

### Вьюшки

Вьюшки (Views) - заготовленные обёртки над контентом страниц приложения. Они бывают разных типов и могут содержать заголовки, хлебные крошки, кнопки и проверки доступа, в зависимости от конкретной задачи.

- [`<List />`](/docs/ui-integrations/ant-design/components/basic-views/list)
- [`<Show />`](/docs/ui-integrations/ant-design/components/basic-views/show)
- [`<Edit />`](/docs/ui-integrations/ant-design/components/basic-views/edit)
- [`<Create />`](/docs/ui-integrations/ant-design/components/basic-views/create)

import BasicViews from "./previews/basic-views.jsx";

<BasicViews />

### Поля

Интеграция содержит набор компонентов для отрисовки полей форм:

- [`<BooleanField />`](/docs/ui-integrations/ant-design/components/fields/boolean-field)
- [`<DateField />`](/docs/ui-integrations/ant-design/components/fields/date-field)
- [`<EmailField />`](/docs/ui-integrations/ant-design/components/fields/email-field)
- [`<FileField />`](/docs/ui-integrations/ant-design/components/fields/file-field)
- [`<ImageField />`](/docs/ui-integrations/ant-design/components/fields/image-field)
- [`<MarkdownField />`](/docs/ui-integrations/ant-design/components/fields/markdown-field)
- [`<NumberField />`](/docs/ui-integrations/ant-design/components/fields/number-field)
- [`<TagField />`](/docs/ui-integrations/ant-design/components/fields/tag-field)
- [`<TextField />`](/docs/ui-integrations/ant-design/components/fields/text-field)
- [`<UrlField />`](/docs/ui-integrations/ant-design/components/fields/url-field)

```jsx title="pages/products/show.jsx"
import { useShow } from "@refinedev/core";
import { Show, TextField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Typography.Title level={5}>Id</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.id} />

      <Typography.Title level={5}>Title</Typography.Title>
      {/* highlight-next-line */}
      <TextField value={record?.title} />

      <Typography.Title level={5}>Price</Typography.Title>
      {/* highlight-next-line */}
      <NumberField
        value={record?.price}
        options={{ style: "currency", currency: "USD" }}
      />
    </Show>
  );
};
```

### Страницы аутентификации

Для типовых задач логина, регистрации и восстановления пароля также можно использовать готовые компоненты:

- `<AuthPage type="login" />`
- `<AuthPage type="register" />`
- `<AuthPage type="forgot-password" />`
- `<AuthPage type="reset-password" />`

Пример использования [`<AuthPage />`](/docs/ui-integrations/ant-design/components/auth-page):

import AuthPage from "./previews/auth-page.jsx";

<AuthPage />

### 404

Для отрисовки страницы 404 можно использовать компонент `<ErrorComponent />`.

```jsx title="pages/404.jsx"
import { ErrorComponent } from "@refinedev/antd";

const NotFoundPage = () => {
  return <ErrorComponent />;
};
```

## Визуальная тема

Refine предлагает набор заготовленных визуальных тем для Ant Design с поддержкой. Их можно импортировать из объекта `RefineThemes` пакета `@refinedev/antd` и передать в компонет [`<ConfigProvider />`](https://ant.design/components/config-provider).

import Theming from "./previews/theming.jsx";

<Theming />

Для кастомизации визуала обратитесь к
[официальной документации Ant Design](https://ant.design/docs/react/customize-theme).

## Inferencer

Вы можете автоматически сгенерировать вьюшки для своих ресурсов используя компоненты `AntdListInferencer`, `AntdShowInferencer`, `AntdEditInferencer`, `AntdCreateInferencer` и `AntdInferencer` из `@refinedev/inferencer`.

Более подробную информацию можно узнать на странице [Ant Design Inferencer](/docs/ui-integrations/ant-design/components/inferencer).
