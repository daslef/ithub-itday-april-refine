"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2335],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(t),f=a,m=c["".concat(s,".").concat(f)]||c[f]||d[f]||l;return t?r.createElement(m,i(i({ref:n},u),{},{components:t})):r.createElement(m,i({ref:n},u))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=c;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<l;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},89362:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>s,default:()=>f,frontMatter:()=>o,metadata:()=>p,toc:()=>d});t(67294);var r=t(3905);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}const o={id:"handling-filters",title:"Handling Filters",sidebar_label:"Handling Filters"},s=void 0,p={unversionedId:"advanced-tutorials/handling-filters",id:"advanced-tutorials/handling-filters",title:"Handling Filters",description:"Refine expects an array of type CrudFilters to filter results based on some field\u2019s values. So you can use more than one filter. Even the or operator can be used to combine multiple filters.",source:"@site/docs/advanced-tutorials/handling-filters.md",sourceDirName:"advanced-tutorials",slug:"/advanced-tutorials/handling-filters",permalink:"/ithub-itday-april-refine/docs/advanced-tutorials/handling-filters",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/advanced-tutorials/handling-filters.md",tags:[],version:"current",frontMatter:{id:"handling-filters",title:"Handling Filters",sidebar_label:"Handling Filters"},sidebar:"mainSidebar",previous:{title:"Theming",permalink:"/ithub-itday-april-refine/docs/ui-integrations/ant-design/theming/"},next:{title:"Live / Realtime",permalink:"/ithub-itday-april-refine/docs/advanced-tutorials/real-time"}},u={},d=[{value:"CrudFilters",id:"crudfilters",level:2},{value:"LogicalFilters",id:"logicalfilters",level:2},{value:"ConditionalFilters",id:"conditionalfilters",level:2},{value:"Top level multiple conditional filters usage",id:"top-level-multiple-conditional-filters-usage",level:3},{value:"Combining Filters",id:"combining-filters",level:2},{value:"Handle filters in a data provider",id:"handle-filters-in-a-data-provider",level:2}],c={toc:d};function f(e){var{components:n}=e,t=i(e,["components"]);return(0,r.kt)("wrapper",l(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){a(e,n,t[n])}))}return e}({},c,t),{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Refine")," expects an array of type ",(0,r.kt)("inlineCode",{parentName:"p"},"CrudFilters")," to filter results based on some field\u2019s values. So you can use more than one filter. Even the ",(0,r.kt)("inlineCode",{parentName:"p"},"or")," operator can be used to combine multiple filters."),(0,r.kt)("h2",{id:"crudfilters"},"CrudFilters"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"CrudFilters")," is an array of objects with the following properties:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Supported operators:\ntype CrudOperators =\n  | "eq"\n  | "ne"\n  | "lt"\n  | "gt"\n  | "lte"\n  | "gte"\n  | "in"\n  | "nin"\n  | "contains"\n  | "ncontains"\n  | "containss"\n  | "ncontainss"\n  | "between"\n  | "nbetween"\n  | "null"\n  | "nnull"\n  | "or"\n  | "startswith"\n  | "nstartswith"\n  | "startswiths"\n  | "nstartswiths"\n  | "endswith"\n  | "nendswith"\n  | "endswiths"\n  | "nendswiths";\n\n// Supported filter types:\ntype LogicalFilter = {\n  field: string;\n  operator: Exclude<CrudOperators, "or">;\n  value: any;\n};\n\ntype ConditionalFilter = {\n  operator: "or";\n  value: LogicalFilter[];\n};\n\ntype CrudFilter = LogicalFilter | ConditionalFilter;\n//highlight-next-line\ntype CrudFilters = CrudFilter[];\n')),(0,r.kt)("h2",{id:"logicalfilters"},"LogicalFilters"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"LogicalFilter")," works with ",(0,r.kt)("inlineCode",{parentName:"p"},"AND")," logic. For example, if you want to filter by ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," field and ",(0,r.kt)("inlineCode",{parentName:"p"},"age")," field, you can use the following filter:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const filter = [\n  {\n    field: "name",\n    operator: "eq",\n    value: "John",\n  },\n  {\n    field: "age",\n    operator: "lt",\n    value: 30,\n  },\n];\n')),(0,r.kt)("p",null,"Here the query will look like: ",(0,r.kt)("inlineCode",{parentName:"p"},'"name" = "John" AND "age" < 30')),(0,r.kt)("h2",{id:"conditionalfilters"},"ConditionalFilters"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ConditionalFilter")," works ",(0,r.kt)("inlineCode",{parentName:"p"},"or")," / ",(0,r.kt)("inlineCode",{parentName:"p"},"and")," operator and expects an array of ",(0,r.kt)("inlineCode",{parentName:"p"},"LogicalFilter")," objects in the ",(0,r.kt)("inlineCode",{parentName:"p"},"value")," property. For example, if you want to filter multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"OR")," by ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," field and ",(0,r.kt)("inlineCode",{parentName:"p"},"age")," field, you can use the following filter:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const filter = [\n  {\n    operator: "or",\n    value: [\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "John Doe",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 30,\n          },\n        ],\n      },\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "JR.Doe",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 1,\n          },\n        ],\n      },\n    ],\n  },\n];\n')),(0,r.kt)("p",null,"Here the query will look like: ",(0,r.kt)("inlineCode",{parentName:"p"},'("name" = John Doe AND "age" = 30) OR ("name" = JR.Doe AND "age" = 1)')),(0,r.kt)("h3",{id:"top-level-multiple-conditional-filters-usage"},"Top level multiple conditional filters usage"),(0,r.kt)("p",null,"If you create multiple Conditional Filters at the top level, you must add a key to it. Otherwise, you will get a warning in the console and your filters may not be combined correctly."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const filter = [\n  {\n    key: "parent",\n    operator: "or",\n    value: [\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "John Doe",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 30,\n          },\n        ],\n      },\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "Jane Doe",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 28,\n          },\n        ],\n      },\n    ],\n  },\n  {\n    key: "children",\n    operator: "or",\n    value: [\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "JR John",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 1,\n          },\n        ],\n      },\n      {\n        operator: "and",\n        value: [\n          {\n            field: "name",\n            operator: "eq",\n            value: "JR Jane",\n          },\n          {\n            field: "age",\n            operator: "eq",\n            value: 2,\n          },\n        ],\n      },\n    ],\n  },\n];\n')),(0,r.kt)("h2",{id:"combining-filters"},"Combining Filters"),(0,r.kt)("p",null,"You can group multiple parameters in the same query using the logical filters or the conditional filters operators to filter results based on more than one criteria at the same time. This allows you to create more complex queries."),(0,r.kt)("p",null,"Example query: Find posts with 2 possible dates & a specific status"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'filter = [\n  {\n    operator: "or",\n    value: [\n      {\n        field: "createdAt",\n        operator: "eq",\n        value: "2022-01-01",\n      },\n      {\n        field: "createdAt",\n        operator: "eq",\n        value: "2022-01-02",\n      },\n    ],\n  },\n  {\n    operator: "eq",\n    field: "status",\n    value: "published",\n  },\n];\n')),(0,r.kt)("p",null,"Here the query will look like:",(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("inlineCode",{parentName:"p"},'"status" == "published" AND ("createdAt" == "2022-01-01" OR "createdAt" == "2022-01-02")')),(0,r.kt)("h2",{id:"handle-filters-in-a-data-provider"},"Handle filters in a data provider"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="dataProvider.ts"',title:'"dataProvider.ts"'},'import { DataProvider } from "@refinedev/core";\n\nconst dataProvider = (): DataProvider => ({\n  getList: async ({ resource, pagination, filters, sorters }) => {\n    if (filters) {\n      filters.map((filter) => {\n        if (\n          filter.operator !== "or" &&\n          filter.operator !== "and" &&\n          "field" in filter\n        ) {\n          // Handle your logical filters here\n          // console.log(typeof filter); // LogicalFilter\n        } else {\n          // Handle your conditional filters here\n          // console.log(typeof filter); // ConditionalFilter\n        }\n      });\n    }\n  },\n});\n')))}f.isMDXComponent=!0}}]);