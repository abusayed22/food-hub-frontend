import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { CartProvider } from '@/context/cart-context';
import { userService } from '@/service/user/user.service';
import React, { ReactNode } from 'react'

const CommonLayout = async({children}:{children:ReactNode}) => {

  const session = await userService.getSession();
  const user = session?.data?.user;

  return (
    <div>
      <CartProvider>
        <Navbar user={user}/>
        <main>
          {children}
        </main>
      <Footer />
        </CartProvider>
    </div>
  )
}

export default CommonLayout
