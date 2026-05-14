import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { COMPANY_INFO } from "@/data/services";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Section8Studios</h1>
          <p className="text-lg text-gray-200">Discover our philosophy and commitment to excellence</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            {/* Mission Statement */}
            <div className="bg-white border border-border rounded-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Our Philosophy</h2>
              
              <div className="space-y-6 text-lg leading-relaxed text-foreground">
                <p>
                  <span className="font-bold text-primary">Section 8 isn't just a haircut.</span> It's a mindset. It's a space built to feel calm, present, and blessed.
                </p>
                
                <p>
                  We're here to reinforce your ambition—not just your confidence. Every visit is an opportunity to elevate your presence and sharpen your appearance.
                </p>
                
                <p>
                  We take time to understand exactly what you want and work with you to get it on point. Our attention to detail ensures that every service is properly executed, so you leave looking like yourself—just sharper.
                </p>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="bg-gray-50 border border-border rounded-lg p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-primary">Our Commitment</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary">Precision & Detail</h4>
                  <p className="text-foreground">
                    Every cut, every line, every detail is executed with precision to ensure you get exactly what you envisioned.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary">Calm & Presence</h4>
                  <p className="text-foreground">
                    Our space is designed to be a sanctuary where you can relax, reset, and feel present in the moment.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary">Understanding</h4>
                  <p className="text-foreground">
                    We listen. We understand your vision. We collaborate to bring your ideal look to life.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary">Excellence</h4>
                  <p className="text-foreground">
                    Every service is a reflection of our commitment to quality and your satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Section8Studios?</h2>
          <p className="text-lg mb-8 text-gray-200">Book your appointment today and discover the difference.</p>
          <Link href="/booking">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition cursor-pointer">
              Book Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">Section8Studios</h4>
              <p className="text-sm text-muted-foreground">Premium barbershop experience in South Africa.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition">Home</Link></li>
                <li><Link href="/services" className="text-muted-foreground hover:text-primary transition">Services</Link></li>
                <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition">Gallery</Link></li>
                <li><Link href="/booking" className="text-muted-foreground hover:text-primary transition">Booking</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-4">Operating Hours</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="font-medium text-foreground">Monday:</span> 09:00 - 19:00</li>
                <li><span className="font-medium text-foreground">Tuesday:</span> 09:00 - 17:45</li>
                <li><span className="font-medium text-foreground">Wednesday:</span> 09:00 - 19:00</li>
                <li><span className="font-medium text-foreground">Thursday:</span> 09:00 - 17:45</li>
                <li><span className="font-medium text-foreground">Friday:</span> 09:00 - 19:00</li>
                <li><span className="font-medium text-foreground">Saturday:</span> 09:00 - 13:00</li>
                <li><span className="font-medium text-foreground">Sunday:</span> Closed</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary transition">Phone: {COMPANY_INFO.phone}</a></li>
                <li>Email: {COMPANY_INFO.email}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
