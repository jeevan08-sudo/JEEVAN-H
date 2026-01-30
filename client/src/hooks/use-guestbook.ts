import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type GuestbookEntryInput } from "@shared/routes";

export function useGuestbook() {
  return useQuery({
    queryKey: [api.guestbook.list.path],
    queryFn: async () => {
      const res = await fetch(api.guestbook.list.path);
      if (!res.ok) throw new Error("Failed to fetch guestbook entries");
      return api.guestbook.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateGuestbookEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GuestbookEntryInput) => {
      const validated = api.guestbook.create.input.parse(data);
      const res = await fetch(api.guestbook.create.path, {
        method: api.guestbook.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.guestbook.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to sign guestbook");
      }
      return api.guestbook.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.guestbook.list.path] });
    },
  });
}
