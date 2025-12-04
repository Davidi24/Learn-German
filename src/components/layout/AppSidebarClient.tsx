"use client";
import { AppSidebar } from "./app-sidebar";
import type { SidebarData } from "./types";

export function AppSidebarClient({ data }: { data: SidebarData }) {
  return <AppSidebar data={data} />;
}
