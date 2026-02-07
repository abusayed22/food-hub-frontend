import { Badge } from '@/components/ui/badge'
import { StatusCard } from '@/helper/getStatusBadge'
// import { StatusCard } from '@/helper/orderStatusHelper'
import { ChefHat, Clock, Package, Truck } from 'lucide-react'
import React from 'react'

const ProviderStats = () => {


  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatusCard icon={Clock} label="Pending" value="3" color="text-amber-500" />
        <StatusCard icon={ChefHat} label="Cooking" value="5" color="text-blue-500" />
        <StatusCard icon={Package} label="Ready" value="2" color="text-green-500" />
        <StatusCard icon={Truck} label="Delivering" value="4" color="text-purple-500" />
      </div>
    </div>
  )
}

export default ProviderStats;






