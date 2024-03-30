---
title: Create
swizzle: true
---

`<Create>` не содержит какой-либо логики, но предоставляет базовый макет с кнопками и заголовком.

```tsx live hideCode url=http://localhost:3000/posts/create
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

// visible-block-start
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

## Свойства

### title

`title` позволяет изменить заголовок. Если свойство не перезадано, будет использован префикс "Create" и имя ресурса, например, для ресурса `/posts/create` заголовком будет "Create post".

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { Form, Input, Select, useForm, useSelect, CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate = () => {
  return (
    /* highlight-next-line */
    <Create title="Custom Title">
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### saveButtonProps

Компонент `<Create>` содержит кнопку сохранения, которая служит для отправки формы. Для настройки этой кнопки можно использовать свойство `saveButtonProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { Form, Input, Select, useForm, useSelect, CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate = () => {
  return (
    /* highlight-next-line */
    <Create saveButtonProps={{ size: "small" }}>
      <p>Rest of your page here</p>
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

> Дополнительную информацию можете получить в документации по [`<SaveButton>` documentation &#8594](/docs/ui-integrations/ant-design/components/buttons/save-button)

### breadcrumb <GlobalConfigBadge id="core/refine-component/#breadcrumb" />

Для настройки или отключения хлебных кроошек можно использовать свойство `breadcrumb`. По умолчанию используется компонент `Breadcrumb` из пакета `@refinedev/antd`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create, Breadcrumb } from "@refinedev/antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

> Для дополнительной информации обратитесь к [документации `Breadcrumb` &#8594](/docs/ui-integrations/ant-design/components/breadcrumb)

### wrapperProps

Для настройки обертки компонента `<Create/>` используйте свойство `wrapperProps`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### headerProps

Для настройки хедера компонента `<Create/>` можно использовать свойство `headerProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### contentProps

Наконец, для настройки контента компонента `<Create/>` есть свойство `contentProps`:

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

> Больше информации можно получить в [документации компонента `Card` &#8594](https://ant.design/components/card/)

### footerButtons

По умолчанию, компонент `<Create/>` содержит [`<SaveButton>`][save-button] в футере.

Кнопки футера можно настроить через свойство `footerButtons`. Оно принимает компонент либо рендер-функцию вида `({ defaultButtons, saveButtonProps }) => React.ReactNode`, которую можно использовать чтобы сохранить существующие кнопки, добавив к ним дополнительные.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
// visible-block-start
import { Create, SaveButton } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate = () => {
  return (
    <Create
      // highlight-start
      footerButtons={({ saveButtonProps }) => (
        <>
          <SaveButton
            {...saveButtonProps}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Save
          </SaveButton>
          <Button type="primary">Custom Button</Button>
        </>
      )}
      // highlight-end
    >
      <p>Rest of your page here</p>
    </Create>
  );
};

// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

### footerButtonProps

Для настройки обертки над кнопками футера используйте свойство `footerButtonProps`.

```jsx live disableScroll previewHeight=280px url=http://localhost:3000/posts/create
const { CreateButton } = RefineAntd;

// visible-block-start
import { Create } from "@refinedev/antd";
import { Button } from "antd";

const PostCreate = () => {
  return (
    <Create
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
    </Create>
  );
};
// visible-block-end

render(
  <RefineAntdDemo
    initialRoutes={["/posts/create"]}
    resources={[
      {
        name: "posts",
        list: () => (
          <div>
            <p>This page is empty.</p>
            <CreateButton />
          </div>
        ),
        create: PostCreate,
      },
    ]}
  />,
);
```

[save-button]: /docs/ui-integrations/ant-design/components/buttons/save-button
