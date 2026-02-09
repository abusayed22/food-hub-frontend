"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createCategory } from "@/actions/categories.action";
import CategoryTable from "./CategoriesTable";

// 1. Define robust schema
const formSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
});

interface CategoriesType {
  id:string;
  name:string;
}

export default function CreateCategorySheet(categories:CategoriesType[]) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // 2. Initialize Form
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating category...");
      console.log(value)
      try {
        // Call Server Action
        const { error } = await createCategory(value);

        if (error) {
          toast.error(typeof error === 'string' ? error : "Failed to create category", { id: toastId });
          return;
        }

        toast.success("Category created successfully", { id: toastId });
        setOpen(false); 
        form.reset();   // Reset form
        router.refresh(); // Refresh data

      } catch (err) {
        toast.error("Something went wrong.", { id: toastId });
      }
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-zinc-950 border-white/10 text-zinc-100 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-[#C0A975] font-serif text-2xl">New Category</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Create a new category for your menu items.
          </SheetDescription>
        </SheetHeader>

        <form
          className="mt-8 space-y-6 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4 ">

            {/* --- NAME FIELD --- */}
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel className="text-zinc-300">Category Name</FieldLabel>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.handleChange(val);

                    }}
                    placeholder="e.g. Italian Pasta"
                    className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white h-11"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <FieldError className="text-red-500 text-xs mt-1">
                      {/* Map over errors to handle both objects and strings */}
                      {field.state.meta.errors.map((err) => err?.message || err).join(", ")}
                    </FieldError>
                  )}
                </Field>
              )}
            />

          </FieldGroup>

          {/* --- SUBMIT BUTTON --- */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="bg-[#C0A975] w-full mt-5 text-black hover:bg-[#D4B988] h-11 font-medium tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            )}
          />
        </form>
      </SheetContent>
      {/* <CategoryTable data={categories}/> */}
    </Sheet>
  );
}