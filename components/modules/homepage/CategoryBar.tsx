// components/category-bar.tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { getIconComponent } from "@/helper/getIconComponent"


export interface CategoryData {
  id: string
  name: string
  icon: string 
}





export function CategoryBar({ categories }: { categories: CategoryData[] }) {
  const [activeId, setActiveId] = React.useState("all")

  return (
    <div className="w-full border-b border-white/10 bg-black backdrop-blur-md z-40">
      <div className="container mx-auto px-4 md:px-12 py-6">
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full flex justify-center">
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories?.map((category) => {
              const isActive = activeId === category.id
              
  
              const Icon = getIconComponent(category.icon)

              return (
                <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-auto">
                  <Button
                    onClick={() => setActiveId(category.id)}
                    variant="outline"
                    className={cn(
                      "rounded-full border px-6 h-10 transition-all duration-300 flex items-center gap-2 font-medium tracking-wide backdrop-blur-sm",
                      isActive
                        ? "bg-[#C0A975]/90 text-black border-[#C0A975]" 
                        : "bg-black/40 text-zinc-300 border-white/10 hover:bg-black/60 hover:text-white hover:border-[#C0A975]"
                    )}
                  >
                    {/* Render the resolved component */}
                    <Icon size={14} className={isActive ? "text-black capitalize" : "text-[#C0A975] capitalize"} />
                    {category.name}
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