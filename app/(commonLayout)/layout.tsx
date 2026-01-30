import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import React, { ReactNode } from 'react'

const CommonLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar />
        <main>
          {children}
        </main>
      <Footer />
    </div>
  )
}

export default CommonLayout
