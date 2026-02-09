"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  Eye,
  Calendar,
  XCircle,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/SearchInput";
import { cn } from "@/lib/utils"; // Ensure you have this utility
import { useState, useTransition } from "react";

// --- Types ---
interface User {
  name: string;
  email: string;
  image?: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  order_id: string;
  menu_id: string;
  menu?: {
    id: string;
    title: string;
    image: string;
  };
}

interface OrderFetch {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  customerName: string | null;
  customerPhone: string;
  createdAt: string;
  user?: User;
  items: OrderItem[];
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AdminOrderTableProps {
  data: OrderFetch[];
  meta: MetaData;
}

const statusOptions = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrderTable({ data, meta }: AdminOrderTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // --- URL State Helpers ---
  // Updates the URL without reloading the page, wrapped in transition for UI feedback
  const updateUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "ALL") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset page to 1 whenever a filter changes (except for pagination interactions)
    if (key !== "page") {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // --- Formatters ---
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      CONFIRMED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      PREPARING: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      READY: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
      OUT_FOR_DELIVERY: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      DELIVERED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
      <Badge variant="outline" className={cn("capitalize border", styles[status] || "bg-zinc-800 text-zinc-400 border-zinc-700")}>
        {status.replace(/_/g, " ").toLowerCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-zinc-900 p-4 rounded-xl border border-white/5 shadow-sm">
        
        {/* Left: Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Status Filter */}
          <Select
            defaultValue={searchParams.get("status") || "ALL"}
            onValueChange={(val) => updateUrl("status", val)}
            disabled={isPending}
          >
            <SelectTrigger className="w-[180px] bg-zinc-950 border-white/10 text-zinc-300 focus:ring-[#C0A975]/50">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#C0A975]" />
                <SelectValue placeholder="Filter Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                  {status === "ALL" ? "All Statuses" : status.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Order */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateUrl("sortOrder", searchParams.get("sortOrder") === "asc" ? "desc" : "asc")}
            className="border-white/10 bg-zinc-950 text-zinc-300 hover:bg-white/5 hover:text-white h-10 px-4"
            disabled={isPending}
          >
            <ArrowUpDown className="mr-2 h-4 w-4 text-[#C0A975]" />
            {searchParams.get("sortOrder") === "asc" ? "Oldest First" : "Newest First"}
          </Button>
        </div>

        {/* Right: Search */}
        <div className="w-full sm:w-auto">
             <SearchInput /> 
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="rounded-xl border border-white/5 bg-zinc-900 overflow-hidden relative min-h-[400px]">
        
        {/* Loading Overlay */}
        {isPending && (
          <div className="absolute inset-0 z-10 bg-zinc-900/50 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#C0A975] animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-950/80 text-zinc-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Order Details</th>
                <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Amount</th>
                {/* <th className="px-6 py-4 font-medium tracking-wider text-center">Action</th> */}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 bg-zinc-800/50 rounded-full mb-2">
                        <XCircle className="w-8 h-8 text-zinc-500" />
                      </div>
                      <h3 className="text-lg font-medium text-white">No orders found</h3>
                      <p className="text-zinc-500 text-sm max-w-sm">
                        We couldn&apos;t find any orders matching your current filters. Try adjusting your search or status filter.
                      </p>
                      <Button 
                        variant="link" 
                        className="text-[#C0A975] mt-2"
                        onClick={() => router.push(pathname)} 
                      >
                        Clear all filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Order ID Column */}
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                          <span className="font-mono text-xs text-[#C0A975] bg-[#C0A975]/10 px-2 py-0.5 rounded w-fit">
                            {order.orderNumber || order.id.slice(0, 8)}
                          </span>
                          <span className="text-xs text-zinc-500">
                             {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </span>
                       </div>
                    </td>

                    {/* Customer Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-200 capitalize">
                          {order.user?.name || order.customerName || "Guest User"}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {order.customerPhone || "No contact info"}
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 text-zinc-400">
                       <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(order.createdAt)}
                       </div>
                    </td>

                    {/* Amount Column */}
                    <td className="px-6 py-4 text-right">
                       <span className="font-medium text-white font-mono">
                          {formatCurrency(order.totalAmount)}
                       </span>
                    </td>

                    {/* Action Column */}
                    {/* <td className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300 w-48">
                          <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          
                          <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem className="focus:bg-zinc-800 focus:text-amber-500 cursor-pointer gap-2">
                            <Clock className="h-4 w-4" /> Update Status
                          </DropdownMenuItem>

                          {order.status === 'DELIVERED' && (
                             <DropdownMenuItem className="focus:bg-zinc-800 focus:text-emerald-500 cursor-pointer gap-2">
                               <CheckCircle2 className="h-4 w-4" /> Mark as Paid
                             </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION --- */}
      {data.length > 0 && (
        <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
          <div className="text-xs text-zinc-500">
            Showing page <span className="text-white font-medium">{meta.page}</span> of <span className="text-white font-medium">{meta.totalPages}</span>
            <span className="mx-2">•</span>
            <span className="text-zinc-400">{meta.total} results</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              disabled={meta.page <= 1 || isPending}
              onClick={() => updateUrl("page", String(meta.page - 1))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              disabled={meta.page >= meta.totalPages || isPending}
              onClick={() => updateUrl("page", String(meta.page + 1))}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}