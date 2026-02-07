"use client"

import * as React from "react"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation" // 1. Import Navigation Hooks
import {
   Plus, Search, MoreVertical, Edit, Trash2,
   Image as ImageIcon, Loader2
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import {
   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
   DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs" // Removed TabsContent (we render manually now)
import { CategoryData, MenuData } from "@/constant/type"

// Import your components and service
import { AddEditMenuForm, MenuFormValues } from "./AddEditMenuForm"
import { deleteMeal, mealsFetch } from "@/actions/meal.action"


interface Props {
   categoriesData: CategoryData[]
   mealData:MenuData[]
}

export default function MenuManagementProvider({ categoriesData,mealData }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   // 2. Read State from URL
   const currentCategory = searchParams.get('category') || 'All'
   const currentSearch = searchParams.get('search') || ''

   const safeCategories = Array.isArray(categoriesData) ? categoriesData : [];
   const displayCategories = [{ id: "All", name: "All" }, ...safeCategories];

   // 3. Local State is ONLY for storing the fetched data
   const [items, setItems] = React.useState<MenuFormValues[]>([])
   // const [isLoading, setIsLoading] = React.useState(true)
   

   // Sheet State
   const [isSheetOpen, setIsSheetOpen] = React.useState(false)
   const [selectedItem, setSelectedItem] = React.useState<MenuFormValues | null>(null)


   // Update URL for Search (Debounced manually)
   const handleSearch = (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('search', term);
      } else {
         params.delete('search');
      }
      // Replace URL without reloading page
      router.replace(`${pathname}?${params.toString()}`);
   }

   // Update URL for Category
   const handleCategoryChange = (catId: string) => {
      const params = new URLSearchParams(searchParams);
      if (catId && catId !== "All") {
         params.set('category', catId);
      } else {
         params.delete('category'); // Remove param for "All"
      }
      // Reset search when changing category? (Optional, usually good UX)
      // params.delete('search'); 

      router.replace(`${pathname}?${params.toString()}`);
   }

   // --- Actions ---

   const handleFormSubmit = async () => {
      router.refresh();
      window.location.reload(); // Simple brute force, or better: extract loadData to a function outside useEffect
   }

   // ... (Keep handleEdit, handleAddNew, toggleAvailability logic) ...
   const handleEdit = (item: MenuFormValues) => {
      setSelectedItem(item)
      setIsSheetOpen(true)
   }

   const handleDelete = async (id: string) => {
    // A simple confirmation dialog
    if (!confirm("Are you sure you want to delete this dish? This cannot be undone.")) {
        return;
    }

    const toastId = toast.loading("Deleting item...");

    try {
        // Call the Server Action
        const res = await deleteMeal(id);

        if (res.error) {
            toast.error(res.error.message, { id: toastId });
            return;
        }

        toast.success("Item deleted successfully", { id: toastId });
        router.refresh(); 

    } catch (error) {
        toast.error("Something went wrong", { id: toastId });
    }
}

   const handleAddNew = () => {
      setSelectedItem(null)
      setIsSheetOpen(true)
   }

   const toggleAvailability = (id: string | undefined) => {
      // ... logic to call API and update local items state ...
      toast.info("Update logic needs API call implementation")
   }

   const getCategoryName = (id: string) => safeCategories.find(c => c.id === id)?.name || "Unknown";

   return (
      <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30 p-6 md:p-8">

         {/* Header... same as before */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
               <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Menu Management</h1>
               <p className="text-zinc-400">Organize your dishes, pricing, and availability.</p>
            </div>
            <Button onClick={handleAddNew} className="bg-[#C0A975] text-black hover:bg-[#D4B988] gap-2">
               <Plus size={16} /> Add New Item
            </Button>
         </div>

         <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900/50 p-2 rounded-sm border border-white/5">
               {/* CATEGORY TABS (Driven by URL) */}
               <Tabs
                  value={currentCategory}
                  onValueChange={handleCategoryChange}
                  className="w-full md:w-auto"
               >
                  <TabsList className="bg-transparent h-auto p-0 gap-2 flex-wrap justify-start">
                     {displayCategories.map(cat => (
                        <TabsTrigger
                           key={cat.id}
                           value={cat.id}
                           className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black rounded-sm px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                        >
                           {cat.name}
                        </TabsTrigger>
                     ))}
                  </TabsList>
               </Tabs>

               {/* SEARCH INPUT (Driven by URL) */}
               <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                     <Input
                        placeholder="Search menu..."
                        defaultValue={currentSearch} // Use defaultValue for uncontrolled input (better performance)
                        onChange={(e) => handleSearch(e.target.value)}
                        className="bg-black/20 border-white/10 pl-9 focus-visible:ring-[#C0A975] text-white"
                     />
                  </div>
               </div>
            </div>

            {/* DATA TABLE */}
            <Card className="bg-zinc-900 border-white/5 rounded-sm overflow-hidden">
               <Table>
                  <TableHeader className="bg-white/5">
                     <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-zinc-400 w-[80px]">Image</TableHead>
                        <TableHead className="text-zinc-400">Name & Details</TableHead>
                        <TableHead className="text-zinc-400">Category</TableHead>
                        <TableHead className="text-zinc-400">Price</TableHead>
                        <TableHead className="text-zinc-400">Status</TableHead>
                        <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {/* {isLoading ? ( */}
                        {/* <TableRow>
                           <TableCell colSpan={6} className="h-32 text-center">
                              <div className="flex justify-center items-center gap-2 text-zinc-500">
                                 <Loader2 className="animate-spin h-5 w-5" /> Loading...
                              </div>
                           </TableCell>
                        </TableRow> */}
                     {/* ) :  */}
                     {
                     mealData.length > 0 ? (
                        mealData.map((item) => (
                           <TableRow key={item.id} className="border-white/5 hover:bg-white/5 group">
                              {/* ... Table Cells (Same as your previous code) ... */}
                              {/* Image */}
                              <TableCell>
                                 <div className="h-12 w-12 rounded-sm bg-zinc-800 relative overflow-hidden border border-white/10">
                                    {item.image && (item.image.startsWith("http") || item.image.startsWith("/")) ? (
                                       <Image
                                          src={item.image}
                                          alt={item.name}
                                          fill
                                          className="object-cover"
                                       />
                                    ) : (
                                       <div className="flex items-center justify-center h-full text-zinc-600">
                                          <ImageIcon size={16} />
                                       </div>
                                    )}
                                 </div>
                              </TableCell>

                              {/* Name/Desc */}
                              <TableCell>
                                 <div className="flex items-center gap-2">
                                    <span className="font-medium text-white">{item.name}</span>
                                    {/* {item.isNew && <Badge className="bg-blue-600 text-[10px] h-5 px-1">New</Badge>} */}
                                 </div>
                                 <div className="text-xs text-zinc-500 max-w-[200px] truncate">{item.description}</div>
                              </TableCell>

                              {/* Category */}
                              <TableCell>
                                 <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 font-normal">
                                    {getCategoryName(item.category_id)}
                                 </Badge>
                              </TableCell>

                              {/* Price */}
                              <TableCell className="font-mono text-[#C0A975]">${item.price.toFixed(2)}</TableCell>

                              {/* Availability */}
                              <TableCell>
                                 {/* <Switch checked={item.isAvailable} onCheckedChange={() => toggleAvailability(item.id)} className="data-[state=checked]:bg-green-600" /> */}
                              </TableCell>

                              {/* Actions */}
                              <TableCell className="text-right">
                                 <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                       <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white"><MoreVertical size={16} /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                                       <DropdownMenuItem onClick={() => handleEdit(item as MenuFormValues)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                       <DropdownMenuItem onClick={() => handleDelete(item.id as string)} className="text-red-400"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                 </DropdownMenu>
                              </TableCell>
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                              No items found for {currentCategory} {currentSearch && `matching "${currentSearch}"`}.
                           </TableCell>
                        </TableRow>
                     )
                     }
                  </TableBody>
               </Table>
            </Card>
         </div>

         <AddEditMenuForm
            isOpen={isSheetOpen}
            onClose={setIsSheetOpen}
            initialData={selectedItem}
            categories={safeCategories}
            onSubmit={handleFormSubmit}
         />
      </div>
   )
}