import { Card, CardContent } from "@/components/ui/card";

export function StatusCard({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: number, color: string }) {
  return (
    <Card className="bg-zinc-900 border-white/5 rounded-md shadow-lg">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-full mb-3 bg-white/5 ${color.replace('text-', 'text-opacity-80 ')}`}>
           <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="text-3xl font-serif font-medium text-white mb-1">{value}</div>
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-medium">{label}</div>
      </CardContent>
    </Card>
  )
}