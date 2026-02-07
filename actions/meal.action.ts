"use server";
import { MenuFormValues } from "@/components/modules/provider/AddEditMenuForm";
import { env } from "@/env";
import { getMealsOptions, getMealsParams, mealService } from "@/service/meal/meal.service";
import { updateTag } from "next/cache";

export async function menuSubmit(formData: MenuFormValues) {
    const { data, error } = await mealService.creatMeal(formData);
    if(!error && data){
        console.log("Checking....")
        updateTag("Meals")
    }
    return { data, error };
}

export async function updateMeal(formData: MenuFormValues) {
    const { data, error } = await mealService.updateMeal(formData);
    if(!error && data){
        updateTag("Meals")
    }
    return { data, error };
}

export async function deleteMeal(mealId:string) {
    const { data, error } = await mealService.deleteMeal(mealId);
    if(!error && data){
        updateTag("Meals")
    }
    return { data, error };
}


export async function mealsFetch(params: getMealsParams,option:getMealsOptions) {
    const API = env.API_URL;
    const { data, error } = await mealService.fetchMeals(params, option,API);
    
    return { data, error };
}