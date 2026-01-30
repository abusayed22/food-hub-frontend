// components/featured-establishments.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample data mirroring the content in the image
const establishments = [
  {
    id: 1,
    name: "Le Bernardin",
    image: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?semt=ais_hybrid&w=740&q=80", // Replace with your actual image paths
    rating: 4.9,
    cuisine: "FRENCH FINE DINING",
    price: "$$$$",
  },
  {
    id: 2,
    name: "Narisawa",
    image: "https://img.freepik.com/free-photo/roasted-pork-steak-vegetables-plate_1150-45292.jpg?t=st=1769762879~exp=1769766479~hmac=1c3819cd74d155355e01067dab55370af8286d8206ca38a482ade48b3857ddb7&w=740",
    rating: 4.8,
    cuisine: "JAPANESE CONTEMPORARY",
    price: "$$$$",
  },
  {
    id: 3,
    name: "Eleven Madison Park",
    image: "https://img.freepik.com/free-photo/fresh-vegetable-salad-with-grilled-chicken-breast_2829-14101.jpg?semt=ais_hybrid&w=740&q=80",
    rating: 4.9,
    cuisine: "NEW AMERICAN",
    price: "$$$$",
  },
];

export function FeaturedEstablishments() {
  return (
    <section className="bg-zinc-950 py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#C0A975] font-serif md:text-4xl">
            Featured Establishments
          </h2>
          <Button
            asChild
            variant="ghost"
            className="group hidden p-0 text-sm font-medium tracking-widest text-[#C0A975] hover:bg-transparent hover:text-[#D4B988] md:inline-flex"
          >
            <Link href="/collections">
              VIEW ALL COLLECTIONS
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {establishments.map((restaurant) => (
            <Card key={restaurant.id} className="border-none bg-transparent rounded-none overflow-hidden group">
              {/* Image & Rating Badge */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge
                  className={cn(
                    "absolute right-4 top-4 flex items-center gap-1 rounded-none bg-black/70 px-2 py-1 text-xs font-medium text-[#C0A975] backdrop-blur-sm"
                  )}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {restaurant.rating.toFixed(1)}
                </Badge>
              </div>

              {/* Card Content */}
              <CardContent className="px-0 pt-4">
                <h3 className="mb-1 text-xl font-serif font-medium text-white transition-colors group-hover:text-[#C0A975]">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-zinc-400 uppercase tracking-wider">
                  {restaurant.cuisine} <span className="text-[#C0A975] mx-1">•</span> {restaurant.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile 'View All' Button */}
        <div className="mt-8 md:hidden">
          <Button
            asChild
            variant="ghost"
            className="group flex w-full items-center justify-center p-0 text-sm font-medium tracking-widest text-[#C0A975] hover:bg-transparent hover:text-[#D4B988]"
          >
            <Link href="/collections">
              VIEW ALL COLLECTIONS
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}