// components/hero-section.tsx
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://img.freepik.com/free-photo/roasted-pork-steak-vegetables-plate_1150-45291.jpg?t=st=1769778660~exp=1769782260~hmac=f16b225d4d631fddc90a59f9b4dbe9ef22cb80c087eed7c33a66baca7994e7ad&w=740" 
          layout="fill"
          objectFit="cover"
          alt="Fine dining experience"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 mt-20 flex flex-col items-center text-center text-white">
        
        {/* Subtitle */}
        <h2 className="text-gold text-xs md:text-sm uppercase tracking-[0.2em] mb-6 font-semibold">
          Curated Dining Experiences
        </h2>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight">
          <span>Exceptional Cuisine,</span>
          <br />
          <span className="text-gold italic">Delivered to Your Door</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-12 leading-relaxed">
          Discover the finest restaurants and exclusive culinary experiences in your city, curated by world-class connoisseurs.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-transparent border border-gold/30 rounded-full p-1 flex items-center backdrop-blur-sm">
          <div className="pl-4">
            <Search className="text-gold/70 w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search restaurants, cuisines, or dishes..."
            className="flex-grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/60 h-12 text-base"
          />
          
          {/* Vertical Separator */}
          <div className="h-6 w-px bg-gold/30 mx-2"></div>

          <Select defaultValue="ny">
            <SelectTrigger className="w-[130px] md:w-[160px] border-none bg-transparent focus:ring-0 focus:ring-offset-0 text-white h-12 text-base font-medium">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-gold/30 text-white">
              <SelectItem value="ny" className="focus:bg-gold/20 focus:text-white cursor-pointer">New York</SelectItem>
              <SelectItem value="la" className="focus:bg-gold/20 focus:text-white cursor-pointer">Los Angeles</SelectItem>
              <SelectItem value="chi" className="focus:bg-gold/20 focus:text-white cursor-pointer">Chicago</SelectItem>
              <SelectItem value="mia" className="focus:bg-gold/20 focus:text-white cursor-pointer">Miami</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}