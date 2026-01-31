// app/admin/menu/page.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, 
  Image as ImageIcon, DollarSign, Tag, CheckCircle2 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- Type Definitions ---
interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: boolean
  active: boolean
}

// --- Mock Data ---
const initialItems: MenuItem[] = [
  { id: 1, name: "Gold Leaf Chocolate", description: "Valrhona dark chocolate sphere, edible 24k gold.", price: 45.00, category: "Desserts", image: "/images/dessert.jpg", stock: true, active: true },
  { id: 2, name: "Wagyu Truffle Burger", description: "A5 Japanese Wagyu beef, shaved black truffle.", price: 85.00, category: "Mains", image: "/images/burger.jpg", stock: true, active: true },
  { id: 3, name: "Lobster Thermidor", description: "Whole Maine lobster, cognac cream sauce.", price: 120.00, category: "Seafood", image: "/images/lobster.jpg", stock: false, active: true },
  { id: 4, name: "Tuna Tartare", description: "Yellowfin tuna, avocado, soy ginger dressing.", price: 32.00, category: "Starters", image: "/images/tuna.jpg", stock: true, active: false },
]

const categories = ["All", "Starters", "Mains", "Seafood", "Desserts", "Drinks"]

export default function MenuManagementProvider() {
  const [items, setItems] = React.useState(initialItems)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<MenuItem | null>(null)

  // Handlers
  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setIsSheetOpen(true)
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setIsSheetOpen(true)
  }

  const toggleStock = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, stock: !item.stock } : item))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30 p-6 md:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Menu Management</h1>
          <p className="text-zinc-400">Organize your dishes, pricing, and availability.</p>
        </div>
        <Button onClick={handleAddNew} className="bg-[#C0A975] text-black hover:bg-[#D4B988] gap-2">
          <Plus size={16} /> Add New Item
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="All" className="space-y-6">
        
        {/* Toolbar: Categories & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900/50 p-2 rounded-sm border border-white/5">
           <TabsList className="bg-transparent h-auto p-0 gap-2 flex-wrap justify-start">
              {categories.map(cat => (
                 <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black rounded-sm px-4 py-2 text-zinc-400"
                 >
                    {cat}
                 </TabsTrigger>
              ))}
           </TabsList>

           <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                 <Input 
                    placeholder="Search menu..." 
                    className="bg-black/20 border-white/10 pl-9 focus-visible:ring-[#C0A975]" 
                 />
              </div>
           </div>
        </div>

        {/* Menu Table */}
        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <Card className="bg-zinc-900 border-white/5 rounded-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-zinc-400 w-[80px]">Image</TableHead>
                    <TableHead className="text-zinc-400">Name & Description</TableHead>
                    <TableHead className="text-zinc-400">Category</TableHead>
                    <TableHead className="text-zinc-400">Price</TableHead>
                    <TableHead className="text-zinc-400">Availability</TableHead>
                    <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items
                    .filter(item => cat === "All" || item.category === cat)
                    .map((item) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-white/5 group">
                      {/* Image */}
                      <TableCell>
                        <div className="h-12 w-12 rounded-sm bg-zinc-800 relative overflow-hidden border border-white/10">
                           <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                      </TableCell>
                      
                      {/* Name/Desc */}
                      <TableCell>
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-zinc-500 max-w-[200px] truncate">{item.description}</div>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 font-normal hover:bg-zinc-800">
                           {item.category}
                        </Badge>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="font-mono text-[#C0A975]">${item.price.toFixed(2)}</TableCell>

                      {/* Availability Toggle */}
                      <TableCell>
                         <div className="flex items-center gap-2">
                            <Switch 
                               checked={item.stock} 
                               onCheckedChange={() => toggleStock(item.id)}
                               className="data-[state=checked]:bg-green-600"
                            />
                            <span className={`text-xs ${item.stock ? 'text-green-500' : 'text-red-500'}`}>
                               {item.stock ? 'In Stock' : 'Sold Out'}
                            </span>
                         </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                            <DropdownMenuItem onClick={() => handleEdit(item)} className="focus:bg-white/10 cursor-pointer">
                               <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/10 focus:text-red-400 cursor-pointer">
                               <Trash2 className="mr-2 h-4 w-4" /> Delete Item
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
        ))}
      </Tabs>

      {/* Add/Edit Slide-over Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
         <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-950 border-l border-white/10 text-white overflow-y-auto">
            <SheetHeader className="mb-6">
               <SheetTitle className="text-2xl font-serif text-[#C0A975]">
                  {editingItem ? "Edit Dish" : "New Dish"}
               </SheetTitle>
               <SheetDescription className="text-zinc-400">
                  {editingItem ? "Update the details for this menu item." : "Add a new culinary masterpiece to your menu."}
               </SheetDescription>
            </SheetHeader>
            
            <div className="space-y-6 pb-6">
               
               {/* Image Upload Placeholder */}
               <div className="space-y-2">
                  <Label className="text-zinc-300">Item Image</Label>
                  <div className="border-2 border-dashed border-white/20 rounded-sm bg-black/20 h-48 flex flex-col items-center justify-center text-zinc-500 hover:border-[#C0A975]/50 hover:text-[#C0A975] transition-colors cursor-pointer">
                     {editingItem ? (
                        <div className="relative h-full w-full">
                           <Image src={editingItem.image} alt="Preview" fill className="object-cover rounded-sm opacity-50 hover:opacity-100 transition-opacity" />
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="bg-black/70 px-3 py-1 rounded text-white text-xs">Click to change</span>
                           </div>
                        </div>
                     ) : (
                        <>
                           <ImageIcon size={32} className="mb-2" />
                           <span className="text-sm">Upload Photo</span>
                        </>
                     )}
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">Dish Name</Label>
                  <Input id="name" defaultValue={editingItem?.name} placeholder="e.g. Truffle Risotto" className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975]" />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="desc" className="text-zinc-300">Description</Label>
                  <Textarea id="desc" defaultValue={editingItem?.description} placeholder="Ingredients, preparation style..." className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] min-h-[100px]" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="price" className="text-zinc-300">Price ($)</Label>
                     <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input id="price" type="number" defaultValue={editingItem?.price} className="pl-9 bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975]" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="category" className="text-zinc-300">Category</Label>
                     <Select defaultValue={editingItem?.category || "Mains"}>
                        <SelectTrigger className="bg-zinc-900 border-white/10 focus:ring-[#C0A975]">
                           <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                           {categories.filter(c => c !== "All").map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               {/* Additional Options */}
               <div className="space-y-4 pt-4 border-t border-white/10">
                  <Label className="text-zinc-300 mb-2 block">Settings</Label>
                  
                  <div className="flex items-center justify-between p-3 border border-white/10 rounded-sm bg-white/[0.02]">
                     <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">Mark as "Bestseller"</span>
                     </div>
                     <Switch className="data-[state=checked]:bg-[#C0A975]" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-white/10 rounded-sm bg-white/[0.02]">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">Active (Visible on menu)</span>
                     </div>
                     <Switch defaultChecked={editingItem?.active ?? true} className="data-[state=checked]:bg-[#C0A975]" />
                  </div>
               </div>

            </div>

            <SheetFooter>
               <Button variant="outline" onClick={() => setIsSheetOpen(false)} className="flex-1 border-white/10 text-white hover:bg-white/5">Cancel</Button>
               <Button className="flex-1 bg-[#C0A975] text-black hover:bg-[#D4B988]">
                  {editingItem ? "Save Changes" : "Create Item"}
               </Button>
            </SheetFooter>
         </SheetContent>
      </Sheet>

    </div>
  )
}