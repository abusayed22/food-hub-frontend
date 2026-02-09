"use server";



import { env } from "@/env";
import { getOrderOptions, GetUsersParams, orderService } from "@/service/order/order.service";
import { userService } from "@/service/user/user.service";
import { revalidatePath } from "next/cache";



export async function userFetchAdmin(params: GetUsersParams,option:getOrderOptions) {
    const API = env.API_URL;
    const { data, error } = await orderService.fetchOrder(params, option,API);
    return { data, error };
}

export async function updateUserStatus(status :string,userId:string) {
    const API = env.API_URL;
    const { data, error } = await userService.updateUser(status,userId,API);
    return { data, error };
}


