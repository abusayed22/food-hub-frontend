// components/footer.tsx
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-white/10">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:py-20">
        
        {/* TOP SECTION: Brand & Newsletter */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
              ÉPICURE
            </h2>
            <p className="max-w-md text-base leading-relaxed">
              Experience the finest culinary delights delivered directly to your doorstep. Curated flavors, exceptional quality.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialIcon icon={<Facebook className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Instagram className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Twitter className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<Linkedin className="h-5 w-5" />} href="#" />
            </div>
          </div>

          <div className="space-y-4 lg:ml-auto lg:w-full lg:max-w-md">
            <h3 className="text-lg font-medium text-white tracking-widest uppercase">
              Stay Updated
            </h3>
            <form className="flex space-x-2">
              <Input 
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-[#C0A975]" 
                placeholder="Enter your email" 
                type="email" 
              />
              <Button type="submit" className="bg-[#C0A975] text-black hover:bg-[#D4B988]">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-zinc-500">
              Join our newsletter for exclusive offers and seasonal menu updates.
            </p>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
          <FooterColumn title="Discover">
            <FooterLink href="/menu">Our Menu</FooterLink>
            <FooterLink href="/chefs">Featured Chefs</FooterLink>
            <FooterLink href="/events">Private Events</FooterLink>
            <FooterLink href="/gift-cards">Gift Cards</FooterLink>
          </FooterColumn>
          
          <FooterColumn title="Company">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
            <FooterLink href="/blog">Culinary Journal</FooterLink>
          </FooterColumn>
          
          <FooterColumn title="Support">
            <FooterLink href="/contact">Contact Us</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/delivery">Delivery Info</FooterLink>
            <FooterLink href="/returns">Returns</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </FooterColumn>
        </div>

        <Separator className="bg-white/10" />

        {/* BOTTOM SECTION: Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 ÉPICURE. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
             <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// --- Helper Components ---

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-[#C0A975] hover:text-black"
    >
      {icon}
    </Link>
  )
}

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-4">
      <h4 className="text-sm font-semibold tracking-widest text-white uppercase">
        {title}
      </h4>
      <div className="flex flex-col space-y-2">
        {children}
      </div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm transition-colors hover:text-[#C0A975]"
    >
      {children}
    </Link>
  )
}