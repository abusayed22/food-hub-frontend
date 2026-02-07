"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner" 

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void // Added this useful feature
  clearCart: () => void
  totalItems: number
  cartTotal: number
  deliveryCharge: number 
  grandTotal: number     
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false) // Prevents overwriting local storage on load


  // Configuration (You can make this dynamic later)
  const FIXED_DELIVERY_CHARGE = 5.00;

  // 1. LOAD CART (Run once on mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to parse cart", error)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // 2. SAVE CART (Run whenever items change, BUT only after loading)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  // --- ACTIONS ---

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)
      
      if (existingItem) {
        toast.success("Updated quantity in cart")
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      toast.success("Added to cart")
      return [...prevItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    toast.info("Item removed from cart")
  }

  // New: Allow users to change quantity directly (e.g. in the cart sheet)
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems((prev) => 
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success("Cart cleared")
  }

  // --- CALCULATIONS ---

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  
  const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  // Only charge delivery if cart has items
  const deliveryCharge = cartTotal > 0 ? FIXED_DELIVERY_CHARGE : 0
  
  const grandTotal = cartTotal + deliveryCharge

  // Prevent hydration mismatch by not rendering until loaded
  if (!isLoaded) {
    return null 
  }

  return (
    <CartContext.Provider value={{ 
        items, 
        addToCart, 
        removeFromCart,
        updateQuantity, 
        clearCart, 
        totalItems, 
        cartTotal,
        deliveryCharge, 
        grandTotal 
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}