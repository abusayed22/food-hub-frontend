// app/restaurant/[id]/page.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { MapPin, Star, Clock, Phone, Globe, Share2, Heart, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/Navbar"
import { MealCard } from "../MealCard"
import { Footer } from "@/components/layout/Footer"
import { meals } from "../meal-items/MealItemSection"

// --- Mock Data ---
const provider = {
  id: "1",
  name: "Le Bernardin",
  type: "French Fine Dining",
  coverImage: "/images/restaurant-bg.jpg", // Replace with your image
  logo: "/images/restaurant-logo.jpg", // Replace with your image
  description: "Elite French restaurant offering refined seafood in a luxury setting. Led by chef Eric Ripert, Le Bernardin is a testament to the art of fine dining, focusing on the freshest ingredients and sustainable sourcing.",
  rating: 4.9,
  reviewCount: 2450,
  address: "155 W 51st St, New York, NY 10019",
  phone: "+1 212-554-1515",
  website: "le-bernardin.com",
  openTime: "10:00 AM - 11:00 PM",
  minOrder: 50,
  deliveryTime: "30-45 min",
  badges: ["Michelin Star", "Sustainable", "Top Rated"]
}

// Reuse your meal data structure
const providerMenu = meals;

export default function ProviderDetailsSection() {
  const [isFollowing, setIsFollowing] = React.useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30">

      <main className="pb-20">
        
        {/* 1. HERO SECTION (Cover Image) */}
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image
            src={provider.coverImage}
            alt={provider.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>

        {/* 2. PROVIDER INFO CARD (Overlapping Hero) */}
        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Logo Avatar */}
            <div className="relative">
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-zinc-950 shadow-2xl rounded-sm">
                <AvatarImage src={provider.logo} alt={provider.name} className="object-cover" />
                <AvatarFallback className="bg-zinc-900 text-[#C0A975] text-4xl font-serif rounded-sm">LB</AvatarFallback>
                </Avatar>
                {/* Verified Badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#C0A975] text-black rounded-full p-1 border-4 border-zinc-950">
                    <CheckCircle2 className="h-5 w-5" />
                </div>
            </div>

            {/* Text Info */}
            <div className="flex-1 pt-4 md:pt-12">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">{provider.name}</h1>
                    <p className="text-[#C0A975] tracking-widest uppercase text-xs font-medium mb-4">{provider.type}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-6">
                        <div className="flex items-center gap-1 text-white">
                            <Star className="h-4 w-4 fill-[#C0A975] text-[#C0A975]" />
                            <span className="font-bold">{provider.rating}</span>
                            <span className="text-zinc-500">({provider.reviewCount})</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{provider.address}</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{provider.deliveryTime}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full border-white/20 hover:bg-white/10 text-white"
                        onClick={() => setIsFollowing(!isFollowing)}
                    >
                        <Heart className={`h-5 w-5 ${isFollowing ? 'fill-[#C0A975] text-[#C0A975]' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-white/10 text-white">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button className="rounded-full bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium px-6">
                        Contact
                    </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-2">
                 {provider.badges.map(badge => (
                     <Badge key={badge} variant="secondary" className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800 rounded-sm font-normal">
                         {badge}
                     </Badge>
                 ))}
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-white/10" />

          {/* 3. TABS: Menu & About */}
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 p-0 h-auto rounded-none gap-8 mb-10">
                <TabsTrigger 
                    value="menu" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-[#C0A975] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#C0A975] rounded-none px-0 py-4 text-zinc-400 text-lg tracking-widest uppercase bg-transparent"
                >
                    Signature Menu
                </TabsTrigger>
                <TabsTrigger 
                    value="about" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-[#C0A975] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#C0A975] rounded-none px-0 py-4 text-zinc-400 text-lg tracking-widest uppercase bg-transparent"
                >
                    About & Hours
                </TabsTrigger>
                <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:bg-transparent data-[state=active]:text-[#C0A975] data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#C0A975] rounded-none px-0 py-4 text-zinc-400 text-lg tracking-widest uppercase bg-transparent"
                >
                    Reviews
                </TabsTrigger>
            </TabsList>

            {/* TAB CONTENT: MENU */}
            <TabsContent value="menu" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {providerMenu.map((meal) => (
                        <MealCard
                            key={meal.id}
                            // id={meal.id}
                            title={meal.title}
                            description={meal.description}
                            price={meal.price}
                            image={meal.image}
                            rating={meal.rating}
                            category={meal.category}
                        />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button variant="outline" className="border-[#C0A975] text-[#C0A975] hover:bg-[#C0A975] hover:text-black rounded-none tracking-widest uppercase">
                        View Full Menu
                    </Button>
                </div>
            </TabsContent>

            {/* TAB CONTENT: ABOUT */}
            <TabsContent value="about" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
                <div className="grid md:grid-cols-3 gap-12 text-zinc-300">
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-2xl font-serif text-white">Our Story</h3>
                        <p className="leading-relaxed text-zinc-400">{provider.description}</p>
                        <p className="leading-relaxed text-zinc-400">Founded in 1986, we have maintained a standard of excellence that has been recognized globally.</p>
                        
                        {/* Placeholder Map */}
                        <div className="h-64 w-full bg-zinc-900 rounded-sm border border-white/5 flex items-center justify-center mt-6">
                            <span className="text-zinc-600 flex items-center gap-2"><MapPin /> Map View Unavailable</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <Card className="bg-zinc-900 border-white/5 rounded-sm">
                            <CardContent className="p-6 space-y-4">
                                <h4 className="text-white font-medium uppercase tracking-widest text-sm mb-4">Details</h4>
                                
                                <div className="flex items-start gap-3 text-sm">
                                    <Clock className="w-4 h-4 text-[#C0A975] mt-0.5" />
                                    <div>
                                        <p className="text-white">Opening Hours</p>
                                        <p className="text-zinc-500">{provider.openTime}</p>
                                    </div>
                                </div>
                                <Separator className="bg-white/5" />
                                <div className="flex items-start gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-[#C0A975] mt-0.5" />
                                    <div>
                                        <p className="text-white">Phone</p>
                                        <p className="text-zinc-500">{provider.phone}</p>
                                    </div>
                                </div>
                                <Separator className="bg-white/5" />
                                <div className="flex items-start gap-3 text-sm">
                                    <Globe className="w-4 h-4 text-[#C0A975] mt-0.5" />
                                    <div>
                                        <p className="text-white">Website</p>
                                        <a href="#" className="text-zinc-500 hover:text-white transition-colors">{provider.website}</a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            {/* TAB CONTENT: REVIEWS */}
          <TabsContent value="reviews" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* 1. Left Column: Rating Summary */}
              <div className="space-y-6">
                <Card className="bg-zinc-900 border-white/5 rounded-sm">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-serif text-[#C0A975] mb-2">{provider.rating}</div>
                    <div className="flex justify-center gap-1 mb-4 text-[#C0A975]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(provider.rating) ? "fill-current" : "text-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400 mb-6">
                      Based on {provider.reviewCount} verified ratings
                    </p>
                    <Button className="w-full bg-[#C0A975] text-black hover:bg-[#D4B988] font-medium rounded-sm">
                      Write a Review
                    </Button>
                  </CardContent>
                </Card>

                {/* Rating Breakdown */}
                <div className="bg-zinc-900/50 p-6 rounded-sm border border-white/5 space-y-3">
                   {[5, 4, 3, 2, 1].map((stars, i) => (
                    <div key={stars} className="flex items-center gap-3 text-sm">
                      <span className="w-3 text-zinc-400 font-medium">{stars}</span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#C0A975]" 
                          style={{ width: i === 0 ? '70%' : i === 1 ? '20%' : '5%' }} // Mock percentages
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Right Column: Customer Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-serif text-white mb-6">What people are saying</h3>
                
                {/* Mock Review Items */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-white/5 pb-8 last:border-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={`/avatars/user-${item}.jpg`} />
                          <AvatarFallback className="bg-zinc-800 text-[#C0A975]">
                            {item === 1 ? "JD" : item === 2 ? "SM" : "AK"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-serif text-lg text-white">
                            {item === 1 ? "James Doe" : item === 2 ? "Sarah Miller" : "Alex Kim"}
                          </h4>
                          <span className="text-xs text-zinc-500 uppercase tracking-wide">
                            {item === 1 ? "2 days ago" : "1 week ago"}
                          </span>
                        </div>
                      </div>
                      <div className="flex text-[#C0A975]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (item === 2 ? 4 : 5) ? "fill-current" : "text-zinc-800 fill-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-zinc-300 leading-relaxed">
                      {item === 1
                        ? "An absolute masterpiece of dining. The ambiance was perfect for our anniversary, and the chef's tasting menu took us on a journey. Highly recommended."
                        : "Great food, but the delivery took a bit longer than expected. However, the packaging was premium and the food arrived warm."}
                    </p>
                    
                    {/* Review Images (Optional) */}
                    {item === 1 && (
                       <div className="flex gap-2 mt-4">
                          <div className="h-16 w-16 bg-zinc-800 rounded-sm relative overflow-hidden">
                             <Image src="/images/dessert.jpg" alt="Review food" fill className="object-cover" />
                          </div>
                          <div className="h-16 w-16 bg-zinc-800 rounded-sm relative overflow-hidden">
                             <Image src="/images/restaurant-1.jpg" alt="Review food" fill className="object-cover" />
                          </div>
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          </Tabs>
        </div>
      </main>
      
    </div>
  )
}