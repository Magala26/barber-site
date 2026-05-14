import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { COMPANY_INFO } from "@/data/services";

const LOGO_URL = "/assets/s8-logo.jpg";

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={LOGO_URL} alt={COMPANY_INFO.name} className="w-12 h-12 aspect-square object-cover rounded-xl" />
            <span className="text-xl font-bold text-primary hidden sm:inline">{COMPANY_INFO.name}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-accent transition">
              {link.label}
            </Link>
          ))}
          <Link href="/booking">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-3">
                  <img src={LOGO_URL} alt={COMPANY_INFO.name} className="w-10 h-10 rounded-lg" />
                  {COMPANY_INFO.name}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium p-2 hover:bg-muted rounded-md transition">
                    {link.label}
                  </Link>
                ))}
                <Link href="/booking" className="mt-4">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg">
                    Book Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
