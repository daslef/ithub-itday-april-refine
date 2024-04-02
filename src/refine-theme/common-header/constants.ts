import {
  DocumentsIcon,
  TutorialIcon,
  ExamplesIcon,
  RefineWeekIcon,
} from "../icons/popover";

export type NavbarPopoverItemType = {
  isPopover: true;
  label: string;
  items: {
    label: string;
    description: string;
    link: string;
    icon: React.FC;
  }[];
};

export type NavbarItemType = {
  isPopover?: false;
  label: string;
  icon?: React.FC;
  href?: string;
};

export type MenuItemType = NavbarPopoverItemType | NavbarItemType;

export const MENU_ITEMS: MenuItemType[] = [
  {
    isPopover: true,
    label: "Navigation",
    items: [
      {
        label: "Documentation",
        description: "Everything you need to get started.",
        link: "/docs/",
        icon: DocumentsIcon,
      },
      {
        label: "Tutorial",
        description: "Create your first Refine application.",
        link: "/tutorial/essentials/intro",
        icon: TutorialIcon,
      },
      {
        label: "Templates",
        description: "Ready-made examples for your project",
        link: "/templates",
        icon: ExamplesIcon,
      },
      {
        label: "RefineWeek",
        description: "Weekly projects to practice refine.",
        link: "/week-of-refine",
        icon: RefineWeekIcon,
      },
    ],
  }
];
