import { db } from "./db";
import {
  guestbookEntries,
  type InsertGuestbookEntry,
  type GuestbookEntry,
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getGuestbookEntries(): Promise<GuestbookEntry[]>;
  createGuestbookEntry(entry: InsertGuestbookEntry): Promise<GuestbookEntry>;
}

export class DatabaseStorage implements IStorage {
  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return await db
      .select()
      .from(guestbookEntries)
      .orderBy(desc(guestbookEntries.createdAt));
  }

  async createGuestbookEntry(entry: InsertGuestbookEntry): Promise<GuestbookEntry> {
    const [newEntry] = await db
      .insert(guestbookEntries)
      .values(entry)
      .returning();
    return newEntry;
  }
}

export const storage = new DatabaseStorage();
