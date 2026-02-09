"use server"

import { categoriesService } from "@/service/category/category.service";


export enum CategoryStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVE = 'DEACTIVE',
}

// 2. Define the Main Interface
export interface CategoryInputParams {
  name: string;
}

export async function createCategory(formData: CategoryInputParams) {


    const { data, error } = await categoriesService.createCategory(formData);
    console.log(data)
    console.log(error)
    
    return { data, error };
}