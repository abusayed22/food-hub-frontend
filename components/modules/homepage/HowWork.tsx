// components/how-it-works.tsx
"use client"

import { Search, ShoppingBag, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the steps data based on the image text
const steps = [
  {
    id: "01",
    title: "Discover",
    description: "Browse our curated selection of Michelin-starred restaurants and exclusive culinary experiences.",
    icon: Search,
  },
  {
    id: "02",
    title: "Order",
    description: "Select your favorite dishes and customize your perfect dining experience with ease.",
    icon: ShoppingBag,
  },
  {
    id: "03",
    title: "Enjoy",
    description: "Experience premium white-glove delivery service, bringing fine dining directly to your door.",
    icon: Truck,
  },
]

export function HowWork() {

  return (
    <section className="bg-zinc-950 py-24 relative overflow-hidden">
      
      {/* Decorative top border similar to image context */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-20">
          <span className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase block mb-3">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">
            How It Works
          </h2>
          <div className="h-px w-16 bg-[#C0A975] mx-auto opacity-60" />
        </div>

        {/* STEPS CONTAINER */}
        <div className="relative">
          
          {/* CONNECTING LINE (Desktop Only) */}
          {/* This line sits behind the icons */}
          <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#C0A975]/30 to-transparent -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                
                {/* ICON & NUMBER WRAPPER */}
                <div className="relative mb-8">
                  {/* Faded Background Number */}
                  <span className="absolute -top-10 -right-6 text-6xl font-serif font-bold text-[#C0A975]/10 select-none z-0 transition-colors group-hover:text-[#C0A975]/20">
                    {step.id}
                  </span>

                  {/* Icon Circle */}
                  <div className="relative z-10 h-20 w-20 rounded-full border border-[#C0A975]/30 bg-zinc-950 flex items-center justify-center transition-all duration-300 group-hover:border-[#C0A975] group-hover:shadow-[0_0_30px_-5px_rgba(192,169,117,0.3)]">
                    <step.icon className="h-8 w-8 text-[#C0A975]" />
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <h3 className="text-xl md:text-2xl font-serif font-medium text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-light">
                  {step.description}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}