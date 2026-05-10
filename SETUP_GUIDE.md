# Section8Studios Website - Setup Guide

Welcome to your premium barbershop website! This guide will help you complete the setup and get your site fully operational.

## Current Status ✅

Your website is now live with all core features implemented:

- **5 Fully Functional Pages**: Home, Services, Gallery, Booking, Checkout
- **Database Integration**: Services, bookings, payments, gallery, and operating hours
- **Premium Styling**: Elegant grey, black, white, and red accent color palette
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Owner Notifications**: Automatic alerts when customers make bookings
- **6 Sample Services**: Pre-populated with pricing and durations

## Next Steps

### 1. Stripe Payment Integration (Required for Payments)

To enable online payment processing:

1. **Create a Stripe Account**
   - Go to https://stripe.com
   - Sign up for a free account
   - Complete the account setup

2. **Get Your API Keys**
   - Log in to your Stripe Dashboard
   - Navigate to **Developers → API Keys**
   - Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)
   - Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

3. **Add Keys to Your Website**
   - In the Management UI, go to **Settings → Payment**
   - Enter your Secret Key
   - Enter your Publishable Key
   - Save and the payment system will be activated

4. **Test Payment Processing**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiration date (e.g., 12/25)
   - Any 3-digit CVC (e.g., 123)

### 2. Add Your Logo (Optional but Recommended)

To replace the placeholder icon with your Section8Studios logo:

1. **Prepare Your Logo**
   - Recommended size: 200x200 pixels or larger
   - Format: PNG, JPG, or SVG
   - Keep it simple and recognizable

2. **Upload Your Logo**
   - Prepare your logo file
   - I'll upload it to the website and integrate it into the navigation header

### 3. Add Gallery Images (Optional)

To showcase your barbershop work:

1. **Prepare Your Images**
   - Recommended: 5-10 high-quality photos
   - Size: 1200x800 pixels or larger
   - Format: JPG or PNG
   - Show haircuts, fades, beard work, and shop atmosphere

2. **Upload to Gallery**
   - Log in to your website as admin
   - Go to the Gallery page
   - Click "Add Image" button
   - Provide image URL and description
   - Images will appear in the gallery grid

### 4. Customize Your Information

Update the following information to match your business:

**Operating Hours** (Currently set to):
- Monday - Friday: 9:00 AM - 7:00 PM
- Saturday: 10:00 AM - 6:00 PM
- Sunday: Closed

**Contact Information** (Update in footer):
- Phone: (555) 123-4567
- Email: info@section8studios.com

**Services** (Currently includes):
1. Classic Haircut - $35.00 (30 min)
2. Fade Haircut - $40.00 (35 min)
3. Beard Trim - $25.00 (20 min)
4. Haircut + Beard Combo - $55.00 (50 min)
5. Hot Towel Shave - $45.00 (40 min)
6. Hair Styling - $30.00 (25 min)

## Features Overview

### Home Page
- Eye-catching hero section with call-to-action
- Service highlights with pricing
- Why choose us section
- Easy navigation to all pages

### Services Page
- Complete list of all services
- Detailed descriptions
- Pricing and duration for each service
- "Book This Service" buttons

### Booking Page
- Date picker for selecting appointment date
- Time slot selector (30-minute intervals)
- Service selection with live pricing
- Customer information form
- Operating hours display
- Booking summary sidebar

### Gallery Page
- Beautiful grid layout for your photos
- Hover effects to see image details
- Admin panel to add/manage images
- Responsive design for all devices

### Checkout Page
- Booking summary
- Customer information review
- Secure payment processing
- Payment confirmation

## Database Tables

Your website uses the following database structure:

- **services**: Barbershop services with pricing and duration
- **bookings**: Customer appointments with status tracking
- **payments**: Payment records linked to bookings
- **operatingHours**: Shop hours for each day of the week
- **galleryImages**: Photos for the gallery
- **users**: Customer and admin accounts

## API Endpoints

The website uses tRPC for secure API communication:

- `services.list` - Get all active services
- `services.getById` - Get specific service details
- `bookings.create` - Create a new booking
- `bookings.getById` - Get booking details
- `payments.create` - Create a payment record
- `payments.getByBookingId` - Get payment for a booking
- `gallery.list` - Get all gallery images
- `gallery.upload` - Upload new gallery image (admin only)
- `gallery.delete` - Delete gallery image (admin only)
- `operatingHours.list` - Get operating hours

## Testing the Website

### Test Booking Flow
1. Go to Home page
2. Click "Book Now" button
3. Select a service
4. Choose a date and time
5. Enter your information
6. Click "Continue to Payment"

### Test Payment (with Stripe)
1. Complete a booking
2. On checkout page, enter test card details
3. Click "Complete Payment"
4. You'll receive a confirmation

### Test Gallery (as Admin)
1. Log in as admin
2. Go to Gallery page
3. Click "Add Image"
4. Enter image URL and description
5. Image appears in gallery grid

## Support & Customization

If you need to:
- Change service pricing or descriptions
- Update operating hours
- Modify color scheme
- Add new services
- Customize any content

Just let me know and I can make those changes for you!

## Security Notes

- All payments are processed securely through Stripe
- Customer data is encrypted in transit
- Admin functions are protected with authentication
- No sensitive data is stored locally

## Going Live

When you're ready to go live:

1. **Switch to Live Stripe Keys**
   - Update your Stripe API keys from test to live
   - This enables real payment processing

2. **Custom Domain** (Optional)
   - Set up a custom domain for your website
   - Available in Settings → Domains

3. **Backup & Monitoring**
   - Regular backups are automatic
   - Monitor bookings and payments from the dashboard

## Contact & Support

For any questions or customizations, feel free to reach out. Your website is fully functional and ready to serve your customers!

---

**Version**: 1.0  
**Last Updated**: April 30, 2024  
**Status**: Production Ready
