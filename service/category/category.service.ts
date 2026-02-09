import { CategoryInputParams } from "@/actions/categories.action";
import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

const API = env.API_URL;


export const categoriesService = {
  fetchCategories: async function () {
    try {
      const response = await fetch(`${API}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["categories"] // This tag links to revalidateTag("categories")
        }
      });

      const data = await response.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong", error } };
    }
  },

  createCategory: async function (formData:CategoryInputParams) {
    try {
       const cookieStore = await cookies()
      const response = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString()
        },
        next:{},
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      updateTag('categories')
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong", error } };
    }
  }
}



