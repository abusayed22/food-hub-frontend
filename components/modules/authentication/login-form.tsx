
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import * as React from "react"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-zinc-950 text-white">
      
      {/* LEFT SIDE: Image & Branding */}
      <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex">
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-zinc-900">
           <Image 
              src="https://img.freepik.com/free-photo/lavash-rolls-top-view-table_140725-7368.jpg?t=st=1769786235~exp=1769789835~hmac=f4c0f45a3e7934c7fc71a6a9d310bd4d9c9ab908dc4a9dd7fa9f5cfe10c0629e&w=740" 
              alt="Cocktail and fine dining"
              fill
              className="object-cover opacity-60"
              priority
           />
           {/* Gradient Overlay for text readability */}
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        {/* Logo Area */}
        <div className="relative z-20 flex items-center text-lg font-medium tracking-wider text-[#C0A975]">
          <Link href="/" className="flex items-center gap-2 font-serif text-2xl">
             ÉPICURE
          </Link>
        </div>

        {/* Quote / Testimonial */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-serif italic text-white/90">
              &ldquo;The discovery of a new dish does more for the happiness of the human race than the discovery of a star.&rdquo;
            </p>
            <footer className="text-sm text-[#C0A975] uppercase tracking-widest">Anthelme Brillat-Savarin</footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="relative flex items-center justify-center p-8 lg:p-12">
        
        {/* Back Button (Mobile friendly) */}
        <Button 
           asChild 
           variant="ghost" 
           className="absolute right-4 top-4 md:right-8 md:top-8 text-zinc-400 hover:text-white"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>

        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
          
          {/* Form Header */}
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-serif font-medium tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-zinc-400">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <div className={cn("grid gap-6")}>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                
                {/* Email Input */}
                <div className="grid gap-2">
                  <Label className="text-zinc-300" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                  />
                </div>

                {/* Password Input */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                     <Label className="text-zinc-300" htmlFor="password">
                        Password
                     </Label>
                     <Link 
                        href="/forgot-password"
                        className="text-xs text-[#C0A975] hover:underline underline-offset-4"
                     >
                        Forgot password?
                     </Link>
                  </div>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                  />
                </div>

                {/* Submit Button */}
                <Button disabled={isLoading} className="bg-[#C0A975] text-black hover:bg-[#D4B988] h-11 font-medium tracking-wide">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Button (e.g., Google) */}
            <Button variant="outline" type="button" disabled={isLoading} className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white h-11">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
              )}
              Google
            </Button>
          </div>

          {/* Footer Text */}
          <p className="px-8 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-[#C0A975] transition-colors"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}