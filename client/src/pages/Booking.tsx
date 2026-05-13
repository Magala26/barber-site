import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation } from "wouter";
import { Calendar, Clock, X } from "lucide-react";
import { SERVICES } from "@/data/services";
import { useState } from "react";
import { toast } from "sonner";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

const LOGO_URL = "/assets/s8-logo.jpg";
const WHATSAPP_PHONE = "27671733036";

export default function Booking() {
  const [, setLocation] = useLocation();
  const services = SERVICES;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Generate available time slots (45-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 19; hour++) {
      for (let minute = 0; minute < 60; minute += 45) {
        const timeStr = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  // Get minimum booking date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Handle service selection (multiple)
  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services?.find((s) => s.id === serviceId);
      return total + (service ? parseFloat(service.price.toString()) : 0);
    }, 0);
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services?.find((s) => s.id === serviceId);
      return total + (service?.durationMinutes || 0);
    }, 0);
  };

  const totalCost = calculateTotalCost();
  const totalDuration = calculateTotalDuration();

  const handleBooking = async () => {
    if (selectedServices.length === 0 || !bookingDate || !bookingTime || !customerName || !customerEmail || !customerPhone) {
      toast.error("Please select at least one service and fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const selectedServiceNames = selectedServices
      .map((id) => services?.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    // Store booking data for confirmation page
    const confirmationData = {
      bookingId: Date.now(),
      bookingDate,
      bookingTime,
      customerName,
      customerPhone,
      serviceNames: selectedServiceNames,
      totalCost,
      totalDuration,
    };
    localStorage.setItem("lastBooking", JSON.stringify(confirmationData));

    // Send booking via WhatsApp
    const message = `Hi Section8Studios! I'd like to book:\n\nServices: ${selectedServiceNames}\nDate: ${bookingDate}\nTime: ${bookingTime}\nName: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}${notes ? `\nNotes: ${notes}` : ''}\nTotal: R${totalCost.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast.success("Redirecting to WhatsApp to confirm your booking!");
    setIsSubmitting(false);
    setLocation("/booking-confirmation");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={LOGO_URL} alt="Section8Studios" className="w-16 h-16 aspect-square object-cover rounded-2xl" />
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
            <Link href="/booking" className="text-sm font-medium text-accent">
              Booking
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Book Your Appointment</h1>
          <p className="text-muted-foreground mb-8">Select services, date, and time for your haircut</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Booking Form */}
            <div className="md:col-span-2">
              {/* Services Selection */}
              <div className="bg-card rounded-lg p-6 mb-6 shadow-md">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">Select Services</h2>
                  <p className="text-sm text-muted-foreground">Choose one or more services to combine in one appointment</p>
                </div>
                <MultiSelectDropdown
                  options={services?.map((s) => ({
                    id: s.id,
                    name: s.name,
                    price: s.price.toString(),
                    durationMinutes: s.durationMinutes,
                  })) || []}
                  selectedIds={selectedServices}
                  onSelectionChange={setSelectedServices}
                  placeholder="Click to select services..."
                />
              </div>

              {/* Date & Time Selection */}
              <div className="bg-card rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Select Date & Time</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date</label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={getMinDate()}
                        className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Time</label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a time</option>
                        {generateTimeSlots().map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-card rounded-lg p-6 mb-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number (South African) *</label>
                    <Input
                      type="tel"
                      placeholder="+27 (0)XX XXX XXXX or 0XX XXX XXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format: +27 (0)XX XXX XXXX or 0XX XXX XXXX</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Special Requests (Optional)</label>
                    <Textarea
                      placeholder="Any special requests or notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
              >
                {isSubmitting ? "Booking..." : "Book Your Appointment"}
              </button>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                {selectedServices.length > 0 ? (
                  <>
                    <div className="mb-4 pb-4 border-b border-border">
                      {selectedServices.length > 1 && (
                        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs font-semibold text-blue-900">
                          📦 Combo: {selectedServices.length} services bundled
                        </div>
                      )}
                      <div className="space-y-3">
                        {selectedServices.map((serviceId) => {
                          const service = services?.find((s) => s.id === serviceId);
                          return (
                            <div key={serviceId} className="flex justify-between items-start p-2 bg-muted/30 rounded">
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{service?.name}</p>
                                <p className="text-xs text-muted-foreground">{service?.durationMinutes} min</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm">R{parseFloat(service?.price.toString() || "0").toFixed(2)}</p>
                                <button
                                  onClick={() => handleServiceToggle(serviceId)}
                                  className="text-muted-foreground hover:text-foreground transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Services:</span>
                        <span className="font-semibold">{selectedServices.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Duration:</span>
                        <span className="font-semibold">{totalDuration} minutes</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                        <span>Total Cost:</span>
                        <span className="text-accent">R{totalCost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded p-3 text-xs text-muted-foreground">
                      <p>✓ Appointment reminders will be sent to your phone</p>
                      <p>✓ Confirmation email will be sent</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Select services to see the total</p>
                  </div>
                )}

                {/* Operating Hours */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-bold text-sm mb-3">Operating Hours</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Monday</span>
                      <span className="font-semibold">09:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Tuesday</span>
                      <span className="font-semibold">09:00 - 17:45</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Wednesday</span>
                      <span className="font-semibold">09:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Thursday</span>
                      <span className="font-semibold">09:00 - 17:45</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Friday</span>
                      <span className="font-semibold">09:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border">
                      <span className="text-muted-foreground font-medium">Saturday</span>
                      <span className="font-semibold">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-muted-foreground font-medium">Sunday</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
