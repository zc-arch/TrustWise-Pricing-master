"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/user-dropdown"
import { Logo } from "@/components/logo"

export function TopNav() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Mobile menu trigger & Sidebar toggle */}
      <SidebarTrigger className="-ml-1" />

      {/* Page title area */}
      <div className="flex-1 flex items-center gap-3">
        <Logo size="sm" showText={false} />
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          硫磺价格预测与决策辅助系统
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8"
          title={resolvedTheme === "dark" ? "切换浅色模式" : "切换深色模式"}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">切换主题</span>
        </Button>

        {/* User menu */}
        <UserDropdown />
      </div>
    </header>
  )
}
