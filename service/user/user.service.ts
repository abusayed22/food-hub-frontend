import { env } from "@/env"
import { cookies } from 'next/headers';




export const userService = {
    getSession: async() => {
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
            return {data:session,error:null};
        } catch (error) {
            console.error(error)
            return {data:null,error:error};
        }
    }
}