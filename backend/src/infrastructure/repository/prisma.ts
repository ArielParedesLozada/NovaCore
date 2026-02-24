import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "@prisma/client";
const { PrismaClient } = pkg
import { env } from "../../config/env.ts";

const databaseUrl = env["DATABASE_URL"];
if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({
    connectionString: databaseUrl,
});
const prisma = new PrismaClient({ adapter });
export default prisma;