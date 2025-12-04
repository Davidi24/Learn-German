import { getAllUnits } from "@/lib/getNewWords"
import type { SidebarData } from "@/components/layout/types"

function normalize(p: string) {
  let u = p.replace(/\\/g, "/")
  if (!u.startsWith("/")) u = "/" + u
  return u.replace(/\.(json|txt|md)$/, "")
}

function buildNav(node: any): any {
  if (node.type === "file") {
    return {
      title: node.name.replace(/\.(json|txt|md)$/, ""),
      icon: "file",
      url: normalize(node.path)
    }
  }

  return {
    title: node.name,
    icon: "folder",
    items: node.children ? node.children.map(buildNav) : []
  }
}

export async function loadSidebarData(): Promise<SidebarData> {
  const raw = getAllUnits()

  return {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://avatar.vercel.sh/john"
    },
    teams: [
      {
        name: "AILand",
        logo: "folder",
        plan: "Pro"
      }
    ],
    navGroups: [
      {
        title: "Units",
        items: raw.map(buildNav)
      }
    ]
  }
}
