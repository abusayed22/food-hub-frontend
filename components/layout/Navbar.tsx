"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, User as UserIcon, LogOut, ShoppingBag, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Import your modules
import { CartSheet } from "../modules/CartSeet";
import { UserNav } from "./UserNav";
import { UserRole } from "@/constant/type";
// import { UserNav } from "./user-nav"; // Import the Sidebar Component

// Define User Interface matching your session data
interface UserData {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
}

interface NavbarProps {
    user?: UserData | null; // Accept user as a prop
}

const goldColorClass = "text-[#C0A975]";

const navItems = [
    { title: "", href: "" },
    // { title: "COLLECTIONS", href: "/meal-item" },
    // { title: "RESERVATIONS", href: "/reservations" },
];

export function Navbar({ user }: NavbarProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Change navbar background on scroll
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-black/80 backdrop-blur-md border-white/10 py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8">
                {/* --- Logo --- */}
                <Link
                    href="/"
                    className={cn(
                        "text-2xl md:text-3xl font-bold tracking-widest font-serif",
                        goldColorClass
                    )}
                >
                    ÉPICURE
                </Link>

                {/* --- Desktop Navigation --- */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "text-xs lg:text-sm font-medium tracking-[0.2em] uppercase transition-colors hover:text-white",
                                goldColorClass
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* --- Desktop Right Section (Cart + User) --- */}
                <div className="hidden md:flex items-center gap-4">
                    {user?.role===UserRole.Customer}
                    <CartSheet />

                    {/* CONDITION: If User -> Show Sidebar Avatar, Else -> Show Sign In Text */}
                    {user ? (
                        <UserNav user={user} />
                    ) : (
                        <Button
                            asChild
                            variant="ghost"
                            className={cn(
                                "text-xs lg:text-sm font-medium tracking-[0.2em] uppercase hover:bg-transparent hover:text-white",
                                goldColorClass
                            )}
                        >
                            <Link href="/login">SIGN IN</Link>
                        </Button>
                    )}
                </div>

                {/* --- Mobile Menu Trigger --- */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-white">
                            <Menu className="w-6 h-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="right" className="bg-black/95 border-white/10 p-8 w-[300px] overflow-y-auto">
                        <div className="flex flex-col h-full">
                            
                            {/* Mobile Nav Links */}
                            <div className="flex flex-col gap-6 mt-12 text-center">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            "text-xl font-medium tracking-[0.2em] uppercase transition-colors hover:text-white",
                                            goldColorClass
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>

                            <Separator className="bg-white/10 my-8" />

                            {/* Mobile User Section */}
                            <div className="mt-auto flex flex-col gap-4">
                                {user ? (
                                    // Logged In Mobile View
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                                            <Avatar className="h-10 w-10 border border-white/10">
                                                <AvatarImage src={user.image || ""} />
                                                <AvatarFallback className="bg-zinc-800 text-[#C0A975]">
                                                    {user.name?.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col text-left">
                                                <span className="text-white font-medium text-sm">{user.name}</span>
                                                <span className="text-zinc-500 text-xs truncate max-w-[150px]">{user.email}</span>
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            {user.role === 'ADMIN' && (
                                                <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 text-zinc-300">
                                                    <LayoutDashboard className="h-4 w-4 text-[#C0A975]" />
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link href="/profile" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 text-zinc-300">
                                                <UserIcon className="h-4 w-4" /> Account
                                            </Link>
                                            <Link href="/orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5 text-zinc-300">
                                                <ShoppingBag className="h-4 w-4" /> Orders
                                            </Link>
                                        </div>
                                        
                                        <form action={async () => {
                                            // Add your mobile sign out logic here
                                            // await signOut() 
                                            console.log("Sign out")
                                        }}>
                                            <Button variant="outline" className="w-full border-red-900/50 text-red-500 hover:bg-red-950 hover:text-red-400">
                                                <LogOut className="h-4 w-4 mr-2" /> Log Out
                                            </Button>
                                        </form>
                                    </div>
                                ) : (
                                    // Guest Mobile View
                                    <Button
                                        asChild
                                        variant="outline"
                                        className={cn(
                                            "w-full text-lg tracking-widest uppercase border-[#C0A975] text-[#C0A975] hover:bg-[#C0A975] hover:text-black"
                                        )}
                                    >
                                        <Link href="/login">SIGN IN</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}