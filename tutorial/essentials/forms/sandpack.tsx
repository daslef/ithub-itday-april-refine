import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../intro/sandpack";
import { finalFiles as initialFiles } from "../data-fetching/listing-data/sandpack";
import { removeActiveFromFiles } from "@site/src/utils/remove-active-from-files";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack
      showFiles={true}
      dependencies={dependencies}
      files={files}
      finalFiles={finalFiles}
    >
      {children}
    </TutorialSandpack>
  );
};

// updates

const StylesCssCode = /* css */ `
body {
    font-family: sans-serif;
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}

form input,
form textarea,
form button,
form select {
    display: block;
    margin-bottom: 12px;
}
`.trim();

const DataProviderWithCreateMethodTsCode = /* js */ `
const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  create: async ({ resource, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize);
      params.append("_end", pagination.current * pagination.pageSize);
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
      params.append("_order", sorters.map((sorter) => sorter.order).join(","));
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value);
        }
      });
    }

    const response = await fetch(\`\${API_URL}/\${resource}?\${params.toString()}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return {
      data,
      total: 0,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}/\${id}\`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseCreateProductFormTsxCode = /* jsx */ `
export const CreateProduct = () => {
    return <h1>hello world!</h1>;
};
`.trim();

const AppTsxWithCreateProductCode = /* jsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      {/* <ListProducts /> */}
      <CreateProduct />
    </Refine>
  );
}
`.trim();

const CreateProductFormWithFieldsTsxCode = /* jsx */ `
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({ action: "create", resource: "products" });

  const onSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    onFinish(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="description">Description</label>
      <textarea id="description" name="description" />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />

      <label htmlFor="material">Material</label>
      <input type="text" id="material" name="material" />

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const CreateProductFormWithPriceUpdateTsxCode = /* jsx */ `
import { useForm } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({ action: "create", resource: "products" });

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

      <label htmlFor="category">Category ID</label>
      <input type="number" id="category" name="category" />

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
`.trim();

const CreateProductFormWithCategoryRelationTsxCode = /* jsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "products",
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

const AppTsxWithEditProductCode = /* jsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";
import { CreateProduct } from "./pages/products/create";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      <EditProduct />
      {/* <ListProducts /> */}
      {/* <CreateProduct /> */}
    </Refine>
  );
}
`.trim();

const RefactorEditProductTsxWithFormCode = /* jsx */ `
import { useForm, useSelect } from "@refinedev/core";

export const EditProduct = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    action: "edit",
    resource: "products",
    id: "123"
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
          <option key={option.value} value={option.value}
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

// actions

export const AddCreateMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.js",
          DataProviderWithCreateMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.js");
      }}
    />
  );
};

export const CreateCreateProductFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      name="src/pages/products/create.jsx"
      onClick={() => {
        sandpack.addFile({
          "src/pages/products/create.jsx": {
            code: BaseCreateProductFormTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/create.jsx");
        sandpack.setActiveFile("/src/pages/products/create.jsx");
      }}
    />
  );
};

export const AddCreateProductToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithCreateProductCode);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const AddUseFormToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.jsx",
          CreateProductFormWithFieldsTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.jsx");
      }}
    />
  );
};

export const AddPriceUpdateToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.jsx",
          CreateProductFormWithPriceUpdateTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.jsx");
      }}
    />
  );
};

export const AddCategoryRelationToCreateProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/create.jsx",
          CreateProductFormWithCategoryRelationTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/create.jsx");
      }}
    />
  );
};

export const MountEditProductInAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithEditProductCode);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const RefactorToUseFormInEditProduct = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/edit.jsx",
          RefactorEditProductTsxWithFormCode,
        );
        sandpack.setActiveFile("/src/pages/products/edit.jsx");
      }}
    />
  );
};

// files

export const files = {
  ...initialFiles,
  "styles.css": {
    code: StylesCssCode,
    hidden: true,
  },
};

export const finalFiles = {
  ...removeActiveFromFiles(files),
  "src/App.jsx": {
    code: AppTsxWithEditProductCode,
  },
  "src/providers/data-provider.js": {
    code: DataProviderWithCreateMethodTsCode,
  },
  "src/pages/products/edit.jsx": {
    code: RefactorEditProductTsxWithFormCode,
    active: true,
  },
  "src/pages/products/create.jsx": {
    code: CreateProductFormWithCategoryRelationTsxCode,
  },
};
