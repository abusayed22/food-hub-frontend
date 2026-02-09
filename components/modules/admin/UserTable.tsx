"use client";

import { useState, useTransition } from "react";
import {
    MoreHorizontal,
    Shield,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Loader2,
    Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming you use Sonner or standard toast

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
// import { updateUserStatus, toggleUserVerification } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import { Meta } from "../homepage/DishesSection";
import { CustomPagination } from "@/components/Custom-Pagination";
import { updateUserStatus } from "@/actions/users.action";
// import { toggleUserVerification, updateUserStatus } from "@/actions/order.action";

// --- Types ---
interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string;
    status: string;
    emailVerified: boolean;
    createdAt: Date | string;
}

interface UserTableProps {
    data: User[];
    meta: Meta
}

export default function UserTable({ data, meta }: UserTableProps) {
    const [isPending, startTransition] = useTransition();

    // --- Handlers ---

    const handleStatusChange = (userId: string, newStatus: string) => {
        toast.loading("Updating status...");
        startTransition(async () => {
            const result = await updateUserStatus(newStatus, userId);
            if (result.data) {
                toast.dismiss();
                toast.success(`User is now ${newStatus}`);
            } else {
                toast.dismiss();
                toast.error("Failed to update status");
            }
        });
    };



    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            ACTIVE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            BLOCKED: "bg-red-500/10 text-red-500 border-red-500/20",
            SUSPENDED: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        };
        return styles[status] || "bg-zinc-800 text-zinc-400";
    };

    return (
        <div className="rounded-xl border border-white/5 bg-zinc-900 overflow-hidden relative">

            {/* Loading Overlay */}
            {isPending && (
                <div className="absolute inset-0 z-50 bg-zinc-900/20 backdrop-blur-[1px] flex items-center justify-center cursor-wait">
                    {/* Optional spinner */}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-zinc-950/80 text-zinc-500 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status (Editable)</th>
                            <th className="px-6 py-4 font-medium">Email Verified</th>
                            {/* <th className="px-6 py-4 font-medium text-right">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data?.map((user) => (
                            <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">

                                {/* 1. User Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-white/10">
                                            <AvatarImage src={user.image || ""} />
                                            <AvatarFallback className="bg-zinc-800 text-[#C0A975]">
                                                {user.name?.[0]?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-zinc-200">{user.name || "Unknown"}</span>
                                            <span className="text-xs text-zinc-500">{user.email}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* 2. Role */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {user.role === 'ADMIN' ? (
                                            <ShieldAlert className="w-4 h-4 text-[#C0A975]" />
                                        ) : (
                                            <Shield className="w-4 h-4 text-zinc-600" />
                                        )}
                                        <span className={cn("text-xs font-medium", user.role === 'ADMIN' ? "text-[#C0A975]" : "text-zinc-400")}>
                                            {user.role}
                                        </span>
                                    </div>
                                </td>

                                {/* 3. Status (Editable via Dropdown) */}
                                <td className="px-6 py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                                                <Badge
                                                    variant="outline"
                                                    className={cn("cursor-pointer hover:opacity-80 transition-opacity capitalize", getStatusBadge(user.status))}
                                                >
                                                    {user.status.toLowerCase()}
                                                </Badge>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="bg-zinc-900 border-zinc-800">
                                            <DropdownMenuLabel className="text-zinc-400 text-xs">Change Status</DropdownMenuLabel>
                                            <DropdownMenuRadioGroup
                                                value={user.status}
                                                onValueChange={(val) => handleStatusChange(user.id, val)}
                                            >
                                                <DropdownMenuRadioItem value="ACTIVE" className="text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10 cursor-pointer">
                                                    Active
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="SUSPENDED" className="text-amber-500 focus:text-amber-500 focus:bg-amber-500/10 cursor-pointer">
                                                    Suspended
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="BLOCKED" className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer">
                                                    Blocked
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>

                                {/* 4. Email Verified (Toggle Switch) */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md",
                                            user.emailVerified ? "bg-blue-500/10 text-blue-400" : "bg-zinc-800 text-zinc-500"
                                        )}>
                                            {user.emailVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                                            {user.emailVerified ? "Verified" : "Unverified"}
                                        </div>

                                        {/* <Switch 
                        checked={user.emailVerified}
                        onCheckedChange={() => handleVerificationToggle(user.id, user.emailVerified)}
                        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-zinc-700 h-5 w-9"
                    /> */}
                                    </div>
                                </td>

                                {/* 5. Actions */}
                                {/* <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-white/10">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                      <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer">
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer text-amber-500">
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer text-red-500">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="border-t border-white/5 bg-zinc-900 p-4 w-full flex  justify-between">
                <div className="text-xs text-zinc-500 w-full">
                    Showing page {meta.page} of {meta.totalPages}
                </div>
                <CustomPagination meta={meta} />
            </div>
        </div>
    );
}