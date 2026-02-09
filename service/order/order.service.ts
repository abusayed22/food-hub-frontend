
import { MenuFormValues } from "@/components/modules/provider/AddEditMenuForm";
import { env } from "@/env";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { userService } from "../user/user.service";

const API = env.API_URL;


export interface GetOrderParams {
    search?: string;
    user_id?: string;
    orderNumber?: string;
    status?: string;
    paymentStatus?: string;
    paymentMethod?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    minTotal?: number;
    maxTotal?: number;
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface GetUsersParams {
  search?: string;      
  role?: string;        
  status?: string;      
  verified?: string;    
  page?: number | string;
  limit?: number | string;
  sortBy?: string
  sortOrder?: 'asc' | 'desc';
}

export interface getOrderOptions {
    cache?: string
    revalidate?: number;
}

export interface OrderItemInput {
    mealId: string;
    quantity: number;
    price: number;
}

export interface CreateOrderParams {
    //   customerName?: string;
    customerPhone: string;
    deliveryAddress: string;
    deliveryNote?: string;
    subtotal: number;
    deliveryFee?: number;
    totalAmount: number;
    items: OrderItemInput[];
    paymentMethod?: string;
    orderNumber: string;
}

export const ORDER_STATUSES = [
  'PENDING', 
  'CONFIRMED', 
  'PREPARING', 
  'READY', 
  'OUT_FOR_DELIVERY', 
  'DELIVERED', 
  'CANCELLED'
] as const;
export type OrderStatusType = typeof ORDER_STATUSES[number];


export const orderService = {
    creatOrder: async (formData: CreateOrderParams) => {
        try {
            const cookieStore = await cookies()
            const response = await fetch(`${API}/orders`, {
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

    fetchOrder: async (params: GetOrderParams, option: getOrderOptions, api: string) => {
        try {
            const url = new URL(`${api}/orders`)
            const searchParams = url.searchParams;

            // --- 1. Get Session & Append User ID ---
            const { data: SessionData } = await userService.getSession();
            const user_id = SessionData?.user?.id || SessionData?.id;

            if (user_id) {
                searchParams.append("user_id", user_id); // Append exact ID string
            }

            // --- 2. Append Filter Params ---
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        searchParams.append(key, String(value))
                    }
                })
            };

            // --- 3. CRITICAL: Get Cookies for Auth ---
            const cookieStore = await cookies();

            const config: RequestInit = {
                headers: {
                    'Content-Type': 'application/json',
                    // This passes your login session to the backend API
                    Cookie: cookieStore.toString()
                }
            };

            // --- 4. Cache Config ---
            if (option?.cache) {
                config.cache = option.cache as RequestCache
            }

            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }

            // Updated tag to "orders" (was "Meals")
            config.next = { ...config.next, tags: ["orders"] }

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
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

    updateOrder: async (orderId: string, newStatus: string) => {
        try {
            const cookieStore = await cookies();

            if (!orderId) {
                return { data: null, error: { message: "Error: order ID is missing." } };
            }
            

            if (!ORDER_STATUSES.includes(newStatus as OrderStatusType)) {
                return {
                    error: `Invalid Status. Allowed: ${Object.values(ORDER_STATUSES).join(", ")}`
                };
            }

            const response = await fetch(`${API}/orders/details/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({status:newStatus})
            });

            const data = await response.json();

            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }

            console.log(data)
            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },

    deleteOrder: async (mealId: string) => {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${API}/orders/${mealId}`, {
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


    getSingleOrder: async (orderId: string, API: string) => {
        try {
            const cookieStore = await cookies();

            if (!orderId) {
                return { data: null, error: { message: "Error: Order ID is missing." } };
            }
            const response = await fetch(`${API}/orders/details/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
            });



            const data = await response.json();

            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: order not fetch." },
                };
            }

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },

    getStats: async () => {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${API}/orders/stats`, {
                method: 'GET',
                // next: { revalidate: 10 },
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
            });

            const statsData = await response.json()
            return { data: statsData, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error };
        }
    },
    
    adminOrderStatics: async () => {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${API}/orders/admin/statics`, {
                method: 'GET',
                // next: { revalidate: 10 },
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
            });

            const statsData = await response.json()
            return { data: statsData, error: null }

        } catch (error) {
            console.error(error)
            return { data: null, error: error };
        }
    },

    adminFetchOrder: async (params: GetOrderParams, option: getOrderOptions, api: string) => {
        try {
            const url = new URL(`${api}/orders`)
            const searchParams = url.searchParams;

            // --- 1. Get Session & Append User ID ---
            const { data: SessionData } = await userService.getSession();
            const user_id = SessionData?.user?.id || SessionData?.id;

            if (user_id) {
                searchParams.append("user_id", user_id); // Append exact ID string
            }

            // --- 2. Append Filter Params ---
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        searchParams.append(key, String(value))
                    }
                })
            };

            const cookieStore = await cookies();

            const config: RequestInit = {
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                }
            };

            // --- Cache Config ---
            if (option?.cache) {
                config.cache = option.cache as RequestCache
            }

            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }

            // Updated tag to "orders" (was "Meals")
            config.next = { ...config.next, tags: ["orders"] }

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
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
}


