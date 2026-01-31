// app/profile/page.tsx
"use client"

import * as React from "react"
import { 
  User, ShoppingBag, CreditCard, MapPin, LogOut, Camera, Star, Clock, 
  Plus, MoreVertical, Trash2, Edit2, ChevronRight, Package 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// --- Mock Data ---
const user = {
  name: "Sayed",
  email: "abusayed.dev@gmail.com",
  phone: "+880 1234-567890",
  joinDate: "September 2025",
  avatar: "/avatars/sayed.jpg",
  membership: "Gold Member"
}

const allOrders = [
  { id: "ORD-2491", date: "Jan 30, 2026", items: ["Wagyu Burger", "Truffle Fries"], total: "$54.00", status: "Delivered", image: "/images/burger.jpg" },
  { id: "ORD-2488", date: "Jan 28, 2026", items: ["Gold Leaf Chocolate"], total: "$45.00", status: "Processing", image: "/images/dessert.jpg" },
  { id: "ORD-2452", date: "Jan 15, 2026", items: ["Lobster Thermidor", "White Wine"], total: "$120.00", status: "Delivered", image: "/images/lobster.jpg" },
  { id: "ORD-2300", date: "Dec 10, 2025", items: ["Sushi Platter"], total: "$85.00", status: "Cancelled", image: "/images/sushi.jpg" },
]

const addresses = [
  { id: 1, type: "Home", street: "House 12, Road 5, Dhanmondi", city: "Dhaka, 1209", isDefault: true },
  { id: 2, type: "Work", street: "Level 4, Gulshan Centre Point", city: "Dhaka, 1212", isDefault: false },
]

const cards = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/28", holder: "ABU SAYED", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8899", expiry: "09/27", holder: "ABU SAYED", isDefault: false },
]

