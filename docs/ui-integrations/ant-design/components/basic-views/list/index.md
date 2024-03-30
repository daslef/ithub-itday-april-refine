---
title: List
swizzle: true
---

`<List>` предоставляет макет для списка содержимого ресурса, не содержащий логики, но дополняющий страницу некоторыми компонентами.

```tsx
interface ICategory {
  id: number;
  title: string;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}
```

```jsx live hideCode url=http://localhost:3000/posts
// visible-block-start
import { useMany } from "@refinedev/core";

import { List, TextField, TagField, useTable } from "@refinedev/antd";
import { Table } from "antd";

const PostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => <TagField value={value} />}
        />
      </Table>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

## Свойства

### title

`title` позволяет изменить заголовок компонента `<List>`. По умолчанию используется имя ресурса.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList = () => {
  return (
    /* highlight-next-line */
    <List title="Custom Title">
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### canCreate and createButtonProps

`canCreate` позволяет добавить в макет кнопку создания записи, которую далее можно будет кастомизировать через свойство `createButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
const { Create } = RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
  create: async ({ resource, variables }) => {
    return {
      data: {},
    };
  },
};

const authProvider = {
  login: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async () => {
    return {
      success: true,
    };
  },
  forgotPassword: async () => {
    return {
      success: true,
    };
  },
  updatePassword: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: async () => ({
    authenticated: true,
  }),
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => null,
};

// visible-block-start
import { List } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";

const PostList = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <List
      /* highlight-start */
      canCreate={permissionsData?.includes("admin")}
      createButtonProps={{ size: "small" }}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
        create: () => {
          return <Create>Create Page</Create>;
        },
      },
    ]}
  />,
);
```

Кнопка создания перенаправит пользователя на соответствующую страницу.

> Для дополнительной информации обратитесь к документации [хука `usePermission` &#8594](/docs/authentication/hooks/use-permissions)

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

Для настройки или кастомизации хлебных крошек используйте свойство `breadcrumb`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const CustomBreadcrumb = () => {
  return (
    <p
      style={{
        padding: "3px 6px",
        border: "2px dashed cornflowerblue",
      }}
    >
      My Custom Breadcrumb
    </p>
  );
};

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      breadcrumb={<CustomBreadcrumb />}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### wrapperProps

Свойство для кастомизации обертки компонента `<List/>`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList = () => {
  return (
    <List
      // highlight-start
      wrapperProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### headerProps

Для кастомизации хедера компонента `<List/>` используйте свойство `headerProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList = () => {
  return (
    <List
      // highlight-start
      headerProps={{
        subTitle: "This is a subtitle",
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### contentProps

Для кастомизации блока контента компонента `<Create/>` используйте свойство `contentProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";

const PostList = () => {
  return (
    <List
      // highlight-start
      contentProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### headerButtons

По умолчанию, компонент `<List/>` содержит в хедере кнопку [`<CreateButton>`][create-button].

Вы можете настроить кнопки хедера через свойство `headerButtons`, передав в него кастомный компонент либо рендер-функцию вида `({ defaultButtons, createButtonProps }) => React.ReactNode`.

Если "create" для ресурсу не определен, либо если [`canCreate`](#cancreate-and-createbuttonprops) выставлен в false, кнопка [`<CreateButton>`][create-button] отображаться не будет.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";
import { Button } from "antd";

const PostList = () => {
  return (
    <List
      // highlight-start
      headerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List, CreateButton } from "@refinedev/antd";
import { Button } from "antd";

const PostList = () => {
  return (
    <List
      // highlight-start
      headerButtons={({ createButtonProps }) => (
        <>
          {createButtonProps && (
            <CreateButton {...createButtonProps} meta={{ foo: "bar" }} />
          )}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

### headerButtonProps

Для кастомизации обертки над кнопками хедера используйте свойство `headerButtonProps`:

```tsx live disableScroll previewHeight=280px url=http://localhost:3000/posts
// visible-block-start
import { List } from "@refinedev/antd";
import { Button } from "antd";

const PostList: React.FC = () => {
  return (
    <List
      // highlight-start
      headerButtonProps={{
        style: {
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
      headerButtons={<Button type="primary">Custom Button</Button>}
    >
      <p>Rest of your page here</p>
    </List>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts"]}
    resources={[
      {
        name: "posts",
        list: PostList,
      },
    ]}
  />,
);
```

[create-button]: /docs/ui-integrations/ant-design/components/buttons/create-button
