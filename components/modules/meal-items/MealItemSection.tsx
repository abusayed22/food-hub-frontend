// components/modules/meal-item/MealItemSection.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MealCard } from '../MealCard'
import { ItemHeader } from './ItemHeader'
import { CategoryData, MenuData } from '@/constant/type'

// --- Types ---
export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MealItemSectionProps {
  data: MenuData[];
  meta?: MetaData;
  categories: CategoryData[];
  selectedCategory?: string; // Passed from page.tsx (searchParams.category)
}

const MealItemSection = ({ 
  data: meals, 
  meta, 
  categories,
  selectedCategory = 'all' 
}: MealItemSectionProps) => {

  // 1. Logic for Dynamic Title (Server Side)
  // We handle the text formatting here without needing client hooks
  const displayTitle = selectedCategory === 'all' 
    ? "Signature Dishes" 
    : selectedCategory.replace(/-/g, " ");

  return (
    <section className="bg-zinc-950 py-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* 2. Client Component for Buttons */}
        {/* We pass the categories to the interactive header */}
        <ItemHeader categories={categories} />

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase">
              {selectedCategory === 'all' ? "Curated Menu" : "Selected Category"}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white capitalize">
              {displayTitle}
            </h2>
          </div>

          {/* Optional: Desktop 'View All' Link */}
          {/* <Button asChild variant="ghost" className="...">...</Button> */}
        </div>

        {/* 3. Empty State Handling */}
        {meals.length === 0 ? (
           <div className="py-20 text-center text-zinc-500">
              <p className="text-xl font-serif">No dishes found in this category.</p>
              <Button variant="link" asChild className="text-[#C0A975] mt-4">
                <Link href="/meal-item">View all dishes</Link>
              </Button>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {meals.map((meal) => {
              // 4. Safe Data Mapping
              // Calculate average rating if your API returns an array of reviews
              // const avgRating = meal.reviews?.length 
              //   ? meal.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / meal.reviews.length
              //   : 5.0; // Default or meal.rating if it exists directly

              return (
                <MealCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.name} // Map 'name' to 'title'
                  description={meal.description || "A delicate culinary masterpiece."}
                  price={meal.price}
                  image={meal.image || "/placeholder-food.jpg"}
                  rating={meal.ratings}
                  // Handle nested category object or fallback string
                  category={typeof meal.category === 'object' ? meal.category?.name : "Fine Dining"}
                />
              )
            })}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="border-[#C0A975] text-[#C0A975] hover:bg-[#C0A975] hover:text-black rounded-none px-8 tracking-widest"
          >
            <Link href="/menu">
              VIEW FULL MENU
            </Link>
          </Button>
        </div>
        
      </div>
    </section>
  )
}

export default MealItemSection