import { env } from "@/env"
import { cookies } from 'next/headers';
import { getOrderOptions, GetUsersParams } from "../order/order.service";
import { updateTag } from "next/cache";




export const userService = {
    getSession: async () => {
        try {
            const cookie = await cookies();
            const res = await fetch(`${env.BACKEND_BASE_URL}/api/auth/get-session`, {
                // const res = await fetch(`${env.BETTER_AUTH_URL}/get-session`, {
                cache: "no-store",
                headers: {
                    Cookie: cookie.toString()
                }
            });
            const session = await res.json();
            // console.log(session)
            return { data: session, error: null };
        } catch (error) {
            console.error(error)
            return { data: null, error: error };
        }
    },




    fetchUsers: async (params: GetUsersParams, option: getOrderOptions, api: string) => {
        try {
            const url = new URL(`${api}/user/admin`)
            const searchParams = url.searchParams;

            const { data: SessionData } = await userService.getSession();
            const user_id = SessionData?.user?.id || SessionData?.id;

            if (user_id) {
                searchParams.append("user_id", user_id)
            }


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

            if (option?.cache) {
                config.cache = option.cache as RequestCache
            }

            if (option?.revalidate) {
                config.next = { revalidate: option.revalidate }
            }


            config.next = { ...config.next, tags: ["orders"] }
            config.next.tags = ["admin-users"];
            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Fetch users failed:", res.status, errorText);
                return { data: null, error: `Error ${res.status}: ${errorText}` };
            }

            const data = await res.json();
            return { data: data, error: null };

        } catch (error) {
            console.error(error)
            return { data: null, error: error };
        }
    },

    updateUser: async (userId: string, newStatus: string, api: string) => {
        try {
            const cookieStore = await cookies();

            if (!userId) {
                return { data: null, error: { message: "Error: order ID is missing." } };
            }

            const response = await fetch(`${api}/user/admin`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ status: newStatus, userId })
            });

            const data = await response.json();

            if (data.error) {
                return {
                    data: null,
                    error: { message: "Error: Post not created." },
                };
            }
            updateTag('admin-users')

            return { data: data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Something Went Wrong", error } };
        }
    },
}