export default function CustomerProfilePage() {
  const [activeTab, setActiveTab] = React.useState("profile")

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />
      case "orders":
        return <OrdersTab />
      case "addresses":
        return <AddressesTab />
      case "payment":
        return <PaymentsTab />
      default:
        return <ProfileTab />
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30">
      <main className="container mx-auto px-4 py-12 md:px-6">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-[#C0A975]">My Account</h1>
          <p className="text-zinc-500">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* 1. SIDEBAR NAVIGATION */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="flex flex-col space-y-1">
              <SidebarItem icon={<User size={18} />} label="Personal Info" isActive={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
              <SidebarItem icon={<ShoppingBag size={18} />} label="My Orders" isActive={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
              <SidebarItem icon={<MapPin size={18} />} label="Saved Addresses" isActive={activeTab === "addresses"} onClick={() => setActiveTab("addresses")} />
              <SidebarItem icon={<CreditCard size={18} />} label="Payment Methods" isActive={activeTab === "payment"} onClick={() => setActiveTab("payment")} />
              <Separator className="my-4 bg-white/10" />
              <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-white/5 rounded-sm transition-colors w-full text-left">
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* 2. MAIN CONTENT AREA (Dynamic) */}
          <div className="flex-1 space-y-8 animate-in fade-in-50 duration-500">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}

// ==========================================
// SUB-COMPONENTS (TABS)
// ==========================================

// 1. PROFILE TAB
function ProfileTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <StatCard icon={<ShoppingBag className="text-[#C0A975]" />} label="Total Orders" value="24" />
         <StatCard icon={<Star className="text-[#C0A975]" />} label="Reviews Given" value="12" />
         <StatCard icon={<Clock className="text-[#C0A975]" />} label="Member Since" value="2025" />
      </div>

      <Card className="bg-zinc-900 border-white/5 rounded-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-white">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border border-white/10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-zinc-800 text-[#C0A975] text-xl">AS</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 bg-[#C0A975] text-black p-1.5 rounded-full hover:bg-[#D4B988] transition-colors border-2 border-zinc-900">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h3 className="font-medium text-white">{user.name}</h3>
              <p className="text-sm text-zinc-500 mb-2">{user.email}</p>
              <Badge variant="outline" className="border-[#C0A975] text-[#C0A975] font-normal">
                {user.membership}
              </Badge>
            </div>
          </div>

          <Separator className="bg-white/5" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-400">Full Name</Label>
              <Input defaultValue={user.name} className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400">Email Address</Label>
              <Input defaultValue={user.email} className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400">Phone Number</Label>
              <Input defaultValue={user.phone} className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-400">Location</Label>
              <Input defaultValue="Dhaka, Bangladesh" className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] rounded-sm px-8">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

// 2. ORDERS TAB
function OrdersTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-white">Order History</h2>
        <div className="flex gap-2">
          <Input placeholder="Search orders..." className="bg-zinc-900 border-white/10 h-9 w-[200px]" />
          <Button variant="outline" className="h-9 border-white/10">Filter</Button>
        </div>
      </div>

      <div className="space-y-4">
        {allOrders.map((order) => (
          <Card key={order.id} className="bg-zinc-900 border-white/5 rounded-sm overflow-hidden hover:border-[#C0A975]/30 transition-all">
            <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              
              {/* Icon/Image Placeholder */}
              <div className="h-16 w-16 bg-zinc-800 rounded-sm flex items-center justify-center flex-shrink-0 text-zinc-500">
                <Package size={24} />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-serif text-lg text-white">{order.id}</span>
                  <Badge 
                    className={`font-normal border-0 ${
                      order.status === "Delivered" ? "bg-green-900/30 text-green-400" : 
                      order.status === "Processing" ? "bg-amber-900/30 text-amber-400" :
                      "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="text-zinc-400 text-sm">
                  {order.items.join(", ")} {order.items.length > 2 && "..."}
                </p>
                <p className="text-zinc-500 text-xs">{order.date}</p>
              </div>

              {/* Price & Action */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2 w-full md:w-auto justify-between">
                <span className="text-lg font-medium text-[#C0A975]">{order.total}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">Details</Button>
                  {order.status === "Delivered" && (
                    <Button size="sm" className="bg-[#C0A975] text-black hover:bg-[#D4B988]">Reorder</Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 3. ADDRESSES TAB
function AddressesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-white">Saved Addresses</h2>
        <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] rounded-sm gap-2">
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <Card key={addr.id} className="bg-zinc-900 border-white/5 rounded-sm relative group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#C0A975]" size={20} />
                  <span className="font-medium text-white">{addr.type}</span>
                  {addr.isDefault && <Badge variant="secondary" className="text-[10px] bg-white/10 text-zinc-300">Default</Badge>}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                    <DropdownMenuItem className="focus:bg-white/10"><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-900/20 text-red-400 focus:text-red-400"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-zinc-300 text-sm mb-1">{addr.street}</p>
              <p className="text-zinc-500 text-sm">{addr.city}</p>
            </CardContent>
          </Card>
        ))}

        {/* Add New Placeholder */}
        <button className="border border-dashed border-white/10 rounded-sm p-6 flex flex-col items-center justify-center text-zinc-500 hover:border-[#C0A975] hover:text-[#C0A975] transition-colors bg-white/[0.02]">
           <Plus size={32} className="mb-2 opacity-50" />
           <span className="text-sm font-medium">Add New Address</span>
        </button>
      </div>
    </div>
  )
}

// 4. PAYMENTS TAB
function PaymentsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-white">Payment Methods</h2>
        <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] rounded-sm gap-2">
          <Plus size={16} /> Add Card
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 p-6 group">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#C0A975]/10 blur-xl"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <CreditCard className="text-[#C0A975]" size={28} />
              {card.isDefault && <Badge className="bg-[#C0A975] text-black hover:bg-[#C0A975]">Primary</Badge>}
            </div>

            <div className="space-y-1 relative z-10">
               <div className="text-2xl text-white font-mono tracking-widest">
                 •••• •••• •••• {card.last4}
               </div>
               <div className="flex justify-between items-end mt-4">
                 <div>
                   <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Card Holder</p>
                   <p className="text-sm font-medium text-zinc-300">{card.holder}</p>
                 </div>
                 <div>
                   <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Expires</p>
                   <p className="text-sm font-medium text-zinc-300">{card.expiry}</p>
                 </div>
               </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 gap-2 backdrop-blur-sm">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Edit</Button>
                <Button variant="destructive" size="sm">Remove</Button>
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-500 hover:border-[#C0A975] hover:text-[#C0A975] transition-colors bg-white/[0.02] min-h-[200px]">
           <Plus size={32} className="mb-2 opacity-50" />
           <span className="text-sm font-medium">Add New Card</span>
        </button>
      </div>
    </div>
  )
}

// ==========================================
// HELPER COMPONENTS
// ==========================================

function SidebarItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-sm transition-all duration-200 text-left w-full relative
        ${isActive 
          ? "bg-[#C0A975] text-black" 
          : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
    >
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>}
      {icon}
      {label}
    </button>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm flex items-center gap-4">
      <div className="bg-black/40 p-3 rounded-full border border-white/5">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-serif text-white">{value}</div>
        <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  )
}