"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/Sidebar/sidebar";

import { Folder, FileText } from "lucide-react";

// Convert string → actual icon
const icons = {
  folder: Folder,
  file: FileText,
};

type IconName = keyof typeof icons; // "folder" | "file"

export function NavUnits({ units }: { units: any[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Units</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {units.map((unit) => (
            <UnitCollapsible key={unit.title} unit={unit} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function UnitCollapsible({
  unit,
}: {
  unit: {
    icon: IconName;
    title: string;
    path: string;
    files: { icon: IconName; title: string; path: string }[];
    exercises?: { icon: IconName; title: string; path: string }[];
  };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [exOpen, setExOpen] = useState(false);

  const UnitIcon = icons[unit.icon];

  useEffect(() => {
    if (pathname.startsWith(unit.path)) {
      setOpen(true);
      if (pathname.includes("/exercises/")) setExOpen(true);
    }
  }, [pathname, unit.path]);

  return (
    <SidebarMenuItem data-state={open ? "open" : "closed"}>
      <SidebarMenuButton
        onClick={() => setOpen((prev) => !prev)}
        isActive={pathname.startsWith(unit.path)}
        className="cursor-pointer"
      >
        <UnitIcon />
        <span>{unit.title}</span>
      </SidebarMenuButton>

      {open && (
        <SidebarMenuSub>
          {unit.files?.map((file) => {
            const FileIcon = icons[file.icon];
            return (
              <SidebarMenuSubItem key={file.title}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname === file.path}
                >
                  <a href={file.path}>
                    <FileIcon />
                    {file.title}
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}

          {unit.exercises && (
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={() => setExOpen((p) => !p)}
                className="cursor-pointer"
                isActive={pathname.includes("/exercises/")}
              >
                📂 Exercises
              </SidebarMenuSubButton>

              {exOpen && (
                <SidebarMenuSub>
                  {unit.exercises.map((ex) => {
                    const ExIcon = icons[ex.icon];
                    return (
                      <SidebarMenuSubItem key={ex.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === ex.path}
                        >
                          <a href={ex.path}>
                            <ExIcon />
                            {ex.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              )}
            </SidebarMenuSubItem>
          )}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
