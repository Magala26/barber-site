import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Clock, Scissors } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Services() {
  const { data: services, isLoading } = trpc.services.list.useQuery();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/assets/section8-logo.svg" alt="Section8Studios" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-primary hidden sm:inline">Section8Studios</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-accent transition">
              Services
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-accent transition">
              Gallery
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:text-accent transition">
              Booking
            </Link>
          </div>
          <Link href="/booking">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Discover our comprehensive range of premium grooming services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services?.map((service) => (
                <Card key={service.id} className="p-8 border-border hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{service.name}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">{service.durationMinutes} minutes</span>
                    </div>
                    <div className="flex-1"></div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                      <p className="text-3xl font-bold text-accent">R{service.price}</p>
                    </div>
                  </div>
                  <Link href="/booking">
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Book This Service
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* House Calls Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">House Calls Available</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't make it to our shop? We bring our premium barbershop experience to your home. Perfect for busy professionals, special events, or group bookings.
            </p>
            <Link href="/house-calls">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                Book a House Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Why Our Services Stand Out</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Technique</h3>
              <p className="text-muted-foreground">
                Our barbers use precision techniques perfected through years of professional experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Attention to Detail</h3>
              <p className="text-muted-foreground">
                Every service is performed with meticulous attention to ensure your satisfaction.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Products</h3>
              <p className="text-muted-foreground">
                We use only the finest grooming products to ensure the best results for your hair and skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and discover why Section8Studios is the premier choice for grooming.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Section8Studios</h4>
              <p className="text-sm text-primary-foreground/80">Premium barbershop experience.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
                <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
                <li><Link href="/gallery" className="hover:text-accent transition">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Mon - Fri: 9:00 AM - 7:00 PM</li>
                <li>Sat: 10:00 AM - 6:00 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="tel:+27671733036" className="hover:text-accent transition">Phone: +27 67 173 3036</a></li>
                <li>Email: info@section8studios.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
