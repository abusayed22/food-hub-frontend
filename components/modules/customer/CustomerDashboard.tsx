import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, ShoppingBag, XCircle } from "lucide-react"
import { StatusCard } from "./StatusCard"
import { AuthUser, OrderFetch } from "@/constant/type"
import CustomerOrderTable from "./CustomerOrderTable"
import { MetaData } from "../meal-items/MealItemSection"

interface OrderStats {
totalOrders: number;
  pending: number;
  confirmed: number;
  preparing: number;
  outForDelivery: number;
  delivered: number;
  cancelled:number;
}

interface Props {
    user:AuthUser
    statsData: OrderStats
    orderdata: OrderData
}

 interface OrderData {
    data: OrderFetch[],
    meta: MetaData
}


export default function CustomerDashboard({user,statsData,orderdata}:Props) {
    const {totalOrders,pending,confirmed,cancelled} = statsData
  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-zinc-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#C0A975]">Welcome back, <span className="capitalize">{user.name}</span></h1>
            <p className="text-zinc-400 mt-2">Here is what is happening with your orders today.</p>
          </div>
          <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium px-6">
            New Order
          </Button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatusCard 
            icon={ShoppingBag} 
            label="Total Orders" 
            value={totalOrders}
            color="text-[#C0A975]" 
          />
          <StatusCard 
            icon={Clock} 
            label="Pending" 
            value={pending}
            color="text-amber-500" 
          />
          <StatusCard 
            icon={CheckCircle2} 
            label="Completed" 
            value={confirmed}
            color="text-emerald-500" 
          />
          <StatusCard 
            icon={XCircle} 
            label="Cancelled" 
            value={cancelled}
            color="text-red-500" 
          />
        </div>

            {/* Order table  */}
            <CustomerOrderTable orderData={orderdata}/>
      </div>
    </div>
  )
}