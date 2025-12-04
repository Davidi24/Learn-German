export type NavItem = {
  title: string
  icon: React.ElementType | string
  url?: string
  items?: NavItem[]
}

export type NavGroup = {
  title: string
  items: NavItem[]
}

export type SidebarData = {
  user: {
    name: string
    email: string
    avatar: string
  }
  teams: {
    name: string
    logo: string
    plan: string
  }[]
  navGroups: NavGroup[]
}
