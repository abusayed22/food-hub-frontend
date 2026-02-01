// app/loading.tsx
import { Loader2 } from "lucide-react";

export default function HomePageLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      
      {/* 1. Pulsating Logo */}
      <div className="mb-8 animate-pulse text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-widest text-[#C0A975]">
          ÉPICURE
        </h1>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
          Curated Dining
        </p>
      </div>

      {/* 2. Gold Loading Spinner & Bar */}
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#C0A975]" />
        
        {/* Optional: Decorative thin line */}
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C0A975]/50 to-transparent" />
      </div>

    </div>
  );
}