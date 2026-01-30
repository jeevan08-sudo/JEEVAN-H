import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const guestbookEntries = pgTable("guestbook_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  color: text("color").notNull().default("#00F0FF"), // Neon color hex
  stickerId: text("sticker_id").notNull().default("basic"), // For 3D sticker type
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertGuestbookEntrySchema = createInsertSchema(guestbookEntries).pick({
  name: true,
  message: true,
  color: true,
  stickerId: true,
});

// === EXPLICIT API CONTRACT TYPES ===
export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type InsertGuestbookEntry = z.infer<typeof insertGuestbookEntrySchema>;

// Request types
export type CreateGuestbookEntryRequest = InsertGuestbookEntry;

// Response types
export type GuestbookEntryResponse = GuestbookEntry;
export type GuestbookListResponse = GuestbookEntry[];
