// app/admin/orders/page.tsx
"use client"

import * as React from "react"
import { 
  CheckCircle2, XCircle, Clock, Package, ChefHat, Truck, 
  MoreHorizontal, Search, Filter, RefreshCw, Eye
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// --- Mock Data ---
const orders = [
  { 
    id: "ORD-7801", 
    customer: "Alice Freeman", 
    avatar: "AF",
    items: [
      { name: "Wagyu Truffle Burger", qty: 2, price: 85 },
      { name: "Truffle Fries", qty: 1, price: 12 }
    ],
    total: 182.00, 
    status: "Pending", 
    time: "2 mins ago",
    method: "Delivery",
    address: "123 Main St, Apt 4B",
    notes: "No onions please."
  },
  { 
    id: "ORD-7798", 
    customer: "John Smith", 
    avatar: "JS",
    items: [
      { name: "Lobster Thermidor", qty: 1, price: 120 },
      { name: "White Wine", qty: 1, price: 45 }
    ],
    total: 165.00, 
    status: "Cooking", 
    time: "15 mins ago",
    method: "Dine-in",
    table: "Table 4"
  },
  { 
    id: "ORD-7795", 
    customer: "Sarah Lee", 
    avatar: "SL",
    items: [
      { name: "Gold Leaf Chocolate", qty: 3, price: 45 }
    ],
    total: 135.00, 
    status: "Ready", 
    time: "32 mins ago",
    method: "Pickup"
  },
  { 
    id: "ORD-7790", 
    customer: "Mike Ross", 
    avatar: "MR",
    items: [
      { name: "Sushi Platter", qty: 1, price: 65 }
    ],
    total: 65.00, 
    status: "Completed", 
    time: "1 hour ago",
    method: "Delivery"
  },
]

export default function ProviderOrderManagement() {
  const [selectedOrder, setSelectedOrder] = React.useState<typeof orders[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const handleViewDetails = (order: typeof orders[0]) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  // Helper to render badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="border-amber-500/50 text-amber-500 bg-amber-500/10">Pending Request</Badge>
      case "Cooking": return <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-500/10">Cooking</Badge>
      case "Ready": return <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">Ready for Pickup</Badge>
      case "Completed": return <Badge variant="outline" className="border-zinc-500/50 text-zinc-500 bg-zinc-500/10">Completed</Badge>
      case "Cancelled": return <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10">Cancelled</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30 p-6 md:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Order Management</h1>
          <p className="text-zinc-400">Track and manage incoming meal requests.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/5">
              <RefreshCw size={16} />
           </Button>
           <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988]">
              Create Manual Order
           </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatusCard icon={Clock} label="Pending" value="3" color="text-amber-500" />
        <StatusCard icon={ChefHat} label="Cooking" value="5" color="text-blue-500" />
        <StatusCard icon={Package} label="Ready" value="2" color="text-green-500" />
        <StatusCard icon={Truck} label="Delivering" value="4" color="text-purple-500" />
      </div>

      {/* Main Order Table */}
      <Tabs defaultValue="all" className="space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <TabsList className="bg-zinc-900 border border-white/5 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">All Orders</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">Pending</TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">Active</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">History</TabsTrigger>
           </TabsList>

           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                 <Input 
                    placeholder="Search ID or customer..." 
                    className="bg-zinc-900 border-white/10 pl-9 focus-visible:ring-[#C0A975]" 
                 />
              </div>
              <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/5">
                 <Filter size={16} />
              </Button>
           </div>
        </div>

        <TabsContent value="all" className="mt-0">
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
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-white/5 hover:bg-white/5 group">
                    <TableCell className="font-mono text-zinc-300">
                        {order.id}
                        <div className="text-xs text-zinc-500 mt-1">{order.time}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-white/10 bg-zinc-800">
                           <AvatarFallback className="text-[#C0A975] text-xs">{order.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white text-sm">{order.customer}</div>
                          <div className="text-xs text-zinc-500">{order.method}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm max-w-[200px] truncate">
                       {order.items.map(i => `${i.qty}x ${i.name}`).join(", ")}
                    </TableCell>
                    <TableCell>
                       {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="font-medium text-white">${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                         {order.status === 'Pending' && (
                            <>
                               <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-900/20">
                                  <CheckCircle2 size={16} />
                               </Button>
                               <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20">
                                  <XCircle size={16} />
                               </Button>
                            </>
                         )}
                         <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => handleViewDetails(order)}>
                            Details
                         </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* ... Other TabsContent can reuse the same structure or filter data ... */}
      </Tabs>

      {/* Order Details Sheet (Slide-over) */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
         <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-950 border-l border-white/10 text-white p-0">
            {selectedOrder && (
               <div className="h-full flex flex-col">
                  <SheetHeader className="p-6 border-b border-white/10">
                     <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="border-[#C0A975] text-[#C0A975]">{selectedOrder.status}</Badge>
                        <span className="text-zinc-500 text-sm font-mono">{selectedOrder.time}</span>
                     </div>
                     <SheetTitle className="text-2xl font-serif text-white">Order #{selectedOrder.id}</SheetTitle>
                     <SheetDescription className="text-zinc-400">
                        {selectedOrder.method} • {selectedOrder.method === 'Delivery' ? selectedOrder.address : selectedOrder.table}
                     </SheetDescription>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                     {/* Customer Info */}
                     <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-sm border border-white/5">
                        <Avatar className="h-12 w-12 border border-white/10 bg-zinc-800">
                           <AvatarFallback className="text-[#C0A975]">{selectedOrder.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                           <div className="font-medium text-white">{selectedOrder.customer}</div>
                           <div className="text-sm text-zinc-500">Customer since 2024</div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto border-white/10 hover:bg-white/5">Contact</Button>
                     </div>

                     {/* Order Items */}
                     <div>
                        <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Items</h4>
                        <div className="space-y-4">
                           {selectedOrder.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 flex items-center justify-center bg-zinc-800 rounded-sm text-sm font-medium border border-white/10">
                                       {item.qty}x
                                    </div>
                                    <span className="text-white">{item.name}</span>
                                 </div>
                                 <span className="text-zinc-300">${(item.price * item.qty).toFixed(2)}</span>
                              </div>
                           ))}
                        </div>
                        <Separator className="my-4 bg-white/10" />
                        <div className="flex justify-between items-center text-lg font-medium">
                           <span className="text-white">Total</span>
                           <span className="text-[#C0A975]">${selectedOrder.total.toFixed(2)}</span>
                        </div>
                     </div>

                     {/* Notes */}
                     {selectedOrder.notes && (
                        <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-sm">
                           <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Kitchen Note</h4>
                           <p className="text-amber-200/80 text-sm">{selectedOrder.notes}</p>
                        </div>
                     )}
                  </div>

                  <SheetFooter className="p-6 border-t border-white/10 bg-zinc-900/50 mt-auto gap-3 sm:justify-between">
                     {selectedOrder.status === 'Pending' ? (
                        <>
                           <Button variant="outline" className="flex-1 border-red-900/30 text-red-500 hover:bg-red-900/20 hover:text-red-400 hover:border-red-500/50">
                              Reject Order
                           </Button>
                           <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                              Accept & Cook
                           </Button>
                        </>
                     ) : (
                        <Button className="w-full bg-[#C0A975] text-black hover:bg-[#D4B988]">
                           Update Status
                        </Button>
                     )}
                  </SheetFooter>
               </div>
            )}
         </SheetContent>
      </Sheet>

    </div>
  )
}

// --- Helper Components ---

function StatusCard({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: string, color: string }) {
   return (
      <Card className="bg-zinc-900 border-white/5 rounded-sm">
         <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Icon className={`h-6 w-6 mb-2 ${color}`} />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
         </CardContent>
      </Card>
   )
}