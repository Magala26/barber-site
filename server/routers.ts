import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";


export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  services: router({
    list: publicProcedure.query(() => db.getActiveServices()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getServiceById(input.id)),
  }),

  operatingHours: router({
    list: publicProcedure.query(() => db.getOperatingHours()),
  }),

  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          serviceId: z.number(),
          customerName: z.string(),
          customerEmail: z.string().email(),
          customerPhone: z.string().optional(),
          bookingDate: z.string(),
          bookingTime: z.string(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const booking = await db.createBooking({
          serviceId: input.serviceId,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone || null,
          bookingDate: new Date(input.bookingDate),
          bookingTime: input.bookingTime,
          status: "pending",
          notes: input.notes || null,
        });
        await notifyOwner({
          title: "New Booking Request",
          content: `New booking from ${input.customerName} on ${input.bookingDate} at ${input.bookingTime}`,
        });
        return booking;
      }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getBookingById(input.id)),
  }),

  payments: router({
    create: publicProcedure
      .input(
        z.object({
          bookingId: z.number(),
          amount: z.number(),
          currency: z.string().default("USD"),
        })
      )
      .mutation(async ({ input }) => {
        const payment = await db.createPayment({
          bookingId: input.bookingId,
          amount: input.amount.toString(),
          currency: input.currency,
          status: "pending",
        });
        return payment;
      }),
    getByBookingId: publicProcedure
      .input(z.object({ bookingId: z.number() }))
      .query(({ input }) => db.getPaymentByBookingId(input.bookingId)),
  }),

  gallery: router({
    list: publicProcedure.query(() => db.getActiveGalleryImages()),
    upload: protectedProcedure
      .input(
        z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string(),
          imageKey: z.string(),
        })
      )
      .mutation(({ input }) => db.createGalleryImage(input)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteGalleryImage(input.id)),
  }),

  houseCalls: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string(),
          customerEmail: z.string().email().optional(),
          customerPhone: z.string(),
          address: z.string(),
          serviceIds: z.array(z.number()),
          requestedDate: z.string(),
          requestedTime: z.string(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const houseCall = await db.createHouseCall({
          customerName: input.customerName,
          customerEmail: input.customerEmail || null,
          customerPhone: input.customerPhone,
          address: input.address,
          serviceIds: JSON.stringify(input.serviceIds),
          requestedDate: new Date(input.requestedDate),
          requestedTime: input.requestedTime,
          status: "pending",
          notes: input.notes || null,
        });
        await notifyOwner({
          title: "New House Call Request",
          content: `House call request from ${input.customerName} on ${input.requestedDate} at ${input.requestedTime}. Address: ${input.address}`,
        });
        return houseCall;
      }),
    getAll: protectedProcedure.query(() => db.getAllHouseCalls()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getHouseCallById(input.id)),
    updateStatus: protectedProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => db.updateHouseCallStatus(input.id, input.status)),
  }),
});

export type AppRouter = typeof appRouter;
