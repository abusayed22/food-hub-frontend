"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"




export interface Menu {
  id: string;
  name: string;
  image?: string | null;
  price: number;
  description?: string;
}

// 3. Define the Order Item Interface
export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  menu_id: string;
  menu: Menu; // The [Object] in your log
}
export interface UserType {
  id: string;
  name: string;
}

// 4. The Main Order Interface
export interface Order {
  id: string;
  orderNumber: string;
  status: string;

  // Financials
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;

  paymentStatus: string;
  paymentMethod: string;

  // Customer Info
  customerName: string | null;
  customerPhone: string;
  deliveryAddress: string;
  deliveryNote?: string | null; // Optional because it might be empty
  user_id: string;

  // Timestamps (Strings because they come from JSON)
  createdAt: string;
  updateAt: string;

  // Relations
  items: OrderItem[];
  user: UserType
}






import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Printer, Clock, MapPin, Phone, CreditCard, ChefHat, CheckCircle2, XCircle, StickyNote } from "lucide-react"
import { toast } from "sonner" // Assuming you use Sonner or similar toast
import { updateOrder } from "@/actions/order.action"





export default function OrderDetail({ order }: { order: Order }) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = React.useState(false)

  // Handle Status Change
  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const res = await updateOrder(order.id, newStatus)
      console.log(res)
      // toast.success(`Order status updated to ${newStatus}`)
      // router.refresh()
    } catch (error) {
      toast.error("Failed to update status")
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Status Styling Logic
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
      case "COOKING": return "text-blue-500 border-blue-500/50 bg-blue-500/10"
      case "PREPARING": return "text-blue-500 border-blue-500/50 bg-blue-500/10"
      case "COMPLETED": return "text-green-500 border-green-500/50 bg-green-500/10"
      case "CANCELLED": return "text-red-500 border-red-500/50 bg-red-500/10"
      default: return "text-zinc-400 border-zinc-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-8 animate-in fade-in duration-500">

      {/* --- TOP BAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-zinc-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif text-[#C0A975] flex items-center gap-3">
              Order #{order.orderNumber || order.id.slice(-6).toUpperCase()}
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </h1>
            <p className="text-zinc-500 text-sm flex items-center gap-2 mt-1">
              <Clock className="w-3 h-3" />
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* STATUS CHANGER */}
          <div className="w-full md:w-48">
            <Select
              disabled={isUpdating}
              onValueChange={handleStatusChange}
              defaultValue={order.status}
            >
              <SelectTrigger className="bg-zinc-900 border-white/10 text-white focus:ring-[#C0A975]">
                <SelectValue placeholder="Change Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 text-white">
                <SelectItem value="PENDING">
                  <div className="flex items-center gap-2 text-yellow-500"><Clock className="w-4 h-4" /> Pending</div>
                </SelectItem>
                <SelectItem value="PREPARING">
                  <div className="flex items-center gap-2 text-blue-500"><ChefHat className="w-4 h-4" /> Preparing</div>
                </SelectItem>
                <SelectItem value="COMPLETED">
                  <div className="flex items-center gap-2 text-green-500"><CheckCircle2 className="w-4 h-4" /> Completed</div>
                </SelectItem>
                <SelectItem value="CANCELLED">
                  <div className="flex items-center gap-2 text-red-500"><XCircle className="w-4 h-4" /> Cancelled</div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-400">
            <Printer className="w-4 h-4 mr-2" /> Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* --- LEFT COLUMN: ORDER ITEMS --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-zinc-900 border-white/5">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.items?.map((item: OrderItem, index: number) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden relative flex items-center justify-center">
                        {item.menu.image ? (
                          <img src={item.menu.image} alt={item.menu.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-zinc-600 text-xs">IMG</div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-white text-lg">{item.menu.name}</h4>

                        <p className="text-zinc-500 text-sm">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {/* Calculate Total for this line item */}
                      <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-zinc-500 text-xs">${item.price} each</p>
                    </div>
                  </div>
                ))}

                <Separator className="bg-white/10" />

                {/* Totals */}
                <div className="space-y-2 pt-2 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Tax (Estimate)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-[#C0A975] font-serif text-xl pt-4 border-t border-white/5 mt-4">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- RIGHT COLUMN: CUSTOMER INFO --- */}
        <div className="space-y-6">
          {/* Customer Card */}
          <Card className="bg-zinc-900 border-white/5 h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                Customer Details
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* --- Avatar & Name --- */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C0A975]/10 flex items-center justify-center border border-[#C0A975]/20">
                  <span className="text-lg font-bold text-[#C0A975] font-serif">
                    {/* {initials} */}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">{order.user.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                      {order.user_id ? "Registered User" : "Guest"}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/5" />

              {/* --- Contact Info --- */}
              <div className="space-y-5">

                {/* Phone Section */}
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 rounded-md bg-zinc-950 border border-white/5 group-hover:border-[#C0A975]/30 transition-colors">
                    <Phone className="w-4 h-4 text-[#C0A975]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">
                      Contact Number
                    </p>
                    <p className="text-sm text-zinc-300 font-mono tracking-wide">
                      {order.customerPhone || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Address Section */}
                <div className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-2 rounded-md bg-zinc-950 border border-white/5 group-hover:border-[#C0A975]/30 transition-colors">
                    <MapPin className="w-4 h-4 text-[#C0A975]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">
                      Delivery Address
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Delivery Note (Only show if exists) */}
                {order.deliveryNote && (
                  <div className="flex items-start gap-3 mt-4 pt-4 border-t border-dashed border-white/10">
                    <div className="mt-0.5">
                      <StickyNote className="w-4 h-4 text-yellow-500/70" />
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-md p-3 w-full">
                      <p className="text-[10px] uppercase tracking-widest text-yellow-500/70 font-semibold mb-1">
                        Note
                      </p>
                      <p className="text-sm text-yellow-200/80 italic">
                        {order.deliveryNote}
                      </p>
                    </div>
                  </div>
                )}

              </div>
              <div className="flex items-center  gap-2 text-zinc-300">
                <CreditCard className="w-4 h-4 ml-2 text-[#C0A975]" />
                <span className="uppercase ml-5">{order.paymentMethod}</span>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}