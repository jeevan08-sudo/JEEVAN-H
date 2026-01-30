import { z } from 'zod';
import { insertGuestbookEntrySchema, guestbookEntries } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  guestbook: {
    list: {
      method: 'GET' as const,
      path: '/api/guestbook',
      responses: {
        200: z.array(z.custom<typeof guestbookEntries.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/guestbook',
      input: insertGuestbookEntrySchema,
      responses: {
        201: z.custom<typeof guestbookEntries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

// ============================================
// REQUIRED: buildUrl helper
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type GuestbookEntryInput = z.infer<typeof api.guestbook.create.input>;
export type GuestbookEntryResponse = z.infer<typeof api.guestbook.create.responses[201]>;
export type GuestbookListResponse = z.infer<typeof api.guestbook.list.responses[200]>;
