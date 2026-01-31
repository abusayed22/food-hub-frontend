import { CategoryBar } from '@/components/modules/homepage/CategoryBar'
import { FeaturedEstablishments } from '@/components/modules/homepage/FeaturedEstablishments'
import { HeroSection } from '@/components/modules/homepage/Hero-section'
import { HowWork } from '@/components/modules/homepage/HowWork'
import { SignatureDishesSection } from '@/components/modules/homepage/SigninatureDishSection'
import { TestimonialSection } from '@/components/modules/homepage/TestimonialSection'
import React from 'react'

const CommonPage = () => {
  return (
    <div>
      <HeroSection />
      <CategoryBar />
      <HowWork />
      <FeaturedEstablishments />
      <SignatureDishesSection />
      <TestimonialSection />
    </div>
  )
}

export default CommonPage
