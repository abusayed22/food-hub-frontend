import { ProviderSidebar } from '@/components/layout/ProviderSidebar'
import { userService } from '@/service/user/user.service'
import React from 'react'


export const dynamic = "force-dynamic";


const layout = async({children}:{children:React.ReactNode}) => {

  const res = await userService.getSession();
const user = res?.data?.user;

  return (
    <div>
      <div className="flex min-h-screen bg-zinc-950">

        {/* Sidebar: Hidden on mobile, fixed on desktop */}
        <div className="hidden lg:block fixed inset-y-0 left-0 z-50">
          <ProviderSidebar user={user} />
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
