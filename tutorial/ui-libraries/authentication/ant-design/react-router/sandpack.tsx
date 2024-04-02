import React from "react";
import { useSandpack } from "@codesandbox/sandpack-react";

import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";
import { TutorialUpdateFileButton } from "@site/src/refine-theme/tutorial-update-file-button";

import { finalFiles as initialFiles } from "@site/tutorial/ui-libraries/notifications/ant-design/react-router/sandpack";
import { dependencies } from "@site/tutorial/ui-libraries/intro/ant-design/react-router/sandpack";
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

const LoginTsxWithAuthPage = /* jsx */ `
import React from "react";
import { AuthPage } from "@refinedev/antd";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};
`.trim();

// actions

export const UseAuthPageInLogin = () => {
  const { sandpack } = useSandpack();

  return (
    <TutorialUpdateFileButton
      onClick={() => {
        sandpack.updateFile("src/pages/login.jsx", LoginTsxWithAuthPage);
        sandpack.setActiveFile("/src/pages/login.jsx");
      }}
    />
  );
};

// files

export const finalFiles = {
  ...removeActiveFromFiles(initialFiles),
  "src/pages/login.jsx": {
    code: LoginTsxWithAuthPage,
    active: true,
  },
};
