/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();

const redirectJson = require("./redirects.json");
const tutorialData = require("./tutorial-units");

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
  title: "Refine",
  tagline: "Build your React-based CRUD applications, without constraints",
  url: "https://refine.dev",
  baseUrl: "ithub-itday-april-refine/",
  projectName: "ithub-itday-april-refine",
  organizationName: "daslef",
  trailingSlash: true,
  favicon: "img/refine_favicon.svg",
  onBrokenLinks: "warn",
  scripts: [],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/refinedev/refine/tree/master/documentation",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          admonitions: {
            tag: ":::",
            keywords: [
              "additional",
              "note",
              "tip",
              "info-tip",
              "info",
              "caution",
              "danger",
              "sourcecode",
              "create-example",
              "simple",
            ],
          },
          exclude: ["**/**/_*.md"],
          remarkPlugins: [],
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/refine-theme/css/colors.css"),
            require.resolve("./src/refine-theme/css/fonts.css"),
            require.resolve("./src/refine-theme/css/custom.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/split-pane.css"),
            require.resolve("./src/css/demo-page.css"),
          ],
        },
        sitemap: {
          ignorePatterns: ["**/_*.md"],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: redirectJson.redirects,
        createRedirects(existingPath) {
          if (existingPath.includes("/api-reference/core/")) {
            return [
              existingPath.replace("/api-reference/core/", "/api-references/"),
            ];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
    [
      "docusaurus-plugin-copy",
      {
        id: "Copy Workers",
        path: "static/workers",
        context: "workers",
        include: ["**/*.{js}"],
      },
    ],
    async function tailwindcss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    "./plugins/docgen.js",
    "./plugins/examples.js",
    // "./plugins/intercom.js",
    // "./plugins/clarity.js",
    "./plugins/templates.js",
    "./plugins/example-redirects.js",
    "./plugins/tutorial-navigation.js",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorial",
        path: "tutorial",
        routeBasePath: "tutorial",
        sidebarPath: false,
        docLayoutComponent: "@theme/TutorialPage",
        docItemComponent: "@theme/TutorialItem",
        include: ["**/index.md"],
        admonitions: {
          tag: ":::",
          keywords: [
            "additional",
            "note",
            "tip",
            "info-tip",
            "info",
            "caution",
            "danger",
            "sourcecode",
            "create-example",
            "simple",
          ],
        },
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/vsDark"),
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-hidden",
          line: "hide-next-line",
          block: { start: "hide-start", end: "hide-end" },
        },
        {
          className: "theme-code-block-added-line",
          line: "added-line",
          block: { start: "added-start", end: "added-end" },
        },
        {
          className: "theme-code-block-removed-line",
          line: "removed-line",
          block: { start: "removed-start", end: "removed-end" },
        },
      ],
    },
    image: "img/refine_social.png",
    algolia: {
      appId: "KRR9VEUPCT",
      apiKey: "cd0188125dcd31fb4b011b5e536d963a",
      indexName: "refine",
      contextualSearch: true,
    },
    metadata: [
      {
        name: "keywords",
        content:
          "react-admin, react-framework, internal-tool, admin-panel, ant-design, material ui, mui",
      },
    ],
    navbar: {
      logo: {
        alt: "refine",
        src: "img/refine_logo.png",
      },
      items: [],
    },
    footer: {
      logo: {
        alt: "refine",
        src: "/img/refine_logo.png",
      },
      links: [
        {
          title: "Resources",
          items: [
            {
              label: "Getting Started",
              to: "docs",
            },
            {
              label: "Tutorials",
              to: "tutorial",
            },
          ],
        },
        {
          title: "Product",
          items: [
            {
              label: "Examples",
              to: "examples",
            },
            {
              label: "Integrations",
              to: "integrations",
            },
          ],
        },
        {
          title: "__LEGAL",
          items: [
            {
              label: "License",
              to: "https://github.com/refinedev/refine/blob/master/LICENSE",
            },
          ],
        },
        {
          title: "__SOCIAL",
          items: [
            {
              href: "https://github.com/refinedev/refine",
              label: "github",
            },
            {
              href: "https://discord.gg/refine",
              label: "discord",
            },
            {
              href: "https://reddit.com/r/refine",
              label: "reddit",
            },
          ],
        },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
    },
  },
  customFields: {
    /** Footer Fields */
    footerDescription:
      '<strong style="font-weight:700;">refine</strong> is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by <strong style="font-weight:700;">CRUD</strong> operations and provides industry standard solutions.',
    contactTitle: "Contact",
    contactDescription: [
      "Refine Development Inc.",
      "256 Chapman Road STE 105-4 Newark, DE 19702",
    ],
    contactEmail: "info@refine.dev",
    /** ---- */
    /** Live Preview */
    LIVE_PREVIEW_URL:
      process.env.LIVE_PREVIEW_URL ?? "http://localhost:3030/preview",
    /** ---- */
    tutorial: tutorialData,
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
};

module.exports = siteConfig;
