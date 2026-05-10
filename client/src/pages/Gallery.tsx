import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const LOCAL_GALLERY_FALLBACK = "/assets/gallery-premium-fade-placeholder.svg";

// Static gallery images — add actual image paths here when available
const GALLERY_IMAGES = [
  { id: 1, title: "Premium Fade", description: "Clean fade with sharp lines", imageUrl: LOCAL_GALLERY_FALLBACK },
  { id: 2, title: "Classic Cut", description: "Timeless classic haircut", imageUrl: LOCAL_GALLERY_FALLBACK },
  { id: 3, title: "Beard Shaping", description: "Professional beard grooming", imageUrl: LOCAL_GALLERY_FALLBACK },
  { id: 4, title: "Modern Style", description: "Contemporary men's styling", imageUrl: LOCAL_GALLERY_FALLBACK },
  { id: 5, title: "Hot Towel Shave", description: "Luxurious straight razor shave", imageUrl: LOCAL_GALLERY_FALLBACK },
  { id: 6, title: "Combo Service", description: "Full haircut and beard package", imageUrl: LOCAL_GALLERY_FALLBACK },
];

export default function Gallery() {
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
                <li>Sat: 9:00 AM - 1:00 PM</li>
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
            <p>&copy; 2026 Section8Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


const LOCAL_GALLERY_FALLBACK = "/assets/gallery-premium-fade-placeholder.svg";

function getGalleryImageUrl(imageUrl: string) {
  if (!imageUrl || imageUrl.startsWith("/manus-storage/")) {
    return LOCAL_GALLERY_FALLBACK;
  }

  return imageUrl;
}

export default function Gallery() {
  const { data: images, refetch } = trpc.gallery.list.useQuery();
  const { user } = useAuth();
  const uploadMutation = trpc.gallery.upload.useMutation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        title: title || "Gallery Image",
        description: description || "",
        imageUrl,
        imageKey: imageUrl.split("/").pop() || "image",
      });
      toast.success("Image added to gallery!");
      setTitle("");
      setDescription("");
      setImageUrl("");
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to add image");
    }
  };

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
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Gallery Image</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Image Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Image Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Button
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {uploadMutation.isPending ? "Uploading..." : "Add Image"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Link href="/booking">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Book Now
              </Button>
            </Link>
          </div>
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
          {!images || images.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                Gallery coming soon! Check back for our latest work.
              </p>
              {user?.role === "admin" && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Gallery Image</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Image Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder="Image Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <Input
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                      <Button
                        onClick={handleUpload}
                        disabled={uploadMutation.isPending}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {uploadMutation.isPending ? "Uploading..." : "Add Image"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <img
                    src={getGalleryImageUrl(image.imageUrl)}
                    alt={image.title || "Gallery image"}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                    onError={(event) => {
                      event.currentTarget.src = LOCAL_GALLERY_FALLBACK;
                    }}
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
          )}
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
