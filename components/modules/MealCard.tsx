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
  id?: string; // Optional: Useful if you need to identify the item for the cart later
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

// ✅ FIX: Destructure the props here
export function MealCard({
  title,
  description,
  price,
  image,
  rating,
  category
}: MealCardProps) {

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-none border-none bg-zinc-950 shadow-xl group">
      {/* Image Header & Rating Badge */}
      <CardHeader className="relative p-0">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={image || "/placeholder.jpg"} // Fallback image
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge
            className={cn(
              "absolute right-4 top-4 flex items-center gap-1 rounded-sm bg-black/70 px-2 py-1 text-xs font-medium backdrop-blur-sm"
            )}
            style={{ color: goldColor }}
          >
            <Star className="h-3 w-3 fill-current" />
            {/* Safe check for rating */}
            {typeof rating === 'number' ? rating.toFixed(1) : "N/A"}
          </Badge>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <h3
            className="text-xl font-serif font-medium text-white line-clamp-1"
            style={{ color: goldColor }}
          >
            {title}
          </h3>
          <span
            className="text-lg font-medium whitespace-nowrap ml-2"
            style={{ color: goldColor }}
          >
            ${price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-zinc-400 line-clamp-2 h-10">
          {description}
        </p>

        <Separator className="my-6 bg-white/10" />

        {/* Footer: Category & Add Button */}
        <CardFooter className="p-0 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 truncate mr-2">
            {category}
          </span>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-none border transition-colors",
              "border-[#C0A975] text-[#C0A975]",
              "hover:bg-[#C0A975] hover:text-black"
            )}
          >
            <Plus className="h-4 w-4" />
            ADD TO ORDER
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}