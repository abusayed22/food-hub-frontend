import { env } from "@/env";

const API = env.API_URL;

export async function fetchCategories() {
  try {
    const response = await fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong",error } };
  }
}
