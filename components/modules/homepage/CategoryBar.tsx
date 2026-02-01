// components/category-bar.tsx
"use client"

import * as React from "react"
import { Utensils, Coffee, Wine, Leaf, Flame, Sparkles, WheatOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Menu", icon: Utensils },
  { id: "starters", label: "Starters", icon: Sparkles },
  { id: "mains", label: "Mains", icon: Flame },
  { id: "desserts", label: "Desserts", icon: Coffee },
  { id: "drinks", label: "Drinks", icon: Wine },
  { id: "vegan", label: "Vegan", icon: Leaf },
  { id: "gluten-free", label: "Gluten Free", icon: WheatOff },
  { id: "specials", label: "Chef's Specials", icon: Sparkles },
]

export function CategoryBar() {
  const [activeId, setActiveId] = React.useState("all")

  return (
    // WRAPPER: Changed to sticky/absolute or just style the background here
    <div className="w-full border-b border-white/10 bg-black backdrop-blur-md z-40">
      <div className="container mx-auto px-4 md:px-12 py-6">
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full flex justify-center">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => {
              const isActive = activeId === category.id
              const Icon = category.icon

              return (
                <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-auto">
                  <Button
                    onClick={() => setActiveId(category.id)}
                    variant="outline"
                    className={cn(
                      "rounded-full border px-6 h-10 transition-all duration-300 flex items-center gap-2 font-medium tracking-wide backdrop-blur-sm",
                      // Active: Gold background, less transparent
                      isActive
                        ? "bg-[#C0A975]/90 text-black border-[#C0A975]" 
                        : "bg-black/40 text-zinc-300 border-white/10 hover:bg-black/60 hover:text-white hover:border-[#C0A975]"
                    )}
                  >
                    <Icon size={14} className={isActive ? "text-black" : "text-[#C0A975]"} />
                    {category.label}
                  </Button>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-[-2.5rem] bg-black/50 border-[#C0A975]/30 text-[#C0A975] hover:bg-[#C0A975] hover:text-black backdrop-blur-md" />
            <CarouselNext className="right-[-2.5rem] bg-black/50 border-[#C0A975]/30 text-[#C0A975] hover:bg-[#C0A975] hover:text-black backdrop-blur-md" />
          </div>
        </Carousel>
      </div>
    </div>
  )
}