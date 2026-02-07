import { mealsFetch } from '@/actions/meal.action'
import { CategoryBar } from '@/components/modules/homepage/CategoryBar'
import { FeaturedEstablishments } from '@/components/modules/homepage/FeaturedEstablishments'
import { HeroSection } from '@/components/modules/homepage/Hero-section'
import { HowWork } from '@/components/modules/homepage/HowWork'
import { DishesSection } from '@/components/modules/homepage/DishesSection'
import { SignatureDishesSection } from '@/components/modules/homepage/SigninatureDishSection'
import { TestimonialSection } from '@/components/modules/homepage/TestimonialSection'
import { fetchCategories } from '@/service/category/category.service'
import { getMealsParams } from '@/service/meal/meal.service'
import { userService } from '@/service/user/user.service'


export const dynamic = "force-dynamic";



interface PageProps {
  searchParams: { 
    category?: string; 
    search?: string; 
    isFeature?: boolean;
    // Add other filters you expect
  }
}



const CommonPage = async({ searchParams }: { searchParams: Promise<getMealsParams> }) => {
const params = await searchParams;
const currentPage = Number(params.page) || 1;
const paramsObj = {...params,limit: 12, page:currentPage}


  const {data:categoriesData,error} = await fetchCategories();
  const categories = categoriesData.data;

   const { data:mealData } = await mealsFetch(
    { isFeatured: true,limit: 10, page: 1 }, 
    { }
  );
   const { data:sMealData } = await mealsFetch(
    { isFeatured: true,limit: 10, page: 1 }, 
    { }
  );

  const { data:dynamicMealData } = await mealsFetch(
    paramsObj, 
    { cache: 'no-store' }
  );
  const mealsData = dynamicMealData.data
  const mealsMeta = dynamicMealData.meta

  const isFeaturedMeals = mealData.data
  const isFeaturedMeta = mealData.meta
  const isSignituredMeals = sMealData.data
  const isSignituredMeta = sMealData.meta


  return (
    <div>
      <HeroSection />
      <HowWork />
      <CategoryBar categories={categories}/>
      <FeaturedEstablishments meals={isFeaturedMeals}/>
      <SignatureDishesSection meals={isSignituredMeals}/>
      <DishesSection key={JSON.stringify(paramsObj)} meals={mealsData} meta={mealsMeta} categories={categories}/>
      <TestimonialSection />
    </div>
  )
}

export default CommonPage
