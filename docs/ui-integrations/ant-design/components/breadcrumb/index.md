---
title: Breadcrumb
swizzle: true
---

Хлебные крошки отображают текущую локацию приложения с учетом иерархии. Созданы на основе компонента Ant Design [Breadcrumb][antd-breadcrumb] с использованием хука useBreadcrumb.

```jsx live url=http://localhost:3000/posts/show/123 previewHeight=280px disableScroll
// visible-block-start
import { BrowserRouter } from "react-router-dom";
import {
  ConfigProvider,
  RefineThemes,
  Show,
  // highlight-next-line
  Breadcrumb,
} from "@refinedev/antd";

//highlight-start
const PostIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-list"
    width={18}
    height={18}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <line x1={9} y1={6} x2={20} y2={6}></line>
    <line x1={9} y1={12} x2={20} y2={12}></line>
    <line x1={9} y1={18} x2={20} y2={18}></line>
    <line x1={5} y1={6} x2={5} y2="6.01"></line>
    <line x1={5} y1={12} x2={5} y2="12.01"></line>
    <line x1={5} y1={18} x2={5} y2="18.01"></line>
  </svg>
);
//highlight-end

const PostShow = () => {
  return (
    <Show
      // highlight-next-line
      breadcrumb={<Breadcrumb />}
    >
      <p>Content of your show page...</p>
    </Show>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          //...
          resources={[
            {
              name: "posts",
              list: "/posts",
              show: "/posts/show/:id",
              // highlight-next-line
              meta: { icon: PostIcon },
            },
          ]}
        >
          //...
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end

const PostList = () => {
  return (
    <RefineAntd.List>
      <p>Content of your list page...</p>
    </RefineAntd.List>
  );
};

setInitialRoutes(["/posts/show/123"]);

render(
  <ReactRouterDom.BrowserRouter>
    <RefineCore.Refine
      dataProvider={RefineSimpleRest.default(
        "https://api.fake-rest.refine.dev",
      )}
      routerProvider={RefineReactRouterV6.default}
      resources={[
        {
          name: "posts",
          meta: { icon: PostIcon },
          show: "/posts/show/:id",
          list: "/posts",
        },
      ]}
    >
      <RefineAntd.Layout>
        <ReactRouterDom.Routes>
          <ReactRouterDom.Route path="/posts" element={<PostList />} />
          <ReactRouterDom.Route path="/posts/show/:id" element={<PostShow />} />
        </ReactRouterDom.Routes>
      </RefineAntd.Layout>
    </RefineCore.Refine>
  </ReactRouterDom.BrowserRouter>,
);
```

### breadcrumbProps

Так как `<Breadcrumb>` создан на основе Ant Design [Breadcrumb][antd-breadcrumb], его можно настроить через свойство `breadcrumbProps`.

```jsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}
    >
      ...
    </List>
  );
};
```

### showHome

Если у вас есть страница по адресу `/`, она будет использована в качестве корневой и отображаться с домашней иконкой. Чтобы скрыть корневую страницу, передайте в свойство `showHome` значение `false.`

```jsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb showHome={true} />}
    >
      ...
    </List>
  );
};
```

### meta

Если ваши пути содержат дополнительные параметры, их можно передать в хлебные крошки через свойство `meta`. В таком случае, они будут учтены на этапе создания путей и заполнения их параметров.

```jsx
import { List, Breadcrumb } from "@refinedev/antd";

export const PostList = () => {
  return (
    <List
      // highlight-next-line
      breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}
    >
      ...
    </List>
  );
};
```

[antd-breadcrumb]: https://ant.design/components/breadcrumb
