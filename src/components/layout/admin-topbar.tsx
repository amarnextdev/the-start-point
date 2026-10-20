"use client"

import { useState } from "react"
import { LogOut, Menu } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getInitials } from "@/lib/utils"
import type { StaffRole } from "@/types"

import { AdminNavLinks } from "./admin-sidebar"
import { Logo } from "./logo"

type AdminUser = { name: string; email: string; role: StaffRole }

export function AdminTopbar({ user }: { user: AdminUser }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="soft" size="icon" className="rounded-xl lg:hidden" aria-label="Open navigation">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-none bg-sidebar text-white">
            <SheetHeader>
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <Logo href="/admin" inverted subtitle="Admin" />
            </SheetHeader>
            <div className="px-4">
              <AdminNavLinks role={user.role} onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span className="size-2 rounded-full bg-saffron" aria-hidden />
          {user.role === "owner" ? "Owner" : "Staff"} account
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-3 rounded-full p-1 pr-3 outline-none hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50"
            aria-label="Account menu"
          >
            <Avatar>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-semibold sm:inline">{user.name}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Sign-out is wired to the session in phase 4 */}
          <DropdownMenuItem variant="destructive">
            <LogOut /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
