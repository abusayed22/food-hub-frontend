import AdminDashboard from '@/components/modules/admin/AdminDashboard'
import CustomerDashboard from '@/components/modules/customer/CustomerDashboard'
import { env } from '@/env'
import { orderService } from '@/service/order/order.service'
import { userService } from '@/service/user/user.service'
import React from 'react'


interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
const page = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const API = env.API_URL

    const res = await userService.getSession();
    const user = res?.data?.user;

    const stats = await orderService.adminOrderStatics();
    const orderStats = stats?.data?.data
  

    const search = (params?.search as string) || '';
    const page = Number(params?.page) || 1;

    // const { data, error } = await orderService.fetchOrder({ page, limit: 10, search }, { cache: 'no-store' }, API)

 

    return (
        <div >
            <AdminDashboard statsData={orderStats} user={user} />
        </div>
    )
}

export default page
