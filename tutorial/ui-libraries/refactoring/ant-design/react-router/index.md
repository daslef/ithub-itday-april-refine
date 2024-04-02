---
title: Рефакторинг
---

import { Sandpack, RefactorTableInListProducts, AddSortersInListProducts, AddFiltersInListProducts, RefactorFieldsInShowProduct, RefactorFormInEditProduct, RefactorFormInCreateProduct } from "./sandpack.tsx";

<Sandpack>

Теперь мы можем отрефакторить приложение с использованием `useForm` и `useTable` из `@refinedev/antd`. Эти хуки обеспечивают совместимость с компонентами `<Form />` и `<Table />` от Ant Design.

Мы также будем использовать преднастроенные компоненты полей ввода от `@refinedev/antd` для экрана с детальной информацией о продукте.

## Используем `<Table />` и `useTable`

Начнем с рефакторинга `<ListProducts />` с использованием хука `useTable` из `@refinedev/antd` и компонента `<Table />` от Ant Design.

`useTable` возвращает объект `tableProps`, который можно напрямую передать в компонент `<Table />`.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import { useTable, EditButton, ShowButton } from "@refinedev/antd";

// highlight-next-line
import { Table, Space } from "antd";

export const ListProducts = () => {
  // highlight-start
  const { tableProps } = useTable({
    sorters: {
      initial: [{ field: "id", order: "asc" }],
    },
    syncWithLocation: true,
  });
  // highlight-end

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      {/* highlight-start */}
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              {/* Используем `EditButton` и `ShowButton` для навигации */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorTableInListProducts />

Обратим внимание на то, что использование `tableProps` избавило нас от необходимости вручную обрабатывать данные, управлять пагинацией, фильтрами и сортировкой. Также, мы добавили компоненты `EditButton` и `ShowButton` для удобства перехода к роутам редактирования и отображения.

Подобные кнопки используют стилизацию Ant Design и предоставляют множество возможностей, от контроля доступа до интернационализации.

Список доступных кнопок:

- [`<CreateButton />`](/docs/ui-integrations/ant-design/components/buttons/create-button) для навигации к роуту `create`.
- [`<EditButton />`](/docs/ui-integrations/ant-design/components/buttons/edit-button) для навигации к роуту `edit`.
- [`<ListButton />`](/docs/ui-integrations/ant-design/components/buttons/list-button)для навигации к роуту `list`.
- [`<ShowButton />`](/docs/ui-integrations/ant-design/components/buttons/show-button)для навигации к роуту `show`.
- [`<DeleteButton />`](/docs/ui-integrations/ant-design/components/buttons/delete-button) для удаления записи.
- [`<SaveButton />`](/docs/ui-integrations/ant-design/components/buttons/save-button) для отправки формы.
- [`<RefreshButton />`](/docs/ui-integrations/ant-design/components/buttons/refresh-button) для обновления данных на странице.
- и другие.

### Сортировка

Интегрировать сортировку еще проще. Подключим ее для колонок `ID` и `Name`.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
import { useMany } from "@refinedev/core";
// highlight-next-line
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
} from "@refinedev/antd";

import { Table, Space } from "antd";

export const ListProducts = () => {
  // highlight-next-line
  const { tableProps, sorters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          // highlight-start
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
          // highlight-end
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          // highlight-start
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // highlight-end
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
```

<AddSortersInListProducts />

Как видим, не пришлось добавлять никакой дополнительный логики - мы просто передали `sorters`, определенные в `useTable`, на обработку функции `getDefaultSortOrder`.

### Фильтрация

Здесь помимо тех же самых компонента `<Table />` и объекта `tableProps` мы будем использовать `<FilterDropdown />` чтобы связать поля ввода с фильтрами.

Для текстового фильтра по колонке названия используем компонент `<Input />`, а для фильтра по категории используем компонент `<Select />` и хук `useSelect`.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
// highlight-next-line
import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  // highlight-start
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  // highlight-end
} from "@refinedev/antd";

// highlight-next-line
import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  // highlight-next-line
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    // highlight-start
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    // highlight-end
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  // highlight-start
  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });
  // highlight-end

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)}
          // highlight-start
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
          // highlight-end
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
          // highlight-start
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              // Сохраняем выбранный id как число
              mapValue={(selectedKey) => Number(selectedKey)}
            >
              <Select style={{ minWidth: 200 }} {...selectProps} />
            </FilterDropdown>
          )}
          defaultFilteredValue={getDefaultFilter("category.id", filters, "eq")}
          // highlight-end
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
```

<AddFiltersInListProducts />

:::note Implementation Details

Для простоты мы использовали фильтрацию через оператор `eq`. В реальной практике `category.id` лучше было бы фильтровать через оператор `in`, а `name` - через `contains`.

:::

## Используем `useForm` и `<Form />`

Теперь перепишем `<EditProduct />` и `<CreateProduct />` с использованием хука `useForm` из `@refinedev/antd` и компонента `<Form />` Ant Design.

По аналогии с предыдущим примером, `useForm` возвращает объект `formProps`, который мы будем передавать в компонент `<Form />`.

Обнови `src/pages/products/edit.jsx`:

```jsx title="src/pages/products/edit.jsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  // highlight-start
  const { formProps, saveButtonProps, queryResult } = useForm({
    redirect: "show",
  });
  // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,
  });

  return (
    // highlight-start
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      {/* Кнопка отправки формы */}
      <SaveButton {...saveButtonProps} />
    </Form>
    // highlight-end
  );
};
```

<RefactorFormInEditProduct />

Мы также использовали связку `useSelect` + `<Select />` для создания выпадающего списка для поля `category`.

Теперь сделаем то же для компонента `CreateProduct` в `src/pages/products/create.jsx`:

```jsx title="src/pages/products/create.jsx"
// highlight-next-line
import { useForm, useSelect, SaveButton } from "@refinedev/antd";

// highlight-next-line
import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  // highlight-start
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });
  // highlight-end

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-start
    <Form {...formProps} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Material" name="material">
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={["category", "id"]}>
        <Select {...selectProps} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber step="0.01" stringMode />
      </Form.Item>
      <SaveButton {...saveButtonProps} />
    </Form>
    // highlight-end
  );
};
```

<RefactorFormInCreateProduct />

## Рефакторинг `<ShowProduct />`

Здесь нам нужно перевести компонент на использование полей ввода из `@refinedev/antd`.

Доступные компоненты для полей ввода:

- [`<BooleanField />`](/docs/ui-integrations/ant-design/components/fields/boolean-field), чекбокс для булевых параметров.
- [`<DateField />`](/docs/ui-integrations/ant-design/components/fields/date-field), поле даты с настраиваемым форматированием.
- [`<EmailField />`](/docs/ui-integrations/ant-design/components/fields/email-field), почтовое поле.
- [`<FileField />`](/docs/ui-integrations/ant-design/components/fields/file-field), для скачивания файла.
- [`<ImageField />`](/docs/ui-integrations/ant-design/components/fields/image-field), поле для изображения, использующее компонент Ant Design `<Image />`.
- [`<MarkdownField />`](/docs/ui-integrations/ant-design/components/fields/markdown-field), поле для отображения маркдаун-контента через библиотеку `react-makrdown`.
- [`<NumberField />`](/docs/ui-integrations/ant-design/components/fields/number-field), поле для численных данных, поддерживает локализацию и форматирование.
- [`<TagField />`](/docs/ui-integrations/ant-design/components/fields/tag-field), отображает значение в компоненте Ant Design `<Tag />`.
- [`<TextField />`](/docs/ui-integrations/ant-design/components/fields/text-field), отображает значение через компонент Ant Design `<Typography.Text />`.
- [`<UrlField />`](/docs/ui-integrations/ant-design/components/fields/url-field), отображает значение с ссылкой.

Сейчас мы будем использовать компоненты `<TextField />`, `<NumberField />` и `<MarkdownField />`.

Обнови `src/pages/products/show.jsx`:

```jsx title="src/pages/products/show.jsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
  const {
    queryResult: { data, isLoading },
  } = useShow();

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: data?.data?.category.id || "",
    queryOptions: {
      enabled: !!data?.data,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* highlight-start */}
      <Typography.Title level={5}>Id</Typography.Title>
      <TextField value={data?.data?.id} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Name</Typography.Title>
      <TextField value={data?.data?.name} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Description</Typography.Title>
      <MarkdownField value={data?.data?.description} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Material</Typography.Title>
      <TextField value={data?.data?.material} />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Category</Typography.Title>
      <TextField
        value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
      />
      {/* highlight-end */}

      {/* highlight-start */}
      <Typography.Title level={5}>Price</Typography.Title>
      <NumberField value={data?.data?.price} />
      {/* highlight-end */}
    </div>
  );
};
```

<RefactorFieldsInShowProduct />

Теперь все роуты приложения используют расширенные версии хуков, адаптированные под использование с Ant Design.

</Sandpack>
