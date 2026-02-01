// app/error.tsx
"use client" // Error components must be Client Components

import * as React from "react"
import Link from "next/link"
import { AlertCircle, RefreshCw, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
      
      {/* Decorative Background Glow */}
      <div className="fixed left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C0A975]/5 blur-[100px]" />

      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#C0A975]/10 border border-[#C0A975]/20">
        <AlertCircle className="h-10 w-10 text-[#C0A975]" />
      </div>

      <h1 className="mb-4 font-serif text-4xl font-medium text-white md:text-5xl">
        Something went wrong
      </h1>
      
      <p className="mb-8 max-w-md text-zinc-400">
        We apologize for the inconvenience. An unexpected error has occurred while processing your request.
      </p>

      {/* Error Digest (Optional: Good for debugging in dev) */}
      {process.env.NODE_ENV === 'development' && (
         <div className="mb-8 rounded-sm bg-red-900/20 border border-red-900/50 p-4 text-xs font-mono text-red-200 max-w-lg overflow-auto">
            {error.message || "Unknown error occurred"}
            {error.digest && <span className="block mt-2 opacity-50">Digest: {error.digest}</span>}
         </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="bg-[#C0A975] text-black hover:bg-[#D4B988] min-w-[160px] gap-2"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="border-white/10 text-white hover:bg-white/5 min-w-[160px] gap-2"
        >
          <Link href="/">
            <Home size={16} />
            Return Home
          </Link>
        </Button>
      </div>

    </div>
  )
}