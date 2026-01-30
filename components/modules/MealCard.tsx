// components/meal-card.tsx
import Image from "next/image";
import { Plus, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Define the gold color constant
const goldColor = "#C0A975";

export interface MealCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}


export function MealCard({
  title = "Gold Leaf Chocolate",
  description = "Valrhona dark chocolate sphere, edible 24k gold, warm caramel pour.",
  price = 45,
  image = "https://img.freepik.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?ga=GA1.1.1221827327.1769762132&semt=ais_hybrid&w=740&q=80", // Replace with your actual image path
  rating = 4.9,
  category = "DESSERTS",
}: MealCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-none border-none bg-zinc-950 shadow-xl">
      {/* Image Header & Rating Badge */}
      <CardHeader className="relative p-0">
        <div className="aspect-[4/3] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <Badge
            className={cn(
              "absolute right-4 top-4 flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-xs font-medium backdrop-blur-sm"
            )}
            style={{ color: goldColor }}
          >
            <Star className="h-3 w-3 fill-current" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3
            className="text-xl font-serif font-medium text-white"
            style={{ color: goldColor }}
          >
            {title}
          </h3>
          <span
            className="text-lg font-medium"
            style={{ color: goldColor }}
          >
            ${price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">
          {description}
        </p>

        <Separator className="my-6 bg-white/10" />

        {/* Footer: Category & Add Button */}
        <CardFooter className="p-0 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            {category}
          </span>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-none border transition-colors hover:bg-[#C0A975] hover:text-black"
            )}
            style={{ borderColor: goldColor, color: goldColor }}
          >
            <Plus className="h-4 w-4" />
            ADD TO ORDER
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}