"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, Filter, Loader2, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"

// UI Components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchInput } from "@/components/SearchInput"

// --- Types ---
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  orderNumber?: string;
  customerName: string;
  paymentMethod: string;
  status: "PENDING" | "COOKING" | "COMPLETED" | "CANCELLED";
  totalAmount: number;
  createdAt: string | Date;
  items: OrderItem[];
}

interface ProviderOrderManagementProps {
  orders: Order[];
}

export default function ProviderOrderManagement({ orders = [] }: ProviderOrderManagementProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // 1. Loading State for transitions (Refresh/Filter)
  const [isPending, startTransition] = React.useTransition()

  // 2. Get current status from URL (default to 'all')
  const currentStatus = searchParams.get("status") || "all"

  // 3. Handle Tab Change (Update URL)
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value === "all") {
      params.delete("status")
    } else {
      params.set("status", value)
    }
    
    // Reset page to 1 when changing filters
    params.set("page", "1")

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  // 4. Handle Refresh
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  // 5. Helper for Status Badges
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20",
      COOKING: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20",
      COMPLETED: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20",
      CANCELLED: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={`${styles[status] || "text-zinc-400"} border`}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Order Management</h1>
          <p className="text-zinc-400">Track and manage incoming meal requests.</p>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh} 
          disabled={isPending}
          className="border-white/10 text-[#C0A975] hover:bg-white/15 bg-white/25"
        >
          <RefreshCw size={16} className={isPending ? "animate-spin" : ""} />
        </Button>
      </div>

      {/* FILTER CONTROLS */}
      <Tabs 
        value={currentStatus} 
        onValueChange={handleTabChange} 
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           {/* TABS */}
           <TabsList className="bg-zinc-900 border border-white/5 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">All Orders</TabsTrigger>
              <TabsTrigger value="PENDING" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">Pending</TabsTrigger>
              <TabsTrigger value="COOKING" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">Cooking</TabsTrigger>
              <TabsTrigger value="COMPLETED" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">Completed</TabsTrigger>
           </TabsList>

           {/* SEARCH */}
           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <SearchInput />
              </div>
           </div>
        </div>

        {/* DATA TABLE */}
        <div className="mt-0">
          <Card className="bg-zinc-900 border-white/5 rounded-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Order ID</TableHead>
                  <TableHead className="text-zinc-400">Customer</TableHead>
                  <TableHead className="text-zinc-400">Items</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Amount</TableHead>
                  <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Note: 'orders' comes from the server. 
                  The 'isPending' here just dims the table slightly during refresh/filter 
                  instead of hiding rows, for better UX.
                */}
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow 
                      key={order.id} 
                      className={`border-white/5 hover:bg-white/5 group transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}
                    >
                      <TableCell className="font-mono text-zinc-300">
                          {order.orderNumber || order.id.slice(-6).toUpperCase()} <br/>
                          <span className="text-xs text-zinc-500">
                             {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                      </TableCell>
                      
                      <TableCell>
                          <div className="font-medium text-white text-sm">{order.customerName}</div>
                          <div className="text-xs text-zinc-500">{order.paymentMethod}</div>
                      </TableCell>

                      <TableCell className="text-zinc-400 text-sm max-w-[200px] truncate">
                         {order.items?.length || 0} items
                      </TableCell>

                      <TableCell>
                         {getStatusBadge(order.status)}
                      </TableCell>

                      <TableCell className="font-medium text-white">${Number(order.totalAmount).toFixed(2)}</TableCell>
                      
                      <TableCell className="text-right">
                         <Button asChild size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white">
                           {/* Add Link to Detail Page */}
                           <Link href={`/dashboard/order-management/${order.id}`}>
                             <Eye className="w-4 h-4 mr-2" /> Details
                           </Link>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="h-8 w-8 opacity-20" />
                        <p>No orders found matching your criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}