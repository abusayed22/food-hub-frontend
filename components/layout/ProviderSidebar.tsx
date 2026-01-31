// components/provider-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Store 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/settings" },
  { icon: ClipboardList, label: "Orders", href: "/dashboard/order-management", badge: "12" }, // Example badge
  { icon: UtensilsCrossed, label: "Menu Management", href: "/dashboard/menu-management" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
]

export function ProviderSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-zinc-950 text-white">
      
      {/* 1. BRAND LOGO AREA */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#C0A975] font-serif font-bold text-black">
          É
        </div>
        <span className="text-xl font-serif font-bold tracking-widest text-[#C0A975]">
          PARTNER
        </span>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#C0A975]/10 text-[#C0A975]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-[#C0A975]" : "text-zinc-500 group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#C0A975] px-1.5 text-[10px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 3. BOTTOM ACTIONS (Settings & User) */}
      <div className="border-t border-white/10 bg-zinc-900/50 p-4">
        <nav className="space-y-1 mb-4">
          <Link
            href="http://localhost:3000/dashboard/providerId"
            className={cn(
              "group flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === "/admin/settings"
                ? "bg-[#C0A975]/10 text-[#C0A975]"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <button className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm font-medium text-zinc-400 transition-colors hover:bg-red-900/10 hover:text-red-400">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>

        <Separator className="bg-white/10 mb-4" />

        {/* User Profile Snippet */}
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 border border-white/10 text-[#C0A975]">
             <Store size={16} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-white">Le Bernardin</span>
            <span className="truncate text-xs text-zinc-500">Provider ID: #8821</span>
          </div>
        </div>
      </div>
    </aside>
  )
}