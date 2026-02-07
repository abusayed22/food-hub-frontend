
import { orderDetail } from '@/actions/order.action';
import OrderDetail from '@/components/modules/order/OrderDetail';
import React from 'react'


interface PageProps {
  params: Promise<{ orderId: string }>
}

const page = async({params}:PageProps) => {

    const { orderId } = await params;

    const {data} = await orderDetail(orderId)
    
  return (
    <div>
      <OrderDetail order={data} />
    </div>
  )
}

export default page
