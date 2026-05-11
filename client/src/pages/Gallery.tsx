import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const LOGO_URL = "/assets/s8-logo.jpg";

// Static gallery images using newly generated assets
const GALLERY_IMAGES = [
  { id: 1, title: "Premium Fade", description: "Clean skin fade with sharp lines and precision styling", imageUrl: "/assets/gallery_fade_cut.png" },
  { id: 2, title: "Beard Shaping", description: "Professional beard grooming with straight razor precision", imageUrl: "/assets/gallery_beard_trim.png" },
  { id: 3, title: "Classic Cut", description: "Timeless classic haircut in our premium leather chair", imageUrl: "/assets/gallery_classic_cut.png" },
  { id: 4, title: "Modern Style", description: "Contemporary men's styling and texturing", imageUrl: "/assets/gallery_fade_cut.png" },
  { id: 5, title: "Hot Towel Shave", description: "Luxurious traditional straight razor shave", imageUrl: "/assets/gallery_beard_trim.png" },
  { id: 6, title: "Executive Package", description: "Full premium haircut and comprehensive beard grooming", imageUrl: "/assets/gallery_classic_cut.png" },
];

export default function Gallery() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl">
            Explore our portfolio of premium haircuts and grooming services.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title || "Gallery image"}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-end">
                  <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition duration-300">
                    {image.title && <h3 className="font-bold">{image.title}</h3>}
                    {image.description && <p className="text-sm text-white/80">{image.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Inspired by Our Work?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Book your appointment today and let our expert barbers create your perfect look.
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
