import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Clock, Star } from "lucide-react";
import { SERVICES, COMPANY_INFO } from "@/data/services";
import Navbar from "@/components/Navbar";

const LOGO_URL = "/assets/s8-logo.jpg";

export default function Home() {
  const services = SERVICES;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section with Blended Logo Background */}
      <section className="relative bg-gradient-to-b from-primary to-primary/90 text-white py-24 md:py-32 overflow-hidden">
        {/* Blended background logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img src={LOGO_URL} alt="" className="w-96 h-96 aspect-square object-cover rounded-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Premium Barbershop Experience</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Elevate your grooming with Section8Studios. Expert barbers, premium products, and exceptional service.
            </p>
            <Link href="/booking">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                Book Your Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Section8Studios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-border hover:shadow-lg transition">
              <Star className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Barbers</h3>
              <p className="text-muted-foreground">
                Highly trained professionals with years of experience in premium grooming.
              </p>
            </Card>
            <Card className="p-8 text-center border-border hover:shadow-lg transition">
              <img src={LOGO_URL} alt="" className="w-12 h-12 text-accent mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Premium Services</h3>
              <p className="text-muted-foreground">
                From classic cuts to modern styles, we offer comprehensive grooming solutions.
              </p>
            </Card>
            <Card className="p-8 text-center border-border hover:shadow-lg transition">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Convenient Booking</h3>
              <p className="text-muted-foreground">
                Easy online booking with flexible time slots to fit your schedule.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services?.slice(0, 3).map((service) => (
              <Card key={service.id} className="p-6 border-border hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">R{service.price}</span>
                  <span className="text-sm text-muted-foreground">{service.durationMinutes} min</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Services <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-primary text-white overflow-hidden">
        {/* Blended background logo */}
        <div className="absolute inset-0 flex items-center justify-end opacity-5 pointer-events-none">
          <img src={LOGO_URL} alt="" className="w-96 h-96 aspect-square object-cover rounded-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Look?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Book your appointment today and experience the Section8Studios difference.
            </p>
            <Link href="/booking">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO_URL} alt="Section8Studios" className="w-14 h-14 aspect-square object-cover rounded-2xl" />
                <h4 className="font-bold">Section8Studios</h4>
              </div>
              <p className="text-sm text-primary-foreground/80">Premium barbershop experience.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
                <li><Link href="/services" className="hover:text-accent transition">Services</Link></li>
                <li><Link href="/gallery" className="hover:text-accent transition">Gallery</Link></li>
                <li><Link href="/booking" className="hover:text-accent transition">Booking</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><span className="font-medium">Mon:</span> 09:00 - 19:00</li>
                <li><span className="font-medium">Tue:</span> 09:00 - 17:45</li>
                <li><span className="font-medium">Wed:</span> 09:00 - 19:00</li>
                <li><span className="font-medium">Thu:</span> 09:00 - 17:45</li>
                <li><span className="font-medium">Fri:</span> 09:00 - 19:00</li>
                <li><span className="font-medium">Sat:</span> 09:00 - 13:00</li>
                <li><span className="font-medium">Sun:</span> Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-accent transition">Phone: {COMPANY_INFO.phone}</a></li>
                <li>Email: {COMPANY_INFO.email}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2026 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
