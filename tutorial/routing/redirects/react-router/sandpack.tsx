import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { dependencies } from "../../intro/react-router/sandpack";
import { finalFiles as initialFiles } from "../../inferring-parameters/react-router/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showNavigator
      dependencies={dependencies}
      files={initialFiles}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const EditProductWithCustomRedirect = /* jsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    redirect: "show",
  });

  const record = queryResult.data?.data;

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={record?.description}
      />

      <label htmlFor="price">Price</label>
      <input
        type="text"
        id="price"
        name="price"
        pattern="\\d*\.?\\d*"
        defaultValue={record?.price}
      />

      <label htmlFor="material">Material</label>
      <input
        type="text"
        id="material"
        name="material"
        defaultValue={record?.material}
      />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={record?.category.id == option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const CreateProductWithCustomRedirect = /* jsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    redirect: "edit",
  });

  const { options } = useSelect({
    resource: "categories",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" step=".01" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const AuthProviderWithRedirects = /* jsx */ `
export const authProvider = {
  onError: async (error) => {
    if (error?.status === 401) {
      return {
        logout: true,
        error: { message: "Unauthorized" },
      };
    }

    return {};
  },
  getIdentity: async () => {
    const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
      headers: {
        Authorization: localStorage.getItem("my_access_token"),
      },
    });

    if (response.status < 200 || response.status > 299) {
      return null;
    }

    const data = await response.json();

    return data;
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    return { success: true, redirectTo: "/login" };
  },
  login: async ({ email, password }) => {
    const response = await fetch(
      "https://api.fake-rest.refine.dev/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("my_access_token", data.token);
      return { success: true, redirectTo: "/" };
    }

    return { success: false };
  },
  check: async () => {
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  // optional methods
  register: async (params) => {
    throw new Error("Not implemented");
  },
  forgotPassword: async (params) => {
    throw new Error("Not implemented");
  },
  updatePassword: async (params) => {
    throw new Error("Not implemented");
  },
  getPermissions: async () => {
    throw new Error("Not implemented");
  },
};
`.trim();

// actions

export const AddCustomRedirectToEdit = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/edit.jsx",
          EditProductWithCustomRedirect,
        );
        sandpack.setActiveFile("/src/pages/products/edit.jsx");
      }}
    />
  );
};

export const AddCustomRedirectToCreate = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.jsx",
          CreateProductWithCustomRedirect,
        );
        sandpack.setActiveFile("/src/pages/products/create.jsx");
      }}
    />
  );
};

export const AddRedirectsToAuthProvider = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/auth-provider.js",
          AuthProviderWithRedirects,
        );
        sandpack.setActiveFile("/src/providers/auth-provider.js");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/pages/products/edit.jsx": {
    code: EditProductWithCustomRedirect,
  },
  "src/pages/products/create.jsx": {
    code: CreateProductWithCustomRedirect,
  },
  "src/providers/auth-provider.js": {
    code: AuthProviderWithRedirects,
    active: true,
  },
};
