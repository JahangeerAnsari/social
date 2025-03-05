import { PrismaClient } from "@prisma/client";
// here we are making sure that we are not using prisma Client multiple times
// prevent the hot reload
declare global {
  var prisma: PrismaClient | undefined;
}
 const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_EN !== "production") {
  globalThis.prisma = client;
}
export default client;