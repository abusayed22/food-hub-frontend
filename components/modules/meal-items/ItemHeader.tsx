// components/item-header.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Define the categories from the image
const categories = ["ALL", "STARTERS", "MAINS", "DESSERTS"]

export function ItemHeader() {
  // State to manage the currently active category
  const [activeCategory, setActiveCategory] = React.useState("ALL")

  return (
    <section className="bg-zinc-950 py-16 text-center">
      <div className="container mx-auto px-4">
        {/* Subtitle */}
        <h3 className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase mb-4">
          Culinary Masterpieces
        </h3>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#C0A975] mb-6">
          Signature Dishes
        </h2>

        {/* Separator Line */}
        <div className="h-px w-24 bg-[#C0A975] mx-auto mb-10 opacity-50"></div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "text-sm font-medium tracking-widest uppercase transition-colors",
                // Apply active style if this is the selected category
                activeCategory === category
                  ? "text-[#C0A975]"
                  : "text-zinc-500 hover:text-[#C0A975]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}