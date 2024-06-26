import React from "react";
import { TutorialSandpack } from "@site/src/refine-theme/tutorial-sandpack";

export const Sandpack = ({ children }: { children: React.ReactNode }) => {
  return (
    <TutorialSandpack contentOnly dependencies={dependencies} files={files}>
      {children}
    </TutorialSandpack>
  );
};

const AppTsxCode = /* jsx */ `
import { Refine, WelcomePage } from "@refinedev/core";

export default function App() {
  return (
    <Refine>
      <WelcomePage />
    </Refine>
  );
};
`.trim();

const BaseAppTsxCode = /* jsx */ `
import App from "./src/App";

export default App;
`.trim();

export const files = {
  "src/App.jsx": {
    code: AppTsxCode,
    active: true,
  },
  "App.jsx": {
    code: BaseAppTsxCode,
    hidden: true,
  },
};

export const dependencies = {
  "@refinedev/core": "latest",
};
