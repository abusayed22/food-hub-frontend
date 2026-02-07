"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // 1. Import hooks

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 2. Create local state for the input value
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search")?.toString() || "");

  // 3. Use useEffect to handle the debounce logic
  useEffect(() => {
    // Set a timer to update the URL after 500ms
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      // params.set("page", "1");

      if (searchTerm) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 500); // Wait 500ms

    // Cleanup function: If the user types again before 500ms, 
    // clear the previous timer so we don't spam the URL.
    return () => clearTimeout(delayDebounceFn);
    
  }, [searchTerm, pathname, replace]); // Depend on searchTerm changes

  return (
    <div className="flex w-full sm:w-auto items-center gap-2">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search orders..."
          className="pl-9 bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-[#C0A975]"
          // 4. Bind the input to local state
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 border-white/10 bg-zinc-950 hover:bg-white/5 text-zinc-400"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </div>
  );
}