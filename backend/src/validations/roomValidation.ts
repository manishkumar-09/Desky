import { z } from "zod";

export const createRoomSchema = z.object({
  roomName: z
    .string()
    .min(3, "Room name must be at least 3 character")
    .max(50, "Room name can't be exceed 50 characters")
    .default("New Room"),
  hostUserId: z.string().uuid("Invalid user ID"),
});

export type CreteRoomInput = z.infer<typeof createRoomSchema>;
