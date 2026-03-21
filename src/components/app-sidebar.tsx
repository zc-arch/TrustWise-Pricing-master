"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquareText,
  FileText,
  Network,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"

const navItems = [
  {
    title: "仪表盘",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "数据概览与价格趋势",
  },
  {
    title: "价格预测知识图谱",
    url: "/yihua-code-graph",
    icon: Network,
    description: "市场资讯、企业经验、制度规则知识库",
  },
  {
    title: "Agent 决策助手",
    url: "/agent-chat",
    icon: MessageSquareText,
    description: "智能采购决策支持",
  },
  {
    title: "采购报告",
    url: "/reports",
    icon: FileText,
    description: "历史报告与数据分析",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" />}
            >
              <Logo size="md" showText={true} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>导航菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url || pathname.startsWith(item.url + "/")}
                    tooltip={item.description}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" className="text-xs text-muted-foreground">
              <span>© 2024 Sulfur Agent</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
