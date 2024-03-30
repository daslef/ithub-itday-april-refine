---
title: Edit
swizzle: true
---

`<Edit>` представляет собой макет, дополняющий страницу кнопками и иной функциональностью для редактирования.

```tsx live hideCode url=http://localhost:3000/posts/edit/123
const { EditButton } = RefineAntd;

interface ICategory {
  id: number;
  title: string;
}

// visible-block-start

interface IPost {
  id: number;
  title: string;
  content: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
}

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
    warnWhenUnsavedChanges: true,
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton recordItemId="123">Edit Item 123</EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

## Свойства

### title

`title` позволяет настроить заголовок компонента `<Edit>`. По умолчанию будет использован префикс "Edit" и название ресурса, например, "Edit post".

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;
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
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    /* highlight-next-line */
    <Edit title="Custom Title">
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton recordItemId="2">Edit Item 2</EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### saveButtonProps

Компонент `<Edit>` содержит кнопку сохранения изменений. Для ее настройки можно использовать свойство `saveButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    /* highlight-next-line */
    <Edit saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к [документации `<SaveButton>` &#8594](/docs/ui-integrations/ant-design/components/buttons/save-button)

### canDelete and deleteButtonProps

`canDelete` позволяет добавить кнопку удаления, которая будет использовать хук `useDelete`.

Для кастомизации этой кнопки можно использовать свойство `deleteButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/123
const { EditButton } = RefineAntd;
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
  login: () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: () => {
    return {
      success: true,
    };
  },
  forgotPassword: () => {
    return {
      success: true,
    };
  },
  updatePassword: () => {
    return {
      success: true,
    };
  },
  logout: () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: () => ({
    authenticated: true,
  }),
  onError: () => ({}),
  getPermissions: () => null,
  getIdentity: () => null,
};

// visible-block-start
import { Edit } from "@refinedev/antd";
import { usePermissions } from "@refinedev/core";

const PostEdit = () => {
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      /* highlight-start */
      canDelete={permissionsData?.includes("admin")}
      deleteButtonProps={{ size: "small" }}
      /* highlight-end */
      saveButtonProps={{ size: "small" }}
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    authProvider={authProvider}
    dataProvider={customDataProvider}
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton recordItemId="123">Edit Item 123</EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

> Для дополнительной информации ознакомьтесь с [документацией `<DeleteButton>` &#8594](/docs/ui-integrations/ant-design/components/buttons/delete-button) и [документацией `usePermission` &#8594](/docs/authentication/hooks/use-permissions)

### recordItemId

Компонент `<Edit>` должен владеть информацией об `id` редактируемого элемента, чтобы кнопка `<RefreshButton>` работала корректно. По умолчанию идентификатор определяется автоматически, по локации страницы, но если информация не может быть считана (например, при использовании модального окна или дровера), можно использовать свойство `recordItemId`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, useModalForm } from "@refinedev/antd";
import { Modal, Button } from "antd";

const PostEdit = () => {
  const { modalProps, id, show } = useModalForm({
    action: "edit",
  });

  return (
    <div>
      <Button onClick={() => show()}>Edit Button</Button>
      <Modal {...modalProps}>
        {/* highlight-next-line */}
        <Edit recordItemId={id}>
          <p>Rest of your page here</p>
        </Edit>
      </Modal>
    </div>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton recordItemId="2">Edit Item 2</EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

Для модификации или отключения хлебных крошек вы можете использовать свойство `breadcrumb`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, Breadcrumb } from "@refinedev/antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к [документации `Breadcrumb` &#8594](/docs/ui-integrations/ant-design/components/breadcrumb)

### wrapperProps

Свойство для кастомизации обертки компонента `<Edit/>`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### headerProps

Для кастомизации хедера компонента `<Edit/>` используйте свойство `headerProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### contentProps

Для кастомизации блока контента компонента `<Edit/>` используйте свойство `contentProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к документации [компонента `Card` &#8594](https://ant.design/components/card/)

### headerButtons

По умолчанию, компонент `<Edit/>` содержит две кнопки в хедере: [`<ListButton>`][list-button] и [`<RefreshButton>`][refresh-button].

Вы можете кастомизировать кнопки хедера через свойство `headerButtons`. Оно принимает компонент либо рендер-функцию вида `({ defaultButtons, refreshButtonProps, listButtonProps }) => React.ReactNode`, которую можно использовать чтобы сохранить исходные кнопки и дополнить их собственными.

Если ресурс "list" не определен, [`<ListButton>`][list-button] отображен не будет.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, ListButton, RefreshButton } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit = () => {
  return (
    <Edit
      // highlight-start
      headerButtons={({ refreshButtonProps, listButtonProps }) => (
        <>
          <Button type="primary">Custom Button</Button>
          <RefreshButton {...refreshButtonProps} meta={{ foo: "bar" }} />
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/2"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### headerButtonProps

Для кастомизации обертки над кнопками хедера используйте свойство `headerButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit = () => {
  return (
    <Edit
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
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### footerButtons

По умолчанию, компонент `<Edit/>` содержит кнопки [`<SaveButton>`][save-button] и [`<DeleteButton>`][delete-button] в футере.

Кнопки футера можно кастомизировать через свойство `footerButtons`, которое принимает компонент либо рендер-функцию вида `({ defaultButtons, saveButtonProps, deleteButtonProps }) => React.ReactNode`.

Если [`canDelete`](#candelete-and-deletebuttonprops) выставлен в `false`, кнопка [`<DeleteButton>`][delete-button] отображена не будет.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ defaultButtons }) => (
        <>
          {defaultButtons}
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit, SaveButton, DeleteButton } from "@refinedev/antd";
import { Button } from "antd";

const PostEdit = () => {
  return (
    <Edit
      // highlight-start
      footerButtons={({ saveButtonProps, deleteButtonProps }) => (
        <>
          <Button type="primary">Custom Button</Button>
          <SaveButton {...saveButtonProps} hideText />
          {deleteButtonProps && (
            <DeleteButton {...deleteButtonProps} hideText />
          )}
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### footerButtonProps

Настроить обертку над кнопками футера можно через свойство `footerButtonProps`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2
const { EditButton } = RefineAntd;

// visible-block-start
import { Edit } from "@refinedev/antd";

const PostEdit = () => {
  return (
    <Edit
      // highlight-start
      footerButtonProps={{
        style: {
          // hide-start
          float: "right",
          marginRight: 24,
          // hide-end
          backgroundColor: "cornflowerblue",
          padding: "16px",
        },
      }}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton />
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

### autoSaveProps

Есть возможность включить функционал автосохранения, задав свойство `autoSaveProps`.

```jsx live url=http://localhost:3000/posts/edit/123
const { EditButton } = RefineAntd;

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

// visible-block-start
const PostEdit = () => {
  const {
    formProps,
    saveButtonProps,
    queryResult,
    // highlight-next-line
    autoSaveProps,
  } = useForm({
    warnWhenUnsavedChanges: true,
    // highlight-start
    autoSave: {
      enabled: true,
    },
    // highlight-end
  });

  const postData = queryResult?.data?.data;
  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: postData?.category.id,
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      // highlight-next-line
      autoSaveProps={autoSaveProps}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Rejected",
                value: "rejected",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/edit/123"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <EditButton recordItemId="123">Edit Item 123</EditButton>
          </div>
        ),
        edit: PostEdit,
      },
    ]}
  />,
);
```

[list-button]: /docs/ui-integrations/ant-design/components/buttons/list-button
[refresh-button]: /docs/ui-integrations/ant-design/components/buttons/refresh-button
[save-button]: /docs/ui-integrations/ant-design/components/buttons/save-button
[delete-button]: /docs/ui-integrations/ant-design/components/buttons/delete-button
