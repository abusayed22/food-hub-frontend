// app/register/page.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"



const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

export default function RegisterForm() {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });



  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2 overflow-hidden bg-zinc-950 text-white">

      {/* LEFT SIDE: Image & Branding */}
      <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex">

        {/* Background Image (Different from Login for variety) */}
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://img.freepik.com/premium-photo/table-food-served-plate-tradition-northeast-food-isaan-delicious-plate-with-fresh-vegetables_926199-2776127.jpg?ga=GA1.1.1221827327.1769762132&semt=ais_hybrid&w=740&q=80"
            alt="Chefs plating food"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        {/* Logo Area */}
        <div className="relative z-20 flex items-center text-lg font-medium tracking-wider text-[#C0A975]">
          <Link href="/" className="flex items-center gap-2 font-serif text-2xl">
            ÉPICURE
          </Link>
        </div>

        {/* Quote */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-serif italic text-white/90">
              &ldquo;One cannot think well, love well, sleep well, if one has not dined well.&rdquo;
            </p>
            <footer className="text-sm text-[#C0A975] uppercase tracking-widest">Virginia Woolf</footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="relative flex items-center justify-center p-8 lg:p-12">

        {/* Back Button */}
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
              Join ÉPICURE
            </h1>
            <p className="text-sm text-zinc-400">
              Create an account to unlock exclusive dining experiences
            </p>
          </div>

          {/* Register Form */}
          <div className={cn("grid gap-6")}>
            <form onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit()
            }}>

              <FieldGroup>
                <form.Field name="name" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return <Field>
                    <Label className="text-zinc-300" htmlFor={field.name}>
                       Name
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                      className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                }
                } />
                <form.Field name="email" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return <Field>
                    <FieldLabel className="text-zinc-300" htmlFor={field.name}>
                     Email
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                      className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                }
                } />
                <form.Field name="password" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return <Field>
                    <FieldLabel className="text-zinc-300" htmlFor={field.name}>
                     password
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                      className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                }
                } />
              </FieldGroup>
              
                <Button type="submit" className="bg-[#C0A975] w-full mt-5 text-black hover:bg-[#D4B988] h-11 font-medium tracking-wide">
                  {/* {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )} */}
                  Create Account
                </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-zinc-500">
                  Or register with
                </span>
              </div>
            </div>

            {/* Social Button */}
            <Button variant="outline" type="button" className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white h-11">
              {/* {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
              )} */}
              Google
            </Button>
          </div>

          {/* Footer Text */}
          <p className="px-8 text-center text-sm text-zinc-500 -mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-[#C0A975] transition-colors"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}