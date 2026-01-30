import { CategoryBar } from '@/components/modules/homepage/CategoryBar'
import { FeaturedEstablishments } from '@/components/modules/homepage/FeaturedEstablishments'
import { HeroSection } from '@/components/modules/homepage/Hero-section'
import React from 'react'

const CommonPage = () => {
  return (
    <div>
      <HeroSection />
      <CategoryBar />
      <FeaturedEstablishments />
    </div>
  )
}

export default CommonPage
