import { PrismaClient } from "@prisma/client";

// Ensure Prisma Client is not created multiple times in development
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  // ✅ Fixed typo
  globalThis.prisma = client;
}

export default client;
