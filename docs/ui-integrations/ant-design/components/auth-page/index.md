---
title: <AuthPage />
description: <AuthPage> component from Refine is an authentication page that can be used to login, register, forgot password, and update password.
swizzle: true
source: packages/antd/src/components/pages/auth/index.tsx
---

Компонент `<AuthPage>`, адаптированный для **Ant Design**, содержит страницы аутентификации, которые можно использовать для логина, регистрации, восстановления и обновления пароля.

Перед использованием `<AuthPage>` убедитесь, что вы настроили [authProvider](/docs/authentication/auth-provider), который будет обрабатывать логику аутентификации.

:::simple Good to know

Для полноценной кастомизации компонент можно извлечь через команду `swizzle` **Refine CLI**

:::

```jsx live shared
const { useNavigation: useNavigationShared, useLogout: useLogoutShared } =
  RefineCore;
const {
  Typography: { Title: SharedTitle },
  Button,
} = AntdCore;

window.__refineAuthStatus = false;

const authProvider = {
  login: () => {
    window.__refineAuthStatus = true;
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
    window.__refineAuthStatus = false;
    return {
      success: true,
      redirectTo: "/",
    };
  },
  check: async () => {
    return {
      authenticated: window.__refineAuthStatus ? true : false,
      redirectTo: window.__refineAuthStatus ? undefined : "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  getPermissions: async () => null,
  getIdentity: async () => null,
};

const DashboardPage = () => {
  const { mutate } = useLogoutShared();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <SharedTitle level={2}>Home Page</SharedTitle>
      <br />
      <button
        onClick={() => {
          mutate();
        }}
      >
        Logout
      </button>
    </div>
  );
};

const GoogleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="m23.7 12.3-.1-2.3H12.3v4.5h6.4a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.8Z M12.3 24c3.2 0 6-1 7.9-3l-3.9-3a7.2 7.2 0 0 1-10.8-3.7h-4v3c2 4 6 6.7 10.8 6.7Z M5.5 14.3a7 7 0 0 1 0-4.6v-3h-4a11.9 11.9 0 0 0 0 10.7l4-3.1Z M12.3 4.8c1.7 0 3.3.6 4.6 1.8L20.3 3A12 12 0 0 0 1.6 6.6l4 3.1c.9-2.8 3.5-5 6.7-5Z"
    />
  </svg>
);

const GithubIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#fff"
      d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.4 1 .2-.8.5-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.1-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.9 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 0z"
    />
  </svg>
);
```

## Использование

Компонент `<AuthPage>` можно использовать в следующих вариациях:

- [`login`](#login) - страница логина.
- `register` - страница регистрации.
- `forgotPassword` - страница восстановления пароля.
- `updatePassword` - страница обновления пароля.

В данном проекте нам достаточно первого варианта.

### Логин

Вариант `login` используется по умолчанию.

```jsx live hideCode url=http://localhost:3000/login previewHeight=600px
setInitialRoutes(["/login"]);
setRefineProps({ Sider: () => null });

// visible-block-start
import { Refine, Authenticated } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";

import { AuthPage, ThemedLayoutV2, RefineThemes } from "@refinedev/antd";

import { ConfigProvider } from "antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { authProvider } from "./authProvider";

import { DashboardPage } from "pages/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerProvider}
          authProvider={authProvider}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<DashboardPage />} />
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              {/* highlight-next-line */}
              <Route path="/login" element={<AuthPage />} />
            </Route>
          </Routes>
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  );
};
// visible-block-end
render(<App />);
```

После отправки формы будет вызван метод [`login`][login] провайдера [`authProvider`][auth-provider].

```jsx title="src/authProvider.js"
const authProvider = {
  // --
  login: async ({ email, password, remember, providerName }) => {
    // You can handle the login process according to your needs.

    // If the process is successful.
    return {
      success: true,
    };

    return {
      success: false,
      error: {
        name: "Login Error",
        message: "Invalid email or password",
      },
    };
  },
  // --
};
```

## Свойства, актуальные для проекта

### wrapperProps

[`wrapperProps`](https://ant.design/components/layout/#API) можно использовать для настройки компонента-обёртки (враппера). Например, в примере ниже через это свойство задается цвет фона.

```jsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      wrapperProps={{
        style: {
          background: "#331049",
        },
      }}
      // highlight-end
    />
  );
};
```

### contentProps

`contentProps` используется для задания свойств компоненту с содержимым, конкретно - карточке [`Card`](https://ant.design/components/card/#API). В примере ниже через это свойство задаются стили для заголовка, хедера и контента карточки.

```jsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      contentProps={{
        title: "Login",
        headStyle: {
          background: "cornflowerblue",
          color: "white",
        },
        bodyStyle: {
          background: "#673ab742",
        },
      }}
      // highlight-end
    />
  );
};
```

### formProps

[`FormProps`](https://ant.design/components/form/#API) позволяет задавать свойства компоненту формы. В примере ниже через него задаются `initialValues` и коллбэк `onFinish`.

```jsx
const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      formProps={{
        initialValues: {
          email: "demo@refine.dev",
          password: "demo",
        },
        onFinish: (formValues) => alert(JSON.stringify(formValues, null, 2)),
      }}
      // highlight-end
    />
  );
};
```

### title

Это свойство можно использовать для задания текста и иконки на страницах авторизации.

- Текст по умолчанию: Refine Project
- Иконка по умолчанию: Refine Logo

```jsx
import { AuthPage, ThemedTitle } from "@refinedev/antd";

const MyLoginPage = () => {
  return <AuthPage type="login" title={<h1>My Title</h1>} />;
};
```

Либо можно использовать компонент `ThemedTitle`:

```jsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      title={
        <ThemedTitleV2
          title="My Title"
          icon={<img src="https://refine.dev/img/logo.png" />}
        />
      }
    />
  );
};
```

### renderContent

`renderContent` представляет дополнительные возможности для настройки отображения формы и заголовка. Можно изменить верстку и стилизацию, добавить дополнительный контент от себя или изменить исходный.

```jsx
import { AuthPage } from "@refinedev/antd";

const MyLoginPage = () => {
  return (
    <AuthPage
      type="login"
      // highlight-start
      renderContent={(content: React.ReactNode, title: React.ReactNode) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title}
            <h1 style={{ color: "white" }}>Extra Header</h1>
            {content}
            <h1 style={{ color: "white" }}>Extra Footer</h1>
          </div>
        );
      }}
      // highlight-end
    />
  );
};
```

[auth-provider]: /docs/authentication/auth-provider
[login]: /docs/authentication/auth-provider#login-
[register]: /docs/authentication/auth-provider#register
[forgot-password]: /docs/authentication/auth-provider#forgotpassword
[update-password]: /docs/authentication/auth-provider#updatepassword
