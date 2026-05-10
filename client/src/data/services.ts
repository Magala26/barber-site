// Static service data for deployment without backend
export const SERVICES = [
  { id: 1, name: 'Classic Haircut', description: 'Traditional haircut with precision styling', price: '35.00', durationMinutes: 30, isActive: true },
  { id: 2, name: 'Fade Haircut', description: 'Modern fade with clean lines and sharp edges', price: '40.00', durationMinutes: 35, isActive: true },
  { id: 3, name: 'Beard Trim', description: 'Professional beard trimming and shaping', price: '25.00', durationMinutes: 20, isActive: true },
  { id: 4, name: 'Haircut + Beard Combo', description: 'Complete grooming package with haircut and beard trim', price: '55.00', durationMinutes: 50, isActive: true },
  { id: 5, name: 'Hot Towel Shave', description: 'Luxurious straight razor shave with hot towel treatment', price: '45.00', durationMinutes: 40, isActive: true },
  { id: 6, name: 'Hair Styling', description: 'Professional styling for special occasions', price: '30.00', durationMinutes: 25, isActive: true },
];

export const OPERATING_HOURS = [
  { dayOfWeek: 0, openTime: '00:00', closeTime: '00:00', isClosed: true },
  { dayOfWeek: 1, openTime: '09:00', closeTime: '19:00', isClosed: false },
  { dayOfWeek: 2, openTime: '09:00', closeTime: '17:45', isClosed: false },
  { dayOfWeek: 3, openTime: '09:00', closeTime: '19:00', isClosed: false },
  { dayOfWeek: 4, openTime: '09:00', closeTime: '17:45', isClosed: false },
  { dayOfWeek: 5, openTime: '09:00', closeTime: '19:00', isClosed: false },
  { dayOfWeek: 6, openTime: '09:00', closeTime: '13:00', isClosed: false },
];
