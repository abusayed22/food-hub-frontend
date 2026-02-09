import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  XCircle, 
  ChefHat, 
  Truck, 
  LayoutDashboard 
} from "lucide-react"
import { AuthUser, OrderFetch } from "@/constant/type"
import { MetaData } from "../meal-items/MealItemSection"
import { StatusCard } from "../customer/StatusCard";
import CustomerOrderTable from "../customer/CustomerOrderTable";
import { AdminStatsGrids } from "./AdminStatsGrids";

export interface AdminOrderStatsProps {
  totalOrders: number;
  PENDING: number;
  CONFIRMED: number;
  CONFIRM: number;
  PREPARING: number;
  OUT_FOR_DELIVERY: number;
  DELIVERED: number;
  CANCELLED: number;
  READY:number
}


interface OrderData {
  data: OrderFetch[],
  meta: MetaData
}

interface Props {
  user: AuthUser
  statsData: AdminOrderStatsProps
//   orderdata: OrderData
}

export default function AdminDashboard({ user, statsData }: Props) {
  const { 
    totalOrders, 
    PENDING, 
    PREPARING, 
    OUT_FOR_DELIVERY, 
    DELIVERED, 
    CANCELLED 
  } = statsData

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-zinc-100">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-[#C0A975]/10 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-[#C0A975]" />
               </div>
               <h1 className="text-3xl md:text-4xl font-serif text-[#C0A975]">
                 Admin Dashboard
               </h1>
            </div>
            <p className="text-zinc-400">
              Welcome back, <span className="capitalize text-zinc-200 font-medium">{user.name}</span>. Here&apos;s your business overview.
            </p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white">
                View Reports
             </Button>
             <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium px-6">
                Manage Menu
             </Button>
          </div>
        </div>

        <AdminStatsGrids data={statsData}/>

      </div>
    </div>
  )
}