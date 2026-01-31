"use client"

import * as React from "react"
import Image from "next/image"
import { Star, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { meals } from "../meal-items/MealItemSection"

// Define the gold color constant
const goldColor = "#C0A975"

// Define the Meal interface
interface Meal {
  id: string
  title: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  isNew?: boolean
}

// Mock Data for Signature Dishes (from image_4.png)


// Categories for the filter
const categories = ["ALL", "STARTERS", "MAINS", "DESSERTS"]

export function SignatureDishesSection() {
  // State to manage the currently active category
  const [activeCategory, setActiveCategory] = React.useState("ALL")

  return (
    <section className="bg-zinc-950 py-16">
      <div className="container mx-auto px-4">
        
        {/* 1. Section Header (from image_1.png and image_4.png) */}
        <div className="text-center mb-12">
          <h3 className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase mb-4">
            Culinary Masterpieces
          </h3>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#C0A975] mb-6">
            Signature Dishes
          </h2>
          <div className="h-px w-24 bg-[#C0A975] mx-auto mb-10 opacity-50"></div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "text-sm font-medium tracking-widest uppercase transition-colors relative pb-2",
                  activeCategory === category
                    ? "text-[#C0A975] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#C0A975]"
                    : "text-zinc-500 hover:text-[#C0A975]"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Meal Cards Grid (from image_4.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {meals.map((meal) => (
            <Card key={meal.id} className="w-full max-w-sm overflow-hidden rounded-none border-none bg-zinc-950 shadow-xl group">
              
              {/* Image Header & Badges */}
              <CardHeader className="relative p-0">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={meal.image}
                    alt={meal.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* New Badge */}
                  {/* {meal.isNew && (
                    <Badge className="absolute left-4 top-4 rounded-sm bg-[#C0A975] text-black px-2 py-1 text-xs font-medium uppercase tracking-wider">
                      NEW
                    </Badge>
                  )} */}
                  {/* Rating Badge */}
                  <Badge
                    className={cn(
                      "absolute right-4 top-4 flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-xs font-medium backdrop-blur-sm"
                    )}
                    style={{ color: goldColor }}
                  >
                    <Star className="h-3 w-3 fill-current" />
                    {meal.rating.toFixed(1)}
                  </Badge>
                </div>
              </CardHeader>

              {/* Content Section */}
              <CardContent className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <h3
                    className="text-xl font-serif font-medium text-white group-hover:text-[#C0A975] transition-colors"
                    style={{ color: goldColor }}
                  >
                    {meal.title}
                  </h3>
                  <span
                    className="text-lg font-medium"
                    style={{ color: goldColor }}
                  >
                    ${meal.price}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400 line-clamp-2">
                  {meal.description}
                </p>

                <Separator className="my-6 bg-white/10" />

                {/* Footer: Category & Add Button */}
                <CardFooter className="p-0 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {meal.category}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex items-center gap-1 rounded-none border transition-colors hover:bg-[#C0A975] hover:text-black"
                    )}
                    style={{ borderColor: goldColor, color: goldColor }}
                  >
                    <Plus className="h-4 w-4" />
                    ADD TO ORDER
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}