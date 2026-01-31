// components/testimonial-section.tsx
"use client"

import * as React from "react"
import { Quote, Star } from "lucide-react"

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Data from image_da8e1b.png
const testimonials = [
  {
    id: 1,
    text: "The finest dining experience delivered to my home. Absolutely impeccable service and presentation.",
    author: "Victoria S.",
    location: "MANHATTAN",
    rating: 5,
  },
  {
    id: 2,
    text: "Every dish arrives as if served tableside at a Michelin restaurant. ÉPICURE has redefined luxury delivery.",
    author: "Robert M.",
    location: "BROOKLYN",
    rating: 5,
  },
  {
    id: 3,
    text: "An extraordinary culinary journey without leaving my apartment. The attention to detail is unmatched.",
    author: "Elena K.",
    location: "UPPER EAST SIDE",
    rating: 5,
  },
  {
    id: 4,
    text: "I was skeptical about fine dining delivery, but this exceeded all expectations. The Wagyu was perfect.",
    author: "James L.",
    location: "TRIBECA",
    rating: 5,
  },
]

export function TestimonialSection() {
  return (
    <section className="bg-zinc-950 py-24 relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase block mb-3">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6">
            What Our Guests Say
          </h2>
          <div className="h-px w-16 bg-[#C0A975] mx-auto opacity-60" />
        </div>

        {/* CAROUSEL SLIDER */}
        <div className="mx-auto max-w-7xl px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Card className="h-full bg-transparent border border-[#C0A975]/40 rounded-sm hover:border-[#C0A975] transition-colors duration-300 group">
                      <CardContent className="p-8 md:p-10 flex flex-col h-full relative">
                        
                        {/* Quote Icon */}
                        <div className="mb-6">
                          <Quote 
                            size={48} 
                            strokeWidth={1}
                            className="text-[#C0A975]/20 group-hover:text-[#C0A975]/40 transition-colors" 
                          />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className="fill-[#C0A975] text-[#C0A975]" 
                            />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <p className="text-white/90 text-lg font-serif italic leading-relaxed mb-8 flex-grow">
                          "{item.text}"
                        </p>

                        {/* Author Info */}
                        <div className="mt-auto">
                          <p className="text-[#C0A975] font-medium text-base mb-1">
                            {item.author}
                          </p>
                          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium">
                            {item.location}
                          </p>
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-3rem] border-[#C0A975]/30 text-[#C0A975] hover:bg-[#C0A975] hover:text-black" />
              <CarouselNext className="right-[-3rem] border-[#C0A975]/30 text-[#C0A975] hover:bg-[#C0A975] hover:text-black" />
            </div>
          </Carousel>
        </div>

      </div>
    </section>
  )
}