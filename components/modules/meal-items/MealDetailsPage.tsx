// app/menu/[id]/page.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Minus, Plus, ShoppingBag, ThumbsUp, ChevronRight, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// --- Mock Data ---
const meal = {
  id: "1",
  title: "Gold Leaf Chocolate Sphere",
  price: 45,
  description: "A theatrical dessert experience. A sphere of Valrhona 70% dark chocolate encasing a madagascan vanilla bean mousse and salted caramel center. Served with a warm toffee pour table-side.",
  rating: 4.8,
  reviews: 124,
  tags: ["Vegetarian", "Gluten-Free Option"],
  ingredients: ["Valrhona Chocolate", "Gold Leaf", "Vanilla Bean", "Heavy Cream", "Sea Salt"],
  image: "/images/dessert-gold.jpg" // Replace with your image
}

const reviews = [
  {
    id: 1,
    user: "Sarah Jenkins",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely stunning presentation. The warm toffee pour was the highlight of our evening. Worth every penny.",
    helpful: 12
  },
  {
    id: 2,
    user: "David Chen",
    avatar: "/avatars/david.jpg",
    rating: 4,
    date: "1 week ago",
    comment: "Delicious, though slightly richer than I expected. Perfect for sharing.",
    helpful: 5
  }
]

export default function MealDetailsPage() {
  const [quantity, setQuantity] = React.useState(1)

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#C0A975]/30">
      {/* <Navbar /> */}
      
      <main className="container mx-auto px-4 py-24 md:px-8">
        
        {/* BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-500 mb-8">
          <Link href="/menu" className="hover:text-[#C0A975] transition-colors">Menu</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/menu/desserts" className="hover:text-[#C0A975] transition-colors">Desserts</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{meal.title}</span>
        </nav>

        {/* HERO SECTION: Image & Details */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Left: Image */}
          <div className="relative aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-sm bg-zinc-900 border border-white/5">
             <Image 
                // src={meal.image} 
                src="https://img.freepik.com/premium-photo/topdown-view-hearty-meal-grilled-chicken-fries-fresh-salad_1270611-7398.jpg?w=740" 
                alt={meal.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
             />
             <Badge className="absolute top-4 left-4 bg-[#C0A975] text-black hover:bg-[#D4B988] rounded-none px-3 py-1 text-xs tracking-widest uppercase font-bold">
                Bestseller
             </Badge>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
             <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl md:text-5xl font-serif text-[#C0A975] leading-tight">
                  {meal.title}
                </h1>
                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-[#C0A975]">
                   <Share2 className="h-5 w-5" />
                </Button>
             </div>

             <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-[#C0A975]">
                   <Star className="h-4 w-4 fill-current" />
                   <span className="font-bold text-lg">{meal.rating}</span>
                </div>
                <span className="text-zinc-500 text-sm">({meal.reviews} Reviews)</span>
                <Separator orientation="vertical" className="h-4 bg-white/20" />
                <span className="text-2xl font-medium">${meal.price}</span>
             </div>

             <p className="text-zinc-300 text-lg leading-relaxed font-light mb-8">
                {meal.description}
             </p>

             {/* Ingredients / Tags */}
             <div className="flex flex-wrap gap-2 mb-10">
                {meal.tags.map(tag => (
                   <Badge key={tag} variant="outline" className="border-white/20 text-zinc-400 font-normal tracking-wide py-1.5 px-3">
                      {tag}
                   </Badge>
                ))}
             </div>

             <Separator className="bg-white/10 mb-8" />

             {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-white/20 rounded-sm">
                   <Button 
                      variant="ghost" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-zinc-400 hover:text-white rounded-none px-4"
                   >
                      <Minus className="h-4 w-4" />
                   </Button>
                   <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                   <Button 
                      variant="ghost" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-zinc-400 hover:text-white rounded-none px-4"
                   >
                      <Plus className="h-4 w-4" />
                   </Button>
                </div>

                <Button className="flex-1 bg-[#C0A975] text-black hover:bg-[#D4B988] h-12 text-base tracking-widest font-medium rounded-sm">
                   <ShoppingBag className="mr-2 h-4 w-4" />
                   ADD TO ORDER • ${meal.price * quantity}
                </Button>
             </div>
          </div>
        </div>

        {/* TABS: Description & Reviews */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-white/10 p-0 h-auto rounded-none gap-8">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-[#C0A975] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#C0A975] rounded-none px-0 py-4 text-zinc-400 text-lg tracking-widest uppercase bg-transparent"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-[#C0A975] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#C0A975] rounded-none px-0 py-4 text-zinc-400 text-lg tracking-widest uppercase bg-transparent"
            >
              Reviews ({meal.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="py-10">
             <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-4">Premium Ingredients</h3>
                  <ul className="space-y-2 text-zinc-400">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C0A975]" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </TabsContent>

          {/* --- REVIEW SECTION --- */}
          <TabsContent value="reviews" className="py-12">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Left: Rating Summary */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-sm text-center">
                  <h3 className="text-sm font-medium tracking-widest text-zinc-400 uppercase mb-2">Overall Rating</h3>
                  <div className="text-6xl font-serif text-[#C0A975] mb-2">{meal.rating}</div>
                  <div className="flex justify-center gap-1 mb-4 text-[#C0A975]">
                    {[1,2,3,4,5].map(star => (
                       <Star key={star} className={`h-5 w-5 ${star <= Math.round(meal.rating) ? 'fill-current' : 'text-zinc-700'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500">Based on {meal.reviews} verified reviews</p>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-4 text-sm">
                      <span className="w-3 text-zinc-400">{stars}</span>
                      <Star className="h-3 w-3 text-zinc-600" />
                      <Progress value={stars === 5 ? 75 : stars === 4 ? 15 : 5} className="h-2 bg-zinc-800" />
                      <span className="w-8 text-right text-zinc-500">{stars === 5 ? '75%' : stars === 4 ? '15%' : '5%'}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6">
                   <h4 className="font-serif text-lg text-white mb-4">Write a Review</h4>
                   <p className="text-sm text-zinc-400 mb-4">Share your experience with this dish.</p>
                   <Button variant="outline" className="w-full border-white/20 text-white hover:bg-[#C0A975] hover:text-black hover:border-[#C0A975] rounded-sm">
                     Write Review
                   </Button>
                </div>
              </div>

              {/* Right: Review List */}
              <div className="lg:col-span-8 space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/10 pb-8 last:border-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback className="bg-zinc-800 text-[#C0A975]">
                             {review.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-serif text-lg text-white">{review.user}</h4>
                          <span className="text-xs text-zinc-500 uppercase tracking-wide">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex text-[#C0A975]">
                        {[1,2,3,4,5].map(star => (
                           <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : 'text-zinc-800 fill-zinc-800'}`} />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white h-auto p-0 hover:bg-transparent">
                      <ThumbsUp className="h-3 w-3 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                ))}
              </div>

            </div>
          </TabsContent>
        </Tabs>

      </main>
    </div>
  )
}