import { Card } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { CheckCircle, Calendar, Clock, User, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const LOGO_URL = "/assets/section8-logo.svg";

export default function BookingConfirmation() {
  const [bookingData, setBookingData] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Get booking data from localStorage
    const data = localStorage.getItem("lastBooking");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // Redirect to booking if no data
      setLocation("/booking");
    }
  }, [setLocation]);

  if (!bookingData) {
    return null;
  }

  const bookingDate = new Date(bookingData.bookingDate);
  const formattedDate = bookingDate.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={LOGO_URL} alt="Section8Studios" className="w-12 h-12 object-contain" />
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

      {/* Confirmation Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-2xl">
          <Card className="p-8 md:p-12 border-border">
            {/* Success Header */}
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-8 h-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold">Appointment Booked!</h1>
            </div>

            <p className="text-lg text-muted-foreground mb-8">
              Your appointment has been successfully booked. You'll receive SMS reminders on the day of your appointment.
            </p>

            {/* Booking Details */}
            <div className="bg-muted/30 rounded-lg p-6 mb-8 space-y-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-lg font-semibold">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="text-lg font-semibold">{bookingData.bookingTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Services</p>
                  <p className="text-lg font-semibold">{bookingData.serviceNames || bookingData.serviceName}</p>
                  {bookingData.totalDuration && (
                    <p className="text-sm text-muted-foreground mt-1">Duration: {bookingData.totalDuration} minutes</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Confirmation Sent To</p>
                  <p className="text-lg font-semibold">{bookingData.customerPhone}</p>
                </div>
              </div>

              {bookingData.totalCost && (
                <div className="flex items-start gap-4 pt-4 border-t border-border">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="text-2xl font-bold text-accent">R{bookingData.totalCost.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Reminders Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3">Appointment Reminders</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Morning reminder on the day of your appointment</li>
                <li>✓ Reminder 1 hour before your appointment</li>
              </ul>
            </div>

            {/* Additional Info */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-3">What to Expect</h3>
              <p className="text-muted-foreground mb-4">
                Your seat is now reserved. Please arrive 5 minutes early. If you need to reschedule or cancel, please contact us at +27 67 173 3036.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Link href="/booking">
                <button className="flex-1 px-6 py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:shadow-lg transition">
                  Book Another Appointment
                </button>
              </Link>
              <Link href="/">
                <button className="flex-1 px-6 py-3 bg-muted text-foreground font-bold rounded-lg hover:shadow-lg transition">
                  Back to Home
                </button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Section8Studios</h4>
              <p className="text-sm opacity-80">Premium barbershop experience in South Africa</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm opacity-80">Phone: +27 67 173 3036</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <p className="text-sm opacity-80">Instagram: @section8studioss</p>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2026 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
