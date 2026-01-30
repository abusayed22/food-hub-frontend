import { Navbar } from '@/components/layout/Navbar'
import React, { ReactNode } from 'react'

const CommonLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar />
        <main>
          {children}
        </main>
      
    </div>
  )
}

export default CommonLayout
