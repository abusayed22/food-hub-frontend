'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mealsFetch } from "@/actions/meal.action";
import { getMealsParams } from "@/service/meal/meal.service";
import { MenuData } from "@/constant/type";
import { useRouter } from "next/navigation";





export const STATIC_MEALS = [
  {
    id: "meal-1",
    name: "Truffle Infused Wagyu Burger",
    image: "https://img.freepik.com/free-photo/delicious-burger-with-fresh-ingredients_23-2150857908.jpg?t=st=1709123456~exp=1709127056~hmac=example_hash_1",
    price: 85,
    rating: 4.9,
    cuisine: "Gourmet Burger",
    category: { name: "Main Course" },
    description: "A5 Japanese Wagyu beef patty topped with black truffle shavings and aged cheddar.",
    isFeatured: true
  },
  {
    id: "meal-2",
    name: "Pan-Seared Atlantic Salmon",
    image: "https://img.freepik.com/free-photo/grilled-salmon-fillet-with-asparagus-broccoli_140725-3475.jpg?t=st=1709123456~exp=1709127056~hmac=example_hash_2",
    price: 42,
    rating: 4.7,
    cuisine: "Seafood",
    category: { name: "Seafood" },
    description: "Fresh Atlantic salmon fillet served with grilled asparagus and lemon butter sauce.",
    isFeatured: true
  },
  {
    id: "meal-3",
    name: "Lobster Thermidor",
    image: "https://img.freepik.com/free-photo/lobster-with-lemon-lime-plate_140725-8664.jpg?t=st=1709123456~exp=1709127056~hmac=example_hash_3",
    price: 120,
    rating: 5.0,
    cuisine: "French",
    category: { name: "Fine Dining" },
    description: "Whole lobster cooked in a rich wine sauce, stuffed back into the shell and browned.",
    isFeatured: true
  },
  {
    id: "meal-4",
    name: "Authentic Italian Carbonara",
    image: "https://img.freepik.com/free-photo/plate-pasta-carbonara-with-bacon_140725-7073.jpg?t=st=1709123456~exp=1709127056~hmac=example_hash_4",
    price: 28,
    rating: 4.6,
    cuisine: "Italian",
    category: { name: "Pasta" },
    description: "Traditional Roman pasta with guanciale, pecorino romano, and fresh egg yolks.",
    isFeatured: false
  },
  {
    id: "meal-5",
    name: "Gold Leaf Chocolate Dessert",
    image: "https://img.freepik.com/free-photo/chocolate-cake-with-gold-dust_140725-4721.jpg?t=st=1709123456~exp=1709127056~hmac=example_hash_5",
    price: 55,
    rating: 4.8,
    cuisine: "Dessert",
    category: { name: "Dessert" },
    description: "Decadent dark chocolate mousse layered with edible 24k gold leaf.",
    isFeatured: true
  },
  {
    id: "meal-6",
    name: "Spicy Thai Basil Chicken",
    image: "https://img.freepik.com/free-photo/lavash-rolls-top-view-table_140725-7368.jpg?t=st=1769786235~exp=1769789835~hmac=f4c0f45a3e7934c7fc71a6a9d310bd4d9c9ab908dc4a9dd7fa9f5cfe10c0629e&w=740",
    price: 22,
    rating: 4.5,
    cuisine: "Thai",
    category: { name: "Asian" },
    description: "Wok-tossed minced chicken with fresh thai basil, chilies, and a fried egg.",
    isFeatured: false
  }
];



export function FeaturedEstablishments({meals}:{meals:MenuData[]}) {

 
  const router = useRouter();


  return (
    <section onClick={() => router.push("/meal-item")} className="bg-zinc-950 py-16 text-white">
      
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
          {meals?.map((restaurant) => (
            <Card key={restaurant.id} className="border-none bg-transparent rounded-none overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                {restaurant.image && (
                  <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                )}
                <Badge
                  className={cn(
                    "absolute right-4 top-4 flex items-center gap-1 rounded-none bg-black/70 px-2 py-1 text-xs font-medium text-[#C0A975] backdrop-blur-sm"
                  )}
                >
                  <Star className="h-3 w-3 fill-current" />
                  {/* {restaurant.ratings.toFixed(1)} */}
                </Badge>
              </div>

              <CardContent className="px-0 pt-4">
                <h3 className="mb-1 text-xl font-serif font-medium text-white transition-colors group-hover:text-[#C0A975]">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-zinc-400 uppercase tracking-wider">
                  {/* {restaurant.tags} */}
                   <span className="text-[#C0A975] mx-1">•</span> 
                  {restaurant.price}
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
  )}
