import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Guestbook Routes
  app.get(api.guestbook.list.path, async (_req, res) => {
    const entries = await storage.getGuestbookEntries();
    res.json(entries);
  });

  app.post(api.guestbook.create.path, async (req, res) => {
    try {
      const input = api.guestbook.create.input.parse(req.body);
      const entry = await storage.createGuestbookEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

// Seed function to add some initial rave vibes
export async function seedDatabase() {
  const existing = await storage.getGuestbookEntries();
  if (existing.length === 0) {
    await storage.createGuestbookEntry({
      name: "CyberGhost",
      message: "The grid is alive!",
      color: "#00F0FF",
      stickerId: "holo",
    });
    await storage.createGuestbookEntry({
      name: "NeonRider",
      message: "See you in the void...",
      color: "#FF0099",
      stickerId: "glitch",
    });
    await storage.createGuestbookEntry({
      name: "AcidBurn",
      message: "Hack the planet!",
      color: "#CCFF00",
      stickerId: "basic",
    });
  }
}
