/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars} */
module.exports = {
  mainSidebar: [
    // Getting Started
    {
      type: "category",
      label: "Getting Started",
      className: "category-as-header",
      items: [
        "getting-started/overview",
        "getting-started/quickstart",
        {
          type: "link",
          href: "/tutorial/essentials/intro",
          label: "Tutorial",
        },
        {
          type: "link",
          href: "https://s.refine.dev/examples",
          label: "Examples",
          customProps: {
            external: true,
          },
        },
        {
          type: "link",
          href: "https://refine.dev/templates",
          label: "Templates",
          customProps: {
            external: true,
          },
        },
      ],
    },
    // Guides & Concepts
    {
      type: "category",
      label: "Guides & Concepts",
      className: "category-as-header",
      items: [
        "guides-concepts/general-concepts/index",
        "guides-concepts/data-fetching/index",
        "guides-concepts/forms/index",
        "guides-concepts/tables/index",
        "guides-concepts/routing/index",
        "guides-concepts/authentication/index",
        "guides-concepts/authorization/index",
        "guides-concepts/ui-libraries/index",
        "guides-concepts/notifications/index",
        "guides-concepts/realtime/index",
        "guides-concepts/audit-logs/index",
        "guides-concepts/import-export/index",
        "guides-concepts/i18n/index",
        "guides-concepts/deployment/index",
        {
          type: "category",
          label: "Advanced Tutorials",
          link: {
            type: "generated-index",
            title: "Advanced Tutorials",
            slug: "/advanced-tutorials",
          },
          items: [
            "advanced-tutorials/access-control",
            {
              type: "category",
              label: "Auth",
              items: ["advanced-tutorials/auth/auth0"],
            },
            "advanced-tutorials/custom-layout",
            {
              type: "category",
              label: "Data Provider",
              items: ["advanced-tutorials/data-provider/handling-filters"],
            },
            {
              type: "category",
              label: "Form",
              items: ["advanced-tutorials/forms/custom-form-validation"],
            },
            "advanced-tutorials/real-time",
            "advanced-tutorials/multi-level-menu/multi-level-menu",
            "advanced-tutorials/mutation-mode",
            {
              type: "category",
              label: "Search",
              items: [
                "advanced-tutorials/search/list-search",
                "advanced-tutorials/search/search",
                "advanced-tutorials/search/table-search",
              ],
            },
            {
              type: "category",
              label: "Upload",
              items: [
                "advanced-tutorials/upload/base64-upload",
                "advanced-tutorials/upload/multipart-upload",
              ],
            },
          ],
        },
        "guides-concepts/development/index",
        "guides-concepts/faq/index",
      ],
    },
    // Core API
    {
      type: "category",
      label: "Core",
      className: "category-as-header",
      items: [
        {
          type: "doc",
          id: "core/refine-component/index",
          label: "<Refine>",
        },
        "core/interface-references/index",
      ],
    },
    // Data
    {
      type: "category",
      label: "Data",
      className: "category-as-header",
      items: [
        "data/data-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "data/hooks/use-show/index",
            "data/hooks/use-table/index",
            "data/hooks/use-form/index",
            "data/hooks/use-select/index",
            "data/hooks/use-invalidate/index",
            "data/hooks/use-list/index",
            "data/hooks/use-infinite-list/index",
            "data/hooks/use-one/index",
            "data/hooks/use-many/index",
            "data/hooks/use-create/index",
            "data/hooks/use-create-many/index",
            "data/hooks/use-update/index",
            "data/hooks/use-update-many/index",
            "data/hooks/use-delete/index",
            "data/hooks/use-delete-many/index",
            "data/hooks/use-custom/index",
            "data/hooks/use-custom-mutation/index",
            "data/hooks/use-data-provider/index",
            "data/hooks/use-api-url/index",
          ],
        },
        {
          type: "category",
          label: "Packages",
          items: [
            "data/packages/graphql/index",
            "data/packages/simple-rest/index",
            "data/packages/supabase/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: ["examples/data-provider/supabase"],
        },
      ],
    },
    // Router
    {
      type: "category",
      label: "Routing",
      className: "category-as-header",
      items: [
        "routing/router-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Integrations",
          items: ["routing/integrations/react-router/index"],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "routing/hooks/use-resource/index",
            "routing/hooks/use-go/index",
            "routing/hooks/use-back/index",
            "routing/hooks/use-parsed/index",
            "routing/hooks/use-link/index",
            "routing/hooks/use-get-to-path/index",
            "routing/hooks/use-navigation/index",
          ],
        },
      ],
    },
    // Authentication
    {
      type: "category",
      label: "Authentication",
      className: "category-as-header",
      items: [
        "authentication/auth-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Components",
          items: [
            "authentication/components/authenticated/index",
            "authentication/components/auth-page/index",
          ],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "authentication/hooks/use-is-authenticated/index",
            "authentication/hooks/use-on-error/index",
            "authentication/hooks/use-get-identity/index",
            "authentication/hooks/use-login/index",
            "authentication/hooks/use-logout/index",
            "authentication/hooks/use-permissions/index",
            "authentication/hooks/use-register/index",
            "authentication/hooks/use-forgot-password/index",
            "authentication/hooks/use-update-password/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: [
            "examples/auth-provider/auth0",
            "examples/auth-provider/google-auth",
            "examples/auth-provider/otpLogin",
          ],
        },
      ],
    },
    // Authorization
    {
      type: "category",
      label: "Authorization",
      className: "category-as-header",
      items: [
        "authorization/access-control-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Components",
          items: ["authorization/components/can-access/index"],
        },
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: ["authorization/hooks/use-can/index"],
        },
        {
          type: "category",
          label: "Examples",
          items: [
            "examples/access-control/casbin",
            "examples/access-control/cerbos",
            "examples/access-control/permify",
          ],
        },
      ],
    },
    // Realtime
    {
      type: "category",
      label: "Realtime",
      className: "category-as-header",
      items: [
        "realtime/live-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "realtime/hooks/use-publish/index",
            "realtime/hooks/use-subscription/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: ["examples/live-provider/ably"],
        },
      ],
    },
    // Notification
    {
      type: "category",
      label: "Notification",
      className: "category-as-header",
      items: [
        "notification/notification-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: ["notification/hooks/use-notification/index"],
        },
        {
          type: "category",
          label: "Examples",
          items: ["examples/notification-provider/react-toastify"],
        },
      ],
    },
    // i18n
    {
      type: "category",
      label: "I18n",
      className: "category-as-header",
      items: [
        "i18n/i18n-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "i18n/hooks/use-get-locale/index",
            "i18n/hooks/use-set-locale/index",
            "i18n/hooks/use-translate/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: ["examples/i18n/i18n-react"],
        },
      ],
    },
    // Audit Logs
    {
      type: "category",
      label: "Audit Logs",
      className: "category-as-header",
      items: [
        "audit-logs/audit-log-provider/index",
        {
          type: "category",
          collapsed: false,
          label: "Hooks",
          items: [
            "audit-logs/hooks/use-log/index",
            "audit-logs/hooks/use-log-list/index",
          ],
        },
        {
          type: "category",
          label: "Examples",
          items: [
            "examples/audit-log/audit-log-antd",
            "examples/audit-log/audit-log-provider",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Core Utilities",
      className: "category-as-header",
      items: [
        {
          type: "category",
          label: "Components",
          collapsed: false,
          items: [
            "core/components/auto-save-indicator/index",
            "core/components/inferencer/index",
          ],
        },
        {
          type: "category",
          label: "Hooks",
          collapsed: false,
          items: [
            "core/hooks/utilities/use-modal/index",
            "core/hooks/utilities/use-menu/index",
            "core/hooks/utilities/use-breadcrumb/index",
            "core/hooks/utilities/use-import/index",
            "core/hooks/utilities/use-export/index",
          ],
        },
      ],
    },
    // UI Integrations
    {
      type: "category",
      label: "UI Integrations",
      className: "category-as-header",
      items: [
        {
          type: "category",
          label: "Ant Design",
          collapsed: false,
          // className: "category-as-header",
          items: [
            "ui-integrations/ant-design/introduction/index",
            {
              type: "category",
              label: "Components",
              items: [
                "ui-integrations/ant-design/components/themed-layout/index",
                "ui-integrations/ant-design/components/auth-page/index",
                "ui-integrations/ant-design/components/breadcrumb/index",
                "ui-integrations/ant-design/components/filter-dropdown/index",
                "ui-integrations/ant-design/components/auto-save-indicator/index",
                "ui-integrations/ant-design/components/inferencer/index",
                // "ui-integrations/ant-design/components/custom-inputs/index", // This should be included in the guide
                {
                  type: "category",
                  label: "Basic Views",
                  items: [
                    "ui-integrations/ant-design/components/basic-views/create/index",
                    "ui-integrations/ant-design/components/basic-views/edit/index",
                    "ui-integrations/ant-design/components/basic-views/list/index",
                    "ui-integrations/ant-design/components/basic-views/show/index",
                  ],
                },
                {
                  type: "category",
                  label: "Buttons",
                  items: [
                    "ui-integrations/ant-design/components/buttons/clone-button/index",
                    "ui-integrations/ant-design/components/buttons/create-button/index",
                    "ui-integrations/ant-design/components/buttons/delete-button/index",
                    "ui-integrations/ant-design/components/buttons/edit-button/index",
                    "ui-integrations/ant-design/components/buttons/export-button/index",
                    "ui-integrations/ant-design/components/buttons/import-button/index",
                    "ui-integrations/ant-design/components/buttons/list-button/index",
                    "ui-integrations/ant-design/components/buttons/refresh-button/index",
                    "ui-integrations/ant-design/components/buttons/save-button/index",
                    "ui-integrations/ant-design/components/buttons/show-button/index",
                  ],
                },
                {
                  type: "category",
                  label: "Fields",
                  items: [
                    "ui-integrations/ant-design/components/fields/boolean-field/index",
                    "ui-integrations/ant-design/components/fields/date-field/index",
                    "ui-integrations/ant-design/components/fields/email-field/index",
                    "ui-integrations/ant-design/components/fields/file-field/index",
                    "ui-integrations/ant-design/components/fields/image-field/index",
                    "ui-integrations/ant-design/components/fields/markdown-field/index",
                    "ui-integrations/ant-design/components/fields/number-field/index",
                    "ui-integrations/ant-design/components/fields/tag-field/index",
                    "ui-integrations/ant-design/components/fields/text-field/index",
                    "ui-integrations/ant-design/components/fields/url-field/index",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Hooks",
              items: [
                "ui-integrations/ant-design/hooks/use-table/index",
                "ui-integrations/ant-design/hooks/use-editable-table/index",
                "ui-integrations/ant-design/hooks/use-simple-list/index",
                "ui-integrations/ant-design/hooks/use-form/index",
                "ui-integrations/ant-design/hooks/use-drawer-form/index",
                "ui-integrations/ant-design/hooks/use-modal-form/index",
                "ui-integrations/ant-design/hooks/use-steps-form/index",
                "ui-integrations/ant-design/hooks/use-select/index",
                "ui-integrations/ant-design/hooks/use-checkbox-group/index",
                "ui-integrations/ant-design/hooks/use-radio-group/index",
                "ui-integrations/ant-design/hooks/use-import/index",
                "ui-integrations/ant-design/hooks/use-modal/index",
              ],
            },
            {
              type: "category",
              label: "Examples",
              items: [
                "examples/authentication/antd",
                "examples/table/antd/useTable",
                "examples/table/antd/tableFilter",
                "examples/table/antd/useEditableTable",
                "examples/table/antd/advancedTable",
                "examples/table/antd/useUpdateMany",
                "examples/table/antd/useDeleteMany",
                "examples/form/antd/useForm",
                "examples/form/antd/useModalForm",
                "examples/form/antd/useDrawerForm",
                "examples/form/antd/useStepsForm",
                "examples/form/antd/custom-form-validation",
                "examples/form/antd/serverSideFormValidation",
                "examples/upload/antd/base64",
                "examples/upload/antd/multipart",
                "examples/import-export/antd",
                "examples/antd-calendar-example",
                "examples/customization/theme/customThemeAntd",
                "examples/themes/refine-themes-antd",
                "examples/storybook/antd-storybook",
              ],
            },
            "ui-integrations/ant-design/theming/index",
          ],
        },
      ],
    },
    // Packages
    {
      type: "category",
      label: "Packages",
      className: "category-as-header",
      items: [
        "packages/list-of-packages/index",
        "packages/cli/index",
        "packages/inferencer/index",
      ],
    },
    // Further Readings
    {
      type: "category",
      label: "Further Readings",
      className: "category-as-header",
      items: [
        "further-readings/testing",
        "further-readings/comparison",
        "further-readings/license",
      ],
    },
  ],
};