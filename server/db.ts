import { eq, and, gte, lte, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, services, bookings, operatingHours, galleryImages, payments, houseCalls } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Services queries
export async function getActiveServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).where(eq(services.isActive, true));
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Operating hours queries
export async function getOperatingHours() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(operatingHours);
}

// Bookings queries
export async function createBooking(booking: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(bookings).values(booking);
  // Fetch and return the created booking with ID
  const result = await db.select().from(bookings).where(eq(bookings.customerEmail, booking.customerEmail)).orderBy(desc(bookings.id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBookingsByDate(date: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).where(eq(bookings.bookingDate, new Date(date)));
}

export async function checkBookingConflict(bookingDate: Date, bookingTime: string, serviceId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Get the service to know its duration
  const service = await getServiceById(serviceId);
  if (!service) return false;
  
  // Parse booking time (HH:MM format)
  const [hours, minutes] = bookingTime.split(':').map(Number);
  const bookingStart = new Date(bookingDate);
  bookingStart.setHours(hours, minutes, 0, 0);
  
  // Calculate end time based on service duration
  const bookingEnd = new Date(bookingStart);
  bookingEnd.setMinutes(bookingEnd.getMinutes() + (service.durationMinutes || 30));
  
  // Get all bookings for this date
  const existingBookings = await getBookingsByDate(bookingDate.toISOString().split('T')[0]);
  
  // Check for conflicts (only check pending and confirmed bookings)
  for (const booking of existingBookings) {
    if (booking.status === 'cancelled' || booking.status === 'completed') continue;
    
    const [existingHours, existingMinutes] = booking.bookingTime.split(':').map(Number);
    const existingStart = new Date(bookingDate);
    existingStart.setHours(existingHours, existingMinutes, 0, 0);
    
    const existingService = await getServiceById(booking.serviceId);
    const existingEnd = new Date(existingStart);
    existingEnd.setMinutes(existingEnd.getMinutes() + (existingService?.durationMinutes || 30));
    
    // Check if times overlap
    if (bookingStart < existingEnd && bookingEnd > existingStart) {
      return true; // Conflict found
    }
  }
  
  return false; // No conflict
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateBookingStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(bookings).set({ status: status as any }).where(eq(bookings.id, id));
}

// Payments queries
export async function createPayment(payment: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(payments).values(payment);
}

export async function getPaymentByBookingId(bookingId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(payments).where(eq(payments.bookingId, bookingId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updatePaymentStatus(id: number, status: string, stripePaymentIntentId?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { status: status as any };
  if (stripePaymentIntentId) {
    updateData.stripePaymentIntentId = stripePaymentIntentId;
  }
  return db.update(payments).set(updateData).where(eq(payments.id, id));
}

// Gallery queries
export async function getActiveGalleryImages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryImages).where(eq(galleryImages.isActive, true)).orderBy(galleryImages.displayOrder);
}

export async function createGalleryImage(image: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(galleryImages).values(image);
}

export async function deleteGalleryImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(galleryImages).set({ isActive: false }).where(eq(galleryImages.id, id));
}

// House calls queries
export async function createHouseCall(houseCall: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(houseCalls).values(houseCall);
}

export async function getHouseCallById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(houseCalls).where(eq(houseCalls.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllHouseCalls() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(houseCalls).orderBy(houseCalls.createdAt);
}

export async function updateHouseCallStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(houseCalls).set({ status: status as any }).where(eq(houseCalls.id, id));
}
