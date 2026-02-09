"use server";
import { MenuFormValues } from "@/components/modules/provider/AddEditMenuForm";
import { env } from "@/env";
import { CreateOrderParams, getOrderOptions, GetOrderParams, OrderItemInput, orderService } from "@/service/order/order.service";
import { generateOrderNumber } from "@/utils/uniqueOrderNumberGenerate";

import { updateTag } from "next/cache";

interface orderFormValue {
   customerPhone:string;
   deliveryAddress:string;
   deliveryNote?:string
   items:OrderItemInput[];
   subTotal:number;
   totalAmount:number;
   deliveryFee?:number;

}

export async function orderSubmit(formData: orderFormValue) {
    const orderNum = generateOrderNumber();
    const formObj: CreateOrderParams = {
    orderNumber: orderNum,
    customerPhone: formData.customerPhone,
    deliveryAddress: formData.deliveryAddress,
    deliveryNote: formData.deliveryNote,
    items: formData.items,
    totalAmount: formData.totalAmount,
    subtotal: formData.subTotal, 
  };
    const { data, error } = await orderService.creatOrder(formObj);
    if (!error && data) {
    updateTag("orders"); 
  }
    const orderData = data?.data
    return { orderData, error };
}

export async function updateOrder(orderId:string,newStatus:string) {
    const { data, error } = await orderService.updateOrder(orderId,newStatus);
    if (!error && data) {
    updateTag("orders"); 
    updateTag(`order-${orderId}`); 
  }
    return { data, error };
}

export async function orderDetail(orderId: string) {
    const API = env.API_URL;
    const { data, error } = await orderService.getSingleOrder(orderId,API);
    
    return { data, error };
}


export async function deleteOrder(mealId:string) {
    const { data, error } = await orderService.deleteOrder(mealId);
    if(!error && data){
        updateTag("Meals")
    }
    return { data, error };
}


export async function orderFetch(params: GetOrderParams,option:getOrderOptions) {
    const API = env.API_URL;
    const { data, error } = await orderService.fetchOrder(params, option,API);
    return { data, error };
}



