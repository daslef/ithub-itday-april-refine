---
title: Create
swizzle: true
---

`<CreateButton>` использует Ant Design [`<Button>`](https://ant.design/components/button/) и метод `create` хука [`useNavigation`](/docs/routing/hooks/use-navigation).

:::simple Good to know

Вы можете извлечь этот компонент для более точной кастомизации командой swizzle **Refine CLI**

:::

## Использование

```jsx live previewHeight=300px
const { useRouterContext } = RefineCore;
// visible-block-start
import {
  List,
  useTable,
  // highlight-next-line
  CreateButton,
} from "@refinedev/antd";
import { Table } from "antd";

const PostList = () => {
  const { tableProps } = useTable();

  return (
    <List
      // highlight-next-line
      headerButtons={<CreateButton />}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" width="100%" />
      </Table>
    </List>
  );
};

// visible-block-end

const CreatePage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    resources={[
      {
        name: "posts",
        list: PostList,
        create: CreatePage,
      },
    ]}
  />,
);
```

## Свойства

### resource

`resource` is used to redirect the app to the `create` action path of the given resource name. By default, the app redirects to the inferred resource's `create` action path.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CreateButton } from "@refinedev/antd";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      resource="categories"
    />
  );
};

// visible-block-end

const CreatePage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
      },
      {
        name: "categories",
        create: CreatePage,
      },
    ]}
    DashboardPage={MyCreateComponent}
  />,
);
```

Clicking the button will trigger the `create` method of [`useNavigation`](/docs/routing/hooks/use-navigation) and then redirect the app to the `create` action path of the resource, filling the necessary parameters in the route.

If you have multiple resources with the same name, you can pass the `identifier` instead of the `name` of the resource. It will only be used as the main matching key for the resource, data provider methods will still work with the `name` of the resource defined in the `<Refine/>` component.

> For more information, refer to the [`identifier` section of the `<Refine/>` component documentation &#8594](/docs/core/refine-component#identifier)

### meta

It is used to pass additional parameters to the `create` method of [`useNavigation`](/docs/routing/hooks/use-navigation). By default, existing parameters in the route are used by the `create` method. You can pass additional parameters or override the existing ones using the `meta` prop.

If the `create` action route is defined by the pattern: `/posts/:authorId/create`, the `meta` prop can be used as follows:

```tsx
const MyComponent = () => {
  return <CreateButton meta={{ authorId: "10" }} />;
};
```

### hideText

Используется для скрытия текста. Если свойство выставлено в `true`, отображается только иконка.

```tsx live disableScroll previewHeight=120px
const { useRouterContext } = RefineCore;

// visible-block-start
import { CreateButton } from "@refinedev/antd";

const MyCreateComponent = () => {
  return (
    <CreateButton
      // highlight-next-line
      hideText={true}
    />
  );
};

// visible-block-end

const CreatePage = () => {
  const params = useRouterContext().useParams();
  return <div>{JSON.stringify(params)}</div>;
};

render(
  <RefineAntdDemo
    initialRoutes={["/"]}
    resources={[
      {
        name: "posts",
        list: MyCreateComponent,
        create: CreatePage,
      },
    ]}
  />,
);
```

### accessControl

Через это свойство можно отключить контроль доступа (установив `enabled: true`) либо напротив, скрывать кнопку при отсутствии необходимых прав (через `hideIfUnauthorized: true`). Это имеет смысл только если был настроен [`accessControlProvider`](/docs/authorization/access-control-provider).

```jsx
import { CreateButton } from "@refinedev/antd";

export const MyListComponent = () => {
  return (
    <CreateButton accessControl={{ enabled: true, hideIfUnauthorized: true }} />
  );
};
```

:::simple External Props

Компонент также принимает все свойства соответствующего компонента Ant Design [Button](https://ant.design/components/button/#API).

:::
