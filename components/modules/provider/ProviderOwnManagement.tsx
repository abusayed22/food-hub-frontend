// app/admin/settings/page.tsx
"use client"

import * as React from "react"
import { 
  Save, Upload, Clock, MapPin, DollarSign, Users, 
  Plus, Trash2, Globe, Shield, Store 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProviderOwnMangement() {
  const [isSaving, setIsSaving] = React.useState(false)

  // Mock Save Function
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#C0A975]/30 p-6 md:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[#C0A975] mb-2">Restaurant Settings</h1>
          <p className="text-zinc-400">Manage your venue details, operations, and team permissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-[#C0A975] text-black hover:bg-[#D4B988] min-w-[120px]"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="general" className="space-y-8">
        
        <TabsList className="bg-zinc-900 border border-white/5 p-1 h-auto flex-wrap justify-start">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black px-6 py-2">
            General Info
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black px-6 py-2">
            Operations & Hours
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-[#C0A975] data-[state=active]:text-black px-6 py-2">
            Team Management
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: GENERAL INFO */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Media */}
            <div className="space-y-6">
              <Card className="bg-zinc-900 border-white/5 rounded-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24 border-2 border-dashed border-white/20 bg-black/20">
                      <AvatarImage src="/images/restaurant-logo.jpg" />
                      <AvatarFallback className="text-zinc-600">Logo</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="border-white/10 text-zinc-300 hover:text-white hover:bg-white/5">
                      <Upload size={14} className="mr-2" /> Change Logo
                    </Button>
                  </div>
                  
                  <Separator className="bg-white/5" />

                  {/* Cover Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-zinc-400">Cover Image</Label>
                    <div className="h-32 w-full rounded-sm border-2 border-dashed border-white/20 bg-black/20 flex flex-col items-center justify-center text-zinc-500 hover:border-[#C0A975]/50 transition-colors cursor-pointer group">
                       <Upload size={20} className="mb-2 group-hover:text-[#C0A975]" />
                       <span className="text-xs">Click to upload cover</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Details form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-zinc-900 border-white/5 rounded-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Venue Details</CardTitle>
                  <CardDescription className="text-zinc-500">These details will be displayed on your public profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-zinc-400">Restaurant Name</Label>
                      <Input defaultValue="Le Bernardin" className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-400">Cuisine Type</Label>
                      <Select defaultValue="french">
                        <SelectTrigger className="bg-black/20 border-white/10 text-white focus:ring-[#C0A975]">
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="french">French Fine Dining</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-zinc-400">Short Description</Label>
                    <Textarea 
                      className="bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975] min-h-[100px]" 
                      defaultValue="Elite French restaurant offering refined seafood in a luxury setting."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label className="text-zinc-400">Phone Number</Label>
                        <div className="relative">
                           <Store className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                           <Input defaultValue="+1 212-554-1515" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-zinc-400">Website</Label>
                        <div className="relative">
                           <Globe className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                           <Input defaultValue="le-bernardin.com" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-white/5 rounded-sm">
                 <CardHeader>
                    <CardTitle className="text-white text-lg">Location</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-2">
                        <Label className="text-zinc-400">Street Address</Label>
                        <div className="relative">
                           <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                           <Input defaultValue="155 W 51st St, New York, NY 10019" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                        </div>
                    </div>
                    {/* Map Placeholder */}
                    <div className="mt-4 h-40 w-full rounded-sm bg-black/40 border border-white/5 flex items-center justify-center text-zinc-600">
                       Map View Integration
                    </div>
                 </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: OPERATIONS */}
        <TabsContent value="operations" className="space-y-6">
           <Card className="bg-zinc-900 border-white/5 rounded-sm">
              <CardHeader>
                 <CardTitle className="text-white text-lg">Order Settings</CardTitle>
                 <CardDescription className="text-zinc-500">Configure how you receive and process orders.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                    <div className="space-y-0.5">
                       <Label className="text-base text-white">Accepting Orders</Label>
                       <p className="text-sm text-zinc-500">Toggle this to temporarily pause incoming orders.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-[#C0A975]" />
                 </div>

                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <Label className="text-zinc-400">Estimated Delivery Time</Label>
                       <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                          <Input defaultValue="30-45 mins" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-zinc-400">Minimum Order Value</Label>
                       <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                          <Input type="number" defaultValue="50" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-zinc-400">Delivery Fee</Label>
                       <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                          <Input type="number" defaultValue="5.00" className="pl-9 bg-black/20 border-white/10 text-white focus-visible:ring-[#C0A975]" />
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-zinc-900 border-white/5 rounded-sm">
              <CardHeader>
                 <CardTitle className="text-white text-lg">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                       <div key={day} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="w-32 text-zinc-300 font-medium">{day}</span>
                          <div className="flex items-center gap-4">
                             <Switch defaultChecked={day !== "Sunday"} className="data-[state=checked]:bg-[#C0A975]" />
                             {day !== "Sunday" ? (
                                <div className="flex items-center gap-2">
                                   <Input defaultValue="10:00" className="w-24 h-8 bg-black/20 border-white/10 text-white text-center" />
                                   <span className="text-zinc-500">-</span>
                                   <Input defaultValue="23:00" className="w-24 h-8 bg-black/20 border-white/10 text-white text-center" />
                                </div>
                             ) : (
                                <span className="text-zinc-500 text-sm italic w-[216px] text-center">Closed</span>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        {/* TAB 3: TEAM */}
        <TabsContent value="team" className="space-y-6">
           <Card className="bg-zinc-900 border-white/5 rounded-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle className="text-white text-lg">Team Members</CardTitle>
                    <CardDescription className="text-zinc-500">Manage access to your restaurant dashboard.</CardDescription>
                 </div>
                 <Button className="bg-[#C0A975] text-black hover:bg-[#D4B988] gap-2">
                    <Plus size={16} /> Add Member
                 </Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                    {[
                       { name: "Eric Ripert", role: "Owner", email: "eric@le-bernardin.com", avatar: "ER" },
                       { name: "Sarah Jenkins", role: "Manager", email: "sarah@le-bernardin.com", avatar: "SJ" },
                       { name: "Mike Ross", role: "Chef", email: "mike@le-bernardin.com", avatar: "MR" },
                    ].map((member, i) => (
                       <div key={i} className="flex items-center justify-between p-4 border border-white/5 rounded-sm bg-white/[0.02]">
                          <div className="flex items-center gap-4">
                             <Avatar className="bg-zinc-800">
                                <AvatarFallback className="text-[#C0A975]">{member.avatar}</AvatarFallback>
                             </Avatar>
                             <div>
                                <h4 className="font-medium text-white">{member.name}</h4>
                                <p className="text-xs text-zinc-500">{member.email}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-800">
                                {member.role}
                             </Badge>
                             {member.role !== "Owner" && (
                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-400">
                                   <Trash2 size={16} />
                                </Button>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}