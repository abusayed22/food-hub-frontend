import { CategoryBar } from '@/components/modules/homepage/CategoryBar'
import { FeaturedEstablishments } from '@/components/modules/homepage/FeaturedEstablishments'
import { HeroSection } from '@/components/modules/homepage/Hero-section'
import { HowWork } from '@/components/modules/homepage/HowWork'
import { SignatureDishesSection } from '@/components/modules/homepage/SigninatureDishSection'
import { TestimonialSection } from '@/components/modules/homepage/TestimonialSection'
import { authClient } from '@/lib/auth-client'
import React from 'react'

const CommonPage = async() => {

  // await new Promise((resolve) => setTimeout(resolve,2000))

  //  throw new Error('Failed to fetch data')
  const session = await authClient.getSession();
  console.log(session)

  return (
    <div>
      <HeroSection />
      <HowWork />
      <CategoryBar />
      <FeaturedEstablishments />
      <SignatureDishesSection />
      <TestimonialSection />
    </div>
  )
}

export default CommonPage
