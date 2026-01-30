// components/menu-hero-section.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function MealHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. Background Image with Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://img.freepik.com/premium-photo/tandoori-chicken-served-with-side-lebanese-style-kibbeh_1170794-299502.jpg?w=740" 
          alt="Culinary excellence"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-widest uppercase text-white/60 mb-6">
          <Link href="/" className="hover:text-[#C0A975] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#C0A975]" />
          <span className="text-[#C0A975]">Menu</span>
        </nav>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
          Seasonal <span className="italic text-[#C0A975]">Collections</span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-zinc-300 font-light leading-relaxed">
          Explore a symphony of flavors curated from the world's finest ingredients. 
          Each dish is a masterpiece, designed to ignite your senses.
        </p>

      </div>
    </section>
  );
}