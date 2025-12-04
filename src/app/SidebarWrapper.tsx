"use server";

import { loadSidebarData } from "../data/sidebardata";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default async function SidebarWrapper() {
  const data = await loadSidebarData();
  return <AppSidebar data={data} />;
}
