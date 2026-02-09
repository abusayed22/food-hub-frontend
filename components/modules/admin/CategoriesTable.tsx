"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Search,
  Calendar,
  ImageIcon,
  ArrowUpDown
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming you have shadcn table, or use raw <table>
import { cn } from "@/lib/utils";

// --- Types ---
interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  status: "ACTIVE" | "DEACTIVE"; // Match your Prisma Enum
  createdAt: Date | string;
  _count?: {
    menu: number; // Optional: Show how many items are in this category
  };
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CategoryTableProps {
  data: Category[];
  meta: MetaData;
}

export default function CategoryTable({ data, meta }: CategoryTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- URL State Helpers ---
  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== "page") params.set("page", "1"); // Reset page on filter change
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  // --- Handlers ---
  const handleDelete = (id: string) => {
    // Add your delete server action here
    toast.error("Delete functionality not implemented yet");
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-4">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-900 p-4 rounded-xl border border-white/5">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search categories..." 
            className="pl-9 bg-zinc-950 border-white/10 text-zinc-300 focus-visible:ring-[#C0A975]"
            defaultValue={searchParams.get("search") || ""}
            onChange={(e) => updateUrl("search", e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
            {/* Sort Toggle */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => updateUrl("sort", searchParams.get("sort") === "asc" ? "desc" : "asc")}
                className="bg-zinc-950 border-white/10 text-zinc-400 hover:text-white"
            >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {searchParams.get("sort") === "asc" ? "Oldest" : "Newest"}
            </Button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-xl border border-white/5 bg-zinc-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-950/80 text-zinc-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Category Details</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created At</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                data.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors group">
                    
                    {/* 1. Name & Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10 rounded-lg">
                          <AvatarImage src={cat.image || ""} className="object-cover" />
                          <AvatarFallback className="bg-zinc-800 text-[#C0A975] rounded-lg">
                            {cat.image ? <ImageIcon className="w-4 h-4" /> : cat.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-200">{cat.name}</span>
                          <span className="text-xs text-zinc-500">
                            {cat._count?.menu ? `${cat._count.menu} items` : "0 items"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Slug */}
                    <td className="px-6 py-4">
                      <code className="bg-zinc-950 px-2 py-1 rounded border border-white/5 text-xs text-zinc-400 font-mono">
                        /{cat.slug}
                      </code>
                    </td>

                    {/* 3. Status */}
                    <td className="px-6 py-4">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "border",
                          cat.status === 'ACTIVE' 
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                            : "bg-zinc-800 text-zinc-500 border-zinc-700"
                        )}
                      >
                        {cat.status}
                      </Badge>
                    </td>

                    {/* 4. Date */}
                    <td className="px-6 py-4 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(cat.createdAt)}
                      </div>
                    </td>

                    {/* 5. Actions */}
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          
                          <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer gap-2">
                            <Pencil className="h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="focus:bg-zinc-800 focus:text-red-500 text-red-500 cursor-pointer gap-2"
                            onClick={() => handleDelete(cat.id)}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        {data.length > 0 && (
          <div className="border-t border-white/5 bg-zinc-900 p-4 flex items-center justify-between">
            <div className="text-xs text-zinc-500">
                Page <span className="text-white font-medium">{meta.page}</span> of <span className="text-white font-medium">{meta.totalPages}</span>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={meta.page <= 1}
                    onClick={() => updateUrl("page", String(meta.page - 1))}
                    className="h-8 border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={meta.page >= meta.totalPages}
                    onClick={() => updateUrl("page", String(meta.page + 1))}
                    className="h-8 border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                >
                    Next
                </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}