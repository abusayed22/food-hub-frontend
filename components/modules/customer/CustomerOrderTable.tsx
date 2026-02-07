import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronRight, Filter, Search } from 'lucide-react'
import React from 'react'
import { getStatusBadge } from '@/helper/getStatusBadge'
import { CustomPagination } from '@/components/Custom-Pagination'
import { SearchInput } from '@/components/SearchInput'


interface MetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


interface OrderItem {
  id: string;
  quantity: number;
  menu?: { title: string };
}

interface OrderFetch {
  id: string;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

interface OrderData {
  data: OrderFetch[],
  meta: MetaData
}

const CustomerOrderTable = ({ orderData }: { orderData: OrderData }) => {
  const { data: recentOrders, meta } = orderData;

  // 1. Helper for Date Formatting
  const formatDate = async (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // 2. Helper for Items Summary
  const getItemsSummary = (items: OrderItem[]) => {
    if (!items || items.length === 0) return "No items";
    
    // If we have menu titles loaded
    if (items[0].menu?.title) {
        const firstItem = `${items[0].menu.title} x${items[0].quantity}`;
        const remainingCount = items.length - 1;
        return remainingCount > 0 ? `${firstItem} + ${remainingCount} more` : firstItem;
    }
    
    // Fallback if no titles
    return `${items.length} items`;
  };

  // 3. Pagination Logic
  const startRange = (meta.page - 1) * meta.limit + 1;
  const endRange = Math.min(meta.page * meta.limit, meta.total);
  const hasPrev = meta.page > 1;
  const hasNext = meta.page < meta.totalPages;

  return (
    <div>
      <Card className="bg-zinc-900 border-white/5 rounded-md overflow-hidden">
        <CardHeader className="border-b border-white/5 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-serif text-[#C0A975]">Recent Orders</CardTitle>
            <CardDescription className="text-zinc-500">Manage and track your recent dining history.</CardDescription>
          </div>

          {/* Search/Filter Toolbar */}
          <SearchInput />
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-zinc-950/50 text-zinc-500 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Order No.</th>
                <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                <th className="px-6 py-4 font-medium tracking-wider">Items</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Total</th>
                <th className="px-6 py-4 font-medium tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.length === 0 ? (
                 <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                       No orders found.
                    </td>
                 </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap font-mono text-xs">
                      {order.orderNumber || order.id.slice(0, 8) + "..."}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-zinc-300 max-w-[200px] truncate" title={getItemsSummary(order.items)}>
                      {getItemsSummary(order.items)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-[#C0A975]">
                      ${Number(order.totalAmount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-zinc-500 group-hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Footer */}
        {recentOrders.length > 0 && (
          <div className="bg-zinc-950/30 p-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
            <span>
                Showing <span className="text-white">{startRange}</span> - <span className="text-white">{endRange}</span> of <span className="text-white">{meta.total}</span> orders
            </span>
            <div className="flex gap-2">
              <CustomPagination meta={meta}/>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default CustomerOrderTable