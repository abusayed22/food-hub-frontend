// components/cart-sheet.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Mock data to simulate cart items
const initialItems = [
  {
    id: 1,
    name: "Gold Leaf Chocolate",
    price: 45,
    quantity: 1,
    image: "https://img.freepik.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?ga=GA1.1.1221827327.1769762132&semt=ais_hybrid&w=740&q=80", // Replace with your image
    details: "Dark chocolate, 24k gold"
  },
  {
    id: 2,
    name: "Wagyu Truffle Burger",
    price: 85,
    quantity: 2,
    image: "https://img.freepik.com/free-photo/fresh-vegetable-salad-with-grilled-chicken-breast_2829-14105.jpg?t=st=1769784279~exp=1769787879~hmac=c8822aac31a114c077dfb552386bfdefa4582ab2743912de74c6c2dee5a7bd10&w=1060",
    details: "Medium rare, extra cheese"
  }
]

export function CartSheet() {
  const [items, setItems] = React.useState(initialItems)

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = 15
  const total = subtotal + deliveryFee

  // Handlers (In a real app, these would be context actions)
  const updateQuantity = (id: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) }
      }
      return item
    }))
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative text-white hover:text-[#C0A975]">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C0A975] text-[10px] font-bold text-black">
            {items.length}
          </span>
        </Button>
      </SheetTrigger>
      
      <SheetContent className="flex w-full flex-col bg-zinc-950 px-4 text-white border-l border-white/10 sm:max-w-lg">
        <SheetHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-serif text-[#C0A975]">
              Your Order ({items.length})
            </SheetTitle>
            {/* Close button is handled automatically by SheetContent, but we can customize styling if needed */}
          </div>
        </SheetHeader>

        {/* CART ITEMS LIST */}
        <ScrollArea className="flex-1 -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-zinc-500 min-h-[300px]">
              <ShoppingBag className="h-16 w-16 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Item Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-zinc-900 border border-white/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-serif font-medium text-white">{item.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{item.details}</p>
                      </div>
                      <p className="font-medium text-[#C0A975]">${item.price * item.quantity}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                        <button 
                           onClick={() => updateQuantity(item.id, 1)}
                           className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* FOOTER: Totals & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Fee</span>
                <span>${deliveryFee}</span>
              </div>
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-between text-base font-medium text-white">
                <span>Total</span>
                <span className="text-[#C0A975] font-serif text-lg">${total}</span>
              </div>
            </div>

            <SheetFooter className="sm:justify-between gap-2">
               {/* Close Button (Mobile friendly) */}
              <SheetClose asChild>
                <Button variant="outline" className="w-full sm:w-1/3 border-white/10 text-white hover:bg-white/5 hover:text-white">
                  Keep Browsing
                </Button>
              </SheetClose>
              
              <Button className="w-full sm:w-2/3 bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium tracking-wide">
                CHECKOUT
              </Button>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}