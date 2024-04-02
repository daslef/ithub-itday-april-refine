import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { useSandpack } from "@codesandbox/sandpack-react";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";
import { TutorialCreateFileButton } from "@site/src/refine-theme/tutorial-create-file-button";

import { dependencies } from "../../intro/sandpack";
import { finalFiles as initialFiles } from "../updating-data/sandpack";
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

const DataProviderWithGetListMethodTsCode = /* js */ `

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(\`\${API_URL}/\${resource}\`);

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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const DataProviderWithPaginationTsCode = /* js */ `

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
        params.append("_start", (pagination.current - 1) * pagination.pageSize);
        params.append("_end", pagination.current * pagination.pageSize);
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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const DataProviderWithSortingTsCode = /* ts */ `

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const DataProviderWithFilteringTsCode = /* js */ `

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = {
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
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
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
  getApiUrl: () => API_URL,
  deleteOne: () => { throw new Error("Not implemented"); },
  /* ... */
};
`.trim();

const BaseListProductsTsxCode = /* jsx */ `
export const ListProducts = () => {
  return (
    <div>
        <h1>Products</h1>
    </div>
  );
};
`.trim();

const ListProductsWithUseListTsxCode = /* jsx */ `
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({ resource: "products" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const ListProductsWithPaginationTsxCode = /* jsx */ `
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const ListProductsWithSortingTsxCode = /* jsx */ `
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const ListProductsWithFilteringTsxCode = /* jsx */ `
import { useList } from "@refinedev/core";

export const ListProducts = () => {
  const { data, isLoading } = useList({
    resource: "products",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data?.data?.map((product) => (
          <li key={product.id}>
            <p>
              {product.name}
              <br />
              Price: {product.price}
              <br />
              Material: {product.material}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const AppTsxWithListProductsCode = /* jsx */ `
import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowProduct } from "./pages/products/show";
import { EditProduct } from "./pages/products/edit";
import { ListProducts } from "./pages/products/list";

export default function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
    </Refine>
  );
}
`.trim();

// actions

export const AddGetListMethod = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.js",
          DataProviderWithGetListMethodTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.js");
      }}
    />
  );
};

export const CreateListProductsFile = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialCreateFileButton
      onClick={() => {
        sandpack.addFile({
          "src/pages/products/list.jsx": {
            code: BaseListProductsTsxCode,
          },
        });
        sandpack.openFile("/src/pages/products/list.jsx");
        sandpack.setActiveFile("/src/pages/products/list.jsx");
      }}
      name="src/pages/products/list.jsx"
    />
  );
};

export const AddUseListToListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.jsx",
          ListProductsWithUseListTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.jsx");
      }}
    />
  );
};

export const AddListProductsToAppTsx = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("/src/App.jsx", AppTsxWithListProductsCode);
        sandpack.setActiveFile("/src/App.jsx");
      }}
    />
  );
};

export const AddPaginationToGetList = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.js",
          DataProviderWithPaginationTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.js");
      }}
    />
  );
};

export const AddPaginationToListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.jsx",
          ListProductsWithPaginationTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.jsx");
      }}
    />
  );
};

export const AddSortingToGetList = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.js",
          DataProviderWithSortingTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.js");
      }}
    />
  );
};

export const AddSortingToListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.jsx",
          ListProductsWithSortingTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.jsx");
      }}
    />
  );
};

export const AddFiltersToGetList = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "/src/providers/data-provider.js",
          DataProviderWithFilteringTsCode,
        );
        sandpack.setActiveFile("/src/providers/data-provider.js");
      }}
    />
  );
};

export const AddFiltersToListProducts = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile(
          "src/pages/products/list.jsx",
          ListProductsWithFilteringTsxCode,
        );
        sandpack.setActiveFile("/src/pages/products/list.jsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/App.jsx": {
    code: AppTsxWithListProductsCode,
  },
  "src/providers/data-provider.js": {
    code: DataProviderWithFilteringTsCode,
  },
  "src/pages/products/list.jsx": {
    code: ListProductsWithFilteringTsxCode,
    active: true,
  },
};
