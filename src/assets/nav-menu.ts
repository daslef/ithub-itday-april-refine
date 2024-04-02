import { NavMenu } from "../types/nav-menu";
import {
  DocumentsIcon,
  IntegrationsIcon,
  TutorialIcon,
  ExamplesIcon,
} from "./popover-icons";

export const POPOVERMENUS: NavMenu[] = [
  {
    label: "Navigation",
    items: [
      {
        label: "Documents",
        description: "Everything you need to get started",
        link: "/docs/",
        icon: DocumentsIcon,
      },
      {
        label: "Integrations",
        description: "Discover the Refine ecosystem",
        link: "/integrations",
        icon: IntegrationsIcon,
      },
      {
        label: "Tutorial",
        description: "Your first Refine application",
        link: "/tutorial/essentials/intro",
        icon: TutorialIcon,
      },
      {
        label: "Templates",
        description: "Ready-made examples for your project",
        link: "/templates",
        icon: ExamplesIcon,
      },
    ],
    imageLink: "https://github.com/refinedev/refine",
    imageURL:
      "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing/popovers/open-source.png",
  },
];
