"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Meta } from "./modules/homepage/DishesSection"

interface CustomPaginationProps {
  meta: Meta
}

export function CustomPagination({ meta }: CustomPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const currentPage = meta.page
  const totalPages = meta.totalPages

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    replace(createPageURL(page), { scroll: true })
  }

  return (
    <Pagination className="mt-12 text-zinc-300">
      <PaginationContent className="gap-2">
        
        {/* PREVIOUS BUTTON */}
        <PaginationItem>
          <PaginationPrevious 
            href={createPageURL(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={cn(
              "border border-white/10 bg-transparent hover:bg-white/10 hover:text-white transition-colors",
              currentPage <= 1 && "pointer-events-none opacity-30"
            )}
          />
        </PaginationItem>

        {/* PAGE NUMBERS */}
        {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            
            // Logic to hide pages (1 ... 4 5 6 ... 10)
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              const isActive = page === currentPage;
              
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={createPageURL(page)}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={isActive}
                    // CUSTOM STYLING HERE:
                    className={cn(
                      "transition-all duration-300 border-none", 
                      isActive 
                        ? "bg-[#C0A975] text-black font-bold hover:bg-[#D4B988]" // Gold Active State
                        : "bg-transparent text-zinc-400 hover:text-white hover:bg-white/10" // Inactive State
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            
            // ELLIPSIS (...) styling
            if (
              (page === currentPage - 2 && page > 2) || 
              (page === currentPage + 2 && page < totalPages - 1)
            ) {
               return (
                 <PaginationItem key={page}>
                    <PaginationEllipsis className="text-zinc-600" />
                 </PaginationItem>
               )
            }
            
            return null;
        })}

        {/* NEXT BUTTON */}
        <PaginationItem>
          <PaginationNext 
            href={createPageURL(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={cn(
              "border border-white/10 bg-transparent hover:bg-white/10 hover:text-white transition-colors",
              currentPage >= totalPages && "pointer-events-none opacity-30"
            )}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}