import { mealsFetch } from '@/actions/meal.action';
import MenuManagementProvider from '@/components/modules/provider/MenuManagementProvider'
import { fetchCategories } from '@/service/category/category.service';
import React from 'react'




interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const MenuManagementPage = async({searchParams}:PageProps) => {

  const categories = await fetchCategories();
  const params = await searchParams;

  const categoriesData = categories?.data?.data|| [];
  const { data, error } = await mealsFetch(params, { cache: 'no-store' });
  const mealData = data?.data
  return (
    <div>
      <MenuManagementProvider categoriesData={categoriesData} mealData={mealData}/>
    </div>
  )
}

export default MenuManagementPage
