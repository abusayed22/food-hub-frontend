import UserTable from '@/components/modules/admin/UserTable'
import { Button } from '@/components/ui/button';
import { env } from '@/env';
import { userService } from '@/service/user/user.service';
import { Users } from 'lucide-react';
import React from 'react'



interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const page =async ({ searchParams }: PageProps) => {

  const params = await searchParams;
      const API = env.API_URL
  
      const res = await userService.getSession();
      const user = res?.data?.user;
  
  
      const search = (params?.search as string) || '';
      const page = Number(params?.page) || 1;
      const { data, error } = await userService.fetchUsers({ page, limit: 10, search }, { cache: 'no-store' }, API)
  
      const users = data?.data
      const meta = data?.meta


  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-zinc-100">
      <div className="max-w-[1600px] mx-auto space-y-10">
      {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-[#C0A975]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#C0A975]" />
               </div>
               <h1 className="text-3xl md:text-4xl font-serif text-[#C0A975]">
                 Admin Dashboard
               </h1>
            </div>
            <p className="text-zinc-400">
              Welcome back, <span className="capitalize text-zinc-200 font-medium">{user?.name}</span>. Here&apos;s your business overview.
            </p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="border-white/10 text-zinc-300 bg-white/5 hover:text-black">
                View Reports
             </Button>
             <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium px-6">
                Manage Menu
             </Button>
          </div>
        </div>

      <UserTable data={users} meta={meta}/>
    </div>
    </div>
  )
}

export default page
