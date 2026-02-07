"use client"

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"

// 1. IMPORT FROM YOUR CONTEXT

import { orderSubmit } from "@/actions/order.action"
import { toast } from "sonner"
import { useCart } from "@/context/cart-context"
import { useForm, ValidationError } from "@tanstack/react-form"
import z from "zod"
import { authClient } from "@/lib/auth-client"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"


const formSchema = z.object({
  customerPhone: z.string().min(11, "Phone number must be at least 11 digits"),
  deliveryAddress: z.string().min(5, "Address is too short"),
  deliveryNote: z.string(),
});


export function CartSheet() {


  const {
    items,
    removeFromCart,
    updateQuantity,
    cartTotal,
    deliveryCharge,
    grandTotal,
    clearCart
  } = useCart()


  const orderSubmitHandler = async () => {
    const toastId = toast.loading('Submiting...')
    try {
      const orderData = {
        items: items.map(item => ({
          mealId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        subTotal: cartTotal,
        deliveryFee: deliveryCharge,
        totalAmount: grandTotal,
      }

      // Call your Server Action
      // const result = await orderSubmit(orderData)



    } catch (error) {
      console.error("Checkout Error:", error)
      toast.error("Something went wrong. Please try again.")
    }
  }


  const form = useForm({
    defaultValues: {
      customerPhone: '',
      deliveryAddress: '',
      deliveryNote: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Placing order...");
      try {

        const orderData = {
          // Data from Context
          items: items.map(item => ({
            mealId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          subTotal: cartTotal,
          // deliveryFee: deliveryCharge,
          totalAmount: grandTotal,
          customerPhone: value.customerPhone,
          deliveryAddress: value.deliveryAddress,
          deliveryNote: value.deliveryNote,
        }

        await orderSubmit(orderData);

        toast.success("Your Order Done", { id: toastId });
        clearCart()
      } catch (err) {
        const errorMessage =  "Something went wrong, please try again.";
        toast.error(errorMessage, { id: toastId });
      }
    },
  });




  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative text-white hover:text-[#C0A975]">
          <ShoppingBag className="h-5 w-5" />
          {/* Badge Count */}
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C0A975] text-[10px] font-bold text-black">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full h-screen overflow-y-auto flex-col bg-zinc-950 px-4 text-white border-l border-white/10 sm:max-w-lg">
        <SheetHeader className="border-b px-4  border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-serif text-[#C0A975]">
              Your Order ({items.length})
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* CART ITEMS LIST */}
        <ScrollArea className="flex-1 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-zinc-500 min-h-[300px]">
              <ShoppingBag className="h-16 w-16 opacity-20" />
              <p>Your cart is empty.</p>
              <SheetClose asChild>
                <Button variant="link" className="text-[#C0A975]">Start Browsing</Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {/* Item Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-zinc-900 border border-white/5">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title} // Changed from item.name to item.title to match context
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-serif font-medium text-white">{item.title}</h4>
                      </div>
                      <p className="font-medium text-[#C0A975]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1">
                        {/* UPDATE QUANTITY: DECREASE */}
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>

                        {/* UPDATE QUANTITY: INCREASE */}
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* REMOVE ITEM */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                {/* USE CONTEXT VALUE */}
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Fee</span>
                {/* USE CONTEXT VALUE */}
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-between text-base font-medium text-white">
                <span>Total</span>
                {/* USE CONTEXT VALUE */}
                <span className="text-[#C0A975] font-serif text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <form name="customer_info" onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit()
            }}>

              <FieldGroup>
                <form.Field
                  name="customerPhone"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field>
                        <FieldLabel className="text-zinc-300" htmlFor={field.name}>
                          Customer Phone
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          // Since we use z.string(), e.target.value works perfectly
                          onChange={(e) => field.handleChange(e.target.value)}
                          type="tel" // Use 'tel' for proper mobile keyboard
                          aria-invalid={isInvalid}
                          placeholder="017..."
                          autoComplete="tel"
                          className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                        />
                        {isInvalid && (
                          <div className="text-red-500 text-xs mt-1">
                            {field.state.meta.errors.map((error: ValidationError, i) => (
                              <p key={i}>{typeof error === 'object' && error !== null && 'message' in error
                                ? (error as { message: string }).message
                                : String(error)
                              }</p>
                            ))}
                          </div>
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field name="deliveryAddress" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return <Field>
                    <FieldLabel className="text-zinc-300" htmlFor={field.name}>
                      Delivery Address
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
                <form.Field name="deliveryNote" children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return <Field>
                    <FieldLabel className="text-zinc-300" htmlFor={field.name}>
                      Delivery Note (Optional)
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

              <SheetFooter className="sm:justify-between gap-2">
                <div className="flex justify-between">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full sm:w-1/3 border-white/10 bg-white/5 hover:bg-white/5 hover:text-white">
                      Keep Browsing
                    </Button>
                  </SheetClose>
                  <Button variant="destructive">
                    <Trash2 className="h-5 w-5" />
                    Clear All
                  </Button>
                </div>

                <Button id="customer_info" type="submit" className="w-full bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium tracking-wide">
                  CHECKOUT
                </Button>

              </SheetFooter>
            </form>

          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}