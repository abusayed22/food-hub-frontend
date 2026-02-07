"use client"

import * as React from "react"
import Image from "next/image"
import { Star, Plus, ArrowRight } from "lucide-react"

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
import Link from "next/link"
// import { meals } from "../meal-items/MealItemSection"

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



export function SignatureDishesSection({meals}:{meals:Meal[]}) {
  // State to manage the currently active category
  const [activeCategory, setActiveCategory] = React.useState("ALL")

  return (
    <section className="bg-zinc-950 py-16">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#C0A975] font-serif md:text-4xl">
            Signitured Establishments
          </h2>
          <Button
            asChild
            variant="ghost"
            className="group hidden p-0 text-sm font-medium tracking-widest text-[#C0A975] hover:bg-transparent hover:text-[#D4B988] md:inline-flex"
          >
            <Link href="/collections">
              VIEW ALL COLLECTIONS
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
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
                    {meal.rating}
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