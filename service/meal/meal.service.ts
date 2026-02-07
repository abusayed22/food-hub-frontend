
import { MenuFormValues } from "@/components/modules/provider/AddEditMenuForm";
import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { userService } from "../user/user.service";

const API = env.API_URL;


export interface getMealsParams {
    limit?: number
    skip?: number
    page?: number
    isFeatured?: boolean
    tags?: string[]
    search?: string
    category_id?: string
    maxPrice?: number
    minPrice?: number
    isSignature?: boolean
    isNew?: boolean
    isAvailable?: boolean
}

export interface getMealsOptions {
    cache?: string
    revalidate?: number;
}


export const mealService = {
    creatMeal: async (formData: MenuFormValues) => {
        try {
            const cookieStore = await cookies()
            const response = await fetch(`${API}/meals`, {
                method: 'POST',
                // next: { revalidate: 10 },
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(formData)
            });



            const data = await response.json();
            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }



            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },

    fetchMeals: async (params: getMealsParams, option: getMealsOptions, api: string) => {
        try {
            // const BASE_API = env.API_URL;
            const url = new URL(`${api}/meals`)
            const searchParams = url.searchParams;

            const { data: SesstionData } = await userService.getSession();
            // TODO: 
            // const user_id = SesstionData?.user?.id || SesstionData?.id;
            
            // if (user_id) {
            //     searchParams.append("user_id", user_id || "");
            // }

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        searchParams.append(key, String(value))
                    }
                })
            };

            const config: RequestInit = {};

            if (option?.cache) {
                config.cache = option.cache as RequestCache
            }

            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }

            config.next = { ...config.next, tags: ["Meals"] }

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                // Read text explicitly to see the error message (e.g., "Unauthorized")
                const errorText = await res.text();
                console.error("Fetch failed:", res.status, errorText);
                return { data: null, error: `Error ${res.status}: ${errorText}` };
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (error) {
            console.error(error)
            return { data: null, error: error };
        }
    },

    updateMeal: async (formData: MenuFormValues) => {
        try {
            const cookieStore = await cookies();

            if (!formData.id) {
                return { data: null, error: { message: "Error: Meal ID is missing." } };
            }

            const { id, ...updateData } = formData;

            const response = await fetch(`${API}/meals/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(updateData)
            });



            const data = await response.json();
            
            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },
    
    deleteMeal: async (mealId:string) => {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${API}/meals/${mealId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                }
            });



            const data = await response.json();
            
            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },
}


