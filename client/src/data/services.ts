// Static service data for deployment without backend
export const SERVICES = [
  { 
    id: 1, 
    name: 'FADE', 
    description: 'Your go-to cut. Clean, effortless, and always on point.', 
    price: '130', 
    durationMinutes: 30, 
    isActive: true 
  },
  { 
    id: 2, 
    name: 'FADE + BEARD/GOATEE', 
    description: 'Haircut + beard work for a sharper overall look.', 
    price: '150', 
    durationMinutes: 45, 
    isActive: true 
  },
  { 
    id: 3, 
    name: 'EYEBROWS', 
    description: 'Eyebrow grooming with clean, subtle shaping.', 
    price: '30', 
    durationMinutes: 15, 
    isActive: true 
  },
  { 
    id: 4, 
    name: 'ENHANCEMENTS', 
    description: 'Enhancements and definition where it matters.', 
    price: '30', 
    durationMinutes: 15, 
    isActive: true 
  },
  { 
    id: 5, 
    name: 'FULL SERVICE', 
    description: 'Everything you need in one session.', 
    price: '200', 
    durationMinutes: 60, 
    isActive: true 
  },
  { 
    id: 6, 
    name: 'CLEAN BUZZ + BEARD/GOATEE', 
    description: 'Clean, tight buzz with a sharp beard or goatee finish.', 
    price: '100', 
    durationMinutes: 30, 
    isActive: true 
  },
  { 
    id: 7, 
    name: 'KIDS CUT', 
    description: 'Clean, comfortable cuts for the little ones.', 
    price: '100', 
    durationMinutes: 30, 
    isActive: true 
  },
  { 
    id: 8, 
    name: 'THE INNER CIRCLE (MONTHLY MEMBERSHIP)', 
    description: 'Built for consistency. 3 full service cuts. Multiple visits, priority access, always ready.', 
    price: '500', 
    durationMinutes: 60, 
    isActive: true 
  },
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
