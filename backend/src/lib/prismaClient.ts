// src/prismaClient.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(); // Production environment: create a single instance
} else {
  // In development mode, we need to ensure hot reloading works
  // so we reuse the existing Prisma Client instance if available
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
