// hooks/use-cart.ts
"use client"

import { useState, useEffect } from "react"

export interface CartItem {
  id: number | string
  name: string
  price: number
  quantity: number
  image: string
  details?: string
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // 1. Load from LocalStorage on Mount
  useEffect(() => {
    setIsMounted(true)
    const storedCart = localStorage.getItem("epicure-cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse cart data", error)
      }
    }
  }, [])

  // 2. Save to LocalStorage whenever items change (only after mount)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("epicure-cart", JSON.stringify(items))
    }
  }, [items, isMounted])

  // --- Actions ---

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentItems, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: number | string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number | string, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const clearCart = () => setItems([])

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isMounted, // Expose this so components know when to render
  }
}