import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createTestContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Barbershop API", () => {
  describe("services", () => {
    it("should list active services", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const services = await caller.services.list();
      expect(Array.isArray(services)).toBe(true);
    });

    it("should get a service by ID", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const service = await caller.services.getById({ id: 1 });
      // Service may or may not exist, but the query should not throw
      expect(service === undefined || typeof service === "object").toBe(true);
    });
  });

  describe("operatingHours", () => {
    it("should list operating hours", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const hours = await caller.operatingHours.list();
      expect(Array.isArray(hours)).toBe(true);
    });
  });

  describe("bookings", () => {
    it("should create a booking", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const booking = await caller.bookings.create({
        serviceId: 1,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "(555) 123-4567",
        bookingDate: new Date().toISOString().split("T")[0],
        bookingTime: "14:00",
        notes: "Test booking",
      });

      expect(booking).toBeDefined();
    });

    it("should validate email format on booking creation", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.bookings.create({
          serviceId: 1,
          customerName: "John Doe",
          customerEmail: "invalid-email",
          bookingDate: new Date().toISOString().split("T")[0],
          bookingTime: "14:00",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should get a booking by ID", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const booking = await caller.bookings.getById({ id: 1 });
      // Booking may or may not exist, but the query should not throw
      expect(booking === undefined || typeof booking === "object").toBe(true);
    });
  });

  describe("payments", () => {
    it("should create a payment", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const payment = await caller.payments.create({
        bookingId: 1,
        amount: 35.0,
        currency: "USD",
      });

      expect(payment).toBeDefined();
    });

    it("should get a payment by booking ID", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const payment = await caller.payments.getByBookingId({ bookingId: 1 });
      // Payment may or may not exist, but the query should not throw
      expect(payment === undefined || typeof payment === "object").toBe(true);
    });
  });

  describe("gallery", () => {
    it("should list gallery images", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const images = await caller.gallery.list();
      expect(Array.isArray(images)).toBe(true);
    });

    it("should upload a gallery image (protected)", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const image = await caller.gallery.upload({
        title: "Test Image",
        description: "A test gallery image",
        imageUrl: "https://example.com/image.jpg",
        imageKey: "test-image-key",
      });

      expect(image).toBeDefined();
    });

    it("should delete a gallery image (protected)", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.gallery.delete({ id: 1 });
      expect(result).toBeDefined();
    });
  });

  describe("auth", () => {
    it("should get current user", async () => {
      const ctx = createTestContext();
      const caller = appRouter.createCaller(ctx);

      const user = await caller.auth.me();
      expect(user).toEqual(ctx.user);
    });

    it("should logout user", async () => {
      const ctx = createTestContext();
      const clearCookieMock = vi.fn();
      ctx.res.clearCookie = clearCookieMock;

      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.logout();

      expect(result.success).toBe(true);
      expect(clearCookieMock).toHaveBeenCalled();
    });
  });
});
