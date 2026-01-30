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
    if (!db) throw new Error("Database not initialized");
    return await db
      .select()
      .from(guestbookEntries)
      .orderBy(desc(guestbookEntries.createdAt));
  }

  async createGuestbookEntry(entry: InsertGuestbookEntry): Promise<GuestbookEntry> {
    if (!db) throw new Error("Database not initialized");
    const [newEntry] = await db
      .insert(guestbookEntries)
      .values(entry)
      .returning();
    return newEntry;
  }
}

export class MemStorage implements IStorage {
  private entries: GuestbookEntry[] = [];
  private currentId = 1;

  async getGuestbookEntries(): Promise<GuestbookEntry[]> {
    return [...this.entries].sort((a, b) =>
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createGuestbookEntry(entry: InsertGuestbookEntry): Promise<GuestbookEntry> {
    const newEntry: GuestbookEntry = {
      id: this.currentId++,
      name: entry.name,
      message: entry.message,
      color: entry.color ?? "#00F0FF",
      stickerId: entry.stickerId ?? "basic",
      createdAt: new Date(),
    };
    this.entries.push(newEntry);
    return newEntry;
  }
}

export const storage = db ? new DatabaseStorage() : new MemStorage();
