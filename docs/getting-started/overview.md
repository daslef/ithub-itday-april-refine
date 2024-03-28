---
title: Overview
slug: /
displayed_sidebar: mainSidebar
---

## What is Refine?

**Refine** is a React meta-framework for CRUD-heavy web applications. It addresses a wide range of enterprise use cases including internal tools, admin panels, dashboards and B2B apps.

Refine's core hooks and components streamline the development process by offering industry-standard solutions for crucial aspects of a project, including **authentication**, **access control**, **routing**, **networking**, **state management**, and **i18n**.

Refine's headless architecture enables the building of highly customizable applications by decoupling business logic from UI and routing. This allows integration with:

- Any custom designs or UI frameworks like [TailwindCSS](https://tailwindcss.com/), along with built-in support for [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/).

- Various platforms, including Next.js, Remix, React Native, Electron, etc., by a simple routing interface without the need for additional setup steps.

## Why Refine?

Within the broad spectrum of development approaches, Refine occupies a unique sweet spot between “starting from scratch” with traditional development method and low-code/no-code solutions. With their respective initial pros at the beginning of development, both of the two extreme approaches may present long-term risks:

Despite offering the ultimate level flexibility, “Starting from scratch” method is likely to cause

- Project delays
- Technical debt
- Maintenance problems
- Lack of development and security best practices
- A polluted codebase
- And lack of standardization across teams

Low/no-code solutions address this shortcoming but create a new set of challenges such as

- Vendor lock-in
- Lack of customization & styling options
- Poor developer experience
- And limited support for complex use-cases

Offering the best from both worlds, Refine mitigates all risks of “from scratch” development without compromising from flexibility, agility and open technologies.

## Overview of the Refine structure

import { MUIExample } from './example/mui';

<MUIExample />

<br/>

import { MUISandpack } from './example/sandpack';

<MUISandpack />

## Use cases

**Refine** shines when it comes to _data-intensive_ applications like _admin panels_, _dashboards_ and _internal tools_.

<a href="https://refine.dev/templates/">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/diagram-3.png" alt="Refine diagram" />
</a>

## Key Features

- Refine Devtools - dive deeper into your app and provide useful insights
- Connectors for **15+ backend services** including [REST API](https://github.com/refinedev/refine/tree/master/packages/simple-rest), [GraphQL](https://github.com/refinedev/refine/tree/master/packages/graphql), [NestJs CRUD](https://github.com/refinedev/refine/tree/master/packages/nestjsx-crud), [Airtable](https://github.com/refinedev/refine/tree/master/packages/airtable), [Strapi](https://github.com/refinedev/refine/tree/master/packages/strapi), [Strapi v4](https://github.com/refinedev/refine/tree/master/packages/strapi-v4), [Supabase](https://github.com/refinedev/refine/tree/master/packages/supabase), [Hasura](https://github.com/refinedev/refine/tree/master/packages/hasura), [Appwrite](https://github.com/refinedev/refine/tree/master/packages/appwrite), [Firebase](https://firebase.google.com/), [Nestjs-Query](https://github.com/refinedev/refine/tree/master/packages/nestjs-query) and [Directus](https://directus.io/).
- SSR support with Next.js & Remix and Advanced routing with any router library of your choice
- Auto-generation of CRUD UIs based on your API data structure
- Perfect state management & mutations with React Query
- Providers for seamless authentication and access control flows
- Out-of-the-box support for live / real-time applications
- Easy audit logs & document versioning

## Comparison

- ✅ &nbsp;1st-class, built-in, and ready to use with no added configuration or code
- 🟡 &nbsp;Supported, but as an unofficial 3rd party or community library/contribution
- 🔶 &nbsp;Supported and documented, but requires extra user-code to implement
- 🛑 &nbsp;Not officially supported or documented.

| Features                             | Refine                                                                                               | React-Admin                                | AdminBro                         | Retool              | Redwood                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------- | ------------------- | ----------------------------------------------------- |
| GitHub Stars                         | [![][stars-refine]][gh-refine]                                                                       | [![][stars-react-admin]][gh-react-admin]   | [![][stars-adminjs]][gh-adminjs] | -                   | [![][stars-redwood]][gh-redwood]                      |
| Bundle Size                          | [![][bp-refine]][bpl-refine]                                                                         | [![][bp-react-admin]][bpl-react-admin]     | [![][bp-adminjs]][bpl-adminjs]   | -                   | [![][bp-redwood]][bpl-redwood]                        |
| Pricing                              | Open Source                                                                                          | Open Source / Enterprise Edition           | Open Source                      | SaaS                | Open Source                                           |
| Platform                             | React                                                                                                | React                                      | Node.js - React                  | Cloud / Self-hosted | React - Node                                          |
| Supported UI Frameworks              | **Ant Design, Material UI, Tailwind, Mantine, Chakra UI, anything...**                               | Material UI                                | Own UIs                          | Own UIs             | Tailwind, Chakra, Mantine, WindiCSS and custom styles |
| Headless                             | **Yes**                                                                                              | No                                         | No                               | No                  | No                                                    |
| Access Control                       | **RBAC, ACL, ABAC, etc.**                                                                            | RBAC                                       | RBAC                             | RBAC                | RBAC                                                  |
| SSR Support                          | **Yes** Next.js & Remix                                                                              | No                                         | No                               | No                  | No                                                    |
| Live/Realtime                        | Yes with two mode `auto` and `manual`                                                                | Yes - just Immediately(Enterprise Edition) | No                               | No                  | Yes, with api/webhooks                                |
| Audit Log                            | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | No                               | Yes                 | Yes                                                   |
| State Management                     | React Query                                                                                          | React Query                                | Redux                            | -                   | Apollo GraphQL                                        |
| Routing                              | React Router, Next.js, Remix or Any Routing Library                                                  | React Router                               | React Router                     | -                   | @redwoodjs/router                                     |
| Devtools                             | Yes - [Refine Devtools](https://github.com/refinedev/refine/blob/master/packages/devtools/README.md) | No                                         | No                               | No                  | Storybook, Pino, Jest                                 |
| Command Palette[\*][command-palette] | ✅                                                                                                   | 🛑                                         | 🛑                               | 🛑                  | 🛑                                                    |
| Own Advanced Tutorial Examples       | Yes - **110+** Examples                                                                              | Yes - Few Examples                         | No                               | No                  | Yes, Divided in Chapters                              |
| Architecture                         | **Hooks Based**                                                                                      | Component Based                            | Hooks Based                      | -                   | Component Based                                       |
| Dynamic Multi-level Menus            | **Yes**                                                                                              | No                                         | No                               | -                   | No                                                    |
| Project Creator CLI                  | ✅                                                                                                   | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Project CLI                          | ✅                                                                                                   | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Auth Provider                        | ✅                                                                                                   | ✅                                         | ✅                               | ✅                  | ✅                                                    |
| Data Provider                        | ✅                                                                                                   | ✅                                         | 🔶                               | ✅                  | ✅                                                    |
| i18n                                 | ✅                                                                                                   | ✅                                         | ✅                               | -                   | ✅                                                    |
| Router Provider                      | ✅                                                                                                   | 🛑                                         | 🛑                               | -                   | ✅                                                    |
| Notification Provider                | ✅                                                                                                   | 🛑                                         | 🛑                               | -                   | ✅                                                    |
| GraphQL Support                      | ✅                                                                                                   | 🔶                                         | 🟡                               | ✅                  | ✅                                                    |
| Customization                        | ✅                                                                                                   | 🔶                                         | 🔶                               | 🛑                  | 🔶                                                    |
| Basic Form                           | ✅                                                                                                   | ✅                                         | ✅                               | ✅                  | ✅                                                    |
| Editable Table                       | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | ✅                                                    |
| Tree Select                          | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | 🛑                  | 🛑                                                    |
| Markdown                             | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | 🔶                                                    |
| Calendar                             | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | 🛑                                                    |
| Caching                              | ✅                                                                                                   | ✅                                         | 🛑                               | 🛑                  | ✅                                                    |
| API Caching                          | ✅                                                                                                   | 🛑                                         | 🛑                               | 🛑                  | ✅                                                    |
| Multi Level Menu                     | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🟡                               | ✅                  | 🛑                                                    |
| Typescript                           | ✅                                                                                                   | ✅                                         | ✅                               | -                   | ✅                                                    |
| Modal Form                           | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | ✅                  | ✅                                                    |
| Drawer Form                          | ✅                                                                                                   | 🔶                                         | 🛑                               | 🛑                  | 🛑                                                    |
| Step Form                            | ✅                                                                                                   | ✅ &nbsp;Enterprise Edition                | 🛑                               | 🛑                  | 🛑                                                    |
| Theming                              | ✅                                                                                                   | ✅                                         | 🔶                               | ✅                  | 🔶                                                    |
| CSV Import/Export                    | ✅                                                                                                   | 🟡                                         | 🟡                               | ✅                  | 🛑                                                    |

## License

**Refine** is licensed under the MIT License. It only requires the preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

### Permissions

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

### Limitations

- ❌ Liability
- ❌ Warranty

### MIT License

Copyright (c) 2021 Refine Development Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<!-- -->

[stars-refine]: https://img.shields.io/github/stars/refinedev/refine?label=%F0%9F%8C%9F
[gh-refine]: https://github.com/refinedev/refine
[bpl-refine]: https://bundlephobia.com/result?p=@refinedev/core
[bp-refine]: https://badgen.net/bundlephobia/minzip/@refinedev/core?label=💾
[command-palette]: https://github.com/refinedev/refine/tree/master/examples/command-palette-kbar

<!-- -->

[stars-react-admin]: https://img.shields.io/github/stars/marmelab/react-admin?label=%F0%9F%8C%9F
[gh-react-admin]: https://github.com/marmelab/react-admin
[bpl-react-admin]: https://bundlephobia.com/result?p=react-admin
[bp-react-admin]: https://badgen.net/bundlephobia/minzip/react-admin?label=💾

<!-- -->

[adminjs]: https://adminbro.com/index.html
[stars-adminjs]: https://img.shields.io/github/stars/SoftwareBrothers/adminjs?label=%F0%9F%8C%9F
[gh-adminjs]: https://github.com/SoftwareBrothers/adminjs
[bpl-adminjs]: https://bundlephobia.com/result?p=admin-bro
[bp-adminjs]: https://badgen.net/bundlephobia/minzip/admin-bro?label=💾

<!-- -->

[stars-redwood]: https://img.shields.io/github/stars/redwoodjs/redwood?label=%F0%9F%8C%9F
[gh-redwood]: https://github.com/redwoodjs/redwood
[bpl-redwood]: https://bundlephobia.com/result?p=@redwoodjs/core
[bp-redwood]: https://badgen.net/bundlephobia/minzip/@redwoodjs/core?label=💾
