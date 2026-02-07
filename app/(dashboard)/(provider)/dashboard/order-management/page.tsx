import ProviderOrderManagement from '@/components/modules/provider/ProviderOrderManagement'
import { env } from '@/env';
import { orderService } from '@/service/order/order.service';
import React from 'react'



interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const OrderManagementPage = async({ searchParams }: PageProps) => {
 
  const params = await searchParams;
      const API = env.API_URL
  
      const stats = await orderService.getStats();
  
      const search = (params?.search as string) || '';
      const page = Number(params?.page) || 1;
      const status = params?.status as string;
      const { data, error } = await orderService.fetchOrder({ page, limit: 10, search, status }, { cache: 'no-store' }, API)
  

  return (
    <div>
      <ProviderOrderManagement orders={data?.data}/>
    </div>
  )
}

export default OrderManagementPage
