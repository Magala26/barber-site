import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

const LOGO_URL = "/assets/section8-logo.svg";

export default function HouseCalls() {
  const { data: services } = trpc.services.list.useQuery();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");

  const createHouseCall = trpc.houseCalls.create.useMutation();

  const handleBookHouseCall = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !address || !phone || !name) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await createHouseCall.mutateAsync({
        customerName: name,
        customerPhone: phone,
        address: address,
        serviceIds: selectedService ? [selectedService] : [],
        requestedDate: selectedDate,
        requestedTime: selectedTime,
      });
      alert("House call booking request submitted! We will contact you shortly to confirm.");
      setName("");
      setPhone("");
      setAddress("");
      setSelectedService(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      alert("Error submitting house call request. Please try again.");
    }
  };

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
            <Link href="/about" className="text-sm font-medium hover:text-accent transition">
              About
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
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">House Call Services</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We bring our premium barbershop experience to your home. Book a house call and enjoy professional grooming in the comfort of your own space.
          </p>
        </div>
      </section>

      {/* House Call Booking Form */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-8">Book a House Call</h2>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">
                  <strong>Minimum booking:</strong> House calls are available for bookings of 2 or more services. A travel fee may apply based on location.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., +27 67 173 3036"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full address"
                  rows={3}
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium mb-4">Select Services</label>
                <div className="space-y-3">
                  {services?.map((service) => (
                    <label key={service.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/5 transition">
                      <input
                        type="checkbox"
                        checked={selectedService === service.id}
                        onChange={() => setSelectedService(selectedService === service.id ? null : service.id)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">R{service.price}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleBookHouseCall}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg"
              >
                Request House Call
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                We'll contact you to confirm your house call booking and discuss any travel fees.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-primary/20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="Section8Studios" className="w-10 h-10 object-contain" />
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
                <li><span className="font-medium">Thu:</span> 09:00 - 17:30</li>
                <li><span className="font-medium">Fri:</span> 09:00 - 19:00</li>
                <li><span className="font-medium">Sat:</span> 09:00 - 13:00</li>
                <li><span className="font-medium">Sun:</span> Closed</li>
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
            <p>&copy; 2026 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
