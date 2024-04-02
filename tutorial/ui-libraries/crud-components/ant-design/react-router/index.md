---
title: Компоненты CRUD
---

import { Sandpack, ListInListProducts, EditInEditProduct, CreateInCreateProduct, ShowInShowProduct } from "./sandpack.tsx";

<Sandpack>

Помимо тех компонентов, что мы рассмотрели ранее, интеграция с Ant Design также предлагает нам так называемые _CRUD-компоненты_. Эти компоненты представляют собой своего рода обертку над основным функционалам, обеспечивают тем самым целостный дизайн и дополнительный функционал.

Эти компоненты не обязательны к использованию, но существенно снижают затраты на реализацию рутинного функционала, так что рекомендуем попробовать!

## List

Компонент `<List />` оборачивает страницы со списком записей ресурса, включает в себя хедер с поддержкой локализации и навигацией к созданию новой записи.

Обнови `src/pages/products/list.jsx`:

```jsx title="src/pages/products/list.jsx"
import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  // highlight-next-line
  List,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  const { tableProps, sorters, filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [
        { field: "name", operator: "contains", value: "" },
        { field: "category.id", operator: "in", value: [1, 2] },
      ],
    },
    syncWithLocation: true,
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-next-line
    <List>
      <Table {...tableProps} rowKey="id">
        {/* ... */}
      </Table>
      {/* highlight-next-line */}
    </List>
  );
};
```

<ListInListProducts />

## Create

Компонент `<Create />` является оберткой для страниц создания новых записей. Содержит хедер с поддержкой i18n и навигацией к списку записей ресурса, кнопкой назад и хлебными крошками. Содержит футер с компонентом `<SaveButton />`, который служит для отправки формы и ожидает на вход `saveButtonProps` из `useForm`.

Обнови `src/pages/products/create.jsx`:

```jsx title="src/pages/products/create.jsx"
// highlight-next-line
import { useForm, useSelect, Create } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const CreateProduct = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "edit",
  });

  const { selectProps } = useSelect({
    resource: "categories",
  });

  return (
    // highlight-next-line
    <Create saveButtonProps={saveButtonProps}>
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
      </Form>
      {/* highlight-next-line */}
    </Create>
  );
};
```

<CreateInCreateProduct />

## Edit

Компонент `<Edit />` является оберткой для страниц редактирования. Дизайн и использование схожи с `<Create />`, но дополнительно представлены кнопки `<RefreshButton />` и `<DeleteButton />`. Компонент доступен для расширения и кастомизации.

Обнови `src/pages/products/edit.jsx`:

```jsx title="src/pages/products/edit.jsx"
// highlight-next-line
import { useForm, useSelect, Edit } from "@refinedev/antd";

import { Form, Input, Select, InputNumber } from "antd";

export const EditProduct = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    redirect: "show",
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category?.id,
  });

  return (
    // highlight-next-line
    <Edit saveButtonProps={saveButtonProps}>
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
      </Form>
      {/* highlight-next-line */}
    </Edit>
  );
};
```

<EditInEditProduct />

:::tip

Обрати внимание, мы удалили `<SaveButton />` из `<EditProduct />` и используем свойство `saveButtonProps` для получения той же функциональности с компонентом `<Edit />`.

:::

## Show

Компонент `<Show />` - обертка для страниц, представляющих конкретную запись ресурса. Он содержит хедер с поддержкой i18n, навигацией к списку записей ресурса и редактированию записи, кнопки обновления и удаления, кнопку "назад" и хлебные крошки. Каждый из перечисленных компонентов можно расширить и кастомизировать.

Обнови `src/pages/products/show.jsx`:

```jsx title="src/pages/products/show.jsx"
import { useShow, useOne } from "@refinedev/core";
// highlight-next-line
import { TextField, NumberField, MarkdownField, Show } from "@refinedev/antd";

import { Typography } from "antd";

export const ShowProduct = () => {
    const { queryResult: { data, isLoading } } = useShow();

    const { data: categoryData, isLoading: categoryIsLoading } =
    useOne({
        resource: "categories",
        id: data?.data?.category.id || "",
        queryOptions: {
            enabled: !!data?.data,
        },
    });

    return (
        {/* highlight-next-line */}
      <Show isLoading={isLoading}>
        <Typography.Title level={5}>Id</Typography.Title>
        <TextField value={data?.data?.id} />

        <Typography.Title level={5}>Name</Typography.Title>
        <TextField value={data?.data?.name} />

        <Typography.Title level={5}>Description</Typography.Title>
        <MarkdownField value={data?.data?.description} />

        <Typography.Title level={5}>Material</Typography.Title>
        <TextField value={data?.data?.material} />

        <Typography.Title level={5}>Category</Typography.Title>
        <TextField
          value={categoryIsLoading ? "Loading..." : categoryData?.data?.title}
        />

        <Typography.Title level={5}>Price</Typography.Title>
        <NumberField value={data?.data?.price} />
        {/* highlight-next-line */}
      </Show>
    );
};
```

<ShowInShowProduct />

Наше приложение получило целостный дизайн!

</Sandpack>
