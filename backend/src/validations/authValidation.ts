import { z } from "zod";

// zod validation schema for user registration
export const userStatusEnum = z.enum([
  "ACTIVE",
  "INACTIVE",
  "BANNED",
  "PENDING_VERIFICATION",
]);
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be altest 3 character")
    .max(20, "Username must be less than 20 character")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be atleast 6 character"),
  fullName: z.string().optional().default("user"),
  avatar: z.string().optional(),
  status: userStatusEnum.optional().default("ACTIVE"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;
