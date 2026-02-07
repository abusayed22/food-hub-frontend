"use client"

import Link from "next/link"
import {
    User as UserIcon,
    ShoppingBag,
    LayoutDashboard
} from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLogout } from "@/hooks/sign-out"

// Match this interface with your User type
interface UserData {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
}

interface UserNavProps {
    user: UserData;
}

export function UserNav({ user }: UserNavProps) {

const {logout,isLoading:logoutLoading} = useLogout()



    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-white/10 hover:border-[#C0A975] transition-colors">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback className="bg-zinc-800 text-[#C0A975]">
                            {/* Get initials, e.g. "John Doe" -> "JD" */}
                            {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-zinc-950 border-l border-white/10 text-white">
                <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-[#C0A975]">My Profile</SheetTitle>
                    <div className="flex items-center gap-4 mt-4">
                        <Avatar className="h-16 w-16 border border-white/10">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="bg-zinc-800 text-2xl text-[#C0A975]">
                                {user.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-medium truncate text-white">{user.name}</span>
                            <span className="text-sm text-zinc-500 truncate">{user.email}</span>
                        </div>
                    </div>
                </SheetHeader>

                <Separator className="bg-white/10 my-4" />

                <div className="flex flex-col gap-2">
                    {/* Admin Link */}
                    {user.role === 'ADMIN' && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-colors text-zinc-300 hover:text-[#C0A975]">
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Admin Dashboard</span>
                        </Link>
                    )}
                    {user.role === 'PROVIDER' && (
                        <Link href="/dashboard/menu-management" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-colors text-zinc-300 hover:text-white">
                            <UserIcon className="h-5 w-5" />
                            <span>Menus</span>
                        </Link>
                    )}

                    {
                        user.role === 'PROVIDER' && (
                            <Link href="/dashboard/order-management" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-colors text-zinc-300 hover:text-white">
                                <ShoppingBag className="h-5 w-5" />
                                <span>Order Manage</span>
                            </Link>
                        )
                    }
                    
                    {
                        user.role === 'CUSTOMER' && (
                            <Link href="/customer" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-colors text-zinc-300 hover:text-white">
                                <ShoppingBag className="h-5 w-5" />
                                <span>My Order</span>
                            </Link>
                        )
                    }


                    {/* <Link href="/settings" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 transition-colors text-zinc-300 hover:text-white">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </Link> */}
                </div>

                <Separator className="bg-white/10 my-4" />

                <div className="mt-auto">
                    {/* <form > */}
                    <Button
                        variant="ghost"
                        onClick={() => logout()}
                        className="w-full justify-start gap-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 p-3"
                    >
                        <span>Log Out</span>
                    </Button>
                    {/* </form> */}
                </div>

            </SheetContent>
        </Sheet>
    )
}