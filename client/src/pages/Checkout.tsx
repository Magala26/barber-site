import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

export default function Checkout() {
  const isSubmitting = false;

  const handlePayment = async () => {
    // This will be connected to Stripe when keys are provided
    console.log("Processing payment...");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/assets/s8-logo.jpg" alt="Section8Studios" className="w-16 h-16 aspect-square object-cover rounded-2xl" />
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
        </div>
      </nav>

      {/* Checkout Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2">
              <Card className="p-8 border-border mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold">Booking Confirmed</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  Your appointment has been reserved. Complete the payment to finalize your booking.
                </p>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-semibold">Premium Haircut</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-semibold">Today at 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">30 minutes</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold text-accent">$35.00</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="p-8 border-border">
                <h3 className="text-lg font-semibold mb-6">Payment Information</h3>
                <div className="bg-secondary/5 p-6 rounded-lg mb-6 text-center">
                  <p className="text-muted-foreground mb-2">Stripe Integration</p>
                  <p className="font-semibold">
                    Stripe payment processing will be available once you provide your API keys.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      disabled
                      className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        disabled
                        className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        disabled
                        className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
                >
                  {isSubmitting ? "Processing..." : "Complete Payment"}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Payment processing will be enabled once Stripe keys are configured.
                </p>
              </Card>
            </div>

            {/* Sidebar - Customer Info */}
            <div>
              <Card className="p-6 border-border sticky top-20">
                <h3 className="text-lg font-bold mb-4">Customer Information</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold break-all">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold">(555) 123-4567</p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground mb-2">Confirmation will be sent to:</p>
                    <p className="font-semibold text-accent break-all">john@example.com</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-8">
            <Link href="/services">
              <Button variant="outline" size="lg">
                Continue Shopping
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
                <li>Phone: (555) 123-4567</li>
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
