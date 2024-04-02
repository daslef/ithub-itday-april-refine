import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../protecting-content/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const AuthProviderTsxWithLoginMethod = /* jsx */ `
export const authProvider = {
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
      const token = localStorage.getItem("my_access_token");

      return { authenticated: Boolean(token) };
    },
    logout: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const LoginComponentBase = /* jsx */ `
import React from "react";

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};
`.trim();

const AppTsxWithLoginComponent = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";

export default function App() {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const LoginComponentWithUseLogin = /* jsx */ `
import React from "react";
import { useLogin } from "@refinedev/core";

export const Login = () => {
    const { mutate, isLoading } = useLogin();

    const onSubmit = (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target).entries());
      mutate(data);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="demo@demo.com"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  defaultValue="demodemo"
                />

                {isLoading && <span>loading...</span>}
                <button
                    type="submit"
                    disabled={isLoading}
                >Submit</button>
            </form>
        </div>
    );
};
`.trim();

const AuthProviderTsxWithLogoutMethod = /* jsx */ `
export const authProvider = {
    logout: async () => {
        localStorage.removeItem("my_access_token");
        return { success: true };
    },
    login: async ({ email, password }) => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("my_access_token", data.token);
            return { success: true };
        }

        return { success: false };
    },
    check: async () => {
        const token = localStorage.getItem("my_access_token");

        return { authenticated: Boolean(token) };
    },
    onError: async (error) => { throw new Error("Not implemented"); },
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const HeaderComponentBase = /* jsx */ `
import React from "react";

export const Header = () => {
    return (
      <>
        <h2>Welcome!</h2>
        <button type="button">
            Logout
        </button>
      </>
    );
};
`.trim();

const AppTsxWithHeaderComponent = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

import { Login } from "./pages/login";
import { Header } from "./components/header";

export default function App() {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}
`.trim();

const HeaderComponentWithUseLogout = /* jsx */ `
import React from "react";
import { useLogout } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();

  return (
    <>
      <h2>Welcome!</h2>
      <button
        type="button"
        disabled={isLoading}
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};
`.trim();

// actions

// logging-in-out actions

export const AddLoginMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.js",
          AuthProviderTsxWithLoginMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.js");
      }}
    />
  );
};

export const CreateLoginComponentFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/pages/login.jsx": {
            code: LoginComponentBase,
          },
        });
        sandpack.openFile("/src/pages/login.jsx");
        sandpack.setActiveFile("/src/pages/login.jsx");
      }}
      name="src/pages/login.jsx"
    />
  );
};

export const AddLoginToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithLoginComponent);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const AddUseLoginToLoginComponent = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/login.jsx", LoginComponentWithUseLogin);
        sandpack.setActiveFile("/src/pages/login.jsx");
      }}
    />
  );
};

export const AddLogoutMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.js",
          AuthProviderTsxWithLogoutMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.js");
      }}
    />
  );
};

export const CreateHeaderComponentFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/components/header.jsx": {
            code: HeaderComponentBase,
          },
        });
        sandpack.openFile("/src/components/header.jsx");
        sandpack.setActiveFile("/src/components/header.jsx");
      }}
      name="src/components/header.jsx"
    />
  );
};

export const AddHeaderToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithHeaderComponent);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const AddUseLogoutToHeaderComponent = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/components/header.jsx",
          HeaderComponentWithUseLogout,
        );
        sandpack.setActiveFile("/src/components/header.jsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.jsx": {
    code: AppTsxWithHeaderComponent,
  },
  "src/providers/auth-provider.js": {
    code: AuthProviderTsxWithLogoutMethod,
  },
  "src/pages/login.jsx": {
    code: LoginComponentWithUseLogin,
  },
  "src/components/header.jsx": {
    code: HeaderComponentWithUseLogout,
    active: true,
  },
};
