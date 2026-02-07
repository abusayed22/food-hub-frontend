import { mealsFetch } from '@/actions/meal.action'
import { HeroSection } from '@/components/modules/homepage/Hero-section'
import { MealHero } from '@/components/modules/meal-items/MealHero'
import MealItemSection from '@/components/modules/meal-items/MealItemSection'
import { MealCard } from '@/components/modules/MealCard'
import { fetchCategories } from '@/service/category/category.service'
import { getMealsParams } from '@/service/meal/meal.service'
import React from 'react'

interface PageProps {
  searchParams: { 
    category?: string; 
    search?: string; 
    isFeature?: boolean;
    // Add other filters you expect
  }
}

export const dynamic = "force-dynamic";

const page = async({ searchParams }: { searchParams: Promise<getMealsParams> }) => {
const params = await searchParams;

  // Fetch data
  const { data } = await mealsFetch(params, { cache: 'no-store' });
  const { data: categories } = await fetchCategories();

  // Safety checks (optional but recommended to prevent build crashes if API fails)
  const meals = data?.data || [];
  const meta = data?.meta;
  const categoryList = categories?.data || [];

  return (
    <div>
        <MealHero />
      <MealItemSection data={meals} meta={meta} categories={categoryList}/>
    </div>
  )
}

export default page
