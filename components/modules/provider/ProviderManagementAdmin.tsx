// app/admin/providers/page.tsx
"use client"

import * as React from "react"
import { 
  Search, MoreVertical, Filter, Download, Plus, 
  CheckCircle2, XCircle, AlertCircle, Building2, 
  Mail, Phone, MapPin, MoreHorizontal, ShieldCheck 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- Mock Data ---

// Stats for the top cards
const stats = [
  { label: "Total Providers", value: "156", change: "+12 this month", icon: Building2 },
  { label: "Pending Approvals", value: "8", change: "Requires attention", icon: AlertCircle, alert: true },
  { label: "Active Revenue", value: "$452k", change: "+8.2% vs last month", icon: ShieldCheck },
]

// Mock Active Providers
const activeProviders = [
  { 
    id: "PRO-001", 
    name: "Le Bernardin", 
    owner: "Eric Ripert", 
    email: "contact@le-bernardin.com",
    status: "Verified", 
    rating: 4.9, 
    orders: "2.4k", 
    revenue: "$145k",
    joined: "Jan 2024",
    image: "/images/restaurant-logo-1.jpg"
  },
  { 
    id: "PRO-002", 
    name: "Eleven Madison Park", 
    owner: "Daniel Humm", 
    email: "info@elevenmadison.com",
    status: "Verified", 
    rating: 4.8, 
    orders: "1.8k", 
    revenue: "$120k",
    joined: "Feb 2024",
    image: "/images/restaurant-logo-2.jpg"
  },
  { 
    id: "PRO-003", 
    name: "Sushi Nakazawa", 
    owner: "Daisuke Nakazawa", 
    email: "hello@nakazawa.com", 
    status: "Suspended", 
    rating: 4.2, 
    orders: "850", 
    revenue: "$45k",
    joined: "Mar 2024",
    image: "/images/restaurant-logo-3.jpg"
  },
]

// Mock Pending Applications
const pendingProviders = [
  {
    id: "APP-104",
    name: "The Modern",
    owner: "Abram Bissell",
    email: "apply@themodern.nyc",
    phone: "+1 212-333-1220",
    address: "9 W 53rd St, New York",
    submitted: "2 hours ago",
    documents: "Verified"
  },
  {
    id: "APP-103",
    name: "Per Se",
    owner: "Thomas Keller",
    email: "admin@perseny.com",
    phone: "+1 212-823-9335",
    address: "10 Columbus Circle, New York",
    submitted: "1 day ago",
    documents: "Pending"
  }
]

export default function ProviderManagementAdmin() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30 p-6 md:p-8">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Provider Management</h1>
          <p className="text-zinc-400">Oversee restaurant partners, approve applications, and monitor performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-2">
            <Download size={16} /> Export Data
          </Button>
          <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] gap-2">
            <Plus size={16} /> Invite Provider
          </Button>
        </div>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-zinc-900 border-white/5 rounded-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className={`text-xs ${stat.alert ? 'text-amber-500 font-medium' : 'text-zinc-500'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center border ${stat.alert ? 'bg-amber-900/10 border-amber-500/20 text-amber-500' : 'bg-white/5 border-white/10 text-[#C0A975]'}`}>
                <stat.icon size={20} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Main Content Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <TabsList className="bg-zinc-900 border border-white/5 p-1">
            <TabsTrigger value="active" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">
              Active Providers
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black">
              Pending Requests <Badge className="ml-2 bg-white text-black h-5 px-1.5">2</Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input 
                placeholder="Search providers..." 
                className="bg-zinc-900 border-white/10 pl-9 focus-visible:ring-[#C0A975]" 
              />
            </div>
            <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/5">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* TAB 1: ACTIVE PROVIDERS */}
        <TabsContent value="active">
          <Card className="bg-zinc-900 border-white/5 rounded-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Provider</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Orders</TableHead>
                  <TableHead className="text-zinc-400">Total Revenue</TableHead>
                  <TableHead className="text-zinc-400">Rating</TableHead>
                  <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProviders.map((provider) => (
                  <TableRow key={provider.id} className="border-white/5 hover:bg-white/5 group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={provider.image} />
                          <AvatarFallback className="bg-zinc-800 text-[#C0A975] font-bold">
                            {provider.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{provider.name}</div>
                          <div className="text-xs text-zinc-500">{provider.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`border-0 font-normal ${
                          provider.status === "Verified" ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
                        }`}
                      >
                        {provider.status === "Verified" && <CheckCircle2 size={12} className="mr-1" />}
                        {provider.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-300">{provider.orders}</TableCell>
                    <TableCell className="text-zinc-300 font-medium">{provider.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-[#C0A975]">
                        <span className="font-bold">{provider.rating}</span>
                        <span className="text-xs text-zinc-600">/ 5.0</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 group-hover:text-white">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                          <DropdownMenuLabel>Manage</DropdownMenuLabel>
                          <DropdownMenuItem className="focus:bg-white/10">View Dashboard</DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-white/10">Edit Details</DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem className="text-red-400 focus:bg-red-900/10 focus:text-red-400">
                             Suspend Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* TAB 2: PENDING APPROVALS */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingProviders.map((app) => (
              <Card key={app.id} className="bg-zinc-900 border-white/5 rounded-sm hover:border-[#C0A975]/30 transition-colors">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-sm bg-zinc-800 flex items-center justify-center text-[#C0A975]">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white font-serif">{app.name}</CardTitle>
                      <CardDescription className="text-zinc-500">Owner: {app.owner}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-amber-900/20 text-amber-500 hover:bg-amber-900/20">
                    Awaiting Review
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-zinc-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#C0A975]" /> {app.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#C0A975]" /> {app.phone}
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin size={14} className="text-[#C0A975]" /> {app.address}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2 border-t border-white/5">
                    <Button className="flex-1 bg-green-600 text-white hover:bg-green-700 h-9">
                      <CheckCircle2 size={16} className="mr-2" /> Approve
                    </Button>
                    <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5 hover:text-red-400 h-9">
                      <XCircle size={16} className="mr-2" /> Reject
                    </Button>
                    <Button variant="ghost" size="icon" className="border border-white/10 text-zinc-400">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}