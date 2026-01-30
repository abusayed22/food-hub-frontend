// components/category-bar.tsx
import * as React from "react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// The categories from your image
const categories = [
  "French",
  "Japanese",
  "Italian",
  "Contemporary",
  "Seafood",
  "Steakhouse",
];

export function CategoryBar() {
  return (
    <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max items-center justify-center space-x-2 py-6 md:w-full md:justify-center">
            {categories.map((category, index) => (
              <div key={category} className="flex items-center">
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className={cn(
                    "text-lg font-medium tracking-wide text-[#C0A975] transition-colors hover:text-white md:text-xl",
                    "px-4 py-2" // Add hit area for easier clicking
                  )}
                >
                  {category}
                </Link>
                {/* Render the separator dot unless it's the last item */}
                {index < categories.length - 1 && (
                  <span
                    className="text-[#C0A975]/40 select-none text-xs"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
    </div>
  );
}