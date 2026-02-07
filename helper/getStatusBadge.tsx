import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

 

export const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING": return <Badge variant="outline" className="border-amber-500/50 text-amber-500 bg-amber-500/10">Pending Request</Badge>
      case "PREPARING": return <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-500/10">Cooking</Badge>
      case "Cooking": return <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-500/10">Cooking</Badge>
      case "READY": return <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">Ready for Pickup</Badge>
      case "DELIVERED": return <Badge variant="outline" className="border-zinc-500/50 text-zinc-500 bg-zinc-500/10">Completed</Badge>
      case "CANCELLED": return <Badge variant="outline" className="border-red-500/50 text-red-500 bg-red-500/10">Cancelled</Badge>
      case "OUT_FOR_DELIVERY": return <Badge variant="outline" className="border-cyan-500/50 text-cyan-500 bg-red-500/10">Cancelled</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }}



   export function StatusCard({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: string, color: string }) {
   return (
      <Card className="bg-zinc-900 border-white/5 rounded-sm">
         <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Icon className={`h-6 w-6 mb-2 ${color}`} />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
         </CardContent>
      </Card>
   )
}