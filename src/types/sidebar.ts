import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: string;
  items?: NavItem[];
  label?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};

export type Team = {
  name: string;
  logo: ReactNode;
  plan: string;
};

export type SidebarData = {
  user: User;
  teams: Team[];
  navGroups: NavGroup[];
};
