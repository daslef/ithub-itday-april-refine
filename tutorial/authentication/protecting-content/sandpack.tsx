import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies, finalFiles as initialFiles } from "../intro/sandpack";
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

const AuthProviderTsxCode = /* jsx */ `
export const authProvider = {
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => { throw new Error("Not implemented"); },
    check: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const AppTsxWithAuthProvider = /* jsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const AuthProviderTsxWithCheckMethod = /* jsx */ `
export const authProvider = {
    check: async () => {
      const token = localStorage.getItem("my_access_token");

      return { authenticated: Boolean(token) };
    },
    login: async ({ email, password }) => { throw new Error("Not implemented"); },
    logout: async () => { throw new Error("Not implemented"); },
    onError: async (error) => { throw new Error("Not implemented"); },
    register: async (params) => { throw new Error("Not implemented"); },
    forgotPassword: async (params) => { throw new Error("Not implemented"); },
    updatePassword: async (params) => { throw new Error("Not implemented"); },
    getIdentity: async () => { throw new Error("Not implemented"); },
    getPermissions: async () => { throw new Error("Not implemented"); },
};
`.trim();

const AppTsxWithAuthenticatedComponent = /* jsx */ `
import { Refine, Authenticated } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<div>Not authenticated</div>}
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

// actions

// protecting-content actions

export const CreateAuthProviderFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "/src/providers/auth-provider.js": {
            code: AuthProviderTsxCode,
          },
        });
        sandpack.openFile("/src/providers/auth-provider.js");
        sandpack.setActiveFile("/src/providers/auth-provider.js");
      }}
      name="src/providers/auth-provider.js"
    />
  );
};

export const AddAuthProviderToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithAuthProvider);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const AddCheckMethodToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.js",
          AuthProviderTsxWithCheckMethod,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.js");
      }}
    />
  );
};

export const AddAuthenticatedComponentToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/App.jsx", AppTsxWithAuthenticatedComponent);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.jsx": {
    code: AppTsxWithAuthenticatedComponent,
    active: true,
  },
  "src/providers/auth-provider.js": {
    code: AuthProviderTsxWithCheckMethod,
  },
};
