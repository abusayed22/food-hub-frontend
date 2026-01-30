// components/navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Input } from "../ui/input";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CartSheet } from "../modules/CartSeet";

// Define the gold color from the image.
// You can also add this to your tailwind.config.js as a primary color.
const goldColorClass = "text-[#C0A975]";

const navItems = [
    { title: "DISCOVER", href: "/discover" },
    { title: "COLLECTIONS", href: "/meal-item" },
    { title: "RESERVATIONS", href: "/reservations" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    // Change navbar background on scroll
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
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
                    {/* Logo */}
                    <Link
                        href="/"
                        className={cn(
                            "text-2xl md:text-3xl font-bold tracking-widest font-serif",
                            goldColorClass
                        )}
                    >
                        ÉPICURE
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Desktop Sign In Button */}
                    <div className="hidden md:flex items-center">
                        <CartSheet />
                        <Button
                            variant="ghost"
                            className={cn(
                                "text-xs lg:text-sm font-medium tracking-[0.2em] uppercase hover:bg-transparent hover:text-white",
                                goldColorClass
                            )}
                        >
                            SIGN IN
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white">
                                <Menu className="w-6 h-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black/95 border-white/10 p-12">
                            <div className="flex flex-col items-center justify-center h-full gap-8">
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
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "mt-4 text-xl font-medium tracking-[0.2em] uppercase hover:bg-transparent hover:text-white",
                                        goldColorClass
                                    )}
                                >
                                    SIGN IN
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

    );
}