"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Folder, FileText } from "lucide-react"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub
} from "@/components/ui/sidebar"
import type { NavGroup as GroupType, NavItem } from "./types"

function IconFor(name: string) {
  return name === "folder" ? Folder : FileText
}

export function NavGroup({ title, items }: GroupType) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <RecursiveItem key={item.title} item={item} pathname={pathname} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function RecursiveItem({ item, pathname }: { item: NavItem; pathname: string }) {
  if (!item.items || item.items.length === 0) {
    const Icon = typeof item.icon === "string" ? IconFor(item.icon) : item.icon
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === item.url}>
          <Link href={item.url || "#"}>
            <Icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  const Icon = typeof item.icon === "string" ? IconFor(item.icon) : item.icon

  return (
    <Collapsible defaultOpen className="group">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <Icon />
            <span>{item.title}</span>
            <ChevronRight className="ms-auto transition-transform group-data-[state=open]:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <RecursiveItem key={sub.title} item={sub} pathname={pathname} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
