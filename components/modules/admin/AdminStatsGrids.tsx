import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Truck, 
  XCircle, 
  PackageCheck, 
  ShoppingBag,
  Check
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils'; 

// 1. Define the props based on your EXACT data output
interface AdminStatsData {
  PENDING: number;
  CONFIRMED: number;
  PREPARING: number;
  READY: number;
  OUT_FOR_DELIVERY: number;
  DELIVERED: number;
  CANCELLED: number;
  totalOrders: number; // Included in your data object
}

interface AdminStatsGridProps {
  data: AdminStatsData;
}

// 2. Configuration Mapping
// We exclude 'totalOrders' here because we handle it manually as the first card
const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: Check,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  PREPARING: {
    label: "Cooking",
    icon: ChefHat,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  READY: {
    label: "Ready to Serve",
    icon: PackageCheck,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  OUT_FOR_DELIVERY: {
    label: "On the Way",
    icon: Truck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  DELIVERED: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  }
};

export const AdminStatsGrids = ({ data }: AdminStatsGridProps) => {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-4">
      
      {/* 1. TOTAL ORDERS CARD (Manual Render) */}
      <Card className="bg-zinc-900 border-zinc-800 hover:border-[#C0A975]/50 transition-all duration-300 group">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full gap-2">
            <div className="p-2 rounded-full bg-[#C0A975]/10 text-[#C0A975] group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
                <p className="text-2xl font-bold text-white">{data.totalOrders}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Total Orders</p>
            </div>
        </CardContent>
      </Card>

      {/* 2. DYNAMIC STATUS CARDS */}
      {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((statusKey) => {
        const config = statusConfig[statusKey];
        const count = data[statusKey] || 0; 

        return (
          <Card 
            key={statusKey} 
            className={cn(
                "bg-zinc-900 border-zinc-800 transition-all duration-300",
                // Dim cards with 0 count, light up when they have data or on hover
                count > 0 ? "opacity-100 border-zinc-700" : "opacity-60 grayscale-[0.5] hover:opacity-100 hover:grayscale-0"
            )}
          >
            <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
              <div className="flex items-center justify-between">
                 <div className={cn("p-2 rounded-lg", config.bg, config.color)}>
                    <config.icon className="w-4 h-4" />
                 </div>
                 <span className={cn("text-xl font-bold", count > 0 ? "text-white" : "text-zinc-600")}>
                    {count}
                 </span>
              </div>
              
              <div>
                <p className="text-xs font-medium text-zinc-400">{config.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};