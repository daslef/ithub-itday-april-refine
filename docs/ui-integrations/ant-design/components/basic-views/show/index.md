---
title: Show
swizzle: true
---

`<Show>` предоставляет макет для отображения информации о конкретной записи ресурса.

```jsx live hideCode url=http://localhost:3000/posts/show/2
// visible-block-start
import { Show, MarkdownField } from "@refinedev/antd";
import { Typography } from "antd";
import { useShow, useOne } from "@refinedev/core";

const { Title, Text } = Typography;

const PostShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.data.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Edit Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

## Свойства

### title

`title` позволяет настроить заголовок компонента `<Show>`. По умолчанию будет использован префикс "Show" и название ресурса, например, "Show post".

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;
const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
  deleteOne: async ({ resource, id, variables }) => {
    return {
      data: {},
    };
  },
};

// visible-block-start
import { Show } from "@refinedev/antd";

const PostShow = () => {
  return (
    /* highlight-next-line */
    <Show title="Custom Title">
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### canDelete and canEdit

`canDelete` и `canEdit` позволяют добавить кнопки удаления и редактирования.

Кнопка удаления использует хук `useDelete`, а кнопка редактирования перенаправляет пользователя на соответствующую страницу.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton, Edit } = RefineAntd;

const { default: simpleRest } = RefineSimpleRest;

const dataProvider = simpleRest("https://api.fake-rest.refine.dev");

const customDataProvider = {
  ...dataProvider,
  deleteOne: async ({ resource, id, variables }) => {
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
  check: () => ({
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
import { Show } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";

const PostShow = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Show
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      canEdit={permissionsData?.includes("admin")}
      /* highlight-end */
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton>Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
        edit: () => {
          return <Edit>Edit Page</Edit>;
        },
      },
    ]}
  />,
);
```

> Обратитесь к дополнительной информации о [хуке `usePermission` &#8594](/docs/authentication/hooks/use-permissions)

> Обратитесь к дополнительной информации о компонентах [`<DeleteButton>`](/docs/ui-integrations/ant-design/components/buttons/delete-button) и [`<EditButton>`](/docs/ui-integrations/ant-design/components/buttons/edit-button).

### recordItemId

Компонент `<Show>` должен владеть информацией об `id` элемента. По умолчанию идентификатор определяется автоматически, по локации страницы, но если информация не может быть считана (например, при использовании модального окна или дровера), можно использовать свойство `recordItemId`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, useModalForm } from "@refinedev/antd";
import { Modal, Button } from "antd";

const PostShow = () => {
  const { modalProps, id, show } = useModalForm({
    action: "show",
  });

  return (
    <div>
      <Button onClick={() => show()}>Show Button</Button>
      <Modal {...modalProps}>
        {/* highlight-next-line */}
        <Show recordItemId={id}>
          <p>Rest of your page here</p>
        </Show>
      </Modal>
    </div>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton recordItemId="2">Show Item 2</ShowButton>
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

Для модификации или отключения хлебных крошек вы можете использовать свойство `breadcrumb`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show, Breadcrumb } from "@refinedev/antd";

const PostShow = () => {
  return (
    <Show
      // highlight-start
      breadcrumb={
        <div
          style={{
            padding: "3px 6px",
            border: "2px dashed cornflowerblue",
          }}
        >
          <Breadcrumb />
        </div>
      }
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к [документации `Breadcrumb` &#8594](/docs/ui-integrations/ant-design/components/breadcrumb)

### wrapperProps

Свойство для кастомизации обертки компонента `<Show/>`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@refinedev/antd";

const PostShow = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### headerProps

Для кастомизации хедера компонента `<Show/>` используйте свойство `headerProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@refinedev/antd";

const PostShow = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### contentProps

Для кастомизации блока контента компонента `<Show/>` используйте свойство `contentProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@refinedev/antd";

const PostShow = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к документации [компонента `Card` &#8594](https://ant.design/components/card/)

### headerButtons

По умолчанию, компонент `<Show/>` содержит кнопки [`<ListButton>`][list-button], [`<EditButton>`][edit-button], [`<DeleteButton>`][delete-button] и [`<RefreshButton>`][refresh-button] в хедере.

Кнопки хедера можно кастомизировать через свойство `headerButtons`, передав в него кастомный компонент либо рендер-функцию вида `({ defaultButtons, listButtonProps, editButtonProps, deleteButtonProps, refreshButtonProps }) => React.ReactNode`.

Если [`canDelete`](#candelete-and-canedit) в состоянии `false`, [`<DeleteButton>`][delete-button] отображен не будет.

Если [`canEdit`](#candelete-and-canedit) в состоянии `false`, [`<EditButton>`][edit-button] отображен не будет.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@refinedev/antd";
import { Button } from "antd";

const PostShow = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2
const { ShowButton } = RefineAntd;

// visible-block-start
import {
  Show,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Button } from "antd";

const PostShow = () => {
  return (
    <Show
      // highlight-start
      headerButtons={({
        deleteButtonProps,
        editButtonProps,
        listButtonProps,
        refreshButtonProps,
      }) => (
        <>
          <Button type="primary">Custom Button</Button>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
          {editButtonProps && (
            <EditButton {...editButtonProps} meta={{ foo: "bar" }} />
          )}
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} meta={{ foo: "bar" }} />
          )}
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

### headerButtonProps

Для кастомизации обертки над кнопками хедера используйте свойство `headerButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { ShowButton } = RefineAntd;

// visible-block-start
import { Show } from "@refinedev/antd";
import { Button } from "antd";

const PostShow = () => {
  return (
    <Show
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
    </Show>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/show"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <ShowButton />
          </div>
        ),
        show: PostShow,
      },
    ]}
  />,
);
```

[list-button]: /docs/ui-integrations/ant-design/components/buttons/list-button
[refresh-button]: /docs/ui-integrations/ant-design/components/buttons/refresh-button
[edit-button]: /docs/ui-integrations/ant-design/components/buttons/edit-button
[delete-button]: /docs/ui-integrations/ant-design/components/buttons/delete-button
