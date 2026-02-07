"use client"

import * as React from "react"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import {
    CheckCircle2, Star, Flame, Sparkles, Loader2, ImageIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { CategoryData } from "@/constant/type"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { toast } from "sonner"
import { menuSubmit, updateMeal } from "@/actions/meal.action"

// --- Zod Schema ---
export const menuSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    category_id: z.string().min(1, "Category is required"),
    image: z.string().optional(),
    tags: z.array(z.string()),
    // isAvailable: z.boolean().optional(),
    // isFeatured: z.boolean().optional(),
    // isSignature: z.boolean().optional(),
    // isNew: z.boolean().optional(),
})

export type MenuFormValues = z.infer<typeof menuSchema>

// Default values for adding a new item
const defaultValues: MenuFormValues = {
    name: "",
    description: "",
    price: 0,
    category_id: "",
    tags: [],
    // tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
    image: "",
    // isAvailable: true,
    // isFeatured: false,
    // isSignature: false,
    // isNew: false
}

interface MenuFormProps {
    isOpen: boolean
    onClose: (open: boolean) => void
    initialData: MenuFormValues | null // null = Add Mode, Object = Edit Mode
    categories: CategoryData[]
    onSubmit: (data: MenuFormValues) => void
}

export function AddEditMenuForm({ isOpen, onClose, initialData, categories, onSubmit }: MenuFormProps) {

    const form = useForm({
        defaultValues: initialData || defaultValues,
        validators: {
            onSubmit: menuSchema,
        },
        onSubmit: async ({ value }) => {
            const isEdit = !!initialData?.id;
            const toastId = toast.loading(isEdit ? "Updating dish..." : "Creating dish...");
            try {
            // 1. Prepare the Payload
            // We ensure price is a number and we include the ID if we are editing
            const payload = {
                ...value,
                price: Number(value.price),
                id: isEdit ? initialData.id : undefined, // Add ID for the backend to know which item to update
            };

            let res;

            // 2. Choose the correct Server Action
            if (isEdit) {
                // Call your Update Action
                console.log("editing")
                res = await updateMeal(payload); 
            } else {
                // Call your Create Action
                console.log("Creating")
                res = await menuSubmit(payload);
            }

            console.log("RESUTL ",res)
            // 3. Handle Errors
            if (res.error) {
                toast.error(res.error.message || "An error occurred", { id: toastId });
                return;
            }

            // 4. Success
            toast.success(isEdit ? "Dish updated successfully!" : "Dish created successfully!", { id: toastId });
            
            // 5. Trigger the parent's onSubmit (to refresh the list) and close sheet
            if (onSubmit) onSubmit(payload as MenuFormValues); 
            onClose(false);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.", { id: toastId });
        }
        },
    })

    // Sync form state when the Sheet opens or data changes
    React.useEffect(() => {
        if (isOpen) {
            form.reset(
                initialData ? { ...initialData } : { ...defaultValues }
            )
        }
    }, [isOpen, initialData, form])

    const isEditMode = !!initialData?.id

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[400px] sm:w-[540px] bg-zinc-950 border-l border-white/10 text-white overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-serif text-[#C0A975]">
                        {isEditMode ? "Edit Dish" : "New Dish"}
                    </SheetTitle>
                    <SheetDescription className="text-zinc-400">
                        {isEditMode ? "Update the details below." : "Fill in the details to add a new item."}
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-6 pb-6 px-6"
                >
                    <FieldGroup >
                        {/* 1. Image */}
                        <form.Field name="image" children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;
                            return <Field>
                                <Label className="text-zinc-300">Item Image</Label>
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
                            </Field >
                        }} />


                        <form.Field name="name" children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;
                            return <Field>
                                <Label className="text-zinc-300">Dish Name</Label>
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
                            </Field >
                        }} />

                        <form.Field name="description" children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;
                            return <Field>
                                <Label className="text-zinc-300">Description</Label>
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
                            </Field >
                        }} />

                        <div className="grid grid-cols-2 gap-4">
                            <form.Field name="price" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return <Field>
                                    <Label className="text-zinc-300">Price</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        aria-invalid={isInvalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                        className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                                    />
                                    {isInvalid && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field >
                            }} />

                            {/* <form.Field name="category_id" children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return <Field>
                                    <Label className="text-zinc-300">Category</Label>
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
                                </Field >
                            }} /> */}
                            <form.Field
                                name="category_id"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <Label className="text-zinc-300">Category</Label>

                                            <Select
                                                value={field.state.value}
                                                onValueChange={field.handleChange} // Connects TanStack Form to Shadcn Select
                                            >
                                                <SelectTrigger
                                                    id={field.name}
                                                    aria-invalid={isInvalid}
                                                    className="bg-zinc-900 border-white/10 focus:ring-[#C0A975] text-white h-11"
                                                >
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>

                                                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                                    {categories.map((category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}
                                                            className="focus:bg-white/10 cursor-pointer"
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />

                        </div>

                        <form.Field
                            name="tags"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <Label className="text-zinc-300">Tags</Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}

                                            // 1. Convert Array -> String for the input to read
                                            // We use join(",") so "['spicy', 'hot']" becomes "spicy,hot"
                                            value={field.state.value?.join(",") || ""}

                                            onBlur={field.handleBlur}

                                            // 2. Convert String -> Array for the form state
                                            // We split by comma to turn "spicy,hot" back into "['spicy', 'hot']"
                                            onChange={(e) => field.handleChange(e.target.value.split(","))}

                                            aria-invalid={isInvalid}
                                            placeholder="spicy, vegan (comma separated)"
                                            autoComplete="off"
                                            className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                                        />

                                        {/* Badge Preview */}
                                        <div className="flex gap-2 flex-wrap mt-2">
                                            {field.state.value
                                                ?.map(t => t.trim()) // Clean up whitespace for badges
                                                .filter(t => t !== "") // Hide empty badges while typing
                                                .map((tag, i) => (
                                                    <Badge key={i} variant="outline" className="text-xs border-white/20 text-zinc-400">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                        </div>

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        {/* <form.Field name="tags" children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;
                            return <Field>
                                <Label className="text-zinc-300">Tags</Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    aria-invalid={isInvalid}
                                    placeholder="spicy, vegan (comma separated)"
                                    autoComplete="off"
                                    className="bg-zinc-900 border-white/10 focus-visible:ring-[#C0A975] text-white placeholder:text-zinc-600 h-11"
                                />
                                <div className="flex gap-2 flex-wrap">
                                    {field.state.value?.filter(t => t).map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-xs border-white/20 text-zinc-400">{tag}</Badge>
                                    ))}
                                </div>
                                {isInvalid && (
                                    <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field >
                        }} /> */}

                        {/* <div className="space-y-4 pt-4 border-t border-white/10">
                            {[
                                { name: "isAvailable", label: "Available", sub: "Show on menu", icon: CheckCircle2 },
                                { name: "isFeatured", label: "Featured", sub: "Highlight on homepage", icon: Star },
                                { name: "isSignature", label: "Signature Dish", sub: "Chef's special", icon: Flame },
                                { name: "isNew", label: "New Item", sub: "Mark with 'New' badge", icon: Sparkles },
                            ].map((toggle) => (
                                <form.Field key={toggle.name} name={toggle.name as string} name="tags" children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return <div className="flex items-center justify-between p-3 border border-white/10 rounded-sm bg-white/[0.02]">
                                        <div className="flex items-center gap-3">
                                            <toggle.icon className="h-4 w-4 text-zinc-500" />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{toggle.label}</span>
                                                <span className="text-[10px] text-zinc-500">{toggle.sub}</span>
                                            </div>
                                        </div>
                                        <Switch
                                            checked={field.state.value as boolean}
                                            onCheckedChange={(c) => field.handleChange(c)}
                                            className="data-[state=checked]:bg-[#C0A975]"
                                        />
                                    </div>
                                }} />
                            ))}
                        </div> */}

                        {/* //   <form.Field >
                            //     {(field) => (
                            //       <div className="flex items-center justify-between p-3 border border-white/10 rounded-sm bg-white/[0.02]">
                            //         <div className="flex items-center gap-3">
                            //           <toggle.icon className="h-4 w-4 text-zinc-500" />
                            //           <div className="flex flex-col">
                            //             <span className="text-sm">{toggle.label}</span>
                            //             <span className="text-[10px] text-zinc-500">{toggle.sub}</span>
                            //           </div>
                            //         </div>
                            //         <Switch
                            //           checked={field.state.value as boolean}
                            //           onCheckedChange={(c) => field.handleChange(c)}
                            //           className="data-[state=checked]:bg-[#C0A975]"
                            //         />
                            //       </div>
                            //     )}
                            //   </form.Field> */}

                    </FieldGroup>



                    <SheetFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => onClose(false)} className="flex-1 border-white/10 text-black hover:bg-white/80">
                            Cancel
                        </Button>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <Button
                                    type="submit"
                                    disabled={!canSubmit || isSubmitting}
                                    className="flex-1 bg-[#C0A975] text-black hover:bg-[#D4B988]"
                                >
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isEditMode ? "Save Changes" : "Create Item"}
                                </Button>
                            )}
                        />
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}