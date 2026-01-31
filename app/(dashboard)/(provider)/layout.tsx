import { ProviderSidebar } from '@/components/layout/ProviderSidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <div className="flex min-h-screen bg-zinc-950">
      
      {/* Sidebar: Hidden on mobile, fixed on desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50">
        <ProviderSidebar />
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-72 w-full">
        {children}
      </div>
      
    </div>
    </div>
  )
}

export default layout
