"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/Sidebar/sidebar";
import { NavUser } from "./nav-user";
import { NavUnits } from "./nav-units";

type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  units: Array<{
    title: string;
    icon: string;
    path: string;
    files: Array<{
      title: string;
      icon: string | null;
      path: string;
    }>;
    exercises: Array<{
      title: string;
      icon: string | null;
      path: string;
    }>;
  }>;
};

export function AppSidebar({ data }: { data: SidebarData }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavUnits units={data.units} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
